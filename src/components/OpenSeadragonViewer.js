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
      drawAnnotations,
      drawSearchAnnotations,
      annotations, searchAnnotations,
      hoveredAnnotationIds, selectedAnnotationId,
      highlightAllAnnotations,
    } = this.props;

    const annotationsUpdated = !OpenSeadragonViewer.annotationsMatch(
      annotations, prevProps.annotations,
    );
    const searchAnnotationsUpdated = !OpenSeadragonViewer.annotationsMatch(
      searchAnnotations, prevProps.searchAnnotations,
    );

    const hoveredAnnotationsUpdated = (
      xor(hoveredAnnotationIds, prevProps.hoveredAnnotationIds).length > 0
    );
    const selectedAnnotationsUpdated = selectedAnnotationId !== prevProps.selectedAnnotationId;

    const redrawAnnotations = drawAnnotations !== prevProps.drawAnnotations
      || drawSearchAnnotations !== prevProps.drawSearchAnnotations
      || highlightAllAnnotations !== prevProps.highlightAllAnnotations;

    if (
      searchAnnotationsUpdated
      || annotationsUpdated
      || selectedAnnotationsUpdated
      || hoveredAnnotationsUpdated
      || redrawAnnotations
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

  /** */
  isAnnotationAtPoint(resource, canvas, point) {
    const {
      canvasWorld,
    } = this.props;

    const [canvasX, canvasY] = canvasWorld.canvasToWorldCoordinates(canvas.id);
    const relativeX = point.x - canvasX;
    const relativeY = point.y - canvasY;

    if (resource.svgSelector) {
      const context = this.osdCanvasOverlay.context2d;
      const { svgPaths } = new CanvasAnnotationDisplay({ resource });
      return svgPaths.some(path => context.isPointInPath(new Path2D(path), relativeX, relativeY));
    }

    if (resource.fragmentSelector) {
      const [x, y, w, h] = resource.fragmentSelector;
      return x <= relativeX && relativeX <= (x + w)
        && y <= relativeY && relativeY <= (y + h);
    }
    return false;
  }

  /** */
  annotationsAtPoint(canvas, point) {
    const {
      annotations, searchAnnotations,
    } = this.props;

    const lists = [...annotations, ...searchAnnotations];
    const annos = flatten(lists.map(l => l.resources)).filter((resource) => {
      if (canvas.id !== resource.targetId) return false;

      return this.isAnnotationAtPoint(resource, canvas, point);
    });

    return annos;
  }

  /** */
  toggleAnnotation(targetId, id) {
    const {
      selectedAnnotationId,
      selectAnnotation,
      deselectAnnotation,
      windowId,
    } = this.props;

    if (selectedAnnotationId === id) {
      deselectAnnotation(windowId, targetId, id);
    } else {
      selectAnnotation(windowId, targetId, id);
    }
  }

  /**
   * annotationsToContext - converts anontations to a canvas context
   */
  annotationsToContext(annotations, palette) {
    const {
      highlightAllAnnotations, hoveredAnnotationIds, selectedAnnotationId, canvasWorld,
    } = this.props;
    const context = this.osdCanvasOverlay.context2d;
    const zoomRatio = this.viewer.viewport.getZoom(true) / this.viewer.viewport.getMaxZoom();
    annotations.forEach((annotation) => {
      annotation.resources.forEach((resource) => {
        if (!canvasWorld.canvasIds.includes(resource.targetId)) return;
        const offset = canvasWorld.offsetByCanvas(resource.targetId);
        const canvasAnnotationDisplay = new CanvasAnnotationDisplay({
          hovered: hoveredAnnotationIds.includes(resource.id),
          offset,
          palette: {
            ...palette,
            default: {
              ...palette.default,
              ...(!highlightAllAnnotations && palette.hidden),
            },
          },
          resource,
          selected: selectedAnnotationId === resource.id,
          zoomRatio,
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
    if (infoResponses.length !== prevInfoResponses.length) return false;

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
      annotations,
      drawAnnotations,
      drawSearchAnnotations,
      searchAnnotations,
      palette,
    } = this.props;

    if (drawSearchAnnotations) {
      this.annotationsToContext(searchAnnotations, palette.search);
    }

    if (drawAnnotations) {
      this.annotationsToContext(annotations, palette.annotations);
    }
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
  annotations: [],
  children: null,
  drawAnnotations: true,
  drawSearchAnnotations: true,
  highlightAllAnnotations: false,
  hoveredAnnotationIds: [],
  infoResponses: [],
  label: null,
  nonTiledImages: [],
  osdConfig: {},
  palette: {},
  searchAnnotations: [],
  selectedAnnotationId: undefined,
  viewer: null,
};

OpenSeadragonViewer.propTypes = {
  annotations: PropTypes.arrayOf(PropTypes.object),
  canvasWorld: PropTypes.instanceOf(CanvasWorld).isRequired,
  children: PropTypes.node,
  classes: PropTypes.objectOf(PropTypes.string).isRequired,
  drawAnnotations: PropTypes.bool,
  drawSearchAnnotations: PropTypes.bool,
  highlightAllAnnotations: PropTypes.bool,
  hoveredAnnotationIds: PropTypes.arrayOf(PropTypes.string),
  infoResponses: PropTypes.arrayOf(PropTypes.object),
  label: PropTypes.string,
  nonTiledImages: PropTypes.array, // eslint-disable-line react/forbid-prop-types
  osdConfig: PropTypes.object, // eslint-disable-line react/forbid-prop-types
  palette: PropTypes.object, // eslint-disable-line react/forbid-prop-types
  searchAnnotations: PropTypes.arrayOf(PropTypes.object),
  selectedAnnotationId: PropTypes.string,
  t: PropTypes.func.isRequired,
  updateViewport: PropTypes.func.isRequired,
  viewer: PropTypes.object, // eslint-disable-line react/forbid-prop-types
  windowId: PropTypes.string.isRequired,
};
