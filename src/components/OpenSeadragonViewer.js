import React, { Component } from 'react';
import PropTypes from 'prop-types';
import isEqual from 'lodash/isEqual';
import debounce from 'lodash/debounce';
import flatten from 'lodash/flatten';
import sortBy from 'lodash/sortBy';
import xor from 'lodash/xor';
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
    this.onCanvasClick = this.onCanvasClick.bind(this);
    this.onCanvasMouseMove = debounce(this.onCanvasMouseMove.bind(this), 10);
    this.onCanvasExit = this.onCanvasExit.bind(this);
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

    this.viewer.addHandler('canvas-click', this.onCanvasClick);
    this.viewer.addHandler('canvas-exit', this.onCanvasExit);

    if (this.viewer.innerTracker) {
      this.viewer.innerTracker.moveHandler = this.onCanvasMouseMove;
    }

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

    if (hoveredAnnotationsUpdated) {
      if (hoveredAnnotationIds.length > 0) {
        this.ref.current.style.cursor = 'pointer';
      } else {
        this.ref.current.style.cursor = '';
      }
    }

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

  /** */
  onCanvasClick(event) {
    const {
      canvasWorld,
    } = this.props;

    const { position: webPosition, eventSource: { viewport } } = event;
    const point = viewport.pointFromPixel(webPosition);

    const canvas = canvasWorld.canvasAtPoint(point);
    if (!canvas) return;
    const [
      _canvasX, _canvasY, canvasWidth, canvasHeight, // eslint-disable-line no-unused-vars
    ] = canvasWorld.canvasToWorldCoordinates(canvas.id);

    // get all the annotations that contain the click
    const annos = this.annotationsAtPoint(canvas, point);

    if (annos.length > 0) {
      event.preventDefaultAction = true; // eslint-disable-line no-param-reassign
    }

    if (annos.length === 1) {
      this.toggleAnnotation(annos[0].id);
    } else if (annos.length > 0) {
      /**
       * Try to find the "right" annotation to select after a click.
       *
       * This is perhaps a naive method, but seems to deal with rectangles and SVG shapes:
       *
       * - figure out how many points around a circle are inside the annotation shape
       * - if there's a shape with the fewest interior points, it's probably the one
       *       with the closest boundary?
       * - if there's a tie, make the circle bigger and try again.
       */
      const annosWithClickScore = (radius) => {
        const degreesToRadians = Math.PI / 180;

        return (anno) => {
          let score = 0;
          for (let degrees = 0; degrees < 360; degrees += 1) {
            const x = Math.cos(degrees * degreesToRadians) * radius + point.x;
            const y = Math.sin(degrees * degreesToRadians) * radius + point.y;

            if (this.isAnnotationAtPoint(anno, canvas, { x, y })) score += 1;
          }

          return { anno, score };
        };
      };

      let annosWithScore = [];
      let radius = 1;
      annosWithScore = sortBy(annos.map(annosWithClickScore(radius)), 'score');

      while (radius < Math.max(canvasWidth, canvasHeight)
        && annosWithScore[0].score === annosWithScore[1].score) {
        radius *= 2;
        annosWithScore = sortBy(annos.map(annosWithClickScore(radius)), 'score');
      }

      this.toggleAnnotation(annosWithScore[0].anno.id);
    }
  }

  /** */
  onCanvasMouseMove(event) {
    const {
      annotations,
      canvasWorld,
      hoverAnnotation,
      hoveredAnnotationIds,
      searchAnnotations,
      windowId,
    } = this.props;

    if (annotations.length === 0 && searchAnnotations.length === 0) return;

    const { position: webPosition } = event;
    const point = this.viewer.viewport.pointFromPixel(webPosition);

    const canvas = canvasWorld.canvasAtPoint(point);
    if (!canvas) {
      hoverAnnotation(windowId, []);
      return;
    }

    const annos = this.annotationsAtPoint(canvas, point);

    if (xor(hoveredAnnotationIds, annos.map(a => a.id)).length > 0) {
      hoverAnnotation(windowId, annos.map(a => a.id));
    }
  }

  /** If the cursor leaves the canvas, wipe out highlights */
  onCanvasExit(event) {
    const {
      hoverAnnotation,
      windowId,
    } = this.props;

    // a move event may be queued up by the debouncer
    this.onCanvasMouseMove.cancel();
    hoverAnnotation(windowId, []);
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

  /** @private */
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
      return [...svgPaths].some(path => (
        context.isPointInPath(new Path2D(path.attributes.d.nodeValue), relativeX, relativeY)
      ));
    }

    if (resource.fragmentSelector) {
      const [x, y, w, h] = resource.fragmentSelector;
      return x <= relativeX && relativeX <= (x + w)
        && y <= relativeY && relativeY <= (y + h);
    }
    return false;
  }

  /** @private */
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
  toggleAnnotation(id) {
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
  deselectAnnotation: () => {},
  drawAnnotations: true,
  drawSearchAnnotations: true,
  highlightAllAnnotations: false,
  hoverAnnotation: () => {},
  hoveredAnnotationIds: [],
  infoResponses: [],
  label: null,
  nonTiledImages: [],
  osdConfig: {},
  palette: {},
  searchAnnotations: [],
  selectAnnotation: () => {},
  selectedAnnotationId: undefined,
  viewer: null,
};

OpenSeadragonViewer.propTypes = {
  annotations: PropTypes.arrayOf(PropTypes.object),
  canvasWorld: PropTypes.instanceOf(CanvasWorld).isRequired,
  children: PropTypes.node,
  classes: PropTypes.objectOf(PropTypes.string).isRequired,
  deselectAnnotation: PropTypes.func,
  drawAnnotations: PropTypes.bool,
  drawSearchAnnotations: PropTypes.bool,
  highlightAllAnnotations: PropTypes.bool,
  hoverAnnotation: PropTypes.func,
  hoveredAnnotationIds: PropTypes.arrayOf(PropTypes.string),
  infoResponses: PropTypes.arrayOf(PropTypes.object),
  label: PropTypes.string,
  nonTiledImages: PropTypes.array, // eslint-disable-line react/forbid-prop-types
  osdConfig: PropTypes.object, // eslint-disable-line react/forbid-prop-types
  palette: PropTypes.object, // eslint-disable-line react/forbid-prop-types
  searchAnnotations: PropTypes.arrayOf(PropTypes.object),
  selectAnnotation: PropTypes.func,
  selectedAnnotationId: PropTypes.string,
  t: PropTypes.func.isRequired,
  updateViewport: PropTypes.func.isRequired,
  viewer: PropTypes.object, // eslint-disable-line react/forbid-prop-types
  windowId: PropTypes.string.isRequired,
};
