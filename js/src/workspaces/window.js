(function($) {

  $.Window = function(options) {

    jQuery.extend(true, this, {
      element:           null,
      appendTo:          null,
      manifest:          null,
      currentImg:        null,
      defaultState:      'ThumbnailsView',
      uiState:           {'ThumbnailsView': false, 'ImageView': false, 'ScrollView': false, 'BookView': false},
      uiViews:           {'ThumbnailsView': null, 'ImageView': null, 'ScrollView': null, 'BookView': null},
      overlayState:      {'MetadataView': false, 'TableOfContentsView': false, 'ThumbnailsView' : false},
      overlayViews:      {'MetadataView': null, 'TableOfContentsView' : null, 'ThumbnailsView': null},
      uiOverlaysAvailable: {
        'ThumbnailsView': ['MetadataView'], 
        'ImageView': ['MetadataView', 'TableOfContentsView', 'ThumbnailsView'],
        'ScrollView': ['MetadataView', 'TableOfContentsView'],
        'BookView': ['MetadataView', 'TableOfContentsView', 'ThumbnailsView']
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

      jQuery.subscribe('manifestToWindow', function(_, manifest, uiState) {
        if (uiState) {
          _this.updateState(uiState);
        } else {             
          _this.updateState(_this.defaultState);
        }
        jQuery.each(_this.uiState, function(key, value){ 
          if (value && _this.manifest != manifest) {
            _this.clearWindow();
            _this.manifest = manifest;
            _this.element.prepend(_this.manifestInfoTemplate({title: manifest.label}));
            _this.element.find('.mirador-icon-thumbnails-view').on('click', function() {
              _this.toggleThumbnails();
            });
            _this.clearViews();
            _this.uiViews[key] = new $[key]( {manifest: manifest, appendTo: _this.element, parent: _this} );
            _this.toggleUI(key);
          }
        });
      });

      jQuery.subscribe('toggleImageView', function(_, imageID) {
        _this.toggleImageView(imageID);	
      });

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
    },

    toggleThumbnails: function() {
      if (this.uiViews.ThumbnailsView === null) {
        this.uiViews.ThumbnailsView = new $.ThumbnailsView( {manifest: this.manifest, appendTo: this.element, parent: this} );
      }
      this.toggleUI('ThumbnailsView');
    },

    toggleImageView: function(imageID) {
      if (this.uiViews.ImageView === null) {
        this.uiViews.ImageView = new $.ImageView( {manifest: this.manifest, appendTo: this.element, parent: this, imageID: imageID} );
      } else {
        var view = this.uiViews.ImageView;
        view.updateImage(imageID);
      }
      this.toggleUI('ImageView');
    },

    //template should be based on workspace type
    template: Handlebars.compile([
                                 '<div class="window">',
                                   '<div class="content-container">',
                                     '<div id="sidePanel"></div>',
                                     '<div id="view">',
                                       '<div id="bottomPanel"></div>',
                                     '</div>',
                                   '</div>',
                                 '</div>'
    ].join('')),

    manifestInfoTemplate: Handlebars.compile([
                                             '<div class="manifest-info">',
                                             '<div class="window-manifest-navigation">',
                                             '<a href="javascript:;" class="mirador-btn mirador-icon-thumbnails-view"></a>',
                                             '</div>',
                                             '<h3 class="window-manifest-title">{{title}}</h3>',
                                             '</div>'
    ].join(''))
  };

}(Mirador));

