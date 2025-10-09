import { useAuth } from '../../contexts/AuthContext';
import { Navigate } from 'react-router-dom';
import { Role } from '../../types';

interface ProtectedRouteProps {
  children: React.ReactElement;
  allowedRoles: Role[];
}

const ProtectedRoute = ({ children, allowedRoles }: ProtectedRouteProps) => {
  const { user, loading } = useAuth();

  if (loading) {
    return <div>Carregando...</div>;
  }

  if (!user) {
    return <Navigate to="/login" />;
  }

  if (!allowedRoles.includes(user.role)) {
    return <Navigate to="/" />;
  }

  return children;
};

export default ProtectedRoute;