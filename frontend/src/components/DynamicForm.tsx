'use client'

import { useState, useMemo } from 'react'
import { Search, Pen } from 'lucide-react'
import type { FormSchema } from '@/src/types'

interface DynamicFormProps {
  schema: FormSchema
  onFieldChange: (fieldId: string, value: string) => void
}

export function DynamicForm({ schema, onFieldChange }: DynamicFormProps) {
  const [searchQuery, setSearchQuery] = useState('')

  const multilineIds = ['education', 'address', 'skills', 'experience']

  const filteredFields = useMemo(
    () =>
      schema.fields.filter(
        (f) =>
          f.label.toLowerCase().includes(searchQuery.toLowerCase()) ||
          f.value.toLowerCase().includes(searchQuery.toLowerCase()),
      ),
    [schema.fields, searchQuery],
  )

  return (
    <div className="space-y-5">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <h2 className="text-base font-semibold text-zinc-800">{schema.title}</h2>
        <div className="relative">
          <Search className="pointer-events-none absolute left-2.5 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-zinc-400" />
          <input
            type="text"
            placeholder="Search fields..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="h-8 w-full rounded border border-zinc-200 bg-white pl-8 pr-2.5 text-xs outline-none focus:border-zinc-400 sm:w-48"
          />
        </div>
      </div>

      {filteredFields.length === 0 ? (
        <div className="rounded border border-dashed border-zinc-300 p-8 text-center text-xs text-zinc-400">
          No fields match &ldquo;{searchQuery}&rdquo;
        </div>
      ) : (
        <div className="grid gap-3 sm:grid-cols-2">
          {filteredFields.map((field) => (
            <div key={field.id} className="rounded border border-zinc-200 bg-white p-3">
              <div className="mb-1.5 flex items-center justify-between">
                <label
                  htmlFor={field.id}
                  className="flex items-center gap-1 text-[10px] font-medium uppercase tracking-wider text-zinc-500"
                >
                  {field.label}
                  {field.isEditable && <Pen className="h-2.5 w-2.5 text-zinc-300" />}
                </label>
              </div>
              {multilineIds.includes(field.id) ? (
                <textarea
                  id={field.id}
                  rows={3}
                  value={field.value}
                  onChange={(e) => onFieldChange(field.id, e.target.value)}
                  className="w-full resize-none bg-transparent text-sm font-medium text-zinc-800 outline-none placeholder:text-zinc-400"
                />
              ) : (
                <input
                  id={field.id}
                  type="text"
                  value={field.value}
                  onChange={(e) => onFieldChange(field.id, e.target.value)}
                  className="w-full bg-transparent text-sm font-medium text-zinc-800 outline-none placeholder:text-zinc-400"
                />
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
