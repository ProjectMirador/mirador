import compact from 'lodash/compact';
import flatten from 'lodash/flatten';
import uuid from 'uuid/v4';

/**
 * A modeled WebAnnotation item
 */
export default class AnnotationItem {
  /** */
  constructor(resource = {}) {
    this.resource = resource;
  }

  /** */
  get id() {
    this._id = this._id || this.resource.id || uuid(); // eslint-disable-line no-underscore-dangle
    return this._id; // eslint-disable-line no-underscore-dangle
  }

  /** */
  get targetId() {
    const target = this.target[0];
    switch (typeof target) {
      case 'string':
        return target.replace(/#?xywh=(.*)$/, '');
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
  get body() {
    return flatten(compact(new Array(this.resource.body)));
  }

  /** */
  get resources() {
    return this.body;
  }

  /** */
  get target() {
    return flatten(compact(new Array(this.resource.target)));
  }

  /** */
  get chars() {
    return this.body.map(r => r.value).join(' ');
  }

  /** */
  get selector() {
    const target = this.target[0];
    switch (typeof target) {
      case 'string':
        return target;
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
      default:
        return null;
    }
  }
}
