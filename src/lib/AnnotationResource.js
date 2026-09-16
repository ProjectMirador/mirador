import compact from 'lodash/compact';
import { v4 as uuid } from 'uuid';
import { isPercentFragment, parsedFragment } from './AnnotationSharedMethods';

/** */
export default class AnnotationResource {
  /** */
  constructor(resource = {}) {
    this.resource = resource;
  }

  /** */
  isOnlyTag() {
    return this.motivations.length === 1 && this.motivations[0] === 'oa:tagging';
  }

  /** */
  get id() {
    this._id = this._id || this.resource['@id'] || (this.resources[0] && this.resources[0]['@id']) || uuid();
    return this._id;
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
    return compact(new Array(this.resource.motivation)).flat();
  }

  /** */
  get resources() {
    return compact(new Array(this.resource.resource)).flat();
  }

  /** */
  get on() {
    return compact(new Array(this.resource.on)).flat();
  }

  /** */
  get tags() {
    if (this.isOnlyTag()) {
      return this.resources.map((r) => r.chars);
    }
    return this.resources.filter((r) => r['@type'] === 'oa:Tag').map((r) => r.chars);
  }

  /** */
  get chars() {
    return this.resources
      .filter((r) => r['@type'] !== 'oa:Tag')
      .map((r) => r.chars)
      .join(' ');
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
  get svgSelector() {
    const on = this.on[0];

    switch (typeof on) {
      case 'string':
        return null;
      case 'object':
        if (on.selector && on.selector.item && on.selector.item['@type'] === 'oa:SvgSelector') {
          return on.selector.item;
        }
        return null;
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
      case 'object':
        return selector.value.match(/xywh=(.*)$/);
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
