(function($) {

  $.AnnotationsLayer = function(options) {

    jQuery.extend(true, this, {
      parent:            null,
      annotationsList:   null,
      viewer:            null,
      renderer:          null,
      selected:          null,
      hovered:           null,
      windowId:          null,
      mode:              'default',
      element:           null
    }, options);

    this.init();
  };

  $.AnnotationsLayer.prototype = {

    init: function() {
      var _this = this;
      jQuery.unsubscribe(('modeChange.' + _this.windowId));

      this.createRenderer();
      this.bindEvents();
    },

    bindEvents: function() {
      var _this = this;

      jQuery.subscribe('modeChange.' + _this.windowId, function(event, modeName) {
        //console.log('entered ' + modeName + ' mode in annotationsLayer');
        _this.mode = modeName;
        _this.modeSwitch();
      });

      jQuery.subscribe('annotationListLoaded.' + _this.windowId, function(event) {
        //console.log(_this.mode);
        _this.annotationsList = _this.parent.parent.annotationsList;
        _this.updateRenderer();
      });
    },

    createRenderer: function() {
      var _this = this;
      this.renderer = new $.OsdCanvasRenderer({
        osd: $.OpenSeadragon,
        osdViewer: _this.viewer,
        list: _this.annotationsList, // must be passed by reference.
        visible: false,
        parent: _this
      });
      this.modeSwitch();
    },
    
    updateRenderer: function() {
      this.renderer.list = this.annotationsList;
      this.modeSwitch();
    },
    
    modeSwitch: function() {
      //console.log(this.mode);
      if (this.mode === 'displayAnnotations') { this.enterDisplayAnnotations(); }
      else if (this.mode === 'editingAnnotations') { this.enterEditAnnotations(); }
      else if (this.mode === 'default') { this.enterDefault(); }
      else {}
    },


    enterDisplayAnnotations: function() {
      var _this = this;
      //console.log('triggering annotation loading and display');
      this.renderer.render();
    },

    enterEditAnnotations: function() {
      var _this = this;
      if (!this.parent.hud.contextControls.rectTool) {
        this.parent.hud.contextControls.rectTool = new $.OsdRegionRectTool({
          osd: OpenSeadragon,
          osdViewer: _this.viewer,
          rectType: 'oa', // does not do anything yet. 
          parent: _this
        });
      } else {
        this.parent.hud.contextControls.rectTool.reset(_this.viewer);
      }
    },

    enterDefault: function() {
      //console.log('triggering default');
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
