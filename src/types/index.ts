// Re-export Orval-generated types with aliases matching the names used across the codebase
export type {
  FormTemplateResponse as FormTemplate,
  FormTemplateRequest as CreateFormTemplatePayload,
  FormTemplateUpdateRequest as UpdateFormTemplatePayload,
  FormFieldDefinition,
  FormFieldDefinitionRequest,
  FormFieldDefinitionType as FieldType,
  SelectOption,
  FieldValidation,
  FormDataResponse as FormSubmission,
  FormDataRequest as CreateFormSubmissionPayload,
  ErrorResponse,
} from '@/api/generated/models'

// Frontend-only constants
export { PRESET_VALIDATORS } from './constants'
export type { PresetValidator } from './constants'
