import '@testing-library/jest-dom';
import { vi } from 'vitest';
import { setupIntersectionMocking } from 'react-intersection-observer/test-utils';
import i18next from 'i18next';
import createFetchMock from 'vitest-fetch-mock';
import en from './src/locales/en/translation.json';

// vitest doesn't set a default
window.origin = 'http://localhost';

vi.setConfig({ testTimeout: 10_000 });
const fetchMocker = createFetchMock(vi);

// changes default behavior of fetchMock to use the real 'fetch' implementation and not mock responses
beforeEach((context) => {
  if (context.task.file.name.includes('/integration')) {
    fetchMocker.disableMocks();
  } else {
    // sets globalThis.fetch and globalThis.fetchMock to our mocked version
    fetchMocker.enableMocks();
  }
});

/** */
class Path2D {

}

global.Path2D = Path2D;

setupIntersectionMocking(vi.fn);

i18next.init({
  lng: 'en',
  resources: {
    en,
  },
});

// --- Fullscreen mocking ---
const originalCreateElement = document.createElement;

/**
 * Mock requestFullscreen globally for divs (used by FullScreenButton)
 * This simulates an environment where requestFullscreen is supported
 * This is the case for most browsers except iPhone Safari
 */
function mockRequestFullscreen() {
  document.createElement = function createElementMock(tagName) {
    const element = originalCreateElement.call(document, tagName);
    if (tagName === 'div' && typeof element.requestFullscreen !== 'function') {
      element.requestFullscreen = vi.fn(); // Simulate support
    }
    return element;
  };
}

// Restore original createElement method
/**
 *
 */
function disableMockRequestFullscreen() {
  document.createElement = originalCreateElement;
}

// Mock fullscreen support by default
mockRequestFullscreen();

// Expose globally for tests to call when needed
global.__mockRequestFullscreen = mockRequestFullscreen;
global.__disableMockRequestFullscreen = disableMockRequestFullscreen;
