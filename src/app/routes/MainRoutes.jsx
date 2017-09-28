import React from 'react';
import {
  Route,
  Switch,
} from 'react-router';
import Home from '../views/home/Home';
import About from '../views/about/About';
import RegisterClaim from '../views/registerClaim/RegisterClaim';
import ManageClaims from '../views/manageClaims/ManageClaims';
import PrivateRoute from '../components/privateRoute/PrivateRoute';

const MainRoutes = () => (
  <Switch>
    <Route exact path="/" component={Home} />
    <Route path="/registerClaim" component={RegisterClaim} />
    <Route path="/about" component={About} />
    {/* private views: need user to be authenticated */}
    <PrivateRoute path="/manageClaims" component={ManageClaims} />
  </Switch>
);

export default MainRoutes;
