import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Rnd } from 'react-rnd';
import ns from '../config/css-ns';
import WindowTopBar from '../containers/WindowTopBar';
import WindowMiddleContent from '../containers/WindowMiddleContent';
import ThumbnailNavigation from '../containers/ThumbnailNavigation';

/**
 * Represents a Window in the mirador workspace
 * @param {object} window
 */
class Window extends Component {
  /**
  * Represents a Window in the mirador workspace
  * @param {object} window
  */
  baseWindow() {
    const {
      manifest,
      window,
    } = this.props;

    return (
      <div id={window.id} className={ns('window')}>
        <WindowTopBar
          windowId={window.id}
          manifest={manifest}
        />
        <WindowMiddleContent
          window={window}
          manifest={manifest}
          sideBarOpen={window.sideBarOpen}
        />
        <div className={ns('companion-bottom')}>
          <ThumbnailNavigation
            window={window}
            manifest={manifest}
          />
        </div>
      </div>
    );
  }

  /**
  * Represents a Window in the mirador workspace
  * @param {object} window
  */
  draggableWorkspaceWindow() {
    const {
      window,
      updateWindowPosition,
      setWindowSize,
    } = this.props;

    return (
      <Rnd
        size={{ width: window.width, height: window.height }}
        position={{ x: window.x, y: window.y }}
        bounds="parent"
        onDragStop={(e, d) => {
          updateWindowPosition({ x: d.x, y: d.y });
        }}
        onResize={(e, direction, ref, delta, position) => {
          setWindowSize({
            width: ref.style.width,
            height: ref.style.height,
            ...position,
          });
        }}
        dragHandleClassName={ns('window-top-bar')}
      >
        { this.baseWindow() }
      </Rnd>
    );
  }

  /**
   * Renders things
   */
  render() {
    const { workspaceType } = this.props;
    return workspaceType === 'freeform'
      ? this.draggableWorkspaceWindow() : this.baseWindow();
  }
}

Window.propTypes = {
  window: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
  manifest: PropTypes.object, // eslint-disable-line react/forbid-prop-types
  updateWindowPosition: PropTypes.func,
  setWindowSize: PropTypes.func,
  workspaceType: PropTypes.string,
};

Window.defaultProps = {
  manifest: null,
  updateWindowPosition: () => {},
  setWindowSize: () => {},
  workspaceType: '',
};

export default Window;
