// Setup Jest to mock fetch

import { JSDOM } from 'jsdom'; // eslint-disable-line import/no-extraneous-dependencies
import raf from 'raf'; // eslint-disable-line import/no-extraneous-dependencies
import fetchMock from 'jest-fetch-mock'; // eslint-disable-line import/no-extraneous-dependencies
import Enzyme from 'enzyme'; // eslint-disable-line import/no-extraneous-dependencies
import Adapter from 'enzyme-adapter-react-16'; // eslint-disable-line import/no-extraneous-dependencies

const jsdom = new JSDOM('<!doctype html><html><body><div id="main"></div></body></html>', { url: 'https://localhost' });
const { window } = jsdom;

jest.setTimeout(10000);

window.HTMLCanvasElement.prototype.getContext = () => {};
fetchMock.enableMocks();

global.window = window;
global.navigator = {
  userAgent: 'node.js',
};

/* eslint-disable  require-jsdoc, class-methods-use-this */
class IntersectionObserverPolyfill {
  constructor(callback, options) {
    this.callback = callback;
    this.elements = [];
    IntersectionObserverPolyfill.register(this);
  }

  observe(el) {
    this.elements.push(el);
  }

  unobserve() {
  }

  disconnect() {
  }

  static register(obj) {
    this.observers = this.observers || [];
    this.observers.push(obj);
  }

  static triggerAll(attr = { intersectionRatio: 1, isIntersecting: true }) {
    this.observers.forEach((obs) => {
      obs.callback(obs.elements.map(el => ({ ...attr, target: el })));
    });
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

// jsdom does not support requestAnimationFrame
raf.polyfill(global.window);

/*
  avoid 'ReferenceError: HTMLElement is not defined'
  see https://github.com/airbnb/enzyme/blob/master/docs/guides/jsdom.md
  for further information
*/
copyProps(window, global);

Enzyme.configure({ adapter: new Adapter() });

jest.mock('react-i18next', () => ({
  I18nextProvider: ({ children }) => children,
  initReactI18next: {
    init: jest.fn(),
    type: '3rdParty',
  },
  // this mock makes sure any components using the translate HoC receive the t function as a prop
  withTranslation: () => (Component) => {
    Component.defaultProps = { // eslint-disable-line no-param-reassign
      ...Component.defaultProps, t: k => k,
    };
    return Component;
  },
}));
