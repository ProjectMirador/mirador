(function($) {

  $.AnnotationsLayer = function(options) {

    jQuery.extend(true, this, {
      parent:            null,
      annotations:       null,
      viewer:            null,
      renderer:          null,
      selected:          null,
      hovered:           null,
      windowId:          null
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
        list: _this.annotationsList, // must be passed by reference.
        onHover: null,
        onSelect: null,
        visible: false
      });
      this.bindEvents();
    },

    bindEvents: function() {
      var _this = this;
      
      jQuery.subscribe('modeChange.' + _this.windowId, function(event, modeName) {
        console.log('entered ' + modeName + ' mode in annotationsLayer');
      });
    },

    enterDisplayMode: function() {
      var _this = this;

      _this.mode = 'display';
      // this.renderer.update().showAll();
    },

    enterEditMode: function() {

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
