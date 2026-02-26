import { z } from 'zod'
import { LAYOUT_TYPES } from '@/types'

/** Converts empty strings and null/undefined to undefined, otherwise coerces to number */
const optionalNumber = z
  .union([z.number(), z.string(), z.null(), z.undefined()])
  .transform((val) => {
    if (val === '' || val === null || val === undefined) return undefined
    const n = Number(val)
    return Number.isNaN(n) ? undefined : n
  })
  .optional()

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
      min: optionalNumber,
      max: optionalNumber,
      minLength: optionalNumber,
      maxLength: optionalNumber,
      preset: z.string().nullish(),
      pattern: z.string().nullish(),
    })
    .optional()
    .nullable(),
})

/** Zod schema for the FieldEditor form with conditional name validation */
export const fieldEditorSchema = baseSchema.superRefine((data, ctx) => {
  const isLayout = LAYOUT_TYPES.includes(data.type as typeof LAYOUT_TYPES[number])
  if (!isLayout && !data.name) {
    ctx.addIssue({
      code: z.ZodIssueCode.custom,
      message: 'Name is required',
      path: ['name'],
    })
  }
})
