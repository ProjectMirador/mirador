import { createListenerMiddleware } from '@reduxjs/toolkit';
import ActionTypes from '../actions/action-types';
import { setWorkspaceViewportPosition } from '../actions';
import { getWorkspace, getElasticLayout } from '../selectors';

export const windowsListenerMiddleware = createListenerMiddleware();

/**
 * Mechanical port of sagas/windows.js's panToFocusedWindow
 */
windowsListenerMiddleware.startListening({
  type: ActionTypes.FOCUS_WINDOW,
  effect: ({ pan, windowId }, listenerApi) => {
    if (!pan) return;

    const state = listenerApi.getState();
    const { x, y, width, height } = getElasticLayout(state)[windowId] || {};
    const {
      viewportPosition: { width: viewWidth, height: viewHeight },
    } = getWorkspace(state);

    listenerApi.dispatch(
      setWorkspaceViewportPosition({
        x: x + width / 2 - viewWidth / 2,
        y: y + height / 2 - viewHeight / 2,
      }),
    );
  },
});
