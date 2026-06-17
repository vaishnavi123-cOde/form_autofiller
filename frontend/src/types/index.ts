export interface ExtractedField {
  id: string
  label: string
  value: string
  confidence: number
  isEditable: boolean
}

export interface FormSchema {
  id: string
  title: string
  fields: ExtractedField[]
}

export interface UploadedFile {
  name: string
  size: number
  type: string
  preview?: string
  rawFile: File
}

export type ProcessingStep =
  | 'uploading'
  | 'extracting'
  | 'analyzing'
  | 'mapping'
  | 'generating'

export interface ProcessingState {
  currentStep: ProcessingStep
  progress: number
  isComplete: boolean
  error: string | null
}

export interface AppState {
  file: UploadedFile | null
  filepath: string | null
  formSchema: FormSchema | null
  processingState: ProcessingState
  setFile: (file: UploadedFile | null) => void
  setFilePath: (filepath: string | null) => void
  setFormSchema: (schema: FormSchema | null) => void
  setProcessingState: (state: Partial<ProcessingState>) => void
  updateField: (fieldId: string, value: string) => void
  reset: () => void
}
