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

  $.AnnotationsLayer.DISPLAY_ANNOTATIONS = 'displayAnnotations';

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
          { name: 'displayAnnotations', from: ['default', 'display', 'create', 'edit', 'newShape'], to: 'display' },
          { name: 'createAnnotation', from: ['default','display'], to: 'create' },
          { name: 'createShape', from: 'edit', to: 'newShape'},
          { name: 'editAnnotation', from: ['default','display', 'newShape'], to: 'edit' }
        ],
        callbacks: {
          onstartup: function(event) {
            _this.drawTool.enterDefault();
          },
          ondefaultState: function(event) {
            _this.drawTool.enterDefault();
          },
          ondisplayAnnotations: function(event) {
            _this.drawTool.enterDisplayAnnotations();
          },
          oncreateAnnotation: function(event) {
            _this.drawTool.enterCreateAnnotation();
          },
          oncreateShape: function(event) {
            _this.drawTool.enterCreateShape();
          },
          oneditAnnotation: function(event) {
            _this.drawTool.enterEditAnnotation();
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
      // this.modeSwitch();
    },

    modeSwitch: function() {
      if (this.mode === 'displayAnnotations') {
        this.layerState.displayAnnotations();
      }
      else if (this.mode === 'editingAnnotation') {
        this.layerState.editAnnotation();
      }
      else if (this.mode === 'creatingAnnotation') {
        if (this.layerState.current !== 'edit') {
          this.layerState.createAnnotation();
        } else {
          this.layerState.createShape();
        }
      }
      else if (this.mode === 'default') {
        this.layerState.defaultState();
      }
      else {}
    }
  };

}(Mirador));
