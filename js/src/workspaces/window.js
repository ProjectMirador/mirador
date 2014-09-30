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
      currentImageMode:  'ImageView',
      imageModes:        ['ImageView', 'BookView'],
      currentFocus:      'ThumbnailsView',
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
      templateData = {};
      
      //unsubscribe from stale events as they will be updated with new module calls
      jQuery.unsubscribe(('currentImageIDUpdated.' + _this.id));

      _this.element = jQuery(this.template()).appendTo(this.appendTo);
      
      if (manifest.sequences[0].viewingHint) {
           if (manifest.sequences[0].viewingHint.toLowerCase() !== 'paged') {
              //disable bookview for this object because it's not a paged object
              this.focuses = jQuery.grep(this.focuses, function(value) {
                 return value !== 'BookView';
              });
           }
       }
      
      //remove any imageModes that are not available as a focus
      this.imageModes = jQuery.map(this.imageModes, function(value, index) {
         if (jQuery.inArray(value, _this.focuses) === -1) return null;  
         return value;
      });

      _this.imagesList = $.getImagesListByManifest(_this.manifest);
      if (!_this.currentImageID) {
        _this.currentImageID = _this.imagesList[0]['@id'];
      }

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

    bindEvents: function() {
      var _this = this;

      //this event should trigger from layout      
      jQuery.subscribe('scrollViewResize', $.debounce(function(){
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
        console.log(visible);
        var panel = _this.element.find('.bottomPanel');
        if (visible.visible === true) {
          panel.css({transform: 'translateY(0)'});
        } else {
          panel.css({transform: 'translateY(100%)'});
        }

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
    },

    togglePanels: function(panelType, panelState, viewType, focusState) {
      //update state in focusOverlaysAvailable
      this.focusOverlaysAvailable[focusState][panelType][viewType] = panelState;
      this[panelType].toggle(panelState);
      this.adjustFocusSize(panelType, panelState);
    },

    minMaxSidePanel: function(element) {
      if (element.hasClass('mirador-icon-minimize')) {
        //hide all other siblings, change icon to maximize, change height of parent
        element.removeClass('mirador-icon-minimize').addClass('mirador-icon-maximize');
        element.siblings().hide();
        element.parent().addClass('minimized');
        //adjust height of focus element
        this.focusModules[this.currentFocus].adjustWidth('focus-side-panel-minimized', false);
      } else {
        //show all other siblings, change icon to minimize, change height of parent
        element.removeClass('mirador-icon-maximize').addClass('mirador-icon-minimize');
        element.siblings().show();
        element.parent().removeClass('minimized');
        //adjust height of focus element
        this.focusModules[this.currentFocus].adjustWidth('focus-side-panel-minimized', true);
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
                                                        imageID: imageID, 
                                                        imagesList: this.imagesList,
                                                        osdOptions: this.focusOptions} );
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
      this.loadImageModeFromPanel(imageID);
      jQuery.publish(('currentImageIDUpdated.' + _this.id), imageID);
    },

    bottomPanelVisibility: function(visible) {
      var _this = this;
      _this.bottomPanelVisible = visible;
      jQuery.publish(('bottomPanelSet.' + _this.id), {visible: visible });
    },

    setCursorFrameStart: function(canvasID) {
    },

    updateManifestInfo: function() {
      var _this = this;
      this.element.find('.window-manifest-navigation').children().removeClass('selected');
      switch(_this.currentFocus) {
        case 'ThumbnailsView':
          //hide thumbnails button and highlight currentImageMode?
          _this.element.find('.mirador-icon-thumbnails-view').addClass('selected');
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
          _this.element.find('.mirador-icon-scroll-view').addClass('selected');
        break;
        default:
          break;
      }

      if (this.focusOverlaysAvailable[this.currentFocus].overlay.MetadataView) {
        this.element.find('.mirador-icon-metadata-view').addClass('selected');
      }
    },

    // based on currentFocus
    bindNavigation: function() {
      var _this = this;
      
      this.element.find('.mirador-icon-empty-slot').on('click', function() {
        _this.parent.clearSlot();
        jQuery.publish("windowRemoved", _this.id);
      });
      
      this.element.find('.mirador-icon-new-object').on('click', function() {
        _this.parent.addItem();
        //jQuery.publish("windowRemoved", _this.id);
      });
      
      this.element.find('.mirador-icon-thumbnails-view').on('click', function() {
        _this.toggleThumbnails(_this.currentImageID);
      });

      this.element.find('.mirador-icon-metadata-view').on('click', function() {
        _this.toggleMetadataOverlay(_this.currentFocus);
      });

      this.element.find('.mirador-icon-image-view').mouseenter(
        function() {
        _this.element.find('.image-list').stop().slideFadeToggle(300);
      }).mouseleave(
      function() {
        _this.element.find('.image-list').stop().slideFadeToggle(300);
      });

      this.element.find('.single-image-option').on('click', function() {
        _this.toggleImageView(_this.currentImageID);
      });

      this.element.find('.book-option').on('click', function() {
        _this.toggleBookView(_this.currentImageID);
      });

      this.element.find('.mirador-icon-scroll-view').on('click', function() {
        _this.toggleScrollView(_this.currentImageID);
      });

      this.element.find('.mirador-side-panel').on('click', function() {
        _this.minMaxSidePanel(jQuery(this));
      });
    },

    // template should be based on workspace type
    template: Handlebars.compile([
                                 '<div class="window">',
                                  '<div class="content-container">',
                                   '<div class="sidePanel">',
                                    '<span class="mirador-btn mirador-side-panel mirador-icon-minimize"></span>',
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
                                             '<a href="javascript:;" class="mirador-btn mirador-icon-image-view"><i class="fa fa-photo fa-2x"></i>',
                                             '<ul class="image-list">',
                                             '{{#if ImageView}}',
                                             '<li class="single-image-option">Single Image View</li>',
                                             '{{/if}}',
                                             '{{#if BookView}}',
                                             '<li class="book-option">Book View</li>',
                                             '{{/if}}',
                                             '</ul>',
                                             '</a>',
                                             '{{#if ThumbnailsView}}',
                                             '<a href="javascript:;" class="mirador-btn mirador-icon-thumbnails-view" title="Thumbnails View"></a>',
                                             '{{/if}}',
                                             '{{#if ScrollView}}',
                                             '<a href="javascript:;" class="mirador-btn mirador-icon-scroll-view" title="Scroll View"></a>',
                                             '{{/if}}',
                                             '{{#if MetadataView}}',
                                             '<a href="javascript:;" class="mirador-btn mirador-icon-metadata-view" title="Object Metadata"></a>',
                                             '{{/if}}',
                                             '</div>',
                                             '<h3 class="window-manifest-title">',
                                             '<a href="javascript:;" class="mirador-btn mirador-icon-empty-slot" title="Remove object"><i class="fa fa-times"></i> </a>',
                                             '<a href="javascript:;" class="mirador-btn mirador-icon-new-object" title="Replace object"><i class="fa fa-exchange fa-rotate-90"></i> </a>',
                                             '{{title}}</h3>',
                                             '</div>'
    ].join(''))
  };

}(Mirador));

