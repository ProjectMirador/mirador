import React, { Component } from 'react';
import PropTypes from 'prop-types';
import debounce from 'lodash/debounce';
import isEqual from 'lodash/isEqual';
import OpenSeadragon from 'openseadragon';
import classNames from 'classnames';
import ns from '../config/css-ns';
import AnnotationsOverlay from '../containers/AnnotationsOverlay';
import CanvasWorld from '../lib/CanvasWorld';
import { PluginHook } from './PluginHook';
import { OSDReferences } from '../plugins/OSDReferences';

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

    this.state = { viewer: undefined };
    this.ref = React.createRef();
    this.apiRef = React.createRef();
    OSDReferences.set(props.windowId, this.apiRef);
    this.onCanvasMouseMove = debounce(this.onCanvasMouseMove.bind(this), 10);
    this.onViewportChange = this.onViewportChange.bind(this);
    this.zoomToWorld = this.zoomToWorld.bind(this);
    this.osdUpdating = false;
  }

  /**
   * React lifecycle event
   */
  componentDidMount() {
    const { osdConfig, t, windowId } = this.props;
    if (!this.ref.current) {
      return;
    }

    const viewer = new OpenSeadragon({
      id: this.ref.current.id,
      ...osdConfig,
    });

    const canvas = viewer.canvas && viewer.canvas.firstElementChild;
    if (canvas) {
      canvas.setAttribute('role', 'img');
      canvas.setAttribute('aria-label', t('digitizedView'));
      canvas.setAttribute('aria-describedby', `osd-info-${windowId}`);
    }

    this.apiRef.current = viewer;

    this.setState({ viewer });

    // Set a flag when OSD starts animating (so that viewer updates are not used)
    viewer.addHandler('animation-start', () => {
      this.osdUpdating = true;
    });
    viewer.addHandler('animation-finish', this.onViewportChange);
    viewer.addHandler('animation-finish', () => {
      this.osdUpdating = false;
    });

    if (viewer.innerTracker) {
      viewer.innerTracker.moveHandler = this.onCanvasMouseMove;
    }
  }

  /**
   * When the tileSources change, make sure to close the OSD viewer.
   * When the annotations change, reset the updateCanvas method to make sure
   * they are added.
   * When the viewport state changes, pan or zoom the OSD viewer as appropriate
   */
  componentDidUpdate(prevProps, prevState) {
    const {
      viewerConfig,
      canvasWorld,
    } = this.props;
    const { viewer } = this.state;
    this.apiRef.current = viewer;

    if (prevState.viewer === undefined) {
      if (viewerConfig) {
        viewer.viewport.panTo(viewerConfig, true);
        viewer.viewport.zoomTo(viewerConfig.zoom, viewerConfig, true);
        viewerConfig.degrees !== undefined && viewer.viewport.setRotation(viewerConfig.degrees);
        viewerConfig.flip !== undefined && viewer.viewport.setFlip(viewerConfig.flip);
      }

      this.addAllImageSources(!(viewerConfig));

      return;
    }

    if (!this.infoResponsesMatch(prevProps.infoResponses)
      || !this.nonTiledImagedMatch(prevProps.nonTiledImages)
    ) {
      viewer.close();
      const canvasesChanged = !(isEqual(canvasWorld.canvasIds, prevProps.canvasWorld.canvasIds));
      this.addAllImageSources((canvasesChanged || !viewerConfig));
    } else if (!isEqual(canvasWorld.layers, prevProps.canvasWorld.layers)) {
      this.refreshTileProperties();
    } else if (viewerConfig && !this.osdUpdating) {
      const { viewport } = viewer;

      if (viewerConfig.x !== viewport.centerSpringX.target.value
        || viewerConfig.y !== viewport.centerSpringY.target.value) {
        viewport.panTo(viewerConfig, false);
      }

      if (viewerConfig.zoom !== viewport.zoomSpring.target.value) {
        viewport.zoomTo(viewerConfig.zoom, viewerConfig, false);
      }

      if (viewerConfig.rotation !== viewport.getRotation()) {
        viewport.setRotation(viewerConfig.rotation);
      }

      if (viewerConfig.flip !== viewport.getFlip()) {
        viewport.setFlip(viewerConfig.flip);
      }
    }
  }

  /**
   */
  componentWillUnmount() {
    const { viewer } = this.state;

    if (viewer.innerTracker
      && viewer.innerTracker.moveHandler === this.onCanvasMouseMove) {
      viewer.innerTracker.moveHandler = null;
    }
    viewer.removeAllHandlers();
    this.apiRef.current = undefined;
  }

  /** Shim to provide a mouse-move event coming from the viewer */
  onCanvasMouseMove(event) {
    const { viewer } = this.state;

    viewer.raiseEvent('mouse-move', event);
  }

  /**
   * Forward OSD state to redux
   */
  onViewportChange(event) {
    const { updateViewport, windowId } = this.props;

    const { viewport } = event.eventSource;

    updateViewport(windowId, {
      flip: viewport.getFlip(),
      rotation: viewport.getRotation(),
      x: Math.round(viewport.centerSpringX.target.value),
      y: Math.round(viewport.centerSpringY.target.value),
      zoom: viewport.zoomSpring.target.value,
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
    const { viewer } = this.state;

    const type = contentResource.getProperty('type');
    const format = contentResource.getProperty('format') || '';

    if (!(type === 'Image' || type === 'dctypes:Image' || format.startsWith('image/'))) return Promise.resolve();

    return new Promise((resolve, reject) => {
      if (!viewer) {
        reject();
      }

      viewer.addSimpleImage({
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
    const { canvasWorld, osdConfig: { placeholderFill = 'rgba(0,0,0,0)' } } = this.props;
    const { viewer } = this.state;
    return new Promise((resolve, reject) => {
      if (!viewer) {
        reject();
      }

      // OSD mutates this object, so we give it a shallow copy
      const tileSource = { ...infoResponse.json };
      const contentResource = canvasWorld.contentResource(infoResponse.id);

      if (!contentResource) return;

      viewer.addTiledImage({
        error: event => reject(event),
        fitBounds: new OpenSeadragon.Rect(
          ...canvasWorld.contentResourceToWorldCoordinates(contentResource),
        ),
        index: canvasWorld.layerIndexOfImageResource(contentResource),
        opacity: canvasWorld.layerOpacityOfImageResource(contentResource),
        placeholderFillStyle: (img, context) => {
          let tick = 0.5;

          /** easing function for animating the opacity */
          const ease = n => 0.15 + 0.25 * (1 - Math.cos(Math.PI * n));
          /** Animate a loading indicator */
          const animation = () => {
            if (
              !img
              || !img.viewport
              || !img.viewer
              || img.viewer.world.getIndexOfItem(img) < 0
              || img.getFullyLoaded()
            ) return;

            tick += 0.015;

            const { viewport } = img;
            const c1 = viewport.imageToViewerElementCoordinates(new OpenSeadragon.Point(0, 0));
            const c2 = viewport.imageToViewerElementCoordinates(img.getContentSize());
            const canvas = [c1.x, c1.y, c2.x - c1.x, c2.y - c1.y];

            // center dot position
            const radius = canvas[3] / 12;
            const dot = { radius, x: canvas[0] + canvas[2] / 2, y: canvas[1] + canvas[3] / 2 };
            const spacing = 2.8;
            const area = [
              dot.x - dot.radius * (1 + spacing),
              dot.y - dot.radius,
              dot.radius * (2 + 2 * spacing),
              dot.radius * 2,
            ];

            context.save();
            context.clearRect(...area);
            context.fillStyle = placeholderFill;
            context.fillRect(...area);
            context.beginPath();
            context.fillStyle = `rgba(190, 190, 190, ${ease(tick)})`;
            context.arc(dot.x - dot.radius * spacing, dot.y, dot.radius, 0, 2 * Math.PI, false);
            context.fill();
            context.beginPath();
            context.fillStyle = `rgba(190, 190, 190, ${ease(tick + 0.15)})`;
            context.arc(dot.x, dot.y, dot.radius, 0, 2 * Math.PI, false);
            context.fill();
            context.beginPath();
            context.fillStyle = `rgba(190, 190, 190, ${ease(tick + 0.3)})`;
            context.arc(dot.x + dot.radius * spacing, dot.y, dot.radius, 0, 2 * Math.PI, false);
            context.fill();
            context.restore();

            window.requestAnimationFrame(animation);
          };
          if (!img.renderingPlaceholder) {
            img.renderingPlaceholder = true; // eslint-disable-line no-param-reassign
            setTimeout(() => {
              window.requestAnimationFrame(animation);
            }, 750);
          }
          return placeholderFill;
        },
        success: event => resolve(event),
        tileSource,
      });
    });
  }

  /** */
  refreshTileProperties() {
    const { canvasWorld } = this.props;
    const { viewer: { world } } = this.state;

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
    const { viewer } = this.state;

    viewer.viewport.fitBounds(
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

  /**
   * Renders things
   */
  render() {
    const {
      children, classes, windowId,
      drawAnnotations,
    } = this.props;
    const { viewer } = this.state;

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
          aria-labelledby={`osd-info-${windowId}`}
          aria-live="polite"
        >
          { drawAnnotations
            && <AnnotationsOverlay viewer={viewer} windowId={windowId} /> }
          { enhancedChildren }
          <PluginHook viewer={viewer} {...{ ...this.props, children: null }} />
        </section>
      </>
    );
  }
}

OpenSeadragonViewer.defaultProps = {
  children: null,
  drawAnnotations: false,
  infoResponses: [],
  nonTiledImages: [],
  osdConfig: {},
  viewerConfig: null,
};

OpenSeadragonViewer.propTypes = {
  canvasWorld: PropTypes.instanceOf(CanvasWorld).isRequired,
  children: PropTypes.node,
  classes: PropTypes.objectOf(PropTypes.string).isRequired,
  drawAnnotations: PropTypes.bool,
  infoResponses: PropTypes.arrayOf(PropTypes.object),
  nonTiledImages: PropTypes.array, // eslint-disable-line react/forbid-prop-types
  osdConfig: PropTypes.object, // eslint-disable-line react/forbid-prop-types
  t: PropTypes.func.isRequired,
  updateViewport: PropTypes.func.isRequired,
  viewerConfig: PropTypes.object, // eslint-disable-line react/forbid-prop-types
  windowId: PropTypes.string.isRequired,
};
