import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Typography from '@material-ui/core/Typography';
import ZoomControls from '../containers/ZoomControls';
import ViewerNavigation from '../containers/ViewerNavigation';
import ns from '../config/css-ns';

/**
 * Represents the viewer controls in the mirador workspace.
 */
export class WindowCanvasNavigationControls extends Component {
  /** */
  render() {
    const {
      canvases, canvasLabel, visible, window,
    } = this.props;

    if (!visible) return (<></>);

    return (
      <div className={ns('canvas-nav')}>
        <ZoomControls windowId={window.id} />
        <ViewerNavigation window={window} canvases={canvases} />
        {
          canvasLabel && (
            <Typography variant="caption" className={ns('canvas-label')}>{canvasLabel}</Typography>
          )
        }
      </div>
    );
  }
}


WindowCanvasNavigationControls.propTypes = {
  canvases: PropTypes.array.isRequired, // eslint-disable-line react/forbid-prop-types
  window: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
  canvasLabel: PropTypes.string,
  visible: PropTypes.bool,
};

WindowCanvasNavigationControls.defaultProps = {
  canvasLabel: undefined,
  visible: true,
};
