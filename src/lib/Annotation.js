import AnnotationResource from './AnnotationResource';
/** */
export default class Annotation {
  /** */
  constructor(json) {
    this.json = json;
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
    return this.json.resources.map(resource => new AnnotationResource(resource));
  }
}
