import { Component, lazy, Suspense } from 'react';
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
      isFetching, videoResources, view,
    } = this.props;
    if (isCollection) {
      return (
        <SelectCollection />
      );
    }
    if (isFetching === false) {
      if (view === 'gallery') {
        return (
          <GalleryView />
        );
      }
      if (videoResources.length > 0) {
        return (
          <VideoViewer />
        );
      }
      if (audioResources.length > 0) {
        return (
          <AudioViewer />
        );
      }
      return (
        <WindowViewer />
      );
    }
    return null;
  }

  /**
   * Render the component
   */
  render() {
    const {
      isCollectionDialogVisible, classes, children,
    } = this.props;
    return (
      <div className={classNames(ns('primary-window'), classes.primaryWindow)}>
        <WindowSideBar />
        <CompanionArea position="left" />
        { isCollectionDialogVisible && <CollectionDialog /> }
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
