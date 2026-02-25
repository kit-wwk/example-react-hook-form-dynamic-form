import { createBrowserRouter, Navigate } from 'react-router-dom'
import AppLayout from '@/components/layout/AppLayout'
import TemplateListPage from '@/pages/templates/TemplateListPage'
import TemplateBuilderPage from '@/pages/templates/TemplateBuilderPage'
import FormFillPage from '@/pages/forms/FormFillPage'
import FormSubmissionsPage from '@/pages/forms/FormSubmissionsPage'

const router = createBrowserRouter([
  {
    path: '/',
    element: <AppLayout />,
    children: [
      { index: true, element: <Navigate to="/templates" replace /> },
      { path: 'templates', element: <TemplateListPage /> },
      { path: 'templates/new', element: <TemplateBuilderPage /> },
      { path: 'templates/:id/edit', element: <TemplateBuilderPage /> },
      { path: 'forms', element: <FormSubmissionsPage /> },
      { path: 'forms/new', element: <FormFillPage /> },
    ],
  },
])

export default router
