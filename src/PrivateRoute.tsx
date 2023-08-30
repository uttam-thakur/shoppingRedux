import React from 'react';
import { Route, Navigate, RouteProps } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from './store/store';

interface PrivateRouteProps {
  element: React.ReactElement;
  path:string
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({ element, ...rest }) => {
  const accessToken = useSelector((state: RootState) => state.auth?.userCredential?.accessToken);

  // If accessToken is present, render the element, otherwise redirect to login
  return accessToken ? <Route {...rest} element={element} /> : <Navigate to="/" />;
};

export default PrivateRoute;
