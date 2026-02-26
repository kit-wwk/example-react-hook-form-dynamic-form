import { useNavigate } from 'react-router-dom'
import { Box, Button, Typography } from '@mui/material'

export default function NotFoundPage() {
  const navigate = useNavigate()

  return (
    <Box sx={{ textAlign: 'center', mt: 8 }}>
      <Typography variant="h3" gutterBottom>
        404
      </Typography>
      <Typography variant="h6" color="text.secondary" sx={{ mb: 3 }}>
        Page not found
      </Typography>
      <Button variant="contained" onClick={() => navigate('/templates')}>
        Back to Templates
      </Button>
    </Box>
  )
}
