import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
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
    const { windowId, classes } = this.props;
    return (
      <div className={classNames(ns('primary-window'), classes.primaryWindow)}>
        <WindowSideBar windowId={windowId} />
        <CompanionArea windowId={windowId} position="left" />
        {this.renderViewer()}
      </div>
    );
  }
}

PrimaryWindow.propTypes = {
  classes: PropTypes.objectOf(PropTypes.string).isRequired,
  manifest: PropTypes.object, // eslint-disable-line react/forbid-prop-types
  view: PropTypes.string,
  windowId: PropTypes.string.isRequired,
};

PrimaryWindow.defaultProps = {
  manifest: null,
  view: undefined,
};
