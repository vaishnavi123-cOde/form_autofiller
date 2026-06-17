'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Navbar } from '@/src/components/Navbar'
import { Footer } from '@/src/components/Footer'
import { LoadingOverlay } from '@/src/components/LoadingOverlay'
import { UploadDropzone } from '@/src/components/UploadDropzone'
import { useFormStore } from '@/src/store/useFormStore'
import { uploadDocument } from '@/src/services/api'
import type { UploadedFile } from '@/src/types'

export default function UploadPage() {
  const router = useRouter()
  const { file, setFile, setFilePath, setProcessingState } = useFormStore()
  const [isUploading, setIsUploading] = useState(false)

  const handleFileSelected = async (selectedFile: UploadedFile | null) => {
    if (!selectedFile) {
      setFile(null)
      return
    }

    setFile(selectedFile)
    setIsUploading(true)
    setProcessingState({ currentStep: 'uploading', progress: 0, isComplete: false, error: null })

    try {
      const result = await uploadDocument(selectedFile.rawFile, (progress) => {
        setProcessingState({ progress })
      })
      setFilePath(result.filepath)
      setProcessingState({ progress: 100, isComplete: true })
      router.push('/processing')
    } catch {
      setProcessingState({ error: 'Upload failed. Please try again.' })
    } finally {
      setIsUploading(false)
    }
  }

  return (
    <div className="flex min-h-screen flex-col">
      <LoadingOverlay isVisible={isUploading} message="Uploading..." />
      <Navbar />
      <main className="flex-1">
        <div className="mx-auto max-w-xl px-4 pb-16 pt-10 sm:px-6">
          <div className="mb-8">
            <h1 className="text-lg font-semibold text-zinc-800">Upload Document</h1>
            <p className="mt-1 text-sm text-zinc-500">
              Select a PDF, DOCX, or image file to process.
            </p>
          </div>

          <UploadDropzone onFileSelected={handleFileSelected} currentFile={file} />
        </div>
      </main>
      <Footer />
    </div>
  )
}
