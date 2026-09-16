import compact from 'lodash/compact';
import { v4 as uuid } from 'uuid';
import { isPercentFragment, parsedFragment } from './AnnotationSharedMethods';

/**
 * A modeled WebAnnotation item
 */
export default class AnnotationItem {
  /** */
  constructor(resource = {}) {
    this.resource = resource;
  }

  /** */
  isOnlyTag() {
    return this.motivations.length === 1 && this.motivations[0] === 'tagging';
  }

  /** */
  get id() {
    this._id = this._id || this.resource.id || uuid();
    return this._id;
  }

  /** */
  get targetId() {
    const target = this.target[0];
    switch (typeof target) {
      case 'string':
        return target.replace(/#?xywh=(.*)$/, '');
      case 'object':
        return (target.source && target.source.id) || target.source || target.id;
      default:
        return null;
    }
  }

  /** */
  bodyValue(body) {
    if (typeof body === 'string') return body;
    return body.value;
  }

  /**
   * @return {[Array]}
   */
  get motivations() {
    return compact(new Array(this.resource.motivation)).flat();
  }

  /** */
  get body() {
    return compact(new Array(this.resource.body)).flat();
  }

  /** */
  get resources() {
    return this.body;
  }

  /** */
  get tags() {
    if (this.isOnlyTag()) {
      return this.body.map((r) => this.bodyValue(r));
    }
    return this.body.filter((r) => r.purpose === 'tagging').map((r) => this.bodyValue(r));
  }

  /** */
  get target() {
    return compact(new Array(this.resource.target)).flat();
  }

  /** */
  get chars() {
    if (this.isOnlyTag()) return null;
    return this.body
      .filter((r) => r.purpose !== 'tagging')
      .map((r) => this.bodyValue(r))
      .join(' ');
  }

  /** */
  get selector() {
    const target = this.target[0];
    switch (typeof target) {
      case 'string':
        return target;
      case 'object':
        return compact(new Array(target.selector)).flat();
      default:
        return null;
    }
  }

  /** */
  get svgSelector() {
    const { selector } = this;
    switch (typeof selector) {
      case 'string':
        return null;
      case 'object':
        return selector.find((s) => s.type && s.type === 'SvgSelector');
      default:
        return null;
    }
  }

  /** Regex match for this annotation's xywh fragment, if any */
  get fragmentMatch() {
    const { selector } = this;

    switch (typeof selector) {
      case 'string':
        return selector.match(/xywh=(.*)$/);
      case 'object': {
        const fragmentSelector = selector.find((s) => s.type && s.type === 'FragmentSelector');
        return fragmentSelector && fragmentSelector.value.match(/xywh=(.*)$/);
      }
      default:
        return null;
    }
  }

  /** */
  get fragmentSelector() {
    return parsedFragment(this.fragmentMatch);
  }

  /** Whether fragmentSelector's coordinates are percentages of the canvas, not absolute pixels */
  get fragmentSelectorIsPercent() {
    return isPercentFragment(this.fragmentMatch);
  }
}
