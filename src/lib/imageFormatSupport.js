import Openseadragon from 'openseadragon';

/**
 * 1x1 pixel images used to probe whether the browser can decode a format.
 * Formats not listed here (jpg, png, ...) are assumed to be supported.
 */
const PROBES = {
  avif: 'data:image/avif;base64,AAAAHGZ0eXBhdmlmAAAAAG1pZjFhdmlmbWlhZgAAANZtZXRhAAAAAAAAACFoZGxyAAAAAAAAAABwaWN0AAAAAAAAAAAAAAAAAAAAAA5waXRtAAAAAAABAAAAImlsb2MAAAAAREAAAQABAAAAAAD6AAEAAAAAAAAAGgAAACNpaW5mAAAAAAABAAAAFWluZmUCAAAAAAEAAGF2MDEAAAAAVmlwcnAAAAA4aXBjbwAAAAxhdjFDgQAMAAAAABRpc3BlAAAAAAAAAAEAAAABAAAAEHBpeGkAAAAAAwgICAAAABZpcG1hAAAAAAAAAAEAAQOBAgMAAAAibWRhdBIACggYAAYICGg0IDIMGAAKKKKEAACwEpqY',
  jxl: 'data:image/jxl;base64,/woAEAwkxY0AE4gCAKwAKYzhAABUqIwybvByrufLDx0W0zauM7TVtoUljIlnHCwkHCYMN2OEIUIlAA==',
  webp: 'data:image/webp;base64,UklGRiQAAABXRUJQVlA4IBgAAAAwAQCdASoBAAEAAgA0JaQAA3AA/vuUAAA=',
};

/** Give up on a probe that neither loads nor errors (e.g. in non-browser environments) */
const PROBE_TIMEOUT = 2000;

/**
 * Support assumed until detection completes; matches OpenSeadragon's built-in defaults
 */
const supported = { avif: true, jxl: false, webp: true };

let detection;

/** Resolve whether the browser can decode the given probe image */
function probe(src) {
  return new Promise((resolve) => {
    if (typeof Image === 'undefined') {
      resolve(undefined);
      return;
    }

    const img = new Image();
    const timer = setTimeout(() => resolve(undefined), PROBE_TIMEOUT);
    img.onload = () => {
      clearTimeout(timer);
      resolve(img.width > 0 && img.height > 0);
    };
    img.onerror = () => {
      clearTimeout(timer);
      resolve(false);
    };
    img.src = src;
  });
}

/**
 * Detect which optional image formats the browser can decode, and tell
 * OpenSeadragon so it picks a usable format from an image service's preferredFormats.
 * Detection runs once; subsequent calls return the same promise.
 * @returns {Promise<Object>} map of format extension to support
 */
export function detectImageFormats() {
  if (detection) return detection;

  detection = Promise.all(Object.entries(PROBES).map(async ([format, src]) => [format, await probe(src)])).then((results) => {
    results.forEach(([format, result]) => {
      if (result !== undefined) supported[format] = result;
    });

    Openseadragon.setImageFormatsSupported({ ...supported });

    return { ...supported };
  });

  return detection;
}

/**
 * Whether the browser is believed to support the given format extension
 * @param {String} format e.g. 'webp'
 */
export function isImageFormatSupported(format = '') {
  return supported[format.toLowerCase()] !== false;
}
