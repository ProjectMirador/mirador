import compact from 'lodash/compact';
import flatten from 'lodash/flatten';
import uuid from 'uuid/v4';

/** */
export default class AnnotationResource {
  /** */
  constructor(resource = {}) {
    this.resource = resource;
  }

  /** */
  get id() {
    this._id = this._id || this.resource['@id'] || uuid(); // eslint-disable-line no-underscore-dangle
    return this._id; // eslint-disable-line no-underscore-dangle
  }

  /** */
  get targetId() {
    const on = this.on[0];
    switch (typeof on) {
      case 'string':
        return on.replace(/#?xywh=(.*)$/, '');
      case 'object':
        return on.full.replace(/#?xywh=(.*)$/, '');
      default:
        return null;
    }
  }

  /**
   * @return {[Array]}
   */
  get motivations() {
    return flatten(compact(new Array(this.resource.motivation)));
  }

  /** */
  get resources() {
    return flatten(compact(new Array(this.resource.resource)));
  }

  /** */
  get on() {
    return flatten(compact(new Array(this.resource.on)));
  }

  /** */
  get chars() {
    return this.resources.map(r => r.chars).join(' ');
  }

  /** */
  get selector() {
    const on = this.on[0];
    switch (typeof on) {
      case 'string':
        return on;
      case 'object':
        // For choices, just return the default for now. FIXME: enhance for SVG
        // selectors
        if (on.selector['@type'] === 'oa:Choice') {
          return on.selector.default;
        }
        return on.selector;
      default:
        return null;
    }
  }

  /** */
  get fragmentSelector() {
    const { selector } = this;

    switch (typeof selector) {
      case 'string':
        return selector.match(/xywh=(.*)$/)[1].split(',').map(str => parseInt(str, 10));
      case 'object':
        return selector.value.match(/xywh=(.*)$/)[1].split(',').map(str => parseInt(str, 10));
      default:
        return null;
    }
  }
}
