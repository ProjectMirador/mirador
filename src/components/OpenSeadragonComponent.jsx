import Openseadragon from 'openseadragon';
import PropTypes from 'prop-types';
import { useEffect, useId, useRef, useReducer, useState, useCallback } from 'react';
import { useDebouncedCallback } from 'use-debounce';
import { useTranslation } from 'react-i18next';
import OpenSeadragonViewerContext from '../contexts/OpenSeadragonViewerContext';
import { useApplyViewport } from '../hooks';

/**
 * Applies x/y/zoom/rotation/flip to viewport. `immediately` snaps
 * unconditionally (there's nothing yet to compare against the first time
 * this runs). Otherwise each value is only touched if it differs from
 * where the camera is already headed, to avoid restarting an animation
 * that's already correct.
 */
function applyExplicitViewport(viewport, { x, y, zoom, rotation, flip }, immediately) {
  const point = new Openseadragon.Point(x, y);

  if (
    x != null &&
    y != null &&
    (immediately ||
      Math.round(x) !== Math.round(viewport.centerSpringX.target.value) ||
      Math.round(y) !== Math.round(viewport.centerSpringY.target.value))
  ) {
    viewport.panTo(point, immediately);
  }

  // Independent of x/y -- zoom can be applied on its own.
  if (zoom != null && (immediately || zoom !== viewport.zoomSpring.target.value)) {
    viewport.zoomTo(zoom, point, immediately);
    // OSD's own zoom buttons always pair a zoom call with applyConstraints.
    // Because we have custom buttons, we must apply it here to enforce min/max zoom.
    viewport.applyConstraints();
  }

  if (rotation != null && rotation !== viewport.getRotation()) viewport.setRotation(rotation);
  if (flip != null && (flip || false) !== viewport.getFlip()) viewport.setFlip(flip);
}

