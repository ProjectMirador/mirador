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
    const { on } = this.resource;
    const onArray = flatten(compact(new Array(on)))[0];

    switch (typeof onArray) {
      case 'string':
        return onArray.replace(/#?xywh=(.*)$/, '');
      case 'object':
        return onArray.full.replace(/#?xywh=(.*)$/, '');
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
  get chars() {
    return this.resources.map(r => r.chars).join(' ');
  }

  /** */
  get fragmentSelector() {
    const { on } = this.resource;
    switch (typeof on) {
      case 'string':
        return on.match(/xywh=(.*)$/)[1].split(',').map(str => parseInt(str, 10));
      case 'object':
        return on.selector.value.match(/xywh=(.*)$/)[1].split(',').map(str => parseInt(str, 10));
      default:
        return null;
    }
  }
}
