import { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
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
    const {
      classes, visible, zoomToWorld,
    } = this.props;

    if (!visible) return (<Typography variant="srOnly" component="div"><ViewerInfo /></Typography>);

    return (
      <Paper
        square
        className={
          classNames(
            classes.controls,
            ns('canvas-nav'),
            classes.canvasNav,
            this.canvasNavControlsAreStacked() ? ns('canvas-nav-stacked') : null,
            this.canvasNavControlsAreStacked() ? classes.canvasNavStacked : null,
          )
}
        elevation={0}
      >
        <ZoomControls
          displayDivider={!this.canvasNavControlsAreStacked()}
          zoomToWorld={zoomToWorld}
        />
        <ViewerNavigation />
        <ViewerInfo />

        <PluginHook {...this.props} />
      </Paper>
    );
  }
}

WindowCanvasNavigationControls.propTypes = {
  classes: PropTypes.objectOf(PropTypes.string),
  size: PropTypes.shape({ width: PropTypes.number }).isRequired,
  visible: PropTypes.bool,
  zoomToWorld: PropTypes.func.isRequired,
};

WindowCanvasNavigationControls.defaultProps = {
  classes: {},
  visible: true,
};
