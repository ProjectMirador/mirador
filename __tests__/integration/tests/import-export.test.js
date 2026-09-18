import { expect, it } from 'vitest';
import { setupIntegrationTestViewer } from '@tests/utils/test-utils';
import config from '../mirador-configs/index';

describe('Import/Export state', () => {
  setupIntegrationTestViewer(config);

  it('persists a viewer state after importing', async (context) => {
    const state = context.miradorInstance.store.getState();
    const [windowId] = Object.keys(state.windows);
    const viewerState = { x: 1000, y: 1000, zoom: 0.001 };
    const importedState = { ...state, viewers: { ...state.viewers, [windowId]: viewerState } };

    context.miradorInstance.store.dispatch({ state: importedState, type: 'mirador/IMPORT_MIRADOR_STATE' });
    expect(context.miradorInstance.store.getState().viewers[windowId]).toEqual(viewerState);
  });

  // TODO: test the bugfix for the OSD viewer somehow?
});
