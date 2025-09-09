import { PRIMARY_MANIFEST_FIXTURE_URL, PRIMARY_CANVAS_FIXTURE_URL } from './constants';

export default {
  id: 'mirador',
  theme: {
    transitions: {},
  },
  window: {
    allowWindowSideBar: false,
    sideBarOpen: true,
    sideBarPanel: '',
  },
  windows: [{
    allowClose: false,
    canvasId: PRIMARY_CANVAS_FIXTURE_URL,
    manifestId: PRIMARY_MANIFEST_FIXTURE_URL,
    thumbnailNavigationPosition: 'far-bottom',
  }],
  workspace: {
    type: 'not-mosaic-or-elastic',
  },
  workspaceControlPanel: {
    enabled: false,
  },
};
