import uuid from 'uuid/v4';
import ActionTypes from './action-types';

/**
 * focusWindow - action creator
 *
 * @param  {String} windowId
 * @memberof ActionCreators
 */
export function focusWindow(windowId) {
  return { type: ActionTypes.FOCUS_WINDOW, windowId };
}

/**
 * addWindow - action creator
 *
 * @param  {Object} options
 * @memberof ActionCreators
 */
export function addWindow(options) {
  const defaultOptions = {
    id: `window-${uuid()}`,
    canvasIndex: 0,
    collectionIndex: 0,
    manifestId: null,
    rangeId: null,
    thumbnailNavigationPosition: 'bottom', // bottom by default in settings.js
    width: 400,
    height: 400,
    x: 2700,
    y: 2700,
    rotation: null,
    view: 'single',
  };
  return { type: ActionTypes.ADD_WINDOW, window: { ...defaultOptions, ...options } };
}

/**
 * removeWindow - action creator
 *
 * @param  {String} windowId
 * @memberof ActionCreators
 */
export function removeWindow(windowId) {
  return { type: ActionTypes.REMOVE_WINDOW, windowId };
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
 * setWindowCompanionWindow - action creator
 *
 * @param  {String} windowId
 * @param  {String} panelType The type of panel content to be rendered
 *                            in the companion window (e.g. info, canvas_navigation)
 * @param  {String} position The position of the companion window to
 *                           set content for (e.g. right, bottom)
 * @memberof ActionCreators
 */
export function setWindowCompanionWindow(windowId, panelType, position) {
  return {
    type: ActionTypes.SET_WINDOW_COMPANION_WINDOW,
    windowId,
    panelType,
    position,
  };
}

/**
 * toggleWindowSideBarPanel - action creator
 *
 * @param  {String} windowId
 * @param  {String} panelType
 * @memberof ActionCreators
 */
export function toggleWindowSideBarPanel(windowId, panelType) {
  return { type: ActionTypes.TOGGLE_WINDOW_SIDE_BAR_PANEL, windowId, panelType };
}

/**
 * popOutCompanionWindow - action creator
 *
 * @param  {String} windowId
 * @param  {String} panelType The type of panel content to be rendered
 *                            in the companion window (e.g. info, canvas_navigation)
 * @param  {String} position The position of the companion window to
 *                           set content for (e.g. right, bottom)
 * @memberof ActionCreators
 */
export function popOutCompanionWindow(windowId, panelType, position) {
  return ((dispatch) => {
    dispatch(setWindowCompanionWindow(windowId, panelType, position));
    dispatch(toggleWindowSideBarPanel(windowId, 'closed'));
  });
}

/**
 * setWindowThumbnailPosition - action creator
 *
 * @param  {String} windowId
 * @param  {String} position
 * @memberof ActionCreators
 */
export function setWindowThumbnailPosition(windowId, position) {
  return { type: ActionTypes.SET_WINDOW_THUMBNAIL_POSITION, windowId, position };
}

/**
 * setWindowViewType - action creator
 *
 * @param  {String} windowId
 * @param  {String} viewType
 * @memberof ActionCreators
 */
export function setWindowViewType(windowId, viewType) {
  return { type: ActionTypes.SET_WINDOW_VIEW_TYPE, windowId, viewType };
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
    type: ActionTypes.UPDATE_WINDOW_POSITION,
    payload: {
      windowId,
      position,
    },
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
    type: ActionTypes.SET_WINDOW_SIZE,
    payload: {
      windowId,
      size,
    },
  };
}
