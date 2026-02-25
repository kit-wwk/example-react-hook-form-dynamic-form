# Dynamic Form Builder

A React TypeScript application for building dynamic forms with a drag-and-drop template builder and a form renderer.

## Tech Stack

- **React 19** + **TypeScript** + **Vite**
- **MUI (Material UI)** — UI component library
- **React Hook Form** — form state management and validation
- **TanStack Query (React Query)** — server state and API caching
- **Orval** — API client generation from OpenAPI specs
- **Axios** — HTTP client
- **dnd-kit** — drag-and-drop for field reordering
- **React Router** — client-side routing

## Getting Started

```bash
npm install
npm run dev
```

## Scripts

| Command | Description |
|---|---|
| `npm run dev` | Start development server |
| `npm run build` | Type-check and build for production |
| `npm run preview` | Preview production build |
| `npm run lint` | Run ESLint |
| `npm run format` | Format code with Prettier |
| `npm run generate:api` | Generate API client from OpenAPI specs |

## Project Structure

```
src/
├── api/                    # API layer
│   ├── axios-instance/     # Axios configuration
│   ├── generated/          # Orval-generated API client (gitignored)
│   └── query-client.ts     # TanStack Query client
├── components/
│   ├── form-builder/       # Template builder components (drag-and-drop)
│   ├── form-fields/        # Dynamic form field renderer
│   ├── form-renderer/      # Form renderer component
│   └── layout/             # App layout with navigation
├── hooks/                  # Custom React hooks
├── pages/
│   ├── forms/              # Form submission pages
│   └── templates/          # Template CRUD pages
├── theme/                  # MUI theme configuration
├── types/                  # TypeScript type definitions
├── router.tsx              # Route definitions
├── App.tsx                 # Root component with providers
└── main.tsx                # Entry point
api/                        # OpenAPI YAML specs (provide your specs here)
orval.config.ts             # Orval configuration
```

## API Integration

1. Place your OpenAPI YAML specs in the `api/` directory:
   - `api/form-template.yaml` — Form template CRUD endpoints
   - `api/form-data.yaml` — Form data/submission CRUD endpoints
2. Run `npm run generate:api` to generate the API client
3. Replace mock data in pages with the generated hooks
