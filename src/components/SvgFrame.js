import React, { Component } from 'react';

/**
 * Svg Frame Icon
 */
export class SvgFrame extends Component {
  /**
   * render the svg
   */
  render() {
    return (
      <svg width={32} height={32}>
        <g fill="#4d4d4d">
          <path d="M7.59 7.592V12.408h2.122V9.713h2.697V7.592H9.712zM24.408 7.59H19.592v2.122h2.695v2.697h2.121V9.712zM7.592 24.41H12.408v-2.122H9.713v-2.697H7.592v2.697zM24.41 24.408V19.592h-2.122v2.695h-2.697v2.121h2.697z" />
        </g>
      </svg>
    );
  }
}

export default SvgFrame;
