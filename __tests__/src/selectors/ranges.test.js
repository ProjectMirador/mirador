import { setIn } from 'immutable';
import noRangesJson from '../../fixtures/version-2/001.json';
import manifestJson from '../../fixtures/version-2/structures.json';
import presentation3Json from '../../fixtures/version-3/structures.json';
import {
  getVisibleNodeIds,
  getManuallyExpandedNodeIds,
  getExpandedNodeIds,
  getNodeIdToScrollTo,
  getDefaultSidebarVariant,
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
  const prezi3BookState = setIn(state, ['manifests', 'mID', 'json'], presentation3Json);
  const prezi3State = setIn(prezi3BookState, ['windows', 'w1', 'view'], 'single');

  it('contains node ids for all ranges which contain currently visible canvases, and for their parents', () => {
    const visibleNodeIds = getVisibleNodeIds(state, { windowId: 'w1' });
    expect(visibleNodeIds).toEqual(expect.arrayContaining([
      '0-1',
      '0-1-1',
      '0-1-1-0',
      '0-1-1-1',
    ]));
    expect(visibleNodeIds.length).toBe(4);

    const prezi3StateForCanvas2 = setIn(prezi3State, ['windows', 'w1', 'canvasId'], 'http://foo.test/1/canvas/c2');
    const prezi3visibleNodeIds = getVisibleNodeIds(prezi3StateForCanvas2, { windowId: 'w1' });
    expect(prezi3visibleNodeIds).toEqual(expect.arrayContaining([
      '0-0',
      '0-0-0',
    ]));
    expect(prezi3visibleNodeIds.length).toBe(2);
  });

  it('contains node ids for ranges with currently visible canvas fragments', () => {
    const prezi2XYWHFragmentBookState = setIn(state, ['windows', 'w1', 'canvasId'], 'http://foo.test/1/canvas/c3');
    const prezi2XYWHFragmentState = setIn(prezi2XYWHFragmentBookState, ['windows', 'w1', 'view'], 'single');
    const visibleNodeIdsForPrezi2 = getVisibleNodeIds(prezi2XYWHFragmentState, { windowId: 'w1' });
    expect(visibleNodeIdsForPrezi2).toEqual(expect.arrayContaining([
      '0-0',
      '0-0-1',
    ]));
    expect(visibleNodeIdsForPrezi2.length).toBe(2);


    const prezi3XYWHFragmentState = setIn(prezi3State, ['windows', 'w1', 'canvasId'], 'http://foo.test/1/canvas/c3');
    const visibleNodeIdsForXYWHFragment = getVisibleNodeIds(prezi3XYWHFragmentState, { windowId: 'w1' });
    expect(visibleNodeIdsForXYWHFragment).toEqual(expect.arrayContaining([
      '0-0',
      '0-0-0',
    ]));
    expect(visibleNodeIdsForXYWHFragment.length).toBe(2);

    const prezi3TemporalFragmentState = setIn(prezi3State, ['windows', 'w1', 'canvasId'], 'http://foo.test/1/canvas/c4');
    const visibleNodeIdsForTemporalFragment = getVisibleNodeIds(prezi3TemporalFragmentState, { windowId: 'w1' });
    expect(visibleNodeIdsForTemporalFragment).toEqual(expect.arrayContaining([
      '0-0',
      '0-0-0',
    ]));
    expect(visibleNodeIdsForTemporalFragment.length).toBe(2);
  });

  // This test fails as there is no support for SpecificResource in manifesto yet
  it.skip('contains node ids for ranges that contain a SpecificResource based on a current canvas', () => {
    const specificResourceState = setIn(prezi3State, ['windows', 'w1', 'canvasId'], 'http://foo.test/1/canvas/c5');
    const visibleNodeIds = getVisibleNodeIds(specificResourceState, { windowId: 'w1' });
    expect(visibleNodeIds).toEqual(expect.arrayContaining([
      '0-0',
      '0-0-0',
    ]));
    expect(visibleNodeIds.length).toBe(2);
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

  it('does not contain ids of nodes whos descendants do not contain currently visible canvases', () => {
    const canvas13State = setIn(state, ['windows', 'w1', 'canvasId'], 'http://foo.test/1/canvas/c13');
    const expandedNodeIds = getExpandedNodeIds(canvas13State, { companionWindowId: 'cw123', windowId: 'w1' });
    expect(expandedNodeIds.length).toBe(0);
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
    const singleViewState = setIn(expandedNodesState, ['windows', 'w1', 'view'], 'single');
    const rangeFreeCanvasState = setIn(singleViewState, ['windows', 'w1', 'canvasId'], 'http://foo.test/1/canvas/c12');
    expect(getNodeIdToScrollTo(rangeFreeCanvasState, { companionWindowId: 'cw123', windowId: 'w1' })).toBe(null);
  });
});

describe('getDefaultSidebarVariant', () => {
  it('returns thumbnail when no ranges exist', () => {
    const noRangeState = setIn(state, ['manifests', 'mID', 'json'], noRangesJson);
    expect(getDefaultSidebarVariant(noRangeState, { windowId: 'w1' })).toBe('thumbnail');
  });
  it('returns tableOfContents when ranges exist', () => {
    expect(getDefaultSidebarVariant(state, { windowId: 'w1' })).toBe('tableOfContents');
  });
});
