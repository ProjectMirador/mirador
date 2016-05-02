(function($) {

  $.LayersTab = function(options) {
    jQuery.extend(true, this, {
      element:           null,
      appendTo:          null,
      manifest:          null,
      visible:           null
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
      if (!arguments.length) return this.layerTabState;
      this.layerTabState = state;

      if (!initial) {
        jQuery.publish('layersTabStateUpdated.' + this.windowId, this.layerTabState);
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

    toggle: function() {},

    listenForActions: function() {
      var _this = this;

      jQuery.subscribe('layersTabStateUpdated.' + _this.windowId, function(_, data) {
        _this.render(data);
      });

      jQuery.subscribe('tabStateUpdated.' + _this.windowId, function(_, data) {
        _this.tabStateUpdated(data.layersTab);
      });

      jQuery.subscribe('currentCanvasIDUpdated.' + _this.windowId, function(event, canvasID) {
        //update layers for this canvasID
      });
    },

    bindEvents: function() {
      var _this = this;

    },

    render: function(state) {
      var _this = this,
      templateData = {};

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
      '<div class="layersPanel">',
      '</div>',
      ].join(''))
  };

}(Mirador));
