// Re-export Orval-generated types with aliases matching the names used across the codebase
export type {
  TestSessionApplicationFormResponse as FormTemplate,
  TestSessionApplicationFormRequest as CreateFormTemplatePayload,
  TestSessionApplicationFormUpdateRequest as UpdateFormTemplatePayload,
  FormFieldDefinition,
  FormFieldDefinitionRequest,
  FormFieldDefinitionType as FieldType,
  SelectOption,
  FieldValidation,
  TestSessionSubmissionResponse as FormSubmission,
  TestSessionSubmissionRequest as CreateFormSubmissionPayload,
  ErrorResponse,
} from '@/api/generated/models'

// Frontend-only constants
export { PRESET_VALIDATORS, LAYOUT_TYPES, TYPES_WITH_OPTIONS } from './constants'
export type { PresetValidator } from './constants'
