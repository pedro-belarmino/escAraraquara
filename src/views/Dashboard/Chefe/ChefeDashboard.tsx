import { Typography, Paper, Box } from '@mui/material';

const ChefeDashboard = () => {
  return (
    <Paper elevation={3} sx={{ p: 3 }}>
      <Typography variant="h4" gutterBottom>
        Chefe Dashboard
      </Typography>
      <Box>
        <Typography variant="body1">
          Access to forms and statistics for your specific branch.
        </Typography>
        {/* Chefe-specific components for branch forms and stats will go here */}
      </Box>
    </Paper>
  );
};

export default ChefeDashboard;