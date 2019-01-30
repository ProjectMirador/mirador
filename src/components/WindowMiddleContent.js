import React, { Component } from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import ConnectedWindowSideBar from './WindowSideBar';
import ConnectedCompanionWindow from './CompanionWindow';
import ConnectedWindowViewer from './WindowViewer';
import miradorWithPlugins from '../lib/miradorWithPlugins';
import ns from '../config/css-ns';

/**
 * WindowMiddleContent - component that renders the "middle" area of the
 * Mirador Window
 */
export class WindowMiddleContent extends Component {
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
        <ConnectedWindowSideBar
          windowId={window.id}
          manifest={manifest}
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


const enhance = compose(
  connect(null, null),
  miradorWithPlugins,
  // further HOC go here
);

export default enhance(WindowMiddleContent);
