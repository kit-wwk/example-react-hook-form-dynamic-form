/**
 * Form submission data types.
 * These will be replaced by Orval-generated types once API specs are provided.
 */
export interface FormSubmission {
  id: string
  templateId: string
  data: Record<string, unknown>
  createdAt: string
  updatedAt: string
}

export interface CreateFormSubmissionPayload {
  templateId: string
  data: Record<string, unknown>
}

export interface UpdateFormSubmissionPayload {
  data: Record<string, unknown>
}
