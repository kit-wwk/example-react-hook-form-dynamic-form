import { useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import {
  Alert,
  Box,
  Button,
  CircularProgress,
  Dialog,
  DialogContent,
  DialogTitle,
  Paper,
  Stack,
  TextField,
  Typography,
} from '@mui/material'
import AddIcon from '@mui/icons-material/Add'
import SaveIcon from '@mui/icons-material/Save'
import FormFieldList from '@/components/form-builder/FormFieldList'
import FieldEditor from '@/components/form-builder/FieldEditor'
import {
  useGetFormTemplate,
  useCreateFormTemplate,
  useUpdateFormTemplate,
} from '@/api/generated/form-template/form-template'
import { useTemplateBuilderStore } from '@/stores/template-builder-store'

export default function TemplateBuilderPage() {
  const { id } = useParams()
  const navigate = useNavigate()
  const isEditing = !!id

  const {
    templateName,
    templateDescription,
    fields,
    editorOpen,
    editingIndex,
    editingField,
    setTemplateName,
    setTemplateDescription,
    deleteField,
    reorderFields,
    openAddEditor,
    openEditEditor,
    closeEditor,
    saveField,
    reset,
  } = useTemplateBuilderStore()

  // Fetch existing template when editing
  const {
    data: existingTemplate,
    isLoading,
    error: fetchError,
  } = useGetFormTemplate(id!, { query: { enabled: isEditing } })

  const createMutation = useCreateFormTemplate()
  const updateMutation = useUpdateFormTemplate()
  const isSaving = createMutation.isPending || updateMutation.isPending

  // Populate store when existing template loads
  useEffect(() => {
    if (existingTemplate) {
      reset(existingTemplate)
    }
  }, [existingTemplate, reset])

  // Clean up store on unmount
  useEffect(() => {
    return () => reset()
  }, [reset])

  const handleSaveTemplate = () => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const fieldPayloads = fields.map(({ id: _fieldId, ...rest }) => rest)

    if (isEditing && id) {
      updateMutation.mutate(
        { templateId: id, data: { name: templateName, description: templateDescription, fields: fieldPayloads } },
        { onSuccess: () => navigate('/templates') },
      )
    } else {
      createMutation.mutate(
        { data: { name: templateName, description: templateDescription, fields: fieldPayloads } },
        { onSuccess: () => navigate('/templates') },
      )
    }
  }

  if (isEditing && isLoading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
        <CircularProgress />
      </Box>
    )
  }

  if (fetchError) {
    return <Alert severity="error">Failed to load template.</Alert>
  }

  return (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Typography variant="h4">{isEditing ? 'Edit Template' : 'New Template'}</Typography>
        <Button
          variant="contained"
          startIcon={<SaveIcon />}
          onClick={handleSaveTemplate}
          disabled={!templateName || fields.length === 0 || isSaving}
        >
          {isSaving ? 'Saving...' : 'Save Template'}
        </Button>
      </Box>

      {(createMutation.error || updateMutation.error) && (
        <Alert severity="error" sx={{ mb: 2 }}>
          Failed to save template. Please try again.
        </Alert>
      )}

      <Stack spacing={3}>
        <Paper sx={{ p: 3 }}>
          <Stack spacing={2}>
            <TextField
              label="Template Name"
              value={templateName}
              onChange={(e) => setTemplateName(e.target.value)}
              required
              fullWidth
            />
            <TextField
              label="Description"
              value={templateDescription}
              onChange={(e) => setTemplateDescription(e.target.value)}
              multiline
              rows={2}
              fullWidth
            />
          </Stack>
        </Paper>

        <Paper sx={{ p: 3 }}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
            <Typography variant="h6">
              Fields ({fields.length})
            </Typography>
            <Button variant="outlined" startIcon={<AddIcon />} onClick={openAddEditor}>
              Add Field
            </Button>
          </Box>

          <FormFieldList
            fields={fields}
            onReorder={reorderFields}
            onEdit={openEditEditor}
            onDelete={deleteField}
          />
        </Paper>
      </Stack>

      <Dialog open={editorOpen} onClose={closeEditor} maxWidth="sm" fullWidth>
        <DialogTitle>{editingIndex !== null ? 'Edit Field' : 'Add Field'}</DialogTitle>
        <DialogContent>
          <FieldEditor
            field={editingField}
            onSave={saveField}
            onCancel={closeEditor}
          />
        </DialogContent>
      </Dialog>
    </Box>
  )
}
