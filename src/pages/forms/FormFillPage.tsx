import { useSearchParams } from 'react-router-dom'
import { Alert, Box, Paper, Typography } from '@mui/material'
import FormRenderer from '@/components/form-renderer/FormRenderer'
import type { FormTemplate } from '@/types'

// TODO: Replace with actual API call via Orval-generated hooks
const MOCK_TEMPLATES: Record<string, FormTemplate> = {
  '1': {
    id: '1',
    name: 'Contact Form',
    description: 'Basic contact information form',
    fields: [
      { id: 'f1', name: 'name', label: 'Full Name', type: 'text', required: true },
      { id: 'f2', name: 'email', label: 'Email', type: 'email', required: true },
      { id: 'f3', name: 'message', label: 'Message', type: 'textarea', required: false },
    ],
    createdAt: '2026-01-01T00:00:00Z',
    updatedAt: '2026-01-01T00:00:00Z',
  },
  '2': {
    id: '2',
    name: 'Feedback Survey',
    description: 'Customer satisfaction survey',
    fields: [
      {
        id: 'f1',
        name: 'rating',
        label: 'Rating',
        type: 'select',
        required: true,
        options: [
          { label: 'Excellent', value: '5' },
          { label: 'Good', value: '4' },
          { label: 'Average', value: '3' },
          { label: 'Poor', value: '2' },
          { label: 'Very Poor', value: '1' },
        ],
      },
      { id: 'f2', name: 'comments', label: 'Comments', type: 'textarea', required: false },
    ],
    createdAt: '2026-01-15T00:00:00Z',
    updatedAt: '2026-01-15T00:00:00Z',
  },
}

export default function FormFillPage() {
  const [searchParams] = useSearchParams()
  const templateId = searchParams.get('templateId')

  // TODO: Replace with useQuery hook from Orval
  const template = templateId ? MOCK_TEMPLATES[templateId] : null

  const handleSubmit = (data: Record<string, unknown>) => {
    // TODO: Call create form submission API
    console.log('Form submitted:', { templateId, data })
    alert('Form submitted successfully!')
  }

  if (!templateId) {
    return (
      <Box>
        <Alert severity="info">Please select a template from the Templates page to fill a form.</Alert>
      </Box>
    )
  }

  if (!template) {
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
      <Paper sx={{ p: 3, maxWidth: 600 }}>
        <FormRenderer template={template} onSubmit={handleSubmit} />
      </Paper>
    </Box>
  )
}
