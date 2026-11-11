import { http, HttpResponse } from 'msw';
import { contentSearchMock } from './contentSearchMock';
import manifestFixtureFg165hz3589 from '../fixtures/version-2/fg165hz3589.json';

const searchUrl = manifestFixtureFg165hz3589.service.at(0)['@id'];

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

  // Default content search handler
  http.get(searchUrl, () => {
    return HttpResponse.json(contentSearchMock, {
      status: 200,
      headers: { 'Access-Control-Allow-Origin': '*' },
    });
  }),
];
