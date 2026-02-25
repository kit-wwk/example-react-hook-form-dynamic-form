import { useForm, useFieldArray, Controller, type Resolver } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import {
  Box,
  TextField,
  MenuItem,
  Button,
  IconButton,
  Stack,
  FormControlLabel,
  Switch,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
  Divider,
  ListSubheader,
} from '@mui/material'
import DeleteIcon from '@mui/icons-material/Delete'
import AddIcon from '@mui/icons-material/Add'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import type { FormFieldDefinition, FieldType } from '@/types'
import { PRESET_VALIDATORS } from '@/types'
import { fieldEditorSchema } from '@/lib/field-editor-schema'

const FIELD_TYPES: { value: FieldType; label: string; group: string }[] = [
  { value: 'text', label: 'Text', group: 'Input' },
  { value: 'number', label: 'Number', group: 'Input' },
  { value: 'email', label: 'Email', group: 'Input' },
  { value: 'password', label: 'Password', group: 'Input' },
  { value: 'textarea', label: 'Text Area', group: 'Input' },
  { value: 'select', label: 'Select Dropdown', group: 'Choice' },
  { value: 'radio', label: 'Radio Group', group: 'Choice' },
  { value: 'checkbox', label: 'Checkbox', group: 'Choice' },
  { value: 'multibox', label: 'Multi Checkbox', group: 'Choice' },
  { value: 'date', label: 'Date', group: 'Input' },
  { value: 'file', label: 'File Upload', group: 'Input' },
  { value: 'heading', label: 'Heading', group: 'Layout' },
  { value: 'separator', label: 'Separator', group: 'Layout' },
  { value: 'section', label: 'Section', group: 'Layout' },
]

const TYPES_WITH_OPTIONS: FieldType[] = ['select', 'radio', 'multibox']
const LAYOUT_TYPES: FieldType[] = ['heading', 'separator', 'section']

function renderFieldTypeMenuItems() {
  const groups = ['Input', 'Choice', 'Layout']
  const items: React.ReactNode[] = []
  for (const group of groups) {
    items.push(
      <ListSubheader key={group}>{group}</ListSubheader>,
    )
    for (const t of FIELD_TYPES.filter((ft) => ft.group === group)) {
      items.push(
        <MenuItem key={t.value} value={t.value}>
          {t.label}
        </MenuItem>,
      )
    }
  }
  return items
}

interface FieldEditorProps {
  field: FormFieldDefinition
  onSave: (field: FormFieldDefinition) => void
  onCancel: () => void
}

export default function FieldEditor({ field, onSave, onCancel }: FieldEditorProps) {
  const { control, handleSubmit, watch, setValue } = useForm<FormFieldDefinition>({
    defaultValues: field,
    // Zod schema uses z.string() for `type` but FormFieldDefinition uses a narrow
    // string union (FormFieldDefinitionType). Runtime validation is still correct.
    resolver: zodResolver(fieldEditorSchema) as unknown as Resolver<FormFieldDefinition>,
  })

  const { fields: optionFields, append: appendOption, remove: removeOption } = useFieldArray({
    control,
    name: 'options',
  })

  const fieldType = watch('type')
  const isLayout = LAYOUT_TYPES.includes(fieldType)
  const showOptions = TYPES_WITH_OPTIONS.includes(fieldType)

  const handlePresetChange = (preset: string) => {
    const found = PRESET_VALIDATORS.find((p) => p.value === preset)
    setValue('validation.preset', found?.value ?? 'none')
    setValue('validation.pattern', found?.pattern ?? '')
  }

  return (
    <Box component="form" onSubmit={handleSubmit(onSave)} sx={{ p: 2 }}>
      <Stack spacing={2}>
        <Controller
          name="type"
          control={control}
          render={({ field: f }) => (
            <TextField {...f} label="Field Type" select fullWidth>
              {renderFieldTypeMenuItems()}
            </TextField>
          )}
        />

        <Controller
          name="label"
          control={control}
          render={({ field: f, fieldState: { error } }) => (
            <TextField
              {...f}
              label={isLayout ? 'Display Text' : 'Field Label'}
              error={!!error}
              helperText={error?.message}
              fullWidth
            />
          )}
        />

        {!isLayout && (
          <>
            <Controller
              name="name"
              control={control}
              render={({ field: f, fieldState: { error } }) => (
                <TextField
                  {...f}
                  label="Field Name (key)"
                  error={!!error}
                  helperText={error?.message ?? 'Used as the form field key'}
                  fullWidth
                />
              )}
            />

            <Controller
              name="placeholder"
              control={control}
              render={({ field: f }) => <TextField {...f} label="Placeholder" fullWidth />}
            />

            <Controller
              name="required"
              control={control}
              render={({ field: f }) => (
                <FormControlLabel
                  control={<Switch checked={f.value} onChange={f.onChange} />}
                  label="Required"
                />
              )}
            />
          </>
        )}

        {showOptions && (
          <>
            <Divider />
            <Typography variant="subtitle2">Options</Typography>
            {optionFields.map((opt, idx) => (
              <Stack key={opt.id} direction="row" spacing={1} alignItems="center">
                <Controller
                  name={`options.${idx}.label`}
                  control={control}
                  render={({ field: f }) => <TextField {...f} label="Label" size="small" />}
                />
                <Controller
                  name={`options.${idx}.value`}
                  control={control}
                  render={({ field: f }) => <TextField {...f} label="Value" size="small" />}
                />
                <IconButton onClick={() => removeOption(idx)} size="small" color="error">
                  <DeleteIcon fontSize="small" />
                </IconButton>
              </Stack>
            ))}
            <Button
              startIcon={<AddIcon />}
              size="small"
              onClick={() => appendOption({ label: '', value: '' })}
            >
              Add Option
            </Button>
          </>
        )}

        {!isLayout && (
          <Accordion>
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
              <Typography variant="body2">Validation Rules</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Stack spacing={2}>
                <Controller
                  name="validation.minLength"
                  control={control}
                  render={({ field: f }) => (
                    <TextField {...f} label="Min Length" type="number" fullWidth />
                  )}
                />
                <Controller
                  name="validation.maxLength"
                  control={control}
                  render={({ field: f }) => (
                    <TextField {...f} label="Max Length" type="number" fullWidth />
                  )}
                />
                <Controller
                  name="validation.preset"
                  control={control}
                  render={({ field: f }) => (
                    <TextField
                      {...f}
                      value={f.value ?? 'none'}
                      label="Validation Preset"
                      select
                      fullWidth
                      onChange={(e) => {
                        f.onChange(e)
                        handlePresetChange(e.target.value)
                      }}
                      helperText="Choose a common validation rule"
                    >
                      {PRESET_VALIDATORS.map((p) => (
                        <MenuItem key={p.value} value={p.value}>
                          {p.label}
                        </MenuItem>
                      ))}
                    </TextField>
                  )}
                />
              </Stack>
            </AccordionDetails>
          </Accordion>
        )}

        <Stack direction="row" spacing={1} justifyContent="flex-end">
          <Button variant="outlined" onClick={onCancel}>
            Cancel
          </Button>
          <Button variant="contained" type="submit">
            Save Field
          </Button>
        </Stack>
      </Stack>
    </Box>
  )
}
