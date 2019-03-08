import { difference, values } from 'lodash';
import ActionTypes from './action-types';
import { importConfig } from './config';
import { removeWindow, addWindow, updateWindow } from './window';
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
      .map(winId => dispatch(removeWindow(winId)));
  };
}
