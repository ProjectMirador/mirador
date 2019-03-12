import {
  difference,
  keys,
  slice,
  values,
} from 'lodash';
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
    const { viewers } = stateExport || {};
    const imWins = values(stateExport.windows);
    const exWins = values(getState().windows);
    const exWinCnt = exWins.length > imWins.length ? imWins.length : exWins.length;

    /*
      If the existing workspace already contains windows (exWins),
      we can re-use them in order to optimize the performance.
      As we only can only re-use the amount of windows to be imported maximally,
      slice all additional windows before
    */
    const exIds = slice(exWins, 0, exWinCnt).map((exWin) => {
      const imWin = imWins.shift();
      const viewer = viewers[imWin.id];
      delete imWin.id;

      dispatch(fetchManifest(imWin.manifestId));
      dispatch(updateWindow(exWin.id, imWin));
      dispatch(updateViewport(exWin.id, viewer));

      return exWin.id;
    });

    /* create new windows for additionally imported ones */
    const imIds = imWins.map((imWin) => {
      dispatch(fetchManifest(imWin.manifestId));
      dispatch(addWindow(imWin));
      dispatch(updateViewport(imWin.id, viewers[imWin.id]));

      return imWin.id;
    });

    /* close surplus windows */
    difference(keys(getState().windows), exIds.concat(imIds))
      .map(winId => dispatch(closeWindow(winId)));
  };
}
