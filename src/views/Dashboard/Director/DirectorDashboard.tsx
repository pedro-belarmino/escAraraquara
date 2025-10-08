import { Typography, Paper, Box, Tab, Tabs } from '@mui/material';
import { useState } from 'react';
import ManageEmails from './ManageEmails';

const DirectorDashboard = () => {
  const [tabIndex, setTabIndex] = useState(0);

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setTabIndex(newValue);
  };

  return (
    <Paper elevation={3} sx={{ p: 3 }}>
      <Typography variant="h4" gutterBottom>
        Director Dashboard
      </Typography>

      <Box sx={{ borderBottom: 1, borderColor: 'divider', mb: 3 }}>
        <Tabs value={tabIndex} onChange={handleTabChange} aria-label="director dashboard tabs">
          <Tab label="Visão Geral" />
          <Tab label="Gerenciar Emails" />
          <Tab label="Inscrições Jovens" />
          <Tab label="Inscrições Adultos" />
        </Tabs>
      </Box>

      {tabIndex === 0 && (
        <Box>
          <Typography variant="h6">Estatísticas Gerais</Typography>
          <Typography variant="body1">
            Access to all forms, statistics, and user management.
            {/* Placeholder for general statistics */}
          </Typography>
        </Box>
      )}

      {tabIndex === 1 && (
        <ManageEmails />
      )}

      {tabIndex === 2 && (
        <Box>
          <Typography variant="h6">Inscrições de Jovens</Typography>
          {/* Placeholder for youth applications list */}
        </Box>
      )}

      {tabIndex === 3 && (
        <Box>
          <Typography variant="h6">Inscrições de Adultos Voluntários</Typography>
          {/* Placeholder for adult volunteer applications list */}
        </Box>
      )}
    </Paper>
  );
};

export default DirectorDashboard;