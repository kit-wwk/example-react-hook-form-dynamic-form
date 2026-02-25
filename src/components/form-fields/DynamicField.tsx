import { Controller, type Control } from 'react-hook-form'
import {
  TextField,
  FormControl,
  FormControlLabel,
  FormLabel,
  RadioGroup,
  Radio,
  Checkbox,
  MenuItem,
  FormHelperText,
} from '@mui/material'
import type { FormFieldDefinition } from '@/types'

interface DynamicFieldProps {
  field: FormFieldDefinition
  control: Control<Record<string, unknown>>
}

export default function DynamicField({ field, control }: DynamicFieldProps) {
  const rules: Record<string, unknown> = {}
  if (field.required) rules.required = `${field.label} is required`
  if (field.validation?.minLength)
    rules.minLength = {
      value: field.validation.minLength,
      message: `Minimum ${field.validation.minLength} characters`,
    }
  if (field.validation?.maxLength)
    rules.maxLength = {
      value: field.validation.maxLength,
      message: `Maximum ${field.validation.maxLength} characters`,
    }
  if (field.validation?.pattern)
    rules.pattern = {
      value: new RegExp(field.validation.pattern),
      message: 'Invalid format',
    }

  return (
    <Controller
      name={field.name}
      control={control}
      defaultValue={field.defaultValue ?? ''}
      rules={rules}
      render={({ field: rhfField, fieldState: { error } }) => {
        switch (field.type) {
          case 'text':
          case 'email':
          case 'password':
          case 'number':
            return (
              <TextField
                {...rhfField}
                label={field.label}
                type={field.type}
                placeholder={field.placeholder}
                required={field.required}
                error={!!error}
                helperText={error?.message}
                fullWidth
              />
            )

          case 'textarea':
            return (
              <TextField
                {...rhfField}
                label={field.label}
                placeholder={field.placeholder}
                required={field.required}
                multiline
                rows={4}
                error={!!error}
                helperText={error?.message}
                fullWidth
              />
            )

          case 'select':
            return (
              <TextField
                {...rhfField}
                label={field.label}
                select
                required={field.required}
                error={!!error}
                helperText={error?.message}
                fullWidth
              >
                {field.options?.map((opt) => (
                  <MenuItem key={opt.value} value={opt.value}>
                    {opt.label}
                  </MenuItem>
                ))}
              </TextField>
            )

          case 'radio':
            return (
              <FormControl error={!!error} required={field.required}>
                <FormLabel>{field.label}</FormLabel>
                <RadioGroup {...rhfField} value={rhfField.value ?? ''}>
                  {field.options?.map((opt) => (
                    <FormControlLabel
                      key={opt.value}
                      value={opt.value}
                      control={<Radio />}
                      label={opt.label}
                    />
                  ))}
                </RadioGroup>
                {error && <FormHelperText>{error.message}</FormHelperText>}
              </FormControl>
            )

          case 'checkbox':
            return (
              <FormControl error={!!error}>
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={!!rhfField.value}
                      onChange={(e) => rhfField.onChange(e.target.checked)}
                    />
                  }
                  label={field.label}
                />
                {error && <FormHelperText>{error.message}</FormHelperText>}
              </FormControl>
            )

          case 'date':
            return (
              <TextField
                {...rhfField}
                label={field.label}
                type="date"
                required={field.required}
                error={!!error}
                helperText={error?.message}
                slotProps={{ inputLabel: { shrink: true } }}
                fullWidth
              />
            )

          case 'file':
            return (
              <TextField
                label={field.label}
                type="file"
                required={field.required}
                error={!!error}
                helperText={error?.message}
                onChange={(e) => {
                  const input = e.target as HTMLInputElement
                  rhfField.onChange(input.files?.[0] ?? null)
                }}
                slotProps={{ inputLabel: { shrink: true } }}
                fullWidth
              />
            )

          default:
            return (
              <TextField
                {...rhfField}
                label={field.label}
                placeholder={field.placeholder}
                required={field.required}
                error={!!error}
                helperText={error?.message}
                fullWidth
              />
            )
        }
      }}
    />
  )
}
