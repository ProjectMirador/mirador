import flatten from 'lodash/flatten';
import flattenDeep from 'lodash/flattenDeep';
import { Canvas, AnnotationPage, Annotation } from 'manifesto.js';
import { audioResourcesFrom, iiifImageResourcesFrom, videoResourcesFrom } from './typeFilters';
import canvasTypes from './canvasTypes';

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
    return flatten(
      new Array(this.canvas.__jsonld.otherContent), // eslint-disable-line no-underscore-dangle
    )
      .filter(otherContent => otherContent && (typeof otherContent === 'string' || otherContent['@type'] === 'sc:AnnotationList'))
      .map(otherContent => (typeof otherContent === 'string' ? otherContent : otherContent['@id']));
  }

  /** */
  get canvasAnnotationPages() {
    return flatten(
      new Array(this.canvas.__jsonld.annotations), // eslint-disable-line no-underscore-dangle
    )
      .filter(annotations => annotations && annotations.type === 'AnnotationPage');
  }

  /**
   * Will negotiate a v2 or v3 type of resource
   */
  get imageResource() {
    return this.imageResources[0];
  }

  /** Despite name, this method returns paintable resources, not just images */
  get imageResources() {
    const resources = flattenDeep([
      this.canvas.getImages().map(i => i.getResource()),
      this.canvas.getContent().map(i => i.getBody()),
    ]);

    return flatten(resources.map((resource) => {
      switch (resource.getProperty('type')) {
        case 'oa:Choice':
          return new Canvas({ images: flatten([resource.getProperty('default'), resource.getProperty('item')]).map(r => ({ resource: r })) }, this.canvas.options).getImages().map(i => i.getResource());
        default:
          return resource;
      }
    }));
  }

  /** */
  get videoResources() {
    return videoResourcesFrom(this.imageResources);
  }

  /** */
  get audioResources() {
    return audioResourcesFrom(this.imageResources);
  }

  /** */
  get v2VttContent() {
    const resources = flattenDeep([
      this.canvas.getContent().map(i => i.getBody()),
    ]);

    return flatten(resources.filter((resource) => resource.getProperty('format') === 'text/vtt'));
  }

  /** IIIF v3 captions are stored as 'supplementing' Annotations rather than in the resource content itself */
  get v3VttContent() {
    const resources = flattenDeep(this.canvasAnnotationPages.map(annoPage => {
      const manifestoAnnoPage = new AnnotationPage(annoPage, this.canvas.options);
      return manifestoAnnoPage.getItems().map(item => {
        const manifestoAnnotation = new Annotation(item, this.canvas.options);
        return manifestoAnnotation.getBody();
      });
    }));

    return flatten(resources.filter((resource) => resource.getProperty('format') === 'text/vtt'));
  }

  /** */
  get resourceAnnotations() {
    return flattenDeep([
      this.canvas.getImages(),
      this.canvas.getContent(),
    ]);
  }

  /**
   * Returns a given resource Annotation, based on a contained resource or body
   * id
   */
  resourceAnnotation(id) {
    return this.resourceAnnotations.find(
      anno => anno.getResource().id === id || flatten(
        new Array(anno.getBody()),
      ).some(body => body.id === id),
    );
  }

  /**
   * Returns the fragment placement values if a resourceAnnotation is placed on
   * a canvas somewhere besides the full extent
   */
  onFragment(id) {
    const resourceAnnotation = this.resourceAnnotation(id);
    if (!resourceAnnotation) return undefined;
    // IIIF v2
    const on = resourceAnnotation.getProperty('on');
    // IIIF v3
    const target = resourceAnnotation.getProperty('target');
    const fragmentMatch = (on || target).match(/xywh=(.*)$/);
    if (!fragmentMatch) return undefined;
    return fragmentMatch[1].split(',').map(str => parseInt(str, 10));
  }

  /** */
  get iiifImageResources() {
    return iiifImageResourcesFrom(this.imageResources);
  }

  /** */
  get imageServiceIds() {
    /** filter services by profile for IIIF images services */
    const imageServiceFilter = s => canvasTypes.imageServiceProfiles.includes(s.getProfile());
    return this.iiifImageResources.map(r => r.getServices().filter(imageServiceFilter)[0].id);
  }

  /**
   * Get the canvas service
   */
  get service() {
    return this.canvas.__jsonld.service; // eslint-disable-line no-underscore-dangle
  }

  /**
   * Get the canvas label
   */
  getLabel() {
    return this.canvas.getLabel().length > 0
      ? this.canvas.getLabel().getValue()
      : String(this.canvas.index + 1);
  }
}