/** Handle setting up OSD for use in mirador + react */
function OpenSeadragonComponent({
  children = undefined,
  Container = 'div',
  osdConfig = {},
  viewerConfig = {},
  onUpdateViewport = () => {},
  setViewer = () => {},
  style = {},
  ...passThruProps
}) {
  const id = useId();
  const ref = useRef();
  const [grabbing, setGrabbing] = useState(false);
  const viewerRef = useRef(undefined);
  const [, forceUpdate] = useReducer((x) => x + 1, 0);

  const applyState = useApplyViewport(viewerRef.current, viewerConfig);

  const moveHandler = useDebouncedCallback(
    useCallback(
      (event) => {
        /** Shim to provide a mouse-move event coming from the viewer */
        viewerRef.current?.raiseEvent('mouse-move', event);
      },
      [viewerRef],
    ),
    10,
  );

  // Reports the viewport back to Redux (preserveMiradorViewport) after the
  // user's own gesture -- gated on useApplyViewport's state so this never
  // reports (a) before anything's been applied yet, or (b) a position
  // change that Mirador's own applyViewport call just caused, not the user.
  //
  // A multi-canvas transition can trigger several animation-finish events
  // that have nothing to do with the user -- each canvas's own <TileSource>
  // settles its own placement independently, and any one of those can
  // raise animation-finish reporting whatever the viewport happens to be
  // at that moment, not the position we just correctly fit to. So while
  // isApplying, a report is only treated as "settled" (and reporting
  // resumed) once it actually matches what we told OSD to do; anything
  // else in between is discarded as mid-transition noise, not a gesture.
  //
  // Tagged with canvasKey so a late-arriving report can be identified as
  // stale by whoever reads it back, instead of being trusted just because
  // it landed after a Redux write.
  const onViewportChange = useCallback(
    (event) => {
      const { viewport } = event.eventSource;

      if (!applyState.current.hasApplied) return;

      const x = Math.round(viewport.centerSpringX.target.value);
      const y = Math.round(viewport.centerSpringY.target.value);
      const zoom = viewport.zoomSpring.target.value;

      if (applyState.current.isApplying) {
        const { expected } = applyState.current;
        const settled = expected && Math.round(expected.x) === x && Math.round(expected.y) === y && expected.zoom === zoom;

        if (settled) applyState.current.isApplying = false;
        return;
      }

      onUpdateViewport({
        bounds: viewport.getBounds(),
        canvasKey: applyState.current.canvasKey,
        flip: viewport.getFlip(),
        rotation: viewport.getRotation(),
        x,
        y,
        zoom,
      });
    },
    [onUpdateViewport, applyState],
  );

  const setInitialBounds = useCallback(
    ({ viewport }) => {
      if (initialViewportSet.current) return;
      initialViewportSet.current = true;

      applyExplicitViewport(viewport, viewerConfig, true);

      if (!viewerConfig.x && !viewerConfig.y && !viewerConfig.zoom) {
        if (viewerConfig.bounds) {
          viewport.fitBounds(new Openseadragon.Rect(...viewerConfig.bounds), true);
          lastAppliedBounds.current = viewerConfig.bounds;
        } else {
          viewport.goHome(true);
        }
      }
    },
    [initialViewportSet, viewerConfig],
  );

  // Route through a ref, updated every render, so add-item handler
  // always calls the current setInitialBounds -- and therefore reads the
  // current viewerConfig -- instead of whatever it was on the very first render.
  const setInitialBoundsRef = useRef(setInitialBounds);
  setInitialBoundsRef.current = setInitialBounds;

  const runOnceVisible = useDeferUntilVisible();

  useEffect(() => {
    const viewer = viewerRef.current;
    if (!viewer) return;

    const { viewport } = viewer;

    if (!initialViewportSet.current) {
      setInitialBounds(viewer);
      return;
    }

    // Check if bounds changed - always recenter when bounds change)
    if (viewerConfig.bounds) {
      const boundsChanged =
        !lastAppliedBounds.current ||
        viewerConfig.bounds.length !== lastAppliedBounds.current.length ||
        viewerConfig.bounds.some((val, idx) => val !== lastAppliedBounds.current[idx]);

      // Bounds changed - recenter regardless of whether x/y/zoom exist
      if (boundsChanged) {
        isResettingViewport.current = true;
        lastAppliedBounds.current = viewerConfig.bounds;

        // Wait for the tiles to be fully loaded before recentering
        const handleTilesLoaded = () => {
          const rect = new Openseadragon.Rect(...viewerConfig.bounds);
          viewport.fitBoundsWithConstraints(rect, true);
          isResettingViewport.current = false;
        };

        viewer.addOnceHandler('tile-loaded', handleTilesLoaded);
        return;
      }
    }

    // Apply preserved viewport only if bounds haven't changed
    // Don't apply x/y/zoom if we don't have them (rely on bounds instead)
    if (!viewerConfig.x || !viewerConfig.y || !viewerConfig.zoom) {
      return;
    }

    applyExplicitViewport(viewport, viewerConfig, false);
  }, [initialViewportSet, setInitialBounds, viewerConfig, viewerRef]);

  // initialize OSD stuff when this component is mounted
  useEffect(() => {
    const viewer = Openseadragon({
      element: ref.current,
      ...osdConfig,
      // OSD's own preserveViewport option (unrelated to Mirador's own
      // preserveMiradorViewport feature -- see settings.js) governs an
      // internal, undocumented auto-goHome() whenever world.getItemCount()
      // === 1, which can fire on whichever single canvas happens to be
      // momentarily alone in the world mid-transition (each canvas's own
      // <TileSource> mounts independently), racing against our own
      // useApplyViewport fit. Since this architecture fully owns camera
      // positioning, that internal auto-recenter must always be disabled --
      // never a pass-through of any Mirador config value.
      preserveViewport: true,
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
      const zoomRatio = shift ? 1.0 / osdConfig.zoomPerDoubleClick : osdConfig.zoomPerDoubleClick;
      viewer.viewport.zoomTo(currentZoom * zoomRatio, viewer.viewport.pointFromPixel(position), false);
    });

    viewer.addHandler('animation-finish', onViewportChange);
    // @ts-expect-error
    viewer.innerTracker.moveHandler = moveHandler;

    viewerRef.current = viewer;
    setViewer(viewer);

    forceUpdate();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ref]);

  // cleanup OSD viewer cruft when this component is unmounted
  useEffect(
    () => () => {
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
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [],
  );

  const { t } = useTranslation();

  // TODO: add clarifying comment
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
  osdConfig: PropTypes.object,
  setViewer: PropTypes.func,
  style: PropTypes.object,
  viewerConfig: PropTypes.shape({
    bounds: PropTypes.arrayOf(PropTypes.number),
    flip: PropTypes.bool,
    rotation: PropTypes.number,
    x: PropTypes.number,
    y: PropTypes.number,
    zoom: PropTypes.number,
  }),
};

export default OpenSeadragonComponent;
