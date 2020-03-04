import { setIn } from 'immutable';
import manifestJson from '../../fixtures/version-2/structures.json';
import {
  getVisibleNodeIds,
  getManuallyExpandedNodeIds,
  getExpandedNodeIds,
  getNodeIdToScrollTo,
} from '../../../src/state/selectors';

const state = {
  companionWindows: {
    cw123: {},
    cw456: {},
  },
  manifests: {
    mID: {
      id: 'mID',
      json: manifestJson,
    },
  },
  windows: {
    w1: {
      canvasId: 'http://foo.test/1/canvas/c6',
      companionWindowIds: ['cw123', 'cw456'],
      id: 'w1',
      manifestId: 'mID',
      view: 'book',
    },
  },
};

const expandedNodesState = setIn(state, ['companionWindows', 'cw123', 'tocNodes'], {
  '0-0': {
    expanded: false,
  },
  '0-1': {
    expanded: true,
  },
  '0-1-1': {
    expanded: true,
  },
  '0-1-2': {
    expanded: false,
  },
});

describe('getVisibleNodeIds', () => {
  it('contains node ids for all ranges which contain currently visible canvases, and for their parents', () => {
    const visibleNodeIds = getVisibleNodeIds(state, { windowId: 'w1' });
    expect(visibleNodeIds).toEqual(expect.arrayContaining([
      '0-1',
      '0-1-1',
      '0-1-1-0',
      '0-1-1-1',
    ]));
    expect(visibleNodeIds.length).toBe(4);
  });
});

describe('getManuallyExpandedNodeIds', () => {
  it('returns empty array if there are no manually opened or closed nodes', () => {
    expect(getManuallyExpandedNodeIds(state, { companionWindowId: 'cw123', windowId: 'w1' }, true)).toEqual([]);
    expect(getManuallyExpandedNodeIds(state, { companionWindowId: 'cw123', windowId: 'w1' }, false)).toEqual([]);
  });

  it('returns manually opened and closed node ids correctly', () => {
    expect(getManuallyExpandedNodeIds(expandedNodesState, { companionWindowId: 'cw123' }, true)).toEqual(['0-1', '0-1-1']);
    expect(getManuallyExpandedNodeIds(expandedNodesState, { companionWindowId: 'cw123' }, false)).toEqual(['0-0', '0-1-2']);
  });
});

describe('getExpandedNodeIds', () => {
  it('returns manually expanded node ids and visible, non collapsed branch node ids', () => {
    const canvas8BookViewState = setIn(expandedNodesState, ['windows', 'w1', 'canvasId'], 'http://foo.test/1/canvas/c8');
    const canvas8BookViewVisibleNodeIds = getExpandedNodeIds(canvas8BookViewState, { companionWindowId: 'cw123', windowId: 'w1' });
    expect(canvas8BookViewVisibleNodeIds).toEqual(expect.arrayContaining([
      '0-1',
      '0-1-1',
      '0-2',
      '0-2-1',
      '0-2-2',
    ]));
    expect(canvas8BookViewVisibleNodeIds.length).toBe(5);

    const canvas8SingleViewState = setIn(canvas8BookViewState, ['windows', 'w1', 'view'], 'single');
    const canvas8SingleViewVisibleNodeIds = getExpandedNodeIds(canvas8SingleViewState, { companionWindowId: 'cw123', windowId: 'w1' });
    expect(canvas8SingleViewVisibleNodeIds).toEqual(expect.arrayContaining([
      '0-1',
      '0-1-1',
    ]));
    expect(canvas8SingleViewVisibleNodeIds.length).toBe(2);
  });

  it('returns a combination of manually opened and current canvas containing node ids', () => {
    const canvas9State = setIn(expandedNodesState, ['windows', 'w1', 'canvasId'], 'http://foo.test/1/canvas/c9');
    const expandedNodeIds = getExpandedNodeIds(canvas9State, { companionWindowId: 'cw123', windowId: 'w1' });
    expect(expandedNodeIds).toEqual(expect.arrayContaining([
      '0-1',
      '0-1-1',
      '0-2',
      '0-2-1',
      '0-2-2',
    ]));
    expect(expandedNodeIds.length).toBe(5);
  });
});

describe('getNodeIdToScrollTo', () => {
  it('returns first leaf node with visible canvas', () => {
    expect(getNodeIdToScrollTo(state, { companionWindowId: 'cw123', windowId: 'w1' })).toBe('0-1-1-0');
  });

  it('returns branch node with visible canvas if it is the deepest in the tree to contain a canvas', () => {
    const canvas10State = setIn(expandedNodesState, ['windows', 'w1', 'canvasId'], 'http://foo.test/1/canvas/c10');
    expect(getNodeIdToScrollTo(canvas10State, { companionWindowId: 'cw123', windowId: 'w1' })).toBe('0-2-1');
  });

  it('returns the deepest non hidden branch node if leaf node or its parent node are collapsed', () => {
    const closedParentState1 = setIn(state, ['companionWindows', 'cw123', 'tocNodes'], { '0-1-1': { expanded: false } });
    expect(getNodeIdToScrollTo(closedParentState1, { companionWindowId: 'cw123', windowId: 'w1' })).toBe('0-1-1');
    const closedParentState2 = setIn(state, ['companionWindows', 'cw123', 'tocNodes'], {
      '0-1': { expanded: false },
      '0-1-1': { expanded: false },
    });
    expect(getNodeIdToScrollTo(closedParentState2, { companionWindowId: 'cw123', windowId: 'w1' })).toBe('0-1');
  });

  it('returns no node id if current canvas is not contained in any range', () => {
    const rangeFreeCanvasState = setIn(expandedNodesState, ['windows', 'w1', 'canvasId'], 'http://foo.test/1/canvas/c12');
    expect(getNodeIdToScrollTo(rangeFreeCanvasState, { companionWindowId: 'cw123', windowId: 'w1' })).toBe(null);
  });
});
