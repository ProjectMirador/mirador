import { buildMiradorState } from './build-state';

describe('buildMiradorState', () => {
  it('builds state with default window, manifest, and generated IDs', () => {
    const state = buildMiradorState({
      windows: [{}],
    });

    const [windowId] = state.workspace.windowIds;
    expect(windowId).toMatch(/^window-/);
    expect(state.manifests['default-manifest']).toEqual({
      id: 'default-manifest',
      isFetching: false,
      json: { id: 'default-manifest' },
    });
    expect(state.windows[windowId]).toEqual({
      companionWindowIds: [],
      id: windowId,
      manifestId: 'default-manifest',
      sideBarOpen: true,
    });
  });

  it('builds state with explicit IDs, companion windows, and search slice data', () => {
    const state = buildMiradorState({
      windows: [
        {
          companionWindows: [
            { content: 'info', id: 'cw-1' },
            { content: 'search', data: { query: 'xyz' }, id: 'cw-2' },
            { content: 'search', id: 'cw-3' },
          ],
          id: 'window-1',
          manifest: { '@id': 'manifest-v2' },
        },
      ],
    });

    expect(state.companionWindows).toEqual({
      'cw-1': { content: 'info', default: true, id: 'cw-1', position: 'left' },
      'cw-2': { content: 'search', default: false, id: 'cw-2', position: 'left' },
      'cw-3': { content: 'search', default: false, id: 'cw-3', position: 'left' },
    });
    expect(state.manifests['manifest-v2']).toEqual({
      id: 'manifest-v2',
      isFetching: false,
      json: { '@id': 'manifest-v2' },
    });
    expect(state.searches).toEqual({
      'window-1': {
        'cw-2': { data: {}, query: 'xyz', selectedContentSearchAnnotationIds: [] },
        'cw-3': { data: {}, selectedContentSearchAnnotationIds: [] },
      },
    });
  });

  it('supports manifest: null and explicit manifestId overrides', () => {
    const state = buildMiradorState({
      windows: [{ id: 'window-1', manifest: null, manifestId: 'unloaded-manifest' }],
    });

    expect(state.manifests).toEqual({});
    expect(state.windows['window-1'].manifestId).toBe('unloaded-manifest');
  });
});
