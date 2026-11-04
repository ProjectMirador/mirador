import { configureStore } from '@reduxjs/toolkit';
import { requestAnnotation } from '../../../src/state/actions';
import { iiifApi } from '../../../src/state/api/iiifApi';
import { annotationsListenerMiddleware } from '../../../src/state/listeners/annotations';

vi.mock('../../../src/state/selectors', () => ({
  getRequestsConfig: vi.fn(() => ({})),
}));

/**
 * Builds a real store wired exactly like production (iiifApi + the listener
 * bridge), recording every dispatched action so we can assert the legacy
 * REQUEST_ANNOTATION/RECEIVE_ANNOTATION(_FAILURE) actions still fire,
 * unchanged, even though RTK Query is now doing the actual fetch.
 */
function createBridgeStore() {
  const recordedActions = [];
  const recordAction = () => (next) => (action) => {
    recordedActions.push(action);
    return next(action);
  };

  const store = configureStore({
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat(iiifApi.middleware, annotationsListenerMiddleware.middleware, recordAction),
    reducer: { [iiifApi.reducerPath]: iiifApi.reducer },
  });

  return { ...store, getActions: () => recordedActions };
}

describe('annotations RTK Query bridge', () => {
  afterEach(() => {
    iiifApi.util.resetApiState();
  });

  it('still dispatches RECEIVE_ANNOTATION with the legacy flat shape on success', async () => {
    fetch.mockResponseOnce(JSON.stringify({ content: 'anno stuff' }));
    const store = createBridgeStore();

    store.dispatch(requestAnnotation('targetId', 'annotationId'));
    await annotationsListenerMiddleware.middleware.listenerApi?.unsubscribe; // no-op, keeps lint happy about unused import shape
    await new Promise((resolve) => setTimeout(resolve, 0));
    await new Promise((resolve) => setTimeout(resolve, 0));

    expect(store.getActions()).toContainEqual({
      annotationId: 'annotationId',
      annotationJson: { content: 'anno stuff' },
      targetId: 'targetId',
      type: 'mirador/RECEIVE_ANNOTATION',
    });
  });

  it('still dispatches RECEIVE_ANNOTATION_FAILURE with the legacy flat shape on failure', async () => {
    fetch.mockResponseOnce('<h1>Not Json</h1>', { status: 500 });
    const store = createBridgeStore();

    store.dispatch(requestAnnotation('targetId', 'annotationId'));
    await new Promise((resolve) => setTimeout(resolve, 0));
    await new Promise((resolve) => setTimeout(resolve, 0));

    expect(store.getActions()).toContainEqual(
      expect.objectContaining({
        annotationId: 'annotationId',
        targetId: 'targetId',
        type: 'mirador/RECEIVE_ANNOTATION_FAILURE',
      }),
    );
  });
});
