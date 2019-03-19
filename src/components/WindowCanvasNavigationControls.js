import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ZoomControls from '../containers/ZoomControls';
import ViewerInfo from '../containers/ViewerInfo';
import ViewerNavigation from '../containers/ViewerNavigation';
import ns from '../config/css-ns';

/**
 * Represents the viewer controls in the mirador workspace.
 */
export class WindowCanvasNavigationControls extends Component {
  /** */
  render() {
    const {
      canvases, visible, window, zoomToWorld,
    } = this.props;

    if (!visible) return (<></>);

    return (
      <div className={ns('canvas-nav')}>
        <ZoomControls windowId={window.id} zoomToWorld={zoomToWorld} />
        <ViewerNavigation window={window} canvases={canvases} />
        <ViewerInfo windowId={window.id} />
      </div>
    );
  }
}


WindowCanvasNavigationControls.propTypes = {
  canvases: PropTypes.array.isRequired, // eslint-disable-line react/forbid-prop-types
  window: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
  visible: PropTypes.bool,
  zoomToWorld: PropTypes.func.isRequired,
};

WindowCanvasNavigationControls.defaultProps = {
  visible: true,
};
