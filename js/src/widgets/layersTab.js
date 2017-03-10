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

    },

    tabStateUpdated: function(visible) {
      var localState = this.localState();
      localState.visible = localState.visible ? false : true;

      this.localState(localState);
    },

    imageFocusUpdated: function(focus) {
      var localState = this.localState();
      localState.active = (focus === 'ThumbnailsView') ? false : true;

      this.localState(localState);
    },

    listenForActions: function() {
      var _this = this;

      // This event is fired by the component itself anytime its local state is updated.
      _this.eventEmitter.subscribe('layersTabStateUpdated.' + _this.windowId, function(_, data) {
        _this.render(data);
      });

      _this.eventEmitter.subscribe('tabStateUpdated.' + _this.windowId, function(_, data) {
        _this.tabStateUpdated(data.layersTab);
      });

      _this.eventEmitter.subscribe('currentCanvasIDUpdated.' + _this.windowId, function(event, canvasID) {
        //update layers for this canvasID
      });

      _this.eventEmitter.subscribe('focusUpdated' + _this.windowId, function(event, focus) {
        // update the disabled state of the layersTab
        // since it cannot be used in overview mode
        _this.imageFocusUpdated(focus);
      });
    },

    bindEvents: function() {
      var _this = this;

    },

    render: function(state) {
      var _this = this,
          templateData = {
            active: state.active ? '' : 'inactive'
          };

      if (this.element) {
        _this.appendTo.find(".layersPanel").remove();
      }
      this.element = jQuery(_this.template(templateData)).appendTo(_this.appendTo);

      _this.bindEvents();

      if (state.visible) {
        this.element.show();
      } else {
        this.element.hide();
      }
    },

    template: Handlebars.compile([
      '<div class="layersPanel {{active}}">',
      '</div>',
    ].join(''))
  };

}(Mirador));
