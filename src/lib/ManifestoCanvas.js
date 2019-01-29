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
   * Creates a canonical image request for a thumb
   * @param {Number} height
   */
  thumbnail(height = 150) {
    const width = Math.floor(height * this.aspectRatio);
    return this.canonicalImageUri.replace(/\/full\/.*\/0\//, `/full/${width},/0/`);
  }
}
