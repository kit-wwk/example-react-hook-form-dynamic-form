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
  | 'multibox'
  | 'date'
  | 'file'
  | 'section'
  | 'heading'
  | 'separator'

/** Preset validation rules — user-friendly alternatives to raw regex */
export type PresetValidator =
  | 'none'
  | 'email'
  | 'url'
  | 'phone'
  | 'alphanumeric'
  | 'letters_only'
  | 'numbers_only'
  | 'no_special_chars'

export const PRESET_VALIDATORS: { value: PresetValidator; label: string; pattern: string }[] = [
  { value: 'none', label: 'None', pattern: '' },
  { value: 'email', label: 'Email address', pattern: '^[\\w.-]+@[\\w.-]+\\.\\w{2,}$' },
  { value: 'url', label: 'URL', pattern: '^https?://[\\w.-]+(?:\\.[\\w.-]+)+[\\w.,@?^=%&:/~+#-]*$' },
  { value: 'phone', label: 'Phone number', pattern: '^\\+?[\\d\\s()-]{7,20}$' },
  { value: 'alphanumeric', label: 'Alphanumeric only', pattern: '^[a-zA-Z0-9]+$' },
  { value: 'letters_only', label: 'Letters only', pattern: '^[a-zA-Z\\s]+$' },
  { value: 'numbers_only', label: 'Numbers only', pattern: '^\\d+$' },
  { value: 'no_special_chars', label: 'No special characters', pattern: '^[a-zA-Z0-9\\s]+$' },
]

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
  options?: SelectOption[] // for select, radio, multibox
  validation?: {
    min?: number
    max?: number
    minLength?: number
    maxLength?: number
    preset?: PresetValidator
    pattern?: string // auto-filled from preset, or custom if needed
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
