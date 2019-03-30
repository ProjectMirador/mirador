import {
  getFullScreenEnabled,
} from '../../../src/state/selectors';

describe('getFullScreenEnabled', () => {
  it('returns the workspace configuration for full screen', () => {
    const state = { workspace: { isFullscreenEnabled: true } };
    expect(getFullScreenEnabled(state)).toEqual(true);
  });
});
