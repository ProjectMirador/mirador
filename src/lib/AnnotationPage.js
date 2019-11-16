/**
 * Annotation representation for IIIF Presentation v3
 * https://iiif.io/api/presentation/3.0/#55-annotation-page
 */
export default class AnnotationPage {
  /** */
  constructor(json, target) {
    this.json = json;
    this.target = target;
  }

  /** */
  get id() {
    return this.json.id;
  }

  /** */
  present() {
    return (this.items
      && this.items.length > 0);
  }

  /** */
  get items() {
    if (!this.json || !this.json.items) return [];

    return this.json.items;
  }

  /**
   * Alias to items for compatibility for right now.
   */
  get resources() {
    return this.items;
  }
}
