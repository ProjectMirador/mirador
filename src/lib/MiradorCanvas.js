import { Canvas, AnnotationPage, Annotation } from 'manifesto.js';
import { getIiifResourceImageService } from './iiif';

/**
 * MiradorCanvas - adds additional, testable logic around Manifesto's Canvas
 * https://iiif-commons.github.io/manifesto/classes/_canvas_.manifesto.canvas.html
 */
export default class MiradorCanvas {
  /**
   * @param {MiradorCanvas} canvas
   */
  constructor(canvas) {
    this.canvas = canvas;
  }

  /** */
  get id() {
    return this.canvas.id;
  }

  /** */
  getWidth() {
    return this.canvas.getWidth();
  }

  /** */
  getHeight() {
    return this.canvas.getHeight();
  }

  /**
   */
  get aspectRatio() {
    return this.canvas.getWidth() / this.canvas.getHeight();
  }

  /**
   * Fetches AnnotationList URIs from canvas's otherContent property
   *
   * Supported otherContent types:
   * - Objects having @type property of "sc:AnnotationList" and URI in @id
   * - Strings being the URIs
   */
  get annotationListUris() {
    return new Array(this.canvas.__jsonld.otherContent)
      .flat()
      .filter(
        (otherContent) => otherContent && (typeof otherContent === 'string' || otherContent['@type'] === 'sc:AnnotationList'),
      )
      .map((otherContent) => (typeof otherContent === 'string' ? otherContent : otherContent['@id']));
  }

  /** */
  get canvasAnnotationPages() {
    return new Array(this.canvas.__jsonld.annotations)
      .flat()
      .filter((annotations) => annotations && annotations.type === 'AnnotationPage');
  }

  /**
   * Will negotiate a v2 or v3 type of resource
   */
  get imageResource() {
    return this.imageResources[0];
  }

  /** */
  get imageResources() {
    // TODO Clean up the following hack as soon as manifesto.js provides any information if an annotation body is a Choice option, and if so, whether it is the preferred one.
    const resources = [
      this.canvas.getImages().map((i) => i.getResource()),
      this.canvas.getContent().map((i) => (i.__jsonld.body.type === 'Choice' ? i.__jsonld.body : i.getBody())),
    ].flat(Infinity);

    return resources.flatMap((resource) => {
      const type = resource.type || resource.getProperty('type');
      switch (type) {
        case 'Choice': {
          return new Canvas({ images: resource.items.map((r) => ({ resource: r })) }, this.canvas.options)
            .getImages()
            .map((img, index) => {
              const r = img.getResource();
              if (r) {
                r.preferred = !index;
              }
              return r;
            });
        }
        case 'oa:Choice': {
          return new Canvas(
            {
              images: [resource.getProperty('default'), resource.getProperty('item')].flat(Infinity).map((r) => ({
                resource: r,
              })),
            },
            this.canvas.options,
          )
            .getImages()
            .map((img, index) => {
              const r = img.getResource();
              if (r) {
                r.preferred = !index;
              }
              return r;
            });
        }
        default: {
          const r = resource;
          r.preferred = true;
          return r;
        }
      }
    });
  }

  /** */
  get textResources() {
    const resources = [this.canvas.getContent().map((i) => i.getBody())].flat(Infinity);
    return resources.filter((resource) => resource.getProperty('type') === 'Text').flat();
  }

  /** */
  get videoResources() {
    const resources = [this.canvas.getContent().map((i) => i.getBody())].flat(Infinity);
    return resources.filter((resource) => resource.getProperty('type') === 'Video').flat();
  }

  /** */
  get audioResources() {
    const resources = [this.canvas.getContent().map((i) => i.getBody())].flat(Infinity);

    return resources.filter((resource) => resource.getProperty('type') === 'Sound').flat();
  }

  /** */
  get v2VttContent() {
    const resources = [this.canvas.getContent().map((i) => i.getBody())].flat(Infinity);

    return resources.filter((resource) => resource.getProperty('format') === 'text/vtt').flat();
  }

  /** IIIF v3 captions are stored as 'supplementing' Annotations rather than in the resource content itself */
  get v3VttContent() {
    const resources = this.canvasAnnotationPages
      .map((annoPage) => {
        const manifestoAnnoPage = new AnnotationPage(annoPage, this.canvas.options);
        return manifestoAnnoPage.getItems().map((item) => {
          const manifestoAnnotation = new Annotation(item, this.canvas.options);
          return manifestoAnnotation.getBody();
        });
      })
      .flat(Infinity);

    return resources.filter((resource) => resource.getProperty('format') === 'text/vtt').flat();
  }

  /** */
  get resourceAnnotations() {
    return [this.canvas.getImages(), this.canvas.getContent()].flat(Infinity);
  }

  /**
   * Returns a given resource Annotation, based on a contained resource or body
   * id
   */
  resourceAnnotation(id) {
    return this.resourceAnnotations.find(
      (anno) => anno.getResource().id === id || new Array(anno.getBody()).flat().some((body) => body.id === id),
    );
  }

  /**
   * Return the "xywh=" fragment value (e.g. "10,20,300,400") an annotation
   * target carries, or undefined when it targets the full canvas.
   * Targets can be a plain URI (v2/v3 shorthand), or an object:
   *  - v4 (and allowed in v3):  { id: '…/canvas/p1', type: 'Canvas' }
   *  - v3 SpecificResource:     { source: '…/canvas/p1', selector: { value: 'xywh=…' } }
   *  - v2:                      { full: '…/canvas/p1', selector: { value: 'xywh=…' } }
   * or an array of any of these (the first is used).
   */
  static xywhFragment(target) {
    const value = Array.isArray(target) ? target[0] : target;
    const selector = Array.isArray(value?.selector) ? value.selector[0] : value?.selector;
    const candidates = [value, selector?.value, value?.id, value?.full, value?.source?.id, value?.source];

    return candidates.find((v) => typeof v === 'string' && v.includes('xywh='))?.match(/xywh=(.*)$/)?.[1];
  }

  /**
   * Returns the fragment placement values if a resourceAnnotation is placed on
   * a canvas somewhere besides the full extent
   */
  onFragment(id) {
    const resourceAnnotation = this.resourceAnnotation(id);
    if (!resourceAnnotation) return undefined;
    // IIIF v2 uses `on`; v3+ uses `target`
    const fragment = MiradorCanvas.xywhFragment(resourceAnnotation.getProperty('on') || resourceAnnotation.getProperty('target'));
    if (!fragment) return undefined;
    return fragment.split(',').map((str) => parseInt(str, 10));
  }

  /** */
  get iiifImageResources() {
    return this.imageResources.filter((r) => r && getIiifResourceImageService(r)?.id);
  }

  /** */
  get imageServiceIds() {
    return this.iiifImageResources.map((r) => r && getIiifResourceImageService(r)?.id);
  }

  /**
   * Get the canvas service
   */
  get service() {
    return this.canvas.__jsonld.service;
  }

  /**
   * Get the canvas label
   */
  getLabel(locale = undefined) {
    return this.canvas.getLabel().length > 0 ? this.canvas.getLabel().getValue(locale) : String(this.canvas.index + 1);
  }
}
