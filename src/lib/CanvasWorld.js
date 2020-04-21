import normalizeUrl from 'normalize-url';
import ManifestoCanvas from './ManifestoCanvas';

/**
 * CanvasWorld
 */
export default class CanvasWorld {
  /**
   * @param {Array} canvases - Array of Manifesto:Canvas objects to create a
   * world from.
   */
  constructor(canvases, layers, viewingDirection = 'left-to-right') {
    this.canvases = canvases.map(c => new ManifestoCanvas(c));
    this.layers = layers;
    this.viewingDirection = viewingDirection;
  }

  /** */
  get canvasIds() {
    return this.canvases.map(canvas => canvas.id);
  }

  /**
   * canvasToWorldCoordinates - calculates the canvas coordinates respective to
   * the world.
   */
  canvasToWorldCoordinates(contentResource) {
    const wholeBounds = this.worldBounds();
    const manifestoCanvasIndex = this.canvases.findIndex(c => (
      c.imageResources.find(r => r.id === contentResource.id)
    ));
    const { aspectRatio } = this.canvases[manifestoCanvasIndex];
    const scaledWidth = Math.floor(wholeBounds[3] * aspectRatio);
    let x = 0;
    if (manifestoCanvasIndex === this.secondCanvasIndex) {
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
   * secondCanvasIndex - index of the second canvas used for determining which
   * is first
   */
  get secondCanvasIndex() {
    return this.viewingDirection === 'right-to-left' ? 0 : 1;
  }

  /** */
  indexOfTarget(canvasTarget) {
    return this.canvases.map(canvas => canvas.id).indexOf(canvasTarget);
  }

  /** Get the IIIF content resource for an image */
  contentResource(infoResponse) {
    const imageId = infoResponse.id;
    const manifestoCanvas = this.canvases.find(c => c.imageServiceIds.some(id => (
      normalizeUrl(id, { stripAuthentication: false })
        === normalizeUrl(imageId, { stripAuthentication: false }))));
    if (!manifestoCanvas) return undefined;

    return manifestoCanvas.imageResources
      .find(r => (
        normalizeUrl(r.getServices()[0].id, { stripAuthentication: false })
        === normalizeUrl(imageId, { stripAuthentication: false })));
  }

  /** @private */
  getLayerMetadata(contentResource) {
    if (!this.layers) return undefined;
    const manifestoCanvas = this.canvases.find(c => (
      c.imageResources.find(r => r.id === contentResource.id)
    ));

    if (!manifestoCanvas) return undefined;

    const resourceIndex = manifestoCanvas.imageResources
      .findIndex(r => r.id === contentResource.id);

    const layer = this.layers[manifestoCanvas.canvas.id];
    const imageResourceLayer = layer && layer[contentResource.id];

    return {
      index: resourceIndex,
      opacity: 1,
      total: manifestoCanvas.imageResources.length,
      visibility: true,
      ...imageResourceLayer,
    };
  }

  /** */
  layerOpacityOfImageResource(contentResource) {
    const layer = this.getLayerMetadata(contentResource);
    if (!layer) return 1;
    if (!layer.visibility) return 0;

    return layer.opacity;
  }

  /** */
  layerIndexOfImageResource(contentResource) {
    const layer = this.getLayerMetadata(contentResource);
    if (!layer) return undefined;

    return layer.total - layer.index - 1;
  }

  /**
   * offsetByCanvas - calculates the offset for a given canvas target. Currently
   * assumes a horrizontal only layout.
   */
  offsetByCanvas(canvasTarget) {
    const offset = { x: 0, y: 0 };
    let i;
    for (i = 0; i < this.indexOfTarget(canvasTarget); i += 1) {
      offset.x += this.canvases[i].getWidth();
    }
    return offset;
  }

  /**
   * worldBounds - calculates the "World" bounds. World in this case is canvases
   * lined up horizontally starting from left to right.
   */
  worldBounds() {
    const heights = [];
    const dimensions = [];
    this.canvases.forEach((canvas) => {
      heights.push(canvas.getHeight());
      dimensions.push({
        height: canvas.getHeight(),
        width: canvas.getWidth(),
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
}
