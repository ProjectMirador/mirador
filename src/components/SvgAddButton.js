import React, { Component } from 'react';
import PropTypes from 'prop-types';

/**
 * An svg image for the plus button icon
 * @param {*} props
 */
export class SvgAddButton extends Component {
  /**
   * renders
   */
  render() {
    const { buttonColor } = this.props;

    return (
      <svg height={32} width={32}>
        <ellipse ry={15.606} rx={15.729} cy={16} cx={16} fill={buttonColor} />
        <path
          d="M17.003 8.334v6.651h6.65v2.03h-6.65v6.65h-2.006v-6.65h-6.65v-2.03h6.65v-6.65z"
          fill="#fff"
        />
      </svg>
    );
  }
}

SvgAddButton.propTypes = {
  buttonColor: PropTypes.string,
};

SvgAddButton.defaultProps = {
  buttonColor: '#2f9689',
};

export default SvgAddButton;
