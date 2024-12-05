/* eslint-disable import/no-extraneous-dependencies */
import fetchMock from 'jest-fetch-mock';
import i18next from 'i18next';
import { setupIntersectionMocking } from 'react-intersection-observer/test-utils';
import en from './src/locales/en/translation.json';

jest.setTimeout(10000);

const { TextEncoder } = require('util');

global.TextEncoder = TextEncoder;

// Mock the browser's native ResizeObserver
global.ResizeObserver = jest.fn().mockImplementation(() => ({
  disconnect: jest.fn(),
  observe: jest.fn(),
  unobserve: jest.fn(),
}));

// Setup Jest to mock fetch
fetchMock.enableMocks();

if (typeof Element !== 'undefined') Element.prototype.scrollTo = () => {};

setupIntersectionMocking(jest.fn);

/** */
function Path2D() {
}

global.Path2D = Path2D;

i18next.init({
  lng: 'en',
  resources: {
    en,
  },
});
