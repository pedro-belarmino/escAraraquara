import { useAuth } from '../contexts/AuthContext';
import { Navigate } from 'react-router-dom';
import { Button, Container, Typography, Box } from '@mui/material';

const Login = () => {
  const { user, signIn, loading } = useAuth();

  if (loading) {
    return (
      <Container>
        <Typography>Carregando...</Typography>
      </Container>
    );
  }

  if (user) {
    switch (user.role) {
      case 'DESENVOLVEDOR':
        return <Navigate to="/developer" />;
      case 'DIRETOR':
        return <Navigate to="/director" />;
      case 'CHEFE':
        return <Navigate to="/leader" />;
      default:
        return <Navigate to="/" />;
    }
  }

  return (
    <Container>
      <Box
        display="flex"
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
        minHeight="100vh"
      >
        <Typography variant="h4" gutterBottom>
          Área Restrita
        </Typography>
        <Typography variant="body1" align="center" gutterBottom>
          Para acessar o painel, você precisa fazer login com sua conta Google.
        </Typography>
        <Button variant="contained" color="primary" onClick={signIn}>
          Login com Google
        </Button>
      </Box>
    </Container>
  );
};

export default Login;