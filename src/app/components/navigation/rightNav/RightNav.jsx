import React from 'react';
import PropTypes from 'prop-types';
import RightNavButton from './rightNavButton/RightNavButton';
import Auth from '../../../services/auth/Auth';

const RightNav = (props) => {
  let links;
  if (Auth.isUserAuthenticated()) {
    links = props.rightLinks.filter(link => link.forAuthenticatedUsers);
  } else {
    links = props.rightLinks.filter(link => link.forUnauthenticatedUsers);
  }
  return (
    <ul className="nav navbar-nav navbar-right">
      {
        links.map(
          (aLinkBtn, index) => {
            const key = index;
            return (
              <RightNavButton
                key={key}
                link={aLinkBtn.link}
                label={aLinkBtn.label}
                viewName={aLinkBtn.view}
                onClick={props.onRightNavButtonClick}
              />
            );
          },
        )
      }
    </ul>
  );
};

RightNav.propTypes = {
  rightLinks: PropTypes.arrayOf(
    PropTypes.shape({
      link: PropTypes.string,
      label: PropTypes.string,
      viewName: PropTypes.string,
      forAuthenticatedUsers: PropTypes.boolean,
      forUnauthenticatedUsers: PropTypes.boolean,
    }),
  ),
  onRightNavButtonClick: PropTypes.func,
};

RightNav.defaultProps = {
  rightLinks: [],
  onRightNavButtonClick: () => {},
};

export default RightNav;
