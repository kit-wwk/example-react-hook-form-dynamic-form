import { Alert, Box, CircularProgress, Paper, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material'
import { useListTestSessionSubmissions } from '@/api/generated/test-session-submission/test-session-submission'

export default function FormSubmissionsPage() {
  const { data: submissions, isLoading, error: fetchError } = useListTestSessionSubmissions()

  if (isLoading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
        <CircularProgress />
      </Box>
    )
  }

  if (fetchError) {
    return <Alert severity="error">Failed to load submissions.</Alert>
  }

  return (
    <Box>
      <Typography variant="h4" sx={{ mb: 3 }}>
        Submissions
      </Typography>

      <TableContainer component={Paper} variant="outlined">
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Form ID</TableCell>
              <TableCell>Data</TableCell>
              <TableCell>Submitted At</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {(submissions ?? []).map((sub) => (
              <TableRow key={sub.id}>
                <TableCell>{sub.id}</TableCell>
                <TableCell>{sub.formId}</TableCell>
                <TableCell>
                  <code>{JSON.stringify(sub.data)}</code>
                </TableCell>
                <TableCell>{sub.createdAt ? new Date(sub.createdAt).toLocaleString() : ''}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  )
}
