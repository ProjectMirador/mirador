import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ns from '../config/css-ns';

/**
 * WindowSideBarInfoPanel
 */
export default class WindowSideBarInfoPanel extends Component {
  /**
   * manifestLabel - get the label from the manifesto manifestation
   * @return String
   */
  manifestLabel() {
    const { manifest } = this.props;

    if (manifest.manifestation) {
      return manifest.manifestation.getLabel().map(label => label.value)[0];
    }
    return '';
  }

  /**
   * manifestDescription - get the description from the manifesto manifestation
   * @return String
   */
  manifestDescription() {
    const { manifest } = this.props;

    if (manifest.manifestation) {
      return manifest.manifestation.getDescription().map(label => label.value);
    }
    return '';
  }

  /**
   * render
   * @return
   */
  render() {
    return (
      <div className={ns('window-sidebar-info-panel')}>
        <h2>About this item</h2>
        <h3>{this.manifestLabel()}</h3>
        <div>{this.manifestDescription()}</div>
      </div>
    );
  }
}

WindowSideBarInfoPanel.propTypes = {
  manifest: PropTypes.object, // eslint-disable-line react/forbid-prop-types
};


WindowSideBarInfoPanel.defaultProps = {
  manifest: {},
};
