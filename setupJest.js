// Setup Jest to mock fetch

import { JSDOM } from 'jsdom'; // eslint-disable-line import/no-extraneous-dependencies
import fetch from 'jest-fetch-mock'; // eslint-disable-line import/no-extraneous-dependencies
import Enzyme from 'enzyme'; // eslint-disable-line import/no-extraneous-dependencies
import Adapter from 'enzyme-adapter-react-16'; // eslint-disable-line import/no-extraneous-dependencies

const jsdom = new JSDOM('<!doctype html><html><body><div id="main"></div></body></html>', { url: 'https://localhost' });
const { window } = jsdom;

jest.setTimeout(10000);

window.HTMLCanvasElement.prototype.getContext = () => {};
jest.setMock('isomorphic-unfetch', fetch);
require('jest-fetch-mock').enableMocks(); // eslint-disable-line import/no-extraneous-dependencies

global.window = window;
global.navigator = {
  userAgent: 'node.js',
};

/* eslint-disable  require-jsdoc, class-methods-use-this */
class IntersectionObserverPolyfill {
  observe() {
  }

  disconnect() {
  }
}
/* eslint-enable  require-jsdoc, class-methods-use-this */

global.IntersectionObserver = IntersectionObserverPolyfill;

/** */
function Path2D() {
}

global.Path2D = Path2D;
/**
 * copy object property descriptors from `src` to `target`
 * @param {*} src
 * @param {*} target
 */
const copyProps = (src, target) => {
  Object.defineProperties(target, {
    ...Object.getOwnPropertyDescriptors(src),
    ...Object.getOwnPropertyDescriptors(target),
  });
};

/*
  avoid 'ReferenceError: HTMLElement is not defined'
  see https://github.com/airbnb/enzyme/blob/master/docs/guides/jsdom.md
  for further information
*/
copyProps(window, global);

Enzyme.configure({ adapter: new Adapter() });

jest.mock('react-i18next', () => ({
  // this mock makes sure any components using the translate HoC receive the t function as a prop
  withTranslation: () => (Component) => {
    Component.defaultProps = { // eslint-disable-line no-param-reassign
      ...Component.defaultProps, t: k => k,
    };
    return Component;
  },
}));
