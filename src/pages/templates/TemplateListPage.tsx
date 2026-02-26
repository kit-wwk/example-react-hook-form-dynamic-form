import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  Alert,
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CircularProgress,
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
import {
  useListTestSessionApplicationForms,
  useDeleteTestSessionApplicationForm,
} from '@/api/generated/test-session-application-form/test-session-application-form'

export default function TemplateListPage() {
  const navigate = useNavigate()
  const { data: templates, isLoading, error: fetchError, refetch } = useListTestSessionApplicationForms()
  const [deleteDialogId, setDeleteDialogId] = useState<number | null>(null)
  const deleteMutation = useDeleteTestSessionApplicationForm()

  const handleDelete = () => {
    if (deleteDialogId == null) return
    deleteMutation.mutate(
      { applicationFormId: deleteDialogId },
      {
        onSuccess: () => {
          refetch()
          setDeleteDialogId(null)
        },
        onError: () => {
          setDeleteDialogId(null)
        },
      },
    )
  }

  if (isLoading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
        <CircularProgress />
      </Box>
    )
  }

  if (fetchError) {
    return <Alert severity="error">Failed to load application forms.</Alert>
  }

  return (
    <Box>
      {deleteMutation.error && (
        <Alert severity="error" sx={{ mb: 2 }}>
          Failed to delete application form. Please try again.
        </Alert>
      )}
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Typography variant="h4">Application Forms</Typography>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={() => navigate('/templates/new')}
        >
          New Form
        </Button>
      </Box>

      <Grid container spacing={2}>
        {(templates ?? []).map((template) => (
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
                  onClick={() => navigate(`/forms/new?formId=${template.id}`)}
                  aria-label="Fill form"
                >
                  <VisibilityIcon fontSize="small" />
                </IconButton>
                <IconButton
                  size="small"
                  onClick={() => navigate(`/templates/${template.id}/edit`)}
                  aria-label="Edit form"
                >
                  <EditIcon fontSize="small" />
                </IconButton>
                <IconButton
                  size="small"
                  color="error"
                  onClick={() => setDeleteDialogId(template.id ?? null)}
                  aria-label="Delete form"
                >
                  <DeleteIcon fontSize="small" />
                </IconButton>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>

      <Dialog open={deleteDialogId != null} onClose={() => setDeleteDialogId(null)}>
        <DialogTitle>Delete Application Form</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to delete this application form? This action cannot be undone.
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
