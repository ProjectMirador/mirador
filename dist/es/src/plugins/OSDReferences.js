export var OSDReferences = {
  /** */
  get: function get(windowId) {
    return this.refs[windowId];
  },
  refs: {},

  /** */
  set: function set(windowId, ref) {
    this.refs[windowId] = ref;
  }
};