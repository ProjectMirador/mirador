import { difference, values } from 'lodash';
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

    /* re-use existing windows */
    const exIds = values(getState().windows).map((exWin) => {
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
    difference(getState().windows, exIds.concat(imIds))
      .map(winId => dispatch(closeWindow(winId)));
  };
}
