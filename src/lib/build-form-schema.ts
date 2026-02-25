import { z } from 'zod'
import type { FormFieldDefinition } from '@/types'

const LAYOUT_TYPES = ['heading', 'separator', 'section']

/** Converts a dynamic field definition array into a Zod schema for form validation */
export function buildFormSchema(
  fields: FormFieldDefinition[],
): z.ZodObject<Record<string, z.ZodTypeAny>> {
  const shape: Record<string, z.ZodTypeAny> = {}

  for (const field of fields) {
    if (LAYOUT_TYPES.includes(field.type)) continue

    switch (field.type) {
      case 'checkbox':
        shape[field.name] = field.required
          ? z.literal(true, { message: `${field.label} is required` })
          : z.boolean()
        break

      case 'multibox': {
        let arr = z.array(z.string())
        if (field.required) arr = arr.min(1, `${field.label} is required`)
        shape[field.name] = arr
        break
      }

      case 'file':
        shape[field.name] = field.required
          ? z.any().refine((v) => v != null, `${field.label} is required`)
          : z.any().optional()
        break

      default: {
        // text, email, password, number, textarea, select, radio, date
        let str = z.string()

        if (field.required) {
          str = str.min(1, `${field.label} is required`)
        }
        if (field.validation?.minLength) {
          str = str.min(
            field.validation.minLength,
            `Minimum ${field.validation.minLength} characters`,
          )
        }
        if (field.validation?.maxLength) {
          str = str.max(
            field.validation.maxLength,
            `Maximum ${field.validation.maxLength} characters`,
          )
        }
        if (field.validation?.pattern) {
          str = str.regex(new RegExp(field.validation.pattern), 'Invalid format')
        }

        shape[field.name] = field.required ? str : str.optional().or(z.literal(''))
        break
      }
    }
  }

  return z.object(shape)
}
