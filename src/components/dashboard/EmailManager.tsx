import { useState } from 'react';
import {
  Box,
  Button,
  TextField,
  Typography,
  List,
  ListItem,
  ListItemText,
  IconButton,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import { User, Role, Branch, branchesAndSections } from '../../types';

interface EmailManagerProps {
  emails: (User & { email: string })[];
  onAddEmail: (email: string, role: Role, branch?: Branch) => void;
  onRemoveEmail: (email: string) => void;
}

const EmailManager = ({ emails, onAddEmail, onRemoveEmail }: EmailManagerProps) => {
  const [newEmail, setNewEmail] = useState('');
  const [newRole, setNewRole] = useState<Role>('CHEFE');
  const [newBranch, setNewBranch] = useState<Branch | ''>('');

  const handleAddEmail = () => {
    if (newEmail && newRole) {
      if (newRole === 'CHEFE' && !newBranch) {
        alert('Por favor, selecione um ramo para o Chefe.');
        return;
      }
      onAddEmail(newEmail, newRole, newRole === 'CHEFE' ? (newBranch as Branch) : undefined);
      setNewEmail('');
      setNewRole('CHEFE');
      setNewBranch('');
    }
  };

  return (
    <Box sx={{ mt: 4 }}>
      <Typography variant="h6" gutterBottom>
        Gerenciar E-mails Autorizados
      </Typography>
      <Box sx={{ display: 'flex', gap: 2, mb: 2 }}>
        <TextField
          label="Novo E-mail"
          variant="outlined"
          size="small"
          value={newEmail}
          onChange={(e) => setNewEmail(e.target.value)}
        />
        <FormControl size="small" sx={{ minWidth: 120 }}>
          <InputLabel>Função</InputLabel>
          <Select
            value={newRole}
            onChange={(e) => setNewRole(e.target.value as Role)}
            label="Função"
          >
            <MenuItem value="DIRETOR">Diretor</MenuItem>
            <MenuItem value="CHEFE">Chefe</MenuItem>
          </Select>
        </FormControl>
        {newRole === 'CHEFE' && (
          <FormControl size="small" sx={{ minWidth: 120 }}>
            <InputLabel>Ramo</InputLabel>
            <Select
              value={newBranch}
              onChange={(e) => setNewBranch(e.target.value as Branch)}
              label="Ramo"
            >
              {Object.keys(branchesAndSections).map((b) => (
                <MenuItem key={b} value={b}>{b}</MenuItem>
              ))}
            </Select>
          </FormControl>
        )}
        <Button variant="contained" onClick={handleAddEmail}>
          Adicionar
        </Button>
      </Box>
      <List>
        {emails.map((user) => (
          <ListItem
            key={user.email}
            secondaryAction={
              <IconButton edge="end" aria-label="delete" onClick={() => onRemoveEmail(user.email)}>
                <DeleteIcon />
              </IconButton>
            }
          >
            <ListItemText primary={user.email} secondary={`${user.role} ${user.branch ? '- ' + user.branch : ''}`} />
          </ListItem>
        ))}
      </List>
    </Box>
  );
};

export default EmailManager;