import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';

const AnimatedView = props => (
  <section
    className={
      cx({
        content: true,
        'view-enter': props.animated,
      })
    }
  >
    { props.children }
  </section>
);

AnimatedView.propTypes = {
  animated: PropTypes.bool,
  children: PropTypes.node,
};

AnimatedView.defaultProps = {
  animated: true,
  children: null,
};

export default AnimatedView;
