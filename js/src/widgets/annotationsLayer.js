(function($) {

  $.AnnotationsLayer = function(options) {

    jQuery.extend(true, this, {
      sidePanel:  null,
      bottomPanel:       null,
      regionController:  null,
      parent:            null,
      stateEvents:       {},
      showList:          true,
      annotationListUrls:    null,
      annotations:       [],
      commentAnnotations: 0,
      textAnnotations: 0,
      visible:        false,
      selectedAnnotation: null,
      hoveredAnnotation: null,
      annotationListCls: 'mirador-annotation-list',
      filter: null
    }, options);

    this.init();
  };


  $.AnnotationsLayer.prototype = {

    init: function() {
      var _this = this;

      // returns a promise object constructed using 
      // jQuery.when.apply(this, [deferred array]);
      _this.getAnnotations().done( function() {
        // _this.bottomPanel = new $.AnnotationBottomPanel({parent: _this});
        // _this.regionController = new $.AnnotationLayerRegionController({parent: _this});
        // _this.sidePanel = new $.AnnotationLayerSidePanel({parent: _this});
      });

      this.bindEvents();
    },

    get: function(prop) {
      return this[prop];
    },

    set: function(prop, value, options) {
      _this = this;
      this[prop] = value;
      jQuery.publish(prop + ':set', value, options);
    },

    getAnnotations: function() {
      var _this = this,
      requests = [];

      // not the best solution, but this resets the
      // annotations whenever more are fetched, 
      // effectively clearing them on next()/previous().
      _this.set('annotations', []);

      if (!_this.annotationListUrls) {
        _this.annotations = [];
        return jQuery.when(function() { return; });
      }

      jQuery.each(_this.annotationListUrls, function(index, url) {
        var request =  jQuery.ajax(
          {
          url: url,
          dataType: 'json',
          async: true,
          cache: false,
          success: function(jsonLd) {
            jQuery.each(jsonLd.resources, function(index, resource) {
              var annotation = {
                region: $.parseRegion(resource.on),
                title: null,
                content: resource.resource.full ? resource.resource.full.chars : resource.resource.chars,
                type: (resource.motivation).split(':')[1],
                id: $.genUUID()
              };          

              annotation.osdFrame = $.getOsdFrame(annotation.region, _this.parent.currentImg);

              _this.annotations.push(annotation);
            });

          },

          error: function() {
            console.log('Failed loading ' + uri);
          }
        });

        requests.push(request);

      });

      return jQuery.when.apply(this, requests);
    },

    bindEvents: function() {
      var _this = this;

      // model events
      // _this.event('visible:set').subscribe( function(value) {
      //     if (value === false) { _this.hide(); } else { _this.show(); }
      // });
      // _this.event('disabled:set').subscribe( function(value) {
      //     if (value === true) { _this.hide(); } else { _this.show(); }
      // });
      // _this.event('selectedAnnotation:set').subscribe( function(value, options) {
      //     if (value === null) {
      //         _this.deselect(); 
      //         return;
      //     }
      //     _this.focusSelected(value, options);
      // });
      // _this.event('hoveredAnnotation:set').subscribe( function(value, options) {
      //     _this.accentHovered(value, options);
      // });
      // _this.event('annotationListUrls:set').subscribe( function(value, options) {
      //     if (value) { console.log(value); }
      //     _this.changePage();
      // });
      // _this.event('filter:set').subscribe( function(value, options) {
      //     _this.filterAnnotations(value, options);
      // });
    },

    computeAnnotationStats: function() {
      var comments = 0,
      transcriptions = 0; 

      jQuery.each(_this.annotations, function(index, annotation) {
        if (annotation.type === 'commenting') { comments ++; } else { transcriptions ++; }
      });

      _this.commentAnnotations = comments;
      _this.textAnnotations = transcriptions;
    },

    setVisible: function() {
      var _this = this;

      if (_this.get('visible') === false) {
        _this.set("visible", true);
      }  else {
        _this.set("visible", false);
      }
    },

    changePage: function() {
      var _this = this;

      if (_this.annotations === null) {
        _this.set('visible', false);
        return;
      }

      if ( _this.selectedAnnotation ) {
        _this.set('selectedAnnotation', null);
      }

      _this.getAnnotations().done( function() {
        _this.sidePanel.render();
        _this.regionController.render();
      });
    },

    accentHovered: function(id, source) {
      var _this = this;

      if (source === 'listing') {
        _this.regionController.accentHovered(id);
      } else {
        _this.sidePanel.accentHovered(id);
      }
    },

    focusSelected: function(id, source) {
      var _this = this;

      _this.sidePanel.focusSelected(id, source);
      _this.regionController.focusSelected(id);
      _this.bottomPanel.focusSelected(id);
    },

    deselect: function() {
      var _this = this;

      _this.bottomPanel.deselect();
      _this.sidePanel.deselect();
      _this.regionController.deselect();
    },

    filterAnnotations: function(filter, options) {
      _this = this;

      filteredAnnos = jQuery.grep(_this.annotations, function(a) { return a.type !== filter; } ),
      filteredIds = jQuery.map(filteredAnnos, function(a) { return a.id; }),
      filteredRegions = jQuery.map(filteredIds, function(id) { 
        var idString = '#region_' + id;
        return jQuery(idString);
      }),
      filteredListings = jQuery.map(filteredIds, function(id) { 
        var idString = '#listing_' + id;
        return jQuery(idString);
      });

      _this.parent.element.find('.annotation').fadeIn();
      _this.parent.element.find('.annotationListing').slideDown();
      _this.bottomPanel.deselect();

      if (filter === '') { return; }

      jQuery(filteredRegions).map(function() { return this.toArray(); }).fadeOut();
      jQuery(filteredListings).map(function() { return this.toArray(); }).slideUp();
    },

    append: function(item) {
      this.element.append(item);
    },

    show: function() {
      var _this = this;
      this.parent.parent.element.find('.mirador-widget-content').css('padding-right', _this.width);
      this.sidePanel.show();
      this.regionController.show();
      this.bottomPanel.show();
    },

    hide: function() {
      this.parent.parent.element.find('.mirador-widget-content').css('padding-right', 0);
      this.sidePanel.hide();
      this.regionController.hide();
      this.bottomPanel.hide();
      // ensures the user won't accidentally be unable to view annotation details in 
      // the annotation layer in the future. Resets the default visibility of the 
      // bottom panel to true.
      this.bottomPanel.hidden = false;
    }

  };

}(Mirador));
