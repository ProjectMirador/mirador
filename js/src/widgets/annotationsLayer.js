(function($) {

  $.AnnotationsLayer = function(options) {

    jQuery.extend(true, this, {
      parent:            null,
      annotationsList:   null,
      currentAnnosList:  null,
      viewer:            null,
      renderer:          null,
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


      jQuery.subscribe('annotationsTabStateUpdated.' + _this.windowId, function(_, data) {

          _this.filterList(data.selectedList);

      });

      jQuery.subscribe('editorPanelStateUpdated' + this.windowId, function(_, data) {
          _this.updateRenderer();
      });

    },
    filterList: function(listId){
      var _this = this;

      var window = $.viewer.workspace.windows.map(function(window){
            if(window.id == _this.windowId){ return window; }
          });

      var annos = null;

      if(listId === null){
        annos = window[0].annotationsList;
      }else{
        annos = window[0].annotationsList.filter(function(annotation){
          if(annotation.endpoint === listId){
            return true;
          }

          if(annotation.endpoint.name === listId){
            return true;
          }

          return false;
        });
      }

      _this.currentAnnosList = annos;
      _this.updateRenderer();

    },
    createRenderer: function() {
      var _this = this;
      this.renderer = new $.OsdCanvasRenderer({
        osd: $.OpenSeadragon,
        osdViewer: _this.viewer,
        list: _this.annotationsList, // must be passed by reference.
        //list: _this.parent.parent.editorPanel.state.annotations,
        visible: false,
        parent: _this
      });
      this.modeSwitch();
    },

    updateRenderer: function() {
      var _this = this;
      if(_this.currentAnnosList === null){ _this.currentAnnosList = _this.annotationsList; }
      if(_this.currentAnnosList.length < 1){ _this.currentAnnosList = _this.annotationsList; }
      console.log(this.renderer);
      this.renderer.list = _this.currentAnnosList;
      this.modeSwitch();
    },

    modeSwitch: function() {
      if (this.mode === 'displayAnnotations') { this.enterDisplayAnnotations(); }
      else if (this.mode === 'editingAnnotations') { this.enterEditAnnotations(); }
      else if (this.mode === 'default') { this.enterDefault(); }
      else {}
    },


    enterDisplayAnnotations: function() {
      var _this = this;
      //console.log('triggering annotation loading and display');
      this.renderer.render();
    },

    enterEditAnnotations: function() {
      var _this = this;
      if (!this.parent.hud.contextControls.rectTool) {
        this.parent.hud.contextControls.rectTool = new $.OsdRegionRectTool({
          osd: OpenSeadragon,
          osdViewer: _this.viewer,
          rectType: 'oa', // does not do anything yet.
          parent: _this
        });
      } else {
        this.parent.hud.contextControls.rectTool.reset(_this.viewer);
      }
      this.renderer.render();
    },

    enterDefault: function() {
      this.renderer.hideAll();
    }

  };

}(Mirador));
