import { DndContext, closestCenter, type DragEndEvent } from '@dnd-kit/core'
import { SortableContext, verticalListSortingStrategy, arrayMove } from '@dnd-kit/sortable'
import { Box, Typography } from '@mui/material'
import SortableFieldItem from './SortableFieldItem'
import type { FormFieldDefinition } from '@/types'

interface FormFieldListProps {
  fields: FormFieldDefinition[]
  onReorder: (fields: FormFieldDefinition[]) => void
  onEdit: (index: number) => void
  onDelete: (index: number) => void
}

export default function FormFieldList({ fields, onReorder, onEdit, onDelete }: FormFieldListProps) {
  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event
    if (!over || active.id === over.id) return

    const oldIndex = fields.findIndex((f) => f.id === active.id)
    const newIndex = fields.findIndex((f) => f.id === over.id)
    onReorder(arrayMove(fields, oldIndex, newIndex))
  }

  if (fields.length === 0) {
    return (
      <Box sx={{ py: 4, textAlign: 'center' }}>
        <Typography color="text.secondary">
          No fields added yet. Click "Add Field" to start building your form.
        </Typography>
      </Box>
    )
  }

  return (
    <DndContext collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
      <SortableContext items={fields.map((f) => f.id)} strategy={verticalListSortingStrategy}>
        {fields.map((field, index) => (
          <SortableFieldItem
            key={field.id}
            field={field}
            onEdit={() => onEdit(index)}
            onDelete={() => onDelete(index)}
          />
        ))}
      </SortableContext>
    </DndContext>
  )
}
