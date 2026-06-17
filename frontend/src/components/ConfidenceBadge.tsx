'use client'

interface ConfidenceBadgeProps {
  confidence: number
}

export function ConfidenceBadge({ confidence }: ConfidenceBadgeProps) {
  const pct = Math.round(confidence * 100)

  return (
    <span
      className="inline-flex items-center rounded border border-zinc-200 bg-white px-1.5 py-0.5 text-[10px] font-medium text-zinc-500"
      title={`Confidence: ${pct}%`}
    >
      {pct}%
    </span>
  )
}
