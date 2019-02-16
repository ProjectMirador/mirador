import React, { Component } from 'react';
import PropTypes from 'prop-types';
import WindowSideBar from '../containers/WindowSideBar';
import CompanionWindow from '../containers/CompanionWindow';
import WindowViewer from '../containers/WindowViewer';
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
        <WindowViewer
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
    const { rightCompanionWindowId, window } = this.props;
    return (
      <div className={ns('window-middle-content')}>
        <WindowSideBar windowId={window.id} />
        {this.renderViewer()}
        { // We can pass an array of ids here when we want to support
          // multiple companion windows in a particular position
          rightCompanionWindowId
            && <CompanionWindow id={rightCompanionWindowId} windowId={window.id} />
        }
      </div>
    );
  }
}

WindowMiddleContent.propTypes = {
  rightCompanionWindowId: PropTypes.string,
  window: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
  manifest: PropTypes.object, // eslint-disable-line react/forbid-prop-types
};

WindowMiddleContent.defaultProps = {
  rightCompanionWindowId: null,
  manifest: null,
};

export default WindowMiddleContent;
