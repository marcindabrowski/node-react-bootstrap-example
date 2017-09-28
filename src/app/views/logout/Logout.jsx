import React, {
  PureComponent,
} from 'react';
import {
  Route,
  Redirect,
} from 'react-router-dom';
import Auth from '../../services/auth/Auth';

class Logout extends PureComponent {
  componentDidMount() {
    Auth.deauthenticateUser();
  }

  render() {
    return (
      <Route {...this.props}>
        <Redirect to={{ pathname: '/' }} />
      </Route>
    );
  }
}

export default Logout;
