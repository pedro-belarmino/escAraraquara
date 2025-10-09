import { Card, CardContent, Typography, Box } from '@mui/material';

interface StatsCardProps {
  title: string;
  stats: {
    pending: number;
    accepted: number;
    rejected: number;
  };
}

const StatsCard = ({ title, stats }: StatsCardProps) => {
  return (
    <Card>
      <CardContent>
        <Typography variant="h6" gutterBottom>
          {title}
        </Typography>
        <Box>
          <Typography>Pendentes: {stats.pending}</Typography>
          <Typography>Aprovadas: {stats.accepted}</Typography>
          <Typography>Rejeitadas: {stats.rejected}</Typography>
        </Box>
      </CardContent>
    </Card>
  );
};

export default StatsCard;