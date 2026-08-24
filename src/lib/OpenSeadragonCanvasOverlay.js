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
  constructor(viewer, ref) {
    this.viewer = viewer;
    this.ref = ref;

    this.containerWidth = 0;
    this.containerHeight = 0;
    this.imgAspectRatio = 1;
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

    this.viewportOrigin = new OpenSeadragon.Point(0, 0);
    const boundsRect = this.viewer.viewport.getBoundsNoRotateWithMargins(true);
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
    if (!this.context2d) return;
    update(); // if you don't run update this.context2d.canvasId is undefined.
    let image;
    // get the correct image from the OSD viewer
    const count = this.viewer.world.getItemCount();
    for (let i = 0; i < count; i++) {
      const item = this.viewer.world.getItemAt(i);
      if (item.canvasId === this.context2d.canvasId) {
        image = item;
        break;
      }
    }

    if (!image) return;
    const viewportZoom = this.viewer.viewport.getZoom(true);
    const zoom = image.viewportToImageZoom(viewportZoom);

    // Mostly used for scroll and book, we need to know where the start point for an image is.
    // i.e. in a book view the start point for page 2 == width of page 1. OSD will get that with information with getBounds()
    const imageBounds = image.getBounds();
    const { x, y } = image.imageToViewerElementCoordinates(new OpenSeadragon.Point(-imageBounds.x, 0));

    if (this.clearBeforeRedraw) this.clear();
    this.context2d.translate(x, y);
    this.context2d.scale(zoom, zoom);

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
