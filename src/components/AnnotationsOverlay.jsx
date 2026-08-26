import { useRef, useEffect, useCallback, useMemo } from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import { useDebouncedCallback } from 'use-debounce';
import sortBy from 'lodash/sortBy';
import xor from 'lodash/xor';
import CanvasWorld from '../lib/CanvasWorld';
import CanvasAnnotationDisplay, { updateSVGPalette } from '../lib/CanvasAnnotationDisplay';
import OpenSeadragon from 'openseadragon';

/**
 * See: https://openseadragon.github.io/docs/OpenSeadragon.Viewer.html#.event:canvas-click
 * Gestures returned from this method are likely viewer interactions such as pan and zoom,
 * not taps and clicks targeted to an annotation.
 * In deciding whether to change the display of the annotation overlay,
 * we want to ignore these irrelevant gestures.
 * @private
 */
function isIgnoredGesture(event) {
  const pointerType = event.originalEvent?.pointerType;
  return (pointerType === 'touch' || pointerType === 'pen') && event.quick === false;
}

/**
 * Represents a OpenSeadragonViewer in the mirador workspace. Responsible for mounting
 * and rendering OSD.
 */
export function AnnotationsOverlay({
  annotations = [],
  canvasWorld,
  deselectAnnotation = () => {},
  drawAnnotations = true,
  drawSearchAnnotations = true,
  highlightAllAnnotations = false,
  hoverAnnotation = () => {},
  hoveredAnnotationIds = [],
  palette = {},
  searchAnnotations = [],
  selectAnnotation = () => {},
  selectedAnnotationId = null,
  viewer = null,
  windowId,
}) {
  const ref = useRef();

  const toggleAnnotation = useCallback(
    (id) => {
      if (selectedAnnotationId === id) {
        deselectAnnotation(windowId, id);
      } else {
        selectAnnotation(windowId, id);
      }
    },
    [selectedAnnotationId, deselectAnnotation, selectAnnotation, windowId],
  );

  const annotationClick = useCallback((svgElement) => {
    updateSVGPalette(palette.annotations.selected, svgElement, true);
  }, [palette, highlightAllAnnotations]);
  const annotationHover = useCallback((svgElement) => {
    console.log(palette.annotations, svgElement, highlightAllAnnotations)
    updateSVGPalette(palette.annotations.selected, svgElement, true);
  }, [palette, highlightAllAnnotations]);
  const annotationExit = useCallback((svgElement) => {
    updateSVGPalette(palette.annotations.selected, svgElement, highlightAllAnnotations);
  }, [palette, highlightAllAnnotations]);

  /**
   * annotationsToContext - converts anontations to a canvas context
   */
  const annotationsToContext = useCallback(
    (renderedAnnotations, currentPalette) => {
      // viewer.clearOverlays();
      renderedAnnotations.forEach((annotation) => {
        annotation.resources.forEach((resource) => {
          let viewportCanvas;
          const count = viewer.world.getItemCount();
          for (let i = 0; i < count; i++) {
            const item = viewer.world.getItemAt(i);
            if (item.canvasId === resource.targetId) {
              viewportCanvas = item;
              break;
            }
          }
          if (!viewportCanvas || !canvasWorld.canvasIds.includes(resource.targetId)) return;
          const offset = canvasWorld.offsetByCanvas(resource.targetId);
          const canvasAnnotationDisplay = new CanvasAnnotationDisplay({
            palette: {
              ...currentPalette,
              default: {
                ...currentPalette.default,
                ...(!highlightAllAnnotations && currentPalette.hidden),
              },
            },
            resource,
            viewportCanvas,
            viewer,
          });
          const svgElement = canvasAnnotationDisplay.toContext();
          console.log(svgElement)
          const tracker = new OpenSeadragon.MouseTracker({
            element: svgElement,
            clickHandler: function (event) {
              annotationClick(svgElement);
            },
            enterHandler: function (event) {
              annotationHover(svgElement);
            },
            leaveHandler: function (event) {
              annotationExit(svgElement);
            },
          }).setTracking(true);
        });
      });
    },
    [viewer, canvasWorld, highlightAllAnnotations, hoveredAnnotationIds, selectedAnnotationId],
  );


  const renderAnnotations = useCallback(() => {
    if (drawSearchAnnotations) {
      annotationsToContext(searchAnnotations, palette.search);
    }

    if (drawAnnotations) {
      annotationsToContext(annotations, palette.annotations);
    }
  }, [annotations, annotationsToContext, drawAnnotations, drawSearchAnnotations, palette, searchAnnotations]);

  useEffect(() => {
    if (!viewer) return undefined;
    viewer.addHandler('tile-loaded', renderAnnotations);
  }, [viewer]);

  useEffect(() => {
    //if (viewer) viewer.forceRedraw();
    if (!viewer) { return; }
    viewer.currentOverlays.forEach((overlay) => {
      const id = overlay.element.id;
      if (id == selectedAnnotationId) {
        updateSVGPalette(palette.annotations.selected, overlay.element, true)
      } else if (hoveredAnnotationIds.includes(id)) {
        updateSVGPalette(palette.annotations.hovered, overlay.element, true)
      } else {
        updateSVGPalette(palette.annotations.default, overlay.element, highlightAllAnnotations)
      }
    })
  }, [
    annotations,
    drawAnnotations,
    drawSearchAnnotations,
    highlightAllAnnotations,
    hoveredAnnotationIds,
    searchAnnotations,
    selectedAnnotationId,
    viewer,
    palette,
  ]);

  useEffect(() => {
    if (!ref.current) return;
    if (hoveredAnnotationIds.length > 0) {
      ref.current.style.cursor = 'pointer';
    } else {
      ref.current.style.cursor = '';
    }
  }, [hoveredAnnotationIds, ref]);
}

AnnotationsOverlay.propTypes = {
  annotations: PropTypes.arrayOf(PropTypes.object),
  canvasWorld: PropTypes.instanceOf(CanvasWorld).isRequired,
  deselectAnnotation: PropTypes.func,
  drawAnnotations: PropTypes.bool,
  drawSearchAnnotations: PropTypes.bool,
  highlightAllAnnotations: PropTypes.bool,
  hoverAnnotation: PropTypes.func,
  hoveredAnnotationIds: PropTypes.arrayOf(PropTypes.string),
  palette: PropTypes.object,
  searchAnnotations: PropTypes.arrayOf(PropTypes.object),
  selectAnnotation: PropTypes.func,
  selectedAnnotationId: PropTypes.string,
  viewer: PropTypes.object,
  windowId: PropTypes.string.isRequired,
};
