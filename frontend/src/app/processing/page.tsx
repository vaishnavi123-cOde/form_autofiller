'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { RefreshCw } from 'lucide-react'
import { Navbar } from '@/src/components/Navbar'
import { Footer } from '@/src/components/Footer'
import { ProcessingTimeline } from '@/src/components/ProcessingTimeline'
import { useFormStore } from '@/src/store/useFormStore'
import { processDocument, mapStructuredDataToFormSchema } from '@/src/services/api'

export default function ProcessingPage() {
  const router = useRouter()
  const { file, filepath, setFormSchema, setProcessingState, processingState } = useFormStore()
  const [retryCount, setRetryCount] = useState(0)

  useEffect(() => {
    if (!file || !filepath) {
      router.push('/upload')
      return
    }

    const run = async () => {
      try {
        setProcessingState({ currentStep: 'extracting', progress: 0, isComplete: false, error: null })

        const structured = await processDocument(filepath)

        setProcessingState({ currentStep: 'generating', progress: 75 })

        const schema = mapStructuredDataToFormSchema(structured)
        setFormSchema(schema)

        setProcessingState({ progress: 100, isComplete: true })

        await new Promise((r) => setTimeout(r, 800))
        router.push('/review')
      } catch (err) {
        const message = err instanceof Error ? err.message : 'Processing failed. Please try again.'
        console.error('Processing error:', err)
        setProcessingState({ error: message })
      }
    }

    run()
  }, [file, filepath, retryCount])

  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <main className="flex flex-1 items-center justify-center px-4 py-16">
        <div className="w-full max-w-md">
          <div className="mb-8 text-center">
            <h1 className="text-lg font-semibold text-zinc-800">Processing Document</h1>
            <p className="mt-1 text-sm text-zinc-500">Extracting data from your document...</p>
          </div>

          <div className="rounded-lg border border-zinc-200 bg-white p-6">
            <ProcessingTimeline
              currentStep={processingState.currentStep}
              progress={processingState.progress}
            />
          </div>

          {processingState.error && (
            <div className="mt-4">
              <div className="rounded border border-red-200 bg-red-50 px-3 py-2 text-xs text-red-600">
                {processingState.error}
              </div>
              <button
                type="button"
                onClick={() => setRetryCount((c) => c + 1)}
                className="mt-3 inline-flex items-center gap-1.5 rounded border border-zinc-200 px-3 py-1.5 text-xs font-medium text-zinc-600 transition-colors hover:bg-zinc-50"
              >
                <RefreshCw className="h-3 w-3" />
                Try Again
              </button>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  )
}
