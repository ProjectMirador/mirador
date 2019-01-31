import React, { Component } from 'react';
import ns from '../config/css-ns';

/**
 * CompanionWindow
 */
class CompanionWindow extends Component {
  /**
   * render
   * @return
   */
  render() {
    return (
      <div className={ns('window-companion-side')} style={{ display: 'none' }} />
    );
  }
}

export default CompanionWindow;
