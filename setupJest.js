/* eslint-disable import/no-extraneous-dependencies */
import fetchMock from 'jest-fetch-mock';
import sizeMe from 'react-sizeme';
import i18next from 'i18next';
import { setupIntersectionMocking } from 'react-intersection-observer/test-utils';
import en from './src/locales/en/translation.json';

jest.setTimeout(10000);

sizeMe.noPlaceholders = true;

const { TextEncoder } = require('util');

global.TextEncoder = TextEncoder;

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
