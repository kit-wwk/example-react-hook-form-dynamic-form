/**
 * Form field types supported by the dynamic form builder.
 * These will be replaced by Orval-generated types once API specs are provided.
 */
export type FieldType =
  | 'text'
  | 'number'
  | 'email'
  | 'password'
  | 'textarea'
  | 'select'
  | 'radio'
  | 'checkbox'
  | 'date'
  | 'file'

export interface SelectOption {
  label: string
  value: string
}

export interface FormFieldDefinition {
  id: string
  name: string
  label: string
  type: FieldType
  required: boolean
  placeholder?: string
  defaultValue?: string
  options?: SelectOption[] // for select, radio, checkbox
  validation?: {
    min?: number
    max?: number
    minLength?: number
    maxLength?: number
    pattern?: string
  }
}

export interface FormTemplate {
  id: string
  name: string
  description?: string
  fields: FormFieldDefinition[]
  createdAt: string
  updatedAt: string
}

export interface CreateFormTemplatePayload {
  name: string
  description?: string
  fields: Omit<FormFieldDefinition, 'id'>[]
}

export interface UpdateFormTemplatePayload {
  name?: string
  description?: string
  fields?: Omit<FormFieldDefinition, 'id'>[]
}
