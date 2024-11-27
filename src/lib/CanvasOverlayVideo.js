/**
 * CanvasOverlayVideo - based on the framework of OpenSeadragonCanvasOverlay
 *
 * OpenSeadragonCanvasOverlay - adapted from https://github.com/altert/OpenSeadragonCanvasOverlay
 * Code ported from https://github.com/altert/OpenSeadragonCanvasOverlay
 * carries a BSD 3-Clause license originally authored by @altert from
 * https://github.com/altert/OpenseadragonFabricjsOverlay
 */
export default class CanvasOverlayVideo {
  /**
   * constructor - sets up the Canvas overlay container
   * @param canvasSize {Array} IIIF Canvas size
   * If the width and height properties are not specified in the Canvas in the Manifest,
   * canvasSize will be [0, 0, 0, 0].
   */
  constructor(video, ref, canvasSize) {
    this.video = video;
    this.ref = ref;
    const [
      _canvasX, _canvasY, canvasWidth, canvasHeight, // eslint-disable-line no-unused-vars
    ] = canvasSize;
    this.canvasWidth = canvasWidth;
    this.canvasHeight = canvasHeight;

    this.containerWidth = 0;
    this.containerHeight = 0;
  }

  /** */
  get canvas() {
    return this.ref.current;
  }

  /** */
  get context2d() {
    return this.canvas ? this.canvas.getContext('2d') : null;
  }

  isYoutubeVideo() {
    return this.video.options && this.video.options.host.includes('youtube');
  }

  /**
   * scale - get the display scaling factor of the HTML5 canvas.
   * It is assumed that the size of the Canvas in the Manifest is equal to the size of the video.
   * This will not work correctly if multiple videos are placed on the Canvas.
   */
  get scale() {
    let ratio = 1;

    if (this.video) {
      // Here we talk about IIIF video size, as described in the manifest
      let { videoWidth, videoHeight } = this.video;
      if (this.isYoutubeVideo()) {
        videoWidth = this.canvasWidth; // TODO Not perfect because we suppose that the video is the same size as the canvas
        videoHeight = this.canvasHeight; // TODO Not perfect because we suppose that the video is the same size as the canvas
      }
      if (videoWidth && videoHeight) {
        const ratioWidth = this.containerWidth / videoWidth;
        const rationHeight = this.containerHeight / videoHeight;
        ratio = Math.min(ratioWidth, rationHeight);
        if (ratio > 1) {
          const objectFit = getComputedStyle(this.video, null).getPropertyValue('object-fit');
          if (objectFit === 'scale-down' || objectFit === 'none') {
            ratio = 1;
          }
        }
      }

    } else if (this.canvasWidth && this.canvasHeight) {
      // video is not loaded yet & canvas size is specified
      const ratioWidth = this.containerWidth / this.canvasWidth;
      const rationHeight = this.containerHeight / this.canvasHeight;
      ratio = Math.min(ratioWidth, rationHeight);
      if (ratio > 1) {
        ratio = 1;
      }
    }

    return ratio;
  }

  /** */
  clear() {
    if (this.context2d) {
      this.context2d.clearRect(0, 0, this.containerWidth, this.containerHeight);
    }
  }

  /**
   * resize - resizes the added Canvas overlay.
   */
  resize() {
    if (!this.video || !this.canvas) { return; }

    // YouTube video
    if (this.isYoutubeVideo()) {
      if (this.containerWidth !== this.video.width) {
        this.containerWidth = this.video.getSize().width;
        this.canvas.setAttribute('width', this.containerWidth);
      }
      if (this.containerHeight !== this.video.height) {
        this.containerHeight = this.video.getSize().height;
        this.canvas.setAttribute('height', this.containerHeight);
      }
      return;
    }

    // File video
    if (this.containerWidth !== this.video.clientWidth) {
      this.containerWidth = this.video.clientWidth; // TODO when using YT, this.video.clientWidth is undefined
      this.canvas.setAttribute('width', this.containerWidth);
    }

    if (this.containerHeight !== this.video.clientHeight) {
      this.containerHeight = this.video.clientHeight;
      this.canvas.setAttribute('height', this.containerHeight);
    }
  }

  /**
   * canvasUpdate
   * @param {Function} update
   */
  canvasUpdate(update) {
    if (!this.context2d) { return; }

    const ratio = this.scale;
    this.context2d.scale(ratio, ratio);
    update();
    this.context2d.setTransform(1, 0, 0, 1, 0, 0);
  }
}
