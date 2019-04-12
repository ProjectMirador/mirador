import React, { Component } from 'react';
import PropTypes from 'prop-types';
import WindowSideBar from '../containers/WindowSideBar';
import WindowViewer from '../containers/WindowViewer';
import GalleryView from '../containers/GalleryView';
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
    const { manifest, view, windowId } = this.props;
    if (manifest && manifest.isFetching === false) {
      if (view === 'gallery') {
        return (
          <GalleryView
            windowId={windowId}
          />
        );
      }
      return (
        <WindowViewer
          windowId={windowId}
        />
      );
    }
    return null;
  }

  /**
   * Render the component
   */
  render() {
    const { windowId } = this.props;
    return (
      <div className={ns('primary-window')}>
        <WindowSideBar windowId={windowId} />
        <CompanionArea windowId={windowId} position="left" />
        {this.renderViewer()}
      </div>
    );
  }
}

PrimaryWindow.propTypes = {
  manifest: PropTypes.object, // eslint-disable-line react/forbid-prop-types
  view: PropTypes.string,
  windowId: PropTypes.string.isRequired,
};

PrimaryWindow.defaultProps = {
  manifest: null,
  view: undefined,
};
