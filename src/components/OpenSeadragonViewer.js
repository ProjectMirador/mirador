import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Paper from '@material-ui/core/Paper';
import OpenSeadragon from 'openseadragon';
import ns from '../config/css-ns';
import OpenSeadragonCanvasOverlay from '../lib/OpenSeadragonCanvasOverlay';
import CanvasWorld from '../lib/CanvasWorld';

/**
 * Represents a OpenSeadragonViewer in the mirador workspace. Responsible for mounting
 * and rendering OSD.
 */
export class OpenSeadragonViewer extends Component {
  /**
   * @param {Object} props
   */
  constructor(props) {
    super(props);

    this.viewer = null;
    this.osdCanvasOverlay = null;
    // An initial value for the updateCanvas method
    this.updateCanvas = () => {};
    this.ref = React.createRef();
    this.onUpdateViewport = this.onUpdateViewport.bind(this);
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

    this.osdCanvasOverlay = new OpenSeadragonCanvasOverlay(this.viewer);
    this.viewer.addHandler('update-viewport', this.onUpdateViewport);
    this.viewer.addHandler('viewport-change', this.onViewportChange);

    if (viewer) {
      this.viewer.viewport.panTo(viewer, false);
      this.viewer.viewport.zoomTo(viewer.zoom, viewer, false);
    }

    tileSources.forEach((tileSource, i) => this.addTileSource(tileSource, i));
  }

  /**
   * When the tileSources change, make sure to close the OSD viewer.
   * When the annotations change, reset the updateCanvas method to make sure
   * they are added.
   * When the viewport state changes, pan or zoom the OSD viewer as appropriate
   */
  componentDidUpdate(prevProps) {
    const {
      tileSources, viewer, annotations, currentCanvases,
    } = this.props;
    if (!this.annotationsMatch(prevProps.annotations)) {
      this.updateCanvas = () => {
        this.osdCanvasOverlay.clear();
        this.osdCanvasOverlay.resize();
        this.osdCanvasOverlay.canvasUpdate(() => {
          this.annotationsToContext(annotations);
        });
      };
      this.viewer.forceRedraw();
    }
    if (!this.tileSourcesMatch(prevProps.tileSources)) {
      this.viewer.close();
      Promise.all(
        tileSources.map((tileSource, i) => this.addTileSource(tileSource, i)),
      ).then(() => {
        if (tileSources[0]) {
          this.fitBounds(...new CanvasWorld(currentCanvases).worldBounds(), true);
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
   * onUpdateViewport - fires during OpenSeadragon render method.
   */
  onUpdateViewport(event) {
    this.updateCanvas();
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
   * annotationsToContext - converts anontations to a canvas context
   */
  annotationsToContext(annotations) {
    const { currentCanvases } = this.props;
    const context = this.osdCanvasOverlay.context2d;
    annotations.forEach((annotation) => {
      annotation.resources.forEach((resource) => {
        const offset = new CanvasWorld(currentCanvases).offsetByCanvas(resource.targetId);
        const fragment = resource.fragmentSelector;
        fragment[0] += offset.x;
        context.strokeStyle = 'yellow';
        context.lineWidth = 10;
        context.strokeRect(...fragment);
      });
    });
  }

  /**
   */
  addTileSource(tileSource, i = 0) {
    const { currentCanvases } = this.props;
    return new Promise((resolve, reject) => {
      if (!this.viewer) {
        return;
      }
      this.viewer.addTiledImage({
        tileSource,
        fitBounds: new OpenSeadragon.Rect(
          ...new CanvasWorld(currentCanvases).canvasToWorldCoordinates(i),
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
   * annotationsMatch - compares previous annotations to current to determine
   * whether to add a new updateCanvas method to draw annotations
   * @param  {Array} prevAnnotations
   * @return {Boolean}
   */
  annotationsMatch(prevAnnotations) {
    const { annotations } = this.props;

    return annotations.some((annotation, index) => {
      if (!prevAnnotations[index]) {
        return false;
      }
      const newIds = annotation.resources.map(r => r.id);
      const prevIds = prevAnnotations[index].resources.map(r => r.id);

      if ((annotation.id === prevAnnotations[index].id) && (newIds === prevIds)) {
        return true;
      }
      return false;
    });
  }

  /**
   * Renders things
   */
  render() {
    const {
      windowId, children, classes, label, t,
    } = this.props;

    return (
      <>
        <section
          className={ns('osd-container')}
          id={`${windowId}-osd`}
          ref={this.ref}
          aria-label={t('item', { label })}
        >
          <Paper square className={classes.controls} elevation={0}>
            { children }
          </Paper>
        </section>
      </>
    );
  }
}

OpenSeadragonViewer.defaultProps = {
  annotations: [],
  children: null,
  currentCanvases: [],
  tileSources: [],
  viewer: null,
  label: null,
  classes: {},
};

OpenSeadragonViewer.propTypes = {
  annotations: PropTypes.arrayOf(PropTypes.object),
  children: PropTypes.element,
  currentCanvases: PropTypes.arrayOf(PropTypes.object),
  tileSources: PropTypes.arrayOf(PropTypes.object),
  viewer: PropTypes.object, // eslint-disable-line react/forbid-prop-types
  updateViewport: PropTypes.func.isRequired,
  windowId: PropTypes.string.isRequired,
  label: PropTypes.string,
  t: PropTypes.func.isRequired,
  classes: PropTypes.object, // eslint-disable-line react/forbid-prop-types
};
