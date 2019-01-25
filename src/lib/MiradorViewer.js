import { store, actions } from '../store';

/**
 * Return external viewer API wrapper
 */
export default function () {
  return {
    actions,
    store,
    // export unconnected components here
  };
}
