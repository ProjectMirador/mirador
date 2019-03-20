import {
  difference,
  keys,
  slice,
  values,
} from 'lodash';
import ActionTypes from './action-types';
import { importConfig } from './config';
import { addWindow, removeWindow, updateWindow } from './window';
import { updateViewport } from './canvas';
import { fetchManifest } from './manifest';

/**
 * setWorkspaceFullscreen - action creator
 *
 * @param  {Boolean} isFullscreenEnabled
 * @memberof ActionCreators
 */
export function setWorkspaceFullscreen(isFullscreenEnabled) {
  return { isFullscreenEnabled, type: ActionTypes.SET_WORKSPACE_FULLSCREEN };
}

/**
 * toggleZoomControls - action creator
 * @param {Boolean} showZoomControls
 * @memberof ActionCreators
*/
export function toggleZoomControls(showZoomControls) {
  return { showZoomControls, type: ActionTypes.TOGGLE_ZOOM_CONTROLS };
}

/**
 * updateWorkspaceMosaicLayout - action creator
 *
 * @param  {Object} layout
 * @memberof ActionCreators
 */
export function updateWorkspaceMosaicLayout(layout) {
  return { layout, type: ActionTypes.UPDATE_WORKSPACE_MOSAIC_LAYOUT };
}

/**
 * updateWorkspaceMosaicLayout - action creator
 *
 * @param  {Object} isWorkspaceAddVisible
 * @memberof ActionCreators
 */
export function setWorkspaceAddVisibility(isWorkspaceAddVisible) {
  return { isWorkspaceAddVisible, type: ActionTypes.SET_WORKSPACE_ADD_VISIBILITY };
}

/**
 * setWorkspaceViewportPosition - action creator
 *
 * @param  {Object} position
 * @memberof ActionCreators
 */
export function setWorkspaceViewportPosition({ x, y }) {
  return {
    payload: {
      position: {
        x,
        y,
      },
    },
    type: ActionTypes.SET_WORKSPACE_VIEWPORT_POSITION,
  };
}

/**
 * setWorkspaceViewportDimensions - action creator
 *
 * @param  {Object} position
 * @memberof ActionCreators
 */
export function setWorkspaceViewportDimensions({ width, height }) {
  return {
    payload: {
      position: {
        height,
        width,
      },
    },
    type: ActionTypes.SET_WORKSPACE_VIEWPORT_POSITION,
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
      .map(winId => dispatch(removeWindow(winId)));
  };
}
