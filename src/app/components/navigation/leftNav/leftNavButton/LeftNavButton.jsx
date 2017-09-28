import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

const LeftNavButton = (props) => {
  const handleLeftNavItemClick = (event) => {
    props.onClick(event, props.viewName);
  };

  return (
    <li>
      <Link
        to={props.link}
        onClick={handleLeftNavItemClick}
      >
        {props.label}
      </Link>
    </li>
  );
};

LeftNavButton.propTypes = {
  link: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  viewName: PropTypes.string,
  onClick: PropTypes.func.isRequired,
};

LeftNavButton.defaultProps = {
  viewName: null,
};


export default LeftNavButton;
