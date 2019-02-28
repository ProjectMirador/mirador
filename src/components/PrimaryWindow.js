import React, { Component } from 'react';
import PropTypes from 'prop-types';
import WindowSideBar from '../containers/WindowSideBar';
import WindowViewer from '../containers/WindowViewer';
import CompanionArea from '../containers/CompanionArea';
import ns from '../config/css-ns';

/**
 * WindowMiddleContent - component that renders the "middle" area of the
 * Mirador Window
 */
export class PrimaryWindow extends Component {
  /**
   * renderViewer
   *
   * @return {(String|null)}
   */
  renderViewer() {
    const { manifest, window } = this.props;
    if (manifest && manifest.isFetching === false) {
      return (
        <WindowViewer
          manifest={manifest}
          window={window}
        />
      );
    }
    return null;
  }

  /**
   * Render the component
   */
  render() {
    const { window } = this.props;
    return (
      <div className={ns('primary-window')}>
        <WindowSideBar windowId={window.id} />
        <CompanionArea windowId={window.id} position="left" />
        {this.renderViewer()}
      </div>
    );
  }
}

PrimaryWindow.propTypes = {
  window: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
  manifest: PropTypes.object, // eslint-disable-line react/forbid-prop-types
};

PrimaryWindow.defaultProps = {
  manifest: null,
};
