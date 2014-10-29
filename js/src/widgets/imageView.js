(function($) {

  $.ImageView = function(options) {

    jQuery.extend(this, {
      currentImg:       null,
      currentImgIndex:  0,
      imageID:          null,
      imagesList:       [],
      element:          null,
      parent:           null,
      manifest:         null,
      osd:              null,
      fullscreen:       null,
      osdOptions: {
        osdBounds:        null,
        zoomLevel:        null
      },
      osdCls: 'mirador-osd'
    }, options);

    this.init();
  };


  $.ImageView.prototype = {

    init: function() {    
      // check (for thumbnail view) if the imageID is set. 
      // If not, make it page/item 1.
      if (this.imageID !== null) {
        this.currentImgIndex = $.getImageIndexById(this.imagesList, this.imageID);
      }
      
      if (!this.osdOptions) {
        this.osdOptions = {
          osdBounds:        null,
          zoomLevel:        null
        };
      }
      this.currentImg = this.imagesList[this.currentImgIndex];
      this.element = jQuery(this.template()).appendTo(this.appendTo);
      this.createOpenSeadragonInstance($.Iiif.getImageUrl(this.currentImg));
      this.addAnnotationsLayer();
      this.parent.updateFocusImages([this.imageID]); // DRY/Events refactor.
      // The hud controls are consistent 
      // throughout any updates to the osd canvas.
      this.hud = new $.Hud({
        parent: this,
        element: this.element,
        bottomPanelAvailable: this.bottomPanelAvailable
      });
    },

    template: Handlebars.compile([
                                 '<div class="image-view">',
                                 '</div>'
    ].join('')),

    setBounds: function() {
      var _this = this;
      this.osdOptions.osdBounds = this.osd.viewport.getBounds(true);
      jQuery.publish("imageBoundsUpdated", {
        id: _this.parent.id, 
        osdBounds: {x: _this.osdOptions.osdBounds.x, y: _this.osdOptions.osdBounds.y, width: _this.osdOptions.osdBounds.width, height: _this.osdOptions.osdBounds.height}
      });
    },

    toggle: function(stateValue) {
      if (stateValue) { 
        this.show(); 
      } else {
        this.hide();
      }
    },

    hide: function() {
      jQuery(this.element).hide({effect: "fade", duration: 1000, easing: "easeOutCubic"});
    },

    show: function() {
      jQuery(this.element).show({effect: "fade", duration: 1000, easing: "easeInCubic"});
    },

    adjustWidth: function(className, hasClass) {
      if (hasClass) {
        this.parent.element.find('.view-container').removeClass(className);
      } else {
        this.parent.element.find('.view-container').addClass(className);
      }
    },

    adjustHeight: function(className, hasClass) {
      if (hasClass) {
        this.element.removeClass(className);
      } else {
        this.element.addClass(className);
      }
    },

    createOpenSeadragonInstance: function(imageUrl) {
      var infoJsonUrl = $.Iiif.getUri(imageUrl) + '/info.json',
      uniqueID = $.genUUID(),
      osdID = 'mirador-osd-' + uniqueID,
      infoJson,
      elemOsd,
      _this = this;

      this.element.find('.' + this.osdCls).remove();

      infoJson = $.getJsonFromUrl(infoJsonUrl, false);

      elemOsd =
        jQuery('<div/>')
      .addClass(this.osdCls)
      .attr('id', osdID)
      .appendTo(this.element);

      this.osd = $.OpenSeadragon({
        'id':           osdID,
        'tileSources':  $.Iiif.prepJsonForOsd(infoJson)
      });


      this.osd.addHandler('open', function(){
        if (_this.osdOptions.osdBounds) {
            var rect = new OpenSeadragon.Rect(_this.osdOptions.osdBounds.x, _this.osdOptions.osdBounds.y, _this.osdOptions.osdBounds.width, _this.osdOptions.osdBounds.height);
            _this.osd.viewport.fitBounds(rect, true);
        }

        _this.osd.addHandler('zoom', $.debounce(function(){
          _this.setBounds();
        }, 300));

        _this.osd.addHandler('pan', $.debounce(function(){
          _this.setBounds();
        }, 300));

      });
    },

    addAnnotationsLayer: function() {
      var annotationListUrls;

      if (this.currentImg.otherContent) {
        annotationListUrls = jQuery.map(this.currentImg.otherContent, function( annotation ){

          if (annotation['@id'].indexOf(".json") >= 0) {
            return annotation['@id'];
          }

          return (annotation['@id'] + ".json");
        });
      }

      this.annotationsLayer = new $.AnnotationsLayer({
        parent: this,
        annotationListUrls: annotationListUrls
      });

    },

    updateImage: function(imageID) {
      if (this.imageID !== imageID) {
        this.imageID = imageID;
        this.currentImgIndex = $.getImageIndexById(this.imagesList, imageID);
        this.currentImg = this.imagesList[this.currentImgIndex];
        this.osdOptions = {
          osdBounds:        null,
          zoomLevel:        null
        };
        this.osd.close();
        this.createOpenSeadragonInstance($.Iiif.getImageUrl(this.currentImg));
        this.parent.updateFocusImages([imageID]);
      }
    },

    next: function() {
      var next = this.currentImgIndex + 1;

      if (next < this.imagesList.length) {
        this.parent.setCurrentImageID(this.imagesList[next]['@id']);
      }
    },

    previous: function() {
      var prev = this.currentImgIndex - 1;

      if (prev >= 0) {
        this.parent.setCurrentImageID(this.imagesList[prev]['@id']);
      }
    }
  };

}(Mirador));
