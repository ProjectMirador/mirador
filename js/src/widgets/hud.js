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
      this.createStateMachines();

      this.element = jQuery(this.template({
        showNextPrev : this.showNextPrev,
        showBottomPanel : typeof this.bottomPanelAvailable === 'undefined' ? true : this.bottomPanelAvailable,
        showAnno : this.canvasControls.annotations.annotationLayer,
        showImageControls : this.canvasControls.imageManipulation.manipulationLayer
      })).appendTo(this.appendTo);

      this.contextControls = new $.ContextControls({
        element: null,
        container: this.element.find('.mirador-osd-context-controls'),
        mode: 'displayAnnotations',
        windowId: this.windowId,
        canvasControls: this.canvasControls,
        annoEndpointAvailable: this.annoEndpointAvailable,
        availableAnnotationTools: this.availableAnnotationTools,
        eventEmitter: this.eventEmitter,
        state: this.state
      });

      this.bindEvents();
    },

    bindEvents: function() {
      var _this = this;
    },

    createStateMachines: function() {
      var _this = this,
      duration = "200";

      //add more to these as AnnoState becomes more complex
      //initial state is 'none'
      this.annoState = StateMachine.create({
        events: [
          { name: 'startup',  from: 'none',  to: 'annoOff' },
          { name: 'displayOn',  from: 'annoOff',  to: 'annoOnCreateOff' },
          { name: 'refreshCreateOff',  from: 'annoOnCreateOff',  to: 'annoOnCreateOff' },
          { name: 'createOn', from: ['annoOff','annoOnCreateOff', 'annoOnCreateOn'], to: 'annoOnCreateOn' },
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
            _this.eventEmitter.publish('HUD_ADD_CLASS.'+_this.windowId, ['.mirador-osd-annotations-layer', 'selected']);
            if (_this.annoEndpointAvailable) {
                  _this.contextControls.annotationShow();
            }
            _this.eventEmitter.publish('modeChange.' + _this.windowId, 'displayAnnotations');
            _this.eventEmitter.publish('HUD_ADD_CLASS.'+_this.windowId, ['.mirador-osd-pointer-mode', 'selected']);
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
          oncreateOn: function(event, from, to, shape) {
            // function enableEditingAnnotations() {
            //   _this.eventEmitter.publish('HUD_ADD_CLASS.'+_this.windowId, ['.mirador-osd-edit-mode', 'selected']);
            //   _this.eventEmitter.publish('modeChange.' + _this.windowId, 'editingAnnotations');
            // }
            // if (_this.annoEndpointAvailable) {
            //   if (from === "annoOff") {
            //     _this.contextControls.annotationShow();
            //     enableEditingAnnotations();
            //   } else {
            //     enableEditingAnnotations();
            //   }
            // }
            _this.eventEmitter.publish('HUD_REMOVE_CLASS.'+_this.windowId, ['.mirador-osd-pointer-mode', 'selected']);
            _this.eventEmitter.publish('HUD_REMOVE_CLASS.'+_this.windowId, ['.mirador-osd-edit-mode', 'selected']);
            _this.eventEmitter.publish('HUD_ADD_CLASS.'+_this.windowId, ['.mirador-osd-'+shape+'-mode', 'selected']);
            _this.eventEmitter.publish('modeChange.' + _this.windowId, 'editingAnnotations');
            _this.eventEmitter.publish('toggleDrawingTool.'+_this.windowId, shape);

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
            _this.eventEmitter.publish('HUD_ADD_CLASS.'+_this.windowId, ['.mirador-osd-pointer-mode', 'selected']);
            _this.eventEmitter.publish('modeChange.' + _this.windowId, 'displayAnnotations');
            _this.eventEmitter.publish(('windowUpdated'), {
              id: _this.windowId,
              annotationState: to
            });
          },
          ondisplayOff: function(event, from, to) {
            if (_this.annoEndpointAvailable) {
              _this.eventEmitter.publish('HUD_REMOVE_CLASS.'+_this.windowId, ['.mirador-osd-edit-mode', 'selected']);
              _this.contextControls.annotationHide();
            }
            _this.eventEmitter.publish('HUD_REMOVE_CLASS.'+_this.windowId, ['.mirador-osd-annotations-layer', 'selected']);
            _this.eventEmitter.publish('modeChange.' + _this.windowId, 'default');
            _this.eventEmitter.publish(('windowUpdated'), {
              id: _this.windowId,
              annotationState: to
            });
          }
        }
      });

      this.manipulationState = StateMachine.create({
        events: [
          { name: 'startup',  from: 'none',  to: 'manipulationOff' },
          { name: 'displayOn',  from: 'manipulationOff',  to: 'manipulationOn' },
          { name: 'displayOff', from: 'manipulationOn', to: 'manipulationOff' }
        ],
        callbacks: {
          onstartup: function(event, from, to) {
            _this.eventEmitter.publish(('windowUpdated'), {
              id: _this.windowId,
              manipulationState: to
            });
          },
          ondisplayOn: function(event, from, to) {
            _this.eventEmitter.publish('HUD_ADD_CLASS.'+_this.windowId, ['.mirador-manipulation-toggle', 'selected']);
            _this.contextControls.manipulationShow();
            _this.eventEmitter.publish(('windowUpdated'), {
              id: _this.windowId,
              manipulationState: to
            });
          },
          ondisplayOff: function(event, from, to) {
            _this.contextControls.manipulationHide();
            _this.eventEmitter.publish('HUD_REMOVE_CLASS.'+_this.windowId, ['.mirador-manipulation-toggle', 'selected']);
            _this.eventEmitter.publish(('windowUpdated'), {
              id: _this.windowId,
              manipulationState: to
            });
          }
        }
      });
    },

    template: Handlebars.compile([
                                 '<div class="mirador-hud">',
                                 '{{#if showNextPrev}}',
                                 '<a class="mirador-osd-previous hud-control ">',
                                 '<i class="fa fa-3x fa-chevron-left "></i>',
                                 '</a>',
                                 '{{/if}}',
                                 '<div class="mirador-osd-context-controls hud-container">',
                                 '{{#if showAnno}}',
                                  '<div class="mirador-osd-annotation-controls">',
                                  '<a class="mirador-osd-annotations-layer hud-control" role="button" aria-label="Toggle annotations">',
                                  '<i class="fa fa-lg fa-comments"></i>',
                                  '</a>',
                                  '</div>',
                                 '{{/if}}',
                                 '{{#if showImageControls}}',
                                  '<div class="mirador-manipulation-controls">',
                                  '<a class="mirador-manipulation-toggle hud-control" role="button" aria-label="Toggle image manipulation">',
                                  '<i class="material-icons">tune</i>',
                                  '</a>',
                                  '</div>',
                                 '{{/if}}',
                                 '</div>',
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
                                 '</div>'
    ].join(''))

  };

}(Mirador));
