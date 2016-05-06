(function($) {

  $.Window = function(options) {

    jQuery.extend(this, {
      element:           null,
      scrollImageRatio:  0.9,
      manifest:          null,
      currentCanvasID:    null,
      focusImages:       [],
      imagesList:        null,
      annotationsList:   [],
      endpoint:          null,
      slotAddress:     null,
      currentImageMode:  'ImageView',
      imageModes:        ['ImageView', 'BookView'],
      currentFocus:      'ThumbnailsView',
      focusesOriginal:   ['ThumbnailsView', 'ImageView', 'ScrollView', 'BookView'],
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
      focusOptions: null,
      id : null,
      sidePanel: null, //the actual module for the side panel
      sidePanelAvailable: true,
      sidePanelOptions: {
        "toc" : true,
        "annotations" : false,
        "layers" : false
      },
      sidePanelVisible: true,
      annotationsAvailable: {
        'ThumbnailsView' : false,
        'ImageView' : true,
        'ScrollView' : false,
        'BookView' : false
      },
      bottomPanel: null, //the actual module for the bottom panel
      bottomPanelAvailable: true,
      bottomPanelVisible: true,
      overlay: null,
      annotationLayerAvailable: true,
      annotationCreationAvailable: true,
      annoEndpointAvailable : false,
      annotationState : 'annoOff',
      fullScreenAvailable : true,
      displayLayout: true,
      layoutOptions : {
        "newObject" : true,
        "close" : true,
        "slotRight" : true,
        "slotLeft" : true,
        "slotAbove" : true,
        "slotBelow" : true
      },
      iconClasses: {
        "ImageView" : "fa fa-photo fa-lg fa-fw",
        "BookView" : "fa fa-columns fa-lg fa-fw",
        "ScrollView" : "fa fa-ellipsis-h fa-lg fa-fw",
        "ThumbnailsView" : "fa fa-th fa-lg fa-rotate-90 fa-fw"
      }
    }, options);

    this.init();
    this.bindAnnotationEvents();

  };

  $.Window.prototype = {
    init: function () {
      var _this = this,
      manifest = _this.manifest.jsonLd,
      focusState = _this.currentFocus,
      templateData = {};

      //make sure annotations list is cleared out when changing objects within window
      while(_this.annotationsList.length > 0) {
        _this.annotationsList.pop();
      }
      //unsubscribe from stale events as they will be updated with new module calls
      jQuery.unsubscribe(('currentCanvasIDUpdated.' + _this.id));

      _this.removeBookView();

      //remove any imageModes that are not available as a focus
      this.imageModes = jQuery.map(this.imageModes, function(value, index) {
        if (jQuery.inArray(value, _this.focuses) === -1) return null;
        return value;
      });

      _this.imagesList = _this.manifest.getCanvases();
      if (!_this.currentCanvasID) {
        _this.currentCanvasID = _this.imagesList[0]['@id'];
      }

      this.annoEndpointAvailable = !jQuery.isEmptyObject(_this.state.getStateProperty('annotationEndpoint'));
      if (!this.annotationLayerAvailable) {
        this.annotationCreationAvailable = false;
        this.annoEndpointAvailable = false;
        this.annotationState = 'annoOff';
      }
      _this.getAnnotations();

      //for use by SidePanel, which needs to know if the current view can have the annotations tab
      jQuery.publish(('windowUpdated'), {
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
      templateData.currentFocusClass = _this.iconClasses[_this.currentFocus];
      templateData.showFullScreen = _this.fullScreenAvailable;
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
      //TODO: this needs to switch the postion when it is a right to left manifest
      this.element.find('.manifest-info .window-manifest-title').qtip({
        content: {
          text: jQuery(this).attr('title'),
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
      jQuery.publish('WINDOW_ELEMENT_UPDATED', {windowId: _this.id, element: _this.element});

      //clear any existing objects
      _this.clearViews();
      _this.clearPanelsAndOverlay();

      //window needs to listen for any events before it finishes building out the widgets, in case they publish anything
      this.listenForActions();

      //attach view and toggle view, which triggers the attachment of panels or overlays
      _this.bindNavigation();
      switch(focusState) {
        case 'ThumbnailsView':
          _this.toggleThumbnails(_this.currentCanvasID);
        break;
        case 'ImageView':
          _this.toggleImageView(_this.currentCanvasID);
        break;
        case 'BookView':
          _this.toggleBookView(_this.currentCanvasID);
        break;
        case 'ScrollView':
          _this.toggleScrollView(_this.currentCanvasID);
        break;
        default:
          break;
      }

      if (_this.state.getSlots().length <= 1) {
        _this.element.find('.remove-object-option').hide();
      }

      this.bindEvents();

      if (this.imagesList.length === 1) {
        this.bottomPanelVisibility(false);
      } else {
        this.bottomPanelVisibility(this.bottomPanelVisible);
      }
      this.sidePanelVisibility(this.sidePanelVisible, '0s');
    },

    update: function(options) {
      jQuery.extend(this, options);
      if (this.focusOptions) {
        this.focusOptions.osdBounds = null;
        this.focusOptions.zoomLevel = null;
      }
      this.init();
    },

    // reset whether BookView is available every time as a user might switch between paged and non-paged objects within a single slot/window
    removeBookView: function() {
      var _this = this;
      this.focuses = this.focusesOriginal;
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
      jQuery.subscribe('bottomPanelSet.' + _this.id, function(event, visible) {
        var panel = _this.element.find('.bottomPanel');
        if (visible === true) {
          panel.css({transform: 'translateY(0)'});
        } else {
          panel.css({transform: 'translateY(100%)'});
        }
      });

      jQuery.subscribe('HIDE_REMOVE_OBJECT.' + _this.id, function(event) {
        _this.element.find('.remove-object-option').hide();
      });

      jQuery.subscribe('SHOW_REMOVE_OBJECT.' + _this.id, function(event) {
        _this.element.find('.remove-object-option').show();
      });

      jQuery.subscribe('sidePanelStateUpdated.' + this.id, function(event, state) {
        if (state.open) {
            _this.element.find('.mirador-icon-toc').addClass('selected');
            _this.element.find('.view-container').removeClass('maximised');
        } else {
            _this.element.find('.mirador-icon-toc').removeClass('selected');
            _this.element.find('.view-container').addClass('maximised');
        }
      });

      // TODO: temporary logic to minimize side panel if only tab is toc and toc is empty
      jQuery.subscribe('sidePanelVisibilityByTab.' + this.id, function(event, visible) {
        _this.sidePanelVisibility(visible, '0s');
      });

      jQuery.subscribe('SET_CURRENT_CANVAS_ID.' + this.id, function(event, canvasID) {
        _this.setCurrentCanvasID(canvasID);
      });

      jQuery.subscribe('REMOVE_CLASS.' + this.id, function(event, className) {
        _this.element.find('.view-container').removeClass(className);
      });

      jQuery.subscribe('ADD_CLASS.' + this.id, function(event, className) {
        _this.element.find('.view-container').addClass(className);
      });

      jQuery.subscribe('UPDATE_FOCUS_IMAGES.' + this.id, function(event, images) {
        _this.updateFocusImages(images.array); 
      });

      jQuery.subscribe('HIDE_ICON_TOC.' + this.id, function(event) {
        _this.element.find('.mirador-icon-toc').hide();
      });

      jQuery.subscribe('SHOW_ICON_TOC.' + this.id, function(event) {
        _this.element.find('.mirador-icon-toc').show();
      });

      jQuery.subscribe('SET_BOTTOM_PANEL_VISIBILITY.' + this.id, function(event, visibility) {
        if (typeof visibility !== 'undefined' && visibility !== null) {
          _this.bottomPanelVisibility(visibility);
        } else {
          _this.bottomPanelVisibility(_this.bottomPanelVisible);
        }
      });

      jQuery.subscribe('TOGGLE_BOTTOM_PANEL_VISIBILITY.' + this.id, function(event) {
        var visible = !_this.bottomPanelVisible;
        _this.bottomPanelVisibility(visible);
      });
      
      jQuery.subscribe('DISABLE_WINDOW_FULLSCREEN', function(event) {
        _this.element.find('.mirador-osd-fullscreen').hide();
      });

      jQuery.subscribe('ENABLE_WINDOW_FULLSCREEN', function(event) {
        _this.element.find('.mirador-osd-fullscreen').show();        
      });
    },

    bindEvents: function() {
      var _this = this;

      //this event should trigger from layout
      jQuery(window).resize($.debounce(function(){
        if (_this.focusModules.ScrollView) {
          var containerHeight = _this.element.find('.view-container').height();
          var triggerShow = false;
          if (_this.currentFocus === "ScrollView") {
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
        _this.fullScreen();
      });

    },

    bindAnnotationEvents: function() {
      var _this = this;
      jQuery.subscribe('annotationCreated.'+_this.id, function(event, oaAnno, osdOverlay) {
        var annoID;
        //first function is success callback, second is error callback
        _this.endpoint.create(oaAnno, function(data) {
          //the success callback expects the OA annotation be returned
          annoID = String(data['@id']); //just in case it returns a number
          _this.annotationsList.push(data);
          //update overlay so it can be a part of the annotationList rendering
          jQuery(osdOverlay).removeClass('osd-select-rectangle').addClass('annotation').attr('id', annoID);
          jQuery.publish('ANNOTATIONS_LIST_UPDATED', {windowId: _this.id, annotationsList: _this.annotationsList});
        },
        function() {
          //provide useful feedback to user
          console.log("There was an error saving this new annotation");
          //remove this overlay because we couldn't save annotation
          jQuery(osdOverlay).remove();
        });
      });

      jQuery.subscribe('annotationUpdated.'+_this.id, function(event, oaAnno) {
        //first function is success callback, second is error callback
        _this.endpoint.update(oaAnno, function() {
          jQuery.each(_this.annotationsList, function(index, value) {
            if (value['@id'] === oaAnno['@id']) {
              _this.annotationsList[index] = oaAnno;
              return false;
            }
          });
          jQuery.publish('ANNOTATIONS_LIST_UPDATED', {windowId: _this.id, annotationsList: _this.annotationsList});
        },
        function() {
          console.log("There was an error updating this annotation");
        });
      });

      jQuery.subscribe('annotationDeleted.'+_this.id, function(event, annoId) {
        //remove from endpoint
        //first function is success callback, second is error callback
        _this.endpoint.deleteAnnotation(annoId, function() {
          _this.annotationsList = jQuery.grep(_this.annotationsList, function(e){ return e['@id'] !== annoId; });
          jQuery.publish(('removeOverlay.' + _this.id), annoId);
          jQuery.publish('ANNOTATIONS_LIST_UPDATED', {windowId: _this.id, annotationsList: _this.annotationsList});
        },
        function() {
          // console.log("There was an error deleting this annotation");
        });
      });

      jQuery.subscribe('updateAnnotationList.'+_this.id, function(event) {
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
              windowId: _this.id,
              panel: true,
              canvasID: _this.currentCanvasID,
              imagesList: _this.imagesList,
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

          //update current image for all valid panels
        });
      });

      //update panels with current image
      //console.log(this.focusImages);
      //if (this.bottomPanel) { this.bottomPanel.updateFocusImages(this.focusImages); }
    },

    updateSidePanel: function() {
      if (!this.sidePanelAvailable) {
        return;
      }
      var _this = this,
      tocAvailable = _this.sidePanelOptions.toc,
      annotationsTabAvailable = _this.sidePanelOptions.annotations,
      layersTabAvailable = _this.sidePanelOptions.layers,
      hasStructures = true;

      var structures = _this.manifest.getStructures();
      if (!structures || structures.length === 0) {
        hasStructures = false;
      }

      if (this.sidePanel === null) {
        this.sidePanel = new $.SidePanel({
              windowId: _this.id,
              state: _this.state,
              appendTo: _this.element.find('.sidePanel'),
              manifest: _this.manifest,
              canvasID: _this.currentCanvasID,
              layersTabAvailable: layersTabAvailable,
              tocTabAvailable: tocAvailable,
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
      _this.sidePanelVisible = visible,
      tocIconElement = this.element.find('.mirador-icon-toc'),
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
      jQuery.publish(('windowUpdated'), {
        id: _this.id,
        sidePanelVisible: visible
      });
    },

    bottomPanelVisibility: function(visible) {
      var _this = this;
      _this.bottomPanelVisible = visible;
      jQuery.publish(('bottomPanelSet.' + _this.id), visible);
      jQuery.publish(('windowUpdated'), {
        id: _this.id,
        bottomPanelVisible: visible
      });
    },

    adjustFocusSize: function(panelType, panelState) {
      if (panelType === 'bottomPanel') {
        this.focusModules[this.currentFocus].adjustHeight('focus-max-height', panelState);
      } else if (panelType === 'sidePanel') {
        this.focusModules[this.currentFocus].adjustWidth('focus-max-width', panelState);
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

      this.currentFocus = focusState;
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
      jQuery.publish("focusUpdated");
      jQuery.publish("windowUpdated", {
        id: _this.id,
        viewType: _this.currentFocus,
        canvasID: _this.currentCanvasID,
        imageMode: _this.currentImageMode,
        loadedManifest: _this.manifest.jsonLd['@id'],
        slotAddress: _this.slotAddress
      });
    },

    toggleThumbnails: function(canvasID) {
      this.currentCanvasID = canvasID;
      if (this.focusModules.ThumbnailsView === null) {
        this.focusModules.ThumbnailsView = new $.ThumbnailsView({
          manifest: this.manifest,
          appendTo: this.element.find('.view-container'),
          state:  this.state,
          windowId: this.id,
          canvasID: this.currentCanvasID,
          imagesList: this.imagesList
        });
      } else {
        var view = this.focusModules.ThumbnailsView;
        view.updateImage(canvasID);
      }
      this.toggleFocus('ThumbnailsView', '');
    },

    toggleImageView: function(canvasID) {
      this.currentCanvasID = canvasID;
      if (this.focusModules.ImageView === null) {
        this.focusModules.ImageView = new $.ImageView({
          manifest: this.manifest,
          appendTo: this.element.find('.view-container'),
          windowId: this.id,
          state:  this.state,
          canvasID: canvasID,
          imagesList: this.imagesList,
          osdOptions: this.focusOptions,
          bottomPanelAvailable: this.bottomPanelAvailable,
          annotationLayerAvailable: this.annotationLayerAvailable,
          annotationCreationAvailable: this.annotationCreationAvailable,
          annoEndpointAvailable: this.annoEndpointAvailable,
          annotationState : this.annotationState
        });
      } else {
        var view = this.focusModules.ImageView;
        view.updateImage(canvasID);
      }
      this.toggleFocus('ImageView', 'ImageView');
    },

    toggleBookView: function(canvasID) {
      this.currentCanvasID = canvasID;
      if (this.focusModules.BookView === null) {
        this.focusModules.BookView = new $.BookView({
          manifest: this.manifest,
          appendTo: this.element.find('.view-container'),
          windowId: this.id,
          state:  this.state,
          canvasID: canvasID,
          imagesList: this.imagesList,
          osdOptions: this.focusOptions,
          bottomPanelAvailable: this.bottomPanelAvailable
        });
      } else {
        var view = this.focusModules.BookView;
        view.updateImage(canvasID);
      }
      this.toggleFocus('BookView', 'BookView');
    },

    toggleScrollView: function(canvasID) {
      this.currentCanvasID = canvasID;
      if (this.focusModules.ScrollView === null) {
        var containerHeight = this.element.find('.view-container').height();
        this.focusModules.ScrollView = new $.ScrollView({
          manifest: this.manifest,
          appendTo: this.element.find('.view-container'),
          state:  this.state,
          windowId: this.id,
          canvasID: this.currentCanvasID,
          imagesList: this.imagesList,
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
      this.currentCanvasID = canvasID;
      jQuery.publish('removeTooltips.' + _this.id);
      jQuery.unsubscribe(('annotationListLoaded.' + _this.id));
      while(_this.annotationsList.length > 0) {
        _this.annotationsList.pop();
      }
      this.getAnnotations();
      switch(this.currentImageMode) {
        case 'ImageView':
          this.toggleImageView(this.currentCanvasID);
        break;
        case 'BookView':
          this.toggleBookView(this.currentCanvasID);
        break;
        default:
          break;
      }
      jQuery.publish(('currentCanvasIDUpdated.' + _this.id), canvasID);
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
      _this.element.find('.mirador-icon-view-type > i:first').removeClass().addClass(_this.iconClasses[_this.currentFocus]);
      
      if (this.focusOverlaysAvailable[this.currentFocus].overlay.MetadataView) {
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
      url = _this.manifest.getAnnotationsListUrl(_this.currentCanvasID);

      if (url !== false) {
        jQuery.get(url, function(list) {
          _this.annotationsList = _this.annotationsList.concat(list.resources);
          jQuery.each(_this.annotationsList, function(index, value) {
            //if there is no ID for this annotation, set a random one
            if (typeof value['@id'] === 'undefined') {
              value['@id'] = $.genUUID();
            }
            //indicate this is a manifest annotation - which affects the UI
            value.endpoint = "manifest";
          });
          jQuery.publish('ANNOTATIONS_LIST_UPDATED', {windowId: _this.id, annotationsList: _this.annotationsList});
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
          _this.endpoint = new $[module](options);
        }
        _this.endpoint.search({ "uri" : _this.currentCanvasID});

        dfd.done(function(loaded) {
          _this.annotationsList = _this.annotationsList.concat(_this.endpoint.annotationsList);
          // clear out some bad data
          _this.annotationsList = jQuery.grep(_this.annotationsList, function (value, index) {
            if (typeof value.on === "undefined") {
              return false;
            }
            return true;
          });
          jQuery.publish('ANNOTATIONS_LIST_UPDATED', {windowId: _this.id, annotationsList: _this.annotationsList});
        });
      }
    },

    fullScreen: function() {
      if (!OpenSeadragon.isFullScreen()) {
        this.element.find('.mirador-osd-fullscreen i').removeClass('fa-compress').addClass('fa-expand');
        this.element.find('.mirador-osd-toggle-bottom-panel').show();
        jQuery.publish('SET_BOTTOM_PANEL_VISIBILITY.' + this.id, true);
      } else {
        this.element.find('.mirador-osd-fullscreen i').removeClass('fa-expand').addClass('fa-compress');
        this.element.find('.mirador-osd-toggle-bottom-panel').hide();
        jQuery.publish('SET_BOTTOM_PANEL_VISIBILITY.' + this.id, false);
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
        _this.toggleImageView(_this.currentCanvasID);
      });

      this.element.find('.book-option').on('click', function() {
        _this.toggleBookView(_this.currentCanvasID);
      });

      this.element.find('.scroll-option').on('click', function() {
        _this.toggleScrollView(_this.currentCanvasID);
      });

      this.element.find('.thumbnails-option').on('click', function() {
        _this.toggleThumbnails(_this.currentCanvasID);
      });

      this.element.find('.mirador-icon-metadata-view').on('click', function() {
        _this.toggleMetadataOverlay(_this.currentFocus);
      });

      this.element.find('.mirador-icon-toc').on('click', function() {
        _this.sidePanelVisibility(!_this.sidePanelVisible, '0.3s');
      });

      this.element.find('.new-object-option').on('click', function() {
        jQuery.publish('ADD_ITEM_FROM_WINDOW', _this.id);
      });

      this.element.find('.remove-object-option').on('click', function() {
        jQuery.publish('REMOVE_SLOT_FROM_WINDOW', _this.id);
      });

      this.element.find('.add-slot-right').on('click', function() {
        jQuery.publish('SPLIT_RIGHT_FROM_WINDOW', _this.id);
      });

      this.element.find('.add-slot-left').on('click', function() {
        jQuery.publish('SPLIT_LEFT_FROM_WINDOW', _this.id);
      });

      this.element.find('.add-slot-below').on('click', function() {
        jQuery.publish('SPLIT_DOWN_FROM_WINDOW', _this.id);
      });

      this.element.find('.add-slot-above').on('click', function() {
        jQuery.publish('SPLIT_UP_FROM_WINDOW', _this.id);
      });
    },

    // template should be based on workspace type
    template: Handlebars.compile([
                                 '<div class="window">',
                                 '<div class="manifest-info">',
                                 '<div class="window-manifest-navigation">',
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
                                 '<h3 class="window-manifest-title" title="{{title}}" aria-label="{{title}}">{{title}}</h3>',
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

}(Mirador));
