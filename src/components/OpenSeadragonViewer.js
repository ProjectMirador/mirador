import React, { Component } from 'react';
import PropTypes from 'prop-types';
import isEqual from 'lodash/isEqual';
import OpenSeadragon from 'openseadragon';
import classNames from 'classnames';
import ns from '../config/css-ns';
import OpenSeadragonCanvasOverlay from '../lib/OpenSeadragonCanvasOverlay';
import CanvasWorld from '../lib/CanvasWorld';
import CanvasAnnotationDisplay from '../lib/CanvasAnnotationDisplay';

/**
 * Represents a OpenSeadragonViewer in the mirador workspace. Responsible for mounting
 * and rendering OSD.
 */
export class OpenSeadragonViewer extends Component {
  /**
   * annotationsMatch - compares previous annotations to current to determine
   * whether to add a new updateCanvas method to draw annotations
   * @param  {Array} currentAnnotations
   * @param  {Array} prevAnnotations
   * @return {Boolean}
   */
  static annotationsMatch(currentAnnotations, prevAnnotations) {
    if (currentAnnotations.length === 0 && prevAnnotations.length === 0) return true;
    if (currentAnnotations.length !== prevAnnotations.length) return false;
    return currentAnnotations.every((annotation, index) => {
      const newIds = annotation.resources.map(r => r.id);
      const prevIds = prevAnnotations[index].resources.map(r => r.id);
      if (newIds.length === 0 && prevIds.length === 0) return true;
      if (newIds.length !== prevIds.length) return false;

      if ((annotation.id === prevAnnotations[index].id) && (isEqual(newIds, prevIds))) {
        return true;
      }
      return false;
    });
  }

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
    this.zoomToWorld = this.zoomToWorld.bind(this);
    this.osdUpdating = false;
  }

  /**
   * React lifecycle event
   */
  componentDidMount() {
    const { osdConfig, viewer } = this.props;
    if (!this.ref.current) {
      return;
    }

    this.viewer = new OpenSeadragon({
      id: this.ref.current.id,
      ...osdConfig,
    });

    this.osdCanvasOverlay = new OpenSeadragonCanvasOverlay(this.viewer);
    this.viewer.addHandler('update-viewport', this.onUpdateViewport);
    // Set a flag when OSD starts animating (so that viewer updates are not used)
    this.viewer.addHandler('animation-start', () => {
      this.osdUpdating = true;
    });
    this.viewer.addHandler('animation-finish', this.onViewportChange);
    this.viewer.addHandler('animation-finish', () => {
      this.osdUpdating = false;
    });

    this.updateCanvas = this.canvasUpdateCallback();

    if (viewer) {
      this.viewer.viewport.panTo(viewer, true);
      this.viewer.viewport.zoomTo(viewer.zoom, viewer, true);
    }
    this.addAllImageSources(!(viewer));
  }

  /**
   * When the tileSources change, make sure to close the OSD viewer.
   * When the annotations change, reset the updateCanvas method to make sure
   * they are added.
   * When the viewport state changes, pan or zoom the OSD viewer as appropriate
   */
  componentDidUpdate(prevProps) {
    const {
      viewer,
      canvasWorld,
      highlightedAnnotations, selectedAnnotations,
      searchAnnotations, selectedContentSearchAnnotations,
    } = this.props;
    const highlightsUpdated = !OpenSeadragonViewer.annotationsMatch(
      highlightedAnnotations, prevProps.highlightedAnnotations,
    );
    const selectionsUpdated = !OpenSeadragonViewer.annotationsMatch(
      selectedAnnotations, prevProps.selectedAnnotations,
    );
    const searchAnnotationsUpdated = !OpenSeadragonViewer.annotationsMatch(
      searchAnnotations, prevProps.searchAnnotations,
    );

    const selectedContentSearchAnnotationsUpdated = !OpenSeadragonViewer.annotationsMatch(
      selectedContentSearchAnnotations, prevProps.selectedContentSearchAnnotations,
    );

    if (
      searchAnnotationsUpdated
      || selectedContentSearchAnnotationsUpdated
      || highlightsUpdated
      || selectionsUpdated
    ) {
      this.updateCanvas = this.canvasUpdateCallback();
      this.viewer.forceRedraw();
    }

    if (!this.infoResponsesMatch(prevProps.infoResponses)
      || !this.nonTiledImagedMatch(prevProps.nonTiledImages)
    ) {
      this.viewer.close();
      const canvasesChanged = !(isEqual(canvasWorld.canvasIds, prevProps.canvasWorld.canvasIds));
      this.addAllImageSources((canvasesChanged || !viewer));
    } else if (!isEqual(canvasWorld.layers, prevProps.canvasWorld.layers)) {
      this.refreshTileProperties();
    } else if (viewer && !this.osdUpdating) {
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
      x: Math.round(viewport.centerSpringX.target.value),
      y: Math.round(viewport.centerSpringY.target.value),
      zoom: viewport.zoomSpring.target.value,
    });
  }

  /** */
  canvasUpdateCallback() {
    return () => {
      this.osdCanvasOverlay.clear();
      this.osdCanvasOverlay.resize();
      this.osdCanvasOverlay.canvasUpdate(this.renderAnnotations.bind(this));
    };
  }

  /**
   * annotationsToContext - converts anontations to a canvas context
   */
  annotationsToContext(annotations, color = 'yellow', selected = false) {
    const { canvasWorld } = this.props;
    const context = this.osdCanvasOverlay.context2d;
    const zoomRatio = this.viewer.viewport.getZoom(true) / this.viewer.viewport.getMaxZoom();
    annotations.forEach((annotation) => {
      annotation.resources.forEach((resource) => {
        if (!canvasWorld.canvasIds.includes(resource.targetId)) return;
        const offset = canvasWorld.offsetByCanvas(resource.targetId);
        const canvasAnnotationDisplay = new CanvasAnnotationDisplay({
          color, offset, resource, selected, zoomRatio,
        });
        canvasAnnotationDisplay.toContext(context);
      });
    });
  }

  /** */
  addAllImageSources(zoomAfterAdd = true) {
    const { nonTiledImages, infoResponses } = this.props;
    Promise.all(
      infoResponses.map(infoResponse => this.addTileSource(infoResponse)),
      nonTiledImages.map(image => this.addNonTiledImage(image)),
    ).then(() => {
      if (infoResponses[0] || nonTiledImages[0]) {
        if (zoomAfterAdd) this.zoomToWorld();
        this.refreshTileProperties();
      }
    });
  }

  /** */
  addNonTiledImage(contentResource) {
    const { canvasWorld } = this.props;
    return new Promise((resolve, reject) => {
      if (!this.viewer) {
        return;
      }
      this.viewer.addSimpleImage({
        error: event => reject(event),
        fitBounds: new OpenSeadragon.Rect(
          ...canvasWorld.contentResourceToWorldCoordinates(contentResource),
        ),
        index: canvasWorld.layerIndexOfImageResource(contentResource),
        opacity: canvasWorld.layerOpacityOfImageResource(contentResource),
        success: event => resolve(event),
        url: contentResource.id,
      });
    });
  }

  /**
   */
  addTileSource(infoResponse) {
    const { canvasWorld } = this.props;
    return new Promise((resolve, reject) => {
      if (!this.viewer) {
        return;
      }

      const tileSource = infoResponse.json;
      const contentResource = canvasWorld.contentResource(infoResponse.id);

      if (!contentResource) return;

      this.viewer.addTiledImage({
        error: event => reject(event),
        fitBounds: new OpenSeadragon.Rect(
          ...canvasWorld.contentResourceToWorldCoordinates(contentResource),
        ),
        index: canvasWorld.layerIndexOfImageResource(contentResource),
        opacity: canvasWorld.layerOpacityOfImageResource(contentResource),
        success: event => resolve(event),
        tileSource,
      });
    });
  }

  /** */
  refreshTileProperties() {
    const { canvasWorld } = this.props;
    const { world } = this.viewer;

    const items = [];
    for (let i = 0; i < world.getItemCount(); i += 1) {
      items.push(world.getItemAt(i));
    }

    items.forEach((item, i) => {
      const contentResource = canvasWorld.contentResource(item.source['@id'] || item.source.id);
      if (!contentResource) return;
      const newIndex = canvasWorld.layerIndexOfImageResource(contentResource);
      if (i !== newIndex) world.setItemIndex(item, newIndex);
      item.setOpacity(canvasWorld.layerOpacityOfImageResource(contentResource));
    });
  }

  /**
   */
  fitBounds(x, y, w, h, immediately = true) {
    this.viewer.viewport.fitBounds(
      new OpenSeadragon.Rect(x, y, w, h),
      immediately,
    );
  }

  /**
   * infoResponsesMatch - compares previous tileSources to current to determine
   * whether a refresh of the OSD viewer is needed.
   * @param  {Array} prevTileSources
   * @return {Boolean}
   */
  infoResponsesMatch(prevInfoResponses) {
    const { infoResponses } = this.props;
    if (infoResponses.length === 0 && prevInfoResponses.length === 0) return true;

    return infoResponses.some((infoResponse, index) => {
      if (!prevInfoResponses[index]) {
        return false;
      }

      if (!infoResponse.json) {
        return false;
      }

      if (infoResponse.json['@id'] === (prevInfoResponses[index].json || {})['@id']) {
        return true;
      }

      return false;
    });
  }

  /**
   * nonTiledImagedMatch - compares previous images to current to determin
   * whether a refresh of the OSD viewer is needed
   */
  nonTiledImagedMatch(prevNonTiledImages) {
    const { nonTiledImages } = this.props;
    if (nonTiledImages.length === 0 && prevNonTiledImages.length === 0) return true;

    return nonTiledImages.some((image, index) => {
      if (!prevNonTiledImages[index]) {
        return false;
      }
      if (image.id === prevNonTiledImages[index].id) {
        return true;
      }
      return false;
    });
  }

  /**
   * zoomToWorld - zooms the viewer to the extent of the canvas world
   */
  zoomToWorld(immediately = true) {
    const { canvasWorld } = this.props;
    this.fitBounds(...canvasWorld.worldBounds(), immediately);
  }

  /** */
  renderAnnotations() {
    const {
      searchAnnotations,
      selectedContentSearchAnnotations,
      highlightedAnnotations,
      selectedAnnotations,
      palette,
    } = this.props;

    this.annotationsToContext(searchAnnotations, palette.highlights.secondary);
    this.annotationsToContext(
      selectedContentSearchAnnotations,
      palette.highlights.primary,
      true,
    );

    this.annotationsToContext(highlightedAnnotations, palette.highlights.secondary);
    this.annotationsToContext(selectedAnnotations, palette.highlights.primary, true);
  }

  /**
   * Renders things
   */
  render() {
    const {
      children, classes, label, t, windowId,
    } = this.props;

    const enhancedChildren = React.Children.map(children, child => (
      React.cloneElement(
        child,
        {
          zoomToWorld: this.zoomToWorld,
        },
      )
    ));

    return (
      <>
        <section
          className={classNames(ns('osd-container'), classes.osdContainer)}
          id={`${windowId}-osd`}
          ref={this.ref}
          aria-label={t('item', { label })}
        >
          { enhancedChildren }
        </section>
      </>
    );
  }
}

