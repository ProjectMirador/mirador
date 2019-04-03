import {
  difference,
  keys,
  omit,
  slice,
  values,
} from 'lodash';
import ActionTypes from './action-types';
import { importConfig } from './config';
import { addWindow, removeWindow, updateWindow } from './window';
import { addCompanionWindow, removeCompanionWindow, updateCompanionWindow } from './companionWindow';
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
    const { viewers } = stateExport || {};
    const { companionWindows } = stateExport || {};
    const {
      exposeModeOn,
      height,
      viewportPosition,
      width,
    } = stateExport.workspace;

    const imWins = values(stateExport.windows);
    const exWins = values(getState().windows);
    const exWinCnt = exWins.length > imWins.length ? imWins.length : exWins.length;

    /* do window independent stuff at first */
    dispatch(importConfig(stateExport.config));
    getState().workspace.exposeModeOn !== exposeModeOn && dispatch(toggleWorkspaceExposeMode());
    dispatch(setWorkspaceViewportDimensions({ height, width }));
    dispatch(setWorkspaceViewportPosition(viewportPosition));

    /* now import the windows */

    /*
      If the existing workspace already contains windows (exWins),
      we can re-use them in order to optimize the performance.
      As we only can only re-use the amount of windows to be imported maximally,
      slice all additional windows before
    */
    const exIds = slice(exWins, 0, exWinCnt).map((exWin) => {
      const imWin = imWins.shift();
      const viewer = viewers[imWin.id];
      dispatch(fetchManifest(imWin.manifestId));
      /* remove exisiting companionWindows, except the ones marked as default */
      exWin.companionWindowIds
        .filter(cwId1 => !getState().companionWindows[cwId1].default)
        .map(cwId2 => dispatch(removeCompanionWindow(exWin.id, cwId2)));

      /* update window */
      dispatch(updateWindow(exWin.id, omit(imWin, 'id', 'companionWindowIds', 'thumbnailNavigationId')));

      /* update default companionWindows */
      exWin.companionWindowIds
        // eslint-disable-next-line max-len
        .filter(cwId => getState().companionWindows[cwId] && getState().companionWindows[cwId].default)
        .map((cwId) => {
          const newCw = values(companionWindows)
            .find(cw => cw.default && cw.content === getState().companionWindows[cwId].content);
          return dispatch(updateCompanionWindow(exWin.id, cwId, omit(newCw, 'id')));
        });

      /* create non-default companion windows */
      imWin.companionWindowIds
        .filter(cwId => !companionWindows[cwId].default)
        .map(cwId => dispatch(addCompanionWindow(exWin.id, omit(companionWindows[cwId], 'id'))));
      dispatch(updateViewport(exWin.id, viewer));
      return exWin.id;
    });

    /* create new windows for additionally imported ones */
    const imIds = imWins.map((imWin) => {
      const viewer = viewers[imWin.id];

      dispatch(fetchManifest(imWin.manifestId));
      dispatch(addWindow(omit(imWin, ['companionWindowIds', 'thumbnailNavigationId'])));
      dispatch(updateViewport(imWin.id, viewer));

      /* create non-default companion windows */
      values(companionWindows)
        .filter(cw => !cw.default)
        .map(cw => dispatch(addCompanionWindow(imWin.id, { ...omit(cw, 'id') }, {})));

      /* update default companion windows */
      values(companionWindows)
        .filter(cw => cw.default)
        .map((cwNew) => {
          const cwOld = values(getState().companionWindows)
            .find(el => el.content === cwNew.content);
          return dispatch(updateCompanionWindow(imWin.id, cwOld.id, omit(cwNew, 'id')));
        });
      return imWin.id;
    });

    /* close surplus windows */
    difference(keys(getState().windows), exIds.concat(imIds))
      .map(winId => dispatch(removeWindow(winId)));
  };
}
