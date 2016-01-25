(function($) {

  $.ThumbnailsView = function(options) {

    jQuery.extend(this, {
      currentImgIndex:      0,
      canvasID:              null,
      focusImages:          [],
      manifest:             null,
      element:              null,
      imagesList:           [],
      appendTo:             null,
      thumbInfo:            {thumbsHeight: 150, listingCssCls: 'listing-thumbs', thumbnailCls: 'thumbnail-view'},
      defaultThumbHeight:   150,
      windowId:             null,
      panel:                false,
      lazyLoadingFactor:    1.5  //should be >= 1
    }, options);

    this.init();
  };


  $.ThumbnailsView.prototype = {

    init: function() {
      if (this.canvasID !== null) {
        this.currentImgIndex = $.getImageIndexById(this.imagesList, this.canvasID);
      }

      this.loadContent();
      this.bindEvents();
      this.listenForActions();
    },

    loadContent: function() {
      var _this = this,
      tplData = {
        defaultHeight:  this.thumbInfo.thumbsHeight,
        listingCssCls:  this.thumbInfo.listingCssCls,
        thumbnailCls:   this.thumbInfo.thumbnailCls
      };

      tplData.thumbs = jQuery.map(this.imagesList, function(canvas, index) {
        if (canvas.width === 0) {
          return {};
        }

        var aspectRatio = canvas.height/canvas.width,
        width = (_this.thumbInfo.thumbsHeight/aspectRatio),
        thumbnailUrl = $.getThumbnailForCanvas(canvas, width);

        return {
          thumbUrl: thumbnailUrl,
          title:    canvas.label,
          id:       canvas['@id'],
          width:    width,
          highlight: _this.currentImgIndex === index ? 'highlight' : ''
        };
      });

      this.element = jQuery(_this.template(tplData)).appendTo(this.appendTo);
    },

    updateImage: function(canvasId) {
      this.currentImgIndex = $.getImageIndexById(this.imagesList, canvasId);
      this.element.find('.highlight').removeClass('highlight');
      this.element.find("img[data-image-id='"+canvasId+"']").addClass('highlight');
      this.element.find("img[data-image-id='"+canvasId+"']").parent().addClass('highlight');
    },

    updateFocusImages: function(focusList) {
      var _this = this;
      this.element.find('.highlight').removeClass('highlight');
      jQuery.each(focusList, function(index, canvasId) {
        _this.element.find("img[data-image-id='"+canvasId+"']").addClass('highlight');
        _this.element.find("img[data-image-id='"+canvasId+"']").parent().addClass('highlight');
      });
    },

    currentImageChanged: function() {
      var _this = this,
      target = _this.element.find('.highlight'),
      scrollPosition,
      windowObject = this.state.getWindowObjectById(this.windowId);

      if (windowObject && windowObject.viewType === 'BookView') {
        scrollPosition = _this.element.scrollLeft() + (target.position().left + (target.next().width() + target.outerWidth())/2) - _this.element.width()/2;
      } else {

        scrollPosition = _this.element.scrollLeft() + (target.position().left + target.width()/2) - _this.element.width()/2;
      }
      _this.element.scrollTo(scrollPosition, 900);
    },

    listenForActions: function() {
      var _this = this;
      jQuery.subscribe(('currentCanvasIDUpdated.' + _this.windowId), function(event) {
        _this.currentImageChanged();
      });

      jQuery.subscribe('windowResize', $.debounce(function(){
        _this.loadImages();
      }, 100));
    },

    bindEvents: function() {
      var _this = this;
      _this.element.find('img').on('load', function() {
        jQuery(this).hide().fadeIn(750);
      });

      jQuery(_this.element).scroll(function() {
        _this.loadImages();
      });

      //add any other events that would trigger thumbnail display (resize, etc)

      _this.element.find('.thumbnail-image').on('click', function() {
        var canvasID = jQuery(this).attr('data-image-id');
        jQuery.publish('SET_CURRENT_CANVAS_ID.' + _this.windowId, canvasID);
      });
    },

    toggle: function(stateValue) {
      if (stateValue) { 
        this.show(); 
      } else {
        this.hide();
      }
    },

    loadImages: function() {
      var _this = this;
      jQuery.each(_this.element.find("img"), function(key, value) {
        if ($.isOnScreen(value, _this.lazyLoadingFactor) && !jQuery(value).attr("src")) {
          var url = jQuery(value).attr("data");
          _this.loadImage(value, url);
        }
      });
    },

    loadImage: function(imageElement, url) {
      var _this = this,
      imagePromise = $.createImagePromise(url);

      imagePromise.done(function(image) {
        jQuery(imageElement).attr('src', image);
      });
    },

    reloadImages: function(newThumbHeight, triggerShow) {
      var _this = this;
      this.thumbInfo.thumbsHeight = newThumbHeight;

      jQuery.each(this.imagesList, function(index, image) {
        var aspectRatio = image.height/image.width,
        width = (_this.thumbInfo.thumbsHeight/aspectRatio),
        newThumbURL = $.getThumbnailForCanvas(image, width),
        id = image['@id'];
        var imageElement = _this.element.find('img[data-image-id="'+id+'"]');
        imageElement.attr('data', newThumbURL).attr('height', _this.thumbInfo.thumbsHeight).attr('width', width).attr('src', '');
      });
      if (triggerShow) {
        this.show();
      }
    },

    template: Handlebars.compile([
                                 '<div class="{{thumbnailCls}}">',
                                 '<ul class="{{listingCssCls}}" role="list" aria-label="Thumbnails">',
                                 '{{#thumbs}}',
                                 '<li class="{{highlight}}" role="listitem" aria-label="Thumbnail">',
                                 '<img class="thumbnail-image {{highlight}}" title="{{title}}" data-image-id="{{id}}" src="" data="{{thumbUrl}}" height="{{../defaultHeight}}" width="{{width}}">',
                                 '<div class="thumb-label">{{title}}</div>',
                                 '</li>',
                                 '{{/thumbs}}',
                                 '</ul>',
                                 '</div>'
    ].join('')),

    hide: function() {
      var element = jQuery(this.element);
      if (this.panel) {
        element = element.parent();
      }
      element.hide({effect: "fade", duration: 300, easing: "easeOutCubic"});
    },

    show: function() {
      var element = jQuery(this.element);
      if (this.panel) {
        element = element.parent();
      }
      var _this = this;
      element.show({
        effect: "fade",
        duration: 300,
        easing: "easeInCubic",
        complete: function() {
          _this.loadImages();
        }
      });
    },

    adjustWidth: function(className, hasClass) {
      if (hasClass) {
        jQuery.publish('REMOVE_CLASS.'+this.windowId, className);
      } else {
        jQuery.publish('ADD_CLASS.'+this.windowId, className);
      }
    },

    adjustHeight: function(className, hasClass) {
      if (hasClass) {
        this.element.removeClass(className);
      } else {
        this.element.addClass(className);
      }
    }

  };



}(Mirador));
