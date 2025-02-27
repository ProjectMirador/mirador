import Openseadragon from 'openseadragon';
import PropTypes from 'prop-types';
import {
  useEffect, useId, useRef, useReducer,
  useState, useCallback,
} from 'react';
import { useDebouncedCallback } from 'use-debounce';
import { useTranslation } from 'react-i18next';
import OpenSeadragonViewerContext from '../contexts/OpenSeadragonViewerContext';

/** Handle setting up OSD for use in mirador + react */
function OpenSeadragonComponent({
  children = undefined, Container = 'div', osdConfig = {}, viewerConfig = {}, worldBounds = undefined, onUpdateViewport = () => {}, setViewer = () => {}, style = {}, ...passThruProps
}) {
  const id = useId();
  const ref = useRef();
  const [grabbing, setGrabbing] = useState(false);
  const viewerRef = useRef(undefined);
  const initialViewportSet = useRef(false);
  const [, forceUpdate] = useReducer(x => x + 1, 0);

  const moveHandler = useDebouncedCallback(useCallback((event) => {
    /** Shim to provide a mouse-move event coming from the viewer */
    viewerRef.current?.raiseEvent('mouse-move', event);
  }, [viewerRef]), 10);

  const onViewportChange = useCallback((event) => {
    const { viewport } = event.eventSource;

    if (!initialViewportSet.current) return;

    onUpdateViewport({
      bounds: viewport.getBounds(),
      flip: viewport.getFlip(),
      rotation: viewport.getRotation(),
      worldBounds: (() => {
        const homeBounds = viewport.viewer?.world?.getHomeBounds();

        if (!homeBounds) return undefined;

        return [homeBounds.x, homeBounds.y, homeBounds.width, homeBounds.height];
      })(),
      x: Math.round(viewport.centerSpringX.target.value),
      y: Math.round(viewport.centerSpringY.target.value),
      zoom: viewport.zoomSpring.target.value,
    });
  }, [onUpdateViewport, initialViewportSet]);

  const setInitialBounds = useCallback(({ viewport }) => {
    if (initialViewportSet.current) return;
    initialViewportSet.current = true;

    if (viewerConfig.x != null && viewerConfig.y != null) {
      viewport.panTo(new Openseadragon.Point(viewerConfig.x, viewerConfig.y), true);
    }

    if (viewerConfig.zoom != null) {
      viewport.zoomTo(viewerConfig.zoom, new Openseadragon.Point(viewerConfig.x, viewerConfig.y), true);
    }

    if (viewerConfig.rotation != null && viewerConfig.rotation !== viewport.getRotation()) {
      viewport.setRotation(viewerConfig.rotation);
    }

    if (viewerConfig.flip != null && (viewerConfig.flip || false) !== viewport.getFlip()) {
      viewport.setFlip(viewerConfig.flip);
    }

    const bounds = viewerConfig.bounds || worldBounds;

    if (!viewerConfig.x && !viewerConfig.y && !viewerConfig.zoom) {
      if (bounds) {
        viewport.fitBounds(new Openseadragon.Rect(...bounds), true);
      } else {
        viewport.goHome(true);
      }
    }
  }, [initialViewportSet, viewerConfig, worldBounds]);

  useEffect(() => {
    const viewer = viewerRef.current;
    if (!viewer) return;

    const { viewport } = viewer;

    if (!initialViewportSet.current) {
      setInitialBounds(viewer);
      return;
    }

    // @ts-expect-error
    if (viewerConfig.x != null && viewerConfig.y != null
      && (Math.round(viewerConfig.x) !== Math.round(viewport.centerSpringX.target.value)
      // @ts-expect-error
      || Math.round(viewerConfig.y) !== Math.round(viewport.centerSpringY.target.value))) {
      viewport.panTo(new Openseadragon.Point(viewerConfig.x, viewerConfig.y), false);
    }

    // @ts-expect-error
    if (viewerConfig.zoom != null && viewerConfig.zoom !== viewport.zoomSpring.target.value) {
      viewport.zoomTo(viewerConfig.zoom, new Openseadragon.Point(viewerConfig.x, viewerConfig.y), false);
    }

    if (viewerConfig.rotation != null && viewerConfig.rotation !== viewport.getRotation()) {
      viewport.setRotation(viewerConfig.rotation);
    }

    if (viewerConfig.flip != null && (viewerConfig.flip || false) !== viewport.getFlip()) {
      viewport.setFlip(viewerConfig.flip);
    }

    const bounds = viewerConfig.bounds || worldBounds;
    if (bounds && !viewerConfig.x && !viewerConfig.y && !viewerConfig.zoom) {
      const rect = new Openseadragon.Rect(...bounds);
      if (!rect.equals(viewport.getBounds())) {
        viewport.fitBounds(rect, false);
      }
    }
  }, [initialViewportSet, setInitialBounds, viewerConfig, viewerRef, worldBounds]);

  useEffect(() => {
    if (!osdConfig.preserveViewport) return;
    if (!viewerConfig?.worldBounds || !worldBounds) return;

    const viewer = viewerRef.current;
    if (!viewer) return;
    const { viewport } = viewer;

    const [_x, _y, width, height] = viewerConfig.worldBounds;
    const [_x1, _y1, width1, height1] = worldBounds;

    const previousAspectRatio = (1.0 * width) / height;
    const newAspectRatio = (1.0 * width1) / height1;

    if ((previousAspectRatio < (1 - osdConfig.resetViewportAfterAspectRatioDelta) * newAspectRatio)
        || (previousAspectRatio > (1 + osdConfig.resetViewportAfterAspectRatioDelta) * newAspectRatio)) {
      const rect = new Openseadragon.Rect(...worldBounds);
      if (!rect.equals(viewport.getBounds())) {
        viewport.fitBounds(rect, false);
      }
    }
  }, [osdConfig, viewerConfig, worldBounds, viewerRef]);

  // initialize OSD stuff when this component is mounted
  useEffect(() => {
    const viewer = Openseadragon({
      element: ref.current,
      ...osdConfig,
      preserveViewportAspectRatio: undefined,
    });

    viewer.addHandler('canvas-drag', () => {
      setGrabbing(true);
    });

    viewer.addHandler('canvas-drag-end', () => {
      setGrabbing(false);
    });

    viewer.addHandler('canvas-double-click', ({ position, shift }) => {
      if (!osdConfig.zoomPerDoubleClick) return;

      const currentZoom = viewer.viewport.getZoom();
      const zoomRatio = (shift ? 1.0 / osdConfig.zoomPerDoubleClick : osdConfig.zoomPerDoubleClick);
      viewer.viewport.zoomTo(currentZoom * zoomRatio, viewer.viewport.pointFromPixel(position), false);
    });

    viewer.addHandler('animation-finish', onViewportChange);
    // @ts-expect-error
    viewer.innerTracker.moveHandler = moveHandler;

    viewerRef.current = viewer;
    setViewer(viewer);

    viewer.addOnceHandler('tile-loaded', () => {
      initialViewportSet.current = false;
      setInitialBounds(viewer);
    });

    forceUpdate();
  }, [ref]); // eslint-disable-line react-hooks/exhaustive-deps

  // cleanup OSD viewer cruft when this component is unmounted
  useEffect(() => () => {
    const viewer = viewerRef.current;

    if (!viewer) return;

    // @ts-expect-error
    if (viewer.innerTracker?.moveHandler === moveHandler) {
      // @ts-expect-error
      viewer.innerTracker.moveHandler = () => {};
    }
    // @ts-expect-error
    viewer.removeAllHandlers();

    viewer.destroy();
    viewerRef.current = undefined;
    setViewer(null);
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const { t } = useTranslation();

  useEffect(() => {
    const canvas = viewerRef?.current?.canvas?.firstElementChild;
    if (canvas) {
      canvas.setAttribute('role', 'img');
      canvas.setAttribute('aria-label', t('digitizedView'));
      canvas.setAttribute('aria-describedby', id);
    }
  }, [viewerRef?.current?.canvas?.firstElementChild, id, t]);

  return (
    <OpenSeadragonViewerContext.Provider value={viewerRef}>
      <Container id={id} ref={ref} style={{ ...style, cursor: grabbing ? 'grabbing' : 'grab' }} {...passThruProps}>
        {children}
      </Container>
    </OpenSeadragonViewerContext.Provider>
  );
}

OpenSeadragonComponent.propTypes = {
  children: PropTypes.node,
  Container: PropTypes.elementType,
  onUpdateViewport: PropTypes.func,
  osdConfig: PropTypes.object, // eslint-disable-line react/forbid-prop-types
  setViewer: PropTypes.func,
  style: PropTypes.object, // eslint-disable-line react/forbid-prop-types
  viewerConfig: PropTypes.shape({
    bounds: PropTypes.arrayOf(PropTypes.number),
    flip: PropTypes.bool,
    rotation: PropTypes.number,
    x: PropTypes.number,
    y: PropTypes.number,
    zoom: PropTypes.number,
  }),
  worldBounds: PropTypes.arrayOf(PropTypes.number),
};

export default OpenSeadragonComponent;
