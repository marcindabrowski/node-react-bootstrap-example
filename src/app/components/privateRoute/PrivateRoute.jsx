import React from 'react';
import PropTypes from 'prop-types';
import {
  Route,
  Redirect,
  withRouter,
} from 'react-router-dom';
import Auth from '../../services/auth/Auth';

const PrivateRoute = (props) => {
  const {
    component: InnerComponent,
    ...rest
  } = props;
  const { location } = props;

  const isUserAuthenticated = Auth.isUserAuthenticated();
  const isTokenExpired = Auth.isTokenExpired();

  return (
    <Route
      {...rest}
      render={
        innerProps => (
          !isTokenExpired && isUserAuthenticated
            ? <InnerComponent {...innerProps} />
            : <Redirect to={{ pathname: '/login', state: { from: location } }} />
        )
      }
    />
  );
};

PrivateRoute.propTypes = {
  /* eslint-disable react/forbid-prop-types */
  // react-router 4:
  location: PropTypes.object.isRequired,

  component: PropTypes.any.isRequired,
  /* eslint-enable react/forbid-prop-types */
};


export default withRouter(PrivateRoute);
