import React, { Component } from 'react';
import PropTypes from 'prop-types';

/**
 * Icon for menues
 */
export class SvgMenuDotsVertivcal extends Component {
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

SvgMenuDotsVertivcal.propTypes = {
  color: PropTypes.string,
};

SvgMenuDotsVertivcal.defaultProps = {
  color: '#4d4d4d',
};

export default SvgMenuDotsVertivcal;
