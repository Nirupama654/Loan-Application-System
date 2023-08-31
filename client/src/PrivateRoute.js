import React from 'react';
import { Route, Navigate } from 'react-router-dom';
import { useAuth } from './AuthContext';

const PrivateRoute = ({ path, ...props }) => {
  const { isAuthenticated } = useAuth();

  return isAuthenticated ? (
    <Route path={path} {...props} />
  ) : (
    <Navigate to="/login" />
  );
};

export default PrivateRoute;
