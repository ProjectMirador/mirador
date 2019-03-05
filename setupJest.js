// Setup Jest to mock fetch

import { JSDOM } from 'jsdom'; // eslint-disable-line import/no-extraneous-dependencies
import fetch from 'jest-fetch-mock'; // eslint-disable-line import/no-extraneous-dependencies
import Enzyme from 'enzyme'; // eslint-disable-line import/no-extraneous-dependencies
import Adapter from 'enzyme-adapter-react-16'; // eslint-disable-line import/no-extraneous-dependencies

const jsdom = new JSDOM('<!doctype html><html><body><div id="main"></div></body></html>');
const { window } = jsdom;

window.HTMLCanvasElement.prototype.getContext = () => {};
jest.setMock('node-fetch', fetch);
global.fetch = require('jest-fetch-mock'); // eslint-disable-line import/no-extraneous-dependencies

global.window = window;
global.document = window.document;
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
global.Image = window.Image;

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
