import { buildMiradorState } from './build-state';

describe('buildMiradorState', () => {
  it('should build state with a single window', () => {
    const state = buildMiradorState({
      windows: [{
        id: 'window-1',
        companionWindows: [
          { id: 'cw-1', content: 'info' },
          { content: 'search', data: { query: 'xyz' } }
        ],
        manifest: { id: 'manifest-1' }
      }],
    });
    expect(state).toEqual({
      companionWindows: { 'cw-1': { id: 'cw-1', default: true, position: 'left', content: 'info' } },
      manifests: { 'manifest-1': { id: 'manifest-1', isFetching: false, json: { id: 'manifest-1' } } },
      windows: {
        'window-1': { id: 'window-1', manifestId: 'manifest-1', companionWindowIds: expect.any(Array), sideBarOpen: true },
      },
      workspace: {
        windowIds: ['window-1'],
      },
    });
  });
});
