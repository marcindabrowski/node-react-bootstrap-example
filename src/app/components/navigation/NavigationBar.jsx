import React from 'react';
import PropTypes from 'prop-types';
import Humburger from './humburger/Humburger';
import LeftNav from './leftNav/LeftNav';
import RightNav from './rightNav/RightNav';

const NavigationBar = props => (
  <nav className="navbar navbar-default">
    <div className="containersCustom">
      <div className="navbar-header">
        {
          <Humburger />
        }
        <a className="navbar-brand">
          {props.brand}
        </a>
      </div>
      <div
        className="collapse navbar-collapse"
        id="bs-example-navbar-collapse-1"
      >
        <ul className="nav navbar-nav">
          {
            <LeftNav
              leftLinks={props.navModel.leftLinks}
              onLeftNavButtonClick={props.handleLeftNavItemClick}
            />
          }
        </ul>
        <ul className="nav navbar-nav navbar-right">
          {
            <RightNav
              rightLinks={props.navModel.rightLinks}
              onRightNavButtonClick={props.handleRightNavItemClick}
            />
          }
        </ul>
      </div>
    </div>
  </nav>
);

NavigationBar.propTypes = {
  brand: PropTypes.string,
  handleLeftNavItemClick: PropTypes.func,
  handleRightNavItemClick: PropTypes.func,
  navModel: PropTypes.shape({
    leftLinks: PropTypes.arrayOf(
      PropTypes.shape({
        label: PropTypes.string.isRequired,
        link: PropTypes.string.isRequired,
      }),
    ).isRequired,
    rightLinks: PropTypes.arrayOf(
      PropTypes.shape({
        label: PropTypes.string.isRequired,
        link: PropTypes.string.isRequired,
      }),
    ).isRequired,
  }),
};

NavigationBar.defaultProps = {
  brand: 'brand',
  handleLeftNavItemClick: () => {},
  handleRightNavItemClick: () => {},
  navModel: {
    leftLinks: [],
    rightLinks: [],
  },
};

export default NavigationBar;
