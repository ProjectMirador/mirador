import settings from '../../config/settings';
/** */

export function miradorSlice(state) {
  if (settings.state.slice) return state[settings.state.slice];
  return state;
}