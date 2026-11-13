import { http, HttpResponse } from 'msw';
import manifestFixtureFg165hz3589 from '../fixtures/version-2/fg165hz3589.json';

export const handlers = [
  // Global CORS preflight handler for happy-dom across all tests
  http.options('*', () => {
    return new HttpResponse(null, {
      status: 204,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
        'Access-Control-Allow-Headers': '*',
      },
    });
  }),

  // Intercept request used in multiple integration tests
  // Return manifest fixture that we have in the fixtures directory
  http.get('https://purl.stanford.edu/hg676jb4964/iiif/manifest', () => HttpResponse.json(manifestFixtureFg165hz3589)),
];
