import MiradorCanvas from './MiradorCanvas';
import asArray from './asArray';
import { ThumbnailUtils } from './ThumbnailUtils';

/** */
class ImageFactory {
  /** */
  constructor(resource, imageService, getSourceContentResource, iiifOpts = {}) {
    this.resource = resource;
    this.iiifOpts = iiifOpts;
    this.iiifImageService = imageService;
    this.getSourceContentResource = getSourceContentResource;
  }

  /** */
  static staticImageUrl(resource) {
    return { height: resource.height, url: resource.id, width: resource.width };
  }

  /**
   * Selects the image resource that is representative of the given canvas.
   * @param {Object} canvas A Manifesto Canvas
   * @return {Object} A Manifesto Image Resource
   */
  static getPreferredImage(canvas) {
    const miradorCanvas = new MiradorCanvas(canvas);
    return miradorCanvas.iiifImageResources[0] || miradorCanvas.imageResource;
  }

  /**
   * Chooses the best available image size based on a target area (w x h) value.
   * @param {Object} service A IIIF Image API service that has a `sizes` array
   * @param {Number} targetArea The target area value to compare potential sizes against
   * @return {Object|undefined} The best size, or undefined if none are acceptable
   */
  static selectBestImageSize(service, targetArea) {
    const sizes = asArray(service.sizes);

    let closestSize = {
      default: true,
      height: service.height || Number.MAX_SAFE_INTEGER,
      width: service.width || Number.MAX_SAFE_INTEGER,
    };

    /** Compare the total image area to our target */
    const imageFitness = (test) => test.width * test.height - targetArea;

    /** Look for the size that's just bigger than we prefer... */
    closestSize = sizes.reduce((best, test) => {
      const score = imageFitness(test);

      if (score < 0) return best;

      return Math.abs(score) < Math.abs(imageFitness(best))
        ? test
        : best;
    }, closestSize);

    /** .... but not "too" big; we'd rather scale up an image than download too much */
    if (closestSize.width * closestSize.height > targetArea * 6) {
      closestSize = sizes.reduce((best, test) => (
        Math.abs(imageFitness(test)) < Math.abs(imageFitness(best))
          ? test
          : best
      ), closestSize);
    }

    if (closestSize.default) return undefined;

    return closestSize;
  }

  /**
   * Determines the appropriate thumbnail to use to represent an Image Resource.
   * @param {Object} resource The Image Resource from which to derive a thumbnail
   * @return {Object} The thumbnail URL and any spatial dimensions that can be determined
   */
  iiifThumbnailUrl(resource) {
    let size;
    let width;
    let height;
    const minDimension = 120;
    let maxHeight = minDimension;
    let maxWidth = minDimension;
    const { maxHeight: requestedMaxHeight, maxWidth: requestedMaxWidth } = this.iiifOpts;

    if (requestedMaxHeight) maxHeight = Math.max(requestedMaxHeight, minDimension);
    if (requestedMaxWidth) maxWidth = Math.max(requestedMaxWidth, minDimension);

    const service = this.iiifImageService(resource);

    if (!service) return ImageFactory.staticImageUrl(resource);

    const aspectRatio = resource.width
        && resource.height
        && (resource.width / resource.height);

    const target = (requestedMaxWidth && requestedMaxHeight)
      ? requestedMaxWidth * requestedMaxHeight
      : maxHeight * maxWidth;

    const closestSize = ImageFactory.selectBestImageSize(service, target);

    if (closestSize) {
      // Embedded service advertises an appropriate size
      width = closestSize.width;
      height = closestSize.height;
      size = `${width},${height}`;
    } else if (ThumbnailUtils.isLevel0ImageProfile(service)) {
      /** Bail if the best available size is the full size.. maybe we'll get lucky with the @id */
      if (!service.height && !service.width) {
        return ImageFactory.staticImageUrl(resource);
      }
    } else if (requestedMaxHeight && requestedMaxWidth) {
      // IIIF level 2, no problem.
      if (ThumbnailUtils.isLevel2ImageProfile(service)) {
        size = `!${maxWidth},${maxHeight}`;
        width = maxWidth;
        height = maxHeight;

        if (aspectRatio && aspectRatio > 1) height = Math.round(maxWidth / aspectRatio);
        if (aspectRatio && aspectRatio < 1) width = Math.round(maxHeight * aspectRatio);
      } else if ((maxWidth / maxHeight) < aspectRatio) {
        size = `${maxWidth},`;
        width = maxWidth;
        if (aspectRatio) height = Math.round(maxWidth / aspectRatio);
      } else {
        size = `,${maxHeight}`;
        height = maxHeight;
        if (aspectRatio) width = Math.round(maxHeight * aspectRatio);
      }
    } else if (requestedMaxHeight && !requestedMaxWidth) {
      size = `,${maxHeight}`;
      height = maxHeight;
      if (aspectRatio) width = Math.round(maxHeight * aspectRatio);
    } else if (!requestedMaxHeight && requestedMaxWidth) {
      size = `${maxWidth},`;
      width = maxWidth;
      if (aspectRatio) height = Math.round(maxWidth / aspectRatio);
    } else {
      size = `,${minDimension}`;
      height = minDimension;
      if (aspectRatio) width = Math.round(height * aspectRatio);
    }

    const region = 'full';
    // const quality = Utils.getImageQuality(service.getProfile());
    const quality = 'default';
    const id = service.id.replace(/\/+$/, '');
    const format = ThumbnailUtils.getFormat(service, this.iiifOpts);
    return {
      height,
      url: [id, region, size, 0, `${quality}.${format}`].join('/'),
      width,
    };
  }

  /**
   * Gets a thumbnail representing the resource.
   * @return {Object|undefined} A thumbnail representing the resource, or undefined if none could
   * be determined
   */
  get() {
    if (!this.resource) return undefined;

    // Determine which content resource we should use to derive a thumbnail
    const sourceContentResource = this.getSourceContentResource(this.resource);

    if (!sourceContentResource) return undefined;

    // Special treatment for external resources
    if (typeof sourceContentResource === 'string') return { url: sourceContentResource };

    return this.iiifThumbnailUrl(sourceContentResource);
  }
}

export { ImageFactory };
