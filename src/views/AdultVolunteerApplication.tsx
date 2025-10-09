import AdultVolunteerApplicationForm from '../components/forms/AdultVolunteerApplicationForm';
import { Container, Typography, Box } from '@mui/material';

const AdultVolunteerApplication = () => {
  return (
    <Container>
      <Box sx={{ my: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Inscrição de Adulto Voluntário
        </Typography>
        <AdultVolunteerApplicationForm />
      </Box>
    </Container>
  );
};

export default AdultVolunteerApplication;