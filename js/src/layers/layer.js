// Base component for each layer

/**
 * Contains:
 *
 *  [visible]  (Thumbnail)  Name [ more options (dropdown)]
 *  [locked]
 */

/**
 * TODO state machine for each layers operation ?
 */


(function ($) {

  $.Layer = function (options) {
    jQuery.extend(true, this, {
      element: null,
      appendTo: null,
      manifest: null,
      visible: null,
      state: null,
      zIndex: null,
      imageResource: null,
      eventEmitter: null
    }, options);
    this.init();
  };

  $.Layer.prototype = {
    init: function () {
      var _this = this;
      this.model = new LayerViewModel(this.imageResource);

      this.view = jQuery(this.render(this.model));
      this.attachViewEvents(this.view);
      this.initLayoutEffectsSliders(this.view);
      this.counter = 0;

      this.transformEnabledEvent = this.eventEmitter.subscribe(_this.windowId + ':layers-transform-resource-enabled', function (event, resource) {
        if (_this.imageResource.getId() === resource.getId()) {
          _this.onTransformModeEnabled();
        }

      });

      this.transformDisabledEvent = this.eventEmitter.subscribe(_this.windowId + ':layers-transform-resource-disabled', function (event, resource) {
        if (_this.imageResource.getId() === resource.getId()) {
          _this.onTransformModeDisabled();
        }
      });

    },
    render: function (model) {
      return this.template(model);
    },
    getView: function () {
      return this.view;
    },
    attachViewEvents: function (element) {
      element.find('.layer-config').click(this.handleLayerConfigClick.bind(this));
      element.find('.layer-visible input').click(this.handleVisibilityClick.bind(this));
      element.find('.layer-control.layer-effects input').click(this.handleLayerEffectsControl.bind(this));
      element.find('.layer-control.layer-remove').click(this.handleLayoutRemove.bind(this));
      element.find('.layer-control.layer-transform').click(this.handleLayoutTransform.bind(this));
      element.find('.layer-control.layer-lock input').click(this.handleLockClick.bind(this));
      element.find('.layer-transform-actions .save').click(this.handleTransformModeSave.bind(this));
      element.find('.layer-transform-actions .cancel').click(this.handleTransformModeCancel.bind(this));
    },
    handleTransformModeSave:function(){
      this.eventEmitter.publish(this.windowId + ':layers-transform-resource-mode-changed', [this.imageResource,true]);
    },
    handleTransformModeCancel:function(){
      this.eventEmitter.publish(this.windowId + ':layers-transform-resource-mode-changed', [this.imageResource,false]);
    },
    handleLayoutTransform: function () {
      if(!this.transformModeEnabled){
        this.eventEmitter.publish(this.windowId + ':layers-transform-resource-mode-changed', [this.imageResource]);
      }
    },
    handleLayoutRemove: function () {
      this.eventEmitter.publish(this.windowId + ':layers-remove-resource', [this.imageResource]);
    },
    destroy: function () {
      this.eventEmitter.unsubscribe(this.transformEnabledEvent.eventName,this.transformEnabledEvent.handler);
      this.eventEmitter.unsubscribe(this.transformDisabledEvent.eventName,this.transformDisabledEvent.handler);
      this.view.remove();
    },
    initLayoutEffectsSliders: function (element) {
      this.initOpacitySlider(element);
    },
    initOpacitySlider: function (element) {
      var _this = this;
      var opacitySliderValue = element.find('.layer-effects-container .opacity-slider-value');
      element.find('.layer-effects-container .layer-control-slider.opacity-slider').slider({
        value: 100,
        max: 100,
        min: 0,
        slide: function (event, ui) {
          var opacity = ui.value;
          _this.imageResource.setOpacity(ui.value / 100);
          opacitySliderValue.html(opacity);
        }
      });
    },
    handleLayerEffectsControl: function () {
      this.view.find('.layer-effects-container').toggleClass('hide').toggleClass('show');
    },
    handleVisibilityClick: function () {
      this.eventEmitter.publish(this.windowId + ':layers-visibility-change', [this.imageResource]);
    },
    handleLockClick: function () {
      this.eventEmitter.publish(this.windowId + ':layers-lock-resource', [this.imageResource]);
      this.view.find('.layer-control.layer-remove').toggleClass('disabled');
      this.view.find('.layer-control.layer-transform').toggleClass('disabled');
    },
    handleLayerConfigClick: function () {
    },
    onTransformModeEnabled: function () {
      this.transformModeEnabled = true;
      this.disableControls();
      this.showTransformModeView();
    },
    onTransformModeDisabled: function () {
      this.transformModeEnabled = false;
      this.enableControls();
      this.hideTransformModeView();
    },
    disableControls: function () {
      this.view.find('.layer-control.layer-visible').addClass('disabled');
      this.view.find('.layer-control.layer-lock').addClass('disabled');
      this.view.find('.layer-control.layer-effects').addClass('disabled');
      this.view.find('.layer-control.layer-remove').addClass('disabled');
      this.view.find('.layer-effects-container').addClass('hide').removeClass('show');
    },
    enableControls: function () {
      this.view.find('.layer-control.layer-visible').removeClass('disabled');
      this.view.find('.layer-control.layer-lock').removeClass('disabled');
      this.view.find('.layer-control.layer-effects').removeClass('disabled');
      this.view.find('.layer-control.layer-remove').removeClass('disabled');
    },
    showTransformModeView: function () {
      this.view.find('.layer-transform-container').toggleClass('hide').toggleClass('show');
    },
    hideTransformModeView: function () {
      this.view.find('.layer-transform-container').toggleClass('hide').toggleClass('show');
    },
    getModel: function () {
      return this.model;
    },
    template: $.Handlebars.compile([
      '<li class="layer" id="{{getId}}">',
      '<div class="drag-handle"> ',
      '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M20 9H4v2h16V9zM4 15h16v-2H4v2z"/></svg>',
      '</div>',
      '<section class="main-section">',
      '<div class="clearfix">',
      '<div class="thumbnail-image"><img src="{{getThumbnail}}"></div>',
      '<div class="content">',
      '<div class="title"><span  title="{{getTitle}}" class="id">{{getTitle}}</span></div>',
      '<div class="horizontal-menu">',
      '<label class="layer-control layer-visible"><input type="checkbox" name="" checked /><i></i></label>',
      '<label class="layer-control layer-lock {{#if isHardLocked}}disabled{{/if}}"><input type="checkbox" {{#if isLocked }} checked{{/if}} {{#if isHardLocked}}disabled="disabled"{{/if}} name="" /><i></i></label>',
      '<label class="layer-control layer-transform {{#if isHardLocked}}disabled{{/if}} "><i class="fa fa-expand" aria-hidden="true"></i></label>',
      '<label class="layer-control layer-effects"><input type="checkbox" name="" checked /><i></i></label>',
      '<label class="layer-control layer-remove  {{#if isHardLocked}}disabled{{/if}}"><i class="fa fa-times" aria-hidden="true"></i></label>',
      '</div>',
      // '<div class="reset-button"><label class="layer-control layer-reset"><i class="fa fa-refresh" aria-hidden="true"></i></label></div>',
      '</div>',
      '</div>',
      '<div class="layer-effects-container hide">',
      '<div class="layer-control-slider-container"><label><i class="fa fa-adjust"></i></label><div class="layer-control-slider opacity-slider"></div> <span class="opacity-slider-value">100</span> </div>',
      // '<div class="layer-control-slider-container"><label><i class="material-icons">brightness_6</i></label><div class="layer-control-slider brightness-slider"></div></div>',
      // '<div class="layer-control-slider-container"><label><i class="material-icons">wb_sunny</i></label><div class="layer-control-slider contrast-slider"></div></div>',
      '</div>',
      '<div class="layer-transform-container hide">',
      '<div class="layer-transform-actions"><span class="save"><i class="fa fa-check" aria-hidden="true"></i>Save</span> <span class="cancel"><i class="fa fa-times"></i>Cancel</span></div>',
      '</div>',
      '</section>',
      '</li>'
    ].join(''))


  };

  var LayerViewModel = function (imageResource) {
    this.imageResource = imageResource;
  };

  LayerViewModel.prototype = {
    isLocked: function () {
      return this.imageResource.isLocked();
    },
    isHardLocked: function () {
      return this.imageResource.isHardLocked();
    },
    getId: function () {
      return this.imageResource.id;
    },
    getTitle: function () {
      return this.imageResource.imageInIIIF.label ? this.imageResource.imageInIIIF.label : this.imageResource.label;
    },
    getImage: function () {
      return this.imageResource.imageInIIIF;
    },
    getThumbnail: function () {
     return $.Iiif.getThumbnailForImage(this.getImage(),128);
    }
  };

}(Mirador));
