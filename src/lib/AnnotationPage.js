import AnnotationItem from './AnnotationItem';
/**
 * Annotation representation for IIIF Presentation v3
 * https://iiif.io/api/presentation/3.0/#55-annotation-page
 */
export default class AnnotationPage {
  /** */
  constructor(json, target, language) {
    this.json = json;
    this.target = target;
    this.language = language;
  }

  /** */
  get id() {
    return this.json.id;
  }

  /** */
  present() {
    return this.items && this.items.length > 0;
  }

  /** */
  get items() {
    this._items =
      this._items ||
      (() => {
        if (!this.json || !this.json.items) return [];
        return [this.json.items].flat().map((resource) => new AnnotationItem(resource, this.target, this.language));
      })();
    return this._items;
  }

  /**
   * Alias to items for compatibility for right now.
   */
  get resources() {
    return this.items;
  }
}
