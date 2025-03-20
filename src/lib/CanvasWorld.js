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
  constructor(miradorCanvases, layers, viewingDirection = 'left-to-right') {
    this.canvases = miradorCanvases;
    this.layers = layers;
    this.viewingDirection = viewingDirection;
    this._canvasDimensions = null; // eslint-disable-line no-underscore-dangle
  }

  /** */
  get canvasIds() {
    return this.canvases.map(canvas => canvas.id);
  }

  /** */
  get canvasDimensions() {
    if (this._canvasDimensions) { // eslint-disable-line no-underscore-dangle
      return this._canvasDimensions; // eslint-disable-line no-underscore-dangle
    }

    const [dirX, dirY] = this.canvasDirection;
    const scale = dirY === 0
      ? Math.min(...this.canvases.map(c => c.getHeight()))
      : Math.min(...this.canvases.map(c => c.getWidth()));
    let incX = 0;
    let incY = 0;

    const canvasDims = this.canvases.reduce((acc, canvas) => {
      let canvasHeight = 0;
      let canvasWidth = 0;

      if (!Number.isNaN(canvas.aspectRatio)) {
        if (dirY === 0) {
          // constant height
          canvasHeight = scale;
          canvasWidth = Math.floor(scale * canvas.aspectRatio);
        } else {
          // constant width
          canvasWidth = scale;
          canvasHeight = Math.floor(scale * (1 / canvas.aspectRatio));
        }
      }

      acc.push({
        canvas,
        height: canvasHeight,
        width: canvasWidth,
        x: incX,
        y: incY,
      });

      incX += dirX * canvasWidth;
      incY += dirY * canvasHeight;
      return acc;
    }, []);

    const worldHeight = dirY === 0 ? scale : Math.abs(incY);
    const worldWidth = dirX === 0 ? scale : Math.abs(incX);

    this._canvasDimensions = canvasDims // eslint-disable-line no-underscore-dangle
      .reduce((acc, dims) => {
        acc.push({
          ...dims,
          x: dirX === -1 ? dims.x + worldWidth - dims.width : dims.x,
          y: dirY === -1 ? dims.y + worldHeight - dims.height : dims.y,
        });

        return acc;
      }, []);

    return this._canvasDimensions; // eslint-disable-line no-underscore-dangle
  }

  /**
   * contentResourceToWorldCoordinates - calculates the contentResource coordinates
   * respective to the world.
   */
  contentResourceToWorldCoordinates(contentResource) {
    const miradorCanvasIndex = this.canvases.findIndex(c => (
      c.imageResources.find(r => r.id === contentResource.id)
    ));
    const canvas = this.canvases[miradorCanvasIndex];
    if (!canvas) return [];

    const [x, y, w, h] = this.canvasToWorldCoordinates(canvas.id);

    const fragmentOffset = canvas.onFragment(contentResource.id);
    if (fragmentOffset) {
      return [
        x + fragmentOffset[0],
        y + fragmentOffset[1],
        fragmentOffset[2],
        fragmentOffset[3],
      ];
    }
    return [
      x,
      y,
      w,
      h,
    ];
  }

  /** */
  canvasToWorldCoordinates(canvasId) {
    const canvasDimensions = this.canvasDimensions.find(c => c.canvas.id === canvasId);

    return [
      canvasDimensions.x,
      canvasDimensions.y,
      canvasDimensions.width,
      canvasDimensions.height,
    ];
  }

  /** */
  get canvasDirection() {
    switch (this.viewingDirection) {
      case 'left-to-right': return [1, 0];
      case 'right-to-left': return [-1, 0];
      case 'top-to-bottom': return [0, 1];
      case 'bottom-to-top': return [0, -1];
      default: return [1, 0];
    }
  }

  /** Get the IIIF content resource for an image */
  contentResource(infoResponseId) {
    const miradorCanvas = this.canvases.find(c => c.imageServiceIds.some(id => (
      id && infoResponseId && normalizeUrl(id, { stripAuthentication: false })
        === normalizeUrl(infoResponseId, { stripAuthentication: false }))));
    if (!miradorCanvas) return undefined;
    return miradorCanvas.imageResources
      .find(r => (
        normalizeUrl(r.getServices()[0].id, { stripAuthentication: false })
        === normalizeUrl(infoResponseId, { stripAuthentication: false })));
  }

  /** @private */
  getLayerMetadata(contentResource) {
    const miradorCanvas = this.canvases.find(c => (
      c.imageResources.find(r => r.id === contentResource.id)
    ));

    if (!miradorCanvas) return undefined;

    const resourceIndex = miradorCanvas.imageResources
      .findIndex(r => r.id === contentResource.id);
    const resource = miradorCanvas.imageResources
      .find(r => r.id === contentResource.id);

    const layer = this.layers && this.layers[miradorCanvas.canvas.id];
    const imageResourceLayer = (layer && layer[contentResource.id]) || {};

    return {
      index: resourceIndex,
      opacity: 1,
      total: miradorCanvas.imageResources.length,
      visibility: !!resource.preferred,
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

    return layer.index;
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

  /** */
  hasDimensions() {
    return this.canvasDimensions.length > 0;
  }

  /**
   * worldBounds - calculates the "World" bounds. World in this case is canvases
   * lined up horizontally starting from left to right.
   */
  worldBounds() {
    const worldWidth = Math.max(0, ...this.canvasDimensions.map(c => c.x + c.width));
    const worldHeight = Math.max(0, ...this.canvasDimensions.map(c => c.y + c.height));

    return [
      0,
      0,
      worldWidth,
      worldHeight,
    ];
  }

  /** */
  canvasAtPoint(point) {
    const canvasDimensions = this.canvasDimensions.find(c => (
      c.x <= point.x && point.x <= (c.x + c.width)
        && c.y <= point.y && point.y <= (c.y + c.height)
    ));

    return canvasDimensions && canvasDimensions.canvas;
  }
}
