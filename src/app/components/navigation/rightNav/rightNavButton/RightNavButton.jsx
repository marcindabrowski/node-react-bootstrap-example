import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

const RightNavButton = (props) => {
  const handleRightNavItemClick = (event) => {
    props.onClick(event, props.viewName);
  };

  return (
    <li>
      <Link
        to={props.link}
        onClick={handleRightNavItemClick}
      >
        {props.label}
      </Link>
    </li>
  );
};

RightNavButton.propTypes = {
  link: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  viewName: PropTypes.string,
  onClick: PropTypes.func.isRequired,
};

RightNavButton.defaultProps = {
  viewName: null,
};

export default RightNavButton;
