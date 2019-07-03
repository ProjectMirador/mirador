import uuid from 'uuid/v4';
import ActionTypes from './action-types';

/**
 * focusWindow - action creator
 *
 * @param  {String} windowId
 * @memberof ActionCreators
 */
export function focusWindow(windowId, pan = false) {
  return (dispatch, getState) => {
    const { elasticLayout, workspace } = getState();

    let position;

    if (pan) {
      const {
        x, y, width, height,
      } = elasticLayout[windowId];

      const { viewportPosition: { width: viewWidth, height: viewHeight } } = workspace;
      position = { x: (x + width / 2) - viewWidth / 2, y: (y + height / 2) - viewHeight / 2 };
    } else {
      position = {};
    }
    dispatch({
      position,
      type: ActionTypes.FOCUS_WINDOW,
      windowId,
    });
  };
}

/**
 * addWindow - action creator
 *
 * @param  {Object} options
 * @memberof ActionCreators
 */
export function addWindow({ companionWindows, ...options }) {
  return (dispatch, getState) => {
    const { config, windows } = getState();
    const numWindows = Object.keys(windows).length;

    const cwDefault = `cw-${uuid()}`;
    const cwThumbs = `cw-${uuid()}`;
    const additionalCompanionWindowIds = (companionWindows || []).map(e => `cw-${uuid()}`);
    const defaultOptions = {
      canvasId: undefined,
      collectionIndex: 0,
      companionAreaOpen: true,
      companionWindowIds: [cwDefault, cwThumbs, ...additionalCompanionWindowIds],
      displayAllAnnotations: config.displayAllAnnotations || false,
      draggingEnabled: true,
      id: `window-${uuid()}`,
      layoutOrder: numWindows + 1,
      manifestId: null,
      maximized: false,
      rangeId: null,
      rotation: null,
      selectedAnnotations: {},
      sideBarOpen: config.window.sideBarOpenByDefault,
      sideBarPanel: config.window.defaultSideBarPanel,
      thumbnailNavigationId: cwThumbs,
    };

    const elasticLayout = {
      height: 400,
      width: 400,
      x: 200 + (Math.floor(numWindows / 10) * 50 + (numWindows * 30) % 300),
      y: 200 + ((numWindows * 50) % 300),
    };

    dispatch({
      companionWindows: [
        {
          content: config.window.defaultSideBarPanel,
          default: true,
          id: cwDefault,
          position: 'left',
        },
        {
          content: 'thumbnailNavigation',
          default: true,
          id: cwThumbs,
          position: options.thumbnailNavigationPosition
            || config.thumbnailNavigation.defaultPosition,
        },
        ...(
          (companionWindows || []).map((cw, i) => ({ ...cw, id: additionalCompanionWindowIds[i] }))
        ),
      ],
      elasticLayout,
      type: ActionTypes.ADD_WINDOW,
      window: { ...defaultOptions, ...options },
    });
  };
}

/**
 * maximizeWindow
 * @param  {String} windowId
 * @memberof ActionCreators
 */
export function maximizeWindow(windowId, layout) {
  return { type: ActionTypes.MAXIMIZE_WINDOW, windowId };
}

/**
 * minimizeWindow
 * @param  {String} windowId
 * @memberof ActionCreators
 */
export function minimizeWindow(windowId) {
  return { type: ActionTypes.MINIMIZE_WINDOW, windowId };
}

/** */
export function updateWindow(id, payload) {
  return {
    id,
    payload,
    type: ActionTypes.UPDATE_WINDOW,
  };
}

/** */
export function setCompanionAreaOpen(id, companionAreaOpen) {
  return {
    id,
    payload: { companionAreaOpen },
    type: ActionTypes.UPDATE_WINDOW,
  };
}

/**
 * removeWindow - action creator
 *
 * @param  {String} windowId
 * @memberof ActionCreators
 */
export function removeWindow(windowId) {
  return (dispatch, getState) => {
    const { windows } = getState();
    const { companionWindowIds } = windows[windowId];

    dispatch({
      companionWindowIds,
      type: ActionTypes.REMOVE_WINDOW,
      windowId,
      windows,
    });
  };
}

/**
 * toggleWindowSideBar - action creator
 *
 * @param  {String} windowId
 * @memberof ActionCreators
 */
export function toggleWindowSideBar(windowId) {
  return { type: ActionTypes.TOGGLE_WINDOW_SIDE_BAR, windowId };
}

/**
 * setWindowThumbnailPosition - action creator
 *
 * @param  {String} windowId
 * @param  {String} position
 * @memberof ActionCreators
 */
export function setWindowThumbnailPosition(windowId, position) {
  return (dispatch, getState) => {
    const { windows } = getState();
    const { thumbnailNavigationId } = windows[windowId];

    dispatch({
      id: thumbnailNavigationId,
      payload: { position },
      type: ActionTypes.UPDATE_COMPANION_WINDOW,
    });
  };
}

/**
 * setWindowViewType - action creator
 *
 * @param  {String} windowId
 * @param  {String} viewType
 * @memberof ActionCreators
 */
export function setWindowViewType(windowId, viewType) {
  return {
    type: ActionTypes.SET_WINDOW_VIEW_TYPE,
    viewType,
    windowId,
  };
}
