import {
  getFullScreenEnabled,
  getWorkspaceType,
} from '../../../src/state/selectors';

describe('getFullScreenEnabled', () => {
  it('returns the workspace configuration for full screen', () => {
    const state = { workspace: { isFullscreenEnabled: true } };
    expect(getFullScreenEnabled(state)).toEqual(true);
  });
});

describe('getWorkspaceType', () => {
  it('returns the workspace type', () => {
    const state = { workspace: { type: 'elastic' } };
    expect(getWorkspaceType(state)).toEqual('elastic');
  });
});
