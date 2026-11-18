
import { Utils } from 'manifesto.js';
import {
  upgradeToPresentation4,
  normalize,
  // validatePresentation4,
  serialize,
  serializeConfigPresentation3,
} from "@iiif/parser/presentation-4";

import { convertPresentation2 } from "@iiif/parser/presentation-2";
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
        console.log(prop);
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
    let serialized;

    if (this.raw.id) {
      serialized = this.raw;
    } else {
      const upgraded = upgradeToPresentation4(this.raw);
      // const report = validatePresentation4(upgraded);
      const normalized = normalize(upgraded);
      serialized = serialize(
        { entities: normalized.entities, mapping: normalized.mapping, requests: {} },
        normalized.resource,
        serializeConfigPresentation3
      );
    }

    // fix up some things from the normalization that are weird:
    // 1. if there's a sequence-level viewing hint, it should replace the manifest-level hint:
    if (this.raw?.sequences && this.raw.sequences[0] && this.raw.sequences[0].viewingHint) {
      console.log("Hint:", this.raw.sequences[0].viewingHint);
      serialized.behavior = [this.raw.sequences[0].viewingHint];
    }

    if (this.raw?.sequences && this.raw.sequences.length > 1) {
      // restore other sequences as ranges...
    }

    // 2. restore the IIIF v3 rights value, if it got stripped for not being a CC/RS url.
    if (this.raw.rights && !serialized.rights) {
      serialized.rights = this.raw.rights;
    }

    if (this.raw.license && !serialized.rights) {
      serialized.rights = this.raw.license;
    }

    // 3. restore v2 provider logos
    if (this.raw.logo && serialized.provider && serialized.provider.length > 0) {
      const { '@id': id, service, ...rest } = this.raw.logo;

      const convertPresentation2Service = (service) => {
        if (!service) return undefined;
        const { '@id': id, '@context': context,...rest } = service;
        return { id, type: 'ImageService2', profile: 'level1', ...rest };
      };

      const upgradedService = convertPresentation2Service(service);
      const logo = { id, type: 'Image', service: upgradedService, ...rest };

      serialized.provider[0].logo = [logo];
    }

    this.#json = serialized;
    console.log(this.raw, JSON.stringify(serialized, null, 2));
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
