'use client'

import Link from 'next/link'
import { Upload } from 'lucide-react'
import { Navbar } from '@/src/components/Navbar'
import { Footer } from '@/src/components/Footer'

export default function LandingPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <main className="flex flex-1 items-center justify-center px-4">
        <div className="max-w-sm text-center">
          <div className="mx-auto mb-5 flex h-12 w-12 items-center justify-center rounded border border-zinc-200 bg-zinc-50">
            <Upload className="h-5 w-5 text-zinc-500" />
          </div>
          <h1 className="text-xl font-semibold text-zinc-800">Form Auto-Filler</h1>
          <p className="mt-2 text-sm text-zinc-500">
            Upload a document and let AI extract the data into a form.
          </p>
          <Link
            href="/upload"
            className="mt-6 inline-flex items-center rounded bg-zinc-900 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-zinc-700"
          >
            Upload Document
          </Link>
        </div>
      </main>
      <Footer />
    </div>
  )
}
