import React, { Component } from 'react';

import PropTypes from 'prop-types';

/**
 * An svg image containing three dots
 * @param {*} props
 */
export class SvgDots extends Component {
  /**
   * renders
   */
  render() {
    const { color } = this.props;

    return (
      <svg width={32} height={32}>
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
  color: PropTypes.string,
};

SvgDots.defaultProps = {
  color: '#4d4d4d',
};

export default SvgDots;
