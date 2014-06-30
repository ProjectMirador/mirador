(function($) {

  $.Window = function(options) {

    jQuery.extend(true, this, {
      element:           null,
      appendTo:          null,
      manifest:          null,
      currentImageID:    null,
      imagesList:        null,
      defaultState:      'ThumbnailsView',
      uiState:           {'ThumbnailsView': false, 'ImageView': false, 'ScrollView': false, 'BookView': false},
      uiViews:           {'ThumbnailsView': null, 'ImageView': null, 'ScrollView': null, 'BookView': null},
      //overlayState:      {'MetadataView': false, 'TableOfContentsView': false, 'ThumbnailsView' : false},
      //overlayViews:      {'MetadataView': null, 'TableOfContentsView' : null, 'ThumbnailsView': null},
      uiOverlaysAvailable: {
          'ThumbnailsView': {
              'overlay' : {'MetadataView' : false}, 
              'sidePanel' : {'TableOfContents' : true}, //'TableOfContentsView',
               'bottomPanel' : {'' : false}
          },
          'ImageView': {
              'overlay' : {'MetadataView' : false}, 
              'sidePanel' : {'TableOfContents' : true}, //'TableOfContentsView', 
              'bottomPanel' : {'ThumbnailsView' : true}
          },
          'ScrollView': {
              'overlay' : {'MetadataView' : false}, 
              'sidePanel' : {'TableOfContents' : true}, //'TableOfContentsView',
              'bottomPanel' : {'' : false}
          },
          'BookView': {
              'overlay' : {'MetadataView' : false},
              'sidePanel' : {'TableOfContents' : true}, //'TableOfContentsView', 
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
      this.updateState(this.defaultState);

      this.element = jQuery(this.template()).appendTo(this.appendTo);

      this.bindEvents();
    },

    bindEvents: function() {
      var _this = this;

      jQuery.subscribe('manifestToWindow', function(_, manifest, uiState, imageID) {
        if (uiState) {
          _this.updateState(uiState);
        } else {             
          _this.updateState(_this.defaultState);
        }
        
        //update panels and overlay state to default?
        
        jQuery.each(_this.uiState, function(key, value){ 
          if (value && _this.manifest != manifest) {

            //reset the window div and update manifest
            _this.clearWindow();
            _this.manifest = manifest;
            _this.imagesList = $.getImagesListByManifest(_this.manifest);
            if (imageID) {
                _this.currentImageID = imageID;
            } else {
                _this.currentImageID = _this.imagesList[0]['@id'];
            }

            //add manifest title and nav bar and bind nav bar events
            _this.element.prepend(_this.manifestInfoTemplate({title: manifest.label}));
            _this.element.find('.mirador-icon-thumbnails-view').on('click', function() {
              _this.toggleThumbnails();
            });
            _this.element.find('.mirador-icon-metadata-view').on('click', function() {
              _this.toggleMetadataOverlay(key);
            });
            _this.element.find('.mirador-icon-image-view').on('click', function() {
              _this.toggleBookView();
            });
            
            //clear any existing objects
            _this.clearViews();
            _this.clearPanelsAndOverlay();
            
            //attach view and toggle view, which triggers the attachment of panels or overlays
            _this.uiViews[key] = new $[key]( {manifest: manifest, appendTo: _this.element.find('.view-container'), parent: _this, imageID: imageID, imagesList: _this.imagesList} );
            _this.toggleUI(key);
          }
        });
      });

      /*jQuery.subscribe('toggleImageView', function(_, imageID) {
        _this.toggleImageView(imageID);	
      });*/

    },

    updateState: function(state) {
      var _this = this;
      jQuery.each(this.uiState, function(key, value) {
        if (key === state) {
          _this.uiState[key] = true;
        } else {
          _this.uiState[key] = false;
        }
      });
    },

    clearViews: function() {
      var _this = this;
      jQuery.each(_this.uiViews, function(key, value) {
        _this.uiViews[key] = null;
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

        jQuery.each(this.uiOverlaysAvailable[state], function(panelType, viewOptions) {
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
            });
        });
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
   
    togglePanels: function(panelType, panelState, viewType, uiState) {
        //update state in uiOverlaysAvailable
        this.uiOverlaysAvailable[uiState][panelType][viewType] = panelState;
        this[panelType].toggle(panelState);
        if (panelType === "sidePanel") {
            //side panel should adjust width of view-container
            
        }
    },
    
    toggleMetadataOverlay: function(uiState) {
        this.togglePanels('overlay', !this.uiOverlaysAvailable[uiState].overlay.MetadataView, 'MetadataView', uiState);
    },

    // One UI must always be on      
    toggleUI: function(state) {
      var _this = this;

      jQuery.each(this.uiState, function(key, value) {
        if (key != state && _this.get(key, 'uiState') === true) {
          _this.set(key, false, {parent: 'uiState'});
          if (_this.uiViews[key]) {
            _this.uiViews[key].toggle(false);
          }
        }
      });
      this.set(state, true, {parent: 'uiState'});
      this.uiViews[state].toggle(true);
      this.updatePanelsAndOverlay(state);
    },

    toggleThumbnails: function() {
      if (this.uiViews.ThumbnailsView === null) {
        this.uiViews.ThumbnailsView = new $.ThumbnailsView( {manifest: this.manifest, appendTo: this.element.find('.view-container'), parent: this, imageID: this.currentImageID, imagesList: this.imagesList} );
      }
      this.toggleUI('ThumbnailsView');
    },

    toggleImageView: function(imageID) {
      this.currentImageID = imageID;
      if (this.uiViews.ImageView === null) {
        this.uiViews.ImageView = new $.ImageView( {manifest: this.manifest, appendTo: this.element.find('.view-container'), parent: this, imageID: imageID, imagesList: this.imagesList} );
      } else {
        var view = this.uiViews.ImageView;
        view.updateImage(imageID);
      }
      this.toggleUI('ImageView');
    },

    toggleBookView: function() {
        if (this.uiViews.BookView === null) {
           this.uiViews.BookView = new $.BookView( {manifest: this.manifest, appendTo: this.element.find('.view-container'), parent: this, imageID: this.currentImageID, imagesList: this.imagesList} );
        } else {
           var view = this.uiViews.BookView;
           view.update(this.currentImageID);
        }
        this.toggleUI('BookView');
    },

    toggleScrollView: function(imageID) {
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
                                             '<a href="javascript:;" class="mirador-btn mirador-icon-image-view"><i class="fa fa-photo"></i></a>',
                                             '<a href="javascript:;" class="mirador-btn mirador-icon-thumbnails-view"></a>',
                                             '<a href="javascript:;" class="mirador-btn mirador-icon-metadata-view"></a>',
                                             '</div>',
                                             '<h3 class="window-manifest-title">{{title}}</h3>',
                                             '</div>'
    ].join(''))
  };

}(Mirador));

