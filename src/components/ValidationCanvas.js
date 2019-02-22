import ManifestoCanvas from '../lib/ManifestoCanvas';

/**
 */
export class ValidationCanvas extends ManifestoCanvas {
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
