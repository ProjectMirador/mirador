import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import ZoomControls from '../containers/ZoomControls';
import ViewerInfo from '../containers/ViewerInfo';
import ViewerNavigation from '../containers/ViewerNavigation';
import ns from '../config/css-ns';

/**
 * Represents the viewer controls in the mirador workspace.
 */
export class WindowCanvasNavigationControls extends Component {
  /**
   * Determine if canvasNavControls are stacked (based on a hard-coded width)
  */
  canvasNavControlsAreStacked() {
    const { size } = this.props;

    return (size && size.width && size.width <= 253);
  }

  /** */
  render() {
    const {
      visible, window, zoomToWorld,
    } = this.props;

    if (!visible) return (<></>);

    return (
      <div
        className={classNames(ns('canvas-nav'), this.canvasNavControlsAreStacked() ? ns('canvas-nav-stacked') : null)}
      >
        <ZoomControls
          displayDivider={!this.canvasNavControlsAreStacked()}
          windowId={window.id}
          zoomToWorld={zoomToWorld}
        />
        <ViewerNavigation window={window} />
        <ViewerInfo windowId={window.id} />
      </div>
    );
  }
}


WindowCanvasNavigationControls.propTypes = {
  size: PropTypes.shape({ width: PropTypes.number }).isRequired,
  visible: PropTypes.bool,
  window: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
  zoomToWorld: PropTypes.func.isRequired,
};

WindowCanvasNavigationControls.defaultProps = {
  visible: true,
};
