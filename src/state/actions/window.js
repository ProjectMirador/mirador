import uuid from 'uuid/v4';
import ActionTypes from './action-types';
import { addCompanionWindow, removeCompanionWindow, updateCompanionWindow } from './companionWindow';

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
    xywh: [0, 0, 400, 400],
    companionWindowIds: [],
    rotation: null,
    view: 'single',
  };
  return { type: ActionTypes.ADD_WINDOW, window: { ...defaultOptions, ...options } };
}

/** */
export function updateWindow(id, payload) {
  return { type: ActionTypes.UPDATE_WINDOW, id, payload };
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
  return (dispatch, getState) => {
    const action = dispatch(addCompanionWindow({ content: panelType, position }));

    const { companionWindowIds } = getState().windows[windowId];

    dispatch(updateWindow(windowId,
      { companionWindowIds: [...companionWindowIds, action.id] }));

    dispatch(toggleWindowSideBarPanel(windowId, 'closed'));
  };
}

/**
* Clean up state and remove window
*/
export function closeWindow(windowId) {
  return (dispatch, getState) => {
    const { companionWindowIds } = getState().windows[windowId];
    companionWindowIds.map(id => dispatch(removeCompanionWindow(id)));
    dispatch(removeWindow(windowId));
  };
}

/**
* Close companion window and remove reference from window
*/
export function closeCompanionWindow(windowId, companionWindowId) {
  return (dispatch, getState) => {
    dispatch(removeCompanionWindow(companionWindowId));
    const companionWindowIds = getState().windows[windowId].companionWindowIds
      .filter(id => id !== companionWindowId);
    dispatch(updateWindow(windowId, { companionWindowIds }));
  };
}

/**
* Move companion window between right and bottom area
* @param {String} companionWindowId
*/
export function toggleAreaOfCompanionWindow(companionWindowId) {
  return (dispatch, getState) => {
    const position = getState()
      .companionWindows[companionWindowId].position === 'right' ? 'bottom' : 'right';
    dispatch(updateCompanionWindow(companionWindowId, { position }));
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
