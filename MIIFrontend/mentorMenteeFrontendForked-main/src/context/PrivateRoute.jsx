import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from './AuthContext'; // Use the custom hook

const PrivateRoute = ({ children, requiredRole }) => {
  const { token, role } = useAuth(); //Destructure token and role directly
  const location = useLocation();

  if (!token) {
    return <Navigate to="/login" replace />;
  }

  if (role !== requiredRole) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default PrivateRoute;
