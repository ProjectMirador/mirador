import { PluginReferences } from './PluginReferences';

const NAMESPACE = 'osd';

/**
 * A registry for the live OSD viewer instance per windowId. Kept as its own
 * named export (rather than asking core/plugin code to call
 * PluginReferences.get('osd', windowId) directly) since this predates
 * PluginReferences and is already public API — it's now just a thin,
 * namespaced wrapper around that shared registry.
 */
export const OSDReferences = {
  /** */
  get(windowId) {
    return PluginReferences.get(NAMESPACE, windowId);
  },
  /** */
  remove(windowId) {
    PluginReferences.remove(NAMESPACE, windowId);
  },
  /** */
  set(windowId, ref) {
    PluginReferences.set(NAMESPACE, windowId, ref);
  },
};
