(function($) {

  $.Window = function(options) {

    jQuery.extend(this, {
      state:             null,
      eventEmitter:      null,
      element:           null,
      scrollImageRatio:  0.9,
      canvasID:          null,
      currentCanvasModel: null,
      focusImages:       [],
      imagesList:        null,
      canvasModels:      null,
      annotationsList:   [],
      endpoint:          null,
      currentImageMode:  'ImageView',
      imageModes:        ['ImageView', 'BookView'],
      originalImageModes:['ImageView', 'BookView'],
      focuses:           ['ThumbnailsView', 'ImageView', 'ScrollView', 'BookView'],
      focusModules:           {'ThumbnailsView': null, 'ImageView': null, 'ScrollView': null, 'BookView': null},
      focusOverlaysAvailable: {
        'ThumbnailsView': {
          'overlay' : {'MetadataView' : false},
          'bottomPanel' : {'' : false}
        },
        'ImageView': {
          'overlay' : {'MetadataView' : false},
          'bottomPanel' : {'ThumbnailsView' : true}
        },
        'ScrollView': {
          'overlay' : {'MetadataView' : false},
          'bottomPanel' : {'' : false}
        },
        'BookView': {
          'overlay' : {'MetadataView' : false},
          'bottomPanel' : {'ThumbnailsView' : true}
        }
      },
      windowOptions: null,
      sidePanel: null, //the actual module for the side panel
      annotationsAvailable: {
        'ThumbnailsView' : false,
        'ImageView' : true,
        'ScrollView' : false,
        'BookView' : false
      },
      bottomPanel: null, //the actual module for the bottom panel
      overlay: null,
      annoEndpointAvailable : false,
      iconClasses: {
        "ImageView" : "fa fa-photo fa-lg fa-fw",
        "BookView" : "fa fa-columns fa-lg fa-fw",
        "ScrollView" : "fa fa-ellipsis-h fa-lg fa-fw",
        "ThumbnailsView" : "fa fa-th fa-lg fa-rotate-90 fa-fw"
      },
      userButtons: null
    }, options);

    this.init();
    this.bindAnnotationEvents();

  };

  $.Window.prototype = {
    init: function () {
      var _this = this,
          manifest = _this.manifest.jsonLd,
          focusState = _this.viewType,
          templateData = {};

      this.events = [];

      //make sure annotations list is cleared out when changing objects within window
      while(_this.annotationsList.length > 0) {
        _this.annotationsList.pop();
      }
      //unsubscribe from stale events as they will be updated with new module calls
      _this.eventEmitter.unsubscribe(('currentCanvasIDUpdated.' + _this.id));
      //make sure annotation-related events are destroyed so things work properly as we switch between objects
      _this.eventEmitter.publish('DESTROY_EVENTS.'+_this.id);

      _this.removeBookView();

      //reset imagemodes and then remove any imageModes that are not available as a focus
      //add getting rtl value
      if(_this.manifest.getViewingDirection() == 'right-to-left'){
        _this.vDirectionStatus = 'rtl';
      }
      else{
        _this.vDirectionStatus = '';
      }
      this.imageModes = this.originalImageModes;
      this.imageModes = jQuery.map(this.imageModes, function(value, index) {
        if (jQuery.inArray(value, _this.focuses) === -1) return null;
        return value;
      });

      _this.imagesList = _this.manifest.getCanvases();
      if (_this.imagesList.length === 1) {
        _this.bottomPanelVisible = false;
      }
      if (!_this.canvasID) {
        // By default, the first in the sequence is the selected Canvas
        _this.canvasID = _this.imagesList[0]['@id'];
      }
      _this.canvases = _this.buildCanvasesIndex(_this.manifest.getCanvases());
      if(_this.vDirectionStatus == 'rtl'){
        _this.imagesListLtr = _this.imagesList.concat();
        _this.imagesListRtl = _this.imagesList.concat();
        _this.imagesListRtl.reverse();
      }
      else{
        _this.imagesListRtl = [];
        _this.imagesListLtr = [];
      }
      this.annoEndpointAvailable = !jQuery.isEmptyObject(_this.state.getStateProperty('annotationEndpoint'));
      if (!this.canvasControls.annotations.annotationLayer) {
        this.canvasControls.annotations.annotationCreation = false;
        this.annoEndpointAvailable = false;
        this.canvasControls.annotations.annotationState = 'off';
      }
      _this.getAnnotations();

      // if manipulationLayer is true,  but all individual options are set to false, set manipulationLayer to false
      if (this.canvasControls.imageManipulation.manipulationLayer) {
        this.canvasControls.imageManipulation.manipulationLayer = !Object.keys(this.canvasControls.imageManipulation.controls).every(function(element, index, array) {
          return _this.canvasControls.imageManipulation.controls[element] === false;
        });
      }

      //for use by SidePanel, which needs to know if the current view can have the annotations tab
      _this.eventEmitter.publish(('windowUpdated'), {
        id: _this.id,
        annotationsAvailable: this.annotationsAvailable
      });

      //check config
      if (typeof this.bottomPanelAvailable !== 'undefined' && !this.bottomPanelAvailable) {
        jQuery.each(this.focusOverlaysAvailable, function(key, value) {
          _this.focusOverlaysAvailable[key].bottomPanel = {'' : false};
        });
      }

      templateData.sidePanel = this.sidePanelAvailable;
      if (this.sidePanelAvailable) {
        templateData.sidePanel = !Object.keys(this.sidePanelOptions).every(function(element, index, array) {
          return _this.sidePanelOptions[element] === false;
        });
      }
      if (typeof this.overlayAvailable !== 'undefined' && !this.overlayAvailable) {
        jQuery.each(this.focusOverlaysAvailable, function(key, value) {
          _this.focusOverlaysAvailable[key].overlay = {'' : false};
        });
      } else {
        templateData.MetadataView = true;
      }

      //determine if any buttons should be hidden in template
      templateData.iconClasses = {};
      jQuery.each(this.focuses, function(index, value) {
        templateData[value] = true;
        templateData.iconClasses[value] = _this.iconClasses[value];
      });
      templateData.title = $.JsonLd.getTextValue(manifest.label);
      templateData.displayLayout = this.displayLayout;
      templateData.layoutOptions = this.layoutOptions;
      // if displayLayout is true,  but all individual options are set to false, set displayLayout to false
      if (this.displayLayout) {
        templateData.displayLayout = !Object.keys(this.layoutOptions).every(function(element, index, array) {
          return _this.layoutOptions[element] === false;
        });
      }
      templateData.currentFocusClass = _this.iconClasses[_this.viewType];
      templateData.showFullScreen = _this.fullScreen;
      templateData.userButtons = _this.userButtons;
      _this.element = jQuery(this.template(templateData)).appendTo(_this.appendTo);
      this.element.find('.manifest-info .mirador-tooltip').each(function() {
        jQuery(this).qtip({
          content: {
            text: jQuery(this).attr('title'),
          },
          position: {
            my: 'top center',
            at: 'bottom center',
            adjust: {
              method: 'shift',
              y: -11
            },
            container: _this.element,
            viewport: true
          },
          style: {
            classes: 'qtip-dark qtip-shadow qtip-rounded'
          }
        });
      });
      //TODO: this needs to switch the position when it is a right to left manifest
      this.element.find('.manifest-info .window-manifest-title').qtip({
        content: {
          text: jQuery(this).attr('title')
        },
        position: {
          my: 'top center',
          at: 'bottom left',
          adjust: {
            method: 'shift',
            x: 20,
            y: 1
          },
          container: _this.element,
          viewport: true
        },
        style: {
          classes: 'qtip-dark qtip-shadow qtip-rounded'
        }
      });
      _this.eventEmitter.publish('WINDOW_ELEMENT_UPDATED', {windowId: _this.id, element: _this.element});

      //clear any existing objects
      _this.clearViews();
      _this.clearPanelsAndOverlay();

      //window needs to listen for any events before it finishes building out the widgets, in case they publish anything
      this.listenForActions();

      //attach view and toggle view, which triggers the attachment of panels or overlays
      _this.bindNavigation();
      switch(focusState) {
      case 'ThumbnailsView':
        _this.toggleThumbnails(_this.canvasID);
        break;
      case 'ImageView':
        _this.toggleImageView(_this.canvasID);
        break;
      case 'BookView':
        _this.toggleBookView(_this.canvasID);
        break;
      case 'ScrollView':
        _this.toggleScrollView(_this.canvasID);
        break;
      default:
        break;
      }

      if (_this.state.getSlots().length <= 1) {
        _this.element.find('.remove-object-option').hide();
      }

      this.bindEvents();

      this.bottomPanelVisibility(this.bottomPanelVisible);
      this.sidePanelVisibility(this.sidePanelVisible, '0s');

      this.events.push(this.eventEmitter.subscribe('windowRemoved',function(event,id){
        if(_this.id === id){
          _this.destroy();
        }
      }));
    },

    buildCanvasesIndex: function(canvases) {
      var _this = this;

      return canvases.reduce(function(canvasesIndex, canvas, index) {
        // We want to sign all events coming out of the
        // canvas with the windowID.
        var canvasEmitter = new $.EventEmitter();

        // Provide internally-required method proxies.
        //
        // Sadly, the emitter we use in Mirador
        // does not have the "standard" node.js
        // eventEmitter interface. So we need to
        // alias or proxy its functions here.
        //
        // We use .bind(emitter) to ensure its
        // internal "this"es continue to refer
        // to itself. "this" sinks ships.
        canvasEmitter.on = canvasEmitter.subscribe.bind(canvasEmitter);
        canvasEmitter.off = canvasEmitter.unsubscribe.bind(canvasEmitter);
        canvasEmitter.emit = canvasEmitter.publish.bind(canvasEmitter);

        // Here we wrap the internal generic eventedCanvas events
        // in events signed for this window.
        canvasEmitter.subscribe('image-status-updated', function(event, imageResource) {
          _this.eventEmitter.publish('image-status-updated' + _this.id, imageResource);
        });
        canvasEmitter.subscribe('image-needed', function(event, imageResource) {
          _this.eventEmitter.publish('image-needed' + _this.id, imageResource);
        });
        canvasEmitter.subscribe('image-show', function(event, imageResource) {
          _this.eventEmitter.publish('image-show' + _this.id, imageResource);
        });
        canvasEmitter.subscribe('image-hide', function(event, imageResource) {
          _this.eventEmitter.publish('image-hide' + _this.id, imageResource);
        });
        canvasEmitter.subscribe('image-removed', function(event, imageResource) {
          _this.eventEmitter.publish('image-removed' + _this.id, imageResource);
        });
        canvasEmitter.subscribe('image-opacity-updated', function(event, imageResource) {
          _this.eventEmitter.publish('image-opacity-updated' + _this.id, imageResource);
        });

        var eventedCanvas = new iiifEventedCanvas({
          canvas: canvas,
          index: index,
          dispatcher: canvasEmitter // Each canvas gets its own emitter
        });
        canvasesIndex[canvas['@id']] = eventedCanvas;
        return canvasesIndex;
      }, {});
      // Now you can get canvases with window.canvases[CanvasID]
    },

    destroy: function(){
      var _this = this;
      this.events.forEach(function(event){
        _this.eventEmitter.unsubscribe(event.name,event.handler);
      });

      this.element.remove();
    },

    update: function(options) {
      jQuery.extend(this, options);
      if (this.windowOptions) {
        this.windowOptions.osdBounds = null;
        this.windowOptions.zoomLevel = null;
      }
      this.init();
    },

    // reset whether BookView is available every time as a user might switch between paged and non-paged objects within a single slot/window
    removeBookView: function() {
      var _this = this;
      this.focuses = this.availableViews;
      var manifest = this.manifest.jsonLd;
      if (manifest.sequences[0].viewingHint) {
        if (manifest.sequences[0].viewingHint.toLowerCase() !== 'paged') {
          //disable bookview for this object because it's not a paged object
          this.focuses = jQuery.grep(this.focuses, function(value) {
            return value !== 'BookView';
          });
        }
      }
    },

    listenForActions: function() {
      var _this = this;
      _this.eventEmitter.subscribe('bottomPanelSet.' + _this.id, function(event, visible) {
        var panel = _this.element.find('.bottomPanel');
        if (visible === true) {
          panel.css({transform: 'translateY(0)'});
        } else {
          panel.css({transform: 'translateY(100%)'});
        }
      });

      _this.events.push(_this.eventEmitter.subscribe('HIDE_REMOVE_OBJECT.' + _this.id, function(event) {
        _this.element.find('.remove-object-option').hide();
      }));

      _this.events.push(this.eventEmitter.subscribe('SHOW_REMOVE_OBJECT.' + _this.id, function(event) {
        _this.element.find('.remove-object-option').show();
      }));

      _this.events.push(_this.eventEmitter.subscribe('sidePanelStateUpdated.' + this.id, function(event, state) {
        if (state.open) {
          _this.element.find('.mirador-icon-toc').addClass('selected');
          _this.element.find('.view-container').removeClass('maximised');
        } else {
          _this.element.find('.mirador-icon-toc').removeClass('selected');
          _this.element.find('.view-container').addClass('maximised');
        }
      }));

      // TODO: temporary logic to minimize side panel if only tab is toc and toc is empty
      _this.events.push(_this.eventEmitter.subscribe('sidePanelVisibilityByTab.' + this.id, function(event, visible) {
        _this.sidePanelVisibility(visible, '0s');
      }));

      _this.events.push(_this.eventEmitter.subscribe('SET_CURRENT_CANVAS_ID.' + this.id, function(event, canvasID) {
        if (typeof canvasID === "string") {
          _this.setCurrentCanvasID(canvasID);
        } else {
          if (_this.canvasID !== canvasID.canvasID) {
            _this.setCurrentCanvasID(canvasID.canvasID);
          }
          _this.eventEmitter.publish('fitBounds.' + _this.id, canvasID.bounds);
        }
      }));

      _this.events.push(_this.eventEmitter.subscribe('REMOVE_CLASS.' + this.id, function(event, className) {
        _this.element.find('.view-container').removeClass(className);
      }));

      _this.events.push(_this.eventEmitter.subscribe('ADD_CLASS.' + this.id, function(event, className) {
        _this.element.find('.view-container').addClass(className);
      }));

      _this.events.push(_this.eventEmitter.subscribe('UPDATE_FOCUS_IMAGES.' + this.id, function(event, images) {
        _this.updateFocusImages(images.array);
      }));

      _this.events.push(_this.eventEmitter.subscribe('HIDE_ICON_TOC.' + this.id, function(event) {
        _this.element.find('.mirador-icon-toc').hide();
      }));

      _this.events.push(_this.eventEmitter.subscribe('SHOW_ICON_TOC.' + this.id, function(event) {
        _this.element.find('.mirador-icon-toc').show();
      }));

      _this.events.push(_this.eventEmitter.subscribe('SET_BOTTOM_PANEL_VISIBILITY.' + this.id, function(event, visibility) {
        if (typeof visibility !== 'undefined' && visibility !== null) {
          _this.bottomPanelVisibility(visibility);
        } else {
          _this.bottomPanelVisibility(_this.bottomPanelVisible);
        }
      }));

      _this.events.push(_this.eventEmitter.subscribe('TOGGLE_BOTTOM_PANEL_VISIBILITY.' + this.id, function(event) {
        var visible = !_this.bottomPanelVisible;
        _this.bottomPanelVisibility(visible);
      }));

      _this.events.push(_this.eventEmitter.subscribe('DISABLE_WINDOW_FULLSCREEN', function(event) {
        _this.element.find('.mirador-osd-fullscreen').hide();
      }));

      _this.events.push(_this.eventEmitter.subscribe('ENABLE_WINDOW_FULLSCREEN', function(event) {
        _this.element.find('.mirador-osd-fullscreen').show();
      }));
    },

    bindEvents: function() {
      var _this = this;

      //this event should trigger from layout
      jQuery(window).resize($.debounce(function(){
        if (_this.focusModules.ScrollView) {
          var containerHeight = _this.element.find('.view-container').height();
          var triggerShow = false;
          if (_this.viewType === "ScrollView") {
            triggerShow = true;
          }
          _this.focusModules.ScrollView.reloadImages(Math.floor(containerHeight * _this.scrollImageRatio), triggerShow);
        }
      }, 300));

      this.element.find('.mirador-osd-fullscreen').on('click', function() {
        if ($.fullscreenElement()) {
          $.exitFullscreen();
        } else {
          $.enterFullscreen(_this.element[0]);
        }
      });

      jQuery(document).on("webkitfullscreenchange mozfullscreenchange fullscreenchange", function() {
        _this.toggleFullScreen();
      });

    },

    bindAnnotationEvents: function() {
      var _this = this;
      _this.eventEmitter.subscribe('annotationCreated.'+_this.id, function(event, oaAnno, eventCallback) {
        var annoID;
        //first function is success callback, second is error callback
        _this.endpoint.create(oaAnno, function(data) {
          //the success callback expects the OA annotation be returned
          annoID = String(data['@id']); //just in case it returns a number
          _this.annotationsList.push(data);
          _this.eventEmitter.publish('ANNOTATIONS_LIST_UPDATED', {windowId: _this.id, annotationsList: _this.annotationsList});
          //anything that depends on the completion of other bits, call them now
          eventCallback();
        },
                              function() {
                                //provide useful feedback to user
                                console.log("There was an error saving this new annotation");
                              });
      });

      _this.eventEmitter.subscribe('annotationUpdated.'+_this.id, function(event, oaAnno) {
        //first function is success callback, second is error callback
        _this.endpoint.update(oaAnno, function(data) {
          jQuery.each(_this.annotationsList, function(index, value) {
            if (value['@id'] === data['@id']) {
              _this.annotationsList[index] = data;
              return false;
            }
          });
          _this.eventEmitter.publish('ANNOTATIONS_LIST_UPDATED', {windowId: _this.id, annotationsList: _this.annotationsList});
        },
                              function() {
                                console.log("There was an error updating this annotation");
                              });
      });

      _this.eventEmitter.subscribe('annotationDeleted.'+_this.id, function(event, annoId) {
        //remove from endpoint
        //first function is success callback, second is error callback
        _this.endpoint.deleteAnnotation(annoId, function() {
          _this.annotationsList = jQuery.grep(_this.annotationsList, function(e){ return e['@id'] !== annoId; });
          _this.eventEmitter.publish(('removeOverlay.' + _this.id), annoId);
          _this.eventEmitter.publish('ANNOTATIONS_LIST_UPDATED', {windowId: _this.id, annotationsList: _this.annotationsList});
        },
                                        function() {
                                          // console.log("There was an error deleting this annotation");
                                        });
      });

      _this.eventEmitter.subscribe('updateAnnotationList.'+_this.id, function(event) {
        while(_this.annotationsList.length > 0) {
          _this.annotationsList.pop();
        }
        _this.getAnnotations();
      });
    },

    clearViews: function() {
      var _this = this;
      jQuery.each(_this.focusModules, function(key, value) {
        _this.focusModules[key] = null;
      });
    },

    clearPanelsAndOverlay: function() {
      this.sidePanel = null;
      this.bottomPanel = null;
      this.overlay = null;
    },

    // only panels and overlay available to this view, make rest hidden while on this view
    updatePanelsAndOverlay: function(state) {
      var _this = this;

      jQuery.each(this.focusOverlaysAvailable[state], function(panelType, viewOptions) {
        jQuery.each(viewOptions, function(view, displayed) {
          //instantiate any panels that exist for this view but are still null
          if (view !== '' && _this[panelType] === null) {
            _this[panelType] = new $[view]({
              manifest: _this.manifest,
              appendTo: _this.element.find('.'+panelType),
              state:  _this.state,
              eventEmitter: _this.eventEmitter,
              windowId: _this.id,
              panel: true,
              canvasID: _this.canvasID,
              canvases: _this.canvases,
              imagesList: _this.imagesList,
              imagesListLtr: _this.imagesListLtr,
              imagesListRtl: _this.imagesListRtl,
              vDirectionStatus: _this.vDirectionStatus,		
              thumbInfo: {thumbsHeight: 80, listingCssCls: 'panel-listing-thumbs', thumbnailCls: 'panel-thumbnail-view'}
            });
          }

          //refresh displayed in case TableOfContents module changed it
          displayed = _this.focusOverlaysAvailable[state][panelType][view];

          //toggle any valid panels
          if (view !== '' && displayed) {
            _this.togglePanels(panelType, displayed, view, state);
          }

          //hide any panels instantiated but not available to this view
          if (view === '' && _this[panelType]) {
            _this.togglePanels(panelType, displayed, view, state);
          }

          //lastly, adjust height for non-existent panels
          if (view === '') {
            _this.adjustFocusSize(panelType, displayed);
          }

        });
      });

    },

    updateSidePanel: function() {
      if (!this.sidePanelAvailable) {
        return;
      }
      var _this = this,
          tocTabAvailable = _this.sidePanelOptions.tocTabAvailable,
          annotationsTabAvailable = _this.sidePanelOptions.annotations,
          layersTabAvailable = _this.sidePanelOptions.layersTabAvailable,
          searchTabAvailable = _this.sidePanelOptions.searchTabAvailable,
          hasStructures = true;

      var structures = _this.manifest.getStructures();
      if (!structures || structures.length === 0) {
        hasStructures = false;
      }

      if (this.sidePanel === null) {
        this.sidePanel = new $.SidePanel({

          windowId: _this.id,
          state: _this.state,
          eventEmitter: _this.eventEmitter,
          appendTo: _this.element.find('.sidePanel'),
          manifest: _this.manifest,
          canvasID: _this.canvasID,
          canvases: _this.canvases,
          layersTabAvailable: layersTabAvailable,
          tocTabAvailable: tocTabAvailable,
          searchTabAvailable: searchTabAvailable,
          annotationsTabAvailable: annotationsTabAvailable,
          hasStructures: hasStructures

        });
      } else {
        this.sidePanel.update('annotations', annotationsTabAvailable);
      }
    },

    get: function(prop, parent) {
      if (parent) {
        return this[parent][prop];
      }
      return this[prop];
    },

    set: function(prop, value, options) {
      if (options) {
        this[options.parent][prop] = value;
      } else {
        this[prop] = value;
      }
    },

    /*setTOCBoolean: function(boolValue) {
     var _this = this;
     jQuery.each(this.focusOverlaysAvailable, function(key, value) {
     _this.focusOverlaysAvailable[key].sidePanel.TableOfContents = boolValue;
     });
     //remove thumbnail icon if not available for this object
     if (!boolValue) {
     this.element.find('.mirador-icon-toc').hide();
     }
     },*/

    togglePanels: function(panelType, panelState, viewType, focusState) {
      //update state in focusOverlaysAvailable
      this.focusOverlaysAvailable[focusState][panelType][viewType] = panelState;
      this[panelType].toggle(panelState);
      this.adjustFocusSize(panelType, panelState);
    },

    sidePanelVisibility: function(visible, transitionDuration) {
      var _this = this;
      _this.sidePanelVisible = visible;
      var tocIconElement = this.element.find('.mirador-icon-toc'),
          sidePanelElement = this.element.find('.sidePanel'),
          viewContainerElement = this.element.find('.view-container');

      sidePanelElement.css('transition-duration', transitionDuration);
      viewContainerElement.css('transition', transitionDuration);
      if (visible && sidePanelElement.hasClass('minimized')) {
        tocIconElement.addClass('selected');
        sidePanelElement.removeClass('minimized').width(280).css('border-right', '1px solid lightgray');
        viewContainerElement.css('margin-left', 280);
      } else if (!visible && !sidePanelElement.hasClass('minimized')) {
        tocIconElement.removeClass('selected');
        viewContainerElement.css('margin-left', 0);
        sidePanelElement.addClass('minimized').css('border', 'none').width(0);
      }
      _this.eventEmitter.publish(('windowUpdated'), {
        id: _this.id,
        sidePanelVisible: visible
      });
    },

    bottomPanelVisibility: function(visible) {
      var _this = this;
      _this.bottomPanelVisible = visible;
      _this.eventEmitter.publish(('bottomPanelSet.' + _this.id), visible);
      _this.eventEmitter.publish(('windowUpdated'), {
        id: _this.id,
        bottomPanelVisible: visible
      });
    },

    adjustFocusSize: function(panelType, panelState) {
      if (panelType === 'bottomPanel') {
        this.focusModules[this.viewType].adjustHeight('focus-max-height', panelState);
      } else if (panelType === 'sidePanel') {
        this.focusModules[this.viewType].adjustWidth('focus-max-width', panelState);
      } else {}
    },

    toggleMetadataOverlay: function(focusState) {
      var _this = this;
      var currentState = this.focusOverlaysAvailable[focusState].overlay.MetadataView;
      if (currentState) {
        this.element.find('.mirador-icon-metadata-view').removeClass('selected');
      } else {
        this.element.find('.mirador-icon-metadata-view').addClass('selected');
      }
      //set overlay for all focus types to same value
      jQuery.each(this.focusOverlaysAvailable, function(focusType, options) {
        if (focusState !== focusType) {
          this.overlay.MetadataView = !currentState;
        }
      });
      //and then do toggling for current focus
      this.togglePanels('overlay', !currentState, 'MetadataView', focusState);
    },

    toggleFocus: function(focusState, imageMode) {
      var _this = this;

      this.viewType = focusState;
      if (imageMode && jQuery.inArray(imageMode, this.imageModes) > -1) {
        this.currentImageMode = imageMode;
      }
      //set other focusStates to false (toggle to display none)
      jQuery.each(this.focusModules, function(focusKey, module) {
        if (module && focusState !== focusKey) {
          module.toggle(false);
        }
      });
      this.focusModules[focusState].toggle(true);
      this.updateManifestInfo();
      this.updatePanelsAndOverlay(focusState);
      this.updateSidePanel();
      _this.eventEmitter.publish("focusUpdated" + _this.id, focusState);
      _this.eventEmitter.publish("windowUpdated", {
        id: _this.id,
        viewType: _this.viewType,
        canvasID: _this.canvasID,
        imageMode: _this.currentImageMode,
        loadedManifest: _this.manifest.jsonLd['@id'],
        slotAddress: _this.slotAddress,
        canvases: _this.canvases
      });
    },

    toggleThumbnails: function(canvasID) {
      this.canvasID = canvasID;
      if (this.focusModules.ThumbnailsView === null) {
        this.focusModules.ThumbnailsView = new $.ThumbnailsView({
          manifest: this.manifest,
          appendTo: this.element.find('.view-container'),
          state:  this.state,
          eventEmitter: this.eventEmitter,
          windowId: this.id,
          canvasID: this.canvasID,
          imagesList: this.imagesList,
          imagesListLtr: this.imagesListLtr,
          vDirectionStatus: this.vDirectionStatus
        });
      } else {
        var view = this.focusModules.ThumbnailsView;
        view.updateImage(canvasID);
      }
      this.toggleFocus('ThumbnailsView', '');
    },

    toggleImageView: function(canvasID) {
      this.canvasID = canvasID;
      if (this.focusModules.ImageView === null) {
        this.focusModules.ImageView = new $.ImageView({
          manifest: this.manifest,
          appendTo: this.element.find('.view-container'),
          qtipElement: this.element,
          windowId: this.id,
          state:  this.state,
          eventEmitter: this.eventEmitter,
          canvasID: canvasID,
          canvases: this.canvases,
          imagesList: this.imagesList,
          imagesListRtl: this.imagesListRtl,
          imagesListLtr: this.imagesListLtr,
          vDirectionStatus: this.vDirectionStatus,
          osdOptions: this.windowOptions,
          bottomPanelAvailable: this.bottomPanelAvailable,
          annoEndpointAvailable: this.annoEndpointAvailable,
          canvasControls: this.canvasControls,
          annotationState : this.canvasControls.annotations.annotationState
        });
      } else {
        this.focusModules.ImageView.updateImage(canvasID);
      }
      this.toggleFocus('ImageView', 'ImageView');
    },

    toggleBookView: function(canvasID) {
      this.canvasID = canvasID;
      if (this.focusModules.BookView === null) {
        this.focusModules.BookView = new $.BookView({
          manifest: this.manifest,
          appendTo: this.element.find('.view-container'),
          windowId: this.id,
          state:  this.state,
          eventEmitter: this.eventEmitter,
          canvasID: canvasID,
          imagesList: this.imagesList,
          imagesListRtl: this.imagesListRtl,
          imagesListLtr: this.imagesListLtr,
          vDirectionStatus: this.vDirectionStatus,
          osdOptions: this.windowOptions,
          bottomPanelAvailable: this.bottomPanelAvailable
        });
      } else {
        var view = this.focusModules.BookView;
        view.updateImage(canvasID);
      }
      this.toggleFocus('BookView', 'BookView');
    },

    toggleScrollView: function(canvasID) {
      if(this.vDirectionStatus == 'rtl'){
        this.imagesList = this.imagesListRtl.concat();
      }
      this.canvasID = canvasID;
      if (this.focusModules.ScrollView === null) {
        var containerHeight = this.element.find('.view-container').height();
        this.focusModules.ScrollView = new $.ScrollView({
          manifest: this.manifest,
          appendTo: this.element.find('.view-container'),
          state:  this.state,
          eventEmitter: this.eventEmitter,
          windowId: this.id,
          canvasID: this.canvasID,
          imagesList: this.imagesList,
          imagesListLtr: this.imagesListLtr,
          vDirectionStatus: this.vDirectionStatus,
          thumbInfo: {thumbsHeight: Math.floor(containerHeight * this.scrollImageRatio), listingCssCls: 'scroll-listing-thumbs', thumbnailCls: 'scroll-view'}
        });
      } else {
        var view = this.focusModules.ScrollView;
        view.updateImage(canvasID);
      }
      this.toggleFocus('ScrollView', '');
    },

    updateFocusImages: function(imageList) {
      this.focusImages = imageList;
      if (this.bottomPanel) { this.bottomPanel.updateFocusImages(this.focusImages); }
    },

    setCurrentCanvasID: function(canvasID) {
      var _this = this;

      _this.canvasID = canvasID;

      // TODO: Completely remove the 'removeTooltips' event. They are not actions and
      // they do not represent any state change. They are essentially
      // function calls, which should be handled as responses to the
      // publication of the state update event currentCanvasIDUpdated
      // below.
      _this.eventEmitter.publish('removeTooltips.' + _this.id);
      while(_this.annotationsList.length > 0) {
        _this.annotationsList.pop();
      }
      this.getAnnotations();
      switch(this.currentImageMode) {
      case 'ImageView':
        this.toggleImageView(this.canvasID);
        break;
      case 'BookView':
        this.toggleBookView(this.canvasID);
        break;
      default:
        break;
      }
      _this.eventEmitter.publish(('currentCanvasIDUpdated.' + _this.id), canvasID);
    },

    replaceWindow: function(newSlotAddress, newElement) {
      this.slotAddress = newSlotAddress;
      this.appendTo = newElement;
      this.update();
    },

    setCursorFrameStart: function(canvasID) {
    },

    updateManifestInfo: function() {
      var _this = this;
      _this.element.find('.mirador-icon-view-type > i:first').removeClass().addClass(_this.iconClasses[_this.viewType]);

      if (this.focusOverlaysAvailable[this.viewType].overlay.MetadataView) {
        this.element.find('.mirador-icon-metadata-view').addClass('selected');
      }
    },

    /*
     Merge all annotations for current image/canvas from various sources
     Pass to any widgets that will use this list
     */
    getAnnotations: function() {
      //first look for manifest annotations
      var _this = this,
          urls = _this.manifest.getAnnotationsListUrls(_this.canvasID);

      if (urls.length !== 0) {
        jQuery.each(urls, function(index, url) {
          jQuery.getJSON(url, function(list) {
            var annotations = list.resources;
            jQuery.each(annotations, function(index, value) {
              //if there is no ID for this annotation, set a random one
              if (typeof value['@id'] === 'undefined') {
                value['@id'] = $.genUUID();
              }
              //indicate this is a manifest annotation - which affects the UI
              value.endpoint = "manifest";
            });
            // publish event only if one url fetch is successful
            _this.annotationsList = _this.annotationsList.concat(annotations);
            _this.eventEmitter.publish('ANNOTATIONS_LIST_UPDATED', {windowId: _this.id, annotationsList: _this.annotationsList});
          });
        });
      }

      // next check endpoint
      if (this.annoEndpointAvailable) {
        var dfd = jQuery.Deferred(),
            module = _this.state.getStateProperty('annotationEndpoint').module,
            options = _this.state.getStateProperty('annotationEndpoint').options || {}; //grab anything from the config that should be passed directly to the endpoint
        options.name = _this.state.getStateProperty('annotationEndpoint').name;
        // One annotation endpoint per window, the endpoint
        // is a property of the instance.
        if ( _this.endpoint && _this.endpoint !== null ) {
          _this.endpoint.set('dfd', dfd);
        } else {
          options.dfd = dfd;
          options.windowID = _this.id;
          options.imagesList = _this.imagesList;
          options.eventEmitter = _this.eventEmitter;
          _this.endpoint = new $[module](options);
        }
        _this.endpoint.search({ "uri" : _this.canvasID});

        dfd.done(function(loaded) {
          _this.annotationsList = _this.annotationsList.concat(_this.endpoint.annotationsList);
          // clear out some bad data
          _this.annotationsList = jQuery.grep(_this.annotationsList, function (value, index) {
            if (typeof value.on === "undefined") {
              return false;
            }
            return true;
          });
          _this.eventEmitter.publish('ANNOTATIONS_LIST_UPDATED', {windowId: _this.id, annotationsList: _this.annotationsList});
        });
      }
    },

    toggleFullScreen: function() {
      var _this = this;
      if (!OpenSeadragon.isFullScreen()) {
        this.element.find('.mirador-osd-fullscreen i').removeClass('fa-compress').addClass('fa-expand');
        this.element.find('.mirador-osd-toggle-bottom-panel').show();
        _this.eventEmitter.publish('SET_BOTTOM_PANEL_VISIBILITY.' + this.id, true);
      } else {
        this.element.find('.mirador-osd-fullscreen i').removeClass('fa-expand').addClass('fa-compress');
        this.element.find('.mirador-osd-toggle-bottom-panel').hide();
        _this.eventEmitter.publish('SET_BOTTOM_PANEL_VISIBILITY.' + this.id, false);
      }
    },

    // based on currentFocus
    bindNavigation: function() {
      var _this = this;

      this.element.find('.mirador-icon-view-type').on('mouseenter',
                                                      function() {
                                                        _this.element.find('.image-list').stop().slideFadeToggle(300);
                                                      }).on('mouseleave',
                                                            function() {
                                                              _this.element.find('.image-list').stop().slideFadeToggle(300);
                                                            });

      this.element.find('.mirador-icon-window-menu').on('mouseenter',
                                                        function() {
                                                          _this.element.find('.slot-controls').stop().slideFadeToggle(300);
                                                        }).on('mouseleave',
                                                              function() {
                                                                _this.element.find('.slot-controls').stop().slideFadeToggle(300);
                                                              });

      this.element.find('.single-image-option').on('click', function() {
        _this.toggleImageView(_this.canvasID);
      });

      this.element.find('.book-option').on('click', function() {
        _this.toggleBookView(_this.canvasID);
      });

      this.element.find('.scroll-option').on('click', function() {
        _this.toggleScrollView(_this.canvasID);
      });

      this.element.find('.thumbnails-option').on('click', function() {
        _this.toggleThumbnails(_this.canvasID);
      });

      this.element.find('.mirador-icon-metadata-view').on('click', function() {
        _this.toggleMetadataOverlay(_this.viewType);
      });

      this.element.find('.mirador-icon-toc').on('click', function() {
        _this.sidePanelVisibility(!_this.sidePanelVisible, '0.3s');
      });

      this.element.find('.new-object-option').on('click', function() {
        _this.eventEmitter.publish('ADD_ITEM_FROM_WINDOW', _this.id);
      });

      this.element.find('.remove-object-option').on('click', function() {
        _this.eventEmitter.publish('REMOVE_SLOT_FROM_WINDOW', _this.id);
      });

      this.element.find('.add-slot-right').on('click', function() {
        _this.eventEmitter.publish('SPLIT_RIGHT_FROM_WINDOW', _this.id);
      });

      this.element.find('.add-slot-left').on('click', function() {
        _this.eventEmitter.publish('SPLIT_LEFT_FROM_WINDOW', _this.id);
      });

      this.element.find('.add-slot-below').on('click', function() {
        _this.eventEmitter.publish('SPLIT_DOWN_FROM_WINDOW', _this.id);
      });

      this.element.find('.add-slot-above').on('click', function() {
        _this.eventEmitter.publish('SPLIT_UP_FROM_WINDOW', _this.id);
      });
    },

    // template should be based on workspace type

    template: $.Handlebars.compile([
      '<div class="window">',
      '<div class="manifest-info">',
      '<div class="window-manifest-navigation">',
      '{{#if userButtons}}',
      '{{windowuserbtns userButtons}}',
      '{{/if}}',
      '<a href="javascript:;" class="mirador-btn mirador-icon-view-type" role="button" title="{{t "viewTypeTooltip"}}" aria-label="{{t "viewTypeTooltip"}}">',
      '<i class="{{currentFocusClass}}"></i>',
      '<i class="fa fa-caret-down"></i>',
      '<ul class="dropdown image-list">',
      '{{#if ImageView}}',
      '<li class="single-image-option"><i class="{{iconClasses.ImageView}}"></i> {{t "imageView"}}</li>',
      '{{/if}}',
      '{{#if BookView}}',
      '<li class="book-option"><i class="{{iconClasses.BookView}}"></i> {{t "bookView"}}</li>',
      '{{/if}}',
      '{{#if ScrollView}}',
      '<li class="scroll-option"><i class="{{iconClasses.ScrollView}}"></i> {{t "scrollView"}}</li>',
      '{{/if}}',
      '{{#if ThumbnailsView}}',
      '<li class="thumbnails-option"><i class="{{iconClasses.ThumbnailsView}}"></i> {{t "thumbnailsView"}}</li>',
      '{{/if}}',
      '</ul>',
      '</a>',
      '{{#if MetadataView}}',
      '<a href="javascript:;" class="mirador-btn mirador-icon-metadata-view mirador-tooltip" role="button" title="{{t "metadataTooltip"}}" aria-label="{{t "metadataTooltip"}}">',
      '<i class="fa fa-info-circle fa-lg fa-fw"></i>',
      '</a>',
      '{{/if}}',
      '{{#if showFullScreen}}',
      '<a class="mirador-btn mirador-osd-fullscreen mirador-tooltip" role="button" title="{{t "fullScreenWindowTooltip"}}" aria-label="{{t "fullScreenWindowTooltip"}}">',
      '<i class="fa fa-lg fa-fw fa-expand"></i>',
      '</a>',
      '{{/if}}',
      '</div>',
      '{{#if layoutOptions.close}}',
      '<a href="javascript:;" class="mirador-btn mirador-close-window remove-object-option mirador-tooltip" title="{{t "closeTooltip"}}" aria-label="{{t "closeTooltip"}}"><i class="fa fa-times fa-lg fa-fw"></i></a>',
      '{{/if}}',
      '{{#if displayLayout}}',
      '<a href="javascript:;" class="mirador-btn mirador-icon-window-menu" title="{{t "changeLayoutTooltip"}}" aria-label="{{t "changeLayoutTooltip"}}"><i class="fa fa-th-large fa-lg fa-fw"></i><i class="fa fa-caret-down"></i>',
      '<ul class="dropdown slot-controls">',
      '{{#if layoutOptions.newObject}}',
      '<li class="new-object-option"><i class="fa fa-refresh fa-lg fa-fw"></i> {{t "newObject"}}</li>',
      '<hr class="menu-divider"/>',
      '{{/if}}',
      '{{#if layoutOptions.slotRight}}',
      '<li class="add-slot-right"><i class="fa fa-arrow-circle-right fa-lg fa-fw"></i> {{t "addSlotRight"}}</li>',
      '{{/if}}',
      '{{#if layoutOptions.slotLeft}}',
      '<li class="add-slot-left"><i class="fa fa-arrow-circle-left fa-lg fa-fw"></i> {{t "addSlotLeft"}}</li>',
      '{{/if}}',
      '{{#if layoutOptions.slotAbove}}',
      '<li class="add-slot-above"><i class="fa fa-arrow-circle-up fa-lg fa-fw"></i> {{t "addSlotAbove"}}</li>',
      '{{/if}}',
      '{{#if layoutOptions.slotBelow}}',
      '<li class="add-slot-below"><i class="fa fa-arrow-circle-down fa-lg fa-fw"></i> {{t "addSlotBelow"}}</li>',
      '{{/if}}',
      '</ul>',
      '</a>',
      '{{/if}}',
      '{{#if sidePanel}}',
      '<a href="javascript:;" class="mirador-btn mirador-icon-toc selected mirador-tooltip" title="{{t "sidePanelTooltip"}}" aria-label="{{t "sidePanelTooltip"}}"><i class="fa fa-bars fa-lg fa-fw"></i></a>',
      '{{/if}}',
      '<h3 class="window-manifest-title" title="{{{title}}}" aria-label="{{{title}}}">{{{title}}}</h3>',
      '</div>',
      '<div class="content-container">',
      '{{#if sidePanel}}',
      '<div class="sidePanel">',
      '</div>',
      '{{/if}}',
      '<div class="overlay"></div>',
      '<div class="view-container {{#unless sidePanel}}focus-max-width{{/unless}}">',
      '<div class="bottomPanel">',
      '</div>',
      '</div>',
      '</div>',
      '</div>'

    ].join(''))
  };

  var processUserButtons = function (buttons){
    return buttons.map(function(button, index){
      return processUserButton(button);
    });
  };

  var processUserButton = function(button){
    var $a = jQuery('<a>');
    var $i = jQuery('<i>', {'class': 'fa fa-lg fa-fw'});
    try {
      if(!button.iconClass){
        throw "userButtons must have an iconClass";
      }
      // add custom attributes to the button element
      if(button.attributes){
        $a.attr(button.attributes);
      }
      // add default class to the button element
      $a.addClass('mirador-btn');
      // add custom classes to the icon element
      $i.addClass(button.iconClass);
      // append the icon element to the button element
      $a.append($i);
      return $a.get(0).outerHTML;
    }catch(error){
      console && console.error && console.error(error);
      return '';
    }
  };

  $.Handlebars.registerHelper('windowuserbtns', function(userButtons){
    return new $.Handlebars.SafeString(
      processUserButtons(userButtons).join('')
    );
  });

}(Mirador));
