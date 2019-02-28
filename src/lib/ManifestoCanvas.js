/**
 * ManifestoCanvas - adds additional, testable logic around Manifesto's Canvas
 * https://iiif-commons.github.io/manifesto/classes/_canvas_.manifesto.canvas.html
 */
export default class ManifestoCanvas {
  /**
   * @param {ManifestoCanvas} canvas
   */
  constructor(canvas) {
    this.canvas = canvas;
  }

  /**
   */
  get canonicalImageUri() {
    return this.canvas.getCanonicalImageUri();
  }

  /**
   */
  get aspectRatio() {
    return this.canvas.getWidth() / this.canvas.getHeight();
  }

  /**
   */
  get imageInformationUri() {
    if (!(
      this.canvas.getImages()[0]
      && this.canvas.getImages()[0].getResource()
      && this.canvas.getImages()[0].getResource().getServices()[0]
      && this.canvas.getImages()[0].getResource().getServices()[0].id
    )) {
      return undefined;
    }

    return `${
      this.canvas.getImages()[0].getResource().getServices()[0].id.replace(/\/$/, '')
    }/info.json`;
  }

  /**
   * Creates a canonical image request for a thumb
   * @param {Number} height
   */
  thumbnail(maxWidth = undefined, maxHeight = undefined) {
    let width;
    let height;

    if (!this.imageInformationUri) {
      return undefined;
    }

    if (maxWidth && maxHeight) {
      const { aspectRatio } = this;
      const desiredAspectRatio = maxWidth / maxHeight;

      // size to width
      if (desiredAspectRatio < aspectRatio) {
        height = null;
        width = maxWidth;
      } else {
        height = maxHeight;
        width = null;
      }
    } else if (!maxWidth && !maxHeight) {
      width = null;
      height = '150';
    } else {
      width = maxWidth;
      height = maxHeight;
    }
    // note that, although the IIIF server may support sizeByConfinedWh (e.g. !w,h)
    // this is a IIIF level 2 feature, so we're instead providing w, or h,-style requests
    // which are only level 1.
    return this.canonicalImageUri.replace(/\/full\/.*\/0\//, `/full/${width || ''},${height || ''}/0/`);
  }

  /**
   * checks whether the canvas has a valid height
   */
  get hasValidHeight() {
    return (
      typeof this.canvas.getHeight() === 'number'
      && this.canvas.getHeight() > 0
    );
  }

  /**
   * checks whether the canvas has a valid height
   */
  get hasValidWidth() {
    return (
      typeof this.canvas.getHeight() === 'number'
      && this.canvas.getHeight() > 0
    );
  }

  /**
   * checks whether the canvas has valid dimensions
   */
  get hasValidDimensions() {
    return (
      this.hasValidHeight
      && this.hasValidWidth
    );
  }
}
