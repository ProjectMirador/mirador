(function($) {

  $.Window = function(options) {

     jQuery.extend(true, this, {
         element:           null,
         appendTo:          null,
         manifest:          null,
         currentImg:        null,
         uiState:           {'ThumbnailsView': true, 'ImageView': false},
         uiViews:           {'ThumbnailsView': null, 'ImageView': null},
         overlayState:      {'metadata': false, 'toc': false, 'thumbnails' : false}
         
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
            
            jQuery.subscribe('manifestToWindow', function(_, manifest) {                
                jQuery.each(_this.uiState, function(key, value){ 
                    if (value && _this.manifest != manifest) {
                        _this.element.empty();
                        _this.manifest = manifest;
                        _this.element.append('<h3 class="manifest-title">' + manifest.label + '</h3>');
                        _this.uiViews[key] = new $[key]( {manifest: manifest, appendTo: _this.element, parent: _this} );
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
            jQuery.publish(prop + '.set', value);
      },
      
      // One UI must always be on      
      toggleUI: function(state) {
            _this = this;

            jQuery.each(this.uiState, function(key, value) {
                if (key != state && _this.get(key, 'uiState') === true) {
                    _this.set(key, false, {parent: 'uiState'});
                }
            });
            this.set(state, true, {parent: 'uiState'});
        },
        
        toggleThumbnails: function() {
            this.toggleUI('ThumbnailsView');
        },
        
        toggleImageView: function(imageID) {
            if (this.uiViews.ImageView === null) {
                this.uiViews.ImageView = new $.ImageView( {manifest: this.manifest, appendTo: this.element, parent: this, imageID: imageID} );
            } else {
            //update current image in image view
            }
            this.toggleUI('ImageView');
        },
      
      //template should be based on workspace type
      template: Handlebars.compile([
      '<div class="window">',
      '</div>'
      ].join(''))
  };

}(Mirador));

