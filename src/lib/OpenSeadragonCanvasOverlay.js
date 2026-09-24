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
  constructor(viewer, ref) {
    this.viewer = viewer;
    this.ref = ref;

    this.containerWidth = 0;
    this.containerHeight = 0;
    this.viewportOrigin = { x: 0, y: 0 };
  }

  /** get scale of the canvas based on the OSD container vs OSD viewport width */
  get scale() {
    if (!this.viewportWidth) return 1;

    return this.containerWidth / this.viewportWidth;
  }

  /** */
  get canvas() {
    return this.canvasDiv.firstElementChild;
  }

  /** */
  get canvasDiv() {
    return this.ref.current;
  }

  /** */
  get context2d() {
    return this.canvas.getContext('2d');
  }

  /** */
  clear() {
    if (!this.context2d) return;

    this.context2d.clearRect(0, 0, this.containerWidth, this.containerHeight);
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

    const boundsRect = this.viewer.viewport.getBoundsNoRotateWithMargins(true);
    this.viewportOrigin.x = boundsRect.x || 0;
    this.viewportOrigin.y = boundsRect.y || 0;

    this.viewportWidth = boundsRect.width;
    this.viewportHeight = boundsRect.height;
  }

  /**
   * canvasUpdate - sets up the dimensions for the canvas update to mimick IIIF canvas
   * 0 dimensions. Then call provided update function.
   * @param {Function} update
   */
  canvasUpdate(update) {
    if (!this.context2d) return;

    if (this.clearBeforeRedraw) this.clear();
    const { scale } = this;

    this.context2d.translate(-this.viewportOrigin.x * scale, -this.viewportOrigin.y * scale);
    this.context2d.scale(scale, scale);

    const center = this.viewer.viewport.getCenter();

    const flip = this.viewer.viewport.getFlip();
    if (flip) {
      this.context2d.translate(center.x * 2, 0);
      this.context2d.scale(-1, 1);
    }

    const rotation = this.viewer.viewport.getRotation();
    if (rotation !== 0) {
      this.context2d.translate(center.x, center.y);
      this.context2d.rotate((rotation * Math.PI) / 180);
      this.context2d.translate(-1 * center.x, -1 * center.y);
    }
    update();

    this.context2d.setTransform(1, 0, 0, 1, 0, 0);
  }
}
