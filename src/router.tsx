import { lazy } from 'react'
import { createBrowserRouter, Navigate } from 'react-router-dom'
import AppLayout from '@/components/layout/AppLayout'

const TemplateListPage = lazy(() => import('@/pages/templates/TemplateListPage'))
const TemplateBuilderPage = lazy(() => import('@/pages/templates/TemplateBuilderPage'))
const FormFillPage = lazy(() => import('@/pages/forms/FormFillPage'))
const FormSubmissionsPage = lazy(() => import('@/pages/forms/FormSubmissionsPage'))
const NotFoundPage = lazy(() => import('@/pages/NotFoundPage'))

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
      { path: '*', element: <NotFoundPage /> },
    ],
  },
])

export default router
