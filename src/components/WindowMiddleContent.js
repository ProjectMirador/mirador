import React, { Component } from 'react';
import PropTypes from 'prop-types';
import WindowSideBar from '../containers/WindowSideBar';
import ConnectedCompanionWindow from './CompanionWindow';
import ConnectedWindowViewer from './WindowViewer';
import ns from '../config/css-ns';

/**
 * WindowMiddleContent - component that renders the "middle" area of the
 * Mirador Window
 */
class WindowMiddleContent extends Component {
  /**
   * renderViewer
   *
   * @return {(String|null)}
   */
  renderViewer() {
    const { manifest, window } = this.props;
    if (manifest && manifest.isFetching === false) {
      return (
        <ConnectedWindowViewer
          window={window}
          manifest={manifest}
        />
      );
    }
    return null;
  }

  /**
   * Render the component
   */
  render() {
    const { manifest, window } = this.props;
    return (
      <div className={ns('window-middle-content')}>
        <WindowSideBar
          windowId={window.id}
          manifest={manifest}
          sideBarOpen={window.sideBarOpen}
        />
        <ConnectedCompanionWindow
          windowId={window.id}
          manifest={manifest}
        />
        {this.renderViewer()}
        <ConnectedCompanionWindow
          windowId={window.id}
          manifest={manifest}
        />
      </div>
    );
  }
}

WindowMiddleContent.propTypes = {
  window: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
  manifest: PropTypes.object, // eslint-disable-line react/forbid-prop-types
};

WindowMiddleContent.defaultProps = {
  manifest: null,
};

export default WindowMiddleContent;