OpenSeadragonViewer.defaultProps = {
  children: null,
  highlightedAnnotations: [],
  infoResponses: [],
  label: null,
  nonTiledImages: [],
  osdConfig: {},
  palette: {},
  searchAnnotations: [],
  selectedAnnotations: [],
  selectedContentSearchAnnotations: [],
  viewer: null,
};

OpenSeadragonViewer.propTypes = {
  canvasWorld: PropTypes.instanceOf(CanvasWorld).isRequired,
  children: PropTypes.node,
  classes: PropTypes.objectOf(PropTypes.string).isRequired,
  highlightedAnnotations: PropTypes.arrayOf(PropTypes.object),
  infoResponses: PropTypes.arrayOf(PropTypes.object),
  label: PropTypes.string,
  nonTiledImages: PropTypes.array, // eslint-disable-line react/forbid-prop-types
  osdConfig: PropTypes.object, // eslint-disable-line react/forbid-prop-types
  palette: PropTypes.object, // eslint-disable-line react/forbid-prop-types
  searchAnnotations: PropTypes.arrayOf(PropTypes.object),
  selectedAnnotations: PropTypes.arrayOf(PropTypes.object),
  selectedContentSearchAnnotations: PropTypes.arrayOf(PropTypes.object),
  t: PropTypes.func.isRequired,
  updateViewport: PropTypes.func.isRequired,
  viewer: PropTypes.object, // eslint-disable-line react/forbid-prop-types
  windowId: PropTypes.string.isRequired,
};
