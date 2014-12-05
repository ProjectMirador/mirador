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
      mode:              null,
      annotator:         null,
      element:           null
    }, options);

    this.init();
  };

  $.AnnotationsLayer.prototype = {

    init: function() {
      var _this = this;
      if (this.element.data('annotator')) {
        this.annotator = this.element.data('annotator');
      } else {
        this.annotator = this.element.annotator().data('annotator');
        this.annotator.addPlugin('Tags');
      }
      this.createRenderer();
      this.bindEvents();
    },

    bindEvents: function() {
      var _this = this;

      jQuery.subscribe('modeChange.' + _this.windowId, function(event, modeName) {
        console.log('entered ' + modeName + ' mode in annotationsLayer');
        _this.mode = modeName;
        _this.modeSwitch();
      });

      jQuery.subscribe('annotationListLoaded.' + _this.windowId, function(event) {
        console.log(_this.mode);
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
      console.log(this.mode);
      if (this.mode === 'displayAnnotations') { this.enterDisplayAnnotations(); }
      else if (this.mode === 'editingAnnotations') { this.enterEditAnnotations(); }
      else if (this.mode === 'default') { this.enterDefault(); }
      else {}
    },

    parseRegionForAnnotator: function(url) {
      var _this = this,
      regionString,
      regionArray,
      annotatorPosition;

      if (typeof url === 'object') {
        regionString = url.selector.value;  
      } else {
        regionString = url.split('#')[1];
      }
      regionArray = regionString.split('=')[1].split(',');

      // This positions the annotator pop-up directly below the 
      // annotation, adjusting the canvas panning so that it
      // will always be visible.

      var topLeftImagePoint = new OpenSeadragon.Point(+regionArray[0], +regionArray[1]);

      annotatorPosition = {
        top: _this.viewer.viewport.imageToViewerElementCoordinates(topLeftImagePoint).y,
        left: _this.viewer.viewport.imageToViewerElementCoordinates(topLeftImagePoint).x
      };
      console.log(_this.viewer.viewport.getBounds(true));
      //check OSD bounds
      //console.log(_this.viewer);
      return annotatorPosition;
    },

    prepareForAnnotator: function(oaAnnotation) {
      var annoText = "",
      tags = [];
      if (jQuery.isArray(oaAnnotation.resource)) {
        jQuery.each(oaAnnotation.resource, function(index, value) {
          if (value['@type'] === "dctypes:Text") {
            annoText = value.chars;
          } else if (value['@type'] == "oa:Tag") {
            tags.push(value.chars);
          }
        });
      } else {
        annoText = oaAnnotation.resource.chars;
      }


      var annotatortion = {
        text: annoText,
        tags: tags
      };

      return [annotatortion];
    },
    
    annotatorToOA: function(attrAnnotation, uri, selector, scope) {
      var motivation = [],
          resource = [],
          on,
          bounds;
          //convert annotation to OA format

         if (attrAnnotation.tags && attrAnnotation.tags.length > 0) {
           motivation.push("oa:tagging");
           jQuery.each(attrAnnotation.tags, function(index, value) {
             resource.push({      
               "@type":"oa:Tag",
               "chars":value
               });
           });
         }
        motivation.push("oa:commenting");
           //selector = "xywh="+",".concat(annotation.rangePosition.x, annotation.rangePosition.y, annotation.rangePostion.width, annotation.rangePostion.height);
           //scope = "xywh="+",".concat(annotation.bounds.x, annotation.bounds.y, annotation.bounds.width, annotation.bounds.height);
           //console.log(selector + " " + scope);
        on = { "@type" : "oa:SpecificResource",
                  "source" : uri, 
                  "selector" : {
                    "@type" : "oa:FragmentSelector",
                    "value" : "xywh="+selector.x+","+selector.y+","+selector.width+","+selector.height
                  },
                  "scope": {
                    "@context" : "http://www.harvard.edu/catch/oa.json",
                    "@type" : "catch:Viewport",
                    "value" : "xywh="+Math.round(scope.x)+","+Math.round(scope.y)+","+Math.round(scope.width)+","+Math.round(scope.height) //osd bounds
                  }
                };
         resource.push( {
            "@type" : "dctypes:Text",
            "format" : "text/html",
            "chars" : attrAnnotation.text
         });
         
          var oaAnnotation = {
            "@context" : "http://iiif.io/api/presentation/2/context.json",
            "@type" : "oa:Annotation",
            "motivation" : motivation,
            "resource" : resource,
            "on" : on
          };
          return oaAnnotation;
    },

    enterDisplayAnnotations: function() {
      var _this = this;
      console.log('triggering annotation loading and display');
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
