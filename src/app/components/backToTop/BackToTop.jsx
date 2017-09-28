/* global $:true */

import React, {
  Component,
} from 'react';
import PropTypes from 'prop-types';
import { Motion, spring } from 'react-motion';
import smoothScroll from './lib/smoothScroll';
import BackToTopButton from './backToTopButton/BackToTopButton';

class BackToTop extends Component {
  constructor(props) {
    super(props);
    this.state = {
      windowScrollY: 0,
      showBackButton: false,
    };
  }

  componentWillMount() {
    window.addEventListener('scroll', this.handleWindowScroll);
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this.handleWindowScroll);
  }

  handleWindowScroll() {
    if ($) {
      const { windowScrollY } = this.state;
      const { minScrollY } = this.props;
      const currentWindowScrollY = $(window).scrollTop();

      if (windowScrollY !== currentWindowScrollY) {
        // console.log('scrollTop: ', currentWindowScrollY);
        const shouldShowBackButton = currentWindowScrollY >= minScrollY;

        this.setState({
          windowScrollY: currentWindowScrollY,
          showBackButton: shouldShowBackButton,
        });
      }
    } else {
      /* eslint-disable no-throw-literal */
      throw 'BackToTop component requires jQuery';
      /* eslint-enable no-throw-literal */
    }
  }

  scrollDone() {
    this.props.onScrollDone();
  }

  handlesOnBackButtonClick(event) {
    event.preventDefault();
    const { scrollTo, minScrollY } = this.props;
    const { windowScrollY } = this.state;

    if (windowScrollY && windowScrollY > minScrollY) {
      smoothScroll.scrollTo(scrollTo, this.scrollDone);
    }
  }

  render() {
    const { showBackButton } = this.state;
    return (
      <Motion style={{ x: spring(showBackButton ? 0 : 120) }}>
        {
          ({ x }) =>
            (<BackToTopButton
              position={'bottom-right'}
              onClick={this.handlesOnBackButtonClick}
              motionStyle={{
                WebkitTransform: `translate3d(${x}px, 0, 0)`,
                transform: `translate3d(${x}px, 0, 0)`,
              }}
            />)
        }
      </Motion>
    );
  }
}

BackToTop.propTypes = {
  minScrollY: PropTypes.number,
  scrollTo: PropTypes.string.isRequired,
  onScrollDone: PropTypes.func,
};

BackToTop.defaultProps = {
  minScrollY: 120,
  onScrollDone: () => {},
};

export default BackToTop;
