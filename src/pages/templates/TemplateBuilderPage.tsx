import { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import {
  Box,
  Button,
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
import type { FormFieldDefinition } from '@/types'

let nextFieldId = 1
function generateId() {
  return `field_${nextFieldId++}`
}

function createDefaultField(): FormFieldDefinition {
  return {
    id: generateId(),
    name: '',
    label: '',
    type: 'text',
    required: false,
  }
}

export default function TemplateBuilderPage() {
  const { id } = useParams()
  const navigate = useNavigate()
  const isEditing = !!id

  const [templateName, setTemplateName] = useState('')
  const [templateDescription, setTemplateDescription] = useState('')
  const [fields, setFields] = useState<FormFieldDefinition[]>([])
  const [editorOpen, setEditorOpen] = useState(false)
  const [editingIndex, setEditingIndex] = useState<number | null>(null)
  const [editingField, setEditingField] = useState<FormFieldDefinition>(createDefaultField())

  // TODO: If editing, load template from API
  // useEffect(() => { if (id) { fetchTemplate(id) } }, [id])

  const handleAddField = () => {
    setEditingField(createDefaultField())
    setEditingIndex(null)
    setEditorOpen(true)
  }

  const handleEditField = (index: number) => {
    setEditingField({ ...fields[index] })
    setEditingIndex(index)
    setEditorOpen(true)
  }

  const handleDeleteField = (index: number) => {
    setFields((prev) => prev.filter((_, i) => i !== index))
  }

  const handleSaveField = (field: FormFieldDefinition) => {
    if (editingIndex !== null) {
      setFields((prev) => prev.map((f, i) => (i === editingIndex ? field : f)))
    } else {
      setFields((prev) => [...prev, field])
    }
    setEditorOpen(false)
  }

  const handleSaveTemplate = () => {
    const payload = {
      name: templateName,
      description: templateDescription,
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      fields: fields.map(({ id, ...rest }) => rest),
    }
    // TODO: Call create/update API
    console.log(isEditing ? 'Update template:' : 'Create template:', payload)
    navigate('/templates')
  }

  return (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Typography variant="h4">{isEditing ? 'Edit Template' : 'New Template'}</Typography>
        <Button
          variant="contained"
          startIcon={<SaveIcon />}
          onClick={handleSaveTemplate}
          disabled={!templateName || fields.length === 0}
        >
          Save Template
        </Button>
      </Box>

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
            <Button variant="outlined" startIcon={<AddIcon />} onClick={handleAddField}>
              Add Field
            </Button>
          </Box>

          <FormFieldList
            fields={fields}
            onReorder={setFields}
            onEdit={handleEditField}
            onDelete={handleDeleteField}
          />
        </Paper>
      </Stack>

      <Dialog open={editorOpen} onClose={() => setEditorOpen(false)} maxWidth="sm" fullWidth>
        <DialogTitle>{editingIndex !== null ? 'Edit Field' : 'Add Field'}</DialogTitle>
        <DialogContent>
          <FieldEditor
            field={editingField}
            onSave={handleSaveField}
            onCancel={() => setEditorOpen(false)}
          />
        </DialogContent>
      </Dialog>
    </Box>
  )
}
