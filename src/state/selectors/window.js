import { createSelector } from 'reselect';
import { getWindow } from './getters';

export const getWindowCurrentTime = createSelector(
  [
    getWindow,
  ],
  (window) => {
    if (!window) return undefined;

    return window.currentTime;
  },
);

export const getWindowPausedStatus = createSelector(
  [
    getWindow,
  ],
  (window) => {
    if (!window) return undefined;

    return window.paused;
  },
);

export const getWindowMutedStatus = createSelector(
  [
    getWindow,
  ],
  (window) => {
    if (!window) return undefined;

    return window.muted;
  },
);
