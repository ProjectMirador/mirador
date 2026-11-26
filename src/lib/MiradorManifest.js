import { Utils } from 'manifesto.js';
import normalizeManifest from './normalizeManifest';
/**
 * MiradorManifest - adds additional, testable logic around Manifesto's Manifest
 * https://iiif-commons.github.io/manifesto/classes/_canvas_.manifesto.canvas.html
 */
export default class MiradorManifest {
  /** */
  #manifest;
  #json;

  constructor(json) {
    this.raw = json;

    return new Proxy(this, {
      get(target, prop) {
        return prop in target ? target[prop] : target.manifest[prop];
      },
    });
  }

  get manifest() {
    if (this.#manifest) return this.#manifest;

    // Use structuredClone to create a deep copy and prevent Manifesto from mutating the json
    const manifestoObject = Utils.parseManifest(structuredClone(this.json), undefined);
    if (manifestoObject) {
      // Local patching of Manifesto so that when its a Collection, it behaves similarly
      if (typeof manifestoObject.getSequences != 'function') {
        manifestoObject.getSequences = () => [];
      }
    }

    this.#manifest = manifestoObject;
    return manifestoObject;
  }

  get json() {
    if (this.#json) return this.#json;

    this.#json = normalizeManifest(this.raw);

    return this.#json;
  }

  /**
   * Returns the starting canvas specified in the manifest
   * @param {object} manifest manifesto instance
   * @param {number} canvasIndexFromState
   * @return {Canvas}
   */
  get startCanvas() {
    let canvasId;

    const sequence = this.manifest.getSequences()[0];

    if (!sequence) return undefined;

    // IIIF v2
    canvasId = sequence.getProperty('startCanvas');

    if (!canvasId) {
      // IIIF v3
      const start = this.manifest.getProperty('start') || sequence.getProperty('start');

      canvasId = start && (start.id || start.source);
    }

    return (canvasId && sequence.getCanvasById(canvasId)) || undefined;
  }

  /** */
  canvasAt(index) {
    const sequence = this.manifest.getSequences()[0];
    const canvases = sequence && sequence.getCanvases();

    return canvases && canvases[index];
  }
}
