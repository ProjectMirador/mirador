import settings from '../../config/settings';

/**
 * Returns Mirador's portion of the global Redux state.
 * If settings.state.slice is set (e.g. 'mirador'), Mirador's state is read from state[slice],
 * allowing Mirador to coexist in a shared Redux store.
 * Otherwise, Mirador is assumed to own the entire Redux state.
 * @param {object} state
 * @returns {object}
 */
export function miradorSlice(state) {
  if (settings.state.slice) return state[settings.state.slice];

  return state;
}

export const EMPTY_ARRAY = Object.freeze([]);
export const EMPTY_OBJECT = Object.freeze({});
