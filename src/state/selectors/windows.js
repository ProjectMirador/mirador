import { createSelector } from 'reselect';
import {
  getManifestTitle,
} from './manifests';
import { getConfig } from './config';
import { getWindows, getWindow } from './getters';
import { getWorkspaceType } from './workspace';
import { getSequenceViewingHint, getSequenceBehaviors } from './sequences';

/** */
export const getWindowConfig = createSelector(
  [getConfig, getWindow],
  ({ window: defaultConfig }, windowConfig) => ({ ...defaultConfig, ...windowConfig }),
);

/**
 * Return the manifest titles for all open windows
 * @param {object} state
 * @return {object}
 */
export function getWindowTitles(state) {
  const result = {};

  Object.keys(getWindows(state)).forEach((windowId) => {
    result[windowId] = getManifestTitle(state, { windowId });
  });

  return result;
}

/** */
export const getMaximizedWindowsIds = createSelector(
  [getWindows],
  windows => Object.values(windows)
    .filter(window => window.maximized === true)
    .map(window => window.id),
);

/** Return type of view in a certain window.
* @param {object} state
* @param {object} props
* @param {string} props.manifestId
* @param {string} props.windowId
* @param {String}
*/
export const getWindowViewType = createSelector(
  [
    getWindow,
    getWindowConfig,
    getSequenceViewingHint,
    getSequenceBehaviors,
  ],
  (window, { views = [], defaultView }, manifestViewingHint, manifestBehaviors) => {
    if (window && window.view) return window.view;

    const config = (views || []).find(view => (
      view.behaviors
      && view.behaviors.some(b => manifestViewingHint === b || manifestBehaviors.includes(b))
    ));

    return (config && config.key) || defaultView;
  },
);

/** */
export const getAllowedWindowViewTypes = createSelector(
  [
    getSequenceViewingHint,
    getSequenceBehaviors,
    getWindowConfig,
  ],
  (manifestViewingHint, manifestBehaviors, { views = [], defaultView }) => (
    (views || []).reduce((allowedViews, view) => {
      if (
        view.key === defaultView
        || !view.behaviors
        || view.behaviors.some(b => (
          manifestViewingHint === b || manifestBehaviors.includes(b)
        ))) allowedViews.push(view.key);
      return allowedViews;
    }, [])
  ),
);

/**
 * Returns the draggability of a window
 * @param {object} state
 * @param {object} props
 * @return {Boolean}
 */
export const getWindowDraggability = createSelector(
  [
    getWorkspaceType,
    getWindow,
    state => Object.keys(state.windows).length > 1,
  ],
  (workspaceType, window, manyWindows) => {
    if (workspaceType === 'elastic') return true;
    return manyWindows && window && window.maximized === false;
  },
);
