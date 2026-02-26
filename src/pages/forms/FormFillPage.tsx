import { useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { Alert, Box, CircularProgress, Paper, Snackbar, Typography } from '@mui/material'
import FormRenderer from '@/components/form-renderer/FormRenderer'
import { useGetTestSessionApplicationForm } from '@/api/generated/test-session-application-form/test-session-application-form'
import { useCreateTestSessionSubmission } from '@/api/generated/test-session-submission/test-session-submission'

export default function FormFillPage() {
  const [searchParams] = useSearchParams()
  const formIdParam = searchParams.get('formId')
  const formId = formIdParam ? Number(formIdParam) : null
  const [successOpen, setSuccessOpen] = useState(false)

  const {
    data: template,
    isLoading,
    error: fetchError,
  } = useGetTestSessionApplicationForm(formId!, { query: { enabled: formId != null } })

  const submitMutation = useCreateTestSessionSubmission()

  const handleSubmit = (data: Record<string, unknown>) => {
    if (formId == null) return
    submitMutation.mutate(
      { data: { formId, data } },
      { onSuccess: () => setSuccessOpen(true) },
    )
  }

  if (formId == null) {
    return (
      <Box>
        <Alert severity="info">Please select an application form from the list to fill it.</Alert>
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
        <Alert severity="error">Application form not found.</Alert>
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
