import React, { Component } from 'react';
import { connect } from 'react-redux';
import miradorWithPlugins from '../lib/miradorWithPlugins';
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

export default connect(null, null)(miradorWithPlugins((CompanionWindow)));
