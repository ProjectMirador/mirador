// Setup Jest to mock fetch

import { JSDOM } from 'jsdom'; // import jsdom for tests on code that is not fully-managed by react (openseadragon, for instance)
import fetch from 'jest-fetch-mock'; // eslint-disable-line import/no-extraneous-dependencies
import Enzyme from 'enzyme'; // eslint-disable-line import/no-extraneous-dependencies
import Adapter from 'enzyme-adapter-react-16'; // eslint-disable-line import/no-extraneous-dependencies

const jsdom = new JSDOM('<!doctype html><html><body></body></html>');
const { window } = jsdom;

function copyProps(src, target) {
  const props = Object.getOwnPropertyNames(src)
        .filter(prop => typeof target[prop] === 'undefined')
    .reduce((result, prop) => ({
      ...result,
      [prop]: Object.getOwnPropertyDescriptor(src, prop),
    }), {});
  Object.defineProperties(target, props);
}

jest.setMock('node-fetch', fetch);
global.fetch = require('jest-fetch-mock'); // eslint-disable-line import/no-extraneous-dependencies
global.window = window;
global.document = window.document;
global.navigator = {
  userAgent: 'node.js',
};
copyProps(window, global);


Enzyme.configure({ adapter: new Adapter() });
