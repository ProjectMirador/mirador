import OpenSeadragon from 'openseadragon';

/**
 * OpenSeadragonCanvasOverlay - adapted from https://github.com/altert/OpenSeadragonCanvasOverlay
 * used rather than an "onRedraw" function we tap into our own method. Existing
 * repository is not published as an npm package.
 * Code ported from https://github.com/altert/OpenSeadragonCanvasOverlay
 * carries a BSD 3-Clause license originally authored by @altert from
 * https://github.com/altert/OpenseadragonFabricjsOverlay
 */
export default class OpenSeadragonCanvasOverlay {
  /**
   * constructor - sets up the Canvas overlay container
   */
  constructor(viewer) {
    this.viewer = viewer;

    this.containerWidth = 0;
    this.containerHeight = 0;

    this.canvasDiv = document.createElement('div');
    this.canvasDiv.style.position = 'absolute';
    this.canvasDiv.style.left = 0;
    this.canvasDiv.style.top = 0;
    this.canvasDiv.style.width = '100%';
    this.canvasDiv.style.height = '100%';
    this.viewer.canvas.appendChild(this.canvasDiv);

    this.canvas = document.createElement('canvas');
    this.canvasDiv.appendChild(this.canvas);
    this.imgAspectRatio = 1;
  }

  /** */
  get context2d() {
    return this.canvas.getContext('2d');
  }

  /** */
  clear() {
    this.canvas.getContext('2d').clearRect(0, 0, this.containerWidth, this.containerHeight);
  }

  /**
   * resize - resizes the added Canvas overlay.
   */
  resize() {
    if (this.containerWidth !== this.viewer.container.clientWidth) {
      this.containerWidth = this.viewer.container.clientWidth;
      this.canvasDiv.setAttribute('width', this.containerWidth);
      this.canvas.setAttribute('width', this.containerWidth);
    }

    if (this.containerHeight !== this.viewer.container.clientHeight) {
      this.containerHeight = this.viewer.container.clientHeight;
      this.canvasDiv.setAttribute('height', this.containerHeight);
      this.canvas.setAttribute('height', this.containerHeight);
    }

    this.viewportOrigin = new OpenSeadragon.Point(0, 0);
    const boundsRect = this.viewer.viewport.getBounds(true);
    this.viewportOrigin.x = boundsRect.x;
    this.viewportOrigin.y = boundsRect.y * this.imgAspectRatio;

    this.viewportWidth = boundsRect.width;
    this.viewportHeight = boundsRect.height * this.imgAspectRatio;
    const image1 = this.viewer.world.getItemAt(0);
    if (!image1) return;
    this.imgWidth = image1.source.dimensions.x;
    this.imgHeight = image1.source.dimensions.y;
    this.imgAspectRatio = this.imgWidth / this.imgHeight;
  }

  /**
   * canvasUpdate - sets up the dimensions for the canvas update to mimick image
   * 0 dimensions. Then call provided update function.
   * @param {Function} update
   */
  canvasUpdate(update) {
    const viewportZoom = this.viewer.viewport.getZoom(true);
    const image1 = this.viewer.world.getItemAt(0);
    if (!image1) return;
    const zoom = image1.viewportToImageZoom(viewportZoom);

    const x = (
      (this.viewportOrigin.x / this.imgWidth - this.viewportOrigin.x) / this.viewportWidth
    ) * this.containerWidth;
    const y = (
      (this.viewportOrigin.y / this.imgHeight - this.viewportOrigin.y) / this.viewportHeight
    ) * this.containerHeight;

    if (this.clearBeforeRedraw) this.clear();
    this.canvas.getContext('2d').translate(x, y);
    this.canvas.getContext('2d').scale(zoom, zoom);

    update();

    this.canvas.getContext('2d').setTransform(1, 0, 0, 1, 0, 0);
  }
}
