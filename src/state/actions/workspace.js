import _ from 'lodash';
import ActionTypes from './action-types';
import { importConfig } from './config';
import { closeWindow, addWindow, updateWindow } from './window';
import { updateViewport } from './canvas';
import { fetchManifest } from './manifest';

/**
 * setWorkspaceFullscreen - action creator
 *
 * @param  {Boolean} isFullscreenEnabled
 * @memberof ActionCreators
 */
export function setWorkspaceFullscreen(isFullscreenEnabled) {
  return { type: ActionTypes.SET_WORKSPACE_FULLSCREEN, isFullscreenEnabled };
}

/**
 * toggleZoomControls - action creator
 * @param {Boolean} showZoomControls
 * @memberof ActionCreators
*/
export function toggleZoomControls(showZoomControls) {
  return { type: ActionTypes.TOGGLE_ZOOM_CONTROLS, showZoomControls };
}

/**
 * updateWorkspaceMosaicLayout - action creator
 *
 * @param  {Object} layout
 * @memberof ActionCreators
 */
export function updateWorkspaceMosaicLayout(layout) {
  return { type: ActionTypes.UPDATE_WORKSPACE_MOSAIC_LAYOUT, layout };
}

/**
 * updateWorkspaceMosaicLayout - action creator
 *
 * @param  {Object} isWorkspaceAddVisible
 * @memberof ActionCreators
 */
export function setWorkspaceAddVisibility(isWorkspaceAddVisible) {
  return { type: ActionTypes.SET_WORKSPACE_ADD_VISIBILITY, isWorkspaceAddVisible };
}

/**
 * setWorkspaceViewportPosition - action creator
 *
 * @param  {Object} position
 * @memberof ActionCreators
 */
export function setWorkspaceViewportPosition(position) {
  return {
    type: ActionTypes.SET_WORKSPACE_VIEWPORT_POSITION,
    payload: {
      position: {
        x: position.x,
        y: position.y,
      },
    },
  };
}

/**
 * toggleWorkspaceExposeMode - action creator
 *
 * @param  {Object} position
 * @memberof ActionCreators
 */
export function toggleWorkspaceExposeMode() {
  return {
    type: ActionTypes.TOGGLE_WORKSPACE_EXPOSE_MODE,
  };
}

/**
 * importWorkspace - action creator
 */
export function importWorkspace(stateExport) {
  return (dispatch, getState) => {
    dispatch(importConfig(stateExport.config));
    const { viewers } = stateExport;
    const newWindows = stateExport.windows;
    const newWindowsKeys = _.keys(newWindows);
    const newWindowsCnt = newWindowsKeys.length;

    const existingWindows = getState().windows;
    const existingWindowsKeys = _.keys(existingWindows);
    const existingWindowsCnt = existingWindowsKeys.length;

    let currentKey = '';
    // re-use existing windows
    for (let i = 0; i < newWindowsCnt; i++) { // eslint-disable-line no-plusplus
      dispatch(fetchManifest(newWindows[newWindowsKeys[i]].manifestId));
      if (i < existingWindowsCnt) {
        currentKey = existingWindowsKeys[i];
        delete newWindows[newWindowsKeys[i]].id;
        dispatch(updateWindow(existingWindowsKeys[i], newWindows[newWindowsKeys[i]]));
      } else {
        dispatch(addWindow(newWindows[newWindowsKeys[i]]));
        currentKey = newWindowsKeys[i];
      }
      dispatch(updateViewport(currentKey, viewers[newWindowsKeys[i]]));
    }

    // clean up surplus windows if there are any
    if (existingWindowsCnt > newWindowsCnt) {
      Object.keys(existingWindows).slice(newWindowsCnt).map(windowId => dispatch(closeWindow(windowId))); // eslint-disable-line max-len
    }
  };
}
