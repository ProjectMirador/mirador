// eslint-disable-next-line import/no-unresolved
import { setupServer } from 'msw/node';
import { beforeAll, afterEach, afterAll } from 'vitest';
import { handlers } from './handlers';

// TODO: remove after migration off vitest-fetch-mock
globalThis.__USE_MSW__ = true;
delete globalThis.fetchMock;

export const server = setupServer(...handlers);

// TODO: remove after migration off vitest-fetch-mock
export function useMsw() {
  beforeAll(() => {
    server.listen({ onUnhandledRequest: 'error' });
  });

  afterEach(() => {
    server.resetHandlers();
  });

  afterAll(() => {
    server.close();
  });
}
