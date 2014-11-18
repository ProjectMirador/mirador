(function($) {

  $.AnnotationsLayer = function(options) {

    jQuery.extend(true, this, {
      parent:            null,
      annotationsList:   null,
      viewer:               null
    }, options);

    this.init();
  };


  $.AnnotationsLayer.prototype = {

    init: function() {
      var _this = this;
      console.log(_this.annotationsList);
      _this.renderer = $.OsdCanvasRenderer({
        osd: $.OpenSeadragon,
        viewer: _this.viewer,
        onUpdate: function(rect) { console.log(rect); },
        onModeEnter: function() { console.log('entering annotation display mode!'); },
        onModeExit: function() { console.log('exiting annotation display mode!'); },
        list: _this.annotationsList.resources // must be passed by reference.
        // Annotator store object possible?
        // tools: ... ?
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

    // computeAnnotationStats: function() {
    //   var comments = 0,
    //   transcriptions = 0; 

    //   jQuery.each(_this.annotations, function(index, annotation) {
    //     if (annotation.type === 'commenting') { comments ++; } else { transcriptions ++; }
    //   });

    //   _this.commentAnnotations = comments;
    //   _this.textAnnotations = transcriptions;
    // },

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
