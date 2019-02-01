import React, { Component } from 'react';
import PropTypes from 'prop-types';
import OpenSeadragon from 'openseadragon';
import ns from '../config/css-ns';

/**
 * Represents a OpenSeadragonViewer in the mirador workspace. Responsible for mounting
 * and rendering OSD.
 */
class OpenSeadragonViewer extends Component {
  /**
   * @param {Object} props
   */
  constructor(props) {
    super(props);

    this.viewer = null;
    this.ref = React.createRef();
    this.onViewportChange = this.onViewportChange.bind(this);
  }

  /**
   * React lifecycle event
   */
  componentDidMount() {
    const { tileSources, window } = this.props;
    if (!this.ref.current) {
      return;
    }
    this.viewer = new OpenSeadragon({
      id: this.ref.current.id,
      preserveViewport: true,
      blendTime: 0.1,
      alwaysBlend: false,
      showNavigationControl: false,
    });
    this.viewer.addHandler('viewport-change', this.onViewportChange);

    if (window.viewer) {
      this.viewer.viewport.panTo(window.viewer, false);
      this.viewer.viewport.zoomTo(window.viewer.zoom, window.viewer, false);
    }

    tileSources.forEach(tileSource => this.addTileSource(tileSource));
  }

  /**
   * When the tileSources change, make sure to close the OSD viewer.
   * When the viewport state changes, pan or zoom the OSD viewer as appropriate
   */
  componentDidUpdate(prevProps) {
    const { tileSources, window } = this.props;
    if (!this.tileSourcesMatch(prevProps.tileSources)) {
      this.viewer.close();
      Promise.all(
        tileSources.map(tileSource => this.addTileSource(tileSource)),
      ).then(() => {
        // TODO: An incredibly naive way to evaluate this for now. Update this
        // to handle multiple canvases in the future.
        if (tileSources[0]) {
          this.fitBounds(0, 0, tileSources[0].width, tileSources[0].height);
        }
      });
    } else if (window.viewer && prevProps.window.viewer) {
      if (window.viewer.x !== prevProps.window.viewer.x
        || window.viewer.y !== prevProps.window.viewer.y) {
        this.viewer.viewport.panTo(window.viewer, false);
      }

      if (window.viewer.zoom !== prevProps.window.viewer.zoom) {
        this.viewer.viewport.zoomTo(window.viewer.zoom, window.viewer, false);
      }
    }
  }

  /**
   */
  componentWillUnmount() {
    this.viewer.removeAllHandlers();
  }

  /**
   * Forward OSD state to redux
   */
  onViewportChange(event) {
    const { updateViewport, window } = this.props;

    const { viewport } = event.eventSource;

    updateViewport(window.id, {
      x: viewport.centerSpringX.target.value,
      y: viewport.centerSpringY.target.value,
      zoom: viewport.zoomSpring.target.value,
    });
  }

  /**
   */
  addTileSource(tileSource) {
    return new Promise((resolve, reject) => {
      if (!this.viewer) {
        return;
      }
      this.viewer.addTiledImage({
        tileSource,
        success: event => resolve(event),
        error: event => reject(event),
      });
    });
  }

  /**
   */
  fitBounds(x, y, w, h) {
    this.viewer.viewport.fitBounds(
      this.viewer.viewport.imageToViewportRectangle(x, y, w, h),
      true,
    );
  }

  /**
   * tileSourcesMatch - compares previous tileSources to current to determine
   * whether a refresh of the OSD viewer is needed.
   * @param  {Array} prevTileSources
   * @return {Boolean}
   */
  tileSourcesMatch(prevTileSources) {
    const { tileSources } = this.props;
    return tileSources.some((tileSource, index) => {
      if (!prevTileSources[index]) {
        return false;
      }
      if (tileSource['@id'] === prevTileSources[index]['@id']) {
        return true;
      }
      return false;
    });
  }

  /**
   * Renders things
   */
  render() {
    const { window, children } = this.props;
    return (
      <>
        <div
          className={ns('osd-container')}
          id={`${window.id}-osd`}
          ref={this.ref}
        >
          { children }
        </div>
      </>
    );
  }
}

OpenSeadragonViewer.defaultProps = {
  children: null,
  tileSources: [],
};

OpenSeadragonViewer.propTypes = {
  children: PropTypes.element,
  tileSources: PropTypes.arrayOf(PropTypes.object),
  window: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
  updateViewport: PropTypes.func.isRequired,
};

export default OpenSeadragonViewer;
