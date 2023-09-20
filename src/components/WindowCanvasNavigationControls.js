import { Component } from 'react';
import PropTypes from 'prop-types';
import { alpha } from '@mui/material/styles';
import classNames from 'classnames';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import { visuallyHidden } from '@mui/utils';
import ZoomControls from '../containers/ZoomControls';
import ViewerInfo from '../containers/ViewerInfo';
import ViewerNavigation from '../containers/ViewerNavigation';
import ns from '../config/css-ns';
import { PluginHook } from './PluginHook';

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
    const { visible, windowId, zoomToWorld } = this.props;

    if (!visible) return (<Typography style={visuallyHidden} component="div"><ViewerInfo windowId={windowId} /></Typography>);

    return (
      <Paper
        square
        sx={theme => ({
          backgroundColor: alpha(theme.palette.background.paper, 0.5),
          bottom: 0,
          cursor: 'default',
          display: 'flex',
          flexDirection: this.canvasNavControlsAreStacked() ? 'column' : 'row',
          flexWrap: 'wrap',
          justifyContent: 'center',
          position: 'absolute',
          textAlign: 'center',
          width: '100%',
          zIndex: 50,
        })}
        className={
          classNames(
            ns('canvas-nav'),
            this.canvasNavControlsAreStacked() ? ns('canvas-nav-stacked') : null,
          )
}
        elevation={0}
      >
        <ZoomControls
          displayDivider={!this.canvasNavControlsAreStacked()}
          windowId={windowId}
          zoomToWorld={zoomToWorld}
        />
        <ViewerNavigation windowId={windowId} />
        <ViewerInfo windowId={windowId} />

        <PluginHook {...this.props} />
      </Paper>
    );
  }
}

WindowCanvasNavigationControls.propTypes = {
  size: PropTypes.shape({ width: PropTypes.number }).isRequired,
  visible: PropTypes.bool,
  windowId: PropTypes.string.isRequired,
  zoomToWorld: PropTypes.func.isRequired,
};

WindowCanvasNavigationControls.defaultProps = {
  visible: true,
};
