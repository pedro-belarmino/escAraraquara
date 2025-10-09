import { useState, useEffect } from 'react';
import { Container, Typography, Box } from '@mui/material';
import ApplicationsList from '../components/dashboard/ApplicationsList';
import StatsCard from '../components/dashboard/StatsCard';
import { useAuth } from '../contexts/AuthContext';
import { getYouthApplications, updateApplicationStatus } from '../services/firestore';
import { YouthApplication, FormStatus } from '../types';

const LeaderDashboard = () => {
  const { user } = useAuth();
  const [applications, setApplications] = useState<YouthApplication[]>([]);
  const [stats, setStats] = useState({ pending: 0, accepted: 0, rejected: 0 });
  const [loading, setLoading] = useState(true);

  const fetchData = async () => {
    if (!user || !user.branch) return;

    setLoading(true);
    try {
      const apps = await getYouthApplications(user.branch);
      setApplications(apps);

      const pending = apps.filter((app) => app.status === 'pending').length;
      const accepted = apps.filter((app) => app.status === 'accepted').length;
      const rejected = apps.filter((app) => app.status === 'rejected').length;
      setStats({ pending, accepted, rejected });
    } catch (error) {
      console.error('Failed to fetch data:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [user]);

  const handleUpdateStatus = async (id: string, status: FormStatus) => {
    try {
      await updateApplicationStatus('youth-applications', id, status);
      fetchData(); // Refetch data to update the UI
    } catch (error) {
      console.error('Failed to update status:', error);
    }
  };

  if (loading) {
    return <Container><p>Carregando...</p></Container>;
  }

  return (
    <Container>
      <Typography variant="h4" sx={{ mt: 4, mb: 2 }}>
        Painel do Chefe - Ramo {user?.branch}
      </Typography>
      <Box sx={{ mb: 4 }}>
        <StatsCard title="Estatísticas de Inscrições" stats={stats} />
      </Box>
      <ApplicationsList
        title="Inscrições do seu Ramo"
        applications={applications}
        onUpdateStatus={handleUpdateStatus}
      />
    </Container>
  );
};

export default LeaderDashboard;