import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import UpIcon from './UpIcon';

const defaultBackGroundColor = '#4A4A4A';
const sideOffset = '-10px';
const bottomOffset = '40px';
const defaultWidth = '100px';
const defaultZindex = 10;
const defaultOpacity = 0.5;
const defaultStyle = {
  position: 'fixed',
  right: sideOffset,
  left: '',
  bottom: bottomOffset,
  width: defaultWidth,
  zIndex: defaultZindex,
  opacity: defaultOpacity,
  backgroundColor: defaultBackGroundColor,
};

function setPosition(position = 'bottom-right', refStyle = defaultStyle) {
  const style = { ...refStyle };

  switch (position) {
    case 'bottom-right':
      style.right = sideOffset;
      style.left = '';
      return style;

    case 'bottom-left':
      style.right = '';
      style.left = sideOffset;
      return style;

    default:
      return refStyle;
  }
}

const BackToTopButton = (props) => {
  const buttonStyle = setPosition(props.position, { ...props.motionStyle, ...defaultStyle });

  return (
    <button
      style={buttonStyle}
      className={cx({
        btn: true,
      })}
      onClick={props.onClick}
    >
      {
        !props.children &&
          <div style={{ marginRight: '10px' }}>
            <UpIcon color={'#F1F1F1'} />
          </div>
      }
      {
        !!props.children && props.children
      }
    </button>
  );
};

BackToTopButton.propTypes = {
  position: PropTypes.oneOf(['bottom-left', 'bottom-right']),
  onClick: PropTypes.func.isRequired,
  children: PropTypes.node,
  motionStyle: PropTypes.object, // eslint-disable-line react/forbid-prop-types
};

BackToTopButton.defaultProps = {
  position: 'bottom-right',
  children: null,
  motionStyle: [],
};

export default BackToTopButton;
