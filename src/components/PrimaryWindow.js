import React, { Component, lazy } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import WindowSideBar from '../containers/WindowSideBar';
import WindowViewer from '../containers/WindowViewer';
import GalleryView from '../containers/GalleryView';
import CompanionArea from '../containers/CompanionArea';
import ns from '../config/css-ns';

const SelectCollection = lazy(() => import('../containers/SelectCollection'));
SelectCollection.displayName = 'SelectCollection';

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
    const {
      isCollection, isFetching, view, windowId,
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
  isCollection: PropTypes.bool,
  isFetching: PropTypes.bool,
  view: PropTypes.string,
  windowId: PropTypes.string.isRequired,
};

PrimaryWindow.defaultProps = {
  isCollection: false,
  isFetching: false,
  view: undefined,
};
