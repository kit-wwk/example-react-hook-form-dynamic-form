import type { FieldValidationPreset, FormFieldDefinitionType } from '@/api/generated/models'

type FieldType = FormFieldDefinitionType

/** Layout-only field types (no form value) */
export const LAYOUT_TYPES: FieldType[] = ['heading', 'separator', 'section']

/** Field types that require options to be configured */
export const TYPES_WITH_OPTIONS: FieldType[] = ['select', 'radio', 'multibox']

/** Non-nullable preset validator type for frontend use */
export type PresetValidator = NonNullable<FieldValidationPreset>

/** Preset validation rules — user-friendly alternatives to raw regex */
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
