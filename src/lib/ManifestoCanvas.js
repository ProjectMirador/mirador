import flatten from 'lodash/flatten';
import { Utils } from 'manifesto.js/dist-esmodule/Utils';
/**
 * ManifestoCanvas - adds additional, testable logic around Manifesto's Canvas
 * https://iiif-commons.github.io/manifesto/classes/_canvas_.manifesto.canvas.html
 */
export default class ManifestoCanvas {
  /**
   * @param {ManifestoCanvas} canvas
   */
  constructor(canvas) {
    this.canvas = canvas;
  }

  /**
   * Implements Manifesto's canonicalImageUri algorithm to support
   * IIIF Presentation v3
   */
  canonicalImageUri(w, format = 'jpg') {
    const service = this.imageResource.getServices()[0];
    if (!(service)) return undefined;
    const region = 'full';
    let size = w;
    const imageWidth = this.imageResource.getWidth();
    if ((!w) || w === imageWidth) size = 'full';
    const quality = Utils.getImageQuality(service.getProfile());
    const id = service.id.replace(/\/+$/, '');
    return [id, region, size, 0, `${quality}.${format}`].join('/');
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

  /** */
  processAnnotations(fetchAnnotation, receiveAnnotation) {
    // IIIF v2
    this.annotationListUris.forEach((uri) => {
      fetchAnnotation(this.canvas.id, uri);
    });
    // IIIF v3
    this.canvasAnnotationPages.forEach((annotation) => {
      // If there are no items, try to retrieve the referenced resource.
      // otherwise the resource should be embedded and just add to the store.
      if (!annotation.items) {
        fetchAnnotation(this.canvas.id, annotation.id);
      } else {
        receiveAnnotation(this.canvas.id, annotation.id, annotation);
      }
    });
  }

  /**
   * Will negotiate a v2 or v3 type of resource
   */
  get imageResource() {
    return (this.presentation2ImageResource || this.presentation3ImageResource);
  }

  /** */
  get presentation2ImageResource() {
    if (!(
      this.canvas.getImages()[0]
      && this.canvas.getImages()[0].getResource()
      && this.canvas.getImages()[0].getResource().getServices()[0]
      && this.canvas.getImages()[0].getResource().getServices()[0].id
    )) {
      return undefined;
    }

    return this.canvas.getImages()[0].getResource();
  }

  /** */
  get presentation3ImageResource() {
    if (!(
      this.canvas.getContent()[0]
      && this.canvas.getContent()[0]
      && this.canvas.getContent()[0].getBody()[0]
      && this.canvas.getContent()[0].getBody()[0].getServices()[0]
      && this.canvas.getContent()[0].getBody()[0].getServices()[0].id
    )) {
      return undefined;
    }

    return this.canvas.getContent()[0].getBody()[0];
  }

  /**
   */
  get imageId() {
    if (!(this.imageResource)) {
      return undefined;
    }

    return this.imageResource.getServices()[0].id;
  }

  /**
   */
  get imageInformationUri() {
    if (!(this.imageId)) {
      return undefined;
    }

    return `${
      this.imageId.replace(/\/$/, '')
    }/info.json`;
  }

  /**
   * checks whether the canvas has a valid height
   */
  get hasValidHeight() {
    return (
      typeof this.canvas.getHeight() === 'number'
      && this.canvas.getHeight() > 0
    );
  }

  /**
   * checks whether the canvas has a valid height
   */
  get hasValidWidth() {
    return (
      typeof this.canvas.getHeight() === 'number'
      && this.canvas.getHeight() > 0
    );
  }

  /**
   * checks whether the canvas has valid dimensions
   */
  get hasValidDimensions() {
    return (
      this.hasValidHeight
      && this.hasValidWidth
    );
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
      ? this.canvas.getLabel().map(label => label.value)[0]
      : String(this.canvas.index + 1);
  }

  /**
   * Creates a canonical image request for a thumb
   * @param {Number} height
   */
  thumbnail(maxWidth = undefined, maxHeight = undefined) {
    let width;
    let height;

    if (!this.imageInformationUri) {
      return undefined;
    }

    switch (this.thumbnailConstraints(maxWidth, maxHeight)) {
      case 'sizeByH':
        height = maxHeight;
        break;
      case 'sizeByW':
        width = maxWidth;
        break;
      default:
        height = '150';
    }

    // note that, although the IIIF server may support sizeByConfinedWh (e.g. !w,h)
    // this is a IIIF level 2 feature, so we're instead providing w, or h,-style requests
    // which are only level 1.
    return this.canonicalImageUri().replace(/\/full\/.*\/0\//, `/full/${width || ''},${height || ''}/0/`);
  }

  /** @private */
  thumbnailConstraints(maxWidth, maxHeight) {
    if (!maxHeight && !maxWidth) return undefined;
    if (maxHeight && !maxWidth) return 'sizeByH';
    if (!maxHeight && maxWidth) return 'sizeByW';

    const { aspectRatio } = this;
    const desiredAspectRatio = maxWidth / maxHeight;

    return desiredAspectRatio < aspectRatio ? 'sizeByW' : 'sizeByH';
  }
}
