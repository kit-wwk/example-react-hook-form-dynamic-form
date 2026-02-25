import { useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { Alert, Box, CircularProgress, Paper, Snackbar, Typography } from '@mui/material'
import FormRenderer from '@/components/form-renderer/FormRenderer'
import { useGetFormTemplate } from '@/api/generated/form-template/form-template'
import { useCreateFormData } from '@/api/generated/form-data/form-data'

export default function FormFillPage() {
  const [searchParams] = useSearchParams()
  const templateId = searchParams.get('templateId')
  const [successOpen, setSuccessOpen] = useState(false)

  const {
    data: template,
    isLoading,
    error: fetchError,
  } = useGetFormTemplate(templateId!, { query: { enabled: !!templateId } })

  const submitMutation = useCreateFormData()

  const handleSubmit = (data: Record<string, unknown>) => {
    if (!templateId) return
    submitMutation.mutate(
      { templateId, data: { data } },
      { onSuccess: () => setSuccessOpen(true) },
    )
  }

  if (!templateId) {
    return (
      <Box>
        <Alert severity="info">Please select a template from the Templates page to fill a form.</Alert>
      </Box>
    )
  }

  if (isLoading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
        <CircularProgress />
      </Box>
    )
  }

  if (fetchError || !template) {
    return (
      <Box>
        <Alert severity="error">Template not found.</Alert>
      </Box>
    )
  }

  return (
    <Box>
      <Typography variant="h4" sx={{ mb: 3 }}>
        Fill Form
      </Typography>

      {submitMutation.error && (
        <Alert severity="error" sx={{ mb: 2 }}>
          Failed to submit form. Please try again.
        </Alert>
      )}

      <Paper sx={{ p: 3, maxWidth: 600 }}>
        <FormRenderer template={template} onSubmit={handleSubmit} isSubmitting={submitMutation.isPending} />
      </Paper>

      <Snackbar open={successOpen} autoHideDuration={4000} onClose={() => setSuccessOpen(false)}>
        <Alert severity="success" onClose={() => setSuccessOpen(false)}>
          Form submitted successfully!
        </Alert>
      </Snackbar>
    </Box>
  )
}
