(function($) {

  $.Window = function(options) {

    jQuery.extend(true, this, {
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
      id : null,
      sidePanel: null,
      bottomPanel: null,
      overlay: null
    }, options);

    this.init();

  };

  $.Window.prototype = {
    init: function () {
      _this = this,
      manifest = _this.manifest,
      focusState = _this.currentFocus,
      _this.id = $.genUUID();

      _this.element = jQuery(this.template()).appendTo(this.appendTo).hide().fadeIn(300);

      //reset the window div and update manifest
      _this.clearWindow();
      _this.imagesList = $.getImagesListByManifest(_this.manifest);
      if (!_this.currentImageID) {
        _this.currentImageID = _this.imagesList[0]['@id'];
      }

      _this.element.prepend(_this.manifestInfoTemplate({title: manifest.label}));

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

    bindEvents: function() {
      var _this = this;

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

    togglePanels: function(panelType, panelState, viewType, focusState) {
      //update state in focusOverlaysAvailable
      this.focusOverlaysAvailable[focusState][panelType][viewType] = panelState;
      this[panelType].toggle(panelState);
      this.adjustFocusSize(panelType, panelState);
    },

    minMaxBottomPanel: function(element) {
      if (element.hasClass('mirador-icon-minimize')) {
        //hide all other siblings, change icon to maximize, change height of parent
        element.removeClass('mirador-icon-minimize').addClass('mirador-icon-maximize');
        element.siblings().hide();
        element.parent().addClass('minimized');
        //adjust height of focus element
        this.focusModules[this.currentFocus].adjustHeight('focus-bottom-panel-minimized', false);
      } else {
        //show all other siblings, change icon to minimize, change height of parent
        element.removeClass('mirador-icon-maximize').addClass('mirador-icon-minimize');
        element.siblings().show();
        element.parent().removeClass('minimized');
        //adjust height of focus element
        this.focusModules[this.currentFocus].adjustHeight('focus-bottom-panel-minimized', true);
      }
    },

    adjustFocusSize: function(panelType, panelState) {
      if (panelType === 'bottomPanel') {
        this.focusModules[this.currentFocus].adjustHeight('focus-max-height', panelState);
      } else if (panelType === 'sidePanel') {
        this.focusModules[this.currentFocus].adjustWidth('focus-max-height', panelState);
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
      jQuery.publish(('currentImageIDUpdated.' + _this.id), {newImageID : imageID});
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

      this.element.find('.mirador-thumb-panel').on('click', function() {
        _this.minMaxBottomPanel(jQuery(this));
      });
    },

    // template should be based on workspace type
    template: Handlebars.compile([
                                 '<div class="window">',
                                 '<div class="content-container">',
                                 '<div class="sidePanel"></div>',
                                 '<div class="view-container">',
                                 '<div class="overlay"></div>',
                                 '<div class="bottomPanel">',
                                 '<span class="mirador-btn mirador-thumb-panel mirador-icon-minimize"></span>',
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
                                             '<li class="single-image-option">Single Image View</li>',
                                             '<li class="book-option">Book View</li>',
                                             '</ul>',
                                             '</a>',
                                             '<a href="javascript:;" class="mirador-btn mirador-icon-thumbnails-view"></a>',
                                             '<a href="javascript:;" class="mirador-btn mirador-icon-scroll-view"></a>',
                                             '<a href="javascript:;" class="mirador-btn mirador-icon-metadata-view"></a>',
                                             '</div>',
                                             '<h3 class="window-manifest-title">{{title}}</h3>',
                                             '</div>'
    ].join(''))
  };

}(Mirador));

