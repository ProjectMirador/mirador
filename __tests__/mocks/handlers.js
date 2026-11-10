import { http, HttpResponse } from 'msw';
import { contentSearchMock } from './contentSearchMock.js';

export const handlers = [
  http.get('https://stanford.edu/content-search', () => {
    return HttpResponse.json(contentSearchMock, { status: 200 });
  }),
];