import { Button, Container, Typography, Box, CircularProgress, Alert } from "@mui/material";
import { useAuth } from "../hooks/useAuth";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

const LoginPage = () => {
  const { login, user, loading } = useAuth();
  const navigate = useNavigate();
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (user) {
      // Redirect based on role
      // For now, let's just redirect to a generic dashboard
      navigate("/dashboard");
    }
  }, [user, navigate]);

  const handleLogin = async () => {
    setError(null);
    try {
      await login();
      // The useEffect will handle the redirect
    } catch (err: any) {
      setError(err.message || "Ocorreu um erro durante o login.");
    }
  };

  if (loading || user) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Container maxWidth="sm">
      <Box
        sx={{
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Typography component="h1" variant="h5">
          Área Restrita
        </Typography>
        <Typography variant="body1" sx={{ mt: 1, mb: 3 }}>
          Acesso exclusivo para escotistas e dirigentes.
        </Typography>
        {error && <Alert severity="error" sx={{ mb: 2, width: '100%' }}>{error}</Alert>}
        <Button
          variant="contained"
          onClick={handleLogin}
          disabled={loading}
        >
          {loading ? <CircularProgress size={24} /> : "Login com Google"}
        </Button>
      </Box>
    </Container>
  );
};

export default LoginPage;