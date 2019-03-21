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
    const { windows, workspace } = getState();

    let position;

    if (pan) {
      const {
        x, y, width, height,
      } = windows[windowId];

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
export function addWindow(options) {
  return (dispatch, getState) => {
    const { windows } = getState();
    const numWindows = Object.keys(windows).length;

    const cwDefault = `cw-${uuid()}`;
    const cwThumbs = `cw-${uuid()}`;
    const defaultOptions = {
      canvasIndex: 0,
      collectionIndex: 0,
      companionWindowIds: [cwDefault, cwThumbs],
      height: 400,
      id: `window-${uuid()}`,
      manifestId: null,
      maximized: false,
      rangeId: null,
      rotation: null,
      selectedAnnotations: {},
      sideBarPanel: 'info',
      thumbnailNavigationId: cwThumbs,
      view: 'single',
      width: 400,
      x: 200 + (Math.floor(numWindows / 10) * 50 + (numWindows * 30) % 300),
      y: 200 + ((numWindows * 50) % 300),
    };

    dispatch({
      companionWindows: [
        {
          content: 'info',
          id: cwDefault,
          position: 'left',
        },
        {
          content: 'thumbnail_navigation',
          id: cwThumbs,
          position: options.thumbnailNavigationPosition || 'far-bottom',
        },
      ],
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
 * setWindowSideBarPanel - action creator
 *
 * @param  {String} windowId
 * @param  {String} panelType
 * @memberof ActionCreators
 */
export function setWindowSideBarPanel(windowId, panelType) {
  return {
    panelType,
    type: ActionTypes.SET_WINDOW_SIDE_BAR_PANEL,
    windowId,
  };
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

/**
 * updateWindowPosition - action creator
 *
 * @param  {String} windowId
 * @param  {Array} position
 * @memberof ActionCreators
 */
export function updateWindowPosition(windowId, position) {
  return {
    payload: {
      position,
      windowId,
    },
    type: ActionTypes.UPDATE_WINDOW_POSITION,
  };
}

/**
 * setWindowSize - action creator
 *
 * @param  {String} windowId
 * @param  {Object} size
 * @memberof ActionCreators
 */
export function setWindowSize(windowId, size) {
  return {
    payload: {
      size,
      windowId,
    },
    type: ActionTypes.SET_WINDOW_SIZE,
  };
}
