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
   * Return style attributes
   */
  styleAttributes() {
    const { window } = this.props;
    return {
      width: '100%',
      height: '100%',
    };
  }

  /**
   * Renders things
   */
  render() {
    const {
      manifest,
      window,
      updateWindowPosition,
      setWindowSize,
    } = this.props;

    return (
      <Rnd
        size={{ width: window.width, height: window.height }}
        position={{ x: window.x, y: window.y }}
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
        <div className={ns('window')} style={this.styleAttributes()}>
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
      </Rnd>
    );
  }
}

Window.propTypes = {
  window: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
  manifest: PropTypes.object, // eslint-disable-line react/forbid-prop-types
  updateWindowPosition: PropTypes.func.isRequired,
  setWindowSize: PropTypes.func.isRequired,
};

Window.defaultProps = {
  manifest: null,
};

export default Window;
