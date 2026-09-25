import CanvasAnnotationDisplay from './CanvasAnnotationDisplay';

/**
 * Draws every resource of every given annotation to a canvas context,
 * using the current hover/selection state and palette to determine each
 * resource's appearance. One CanvasAnnotationDisplay is constructed per
 * resource, since selected/hovered state and palette can differ resource
 * to resource.
 */
export function drawAnnotationsToContext(
  renderedAnnotations,
  currentPalette,
  { canvasWorld, osdCanvasOverlay, highlightAllAnnotations, hoveredAnnotationIds, selectedAnnotationId },
) {
  const context = osdCanvasOverlay.context2d;
  const overlayScale = osdCanvasOverlay.scale;

  renderedAnnotations.forEach((annotation) => {
    annotation.resources.forEach((resource) => {
      const canvas = canvasWorld.canvases.find((cwc) => cwc.id === resource.targetId);
      if (!canvas) return;

      const canvasAnnotationDisplay = new CanvasAnnotationDisplay({
        canvasWorld,
        hovered: hoveredAnnotationIds.includes(resource.id),
        overlayScale,
        palette: {
          ...currentPalette,
          default: {
            ...currentPalette.default,
            ...(!highlightAllAnnotations && currentPalette.hidden),
          },
        },
        resource,
        selected: selectedAnnotationId === resource.id,
      });
      canvasAnnotationDisplay.toContext(context);
    });
  });
}
