import React, { Component } from 'react';
import { compose } from 'redux';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import miradorWithPlugins from '../lib/miradorWithPlugins';
import { actions } from '../store';
import ns from '../config/css-ns';

/**
 */
export class ThumbnailNavigation extends Component {
  /**
   * Determines whether the current index is the rendered canvas, providing
   * a useful class.
   */
  currentCanvasClass(canvasIndex) {
    const { window } = this.props;
    if (window.canvasIndex === canvasIndex) return 'current-canvas';
    return '';
  }

  /**
   * Maps and returns elements representing canvas navigation
   */
  mappedCanvases() {
    const { canvases, window, setCanvas } = this.props;
    return canvases.map(canvas => (
      <li
        key={canvas.index}
        onClick={() => setCanvas(window.id, canvas.index)}
        onKeyPress={() => setCanvas(window.id, canvas.index)}
        role="presentation"
        className={ns(['thumbnail-nav-canvas', `thumbnail-nav-canvas-${canvas.index}`, this.currentCanvasClass(canvas.index)])}
      >
        {canvas.index}
      </li>
    ));
  }

  /**
   * Renders things
   */
  render() {
    const {
      config,
    } = this.props;
    return (
      <div
        className={ns('thumb-navigation')}
        style={{
          height: `${config.thumbnailNavigationHeight}px`,
        }}
      >
        <ul>
          { this.mappedCanvases() }
        </ul>
      </div>
    );
  }
}

ThumbnailNavigation.propTypes = {
  config: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
  canvases: PropTypes.array.isRequired, // eslint-disable-line react/forbid-prop-types
  setCanvas: PropTypes.func.isRequired,
  window: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
};


/**
 * mapDispatchToProps - used to hook up connect to action creators
 * @memberof ManifestForm
 * @private
 */
const mapDispatchToProps = {
  setCanvas: actions.setCanvas,
};

const enhance = compose(
  connect(null, mapDispatchToProps),
  miradorWithPlugins,
  // further HOC go here
);

export default enhance(ThumbnailNavigation);
