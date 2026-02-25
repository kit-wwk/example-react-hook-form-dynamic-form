import { Box, Paper, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material'
import type { FormSubmission } from '@/types'

// TODO: Replace with actual API call via Orval-generated hooks
const MOCK_SUBMISSIONS: FormSubmission[] = [
  {
    id: '1',
    templateId: '1',
    data: { name: 'John Doe', email: 'john@example.com', message: 'Hello!' },
    createdAt: '2026-02-01T10:00:00Z',
    updatedAt: '2026-02-01T10:00:00Z',
  },
  {
    id: '2',
    templateId: '2',
    data: { rating: '5', comments: 'Great service!' },
    createdAt: '2026-02-10T14:30:00Z',
    updatedAt: '2026-02-10T14:30:00Z',
  },
]

export default function FormSubmissionsPage() {
  // TODO: Replace with useQuery from Orval
  const submissions = MOCK_SUBMISSIONS

  return (
    <Box>
      <Typography variant="h4" sx={{ mb: 3 }}>
        Form Submissions
      </Typography>

      <TableContainer component={Paper} variant="outlined">
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Template ID</TableCell>
              <TableCell>Data</TableCell>
              <TableCell>Submitted At</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {submissions.map((sub) => (
              <TableRow key={sub.id}>
                <TableCell>{sub.id}</TableCell>
                <TableCell>{sub.templateId}</TableCell>
                <TableCell>
                  <code>{JSON.stringify(sub.data)}</code>
                </TableCell>
                <TableCell>{new Date(sub.createdAt).toLocaleString()}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  )
}
