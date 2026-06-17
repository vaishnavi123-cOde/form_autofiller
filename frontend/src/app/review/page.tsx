'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { ArrowLeft } from 'lucide-react'
import { Navbar } from '@/src/components/Navbar'
import { Footer } from '@/src/components/Footer'
import { DynamicForm } from '@/src/components/DynamicForm'
import { useFormStore } from '@/src/store/useFormStore'

export default function ReviewPage() {
  const router = useRouter()
  const { formSchema, updateField, reset } = useFormStore()

  useEffect(() => {
    if (!formSchema) {
      router.push('/upload')
    }
  }, [formSchema, router])

  if (!formSchema) return null

  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <main className="flex-1">
        <div className="mx-auto max-w-3xl px-4 pb-16 pt-8 sm:px-6">
          <div className="mb-6">
            <button
              type="button"
              onClick={() => { reset(); router.push('/upload') }}
              className="inline-flex items-center gap-1 text-xs text-zinc-400 transition-colors hover:text-zinc-600"
            >
              <ArrowLeft className="h-3.5 w-3.5" />
              Upload new document
            </button>
          </div>

          <div className="mb-6">
            <h1 className="text-lg font-semibold text-zinc-800">Extracted Data</h1>
            <p className="mt-1 text-sm text-zinc-500">
              Fields are editable &mdash; click to modify.
            </p>
          </div>

          <div className="rounded-lg border border-zinc-200 bg-white p-5 sm:p-6">
            <DynamicForm
              schema={formSchema}
              onFieldChange={updateField}
            />
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}
