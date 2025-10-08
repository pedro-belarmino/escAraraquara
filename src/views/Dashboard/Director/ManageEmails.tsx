import { useState, useEffect } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import {
  Box,
  Button,
  CircularProgress,
  List,
  ListItem,
  ListItemText,
  IconButton,
  TextField,
  Typography,
  Paper,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  FormHelperText,
  Alert,
} from '@mui/material';
import { Delete as DeleteIcon } from '@mui/icons-material';
import { collection, getDocs, doc, setDoc, deleteDoc, query, where, getDoc } from 'firebase/firestore';
import { db } from '../../../firebase/config';
import { AuthorizedEmail, Role, User } from '../../../types';

interface FormData {
  email: string;
  role: Role.DIRETOR | Role.CHEFE;
}

const schema = yup.object().shape({
  email: yup.string().email('Deve ser um email válido.').required('Email é obrigatório.'),
  role: yup.string().oneOf([Role.DIRETOR, Role.CHEFE]).required('O cargo é obrigatório.'),
});

interface EnhancedAuthorizedEmail extends AuthorizedEmail {
  userName?: string;
}

const ManageEmails = () => {
  const [emails, setEmails] = useState<EnhancedAuthorizedEmail[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const { control, handleSubmit, reset, formState: { errors } } = useForm<FormData>({
    resolver: yupResolver(schema),
    defaultValues: {
      email: '',
      role: Role.CHEFE,
    },
  });

  const fetchEmails = async () => {
    setLoading(true);
    try {
      const authorizedEmailsSnapshot = await getDocs(collection(db, 'authorizedEmails'));
      const emailsData = authorizedEmailsSnapshot.docs.map(doc => ({ ...doc.data(), email: doc.id }) as AuthorizedEmail);

      // For each authorized email, check if a user exists with that email
      const enhancedEmailsData: EnhancedAuthorizedEmail[] = await Promise.all(
        emailsData.map(async (authEmail) => {
          const usersQuery = query(collection(db, 'users'), where('email', '==', authEmail.email));
          const userSnapshot = await getDocs(usersQuery);
          if (!userSnapshot.empty) {
            const userData = userSnapshot.docs[0].data() as User;
            return { ...authEmail, userName: userData.displayName };
          }
          return authEmail;
        })
      );

      setEmails(enhancedEmailsData);
    } catch (err) {
      setError('Falha ao carregar emails autorizados.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEmails();
  }, []);

  const handleAddEmail = async (data: FormData) => {
    try {
      const emailDocRef = doc(db, 'authorizedEmails', data.email);
      const docSnap = await getDoc(emailDocRef);

      if (docSnap.exists()) {
        setError('Este email já está na lista de autorizados.');
        return;
      }

      await setDoc(emailDocRef, { role: data.role });
      reset();
      fetchEmails(); // Refresh the list
      setError(null);
    } catch (err) {
      setError('Falha ao adicionar email.');
      console.error(err);
    }
  };

  const handleDeleteEmail = async (email: string) => {
    try {
      await deleteDoc(doc(db, 'authorizedEmails', email));
      fetchEmails(); // Refresh the list
    } catch (err) {
      setError('Falha ao remover email.');
      console.error(err);
    }
  };

  if (loading) {
    return <CircularProgress />;
  }

  return (
    <Paper elevation={3} sx={{ p: 3, mt: 4 }}>
      <Typography variant="h5" gutterBottom>Gerenciar Emails Autorizados</Typography>

      {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}

      <Box component="form" onSubmit={handleSubmit(handleAddEmail)} sx={{ display: 'flex', gap: 2, mb: 3 }}>
        <Controller
          name="email"
          control={control}
          render={({ field }) => <TextField {...field} label="Email" size="small" error={!!errors.email} helperText={errors.email?.message} />}
        />
        <FormControl size="small" error={!!errors.role} sx={{ minWidth: 120 }}>
          <InputLabel>Cargo</InputLabel>
          <Controller
            name="role"
            control={control}
            render={({ field }) => (
              <Select {...field} label="Cargo">
                <MenuItem value={Role.DIRETOR}>Diretor</MenuItem>
                <MenuItem value={Role.CHEFE}>Chefe</MenuItem>
              </Select>
            )}
          />
          <FormHelperText>{errors.role?.message}</FormHelperText>
        </FormControl>
        <Button type="submit" variant="contained">Adicionar</Button>
      </Box>

      <List>
        {emails.map(({ email, role, userName }) => (
          <ListItem key={email} secondaryAction={
            <IconButton edge="end" aria-label="delete" onClick={() => handleDeleteEmail(email)}>
              <DeleteIcon />
            </IconButton>
          }>
            <ListItemText
              primary={userName ? `${userName} (${email})` : email}
              secondary={`Cargo: ${role}`}
            />
          </ListItem>
        ))}
      </List>
    </Paper>
  );
};

export default ManageEmails;