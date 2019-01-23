import React, { Component } from 'react';

import PropTypes from 'prop-types';

/**
 * An svg image containing three dots
 * @param {*} props
 */
export class SvgDots extends Component {
  /**
   * handle a click
   */
  handleClick(event) {
    const { clickHandler } = this.props;
    event.preventDefault();
    clickHandler();
  }

  /**
   * renders
   */
  render() {
    const { color } = this.props;

    return (
      <svg width={32} height={32} onClick={(e) => { this.handleClick(e); }}>
        <g fill={color} fillRule="evenodd">
          <circle r={1.69} cy={10} cx={16} />
          <circle r={1.69} cy={16} cx={16} />
          <circle r={1.69} cy={22} cx={16} />
        </g>
      </svg>
    );
  }
}

SvgDots.propTypes = {
  clickHandler: PropTypes.func,
  color: PropTypes.string,
};

SvgDots.defaultProps = {
  clickHandler: (e) => { console.log('No action defined'); },
  color: '#4d4d4d',
};

export default SvgDots;
