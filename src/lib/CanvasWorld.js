import normalizeUrl from 'normalize-url';
import MiradorCanvas from './MiradorCanvas';

/**
 * CanvasWorld
 */
export default class CanvasWorld {
  /**
   * @param {Array} canvases - Array of Manifesto:Canvas objects to create a
   * world from.
   */
  constructor(canvases, layers, viewingDirection = 'left-to-right') {
    this.canvases = canvases.map(c => new MiradorCanvas(c));
    this.layers = layers;
    this.viewingDirection = viewingDirection;
  }

  /** */
  get canvasIds() {
    return this.canvases.map(canvas => canvas.id);
  }

  /**
   * contentResourceToWorldCoordinates - calculates the contentResource coordinates
   * respective to the world.
   */
  contentResourceToWorldCoordinates(contentResource) {
    const wholeBounds = this.worldBounds();
    const miradorCanvasIndex = this.canvases.findIndex(c => (
      c.imageResources.find(r => r.id === contentResource.id)
    ));
    const canvas = this.canvases[miradorCanvasIndex];
    const scaledWidth = Math.floor(wholeBounds[3] * canvas.aspectRatio);
    let x = 0;
    if (miradorCanvasIndex === this.secondCanvasIndex) {
      x = wholeBounds[2] - scaledWidth;
    }
    const fragmentOffset = canvas.onFragment(contentResource.id);
    if (fragmentOffset) {
      return [
        x + fragmentOffset[0],
        0 + fragmentOffset[1],
        fragmentOffset[2],
        fragmentOffset[3],
      ];
    }
    return [
      x,
      0,
      scaledWidth,
      wholeBounds[3],
    ];
  }

  /** */
  canvasToWorldCoordinates(canvasId) {
    const wholeBounds = this.worldBounds();
    const miradorCanvasIndex = this.canvases.findIndex(c => (c.id === canvasId));
    const { aspectRatio } = this.canvases[miradorCanvasIndex];
    const scaledWidth = Math.floor(wholeBounds[3] * aspectRatio);
    let x = 0;
    if (miradorCanvasIndex === this.secondCanvasIndex) {
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


  /** Get the IIIF content resource for an image */
  contentResource(infoResponseId) {
    const miradorCanvas = this.canvases.find(c => c.imageServiceIds.some(id => (
      normalizeUrl(id, { stripAuthentication: false })
        === normalizeUrl(infoResponseId, { stripAuthentication: false }))));
    if (!miradorCanvas) return undefined;
    return miradorCanvas.imageResources
      .find(r => (
        normalizeUrl(r.getServices()[0].id, { stripAuthentication: false })
        === normalizeUrl(infoResponseId, { stripAuthentication: false })));
  }

  /** @private */
  getLayerMetadata(contentResource) {
    if (!this.layers) return undefined;
    const miradorCanvas = this.canvases.find(c => (
      c.imageResources.find(r => r.id === contentResource.id)
    ));

    if (!miradorCanvas) return undefined;

    const resourceIndex = miradorCanvas.imageResources
      .findIndex(r => r.id === contentResource.id);

    const layer = this.layers[miradorCanvas.canvas.id];
    const imageResourceLayer = layer && layer[contentResource.id];

    return {
      index: resourceIndex,
      opacity: 1,
      total: miradorCanvas.imageResources.length,
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
    const coordinates = this.canvasToWorldCoordinates(canvasTarget);
    return {
      x: coordinates[0],
      y: coordinates[1],
    };
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
