import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  Box,
  Typography,
} from '@mui/material';
import { YouthApplication, AdultVolunteerApplication, FormStatus } from '../../types';

type Application = YouthApplication | AdultVolunteerApplication;

interface ApplicationsListProps {
  title: string;
  applications: Application[];
  onUpdateStatus: (id: string, status: FormStatus) => void;
}

const ApplicationsList = ({ title, applications, onUpdateStatus }: ApplicationsListProps) => {
  const isYouthApplication = (app: Application): app is YouthApplication => 'memberName' in app;

  return (
    <Box sx={{ mt: 4 }}>
      <Typography variant="h6" gutterBottom>
        {title}
      </Typography>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Nome</TableCell>
              <TableCell>Idade</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Ações</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {applications.map((app) => (
              <TableRow key={app.id}>
                <TableCell>{isYouthApplication(app) ? app.memberName : app.fullName}</TableCell>
                <TableCell>{app.age}</TableCell>
                <TableCell>{app.status}</TableCell>
                <TableCell>
                  <Button
                    variant="contained"
                    color="success"
                    size="small"
                    onClick={() => onUpdateStatus(app.id, 'accepted')}
                    sx={{ mr: 1 }}
                  >
                    Aprovar
                  </Button>
                  <Button
                    variant="contained"
                    color="error"
                    size="small"
                    onClick={() => onUpdateStatus(app.id, 'rejected')}
                  >
                    Rejeitar
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default ApplicationsList;