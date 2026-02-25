import { Controller, type Control } from 'react-hook-form'
import {
  TextField,
  FormControl,
  FormControlLabel,
  FormLabel,
  FormGroup,
  RadioGroup,
  Radio,
  Checkbox,
  MenuItem,
  FormHelperText,
  Typography,
  Divider,
  Paper,
  Box,
} from '@mui/material'
import type { FormFieldDefinition } from '@/types'

interface DynamicFieldProps {
  field: FormFieldDefinition
  control: Control<Record<string, unknown>>
}

export default function DynamicField({ field, control }: DynamicFieldProps) {
  // Layout-only elements — no form control needed
  if (field.type === 'heading') {
    return (
      <Typography variant="h6" sx={{ mt: 1 }}>
        {field.label}
      </Typography>
    )
  }

  if (field.type === 'separator') {
    return <Divider />
  }

  if (field.type === 'section') {
    return (
      <Paper variant="outlined" sx={{ p: 2 }}>
        <Typography variant="subtitle1" fontWeight={600} sx={{ mb: 1 }}>
          {field.label}
        </Typography>
      </Paper>
    )
  }

  return (
    <Controller
      name={field.name}
      control={control}
      defaultValue={field.type === 'multibox' ? [] : (field.defaultValue ?? '')}
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
                placeholder={field.placeholder ?? undefined}
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
                placeholder={field.placeholder ?? undefined}
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

          case 'multibox': {
            const selected = (Array.isArray(rhfField.value) ? rhfField.value : []) as string[]
            return (
              <FormControl error={!!error} required={field.required}>
                <FormLabel>{field.label}</FormLabel>
                <FormGroup>
                  {field.options?.map((opt) => (
                    <FormControlLabel
                      key={opt.value}
                      control={
                        <Checkbox
                          checked={selected.includes(opt.value)}
                          onChange={(e) => {
                            const next = e.target.checked
                              ? [...selected, opt.value]
                              : selected.filter((v) => v !== opt.value)
                            rhfField.onChange(next)
                          }}
                        />
                      }
                      label={opt.label}
                    />
                  ))}
                </FormGroup>
                {error && <FormHelperText>{error.message}</FormHelperText>}
              </FormControl>
            )
          }

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
              <Box>
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
              </Box>
            )

          default:
            return (
              <TextField
                {...rhfField}
                label={field.label}
                placeholder={field.placeholder ?? undefined}
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
