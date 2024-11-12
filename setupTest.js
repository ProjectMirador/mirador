import '@testing-library/jest-dom'

import createFetchMock from 'vitest-fetch-mock';
import { vi } from 'vitest';
import { setupIntersectionMocking } from 'react-intersection-observer/test-utils';
import i18next from 'i18next';
import en from './src/locales/en/translation.json';

// vitest doesn't set a default
window.origin = 'http://localhost';

vi.setConfig({ testTimeout: 10_000 });

const fetchMocker = createFetchMock(vi);

// sets globalThis.fetch and globalThis.fetchMock to our mocked version
fetchMocker.enableMocks();

class Path2D {

};

global.Path2D = Path2D;

setupIntersectionMocking(vi.fn);

i18next.init({
  lng: 'en',
  resources: {
    en,
  },
});
