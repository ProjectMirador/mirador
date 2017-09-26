(function($) {

  $.LayersTab = function(options) {
    jQuery.extend(true, this, {
      windowId:          null,
      element:           null,
      appendTo:          null,
      manifest:          null,
      visible:           null,
      state:             null,
      eventEmitter:      null,
      canvasID:          null,
      canvases:          null
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

      this.render(this.localState());
      this.bindEvents();
      this.listenForActions();
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

    tabStateUpdated: function(visible) {
      var localState = this.localState();
      localState.visible =  visible;

      this.localState(localState);
    },

    canvasIdUpdated: function(event, canvasID) {
      var localState = this.localState();
      localState.canvasID = canvasID;

      this.localState(localState);
    },

    imageFocusUpdated: function(focus) {
      var localState = this.localState();
      localState.active = (focus !== 'ImageView') ? false : true;

      this.localState(localState);
    },

    updateImageResourceStatus: function(event, imageResource) {
      var _this = this;

      ['loaded', 'requested', 'initialized', 'drawn'].forEach(function(statusString){
        _this.element.find('.layers-list-item[data-imageid="'+ imageResource.id + '"]').removeClass(statusString);
      });

      this.element.find('.layers-list-item[data-imageid="'+ imageResource.id + '"]').addClass(imageResource.getStatus());
    },
    showImageResource: function(event, imageResource) {
      this.element.find('.visibility-toggle[data-imageid="'+ imageResource.id + '"]').prop('checked', true);
      this.element.find('.opacity-slider[data-imageid="'+ imageResource.id + '"]').prop('disabled', false);
      this.element.find('.opacity-label[data-imageid="'+ imageResource.id + '"]').removeClass('disabled').text("(" + Math.ceil(imageResource.getOpacity()*100) + ")%");
    },
    hideImageResource: function(event, imageResource) {
      this.element.find('.visibility-toggle[data-imageid="'+ imageResource.id + '"]').prop('checked', false);
      this.element.find('.opacity-slider[data-imageid="'+ imageResource.id + '"]').prop('disabled', true);
      this.element.find('.opacity-label[data-imageid="'+ imageResource.id + '"]').addClass('disabled').text("(" + i18next.t('disabledOpacityMessage') + ")");
    },
    updateImageResourceOpacity: function(event, imageResource) {
      this.element.find('.opacity-slider[data-imageid="'+ imageResource.id + '"]').val(imageResource.getOpacity()*100);
      this.element.find('.opacity-label[data-imageid="'+ imageResource.id + '"]').text("(" + Math.ceil(imageResource.getOpacity()*100) + ")%");
    },

    listenForActions: function() {
      var _this = this;

      // This event is fired by the component itself anytime its local state is updated.
      _this.eventEmitter.subscribe('layersTabStateUpdated.' + _this.windowId, function(_, data) {
        _this.render(data);
      });

      _this.eventEmitter.subscribe('tabStateUpdated.' + _this.windowId, function(_, data) {
        var visible = data.tabs[data.selectedTabIndex].options.id === 'layersTab';
        _this.tabStateUpdated(visible);
      });

      _this.eventEmitter.subscribe('currentCanvasIDUpdated.' + _this.windowId, _this.canvasIdUpdated.bind(_this));
      _this.eventEmitter.subscribe('image-status-updated' + _this.windowId, _this.updateImageResourceStatus.bind(_this));
      _this.eventEmitter.subscribe('image-show' + _this.windowId, _this.showImageResource.bind(_this));
      _this.eventEmitter.subscribe('image-hide' + _this.windowId, _this.hideImageResource.bind(_this));
      _this.eventEmitter.subscribe('image-opacity-updated' + _this.windowId, _this.updateImageResourceOpacity.bind(_this));

      _this.eventEmitter.subscribe('focusUpdated' + _this.windowId, function(event, focus) {


        // update the disabled state of the layersTab
        // since it cannot be used in overview mode
        // but is visible/available in image mode.
        _this.imageFocusUpdated(focus);
      });
    },

    bindEvents: function() {
      var _this = this;

      this.element.find('img').on('load', function(event) {
        // fades in thumbs when they finish loading.
        jQuery(this).addClass('loaded');
        jQuery(this).closest('.thumb-container').removeClass('awaiting-thumbnail');
      });

      this.element.find('img').on('error', function(event) {
        // prevents failed images from showing.
        jQuery(this).addClass('failed');
        jQuery(this).closest('.thumb-container').removeClass('awaiting-thumbnail');
        jQuery(this).closest('.thumb-container').addClass('thumb-failed');
      });

      this.element.on('input', '.opacity-slider', function(event) {
        var canvasModel = _this.canvases[_this.localState().canvasID],
            eventedImageResource = canvasModel.getImageById(event.currentTarget.attributes['data-imageid'].nodeValue);

        eventedImageResource.setOpacity(event.currentTarget.value/100);
      });

      this.element.on('change', '.visibility-toggle', function(event) {
        var canvasModel = _this.canvases[_this.localState().canvasID],
            eventedImageResource = canvasModel.getImageById(event.currentTarget.attributes['data-imageid'].nodeValue);
        if(event.currentTarget.checked) {
          eventedImageResource.show();
        } else {
          eventedImageResource.hide();
        }
      });
    },

    render: function(state) {
      var _this = this,
          canvasModel = _this.canvases[state.canvasID],
          templateData = {
            active: state.active ? '' : 'inactive',
            imagesFor: i18next.t('imagesFor'),
            hasLayers: canvasModel.images.length > 0,
            canvasTitle: canvasModel.label,
            disabledLayersTabMessage: i18next.t('disabledLayersTabMessage'),
            layers: canvasModel.images.map(function(imageResource){
              return {
                visibleLabel: i18next.t('visibleLabel'),
                opacityLabel: i18next.t('opacityLabel'),
                disabledOpacityMessage: i18next.t('disabledOpacityMessage'),
                emptyTemplateMessage: i18next.t('emptyTemplateMessage'),
                imageId: imageResource.id,
                title: imageResource.label === 'No Label' ? i18next.t('noLabel') : imageResource.label,
                opacity: imageResource.getOpacity()*100, // scale factor for limitations of html5 slider element
                loadingStatus: imageResource.getStatus(),
                visibility: imageResource.getVisible(),
                url: imageResource.thumbUrl
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

    template: $.Handlebars.compile([
      '<div class="layersPanel {{active}}">',
      '<h3>{{imagesFor}} {{canvasTitle}}</h3>',
      '{{#if hasLayers}}',
      '<ul class="layers-listing">',
      '{{#each layers}}',
      '<li class="layers-list-item {{loadingStatus}}" data-imageid="{{imageId}}">',
      '<h4>{{this.title}}</h4>',
      '<div class="thumb-container awaiting-thumbnail">',
      '<img class="layer-thumb" src="{{url}}" alt="{{canvasTitle}} title="{{canvasTitle}}">',
      '<span class="spinner"><i class="fa fa-circle-o-notch fa-spin fa-3x fa-fw"></i></span>',
      '<span class="failed"><i class="fa fa-ban fa-3x fa-fw"></i></span>',
      '<span class="thumb-failed"><i class="fa fa-picture-o fa-3x fa-fw"></i></span>',
      '</div>',
      '<form>',
      '<div>',
      '<input class="visibility-toggle" data-imageid="{{imageId}}" type=checkbox {{#if visibility}}checked{{/if}}>',
      '<label> {{this.visibleLabel}}</label>',
      '</div>',
      '<label>{{this.opacityLabel}} <span class="opacity-label {{#unless visibility}}disabled{{/unless}}" data-imageid="{{imageId}}">',
      '{{#unless visibility}}({{this.dsabledOpacityLabel}}){{else}}({{opacity}})%{{/unless}}',
      '</span></label>',
      '<input class="opacity-slider" data-imageid="{{imageId}}" type="range" min="0" max="100" step="2" value="{{opacity}}" {{#unless visibility}}disabled{{/unless}}>',
      '</form>',
      '</li>',
      '{{/each}}',
      '</ul>',
      '{{else}}',
      '<h4>{{emptyTemplateMessage}}</h4>',
      '{{/if}}',
      '<div class="disabled-overlay">',
      '<h3>{{disabledLayersTabMessage}}</h3>',
      '</div>',
      '</div>',
    ].join(''))
  };

}(Mirador));
