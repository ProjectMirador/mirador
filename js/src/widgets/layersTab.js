(function($) {

  $.LayersTab = function(options) {
    jQuery.extend(true, this, {
      windowId:          null,
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

      this.localState({
        id: 'layersTab',
        visible: this.visible,
        active: true, // needs to be a function of the window state
        canvasID: _this.canvasID,
        empty: false // needs to be a function of the canvasModel
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

    canvasIdUpdated: function(event, canvasID) {
      var localState = this.localState();
      localState.canvasID = canvasID;
      console.log(canvasID);

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

      _this.eventEmitter.subscribe('currentCanvasIDUpdated.' + _this.windowId, _this.canvasIdUpdated.bind(_this));

      _this.eventEmitter.subscribe('focusUpdated' + _this.windowId, function(event, focus) {
        console.log('changed views');
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
          canvasModel = _this.manifest.canvases[state.canvasID],
          templateData = {
            active: state.active ? '' : 'inactive',
            hasLayers: canvasModel.images.length > 0,
            layers: canvasModel.images.map(function(imageResource){
              return {
                title: imageResource.label,
                opacity: imageResource.getOpacity(),
                loadingStatus: imageResource.getStatus(),
                visibility: imageResource.getVisible(),
                url: imageResource.url
              };
            })
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
      '<p>Manipulate images available on this canvas. Drag and Drop to adjust layering.</p>',
      '{{#if hasLayers}}',
      '<ul class="layers-listing">',
      '{{#each layers}}',
      '<li class="layers-list-item {{this.loadingStatus}}">',
      '<h4>{{this.title}}</h4>',
      '<img class="layer-thumb">',
      '<label>opacity (100%)</label>',
      '<input class="opacity-slider" type="range" min="0" max="100" step="2" value="{{this.opacity}}">',
      '<div>',
      '<form>',
      '<input type=checkbox>',
      '<label> visibility (off)</label>',
      '</form>',
      '</div>',
      '</li>',
      '{{/each}}',
      '</ul>',
      '{{else}}',
      '<h4>There are no image layers on this canvas</h4>',
      '{{/if}}',
      '</div>',
    ].join(''))
  };

}(Mirador));
