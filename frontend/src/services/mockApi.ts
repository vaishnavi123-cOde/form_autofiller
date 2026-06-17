import { mockFormSchema } from '@/src/utils/mockData'
import type { UploadedFile } from '@/src/types'

function delay(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms))
}

export async function uploadDocument(
  _file: UploadedFile,
  onProgress?: (progress: number) => void,
): Promise<{ success: boolean; fileId: string }> {
  for (let i = 0; i <= 100; i += 10) {
    await delay(200)
    onProgress?.(i)
  }
  return { success: true, fileId: 'file-' + Date.now() }
}

export async function processDocument(
  onStep?: (step: string, progress: number) => void,
): Promise<{ success: boolean }> {
  const steps = ['extracting', 'analyzing', 'mapping', 'generating'] as const
  let cumulative = 0

  for (const step of steps) {
    const increment = 25
    for (let i = 0; i <= increment; i += 5) {
      await delay(150)
      cumulative += 5
      onStep?.(step, Math.min(cumulative, 100))
    }
  }

  return { success: true }
}

export async function fetchExtractedForm(): Promise<typeof mockFormSchema> {
  await delay(500)
  return structuredClone(mockFormSchema)
}

export async function submitForm(
  data: Record<string, string>,
): Promise<{ success: boolean; submissionId: string }> {
  await delay(800)
  console.log('Submitted data:', data)
  return { success: true, submissionId: 'sub-' + Date.now() }
}
