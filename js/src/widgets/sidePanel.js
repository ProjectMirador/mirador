(function($) {

  $.SidePanel= function(options) {
    jQuery.extend(true, this, {
      element:           null,
      appendTo:          null,
      manifest:          null,
      panelState:        {},
      tocTabAvailable:   null,
      annotationsTabAvailable: false,
      layersTabAvailable: false,
      searchTabAvailable: null,
      hasStructures:     false,
      state:             null,
      eventEmitter:      null
    }, options);

    this.init();
  };

  $.SidePanel.prototype = {
    init: function() {
      var _this = this;

      this.updateState({
        tabs : [
          {
            name : 'toc',
            options : {
              available: _this.tocTabAvailable,
              id:'tocTab',
              label: i18next.t('tabTitleIndex')
            }
          },
          {
           name : 'annotations',
           options : {
           available: _this.annotationsTabAvailable,
           id:'annotationsTab',
           label:'Anno.'
           }
          },
          {
            name : 'search',
            options : {
              available: _this.searchTabAvailable,
              id: 'searchTab',
              label: i18next.t('tabTitleSearch')
            }
          },
          {
            name : 'layers',
            options : {
              available: _this.layersTabAvailable,
              id:'layersTab',
              label: i18next.t('tabTitleLayers')
            }
          },
        ],
        width: 280,
        open: true
      }, true);

      this.listenForActions();
      this.render(this.updateState());

      this.loadSidePanelComponents();
    },

    loadSidePanelComponents: function() {
      var _this = this;

      new $.Tabs({
        windowId: this.windowId,
        appendTo: this.appendTo,
        tabs : this.panelState.tabs,
        hasStructures : this.hasStructures,
        eventEmitter: this.eventEmitter
      });

      if (this.tocTabAvailable) {
        new $.TableOfContents({
          structures: this.manifest.getStructures(),
          appendTo: this.element.find('.tabContentArea'),
          windowId: this.windowId,
          canvasID: this.canvasID,
          manifestVersion: this.manifest.getVersion(),
          eventEmitter: this.eventEmitter
        });
      }
      if (_this.annotationsTabAvailable) {
        new $.AnnotationsTab({
          manifest: _this.manifest,
          windowId: this.windowId,
          appendTo: _this.element.find('.tabContentArea'),
          state: _this.state,
          eventEmitter: _this.eventEmitter
        });
      }
      if (_this.searchTabAvailable) {
        new $.SearchTab({
          manifest: _this.manifest,
          windowId: this.windowId,
          appendTo: _this.element.find('.tabContentArea'),
          state: _this.state,
          manifestVersion: this.manifest.getVersion(),
          eventEmitter: _this.eventEmitter
        });
      }
      if (_this.layersTabAvailable) {
        new $.LayersTab({
          manifest: _this.manifest,
          windowId: _this.windowId,
          appendTo: _this.element.find('.tabContentArea'),
          canvasID: _this.canvasID,
          canvases: _this.canvases,
          state: _this.state,
          eventEmitter: _this.eventEmitter
        });
      }

    },

    update: function(name, availability) {
      var updatedState = this.panelState;
      jQuery.each(updatedState.tabs, function(index, value) {
        if (value.name === name) {
          value.options.available = availability;
        }
      });
      this.updateState(updatedState);
    },

    updateState: function(newState, initial) {
      var _this = this;
      if (!arguments.length) return this.panelState;
      jQuery.extend(true, this.panelState, newState);

      if (!initial) {
        _this.eventEmitter.publish('sidePanelStateUpdated.' + this.windowId, this.panelState);
      }

      /*var enableSidePanel = false;
       jQuery.each(this.panelState.tabs, function(index, value) {
       if (value.options.available) {
       enableSidePanel = true;
       }
       });

       this.toggle(enableSidePanel);*/

      return this.panelState;
    },

    panelToggled: function() {
      var currentState = this.updateState(),
          open = !currentState.open;

      currentState.open = open;
      this.updateState(currentState);
    },

    // doesn't do anything right now
    // getTemplateData: function() {
    //     return {
    //         annotationsTab: this.state().annotationsTab,
    //         tocTab: this.state().tocTab
    //     };
    // },

    listenForActions: function() {
      var _this = this;
      _this.eventEmitter.subscribe('sidePanelStateUpdated.' + this.windowId, function(_, data) {
        _this.render(data);
      });

      _this.eventEmitter.subscribe('sidePanelResized', function() {
      });

      _this.eventEmitter.subscribe('sidePanelToggled.' + this.windowId, function() {
        _this.panelToggled();
      });

      _this.eventEmitter.subscribe('annotationListLoaded.' + _this.windowId, function(event) {
        var windowObject = _this.state.getWindowObjectById(_this.windowId);
        if (windowObject.annotationsAvailable[windowObject.viewType]) {
          if (_this.state.getWindowAnnotationsList(_this.windowId).length > 0) {
            _this.update('annotations', true);
          }
        }
      });

      _this.eventEmitter.subscribe('currentCanvasIDUpdated.' + _this.windowId, function(event, newCanvasId) {
        _this.canvasID = newCanvasId;
      });

    },

    render: function(renderingData) {
      var _this = this;
      if (!this.element) {
        this.element = this.appendTo;
        jQuery(_this.template(renderingData)).appendTo(_this.appendTo);
        return;
      }
    },

    template: $.Handlebars.compile([
      '<div class="tabContentArea">',
      '<ul class="tabGroup">',
      '</ul>',
      '</div>'
    ].join('')),

    toggle: function (enableSidePanel) {
      var _this = this;
      if (!enableSidePanel) {
        jQuery(this.appendTo).hide();
        _this.eventEmitter.publish('ADD_CLASS.'+this.windowId, 'focus-max-width');
        _this.eventEmitter.publish('HIDE_ICON_TOC.'+this.windowId);
      } else {
        jQuery(this.appendTo).show({effect: "fade", duration: 300, easing: "easeInCubic"});
        _this.eventEmitter.publish('REMOVE_CLASS.'+this.windowId, 'focus-max-width');
        _this.eventEmitter.publish('SHOW_ICON_TOC.'+this.windowId);
      }
    }
  };

}(Mirador));
