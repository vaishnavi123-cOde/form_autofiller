'use client'

import { CheckCircle2 } from 'lucide-react'
import type { ProcessingStep } from '@/src/types'

interface StepInfo {
  key: ProcessingStep
  label: string
  description: string
}

const steps: StepInfo[] = [
  { key: 'uploading', label: 'Upload Complete', description: 'Document received' },
  { key: 'extracting', label: 'Extracting Text', description: 'OCR in progress' },
  { key: 'analyzing', label: 'Analyzing Document', description: 'AI parsing structure' },
  { key: 'mapping', label: 'Mapping Fields', description: 'Matching fields' },
  { key: 'generating', label: 'Generating Form', description: 'Building output' },
]

interface ProcessingTimelineProps {
  currentStep: ProcessingStep
  progress: number
}

export function ProcessingTimeline({ currentStep, progress }: ProcessingTimelineProps) {
  const currentIndex = steps.findIndex((s) => s.key === currentStep)

  return (
    <div className="w-full max-w-lg mx-auto">
      <div className="relative">
        <div className="absolute left-[15px] top-0 h-full w-0.5 bg-zinc-200" />

        {steps.map((step, i) => {
          const isActive = i === currentIndex
          const isCompleted = i < currentIndex
          const isPending = i > currentIndex

          return (
            <div
              key={step.key}
              className={`relative flex items-start gap-3 pb-6 last:pb-0 ${
                isPending ? 'opacity-30' : ''
              }`}
            >
              <div className="relative z-10 mt-1">
                {isCompleted ? (
                  <div className="flex h-7 w-7 items-center justify-center rounded-full bg-emerald-100">
                    <CheckCircle2 className="h-4 w-4 text-emerald-600" />
                  </div>
                ) : isActive ? (
                  <div className="flex h-7 w-7 items-center justify-center rounded-full bg-zinc-900">
                    <div className="h-2 w-2 rounded-full bg-white" />
                  </div>
                ) : (
                  <div className="flex h-7 w-7 items-center justify-center rounded-full border border-zinc-300 bg-white">
                    <div className="h-1.5 w-1.5 rounded-full bg-zinc-300" />
                  </div>
                )}
              </div>

              <div className="flex-1 pt-0.5">
                <p
                  className={`text-sm font-medium ${
                    isActive
                      ? 'text-zinc-900'
                      : isCompleted
                        ? 'text-zinc-600'
                        : 'text-zinc-400'
                  }`}
                >
                  {step.label}
                </p>
                <p className="text-xs text-zinc-400">{step.description}</p>
              </div>
            </div>
          )
        })}
      </div>

      <div className="mt-6">
        <div className="mb-1.5 flex items-center justify-between text-xs">
          <span className="font-medium text-zinc-600">Progress</span>
          <span className="text-zinc-400">{progress}%</span>
        </div>
        <div className="h-1.5 overflow-hidden rounded-full bg-zinc-200">
          <div
            className="h-full rounded-full bg-zinc-900 transition-all duration-500 ease-out"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>
    </div>
  )
}
