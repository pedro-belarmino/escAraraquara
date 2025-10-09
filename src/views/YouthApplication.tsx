import YouthApplicationForm from '../components/forms/YouthApplicationForm';
import { Container, Typography, Box } from '@mui/material';

const YouthApplication = () => {
  return (
    <Container>
      <Box sx={{ my: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Inscrição de Jovem
        </Typography>
        <YouthApplicationForm />
      </Box>
    </Container>
  );
};

export default YouthApplication;