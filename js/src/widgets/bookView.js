// TODO: If paged object, then need opposite page (can do simple algorithm to use even/odd page number to start)
// If continuous, then need to stitch all (use order)
// If individual, no stitching (this view shouldn't do anything?)
// next and previous not needed
// no locking needed
(function($) {

  $.BookView = function(options) {

    jQuery.extend(this, {
      currentImg:       null,
      currentImgIndex:  0,
      stitchList:       [],
      element:          null,
      imageID:          null,
      imagesList:       [],
      focusImages:      [],
      manifest:         null,
      viewingDirection: 'left-to-right',
      viewingHint:      'paged',
      zoomLevel:        null,
      osd:              null,
      osdBounds:        null,
      osdCls:           'mirador-osd',
      parent:           null,
      stitchTileMargin: 10
    }, options);

    this.init();
  };


  $.BookView.prototype = {
  
    init: function() {
       if (this.imageID !== null) {
         this.currentImgIndex = $.getImageIndexById(this.imagesList, this.imageID);
       }
              
       this.currentImg = this.imagesList[this.currentImgIndex];
       
       this.element = jQuery(this.template()).appendTo(this.appendTo);
       
       if (this.manifest.sequences[0].viewingDirection) {
           this.viewingDirection = this.manifest.sequences[0].viewingDirection.toLowerCase();
       }
       if (this.manifest.sequences[0].viewingHint) {
           this.viewingHint = this.manifest.sequences[0].viewingHint.toLowerCase();
       }
       
       this.stitchList = this.getStitchList();
       this.createOpenSeadragonInstance();
       
       this.bindEvents();
    },
    
    template: Handlebars.compile([
      '<div class="book-view">',
       '</div>'
    ].join('')),
    
    bindEvents: function() {
    
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
       
    },
    
    adjustHeight: function(className, hasClass) {
        if (hasClass) {
           this.element.removeClass(className);
        } else {
           this.element.addClass(className);
        }
    },
    
    updateImage: function(imageID) {
        this.currentImgIndex = $.getImageIndexById(this.imagesList, imageID);
        this.currentImg = this.imagesList[this.currentImgIndex];
        this.stitchList = this.getStitchList();
        this.createOpenSeadragonInstance();
    },

    createOpenSeadragonInstance: function(osdBounds) {
      var osdId = 'mirador-osd-' + $.genUUID(),
      osdToolBarId = osdId + '-toolbar',
      elemOsd,
      tileSources = [],
      _this = this;

      this.element.find('.' + this.osdCls).remove();

      jQuery.each(this.stitchList, function(index, image) {
          var imageUrl = $.Iiif.getImageUrl(image);
          var infoJsonUrl = $.Iiif.getUri(imageUrl) + '/info.json';
          var infoJson = $.getJsonFromUrl(infoJsonUrl, false);
          tileSources.push($.Iiif.prepJsonForOsd(infoJson));
      });

      elemOsd =
        jQuery('<div/>')
      .addClass(this.osdCls)
      .attr('id', osdId)
      .appendTo(this.element);

      this.osd = $.OpenSeadragon({
        'id':           elemOsd.attr('id'),
        'tileSources':  tileSources,
	'collectionMode':     'true',
	'collectionRows':     1, 
	'collectionTileMargin': this.stitchTileMargin,
	'collectionTileSize': 1600
      });

      this.osd.addHandler('open', function(){
        _this.zoomLevel = _this.osd.viewport.getZoom();

        if (typeof osdBounds != 'undefined') {
          _this.osd.viewport.fitBounds(osdBounds, true);
        }
      });

      //this.stitchOptions();
    },

    clearOpenSeadragonInstance: function() {
      this.element.find('.' + this.osdCls).remove();
      // this.element.find('.' + this.scaleCls).remove();
      this.osd = null;

    },

    // next two pages for paged objects
    // need next single page for lining pages up
    // don't need for continuous or individuals
    next: function() {
      var next;
      if (this.currentImgIndex % 2 === 0) {
        next = this.currentImgIndex + 1;
      } else {
        next = this.currentImgIndex + 2;
      }
      if (next < this.imagesList.length) {
        this.currentImgIndex = next;
        this.currentImg = this.imagesList[next];

        this.stitchList = this.getStitchList();

        this.createOpenSeadragonInstance();
      }
    },

    // previous two pages for paged objects
    // need previous single page for lining things up
    // don't need for continuous or individuals
    prev: function() {
      var prev;
      if (this.currentImgIndex % 2 === 0) {
        prev = this.currentImgIndex - 2;
      } else {
        prev = this.currentImgIndex - 1;
      }
      if (prev >= 0) {
        this.currentImgIndex = prev;
        this.currentImg = this.imagesList[prev];
        
        this.stitchList = this.getStitchList();

        this.createOpenSeadragonInstance();
      }
    },
    
    getStitchList: function() {
    // Need to check metadata for object type and viewing direction
    // Default to 'paged' and 'left-to-right'
    // Set index(es) for any other images to stitch with selected image
    var stitchList = [],
    leftIndex = [],
    rightIndex = [],
    topIndex = [],
    bottomIndex = [],
    _this = this;
    
    this.focusImages = [];
    
    if (this.viewingHint === 'individuals') {
       // don't do any stitching, display like an imageView
    } else if (this.viewingHint === 'paged') {
       // determine the other image for this pair based on index and viewingDirection
       if (this.currentImgIndex === 0 || this.currentImgIndex === this.imagesList.length-1) {
           //first page (front cover) or last page (back cover), display on its own
          stitchList = [this.currentImg];
       } else if (this.currentImgIndex % 2 === 0) {
            // even, get previous page.  set order in array based on viewingDirection
            switch (this.viewingDirection) {
                case "left-to-right":
                    leftIndex[0] = this.currentImgIndex-1;
                    stitchList = [this.imagesList[this.currentImgIndex-1], this.currentImg];
                    break;
                case "right-to-left":
                    rightIndex[0] = this.currentImgIndex-1;
                    stitchList = [this.currentImg, this.imagesList[this.currentImgIndex-1]];
                    break;
                case "top-to-bottom":
                    topIndex[0] = this.currentImgIndex-1;
                    stitchList = [this.imagesList[this.currentImgIndex-1], this.currentImg];
                    break;
                case "bottom-to-top":
                    bottomIndex[0] = this.currentImgIndex-1;
                    stitchList = [this.currentImg, this.imagesList[this.currentImgIndex-1]];
                    break;
                default:
                    break;
            }
       } else {
            // odd, get next page
            switch (this.viewingDirection) {
                case "left-to-right":
                    rightIndex[0] = this.currentImgIndex+1;
                    stitchList = [this.currentImg, this.imagesList[this.currentImgIndex+1]];
                    break;
                case "right-to-left":
                    leftIndex[0] = this.currentImgIndex+1;
                    stitchList = [this.imagesList[this.currentImgIndex+1], this.currentImg];
                    break;
                case "top-to-bottom":
                    bottomIndex[0] = this.currentImgIndex+1;
                    stitchList = [this.currentImg, this.imagesList[this.currentImgIndex+1]];
                    break;
                case "bottom-to-top":
                    topIndex[0] = this.currentImgIndex+1;
                    stitchList = [this.imagesList[this.currentImgIndex+1], this.currentImg];
                    break;
                default:
                    break;
            }
       }
    } else if (this.viewingHint === 'continuous') {
       // TODO: stitch all images together per the viewingDirection
    } else {
       // undefined viewingHint, don't do anything
    }
    
    //set the focusImages for highlighting in panels
    jQuery.each(stitchList, function(index, image) {
        _this.focusImages.push(image['@id']);
    });
    this.parent.updateFocusImages(this.focusImages);
    return stitchList;
  }

    // remove or add canvses to make pages line up
    /*stitchOptions: function() {  
      //clear options
      var options = [];

      this.clearStitchOptions();

      // if there is only one image, don't show options to remove images
      if (this.stitchList.length == 2) {
          options.push({
              label: "Remove image from page view",
              imgIndex: this.currentImgIndex
          });
          options.push({
              label: "Insert empty canvas between images"
              imgIndex: this.currentImgIndex
          });

          this.elemStitchOptions.tooltipster({
              arrow: true,
              content: $.Templates.stitchView.stitchOptions({options: options}),
              interactive: true,
              position: 'bottom',
              theme: '.tooltipster-mirador'
          });
       }
    },

    clearStitchOptions: function() {
      if (this.elemStitchOptions.data('plugin_tooltipster') !== '') {
        this.elemStitchOptions.tooltipster('destroy');
      }

      this.elemStitchOptions.hide();
      },*/
  };

}(Mirador));
