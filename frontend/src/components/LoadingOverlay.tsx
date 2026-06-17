'use client'

import { Loader2 } from 'lucide-react'

interface LoadingOverlayProps {
  isVisible: boolean
  message?: string
}

export function LoadingOverlay({ isVisible, message = 'Processing...' }: LoadingOverlayProps) {
  if (!isVisible) return null

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/30">
      <div className="flex flex-col items-center gap-3 rounded-lg border border-zinc-200 bg-white px-6 py-5 shadow-lg">
        <Loader2 className="h-6 w-6 animate-spin text-zinc-500" />
        <p className="text-xs font-medium text-zinc-600">{message}</p>
      </div>
    </div>
  )
}
