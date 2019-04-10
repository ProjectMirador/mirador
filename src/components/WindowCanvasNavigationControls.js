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
  /** */
  constructor(props) {
    super(props);

    this.state = { canvasNavWidth: null };

    this.canvasNav = React.createRef();
  }

  /**
   * Set the necessary widths in state when the component
   * mounts and bind the state update to window resize
  */
  componentDidMount() {
    this.updateComponentWidth();
    window.addEventListener('resize', this.updateComponentWidth.bind(this));
  }

  /**
   * Update the component width when the visibility changes
  */
  componentDidUpdate(prevProps) {
    const { visible } = this.props;

    if (prevProps.visible !== visible) {
      this.updateComponentWidth();
    }
  }

  /**
   * Unbind the window resize listener when unmounting the component
  */
  componentWillUnmount() {
    window.removeEventListener('resize', this.updateComponentWidth.bind(this));
  }

  /**
   * Simple utility function to set state (that we can bind on window resize)
  */
  updateComponentWidth() {
    this.setState({
      canvasNavWidth: (
        this.canvasNav && this.canvasNav.current && this.canvasNav.current.offsetWidth
      ),
    });
  }

  /**
   * Determine if canvasNavControls are stacked (based on a hard-coded width)
  */
  canvasNavControlsAreStacked() {
    const { canvasNavWidth } = this.state;

    return (canvasNavWidth && canvasNavWidth <= 253);
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
        ref={this.canvasNav}
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
  visible: PropTypes.bool,
  window: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
  zoomToWorld: PropTypes.func.isRequired,
};

WindowCanvasNavigationControls.defaultProps = {
  visible: true,
};
