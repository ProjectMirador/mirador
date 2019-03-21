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
      visible, window, zoomToWorld,
    } = this.props;

    if (!visible) return (<></>);

    return (
      <div className={ns('canvas-nav')}>
        <ZoomControls windowId={window.id} zoomToWorld={zoomToWorld} />
        <ViewerNavigation window={window} />
        <ViewerInfo windowId={window.id} />
      </div>
    );
  }
}


WindowCanvasNavigationControls.propTypes = {
  visible: PropTypes.bool,
  window: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
  zoomToWorld: PropTypes.func.isRequired,
};

WindowCanvasNavigationControls.defaultProps = {
  visible: true,
};
