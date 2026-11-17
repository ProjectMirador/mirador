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
