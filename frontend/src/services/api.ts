import type { FormSchema, ExtractedField } from '@/src/types'

const BASE_URL = 'http://127.0.0.1:8000'

export async function uploadDocument(
  file: File,
  onProgress?: (progress: number) => void,
): Promise<{ filename: string; filepath: string }> {
  const formData = new FormData()
  formData.append('file', file)

  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest()

    xhr.upload.addEventListener('progress', (e) => {
      if (e.lengthComputable && onProgress) {
        onProgress(Math.round((e.loaded / e.total) * 100))
      }
    })

    xhr.addEventListener('load', () => {
      if (xhr.status >= 200 && xhr.status < 300) {
        resolve(JSON.parse(xhr.responseText))
      } else {
        reject(new Error(`Upload failed with status ${xhr.status}`))
      }
    })

    xhr.addEventListener('error', () => reject(new Error('Upload failed')))

    xhr.open('POST', `${BASE_URL}/upload`)
    xhr.send(formData)
  })
}

export async function processDocument(
  filepath: string,
): Promise<Record<string, unknown>> {
  const response = await fetch(`${BASE_URL}/process`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ filepath }),
  })

  if (!response.ok) {
    const text = await response.text()
    let detail = `Processing failed (status ${response.status})`
    try {
      const body = JSON.parse(text)
      if (body.detail) detail = body.detail
    } catch {
      if (text && text !== 'Internal Server Error') detail = text
    }
    throw new Error(detail)
  }

  const data = await response.json()
  return data.structured_data
}

const LABEL_MAP: Record<string, string> = {
  name: 'Name',
  email: 'Email',
  phone: 'Phone',
  address: 'Address',
  education: 'Education',
  skills: 'Skills',
  experience: 'Experience',
  linkedin: 'LinkedIn',
  github: 'GitHub',
}

function keyToLabel(key: string): string {
  return key
    .replace(/_/g, ' ')
    .replace(/\b\w/g, (c) => c.toUpperCase())
}

function flattenValue(value: unknown): string {
  if (value === null || value === undefined || value === 'null') return ''
  if (typeof value === 'string') return value
  if (Array.isArray(value)) return value.map(flattenValue).join(', ')
  if (typeof value === 'object') {
    return Object.entries(value as Record<string, unknown>)
      .filter(([_, v]) => v !== null && v !== undefined && v !== 'null')
      .map(([k, v]) => `${k}: ${flattenValue(v)}`)
      .join('\n')
  }
  return String(value)
}

export function mapStructuredDataToFormSchema(
  data: Record<string, unknown>,
): FormSchema {
  const fields: ExtractedField[] = Object.entries(data)
    .filter(([_, value]) => {
      if (value === null || value === undefined) return false
      if (value === 'null') return false
      if (Array.isArray(value) && value.length === 0) return false
      return true
    })
    .map(([key, value]) => {
      const label = LABEL_MAP[key] || keyToLabel(key)
      return {
        id: key,
        label,
        value: flattenValue(value),
        confidence: 1.0,
        isEditable: true,
      }
    })

  return {
    id: 'extracted-' + Date.now(),
    title: 'Extracted Document Data',
    fields,
  }
}
