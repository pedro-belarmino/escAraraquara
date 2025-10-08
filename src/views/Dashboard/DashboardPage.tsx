import { useAuth } from "../../hooks/useAuth";
import { Role } from "../../types";
import { Box, CircularProgress, Typography } from "@mui/material";
import DeveloperDashboard from "./Developer/DeveloperDashboard";
import DirectorDashboard from "./Director/DirectorDashboard";
import ChefeDashboard from "./Chefe/ChefeDashboard";

const DashboardPage = () => {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <CircularProgress />
      </Box>
    );
  }

  if (!user) {
    // This should ideally not be reached if ProtectedRoute is used correctly
    return <Typography>No user data found.</Typography>;
  }

  const renderDashboard = () => {
    switch (user.role) {
      case Role.DESENVOLVEDOR:
        return <DeveloperDashboard />;
      case Role.DIRETOR:
        return <DirectorDashboard />;
      case Role.CHEFE:
        return <ChefeDashboard />;
      default:
        // Handle unknown roles or redirect
        return <Typography>Role not recognized.</Typography>;
    }
  };

  return (
    <Box sx={{ p: 3 }}>
      {renderDashboard()}
    </Box>
  );
};

export default DashboardPage;