import { z } from 'zod'

const baseSchema = z.object({
  id: z.string(),
  name: z
    .string()
    .regex(/^[a-zA-Z_]\w*$/, 'Must be a valid identifier')
    .or(z.literal('')),
  label: z.string().min(1, 'Label is required'),
  type: z.string(),
  required: z.boolean(),
  placeholder: z.string().nullish(),
  defaultValue: z.string().nullish(),
  options: z
    .array(z.object({ label: z.string(), value: z.string() }))
    .optional()
    .nullable(),
  validation: z
    .object({
      min: z.coerce.number().nullish(),
      max: z.coerce.number().nullish(),
      minLength: z.coerce.number().nullish(),
      maxLength: z.coerce.number().nullish(),
      preset: z.string().nullish(),
      pattern: z.string().nullish(),
    })
    .optional()
    .nullable(),
})

/** Zod schema for the FieldEditor form with conditional name validation */
export const fieldEditorSchema = baseSchema.superRefine((data, ctx) => {
  const isLayout = ['heading', 'separator', 'section'].includes(data.type)
  if (!isLayout && !data.name) {
    ctx.addIssue({
      code: z.ZodIssueCode.custom,
      message: 'Name is required',
      path: ['name'],
    })
  }
})
