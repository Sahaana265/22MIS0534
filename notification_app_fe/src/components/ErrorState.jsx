import { Box, Typography, Button } from '@mui/material';
import ErrorOutlinedIcon from '@mui/icons-material/ErrorOutlined';

const ErrorState = ({ message = "Something went wrong.", onRetry }) => {
  return (
    <Box sx={{ py: 8, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', textAlign: 'center' }}>
      <ErrorOutlinedIcon color="error" sx={{ fontSize: 64, mb: 2, opacity: 0.8 }} />
      <Typography variant="h6" color="text.primary" gutterBottom>
        Oops! Error Loading Data
      </Typography>
      <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
        {message}
      </Typography>
      {onRetry && (
        <Button variant="contained" color="primary" onClick={onRetry}>
          Try Again
        </Button>
      )}
    </Box>
  );
};

export default ErrorState;
