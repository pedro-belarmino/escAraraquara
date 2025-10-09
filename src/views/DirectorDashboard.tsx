import { useState, useEffect } from 'react';
import { Container, Typography, Box, Tabs, Tab } from '@mui/material';
import ApplicationsList from '../components/dashboard/ApplicationsList';
import EmailManager from '../components/dashboard/EmailManager';
import {
  getYouthApplications,
  getAdultVolunteerApplications,
  getAuthorizedEmails,
  updateApplicationStatus,
  addAuthorizedEmail,
  removeAuthorizedEmail,
} from '../services/firestore';
import { YouthApplication, AdultVolunteerApplication, User, Role, FormStatus, Branch } from '../types';

const DirectorDashboard = () => {
  const [youthApplications, setYouthApplications] = useState<YouthApplication[]>([]);
  const [adultVolunteerApplications, setAdultVolunteerApplications] = useState<AdultVolunteerApplication[]>([]);
  const [authorizedEmails, setAuthorizedEmails] = useState<(User & { email: string })[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentTab, setCurrentTab] = useState(0);

  const fetchData = async () => {
    setLoading(true);
    try {
      const [youthApps, adultApps, emails] = await Promise.all([
        getYouthApplications(),
        getAdultVolunteerApplications(),
        getAuthorizedEmails(),
      ]);
      setYouthApplications(youthApps);
      setAdultVolunteerApplications(adultApps);
      setAuthorizedEmails(emails);
    } catch (error) {
      console.error('Failed to fetch data:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setCurrentTab(newValue);
  };

  const handleUpdateStatus = async (
    applicationType: 'youth-applications' | 'adult-volunteer-applications',
    id: string,
    status: FormStatus
  ) => {
    try {
      await updateApplicationStatus(applicationType, id, status);
      fetchData(); // Refetch data to update the UI
    } catch (error) {
      console.error('Failed to update status:', error);
    }
  };

  const handleAddEmail = async (email: string, role: Role, branch?: Branch) => {
    try {
      await addAuthorizedEmail(email, role, branch);
      fetchData(); // Refetch data to update the UI
    } catch (error) {
      console.error('Failed to add email:', error);
    }
  };

  const handleRemoveEmail = async (email: string) => {
    try {
      await removeAuthorizedEmail(email);
      fetchData(); // Refetch data to update the UI
    } catch (error) {
      console.error('Failed to remove email:', error);
    }
  };

  return (
    <Container>
      <Typography variant="h4" sx={{ mt: 4, mb: 2 }}>
        Painel do Diretor
      </Typography>
      {loading ? (
        <p>Carregando...</p>
      ) : (
        <>
          <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
            <Tabs value={currentTab} onChange={handleTabChange}>
              <Tab label="Inscrições de Jovens" />
              <Tab label="Inscrições de Adultos" />
              <Tab label="Gerenciar E-mails" />
            </Tabs>
          </Box>

          {currentTab === 0 && (
            <ApplicationsList
              title="Inscrições de Jovens"
              applications={youthApplications}
              onUpdateStatus={(id, status) => handleUpdateStatus('youth-applications', id, status)}
            />
          )}
          {currentTab === 1 && (
            <ApplicationsList
              title="Inscrições de Adultos Voluntários"
              applications={adultVolunteerApplications}
              onUpdateStatus={(id, status) => handleUpdateStatus('adult-volunteer-applications', id, status)}
            />
          )}
          {currentTab === 2 && (
            <EmailManager
              emails={authorizedEmails}
              onAddEmail={handleAddEmail}
              onRemoveEmail={handleRemoveEmail}
            />
          )}
        </>
      )}
    </Container>
  );
};

export default DirectorDashboard;