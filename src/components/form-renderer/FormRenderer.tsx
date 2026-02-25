import { useForm } from 'react-hook-form'
import { Box, Button, Stack, Typography } from '@mui/material'
import DynamicField from '@/components/form-fields/DynamicField'
import type { FormTemplate } from '@/types'

interface FormRendererProps {
  template: FormTemplate
  defaultValues?: Record<string, unknown>
  onSubmit: (data: Record<string, unknown>) => void
  isSubmitting?: boolean
}

export default function FormRenderer({
  template,
  defaultValues,
  onSubmit,
  isSubmitting,
}: FormRendererProps) {
  const { control, handleSubmit } = useForm<Record<string, unknown>>({
    defaultValues: defaultValues ?? {},
  })

  return (
    <Box component="form" onSubmit={handleSubmit(onSubmit)}>
      <Typography variant="h5" gutterBottom>
        {template.name}
      </Typography>
      {template.description && (
        <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
          {template.description}
        </Typography>
      )}

      <Stack spacing={2.5}>
        {(template.fields ?? []).map((field) => (
          <DynamicField key={field.id} field={field} control={control} />
        ))}
      </Stack>

      <Box sx={{ mt: 3 }}>
        <Button type="submit" variant="contained" size="large" disabled={isSubmitting}>
          {isSubmitting ? 'Submitting...' : 'Submit'}
        </Button>
      </Box>
    </Box>
  )
}
