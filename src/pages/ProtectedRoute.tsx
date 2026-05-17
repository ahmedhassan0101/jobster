// src/pages/ProtectedRoute.tsx
import { Navigate } from 'react-router-dom';
import { useAppSelector } from '@/shared/hooks/redux';

interface ProtectedRouteProps {
  children: React.ReactNode;
}

const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  const { user } = useAppSelector((state) => state.user);

  if (!user) return <Navigate to="/landing" replace />;

  return <>{children}</>;
};

export default ProtectedRoute;