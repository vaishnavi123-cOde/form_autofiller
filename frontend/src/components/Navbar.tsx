'use client'

import Link from 'next/link'
import { FileText } from 'lucide-react'

export function Navbar() {
  return (
    <header className="sticky top-0 z-50 border-b border-zinc-200 bg-white">
      <nav className="mx-auto flex h-14 max-w-5xl items-center justify-between px-4 sm:px-6">
        <Link href="/" className="flex items-center gap-2">
          <div className="flex h-7 w-7 items-center justify-center rounded border border-zinc-300 bg-white">
            <FileText className="h-3.5 w-3.5 text-zinc-600" />
          </div>
          <span className="text-sm font-semibold text-zinc-800">Form Auto-Filler</span>
        </Link>

        <Link
          href="/upload"
          className="rounded bg-zinc-900 px-3 py-1.5 text-xs font-medium text-white transition-colors hover:bg-zinc-700"
        >
          + New
        </Link>
      </nav>
    </header>
  )
}
