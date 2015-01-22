(function($) {

  $.Window = function(options) {

    jQuery.extend(this, {
      element:           null,
      scrollImageRatio:  0.9,
      appendTo:          null,
      manifest:          null,
      currentImageID:    null,
      focusImages:       [],
      imagesList:        null,
      annotationsList:   [],
      endpoints:         {},
      slot:              null,
      currentImageMode:  'ImageView',
      imageModes:        ['ImageView', 'BookView'],
      currentFocus:      'ThumbnailsView',
      focusesOriginal:   ['ThumbnailsView', 'ImageView', 'ScrollView', 'BookView'],
      focuses:           ['ThumbnailsView', 'ImageView', 'ScrollView', 'BookView'],
      focusModules:           {'ThumbnailsView': null, 'ImageView': null, 'ScrollView': null, 'BookView': null},
      focusOverlaysAvailable: {
        'ThumbnailsView': {
          'overlay' : {'MetadataView' : false}, 
          'sidePanel' : {'TableOfContents' : true},
          'bottomPanel' : {'' : false}
        },
        'ImageView': {
          'overlay' : {'MetadataView' : false}, 
          'sidePanel' : {'TableOfContents' : true},
          'bottomPanel' : {'ThumbnailsView' : true}
        },
        'ScrollView': {
          'overlay' : {'MetadataView' : false}, 
          'sidePanel' : {'TableOfContents' : true},
          'bottomPanel' : {'' : false}
        },
        'BookView': {
          'overlay' : {'MetadataView' : false},
          'sidePanel' : {'TableOfContents' : true},
          'bottomPanel' : {'ThumbnailsView' : true}
        }
      },
      focusOptions: null,
      id : null,
      sidePanel: null,
      bottomPanel: null,
      bottomPanelVisible: true,
      overlay: null
    }, options);

    this.init();

  };

  $.Window.prototype = {
    init: function () {
      _this = this,
      manifest = _this.manifest,
      focusState = _this.currentFocus,
      templateData = {},
      this.endpoints = {};
      
      //make sure annotations list is cleared out when changing objects within window
      while(_this.annotationsList.length > 0) {
       _this.annotationsList.pop();
      }
      //unsubscribe from stale events as they will be updated with new module calls
      jQuery.unsubscribe(('currentImageIDUpdated.' + _this.id));

      _this.element = jQuery(this.template()).appendTo(this.appendTo);
      
      _this.removeBookView();
      
      //remove any imageModes that are not available as a focus
      this.imageModes = jQuery.map(this.imageModes, function(value, index) {
         if (jQuery.inArray(value, _this.focuses) === -1) return null;  
         return value;
      });

      _this.imagesList = $.getImagesListByManifest(_this.manifest);
      if (!_this.currentImageID) {
        _this.currentImageID = _this.imagesList[0]['@id'];
      }
      
      _this.getAnnotations();

      //check config
      if (typeof this.bottomPanelAvailable !== 'undefined' && !this.bottomPanelAvailable) {
         jQuery.each(this.focusOverlaysAvailable, function(key, value) {
            _this.focusOverlaysAvailable[key].bottomPanel = {'' : false};
         });
      }
      if (typeof this.sidePanelAvailable !== 'undefined' && !this.sidePanelAvailable) {
         jQuery.each(this.focusOverlaysAvailable, function(key, value) {
            _this.focusOverlaysAvailable[key].sidePanel = {'' : false};
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
      jQuery.each(this.focuses, function(index, value) {
         templateData[value] = true;
      });
      templateData.title = manifest.label;      
      _this.element.prepend(_this.manifestInfoTemplate(templateData));

      //clear any existing objects
      _this.clearViews();
      _this.clearPanelsAndOverlay();

      //attach view and toggle view, which triggers the attachment of panels or overlays
      _this.bindNavigation();
      switch(focusState) {
        case 'ThumbnailsView':
          _this.toggleThumbnails(_this.currentImageID);
          break;
        case 'ImageView':
          _this.toggleImageView(_this.currentImageID);
          break;
        case 'BookView':
          _this.toggleBookView(_this.currentImageID);
          break;
        case 'ScrollView':
          _this.toggleScrollView(_this.currentImageID);
          break;
        default:
          break;
      }

      this.bindEvents();
    },
    
    update: function(options) {
      jQuery.extend(this, options);
      this.init();
    },
    
    // reset whether BookView is available every time as a user might switch between paged and non-paged objects within a single slot/window
    removeBookView: function() {
      this.focuses = this.focusesOriginal;
      if (manifest.sequences[0].viewingHint) {
           if (manifest.sequences[0].viewingHint.toLowerCase() !== 'paged') {
              //disable bookview for this object because it's not a paged object
              this.focuses = jQuery.grep(this.focuses, function(value) {
                 return value !== 'BookView';
              });
           }
      }
    },

    bindEvents: function() {
      var _this = this;

      //this event should trigger from layout      
      jQuery.subscribe('windowResize', $.debounce(function(){
        if (_this.focusModules.ScrollView) {
          var containerHeight = _this.element.find('.view-container').height();
          var triggerShow = false;
          if (_this.currentFocus === "ScrollView") {
            triggerShow = true;
          }
          _this.focusModules.ScrollView.reloadImages(Math.floor(containerHeight * _this.scrollImageRatio), triggerShow);
        }
      }, 300));

      jQuery.subscribe('bottomPanelSet.' + _this.id, function(event, visible) {
        var panel = _this.element.find('.bottomPanel');
        if (visible === true) {
          panel.css({transform: 'translateY(0)'});
        } else {
          panel.css({transform: 'translateY(100%)'});
        }

      });
      
      jQuery.subscribe('annotationCreated.'+_this.id, function(event, oaAnno, osdOverlay) {
        jQuery.each(_this.endpoints, function(key, endpoint) {
          var annoID = String(endpoint.save(oaAnno)); //just in case it returns a number
          oaAnno['@id'] = annoID;
          _this.annotationsList.push(oaAnno);
          //update overlay so it can be a part of the annotationList rendering
          jQuery(osdOverlay).removeClass('osd-select-rectangle').addClass('annotation').attr('id', annoID);
        });
        jQuery.publish(('annotationListLoaded.' + _this.id));
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

    //only panels and overlay available to this view, make rest hidden while on this view
    updatePanelsAndOverlay: function(state) {
      var _this = this;

      jQuery.each(this.focusOverlaysAvailable[state], function(panelType, viewOptions) {
        jQuery.each(viewOptions, function(view, displayed) {
          //instantiate any panels that exist for this view but are still null
          if (view !== '' && _this[panelType] === null) {
            _this[panelType] = new $[view]({
              manifest: _this.manifest, 
              appendTo: _this.element.find('.'+panelType), 
              parent: _this, 
              panel: true, 
              imageID: _this.currentImageID, 
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
      if (this.bottomPanel) { this.bottomPanel.updateFocusImages(this.focusImages); }
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
    
    setTOCBoolean: function(boolValue) {
      var _this = this;
      jQuery.each(this.focusOverlaysAvailable, function(key, value) {
         _this.focusOverlaysAvailable[key].sidePanel.TableOfContents = boolValue;
      });
      //remove thumbnail icon if not available for this object
      if (!boolValue) {
        this.element.find('.mirador-icon-toc').hide();
      }
    },

    togglePanels: function(panelType, panelState, viewType, focusState) {
      //update state in focusOverlaysAvailable
      this.focusOverlaysAvailable[focusState][panelType][viewType] = panelState;
      this[panelType].toggle(panelState);
      this.adjustFocusSize(panelType, panelState);
    },

    minMaxSidePanel: function(element) {
      if (this.element.find('.sidePanel').hasClass('minimized')) {
        element.find('.fa-list').switchClass('fa-list', 'fa-caret-down');
        element.addClass('selected').css('background','#efefef');
        this.element.find('.sidePanel').removeClass('minimized').width(280).css('border-right', '1px solid lightgray');
        this.element.find('.view-container').css('margin-left', 280);
    } else {
        element.find('.fa-caret-down').switchClass('fa-caret-down', 'fa-list');
        element.removeClass('selected').css('background', '#fafafa');
        this.element.find('.view-container').css('margin-left', 0);
        this.element.find('.sidePanel').addClass('minimized').css('border', 'none').width(0);
    }
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
      jQuery.publish("focusUpdated", {
                       id: _this.id, 
                       viewType: _this.currentFocus, 
                       canvasID: _this.currentImageID, 
                       imageMode: _this.currentImageMode, 
                       loadedManifest: _this.manifest['@id']});
    },

    toggleThumbnails: function(imageID) {
      if (this.focusModules.ThumbnailsView === null) {
        this.focusModules.ThumbnailsView = new $.ThumbnailsView( {manifest: this.manifest, appendTo: this.element.find('.view-container'), parent: this, imageID: this.currentImageID, imagesList: this.imagesList} );
      } else {
        var view = this.focusModules.ThumbnailsView;
        view.updateImage(imageID);
      }
      this.toggleFocus('ThumbnailsView', '');
    },

    toggleImageView: function(imageID) {
      this.currentImageID = imageID;
      if (this.focusModules.ImageView === null) {
        this.focusModules.ImageView = new $.ImageView( {manifest: this.manifest, 
                                                        appendTo: this.element.find('.view-container'), 
                                                        parent: this, 
                                                        windowId: this.id,
                                                        imageID: imageID, 
                                                        imagesList: this.imagesList,
                                                        osdOptions: this.focusOptions,
                                                        bottomPanelAvailable: this.bottomPanelAvailable} );
      } else {
        var view = this.focusModules.ImageView;
        view.updateImage(imageID);
      }
      this.toggleFocus('ImageView', 'ImageView');
    },

    toggleBookView: function(imageID) {
      this.currentImageID = imageID;
      if (this.focusModules.BookView === null) {
        this.focusModules.BookView = new $.BookView({
          manifest: this.manifest, 
          appendTo: this.element.find('.view-container'), 
          parent: this, 
          windowId: this.id,
          imageID: imageID, 
          imagesList: this.imagesList,
          osdOptions: this.focusOptions
        });
      } else {
        var view = this.focusModules.BookView;
        view.updateImage(imageID);
      }
      this.toggleFocus('BookView', 'BookView');
    },

    toggleScrollView: function(imageID) {
      this.currentImageID = imageID;
      if (this.focusModules.ScrollView === null) {
        var containerHeight = this.element.find('.view-container').height();
        this.focusModules.ScrollView = new $.ScrollView( 
                                                            {manifest: this.manifest, 
                                                              appendTo: this.element.find('.view-container'), 
                                                              parent: this, 
                                                              imageID: this.currentImageID, 
                                                              imagesList: this.imagesList, 
                                                              thumbInfo: {thumbsHeight: Math.floor(containerHeight * this.scrollImageRatio), listingCssCls: 'scroll-listing-thumbs', thumbnailCls: 'scroll-view'}}
                                                           );
      } else {
        var view = this.focusModules.ScrollView;
        view.updateImage(imageID);
      }
      this.toggleFocus('ScrollView', '');    
    },

    loadImageModeFromPanel: function(imageID) {
      var _this = this;
      switch(_this.currentImageMode) {
        case 'ImageView':
          _this.toggleImageView(imageID);
        break;
        case 'BookView':
          _this.toggleBookView(imageID);
        break;
        default:
          break;
      }
    },

    updateFocusImages: function(imageList) {
      this.focusImages = imageList;
    },

    setCurrentImageID: function(imageID) {
      var _this = this;
      this.currentImageID = imageID;
      jQuery.unsubscribe(('annotationListLoaded.' + _this.id));
      while(_this.annotationsList.length > 0) {
       _this.annotationsList.pop();
      }
      this.getAnnotations();
      this.loadImageModeFromPanel(imageID);
      jQuery.publish(('currentImageIDUpdated.' + _this.id), imageID);
    },

    bottomPanelVisibility: function(visible) {
      var _this = this;
      _this.bottomPanelVisible = visible;
      jQuery.publish(('bottomPanelSet.' + _this.id), visible);
    },

    setCursorFrameStart: function(canvasID) {
    },

    updateManifestInfo: function() {
      var _this = this;
      this.element.find('.window-manifest-navigation').children().removeClass('selected');
      switch(_this.currentFocus) {
        case 'ThumbnailsView':
          //hide thumbnails button and highlight currentImageMode?
          _this.element.find('.mirador-icon-thumbs-view').addClass('selected');
        break;
        case 'ImageView':
          //highlight Single Image View option
          _this.element.find('.mirador-icon-image-view').addClass('selected');
        break;
        case 'BookView':
          //highlight Book View option
          _this.element.find('.mirador-icon-image-view').addClass('selected');
        break;
        case 'ScrollView':
          //highlight Scroll View option
          _this.element.find('.mirador-icon-thumbs-view').addClass('selected');
        break;
        default:
          break;
      }

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
      url = $.Iiif.getAnnotationsListUrl(_this.manifest, _this.currentImageID);

      if (url !== false) {
        jQuery.get(url, function(list) {
            _this.annotationsList = _this.annotationsList.concat(list.resources);
            jQuery.publish('annotationListLoaded.' + _this.id);
        });
      }
      
       //next check endpoints
       jQuery.each($.viewer.annotationEndpoints, function(index, value) {
          var dfd = jQuery.Deferred();
          var endpoint;
          if (_this.endpoints[value.module] && _this.endpoints[value.module] !== null) {
            endpoint = _this.endpoints[value.module];
            endpoint.set('dfd', dfd);
            endpoint.search(_this.currentImageID);
            //update with new search
          } else {
            value.options.element = _this.element;
            value.options.uri = _this.currentImageID;
            value.options.dfd = dfd;
            value.options.windowID = _this.id;
            endpoint = new $[value.module](value.options);
            _this.endpoints[value.module] = endpoint;
          }
         dfd.done(function(loaded) {
           _this.annotationsList = _this.annotationsList.concat(endpoint.annotationsList);
           //clear out some bad data
           _this.annotationsList = jQuery.grep(_this.annotationsList, function (value, index) {
             if (typeof value.on === "undefined") { 
               return false;
             }
             return true; 
           });
           jQuery.publish(('annotationListLoaded.' + _this.id), value.module);
         });
       });
    },

    // based on currentFocus
    bindNavigation: function() {
      var _this = this;
      
      this.element.find('.mirador-icon-image-view').mouseenter(
        function() {
        _this.element.find('.image-list').stop().slideFadeToggle(300);
      }).mouseleave(
      function() {
        _this.element.find('.image-list').stop().slideFadeToggle(300);
      });
      
      this.element.find('.mirador-icon-window-menu').mouseenter(
        function() {
        _this.element.find('.slot-controls').stop().slideFadeToggle(300);
      }).mouseleave(
      function() {
        _this.element.find('.slot-controls').stop().slideFadeToggle(300);
      });
      
      this.element.find('.single-image-option').on('click', function() {
        _this.toggleImageView(_this.currentImageID);
      });

      this.element.find('.book-option').on('click', function() {
        _this.toggleBookView(_this.currentImageID);
      });

      this.element.find('.scroll-option').on('click', function() {
        _this.toggleScrollView(_this.currentImageID);
      });
      
      this.element.find('.thumbnails-option').on('click', function() {
        _this.toggleThumbnails(_this.currentImageID);
      });

      this.element.find('.mirador-icon-metadata-view').on('click', function() {
        _this.toggleMetadataOverlay(_this.currentFocus);
      });
      
      this.element.find('.mirador-icon-toc').on('click', function() {
        _this.minMaxSidePanel(jQuery(this));
      });
      
      this.element.find('.new-object-option').on('click', function() {
        _this.parent.addItem();
      });

      this.element.find('.remove-object-option').on('click', function() {
        $.viewer.activeWorkspace.removeNode(_this.parent);
      });

      this.element.find('.add-slot-right').on('click', function() {
        $.viewer.activeWorkspace.splitRight(_this.parent);
      });
      
      this.element.find('.add-slot-left').on('click', function() {
        $.viewer.activeWorkspace.splitLeft(_this.parent);
      });

      this.element.find('.add-slot-below').on('click', function() {
        $.viewer.activeWorkspace.splitDown(_this.parent);
      });
      
      this.element.find('.add-slot-above').on('click', function() {
        $.viewer.activeWorkspace.splitUp(_this.parent);
      });
    },

    // template should be based on workspace type
    template: Handlebars.compile([
                                 '<div class="window">',
                                  '<div class="content-container">',
                                   '<div class="sidePanel">',
                                   '</div>',
                                   '<div class="view-container">',
                                    '<div class="overlay"></div>',
                                    '<div class="bottomPanel">',
                                    '</div>',
                                   '</div>',
                                  '</div>',
                                 '</div>'
    ].join('')),

    manifestInfoTemplate: Handlebars.compile([
      '<div class="manifest-info">',
        '<div class="window-manifest-navigation">',
          '<a href="javascript:;" class="mirador-btn mirador-icon-image-view"><i class="fa fa-photo fa-lg fa-fw"></i>',
            '<ul class="dropdown image-list">',
              '{{#if ImageView}}',
                '<li class="single-image-option"><i class="fa fa-photo fa-lg fa-fw"></i> Image View</li>',
              '{{/if}}',
              '{{#if BookView}}',
                '<li class="book-option"><i class="fa fa-columns fa-lg fa-fw"></i> Book View</li>',
              '{{/if}}',
              '{{#if ScrollView}}',
                '<li class="scroll-option"><i class="fa fa-ellipsis-h fa-lg fa-fw"></i> Scroll View</li>',
              '{{/if}}',
            '</ul>',
          '</a>',
          '<a href="javascript:;" class="mirador-btn mirador-icon-thumbs-view thumbnails-option"><i class="fa fa-th fa-lg fa-rotate-90 fa-fw"></i>',
          '</a>',
          '{{#if MetadataView}}',
            '<a href="javascript:;" class="mirador-btn mirador-icon-metadata-view" title="Object Metadata"><i class="fa fa-info-circle fa-lg fa-fw"></i></a>',
          '{{/if}}',
        '</div>',
          '<a href="javascript:;" class="mirador-btn mirador-icon-window-menu" title="Replace object"><i class="fa fa-table fa-lg fa-fw"></i>',
            '<ul class="dropdown slot-controls">',
                '<li class="new-object-option"><i class="fa fa-plus-square fa-lg fa-fw"></i> New Object</li>',
                '<li class="remove-object-option"><i class="fa fa-times fa-lg fa-fw"></i> Close</li>',
                '<li class="add-slot-right"><i class="fa fa-caret-square-o-right fa-lg fa-fw"></i> Add Slot Right</li>',
                '<li class="add-slot-left"><i class="fa fa-caret-square-o-left fa-lg fa-fw"></i> Add Slot Left</li>',
                '<li class="add-slot-above"><i class="fa fa-caret-square-o-up fa-lg fa-fw"></i> Add Slot Above</li>',
                '<li class="add-slot-below"><i class="fa fa-caret-square-o-down fa-lg fa-fw"></i> Add Slot Below</li>',
            '</ul>',
          '</a>',
          '<a href="javascript:;" class="mirador-btn mirador-icon-toc selected" title="View/Hide Table of Contents"><i class="fa fa-caret-down fa-lg fa-fw"></i></a>',
        '<h3 class="window-manifest-title">{{title}}</h3>',
      '</div>'
    ].join(''))
  };

}(Mirador));

