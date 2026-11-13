// eslint-disable-next-line import/no-unresolved
import { setupServer } from 'msw/node';
import { handlers } from './handlers';

export const server = setupServer(...handlers);
