import deepmerge from 'deepmerge';

const defaultManifest = {
  id: 'default-manifest',
};

function buildCompanionWindowState({ content = 'info', id = undefined, index = 0, ...extraCompanionWindowState }) {
  return {
    content,
    id: id || `cw-${index + 1}`,
    position: 'left',
    ...extraCompanionWindowState,
  };
}

function buildWindowState({
  id = undefined,
  index = 0,
  companionWindows = [],
  manifestId = undefined,
  manifest = defaultManifest,
  ...extraWindowState
}) {
  const calculatedManifestId = manifestId || (manifest ? manifest.id || manifest['@id'] : undefined);
  const windowId = id || `window-${index + 1}`;
  const builtCompanionWindows = companionWindows.map((cw, cwIndex) =>
    buildCompanionWindowState({ ...cw, default: cwIndex === 0, index: cwIndex }),
  );

  return {
    manifests: manifest ? { [calculatedManifestId]: { id: calculatedManifestId, isFetching: false, json: manifest } } : {},
    companionWindows: Object.fromEntries(builtCompanionWindows.map((cw) => [cw.id, cw])),
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
  };
}

export function buildMiradorState({ windows = [], ...extraState } = {}) {
  const initialState = {
    companionWindows: {},
    manifests: {},
    windows: {},
    workspace: {},
    ...extraState,
  };

  return windows.reduce((acc, w, index) => {
    const windowState = buildWindowState({ ...w, index });
    return deepmerge(acc, windowState);
  }, initialState);
}
