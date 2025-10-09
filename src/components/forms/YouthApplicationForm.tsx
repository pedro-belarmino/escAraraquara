import { useState, useEffect } from 'react';
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
import { Branch, Section, branchesAndSections } from '../../types';
import { submitYouthApplication } from '../../services/firestore';

const YouthApplicationForm = () => {
  const [memberName, setMemberName] = useState('');
  const [age, setAge] = useState<number | ''>('');
  const [branch, setBranch] = useState<Branch | ''>('');
  const [section, setSection] = useState<Section | ''>('');
  const [cpf, setCpf] = useState('');
  const [responsiblePersonName, setResponsiblePersonName] = useState('');
  const [memberContact, setMemberContact] = useState('');
  const [responsibleContact, setResponsibleContact] = useState('');
  const [availableSections, setAvailableSections] = useState<Section[]>([]);
  const [loading, setLoading] = useState(false);
  const [feedback, setFeedback] = useState<{ open: boolean; message: string; severity: 'success' | 'error' }>({
    open: false,
    message: '',
    severity: 'success',
  });

  const isPioneiro = branch === 'Pioneiro';

  useEffect(() => {
    if (branch) {
      setAvailableSections(branchesAndSections[branch].sections as Section[]);
      setSection('');
    } else {
      setAvailableSections([]);
      setSection('');
    }
  }, [branch]);

  const resetForm = () => {
    setMemberName('');
    setAge('');
    setBranch('');
    setSection('');
    setCpf('');
    setResponsiblePersonName('');
    setMemberContact('');
    setResponsibleContact('');
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setLoading(true);

    if (!age || !branch || !section) {
        setFeedback({ open: true, message: 'Por favor, preencha todos os campos obrigatórios.', severity: 'error' });
        setLoading(false);
        return;
    }

    try {
      await submitYouthApplication({
        memberName,
        age: Number(age),
        branch,
        section,
        cpf,
        responsiblePersonName: isPioneiro ? undefined : responsiblePersonName,
        memberContact,
        responsibleContact: isPioneiro ? undefined : responsibleContact,
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
          Ficha de Inscrição - Jovem
        </Typography>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <TextField
              label="Nome do Jovem"
              value={memberName}
              onChange={(e) => setMemberName(e.target.value)}
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
            <TextField
              label="CPF"
              value={cpf}
              onChange={(e) => setCpf(e.target.value)}
              fullWidth
              required
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <FormControl fullWidth required>
              <InputLabel id="ramo-select-label">Ramo</InputLabel>
              <Select
                labelId="ramo-select-label"
                id="ramo-select"
                value={branch}
                onChange={(e) => setBranch(e.target.value as Branch)}
                label="Ramo"
              >
                {Object.keys(branchesAndSections).map((b) => (
                  <MenuItem key={b} value={b}>{b}</MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={6}>
            <FormControl fullWidth required disabled={!branch}>
              <InputLabel id="secao-select-label">Seção</InputLabel>
              <Select
                labelId="secao-select-label"
                id="secao-select"
                value={section}
                onChange={(e) => setSection(e.target.value as Section)}
                label="Seção"
              >
                {availableSections.map((s) => (
                  <MenuItem key={s} value={s}>{s}</MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          {!isPioneiro && (
            <>
              <Grid item xs={12}>
                <TextField
                  label="Nome do Responsável"
                  value={responsiblePersonName}
                  onChange={(e) => setResponsiblePersonName(e.target.value)}
                  fullWidth
                  required
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  label="Contato do Responsável"
                  value={responsibleContact}
                  onChange={(e) => setResponsibleContact(e.target.value)}
                  fullWidth
                  required
                />
              </Grid>
            </>
          )}
          <Grid item xs={12} sm={isPioneiro ? 12 : 6}>
            <TextField
              label="Contato do Jovem"
              value={memberContact}
              onChange={(e) => setMemberContact(e.target.value)}
              fullWidth
              required
            />
          </Grid>
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

export default YouthApplicationForm;