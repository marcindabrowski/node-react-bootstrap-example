import React, {
  Component,
} from 'react';
import { withRouter } from 'react-router';
import {
  NavigationBar,
  BackToTop,
} from '../../components';
import navigationModel from '../../config/navigation.json';
import MainRoutes from '../../routes/MainRoutes';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = { navModel: navigationModel };
    this.handleLeftNavItemClick = this.handleLeftNavItemClick.bind(this);
    this.handleRightNavItemClick = this.handleRightNavItemClick.bind(this);
  }

  /* eslint-disable no-unused-vars, class-methods-use-this */
  handleLeftNavItemClick(event, viewName) {
    // something to do here?
  }

  handleRightNavItemClick(event, viewName) {
    // something to do here?
  }
  /* eslint-enable no-unused-vars, class-methods-use-this */

  render() {
    const { navModel } = this.state;

    return (
      <div id="appContainer">
        <NavigationBar
          brand={navModel.brand}
          navModel={navModel}
          handleLeftNavItemClick={this.handleLeftNavItemClick}
          handleRightNavItemClick={this.handleRightNavItemClick}
        />
        <div className="container-fluid">
          <MainRoutes />
        </div>
        <BackToTop
          minScrollY={40}
          scrollTo={'appContainer'}
        />
      </div>
    );
  }
}

export default withRouter(App);
