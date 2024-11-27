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
   * @param player {Object} react-player.js player
   * @param ref {Object} Parent ref object
   * @param canvasSize {Array} IIIF Canvas size
   *
   * If the width and height properties are not specified in the Canvas in the Manifest,
   * canvasSize will be [0, 0, 0, 0].
   */
  constructor(player, ref, canvasSize) {
    this.player = player; // TODO Rename video to player
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

  /**
   * scale - get the display scaling factor of the HTML5 canvas.
   * It is assumed that the size of the Canvas in the Manifest is equal to the size of the video.
   * This will not work correctly if multiple videos are placed on the Canvas.
   */
  get scale() {
    let ratio = 1;

    if (this.player) {
      // Here we talk about IIIF video size, as described in the manifest
      const videoWidth = this.player.props.iiifVideoInfos.getWidth();
      const videoHeight = this.player.props.iiifVideoInfos.getHeight();

      if (videoWidth && videoHeight) {
        const ratioWidth = this.containerWidth / videoWidth;
        const rationHeight = this.containerHeight / videoHeight;
        ratio = Math.min(ratioWidth, rationHeight);
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
    if (!this.player || !this.canvas) { return; }

    const displayedVideoWidth = this.player.wrapper.clientWidth;
    const displayedVideoHeight = this.player.wrapper.clientHeight;

    if (this.containerWidth !== displayedVideoWidth) {
      this.containerWidth = displayedVideoWidth;
      this.canvas.setAttribute('width', this.containerWidth);
    }

    if (this.containerHeight !== displayedVideoHeight) {
      this.containerHeight = displayedVideoHeight;
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
