import type { FormSchema } from '@/src/types'

export const mockFormSchema: FormSchema = {
  id: 'form-001',
  title: 'W-9 Request Form',
  fields: [
    { id: 'f1', label: 'Full Name', value: 'John A. Doe', confidence: 0.98, isEditable: true },
    { id: 'f2', label: 'Business Name', value: 'Acme Corp Inc.', confidence: 0.95, isEditable: true },
    { id: 'f3', label: 'Taxpayer ID (TIN)', value: 'XX-XXXXXXX', confidence: 0.45, isEditable: true },
    { id: 'f4', label: 'Address Line 1', value: '123 Innovation Drive', confidence: 0.92, isEditable: true },
    { id: 'f5', label: 'Address Line 2', value: 'Suite 400', confidence: 0.78, isEditable: true },
    { id: 'f6', label: 'City', value: 'San Francisco', confidence: 0.97, isEditable: true },
    { id: 'f7', label: 'State', value: 'CA', confidence: 0.99, isEditable: true },
    { id: 'f8', label: 'ZIP Code', value: '94105', confidence: 0.96, isEditable: true },
    { id: 'f9', label: 'Email Address', value: 'john.doe@acmecorp.com', confidence: 0.94, isEditable: true },
    { id: 'f10', label: 'Phone Number', value: '+1 (555) 123-4567', confidence: 0.88, isEditable: true },
    { id: 'f11', label: 'Date of Birth', value: '1985-03-15', confidence: 0.91, isEditable: true },
    { id: 'f12', label: 'Social Security Number', value: 'XXX-XX-1234', confidence: 0.35, isEditable: true },
  ],
}
