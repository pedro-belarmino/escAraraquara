import { useState } from 'react';
import {
  TextField,
  Button,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Grid,
  Typography,
  Container,
  Box,
  CircularProgress,
  Snackbar,
  Alert,
} from '@mui/material';
import { AdultVolunteerRole, Section, DirigenteArea, branchesAndSections } from '../../types';
import { submitAdultVolunteerApplication } from '../../services/firestore';

const allSections = Object.values(branchesAndSections).flatMap(branch => branch.sections) as Section[];
const dirigenteAreas: DirigenteArea[] = ['administrative', 'financial', 'infrastructure'];

const AdultVolunteerApplicationForm = () => {
  const [fullName, setFullName] = useState('');
  const [age, setAge] = useState<number | ''>('');
  const [desiredRole, setDesiredRole] = useState<AdultVolunteerRole | ''>('');
  const [preferredSection, setPreferredSection] = useState<Section | ''>('');
  const [preferredArea, setPreferredArea] = useState<DirigenteArea | ''>('');
  const [loading, setLoading] = useState(false);
  const [feedback, setFeedback] = useState<{ open: boolean; message: string; severity: 'success' | 'error' }>({
    open: false,
    message: '',
    severity: 'success',
  });

  const resetForm = () => {
    setFullName('');
    setAge('');
    setDesiredRole('');
    setPreferredSection('');
    setPreferredArea('');
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setLoading(true);

    if (!age || !desiredRole) {
        setFeedback({ open: true, message: 'Por favor, preencha todos os campos obrigatórios.', severity: 'error' });
        setLoading(false);
        return;
    }

    try {
      await submitAdultVolunteerApplication({
        fullName,
        age: Number(age),
        desiredRole,
        preferredSection: desiredRole === 'Escotista' ? preferredSection : undefined,
        preferredArea: desiredRole === 'Dirigente' ? preferredArea : undefined,
      });
      setFeedback({ open: true, message: 'Inscrição enviada com sucesso!', severity: 'success' });
      resetForm();
    } catch (error) {
      setFeedback({ open: true, message: 'Erro ao enviar inscrição. Tente novamente.', severity: 'error' });
    } finally {
      setLoading(false);
    }
  };

  const handleCloseFeedback = () => {
    setFeedback({ ...feedback, open: false });
  };

  return (
    <Container maxWidth="md">
      <Snackbar open={feedback.open} autoHideDuration={6000} onClose={handleCloseFeedback}>
        <Alert onClose={handleCloseFeedback} severity={feedback.severity} sx={{ width: '100%' }}>
          {feedback.message}
        </Alert>
      </Snackbar>
      <Box component="form" onSubmit={handleSubmit} sx={{ mt: 4 }}>
        <Typography variant="h5" gutterBottom>
          Ficha de Inscrição - Adulto Voluntário
        </Typography>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <TextField
              label="Nome Completo"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              fullWidth
              required
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              label="Idade"
              type="number"
              value={age}
              onChange={(e) => setAge(e.target.value === '' ? '' : Number(e.target.value))}
              fullWidth
              required
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <FormControl fullWidth required>
              <InputLabel id="funcao-desejada-select-label">Função Desejada</InputLabel>
              <Select
                labelId="funcao-desejada-select-label"
                id="funcao-desejada-select"
                value={desiredRole}
                onChange={(e) => setDesiredRole(e.target.value as AdultVolunteerRole)}
                label="Função Desejada"
              >
                <MenuItem value="Escotista">Escotista (Assistente de Chefe)</MenuItem>
                <MenuItem value="Dirigente">Dirigente (Apoio Administrativo)</MenuItem>
              </Select>
            </FormControl>
          </Grid>

          {desiredRole === 'Escotista' && (
            <Grid item xs={12}>
              <FormControl fullWidth required>
                <InputLabel id="secao-preferencia-select-label">Seção de Preferência</InputLabel>
                <Select
                  labelId="secao-preferencia-select-label"
                  id="secao-preferencia-select"
                  value={preferredSection}
                  onChange={(e) => setPreferredSection(e.target.value as Section)}
                  label="Seção de Preferência"
                >
                  {allSections.map((s) => (
                    <MenuItem key={s} value={s}>{s}</MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
          )}

          {desiredRole === 'Dirigente' && (
            <Grid item xs={12}>
              <FormControl fullWidth required>
                <InputLabel id="area-atuacao-select-label">Área de Atuação</InputLabel>
                <Select
                  labelId="area-atuacao-select-label"
                  id="area-atuacao-select"
                  value={preferredArea}
                  onChange={(e) => setPreferredArea(e.target.value as DirigenteArea)}
                  label="Área de Atuação"
                >
                  {dirigenteAreas.map((area) => (
                    <MenuItem key={area} value={area}>
                      {area.charAt(0).toUpperCase() + area.slice(1)}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
          )}

          <Grid item xs={12}>
            <Box sx={{ position: 'relative' }}>
              <Button type="submit" variant="contained" color="primary" fullWidth disabled={loading}>
                Enviar Inscrição
              </Button>
              {loading && (
                <CircularProgress
                  size={24}
                  sx={{
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    marginTop: '-12px',
                    marginLeft: '-12px',
                  }}
                />
              )}
            </Box>
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
};

export default AdultVolunteerApplicationForm;