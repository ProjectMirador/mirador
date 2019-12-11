/**
 * Polyfill file used to build Webpack UMD build. These polyfills are needed to
 * support both IE and Edge. If you are using Mirador ES imports these will not
 * get bundled up.
 */

import 'core-js/stable'; // eslint-disable-line import/no-extraneous-dependencies
import 'url-polyfill/url-polyfill'; // eslint-disable-line import/no-extraneous-dependencies
import 'unfetch/polyfill'; // eslint-disable-line import/no-extraneous-dependencies
