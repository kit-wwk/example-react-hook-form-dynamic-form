import { useForm, useFieldArray, Controller } from 'react-hook-form'
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
} from '@mui/material'
import DeleteIcon from '@mui/icons-material/Delete'
import AddIcon from '@mui/icons-material/Add'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import type { FormFieldDefinition, FieldType } from '@/types'

const FIELD_TYPES: { value: FieldType; label: string }[] = [
  { value: 'text', label: 'Text' },
  { value: 'number', label: 'Number' },
  { value: 'email', label: 'Email' },
  { value: 'password', label: 'Password' },
  { value: 'textarea', label: 'Text Area' },
  { value: 'select', label: 'Select Dropdown' },
  { value: 'radio', label: 'Radio Group' },
  { value: 'checkbox', label: 'Checkbox' },
  { value: 'date', label: 'Date' },
  { value: 'file', label: 'File Upload' },
]

const TYPES_WITH_OPTIONS: FieldType[] = ['select', 'radio']

interface FieldEditorProps {
  field: FormFieldDefinition
  onSave: (field: FormFieldDefinition) => void
  onCancel: () => void
}

export default function FieldEditor({ field, onSave, onCancel }: FieldEditorProps) {
  const { control, handleSubmit, watch } = useForm<FormFieldDefinition>({
    defaultValues: field,
  })

  const { fields: optionFields, append: appendOption, remove: removeOption } = useFieldArray({
    control,
    name: 'options',
  })

  const fieldType = watch('type')
  const showOptions = TYPES_WITH_OPTIONS.includes(fieldType)

  return (
    <Box component="form" onSubmit={handleSubmit(onSave)} sx={{ p: 2 }}>
      <Stack spacing={2}>
        <Controller
          name="label"
          control={control}
          rules={{ required: 'Label is required' }}
          render={({ field: f, fieldState: { error } }) => (
            <TextField {...f} label="Field Label" error={!!error} helperText={error?.message} fullWidth />
          )}
        />

        <Controller
          name="name"
          control={control}
          rules={{ required: 'Name is required', pattern: { value: /^[a-zA-Z_]\w*$/, message: 'Must be a valid identifier' } }}
          render={({ field: f, fieldState: { error } }) => (
            <TextField {...f} label="Field Name (key)" error={!!error} helperText={error?.message ?? 'Used as the form field key'} fullWidth />
          )}
        />

        <Controller
          name="type"
          control={control}
          render={({ field: f }) => (
            <TextField {...f} label="Field Type" select fullWidth>
              {FIELD_TYPES.map((t) => (
                <MenuItem key={t.value} value={t.value}>
                  {t.label}
                </MenuItem>
              ))}
            </TextField>
          )}
        />

        <Controller
          name="placeholder"
          control={control}
          render={({ field: f }) => (
            <TextField {...f} label="Placeholder" fullWidth />
          )}
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
                name="validation.pattern"
                control={control}
                render={({ field: f }) => (
                  <TextField {...f} label="Regex Pattern" fullWidth />
                )}
              />
            </Stack>
          </AccordionDetails>
        </Accordion>

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
