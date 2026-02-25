import { useSortable } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
import { Box, Card, CardContent, Chip, IconButton, Stack, Typography } from '@mui/material'
import DragIndicatorIcon from '@mui/icons-material/DragIndicator'
import EditIcon from '@mui/icons-material/Edit'
import DeleteIcon from '@mui/icons-material/Delete'
import type { FormFieldDefinition, FieldType } from '@/types'

const LAYOUT_TYPES: FieldType[] = ['heading', 'separator', 'section']

interface SortableFieldItemProps {
  field: FormFieldDefinition
  onEdit: () => void
  onDelete: () => void
}

export default function SortableFieldItem({ field, onEdit, onDelete }: SortableFieldItemProps) {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({
    id: field.id,
  })

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
  }

  return (
    <Card ref={setNodeRef} style={style} variant="outlined" sx={{ mb: 1 }}>
      <CardContent sx={{ py: 1, '&:last-child': { pb: 1 } }}>
        <Stack direction="row" alignItems="center" spacing={1}>
          <Box {...attributes} {...listeners} sx={{ cursor: 'grab', display: 'flex' }}>
            <DragIndicatorIcon color="action" />
          </Box>

          <Box sx={{ flexGrow: 1 }}>
            <Typography variant="body1" fontWeight={500}>
              {field.label || `(${field.type})`}
            </Typography>
            <Typography variant="caption" color="text.secondary">
              {LAYOUT_TYPES.includes(field.type)
                ? field.type
                : `${field.name} \u00b7 ${field.type}`}
            </Typography>
          </Box>

          {LAYOUT_TYPES.includes(field.type) && (
            <Chip label="Layout" size="small" color="info" variant="outlined" />
          )}
          {field.required && <Chip label="Required" size="small" color="warning" variant="outlined" />}

          <IconButton size="small" onClick={onEdit}>
            <EditIcon fontSize="small" />
          </IconButton>
          <IconButton size="small" onClick={onDelete} color="error">
            <DeleteIcon fontSize="small" />
          </IconButton>
        </Stack>
      </CardContent>
    </Card>
  )
}
