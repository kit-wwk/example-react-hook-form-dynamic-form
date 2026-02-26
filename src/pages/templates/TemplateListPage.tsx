import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  Alert,
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  Grid,
  IconButton,
  Typography,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
} from '@mui/material'
import AddIcon from '@mui/icons-material/Add'
import EditIcon from '@mui/icons-material/Edit'
import DeleteIcon from '@mui/icons-material/Delete'
import VisibilityIcon from '@mui/icons-material/Visibility'
import type { FormTemplate } from '@/types'
import { useDeleteFormTemplate } from '@/api/generated/form-template/form-template'

// TODO: Replace with useQuery hook once GET /api/v1/form-templates list endpoint is available
const MOCK_TEMPLATES: FormTemplate[] = [
  {
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
  {
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
]

export default function TemplateListPage() {
  const navigate = useNavigate()
  const [templates, setTemplates] = useState<FormTemplate[]>(MOCK_TEMPLATES)
  const [deleteDialogId, setDeleteDialogId] = useState<string | null>(null)
  const deleteMutation = useDeleteFormTemplate()

  const handleDelete = () => {
    if (!deleteDialogId) return
    deleteMutation.mutate(
      { templateId: deleteDialogId },
      {
        onSuccess: () => {
          // TODO: Invalidate template list query once list endpoint is available
          setTemplates((prev) => prev.filter((t) => t.id !== deleteDialogId))
          setDeleteDialogId(null)
        },
        onError: () => {
          setDeleteDialogId(null)
        },
      },
    )
  }

  return (
    <Box>
      {deleteMutation.error && (
        <Alert severity="error" sx={{ mb: 2 }}>
          Failed to delete template. Please try again.
        </Alert>
      )}
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Typography variant="h4">Form Templates</Typography>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={() => navigate('/templates/new')}
        >
          New Template
        </Button>
      </Box>

      <Grid container spacing={2}>
        {templates.map((template) => (
          <Grid size={{ xs: 12, sm: 6, md: 4 }} key={template.id}>
            <Card variant="outlined">
              <CardContent>
                <Typography variant="h6">{template.name}</Typography>
                <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                  {template.description}
                </Typography>
                <Typography variant="caption" color="text.secondary">
                  {template.fields?.length ?? 0} field{(template.fields?.length ?? 0) !== 1 ? 's' : ''}
                </Typography>
              </CardContent>
              <CardActions>
                <IconButton
                  size="small"
                  onClick={() => navigate(`/forms/new?templateId=${template.id}`)}
                  aria-label="Fill form"
                >
                  <VisibilityIcon fontSize="small" />
                </IconButton>
                <IconButton
                  size="small"
                  onClick={() => navigate(`/templates/${template.id}/edit`)}
                  aria-label="Edit template"
                >
                  <EditIcon fontSize="small" />
                </IconButton>
                <IconButton
                  size="small"
                  color="error"
                  onClick={() => setDeleteDialogId(template.id ?? null)}
                  aria-label="Delete template"
                >
                  <DeleteIcon fontSize="small" />
                </IconButton>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>

      <Dialog open={!!deleteDialogId} onClose={() => setDeleteDialogId(null)}>
        <DialogTitle>Delete Template</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to delete this template? This action cannot be undone.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDeleteDialogId(null)}>Cancel</Button>
          <Button onClick={handleDelete} color="error" variant="contained">
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  )
}
