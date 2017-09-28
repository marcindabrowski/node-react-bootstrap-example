import React from 'react';
import {
  HashRouter as Router,
  Switch,
  Route,
} from 'react-router-dom';
import createBrowserHistory from 'history/createBrowserHistory';
import App from './containers/app/App';
import Login from './views/login/Login';
import Logout from './views/logout/Logout';
import PageNotFound from './views/pageNotFound/PageNotFound'; // not connected to redux (no index.js)

const browserHistory = createBrowserHistory();

const Root = () => (
  <Router history={browserHistory}>
    <Switch>
      <Route exact path="/login" component={Login} />
      <Route path="/logout" component={Logout} />
      <App />
      <Route component={PageNotFound} />
    </Switch>
  </Router>
);

export default Root;
