(function($) {

  $.AnnotationsLayer = function(options) {

    jQuery.extend(true, this, {
      parent:            null,
      annotationsList:       null,
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
        if (modeName === 'displayAnnotations') { _this.enterDisplayAnnotations(); }
        if (modeName === 'makeAnnotations') { _this.enterMakeAnnotations(); }
        if (modeName === 'default') { _this.enterDefault(); }
      });
      
      jQuery.subscribe('currentImageIDUpdated.' + _this.windowId, function(event) {
        var modeName = _this.mode;
        if (modeName === 'displayAnnotations') { _this.enterDisplayAnnotations(); }
        if (modeName === 'makeAnnotations') { _this.enterMakeAnnotations(); }
        if (modeName === 'default') { _this.enterDefault(); }
      });
      
    },

    enterDisplayAnnotations: function() {
      var _this = this;
      console.log('triggering annotation loading and display');
      this.renderer.render();
    },

    enterEditAnnotations: function() {
      console.log('triggering annotation editing');
      // this.renderer.update().showAll();
    },
    
    enterDefault: function() {
      console.log('triggering default');
      this.renderer.hideAll();
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
    }

  };

}(Mirador));
