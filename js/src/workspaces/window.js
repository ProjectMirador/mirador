(function($) {

  $.Window = function(options) {

    jQuery.extend(true, this, {
      element:           null,
      appendTo:          null,
      manifest:          null,
      currentImageID:    null,
      focusImages:       [],
      imagesList:        null,
      currentImageMode:  'ImageView',
      //imageModes:        ['ImageView', 'BookView'], //ScrollView //for drop down menu
      defaultState:      'ThumbnailsView',
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
      sidePanel: null,
      bottomPanel: null,
      overlay: null

    }, $.DEFAULT_SETTINGS, options);

    this.init();

  };

  $.Window.prototype = {
    init: function () {
      this.element = jQuery(this.template()).appendTo(this.appendTo);

      this.bindEvents();
    },

    bindEvents: function() {
      var _this = this;

      jQuery.subscribe('manifestToWindow', function(_, manifest, focusState, imageID) {
        //empty or invalid focus state, use default state
        if (!focusState || jQuery.inArray(focusState, _this.focuses) === -1 ) {
           focusState = _this.defaultState;
        }
        
        // update panels and overlay state to default?
        
          if (_this.manifest === manifest) { return; }

            //reset the window div and update manifest
            _this.clearWindow();
            _this.manifest = manifest;
            _this.imagesList = $.getImagesListByManifest(_this.manifest);
            if (imageID) {
                _this.currentImageID = imageID;
            } else {
                _this.currentImageID = _this.imagesList[0]['@id'];
            }

            //add manifest title and complete nav bar and bind nav bar events for particular focus
            _this.element.prepend(_this.manifestInfoTemplate({title: manifest.label}));
            
            //clear any existing objects
            _this.clearViews();
            _this.clearPanelsAndOverlay();
            
            //attach view and toggle view, which triggers the attachment of panels or overlays
            _this.focusModules[focusState] = new $[focusState]( {manifest: manifest, appendTo: _this.element.find('.view-container'), parent: _this, imageID: imageID, imagesList: _this.imagesList} );
            _this.bindNavigation();
            _this.toggleFocus(focusState);
      });

    },

    clearViews: function() {
      var _this = this;
      jQuery.each(_this.focusModules, function(key, value) {
        _this.focusModules[key] = null;
      });
    },

    clearWindow: function() {
      this.element.remove();
      this.element = jQuery(this.template()).appendTo(this.appendTo);
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
                    _this[panelType] = new $[view]({manifest: _this.manifest, appendTo: _this.element.find('.'+panelType), parent: _this, panel: true, imageID: _this.currentImageID, imagesList: _this.imagesList});
                }
                //toggle any valid panels
                if (view !== '' && displayed) {   
                    _this.togglePanels(panelType, displayed, view, state);
                }
                //hide any panels instantiated but not available to this view
                if (view === '' && _this[panelType]) {
                   _this.togglePanels(panelType, displayed, view, state);
                }
                //update current image for all valid panels
            });
        });
        
        //update panels with current image
        if (this.sidePanel) { this.sidePanel.updateFocusImages(this.focusImages); }
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
   
    togglePanels: function(panelType, panelState, viewType, focusState) {
        //update state in focusOverlaysAvailable
        this.focusOverlaysAvailable[focusState][panelType][viewType] = panelState;
        this[panelType].toggle(panelState);
        if (panelType === "sidePanel") {
            //side panel should adjust width of view-container
            
        }
    },
    
    toggleMetadataOverlay: function(focusState) {
        this.togglePanels('overlay', !this.focusOverlaysAvailable[focusState].overlay.MetadataView, 'MetadataView', focusState);
    },

    toggleFocus: function(focusState, imageMode) {
      var _this = this;
      
      this.currentFocus = focusState;
      if (imageMode) {
          this.currentImageMode = imageMode;
      }
      //set other focusStates to false (toggle to display none)
      jQuery.each(this.focusModules, function(index, module) {
         if (module) {
             module.toggle(false);
         }
      });
      this.focusModules[focusState].toggle(true);
      this.updateManifestInfo();
      this.updatePanelsAndOverlay(focusState);
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
        this.focusModules.ImageView = new $.ImageView( {manifest: this.manifest, appendTo: this.element.find('.view-container'), parent: this, imageID: imageID, imagesList: this.imagesList} );
      } else {
        var view = this.focusModules.ImageView;
        view.updateImage(imageID);
      }
      this.toggleFocus('ImageView', 'ImageView');
    },

    toggleBookView: function(imageID) {
        this.currentImageID = imageID;
        if (this.focusModules.BookView === null) {
           this.focusModules.BookView = new $.BookView( {manifest: this.manifest, appendTo: this.element.find('.view-container'), parent: this, imageID: imageID, imagesList: this.imagesList} );
        } else {
           var view = this.focusModules.BookView;
           view.updateImage(imageID);
        }
        this.toggleFocus('BookView', 'BookView');
    },

    toggleScrollView: function(imageID) {
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
            case 'ScrollView':
               _this.toggleScrollView(imageID);
               break;
            default:
               break;
        }
    },
    
    updateFocusImages: function(imageList) {
        this.focusImages = imageList;
    },
    
    updateManifestInfo: function() {
        var _this = this;
        this.element.find('.window-manifest-navigation').children().show();
        switch(_this.currentFocus) {
            case 'ThumbnailsView':
                //hide thumbnails button and highlight currentImageMode?
                _this.element.find('.mirador-icon-thumbnails-view').hide();
                break;
            case 'ImageView':
                //highlight Single Image View option
                break;
            case 'BookView':
                //highlight Book View option
                break;
            case 'ScrollView':
               //highlight Scroll View option
               break;
            default:
               break;
        }
    },
    
    //based on currentFocus
    bindNavigation: function() {
        var _this = this;
        this.element.find('.mirador-icon-thumbnails-view').on('click', function() {
            _this.toggleThumbnails(_this.currentImageID);
        });
        
        this.element.find('.mirador-icon-metadata-view').on('click', function() {
            _this.toggleMetadataOverlay(_this.currentFocus);
        });
        
        this.element.find('.mirador-icon-image-view').mouseenter(
            function() {
              _this.element.find('.image-list').fadeIn();
            }).mouseleave(
            function() {
              _this.element.find('.image-list').fadeOut();
            });
        
        this.element.find('.single-image-option').on('click', function() {
           _this.toggleImageView(_this.currentImageID);
        });
                
        this.element.find('.book-option').on('click', function() {
           _this.toggleBookView(_this.currentImageID);
        });
        
        /*this.element.find('.scroll-option').on('click', function() {
           _this.toggleScrollView(_this.currentImageID);
        });*/
    },

    //template should be based on workspace type
    template: Handlebars.compile([
     '<div class="window">',
       '<div class="content-container">',
         '<div class="sidePanel"></div>',
         '<div class="view-container">',
           '<div class="overlay"></div>',
           '<div class="bottomPanel"></div>',
         '</div>',
       '</div>',
     '</div>'
    ].join('')),

    manifestInfoTemplate: Handlebars.compile([
                                             '<div class="manifest-info">',
                                             '<div class="window-manifest-navigation">',
                                             '<a href="javascript:;" class="mirador-btn mirador-icon-image-view"><i class="fa fa-photo fa-2x"></i>',
                                             '<ul class="image-list">',
                                                   '<li class="single-image-option">Single Image View</li>',
                                                   '<li class="book-option">Book View</li>',
                                                   '<li class="scroll-option">Scroll View</li>',
                                                 '</ul>',
                                             '</a>',
                                             '<a href="javascript:;" class="mirador-btn mirador-icon-thumbnails-view"></a>',
                                             '<a href="javascript:;" class="mirador-btn mirador-icon-metadata-view"></a>',
                                             '</div>',
                                             '<h3 class="window-manifest-title">{{title}}</h3>',
                                             '</div>'
    ].join(''))
  };

}(Mirador));

