(function($) {

  $.Hud = function(options) {

    jQuery.extend(this, {
      element:   null,
      parent:    null,
      windowId:  null,
      annoState: null,
      showAnnotations: true,
      annoEndpointAvailable: false,
      fullScreenAvailable: true
    }, options);

    this.init();
  };

  $.Hud.prototype = {

    init: function() {   
      this.createStateMachine();

      this.element = jQuery(this.template({
        showNextPrev : this.showNextPrev, 
        showBottomPanel : typeof this.bottomPanelAvailable === 'undefined' ? true : this.bottomPanelAvailable,
        showAnno : this.annotationLayerAvailable,
        showFullScreen : this.fullScreenAvailable
      })).appendTo(this.appendTo);

      if (this.annotationLayerAvailable && this.annoEndpointAvailable) {
        this.contextControls = new $.ContextControls({
          element: null,
          container: this.appendTo,
          mode: 'displayAnnotations',
          parent: this,
          windowId: this.windowId,
          annotationCreationAvailable: this.annotationCreationAvailable
        });
      }

      this.bindEvents();

      if (typeof this.bottomPanelAvailable !== 'undefined' && !this.bottomPanelAvailable) {
        jQuery.publish('SET_BOTTOM_PANEL_VISIBILITY.' + this.windowId, false);
      } else {
        jQuery.publish('SET_BOTTOM_PANEL_VISIBILITY.' + this.windowId, null);
      }
    },

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
            jQuery.publish(('windowUpdated'), {
              id: _this.windowId,
              annotationState: to
            });
          },
          ondisplayOn: function(event, from, to) { 
            if (_this.annoEndpointAvailable) {
              _this.parent.element.find('.mirador-osd-annotations-layer').fadeOut(duration, function() {      
                _this.contextControls.show();
              });              
            } else {
              _this.parent.element.find('.mirador-osd-annotations-layer').addClass("selected");
            }
            jQuery.publish('modeChange.' + _this.windowId, 'displayAnnotations');
            jQuery.publish(('windowUpdated'), {
              id: _this.windowId,
              annotationState: to
            });
          },
          onrefreshCreateOff: function(event, from, to) {
            jQuery.publish('modeChange.' + _this.windowId, 'displayAnnotations');
            jQuery.publish(('windowUpdated'), {
              id: _this.windowId,
              annotationState: to
            });
          },
          oncreateOn: function(event, from, to) {
            function enableEditingAnnotations() {
              _this.parent.element.find('.mirador-osd-edit-mode').addClass("selected");
              jQuery.publish('modeChange.' + _this.windowId, 'editingAnnotations');
            }
            if (_this.annoEndpointAvailable) {
              if (from === "annoOff") {
                _this.parent.element.find('.mirador-osd-annotations-layer').fadeOut(duration, function() {      
                  _this.contextControls.show();
                  enableEditingAnnotations();
                });
              } else {
                enableEditingAnnotations();
              }
            }
            jQuery.publish(('windowUpdated'), {
              id: _this.windowId,
              annotationState: to
            });
          },
          onrefreshCreateOn: function(event, from, to) {
            jQuery.publish('modeChange.' + _this.windowId, 'editingAnnotations');
            jQuery.publish(('windowUpdated'), {
              id: _this.windowId,
              annotationState: to
            });
          },
          oncreateOff: function(event, from, to) { 
            _this.parent.element.find('.mirador-osd-edit-mode').removeClass("selected");
            jQuery.publish('modeChange.' + _this.windowId, 'displayAnnotations');
            jQuery.publish(('windowUpdated'), {
              id: _this.windowId,
              annotationState: to
            });
          },
          ondisplayOff: function(event, from, to) { 
            if (_this.annoEndpointAvailable) {
              _this.parent.element.find('.mirador-osd-edit-mode').removeClass("selected");
              _this.contextControls.hide(function() {
                _this.parent.element.find('.mirador-osd-annotations-layer').fadeIn(duration);
              }
              );
            } else {
              _this.parent.element.find('.mirador-osd-annotations-layer').removeClass("selected");
            }
            jQuery.publish('modeChange.' + _this.windowId, 'default');
            jQuery.publish(('windowUpdated'), {
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
                                 '{{#if showFullScreen}}',
                                 '<a class="mirador-osd-fullscreen hud-control" role="button" aria-label="Toggle fullscreen">',
                                 '<i class="fa fa-expand"></i>',
                                 '</a>',
                                 '{{/if}}',
                                 '{{#if showAnno}}',
                                 '<a class="mirador-osd-annotations-layer hud-control " role="button" aria-label="Toggle annotations">',
                                 '<i class="fa fa-lg fa-comments"></i>',
                                 '</a>',
                                 '{{/if}}',
                                 '{{#if showNextPrev}}',
                                 '<a class="mirador-osd-next hud-control ">',
                                 '<i class="fa fa-3x fa-chevron-right"></i>',
                                 '</a>',
                                 '{{/if}}',
                                 '{{#if showBottomPanel}}',
                                 '<a class="mirador-osd-toggle-bottom-panel hud-control " role="button" aria-label="Toggle Bottom Panel">',
                                 '<i class="fa fa-2x fa-ellipsis-h"></i>',
                                 '</a>',
                                 '{{/if}}',
                                 '<div class="mirador-pan-zoom-controls hud-control ">',
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
                                 '</div>'
    ].join(''))

  };

}(Mirador));
