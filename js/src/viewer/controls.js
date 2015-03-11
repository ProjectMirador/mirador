(function($) {
  // Keeps track of the control context and switches out
  // keyboard control mappings accordingly.

  $.ControlHarness = function(options) {

    jQuery.extend(true, this, {
      contexts: null,
      activeContext: null
    }, options);

    this.init();
  };

  $.ControlHarness.prototype = {

    init: function() {
      this.bindEvents();
    },

    bindEvents: function() {
      var _this = this;

      // workspace is changed:
      // slot is added/removed:
      // window is opened/closed:
      // different top-level menus are opened (load manifest/choose workspace, etc.):
      // item is selected from manifest menu.
      // item is hovered over with the mouse.
      // deliberately moving "up" "down" "left" and "right" through
      // the command contexts.
    },

    switchActiveContext: function() {

    },

    addContext: function(ctxId) {

    },

    removeContext: function(ctxId) {

    }

  };

}(Mirador));

