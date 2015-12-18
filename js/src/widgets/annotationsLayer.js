(function($) {

  $.AnnotationsLayer = function(options) {

    jQuery.extend(true, this, {
      parent:            null,
      annotationsList:   null,
      viewer:            null,
      drawTool:          null,
      selected:          null,
      hovered:           null,
      windowId:          null,
      mode:              'default',
      element:           null
    }, options);

    this.init();
  };

  $.AnnotationsLayer.prototype = {

    init: function() {
      var _this = this;
      jQuery.unsubscribe(('modeChange.' + _this.windowId));

      this.createRenderer();
      this.bindEvents();
    },

    bindEvents: function() {
      var _this = this;

      jQuery.subscribe('modeChange.' + _this.windowId, function(event, modeName) {
        _this.mode = modeName;
        _this.modeSwitch();
      });

      jQuery.subscribe('annotationListLoaded.' + _this.windowId, function(event) {
        _this.annotationsList = _this.parent.parent.annotationsList;
        _this.updateRenderer();
      });
    },

    createRenderer: function() {
      var _this = this;
      this.drawTool = new $.OsdRegionDrawTool({
        osdViewer: _this.viewer,
        parent: _this,
        osd: $.OpenSeadragon,
        list: _this.annotationsList,
        visible: false
      });
      this.modeSwitch();
    },

    updateRenderer: function() {
      this.drawTool.list = this.annotationsList;
      this.modeSwitch();
    },

    modeSwitch: function() {
      if (this.mode === 'displayAnnotations') { this.enterDisplayAnnotations(); }
      else if (this.mode === 'editingAnnotations') { this.enterEditAnnotations(); }
      else if (this.mode === 'default') { this.enterDefault(); }
      else {}
    },

    enterDisplayAnnotations: function() {
      this.drawTool.exitEditMode(true);
      this.drawTool.render();
    },

    enterEditAnnotations: function() {
      this.drawTool.enterEditMode();
      this.drawTool.render();
    },

    enterDefault: function() {
      this.drawTool.exitEditMode(false);
    }
  };

}(Mirador));
