(function($) {

  $.SidePanel= function(options) {
    jQuery.extend(true, this, {
      element:           null,
      appendTo:          null,
      manifest:          null,
      panelState:        {},
      tocTabAvailable:   false,
      annotationsTabAvailable: false,
      layersTabAvailable: false,
      toolsTabAvailable: false,
      hasStructures:     false
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
              label:'Index'
            }
          },
          /*{
           name : 'annotations',
           options : {
           available: _this.annotationsTabAvailable,
           id:'annotationsTab', 
           label:'Annotations'
           }
           },*/
          {
            name : 'layers',
            options : {
              available: _this.layersTabAvailable,
              id:'layersTab', 
              label:'Layers'
            }
          },
          /*{
           name : 'tools',
           options : {
           available: _this.toolsTabAvailable,
           id:'toolsTab', 
           label:'Tools'
           }
           }*/
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
        hasStructures : this.hasStructures
      });

      if (this.tocTabAvailable) {
        new $.TableOfContents({
          structures: this.manifest.getStructures(),
          appendTo: this.element.find('.tabContentArea'),
          windowId: this.windowId,
          canvasID: this.canvasID,
          manifestVersion: this.manifest.getVersion()
        });
      }
      if (_this.annotationsTabAvailable) {
        new $.AnnotationsTab({
          manifest: _this.manifest,
          windowId: this.windowId,
          appendTo: _this.element.find('.tabContentArea'),
          state: _this.state
        });
      }
      if (_this.layersTabAvailable) {
        new $.LayersTab({
          manifest: _this.manifest,
          windowId: this.windowId,
          appendTo: _this.element.find('.tabContentArea'),
          canvasID: this.canvasID,
          state: _this.state
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
      if (!arguments.length) return this.panelState;
      jQuery.extend(true, this.panelState, newState);

      if (!initial) {
        jQuery.publish('sidePanelStateUpdated.' + this.windowId, this.panelState);
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
      jQuery.subscribe('sidePanelStateUpdated.' + this.windowId, function(_, data) {
        _this.render(data);
      });

      jQuery.subscribe('sidePanelResized', function() {
      });

      jQuery.subscribe('sidePanelToggled.' + this.windowId, function() {
        _this.panelToggled();
      });

      jQuery.subscribe('annotationListLoaded.' + _this.windowId, function(event) {
        var windowObject = _this.state.getWindowObjectById(_this.windowId);
        if (windowObject.annotationsAvailable[windowObject.viewType]) {
          if (_this.state.getWindowAnnotationsList(_this.windowId).length > 0) {
            _this.update('annotations', true);
          }
        }
      });

      jQuery.subscribe('currentCanvasIDUpdated.' + _this.windowId, function(event, newCanvasId) {
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

      if (renderingData.open) {
        this.appendTo.removeClass('minimized');
      } else {
        this.appendTo.addClass('minimized');
      }
    },

    template: Handlebars.compile([
      '<div class="tabContentArea">',
      '<ul class="tabGroup">',
      '</ul>',
      '</div>'
    ].join('')),

    toggle: function (enableSidePanel) {
      if (!enableSidePanel) {
        jQuery(this.appendTo).hide();
        jQuery.publish('ADD_CLASS.'+this.windowId, 'focus-max-width');
        jQuery.publish('HIDE_ICON_TOC.'+this.windowId);                
      } else {
        jQuery(this.appendTo).show({effect: "fade", duration: 300, easing: "easeInCubic"});
        jQuery.publish('REMOVE_CLASS.'+this.windowId, 'focus-max-width');
        jQuery.publish('SHOW_ICON_TOC.'+this.windowId);                
      }
    }
  };

}(Mirador));
