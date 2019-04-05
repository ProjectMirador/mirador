import React, { Component } from 'react';
import PropTypes from 'prop-types';
import WindowSideBar from '../../containers/window/WindowSideBar';
import WindowViewer from '../../containers/window/WindowViewer';
import GalleryView from '../../containers/window/GalleryView';
import CompanionArea from '../../containers/window/CompanionArea';
import ns from '../../config/css-ns';

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
      if (window.view === 'gallery') {
        return (
          <GalleryView
            window={window}
            manifest={manifest}
          />
        );
      }
      return (
        <WindowViewer
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
  manifest: PropTypes.object, // eslint-disable-line react/forbid-prop-types
  window: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
};

PrimaryWindow.defaultProps = {
  manifest: null,
};
