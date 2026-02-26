import { create } from 'zustand'
import type { FormFieldDefinition } from '@/types'

function generateId() {
  return crypto.randomUUID()
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

interface TemplateBuilderState {
  // Template metadata
  templateName: string
  templateDescription: string
  fields: FormFieldDefinition[]

  // Editor dialog state
  editorOpen: boolean
  editingIndex: number | null
  editingField: FormFieldDefinition

  // Actions
  setTemplateName: (name: string) => void
  setTemplateDescription: (desc: string) => void
  deleteField: (index: number) => void
  reorderFields: (fields: FormFieldDefinition[]) => void
  openAddEditor: () => void
  openEditEditor: (index: number) => void
  closeEditor: () => void
  saveField: (field: FormFieldDefinition) => void
  reset: (template?: {
    name?: string | null
    description?: string | null
    fields?: FormFieldDefinition[] | null
  }) => void
}

export const useTemplateBuilderStore = create<TemplateBuilderState>((set, get) => ({
  templateName: '',
  templateDescription: '',
  fields: [],
  editorOpen: false,
  editingIndex: null,
  editingField: createDefaultField(),

  setTemplateName: (name) => set({ templateName: name }),
  setTemplateDescription: (desc) => set({ templateDescription: desc }),

  deleteField: (index) =>
    set((s) => ({ fields: s.fields.filter((_, i) => i !== index) })),

  reorderFields: (fields) => set({ fields }),

  openAddEditor: () =>
    set({ editingField: createDefaultField(), editingIndex: null, editorOpen: true }),

  openEditEditor: (index) =>
    set((s) => ({
      editingField: { ...s.fields[index] },
      editingIndex: index,
      editorOpen: true,
    })),

  closeEditor: () => set({ editorOpen: false }),

  saveField: (field) => {
    const { editingIndex } = get()
    if (editingIndex !== null) {
      set((s) => ({
        fields: s.fields.map((f, i) => (i === editingIndex ? field : f)),
        editorOpen: false,
      }))
    } else {
      set((s) => ({
        fields: [...s.fields, field],
        editorOpen: false,
      }))
    }
  },

  reset: (template) =>
    set({
      templateName: template?.name ?? '',
      templateDescription: template?.description ?? '',
      fields: template?.fields ?? [],
      editorOpen: false,
      editingIndex: null,
      editingField: createDefaultField(),
    }),
}))
