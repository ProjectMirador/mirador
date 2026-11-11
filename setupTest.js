import '@testing-library/jest-dom';
import { vi, beforeAll, beforeEach, afterEach, afterAll } from 'vitest';
import { setupIntersectionMocking } from 'react-intersection-observer/test-utils';
import i18next from 'i18next';
import en from './src/locales/en/translation.json';
import { server } from './__tests__/mocks/server';

// vitest doesn't set a default
window.origin = 'http://localhost';

// happy-dom's synthetic document has no real parsed <!doctype html> (it's not
// loading real HTML source), so @hello-pangea/dnd's dev-only doctype check
// always warns here. See https://github.com/hello-pangea/dnd/blob/main/docs/guides/setup-problem-detection-and-error-recovery.md
window['__@hello-pangea/dnd-disable-dev-warnings'] = true;

vi.setConfig({ testTimeout: 10_000 });

let usesRealNetwork = false;

beforeAll(() => {
  server.listen({
    onUnhandledRequest(request, print) {
      // Allow real network requests in /integration tests
      if (usesRealNetwork) return;
      print.error();
    },
  });
});

beforeEach((context) => {
  usesRealNetwork = context.task.file.name.includes('/integration');
});

afterEach(async () => {
  server.resetHandlers();

  if (usesRealNetwork && window.happyDOM) {
    await window.happyDOM.abort();
  }
});

afterAll(async () => {
  server.close();

  if (!usesRealNetwork || !window.happyDOM) return;

  await Promise.race([
    window.happyDOM.waitUntilComplete(),
    new Promise((resolve) => setTimeout(resolve, 5_000)),
  ]);
});

/** */
class Path2D {
  constructor(path) {
    this.path = path;
  }

  arc() {}

  ellipse() {}

  rect() {}

  moveTo() {}

  lineTo() {}

  closePath() {}

  addPath() {}
}

global.Path2D = Path2D;

setupIntersectionMocking(vi.fn);

i18next.init({
  lng: 'en',
  resources: {
    en,
  },
  showSupportNotice: false,
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
