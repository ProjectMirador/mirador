import flatten from 'lodash/flatten';
import AnnotationResource from './AnnotationResource';
/** */
export default class Annotation {
  /** */
  constructor(json, target) {
    this.json = json;
    this.target = target;
  }

  /** */
  get id() {
    return this.json['@id'];
  }

  /** */
  present() {
    return (this.resources
      && this.resources.length > 0);
  }

  /** */
  get resources() {
    if (!this.json || !this.json.resources) return [];

    return flatten([this.json.resources]).map(resource => new AnnotationResource(resource));
  }
}
