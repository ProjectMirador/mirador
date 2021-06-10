"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.OSDReferences = void 0;
var OSDReferences = {
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
exports.OSDReferences = OSDReferences;