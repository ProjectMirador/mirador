import React, { Component } from 'react';

import PropTypes from 'prop-types';

/**
 * An svg image containing a plus
 * @param {*} props
 */
export class SvgPlus extends Component {
  /**
   * renders
   */
  render() {
    const { color } = this.props;

    return (
      <svg height={32} width={32}>
        <ellipse ry={15.606} rx={15.729} cy={16} cx={16} fill={color} />
        <path
          d="M17.003 8.334v6.651h6.65v2.03h-6.65v6.65h-2.006v-6.65h-6.65v-2.03h6.65v-6.65z"
          fill="#fff"
        />
      </svg>
    );
  }
}

SvgPlus.propTypes = {
  color: PropTypes.string,
};

SvgPlus.defaultProps = {
  color: '#2f9689',
};

export default SvgPlus;
