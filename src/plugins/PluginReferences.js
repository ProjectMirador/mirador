/**
 * A registry for plugin authors to stash live, non-serializable objects
 * (an audio engine, a canvas context, anything that shouldn't go through
 * Redux) somewhere reachable from anywhere, keyed by windowId — the same
 * pattern Mirador core uses internally for the OSD viewer (see
 * OSDReferences.js), generalized so plugin authors don't need to reinvent it
 * with an ad hoc `window.__MY_GLOBAL__` of their own.
 *
 * Namespace by your plugin's package name to avoid colliding with other
 * plugins:
 *
 *   PluginReferences.set('my-plugin-name', windowId, engineInstance);
 *   PluginReferences.get('my-plugin-name', windowId);
 *   PluginReferences.remove('my-plugin-name', windowId); // e.g. on unmount
 */
export const PluginReferences = {
  /** */
  get(namespace, windowId) {
    return this.refs[namespace]?.[windowId];
  },
  /** */
  remove(namespace, windowId) {
    delete this.refs[namespace]?.[windowId];
  },
  refs: {},
  /** */
  set(namespace, windowId, ref) {
    if (!this.refs[namespace]) this.refs[namespace] = {};
    this.refs[namespace][windowId] = ref;
  },
};
