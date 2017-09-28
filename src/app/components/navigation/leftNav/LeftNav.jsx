import React from 'react';
import PropTypes from 'prop-types';
import LeftNavButton from './leftNavButton/LeftNavButton';
import Auth from '../../../services/auth/Auth';

const LeftNav = ({
  leftLinks,
  onLeftNavButtonClick,
}) => {
  let links;
  if (Auth.isUserAuthenticated()) {
    links = leftLinks.filter(link => link.forAuthenticatedUsers);
  } else {
    links = leftLinks.filter(link => link.forUnauthenticatedUsers);
  }
  return (
    <ul className="nav navbar-nav">
      {
        links.map(
          (aLinkBtn, index) => {
            const key = index;
            return (
              <LeftNavButton
                key={key}
                link={aLinkBtn.link}
                label={aLinkBtn.label}
                viewName={aLinkBtn.view}
                onClick={onLeftNavButtonClick}
              />
            );
          },
        )
      }
    </ul>
  );
};

LeftNav.propTypes = {
  leftLinks: PropTypes.arrayOf(
    PropTypes.shape({
      link: PropTypes.string,
      label: PropTypes.string,
      viewName: PropTypes.string,
      forAuthenticatedUsers: PropTypes.boolean,
      forUnauthenticatedUsers: PropTypes.boolean,
    }),
  ),
  onLeftNavButtonClick: PropTypes.func,
};

LeftNav.defaultProps = {
  leftLinks: [],
  onLeftNavButtonClick: () => {},
};

export default LeftNav;
