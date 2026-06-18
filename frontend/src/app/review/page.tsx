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
  const { formSchema, matchAnalysis, updateField, reset } = useFormStore()

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

          {matchAnalysis && (
            <section className="mt-6 rounded-lg border border-zinc-200 bg-white p-5 sm:p-6">
              <div className="mb-5">
                <h2 className="text-base font-semibold text-zinc-800">Resume Match Analysis</h2>
                <p className="mt-1 text-sm text-zinc-500">
                  Match Score: {matchAnalysis.match_score}%
                </p>
              </div>

              <div className="grid gap-5 sm:grid-cols-2">
                <AnalysisList title="Matched Skills" items={matchAnalysis.matched_skills} marker="✓" />
                <AnalysisList title="Missing Skills" items={matchAnalysis.missing_skills} marker="✗" />
                <AnalysisList
                  title="Matched Requirements"
                  items={matchAnalysis.matched_requirements}
                  marker="✓"
                />
                <AnalysisList
                  title="Missing Requirements"
                  items={matchAnalysis.missing_requirements}
                  marker="✗"
                />
                <AnalysisList title="Strengths" items={matchAnalysis.strengths} marker="•" />
                <AnalysisList
                  title="Improvement Areas"
                  items={matchAnalysis.improvement_areas}
                  marker="•"
                />
              </div>

              {matchAnalysis.summary && (
                <div className="mt-5 border-t border-zinc-100 pt-5">
                  <h3 className="text-sm font-medium text-zinc-800">Summary</h3>
                  <p className="mt-2 text-sm leading-6 text-zinc-600">{matchAnalysis.summary}</p>
                </div>
              )}
            </section>
          )}
        </div>
      </main>
      <Footer />
    </div>
  )
}

function AnalysisList({
  title,
  items,
  marker,
}: {
  title: string
  items: string[]
  marker: string
}) {
  if (!items.length) return null

  return (
    <div>
      <h3 className="text-sm font-medium text-zinc-800">{title}</h3>
      <ul className="mt-2 space-y-1.5">
        {items.map((item, i) => (
          <li key={`${item}-${i}`} className="flex gap-2 text-sm text-zinc-600">
            <span className="shrink-0 text-zinc-400">{marker}</span>
            <span>{item}</span>
          </li>
        ))}
      </ul>
    </div>
  )
}
