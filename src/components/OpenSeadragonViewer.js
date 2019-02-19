import React, { Component } from 'react';
import PropTypes from 'prop-types';
import OpenSeadragon from 'openseadragon';
import debounce from 'lodash/debounce';
import ns from '../config/css-ns';
import ZoomControls from '../containers/ZoomControls';

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
    const { tileSources, viewer } = this.props;
    if (!this.ref.current) {
      return;
    }
    this.viewer = new OpenSeadragon({
      id: this.ref.current.id,
      preserveViewport: true,
      blendTime: 0.1,
      alwaysBlend: false,
      showNavigationControl: false,
      preserveImageSizeOnResize: true,
    });
    console.log(this.viewer);
    this.viewer.addHandler('viewport-change', debounce(this.onViewportChange, 300));

    if (viewer) {
      this.viewer.viewport.panTo(viewer, false);
      this.viewer.viewport.zoomTo(viewer.zoom, viewer, false);
    }

    tileSources.forEach((tileSource, i) => this.addTileSource(tileSource, i));
  }

  /**
   * When the tileSources change, make sure to close the OSD viewer.
   * When the viewport state changes, pan or zoom the OSD viewer as appropriate
   */
  componentDidUpdate(prevProps) {
    const { tileSources, viewer } = this.props;
    if (!this.tileSourcesMatch(prevProps.tileSources)) {
      this.viewer.close();
      Promise.all(
        tileSources.map((tileSource, i) => this.addTileSource(tileSource, i)),
      ).then(() => {
        if (tileSources[0]) {
          this.fitBounds(...this.boundsFromTileSources(), true);
        }
      });
    } else if (viewer) {
      const { viewport } = this.viewer;

      if (viewer.x !== viewport.centerSpringX.target.value
        || viewer.y !== viewport.centerSpringY.target.value) {
        this.viewer.viewport.panTo(viewer, false);
      }

      if (viewer.zoom !== viewport.zoomSpring.target.value) {
        this.viewer.viewport.zoomTo(viewer.zoom, viewer, false);
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
    const { updateViewport, windowId } = this.props;

    const { viewport } = event.eventSource;

    updateViewport(windowId, {
      x: viewport.centerSpringX.target.value,
      y: viewport.centerSpringY.target.value,
      zoom: viewport.zoomSpring.target.value,
    });
  }

  /**
   * boundsFromTileSources - calculates the overall width/height
   * based on 0 -> n tileSources
   */
  boundsFromTileSources() {
    const { tileSources } = this.props;
    const heights = [];
    const dimensions = [];
    tileSources.forEach((tileSource) => {
      heights.push(tileSource.height);
      dimensions.push({
        width: tileSource.width,
        height: tileSource.height,
      });
    });
    const minHeight = Math.min(...heights);
    let scaledWidth = 0;
    dimensions.forEach((dim) => {
      const aspectRatio = dim.width / dim.height;
      scaledWidth += Math.floor(minHeight * aspectRatio);
    });
    return [
      0,
      0,
      scaledWidth,
      minHeight,
    ];
  }

  /**
   * boundingRectFromTileSource - Creates a bounding rectangle
   * in the Viewports space, using the current tileSource and the tileSource
   * total area. Limitation, can only handle tileSources with a length of 1 or 2
   */
  boundingRectFromTileSource(tileSource, i) {
    const { tileSources } = this.props;
    const wholeBounds = this.boundsFromTileSources();
    const { width } = tileSources[i];
    const { height } = tileSources[i];
    const aspectRatio = width / height;
    const scaledWidth = Math.floor(wholeBounds[3] * aspectRatio);
    let x = 0;
    if (i === 1) {
      x = wholeBounds[2] - scaledWidth;
    }
    return [
      x,
      0,
      scaledWidth,
      wholeBounds[3],
    ];
  }

  /**
   */
  addTileSource(tileSource, i = 0) {
    return new Promise((resolve, reject) => {
      if (!this.viewer) {
        return;
      }
      this.viewer.addTiledImage({
        tileSource,
        fitBounds: new OpenSeadragon.Rect(
          ...this.boundingRectFromTileSource(tileSource, i),
        ),
        success: event => resolve(event),
        error: event => reject(event),
      });
    });
  }

  /**
   */
  fitBounds(x, y, w, h) {
    this.viewer.viewport.fitBounds(
      new OpenSeadragon.Rect(x, y, w, h),
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
    const { windowId, children } = this.props;
    return (
      <>
        <div
          className={ns('osd-container')}
          id={`${windowId}-osd`}
          ref={this.ref}
        >
          { children }
        </div>
        <ZoomControls windowId={windowId} />
      </>
    );
  }
}

OpenSeadragonViewer.defaultProps = {
  children: null,
  tileSources: [],
  viewer: null,
};

OpenSeadragonViewer.propTypes = {
  children: PropTypes.element,
  tileSources: PropTypes.arrayOf(PropTypes.object),
  viewer: PropTypes.object, // eslint-disable-line react/forbid-prop-types
  updateViewport: PropTypes.func.isRequired,
  windowId: PropTypes.string.isRequired,
};

export default OpenSeadragonViewer;
