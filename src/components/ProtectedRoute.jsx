import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import LoadingSpinner from './LoadingSpinner';

const ProtectedRoute = ({ children, allowedRoles, requiresAuth = true }) => {
  const { isAuthenticated, loading, user } = useAuth();
  const location = useLocation();

  if (loading) {
    return <LoadingSpinner />;
  }

  // Check if authentication is required
  if (requiresAuth && !isAuthenticated) {
    return <Navigate to='/signin' state={{ from: location }} replace />;
  }

  // Check if specific roles are required
  if (allowedRoles && allowedRoles.length > 0) {
    if (!isAuthenticated) {
      return <Navigate to='/signin' state={{ from: location }} replace />;
    }

    if (!user || !user.role || !allowedRoles.includes(user.role)) {
      // User doesn't have required role, redirect to home or show unauthorized
      return <Navigate to='/' replace />;
    }
  }

  return children;
};

export default ProtectedRoute;
