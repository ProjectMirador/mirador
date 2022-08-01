import React, { Component, lazy, Suspense } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import WindowSideBar from '../containers/WindowSideBar';
import CompanionArea from '../containers/CompanionArea';
import CollectionDialog from '../containers/CollectionDialog';
import ns from '../config/css-ns';

const AudioViewer = lazy(() => import('../containers/AudioViewer'));
const GalleryView = lazy(() => import('../containers/GalleryView'));
const SelectCollection = lazy(() => import('../containers/SelectCollection'));
const WindowViewer = lazy(() => import('../containers/WindowViewer'));
const VideoViewer = lazy(() => import('../containers/VideoViewer'));

GalleryView.displayName = 'GalleryView';
SelectCollection.displayName = 'SelectCollection';
WindowViewer.displayName = 'WindowViewer';

/**
 * PrimaryWindow - component that renders the primary content of a Mirador
 * window. Right now this differentiates between a Image, Video, or Audio viewer.
 */
export class PrimaryWindow extends Component {
  /**
   * renderViewer - logic used to determine what type of view to show
   *
   * @return {(String|null)}
   */
  renderViewer() {
    const {
      audioResources, isCollection,
      isFetching, videoResources, view, windowId,
    } = this.props;
    if (isCollection) {
      return (
        <SelectCollection
          windowId={windowId}
        />
      );
    }
    if (isFetching === false) {
      if (view === 'gallery') {
        return (
          <GalleryView
            windowId={windowId}
          />
        );
      }
      if (videoResources.length > 0) {
        return (
          <VideoViewer
            windowId={windowId}
          />
        );
      }
      if (audioResources.length > 0) {
        return (
          <AudioViewer
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
    const {
      isCollectionDialogVisible, windowId, classes, children,
    } = this.props;
    return (
      <div className={classNames(ns('primary-window'), classes.primaryWindow)}>
        <WindowSideBar windowId={windowId} />
        <CompanionArea windowId={windowId} position="left" />
        { isCollectionDialogVisible && <CollectionDialog windowId={windowId} /> }
        <Suspense fallback={<div />}>
          {children || this.renderViewer()}
        </Suspense>
      </div>
    );
  }
}

PrimaryWindow.propTypes = {
  audioResources: PropTypes.arrayOf(PropTypes.object), // eslint-disable-line react/forbid-prop-types
  children: PropTypes.node,
  classes: PropTypes.objectOf(PropTypes.string).isRequired,
  isCollection: PropTypes.bool,
  isCollectionDialogVisible: PropTypes.bool,
  isFetching: PropTypes.bool,
  videoResources: PropTypes.arrayOf(PropTypes.object), // eslint-disable-line react/forbid-prop-types
  view: PropTypes.string,
  windowId: PropTypes.string.isRequired,
};

PrimaryWindow.defaultProps = {
  audioResources: [],
  children: undefined,
  isCollection: false,
  isCollectionDialogVisible: false,
  isFetching: false,
  videoResources: [],
  view: undefined,
};
