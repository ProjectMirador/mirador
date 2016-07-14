(function($) {

  $.AnnotationsLayer = function(options) {

    jQuery.extend(true, this, {
      annotationsList:   null,
      viewer:            null,
      drawTool:          null,
      selected:          null,
      hovered:           null,
      windowId:          null,
      mode:              'default',
      element:           null,
      eventEmitter:      null
    }, options);

    this.init();
  };

  $.AnnotationsLayer.prototype = {

    init: function() {
      var _this = this;
      _this.eventEmitter.unsubscribe(('modeChange.' + _this.windowId));

      this.createStateMachine();
      this.createRenderer();
      this.bindEvents();
      this.listenForActions();
    },

    listenForActions: function() {
      var _this = this;

      _this.eventEmitter.subscribe('modeChange.' + _this.windowId, function(event, modeName) {
        _this.mode = modeName;
        _this.modeSwitch();
      });

      _this.eventEmitter.subscribe('annotationListLoaded.' + _this.windowId, function(event) {
        _this.annotationsList = _this.state.getWindowAnnotationsList(_this.windowId);
        _this.updateRenderer();
      });
    },

    bindEvents: function() {
      var _this = this;
    },

    createStateMachine: function() {
      var _this = this;
      this.layerState = StateMachine.create({
        events: [
          { name: 'startup', from: 'none', to: 'default' },
          { name: 'defaultState', from: ['default', 'display', 'create', 'edit'], to: 'default' },
          { name: 'displayAnnotations', from: ['default', 'display', 'create', 'edit'], to: 'display' },
          { name: 'createAnnotation', from: ['default','display'], to: 'create' },
          { name: 'editAnnotation', from: ['default','display'], to: 'edit' }
        ],
        callbacks: {
          onstartup: function(event) {
            _this.enterDefault();
          },
          ondefaultState: function(event) {
            _this.enterDefault();
          },
          ondisplayAnnotations: function(event) {
            _this.enterDisplayAnnotations();
          },
          oncreateAnnotation: function(event) {
            _this.enterCreateAnnotation();
          },
          oneditAnnotation: function(event) {
            _this.enterEditAnnotation();
          }
        }
      });
    },

    createRenderer: function() {
      var _this = this;
      this.drawTool = new $.OsdRegionDrawTool({
        osdViewer: _this.viewer,
        parent: _this,
        list: _this.annotationsList, // must be passed by reference.
        visible: false,
        windowId: _this.windowId,
        state: _this.state,
        eventEmitter: _this.eventEmitter
      });
      this.layerState.startup();
    },

    updateRenderer: function() {
      this.drawTool.list = this.annotationsList;
      this.modeSwitch();
    },

    modeSwitch: function() {
      if (this.mode === 'displayAnnotations') { this.layerState.displayAnnotations(); }
      else if (this.mode === 'editingAnnotation') { this.layerState.editAnnotation(); }
      else if (this.mode === 'creatingAnnotation') {
        //if the state machine is currently in 'edit' mode, it means we shouldn't rerender anything,
        //but simply switch tools (triggered from HUD)
        if (this.layerState.current !== 'edit') {
          this.layerState.createAnnotation();
        }
      }
      else if (this.mode === 'default') { this.layerState.defaultState(); }
      else {}
    },

    enterDisplayAnnotations: function() {
      this.drawTool.exitEditMode(true);
      this.drawTool.render();
    },

    enterCreateAnnotation: function() {
      this.drawTool.enterCreateMode();
      this.drawTool.render();
    },

    enterEditAnnotation: function() {
      this.drawTool.enterEditMode();
      //this.drawTool.render();
    },

    enterDefault: function() {
      this.drawTool.exitEditMode(false);
    }
  };

}(Mirador));
