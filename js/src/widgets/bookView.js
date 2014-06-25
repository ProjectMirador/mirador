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
      imageId:          null,
      imagesList:       [],
      manifest:         null,
      viewingDirection: '',
      viewingHint:      '',
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
       this.imagesList = $.getImagesListByManifest(this.manifest);
       
       if (this.imageId !== null) {
         this.currentImgIndex = this.getImageIndexById(this.imageId);
       }
              
       this.currentImg = this.imagesList[this.currentImgIndex];
       
       this.element = jQuery(this.template()).appendTo(this.appendTo);
       
       this.viewingDirection = this.metadata.details.viewingDirection; //change to reflect manifest
       this.viewingHint = this.metadata.details.viewingHint;  //change to reflect manifest
       
       this.stitchList = getStitchList(this.viewingHint, this.viewingDirection, this.currentImg, this.currentImgIndex, this.imagesList);
       this.createOpenSeadragonInstance(this.stitchList);
       
       this.bindEvents();
    },
    
    template: Handlebars.compile([
      '<div class="book-view">',
       '</div>'
    ].join('')),

    createOpenSeadragonInstance: function(stitchList, osdBounds) {
      var osdId = 'mirador-osd-' + $.genUUID(),
      osdToolBarId = osdId + '-toolbar',
      elemOsd,
      tileSources = [],
      _this = this;

      this.element.find('.' + this.osdCls).remove();

      for (var i=0; i < stitchList.length; i++) { 
          var image = stitchList[i];
          var imageUrl = $.Iiif.getImageUrl(this.currentImg);
          var infoJsonUrl = $.Iiif.getUri(imageUrl) + '/info.json';
          var infoJson = $.getJsonFromUrl(infoJsonUrl, false);
          tileSources.push($.Iiif.prepJsonForOsd(infoJson));
      }

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
      /*this.osd.addHandler('pre-full-screen', function(e) {
          if (e.fullScreen) {
              $.viewer.widgetsCopy = []; //empty out the copy when going into full screen
              jQuery.each($.viewer.widgets, function(index, widget) {
                  console.log(widget.getPosition());
                  $.viewer.widgetsCopy.push(widget);
              });
          }
      });*/
      //need to figure out why it is not preserving positions
      /*this.osd.addHandler('full-screen', function(e) {
          //console.log("full-screen event triggered");
          //console.log(e);
          if (!e.fullScreen) {
              //coming back from OSD's fullscreen drops the bottom status bar 
              jQuery.each($.viewer.widgets, function(index, widget) {
                  //console.log(widget.getPosition());
                  //widget = $.viewer.widgetsCopy[index];
                  widget.element[0].parentElement.style.display = "";
              });
          }
      });*/

      //this.stitchOptions();
    },


    clearOpenSeadragonInstance: function() {
      this.element.find('.' + this.osdCls).remove();
      // this.element.find('.' + this.scaleCls).remove();
      this.osd = null;

    },

    getImageIndexById: function(id) {
      var _this = this,
          imgIndex = 0;

      jQuery.each(this.imagesList, function(index, img) {
        if ($.trimString(img.id) === $.trimString(id)) {
          imgIndex = index;
        }
      });

      return imgIndex;
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

        this.stitchList = getStitchList(this.viewingHint, this.viewingDirection, this.currentImg, this.currentImgIndex, this.imagesList);

        this.createOpenSeadragonInstance(this.stitchList);
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
        
        this.stitchList = getStitchList(this.viewingHint, this.viewingDirection, this.currentImg, this.currentImgIndex, this.imagesList);

        this.createOpenSeadragonInstance(this.stitchList);
      }
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

  function getStitchList(viewingHint, viewingDirection, currentImg, currentImgIndex, imagesList) {
    // Need to check metadata for object type and viewing direction
    // Default to 'paged' and 'left-to-right'
    // Set index(es) for any other images to stitch with selected image
    var stitchList = [],
    leftIndex = [],
    rightIndex = [],
    topIndex = [],
    bottomIndex = [];
    if (viewingHint === 'individuals') {
       // don't do any stitching, display like an imageView
    } else if (viewingHint === 'paged') {
       // determine the other image for this pair based on index and viewingDirection
       if (currentImgIndex === 0 || currentImgIndex === imagesList.length-1) {
           //first page (front cover) or last page (back cover), display on its own
          stitchList = [currentImg];
       } else if (currentImgIndex % 2 === 0) {
            // even, get previous page.  set order in array based on viewingDirection
            switch (viewingDirection) {
                case "left-to-right":
                    leftIndex[0] = currentImgIndex-1;
                    stitchList = [imagesList[currentImgIndex-1], currentImg];
                    break;
                case "right-to-left":
                    rightIndex[0] = currentImgIndex-1;
                    stitchList = [currentImg, imagesList[currentImgIndex-1]];
                    break;
                case "top-to-bottom":
                    topIndex[0] = currentImgIndex-1;
                    stitchList = [imagesList[currentImgIndex-1], currentImg];
                    break;
                case "bottom-to-top":
                    bottomIndex[0] = currentImgIndex-1;
                    stitchList = [currentImg, imagesList[currentImgIndex-1]];
                    break;
                default:
                    break;
            }
       } else {
            // odd, get next page
            switch (viewingDirection) {
                case "left-to-right":
                    rightIndex[0] = currentImgIndex+1;
                    stitchList = [currentImg, imagesList[currentImgIndex+1]];
                    break;
                case "right-to-left":
                    leftIndex[0] = currentImgIndex+1;
                    stitchList = [imagesList[currentImgIndex+1], currentImg];
                    break;
                case "top-to-bottom":
                    bottomIndex[0] = currentImgIndex+1;
                    stitchList = [currentImg, imagesList[currentImgIndex+1]];
                    break;
                case "bottom-to-top":
                    topIndex[0] = currentImgIndex+1;
                    stitchList = [imagesList[currentImgIndex+1], currentImg];
                    break;
                default:
                    break;
            }
       }
    } else if (viewingHint === 'continuous') {
       // TODO: stitch all images together per the viewingDirection
    } else {
       // undefined viewingHint, don't do anything
    }
    return stitchList;
  }

}(Mirador));
