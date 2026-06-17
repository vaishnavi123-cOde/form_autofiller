'use client'

import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import type { AppState, UploadedFile, FormSchema, ProcessingStep } from '@/src/types'

const initialState = {
  file: null as UploadedFile | null,
  filepath: null as string | null,
  formSchema: null as FormSchema | null,
  processingState: {
    currentStep: 'uploading' as ProcessingStep,
    progress: 0,
    isComplete: false,
    error: null as string | null,
  },
}

export const useFormStore = create<AppState>()(
  persist(
    (set) => ({
      ...initialState,

      setFile: (file) => set({ file }),

      setFilePath: (filepath) => set({ filepath }),

      setFormSchema: (schema) => set({ formSchema: schema }),

      setProcessingState: (partial) =>
        set((state) => ({
          processingState: { ...state.processingState, ...partial },
        })),

      updateField: (fieldId, value) =>
        set((state) => ({
          formSchema: state.formSchema
            ? {
                ...state.formSchema,
                fields: state.formSchema.fields.map((f) =>
                  f.id === fieldId ? { ...f, value } : f,
                ),
              }
            : null,
        })),

      reset: () => set({ ...initialState }),
    }),
    {
      name: 'form-storage',
      partialize: (state) => ({
        filepath: state.filepath,
        formSchema: state.formSchema,
      }),
    },
  ),
)
