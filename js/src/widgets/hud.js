(function($) {

  $.Hud = function(options) {

    jQuery.extend(this, {
      element:   null,
      windowId:  null,
      annoState: null,
      showAnnotations: true,
      annoEndpointAvailable: false,
      eventEmitter: null
    }, options);

    this.init();
  };

  $.Hud.prototype = {

    init: function() {   
      this.createStateMachine();

      this.element = jQuery(this.template({
        showNextPrev : this.showNextPrev, 
        showBottomPanel : typeof this.bottomPanelAvailable === 'undefined' ? true : this.bottomPanelAvailable,
        showAnno : this.annotationLayerAvailable
      })).appendTo(this.appendTo);

      if (this.annotationLayerAvailable && this.annoEndpointAvailable) {
        this.contextControls = new $.ContextControls({
          element: null,
          container: this.appendTo,
          mode: 'displayAnnotations',
          windowId: this.windowId,
          annotationCreationAvailable: this.annotationCreationAvailable,
          availableTools: this.availableTools,
          eventEmitter: this.eventEmitter
        });
      }

      this.bindEvents();
    },
     
    // //BH edit to allow commenting annotations when images are non-IIIF
    // bbShowAnnos: function(){
    //   this.parent.element.find(".bbAnnosContainer").show(); //imageview
    // },

    // //BH edit to allow commenting annotations when images are non-IIIF
    // bbHideAnnos: function(){
    //   this.parent.element.find(".bbAnnosContainer").hide();//imageview
    // },

    bindEvents: function() {
      var _this = this;
    },

    createStateMachine: function() {
      //add more to these as AnnoState becomes more complex
      var _this = this,
      duration = "200";
      //initial state is 'none'
      this.annoState = StateMachine.create({
        events: [
          { name: 'startup',  from: 'none',  to: 'annoOff' },
          { name: 'displayOn',  from: 'annoOff',  to: 'annoOnCreateOff' },
          { name: 'refreshCreateOff',  from: 'annoOnCreateOff',  to: 'annoOnCreateOff' },          
          { name: 'createOn', from: ['annoOff','annoOnCreateOff'], to: 'annoOnCreateOn' },
          { name: 'refreshCreateOn',  from: 'annoOnCreateOn',  to: 'annoOnCreateOn' },          
          { name: 'createOff',  from: 'annoOnCreateOn',    to: 'annoOnCreateOff' },
          { name: 'displayOff', from: ['annoOnCreateOn','annoOnCreateOff'], to: 'annoOff' }
        ],
        callbacks: {
          onstartup: function(event, from, to) {
            _this.eventEmitter.publish(('windowUpdated'), {
              id: _this.windowId,
              annotationState: to
            });
          },
          ondisplayOn: function(event, from, to) { 
            if (_this.annoEndpointAvailable) {
                _this.eventEmitter.publish('HUD_FADE_OUT.' + _this.windowId, ['.mirador-osd-annotations-layer', duration, function() {      
                  _this.contextControls.show();
                }]);
            } else {
              _this.eventEmitter.publish('HUD_ADD_CLASS.'+_this.windowId, ['.mirador-osd-annotations-layer', 'selected']);
            }
            _this.eventEmitter.publish('modeChange.' + _this.windowId, 'displayAnnotations');
            _this.eventEmitter.publish(('windowUpdated'), {
              id: _this.windowId,
              annotationState: to
            });
          },
          onrefreshCreateOff: function(event, from, to) {
            _this.eventEmitter.publish('modeChange.' + _this.windowId, 'displayAnnotations');
            _this.eventEmitter.publish(('windowUpdated'), {
              id: _this.windowId,
              annotationState: to
            });
          },
          oncreateOn: function(event, from, to) {
            function enableEditingAnnotations() {
              _this.eventEmitter.publish('HUD_ADD_CLASS.'+_this.windowId, ['.mirador-osd-edit-mode', 'selected']);
              _this.eventEmitter.publish('modeChange.' + _this.windowId, 'editingAnnotations');
            }
            if (_this.annoEndpointAvailable) {
              if (from === "annoOff") {
                _this.eventEmitter.publish('HUD_FADE_OUT.' + _this.windowId, ['.mirador-osd-annotations-layer', duration, function() {      
                  _this.contextControls.show();
                  enableEditingAnnotations();
                }]);
              } else {
                enableEditingAnnotations();
              }
            }
            _this.eventEmitter.publish(('windowUpdated'), {
              id: _this.windowId,
              annotationState: to
            });
          },
          onrefreshCreateOn: function(event, from, to) {
            _this.eventEmitter.publish('modeChange.' + _this.windowId, 'editingAnnotations');
            _this.eventEmitter.publish(('windowUpdated'), {
              id: _this.windowId,
              annotationState: to
            });
          },
          oncreateOff: function(event, from, to) { 
            _this.eventEmitter.publish('HUD_REMOVE_CLASS.'+_this.windowId, ['.mirador-osd-edit-mode', 'selected']);
            _this.eventEmitter.publish('modeChange.' + _this.windowId, 'displayAnnotations');
            _this.eventEmitter.publish(('windowUpdated'), {
              id: _this.windowId,
              annotationState: to
            });
          },
          ondisplayOff: function(event, from, to) { 

            if (_this.annoEndpointAvailable) {
              _this.eventEmitter.publish('HUD_REMOVE_CLASS.'+_this.windowId, ['.mirador-osd-edit-mode', 'selected']);
              _this.contextControls.hide(function() {
                _this.eventEmitter.publish('HUD_FADE_IN.' + _this.windowId, ['.mirador-osd-annotations-layer', duration]);
              });
            } else {
              _this.eventEmitter.publish('HUD_REMOVE_CLASS.'+_this.windowId, ['.mirador-osd-annotations-layer', 'selected']);
            }
            _this.eventEmitter.publish('modeChange.' + _this.windowId, 'default');
            _this.eventEmitter.publish(('windowUpdated'), {
              id: _this.windowId,
              annotationState: to
            });
          }
        }
      });
    },

    template: Handlebars.compile([
                                 '{{#if showNextPrev}}',
                                 '<a class="mirador-osd-previous hud-control ">',
                                 '<i class="fa fa-3x fa-chevron-left "></i>',
                                 '</a>',
                                 '{{/if}}',
                                 '{{#if showAnno}}',
                                 '<a class="mirador-osd-annotations-layer hud-control" role="button" aria-label="Toggle annotations">',
                                 '<i class="fa fa-lg fa-comments"></i>',
                                 '</a>',
                                 '{{/if}}',
                                 '{{#if showNextPrev}}',
                                 '<a class="mirador-osd-next hud-control ">',
                                 '<i class="fa fa-3x fa-chevron-right"></i>',
                                 '</a>',
                                 '{{/if}}',
                                 '{{#if showBottomPanel}}',
                                 '<a class="mirador-osd-toggle-bottom-panel hud-control" role="button" aria-label="Toggle Bottom Panel">',
                                 '<i class="fa fa-2x fa-ellipsis-h"></i>',
                                 '</a>',
                                 '{{/if}}',
                                 '<div class="mirador-pan-zoom-controls hud-control">',
                                 '<a class="mirador-osd-up hud-control" role="button" aria-label="Move image up">',
                                 '<i class="fa fa-chevron-circle-up"></i>',
                                 '</a>',
                                 '<a class="mirador-osd-right hud-control" role="button" aria-label="Move image right">',
                                 '<i class="fa fa-chevron-circle-right"></i>',
                                 '</a>',
                                 '<a class="mirador-osd-down hud-control" role="button" aria-label="Move image down">',
                                 '<i class="fa fa-chevron-circle-down"></i>',
                                 '</a>',
                                 '<a class="mirador-osd-left hud-control" role="button" aria-label="Move image left">',
                                 '<i class="fa fa-chevron-circle-left"></i>',
                                 '</a>',
                                 '<a class="mirador-osd-zoom-in hud-control" role="button" aria-label="Zoom in">',
                                 '<i class="fa fa-plus-circle"></i>',
                                 '</a>',
                                 '<a class="mirador-osd-zoom-out hud-control" role="button" aria-label="Zoom out">',
                                 '<i class="fa fa-minus-circle"></i>',
                                 '</a>',
                                 '<a class="mirador-osd-go-home hud-control" role="button" aria-label="Reset image bounds">',
                                 '<i class="fa fa-home"></i>',
                                 '</a>',
                                 '</div>',
                                 '<div title="View Image Manipulation Tools" class="mirador-pan-zoom-toggle hud-control">',
                                 '<img class="viewImgManip closed" src="../brokenBooks/images/imageadjust.png">',
                                 '</div>',
                                 '<div class="mirador-img-manipulation hud-control">',
                                 '<div title="Change Image Brightness" class="mirador-osd-brightness hud-control">',
                                 '<span>Brightness</span>',
                                 '<span class="brightnessSlider"></span>',
                                 '<img class="imgManipIcon" src="../brokenBooks/images/brightness.png">',
                                 '</div>',
                                 '<div title="Change Image Contrast" class="mirador-osd-contrast hud-control">',
                                 '<span>Contrast</span>',
                                 '<span class="contrastSlider"></span>',
                                 '<img class="imgManipIcon" src="../brokenBooks/images/contrast.png">',
                                 '</div>',
                                 '<a title="Toggle Grayscale" class="mirador-osd-toggle-grayscale hud-control">',
                                 '<span>Grayscale</span><img class="imgManipIcon" src="../brokenBooks/images/grayscale.png">',
                                 '</a>',
                                 '<a title="Invert Colors" class="mirador-osd-toggle-invert hud-control">',
                                 '<span>Invert<span><img class="imgManipIcon" src="../brokenBooks/images/invert.png">',
                                 '</a>',
                                 '<a title="Rotate +180 degrees" class="mirador-osd-flip hud-control">',
                                 '<i class="fa fa-refresh"></i>',
                                 '</a>',
                                 '<a title="Rotate +90 degrees" class="mirador-osd-positive-rotate hud-control">',
                                 '<i class="fa fa-rotate-right"></i>',
                                 '</a>',
                                 '<a title="Rotate -90 degrees" class="mirador-osd-negative-rotate hud-control">',
                                 '<i class="fa fa-rotate-left"></i>',
                                 '</a>',
                                 '<a title="Remove Tool Effects" class="mirador-osd-filters-off hud-control">',
                                 '<span>RESET</span>',
                                 '</a>',
                                 '</div>'
    ].join(''))

  };

}(Mirador));
