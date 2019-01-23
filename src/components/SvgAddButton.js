import React, { Component } from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { actions } from '../store';

/**
 * An svg image for the plus button icon
 * @param {*} props
 */
export class SvgAddButton extends Component {
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
    const { buttonColor } = this.props;

    return (
      <svg height={32} width={32} onClick={(e) => { this.handleClick(e); }}>
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
  clickHandler: PropTypes.func,
  buttonColor: PropTypes.string,
};

SvgAddButton.defaultProps = {
  clickHandler: (e) => { console.log('No action defined'); },
  buttonColor: '#2f9689',
};

export default SvgAddButton;
