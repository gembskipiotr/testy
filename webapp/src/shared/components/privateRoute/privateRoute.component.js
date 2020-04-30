import React from 'react';
import PropTypes from 'prop-types';
import { Route, Redirect, useLocation } from 'react-router-dom';
import { ROUTES } from '../../../routes/app.constants';

export const PrivateRoute = ({ component: Component, ...rest }) => {
  const location = useLocation();
  const renderRoute = (props) => (
    localStorage.getItem('user')
      ? <Component {...props} />
      : <Redirect to={{ pathname: ROUTES.login, state: { from: location } }} />
  );

  return <Route {...rest} render={renderRoute} />;
};

PrivateRoute.propTypes = {
  component: PropTypes.any,
};
