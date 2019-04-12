import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import Paper from '@material-ui/core/Paper';
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
      classes, visible, windowId, zoomToWorld,
    } = this.props;

    if (!visible) return (<></>);

    return (
      <Paper square className={classNames(classes.controls, ns('canvas-nav'), this.canvasNavControlsAreStacked() ? ns('canvas-nav-stacked') : null)} elevation={0}>
        <ZoomControls
          displayDivider={!this.canvasNavControlsAreStacked()}
          windowId={windowId}
          zoomToWorld={zoomToWorld}
        />
        <ViewerNavigation windowId={windowId} />
        <ViewerInfo windowId={windowId} />
      </Paper>
    );
  }
}


WindowCanvasNavigationControls.propTypes = {
  classes: PropTypes.object, // eslint-disable-line react/forbid-prop-types
  size: PropTypes.shape({ width: PropTypes.number }).isRequired,
  visible: PropTypes.bool,
  windowId: PropTypes.string.isRequired,
  zoomToWorld: PropTypes.func.isRequired,
};

WindowCanvasNavigationControls.defaultProps = {
  classes: {},
  visible: true,
};
