import { defineConfig } from 'orval'

export default defineConfig({
  formTemplate: {
    input: {
      target: './api/form-template.yaml',
    },
    output: {
      mode: 'tags-split',
      target: 'src/api/generated/form-template',
      schemas: 'src/api/generated/models',
      client: 'react-query',
      httpClient: 'axios',
      baseUrl: '/api',
    },
  },
  formData: {
    input: {
      target: './api/form-data.yaml',
    },
    output: {
      mode: 'tags-split',
      target: 'src/api/generated/form-data',
      schemas: 'src/api/generated/models',
      client: 'react-query',
      httpClient: 'axios',
      baseUrl: '/api',
    },
  },
})
