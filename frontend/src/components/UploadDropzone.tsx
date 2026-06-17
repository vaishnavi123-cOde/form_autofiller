'use client'

import { useCallback, useState, useRef } from 'react'
import { Upload, FileText, X, AlertCircle, CheckCircle2 } from 'lucide-react'
import type { UploadedFile } from '@/src/types'

const ACCEPTED_TYPES = [
  'application/pdf',
  'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
  'image/png',
  'image/jpeg',
  'image/jpg',
]

const ACCEPTED_STR = '.pdf,.docx,.png,.jpg,.jpeg'
const MAX_SIZE = 15 * 1024 * 1024

interface UploadDropzoneProps {
  onFileSelected: (file: UploadedFile) => void
  currentFile?: UploadedFile | null
}

export function UploadDropzone({ onFileSelected, currentFile }: UploadDropzoneProps) {
  const [isDragging, setIsDragging] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  const validateFile = useCallback((file: File): UploadedFile | null => {
    if (!ACCEPTED_TYPES.includes(file.type)) {
      setError(`Unsupported file type: ${file.type || 'unknown'}. Accepted: ${ACCEPTED_STR}`)
      return null
    }
    if (file.size > MAX_SIZE) {
      setError(`File too large (${(file.size / 1024 / 1024).toFixed(1)}MB). Max size: 15MB`)
      return null
    }
    setError(null)
    const preview = file.type.startsWith('image/') ? URL.createObjectURL(file) : undefined
    return { name: file.name, size: file.size, type: file.type, preview, rawFile: file }
  }, [])

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault()
      setIsDragging(false)
      const file = e.dataTransfer.files[0]
      if (file) {
        const validated = validateFile(file)
        if (validated) onFileSelected(validated)
      }
    },
    [validateFile, onFileSelected],
  )

  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0]
      if (file) {
        const validated = validateFile(file)
        if (validated) onFileSelected(validated)
      }
    },
    [validateFile, onFileSelected],
  )

  const formatSize = (bytes: number) => {
    if (bytes < 1024) return `${bytes} B`
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`
    return `${(bytes / 1024 / 1024).toFixed(1)} MB`
  }

  return (
    <div className="w-full">
      <div
        onDragOver={(e) => { e.preventDefault(); setIsDragging(true) }}
        onDragLeave={() => setIsDragging(false)}
        onDrop={handleDrop}
        onClick={() => inputRef.current?.click()}
        className={`cursor-pointer rounded-lg border-2 border-dashed p-8 text-center transition-colors sm:p-12 ${
          isDragging
            ? 'border-zinc-500 bg-zinc-50'
            : error
              ? 'border-red-300 bg-red-50'
              : 'border-zinc-300 bg-white hover:border-zinc-400'
        }`}
        role="button"
        tabIndex={0}
        onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') inputRef.current?.click() }}
        aria-label="Upload document"
      >
        <input
          ref={inputRef}
          type="file"
          accept={ACCEPTED_STR}
          onChange={handleChange}
          className="hidden"
          aria-hidden="true"
        />

        {currentFile ? (
          <div className="flex flex-col items-center gap-3">
            {currentFile.preview ? (
              <div className="relative h-28 w-20 overflow-hidden rounded border border-zinc-200">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={currentFile.preview}
                  alt="Preview"
                  className="h-full w-full object-cover"
                />
              </div>
            ) : (
              <div className="flex h-12 w-12 items-center justify-center rounded bg-zinc-100">
                <FileText className="h-6 w-6 text-zinc-500" />
              </div>
            )}
            <div>
              <p className="text-sm font-medium text-zinc-800">{currentFile.name}</p>
              <p className="text-xs text-zinc-400">{formatSize(currentFile.size)}</p>
            </div>
            <div className="flex items-center gap-1 text-xs text-emerald-600">
              <CheckCircle2 className="h-3.5 w-3.5" />
              <span>File selected</span>
            </div>
            <button
              type="button"
              onClick={(e) => { e.stopPropagation(); onFileSelected(null as unknown as UploadedFile) }}
              className="inline-flex items-center gap-1 rounded border border-zinc-200 bg-white px-2.5 py-1 text-xs font-medium text-zinc-500 transition-colors hover:bg-zinc-50"
            >
              <X className="h-3 w-3" />
              Remove
            </button>
          </div>
        ) : (
          <div className="flex flex-col items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded bg-zinc-100">
              <Upload className="h-6 w-6 text-zinc-500" />
            </div>
            <div>
              <p className="text-sm font-medium text-zinc-800">Drop your document here</p>
              <p className="mt-0.5 text-xs text-zinc-400">
                or click to browse &mdash; PDF, DOCX, PNG, JPG up to 15MB
              </p>
            </div>
          </div>
        )}
      </div>

      {error && (
        <div className="mt-3 flex items-center gap-2 rounded border border-red-200 bg-red-50 px-3 py-2 text-xs text-red-600">
          <AlertCircle className="h-3.5 w-3.5 shrink-0" />
          <span>{error}</span>
        </div>
      )}
    </div>
  )
}
