(function($) {

  $.LayersTab = function(options) {
    jQuery.extend(true, this, {
      element:           null,
      appendTo:          null,
      manifest:          null,
      visible:           null,
      state:             null,
      eventEmitter:      null
    }, options);

    this.init();
  };

  $.LayersTab.prototype = {
    init: function() {
      var _this = this;
      this.windowId = this.windowId;

      this.localState({
        id: 'layersTab',
        visible: this.visible,
        selectedList: null,
        empty: true
      }, true);

      this.listenForActions();
      this.render(this.localState());
      this.loadTabComponents();
      this.bindEvents();
    },

    localState: function(state, initial) {
      var _this = this;
      if (!arguments.length) return this.layerTabState;
      this.layerTabState = state;

      if (!initial) {
        _this.eventEmitter.publish('layersTabStateUpdated.' + this.windowId, this.layerTabState);
      }

      return this.layerTabState;
    },

    loadTabComponents: function() {
      var _this = this;

      this.osdOpenEvent = _this.eventEmitter.subscribe('osdOpen.'+_this.windowId,function(event,osd,canvasID){
        _this.element.html('');
        _this.layers = new $.Layers({
          windowId:_this.windowId,
          eventEmitter:_this.eventEmitter,
          manifest:_this.manifest,
          canvasID:canvasID,
          state:_this.state
        });
        _this.element.append(_this.layers.getView());

        //_this.eventEmitter.unsubscribe(_this.osdOpenEvent.name,_this.osdOpenEvent.handler);
      });


    },

    tabStateUpdated: function(data) {
      var localState = this.localState();
      if (data.tabs[data.selectedTabIndex].options.id === 'layersTab') {
        localState.visible = true;
      } else {
        localState.visible = false;
      }
      this.localState(localState);
    },

    toggle: function() {},

    listenForActions: function() {
      var _this = this;

      _this.eventEmitter.subscribe('layersTabStateUpdated.' + _this.windowId, function(_, data) {
        _this.render(data);
      });

      _this.eventEmitter.subscribe('tabStateUpdated.' + _this.windowId, function(_, data) {
        _this.tabStateUpdated(data);
      });

      _this.eventEmitter.subscribe('currentCanvasIDUpdated.' + _this.windowId, function(event, canvasID) {

        //update layers for this canvasID
        if(_this.layers){
          _this.layers.destroy();
          _this.layers = null;
        }

      });
    },

    bindEvents: function() {
      var _this = this;

    },

    render: function(state) {
      var _this = this;

      if (!this.element) {
        //_this.appendTo.find(".layersPanel").remove();
        this.element = jQuery(_this.template()).appendTo(_this.appendTo);
      }

      if (state.visible) {
        this.element.show();
      } else {
        this.element.hide();
      }
    },

    template: $.Handlebars.compile([
      '<div class="layersPanel">',
      '</div>',
      ].join(''))
  };

}(Mirador));
