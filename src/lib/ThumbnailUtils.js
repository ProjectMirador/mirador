import { Utils } from 'manifesto.js';
import asArray from './asArray';

/** */
class ThumbnailUtils {
  /**
   * Figure out what format thumbnail to use by looking at the preferred formats
   * on offer, and selecting a format shared in common with the application's
   * preferred format list.
   *
   * Fall back to jpg, which is required to work for all IIIF services.
   */
  static getFormat(service, iiifOpts) {
    const { preferredFormats = [] } = iiifOpts;
    const servicePreferredFormats = service.preferredFormats;

    if (!servicePreferredFormats) return 'jpg';

    const filteredFormats = servicePreferredFormats.filter(
      value => preferredFormats.includes(value),
    );

    // this is a format found in common between the preferred formats of the service
    // and the application
    if (filteredFormats[0]) return filteredFormats[0];

    // IIIF Image API guarantees jpg support; if it wasn't provided by the service
    // but the application is fine with it, we might as well try it.
    if (!servicePreferredFormats.includes('jpg') && preferredFormats.includes('jpg')) {
      return 'jpg';
    }

    // there were no formats in common, and the application didn't want jpg... so
    // just trust that the IIIF service is advertising something useful?
    if (servicePreferredFormats[0]) return servicePreferredFormats[0];

    // JPG support is guaranteed by the spec, so it's a good worst-case fallback
    return 'jpg';
  }

  /** */
  static isLevel0ImageProfile(service) {
    // .getProfile() does not work on the v3 provider logos, check the property directly
    const profile = ThumbnailUtils.iiifv3ImageServiceType(service) ? service.profile : service.getProfile();

    // work around a bug in manifesto with normalized urls that strip # values.
    if (profile.endsWith('#level1') || profile.endsWith('#level2')) return false;

    // support IIIF v3-style profiles
    if (profile === 'level0') return true;

    return Utils.isLevel0ImageProfile(profile);
  }

  /** */
  static isLevel2ImageProfile(service) {
    // .getProfile() does not work on the v3 provider logos, check the property directly
    const profile = ThumbnailUtils.iiifv3ImageServiceType(service) ? service.profile : service.getProfile();

    // work around a bug in manifesto with normalized urls that strip # values.
    if (profile.endsWith('#level0') || profile.endsWith('#level1')) return false;

    // support IIIF v3-style profiles
    if (profile === 'level2') return true;

    return Utils.isLevel2ImageProfile(profile);
  }

  /** */
  static iiifv3ImageServiceType(service) {
    const type = service.type || [];

    return asArray(type).some(v => v.startsWith('ImageService'));
  }
}

export { ThumbnailUtils };
