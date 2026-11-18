import deepmerge from 'deepmerge';
import { v4 as uuid } from 'uuid';

const defaultManifest = {
  id: 'default-manifest',
};

function buildCompanionWindowState({ content = 'info', id = undefined, index = undefined, ...extraCompanionWindowState }) {
  return {
    content,
    id: id || `cw-${uuid()}`,
    position: 'left',
    ...extraCompanionWindowState,
  };
}

function buildWindowState({
  id = undefined,
  companionWindows = [],
  manifestId = undefined,
  manifest = defaultManifest,
  ...extraWindowState
}) {
  const calculatedManifestId = manifestId || (manifest ? manifest.id || manifest['@id'] : undefined);
  const windowId = id || `window-${uuid()}`;
  const builtCompanionWindows = companionWindows.map((cw, index) =>
    buildCompanionWindowState({ ...cw, default: index === 0 ? true : false }),
  );

  const companionWindowData = {};

  builtCompanionWindows.forEach(({ id: cwId, data = {}, content }) => {
    if (content === 'search') {
      companionWindowData.searches = companionWindowData.searches || {};
      companionWindowData.searches[windowId] = companionWindowData.searches[windowId] || {};
      companionWindowData.searches[windowId][cwId] = {
        data: {},
        selectedContentSearchAnnotationIds: [],
        ...data,
      };
    }
  });

  return {
    manifests: manifest ? { [calculatedManifestId]: { id: calculatedManifestId, isFetching: false, json: manifest } } : {},
    companionWindows: Object.fromEntries(
      builtCompanionWindows.map(({ id: cwId, data: _, ...cw }) => [cwId, { ...cw, id: cwId }]),
    ),
    windows: {
      [windowId]: {
        id: windowId,
        manifestId: calculatedManifestId,
        sideBarOpen: true,
        companionWindowIds: builtCompanionWindows.map((cw) => cw.id),
        ...extraWindowState,
      },
    },
    workspace: {
      windowIds: [windowId],
    },
    ...companionWindowData,
  };
}

export function buildMiradorState({ windows = undefined, ...extraState }) {
  const initialState = {
    companionWindows: [],
    manifests: {},
    windows: {},
    workspace: {},
    ...extraState,
  };

  return windows.reduce((acc, w) => {
    const windowState = buildWindowState(w);
    return deepmerge(acc, windowState);
  }, initialState);
}
