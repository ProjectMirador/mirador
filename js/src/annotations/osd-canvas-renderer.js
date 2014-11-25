(function($) {


  // Takes a list of oa:annotations passed
  // by reference and renders their regions,
  // registering updates.
  
  $.OsdCanvasRenderer = function(options) {
  
    jQuery.extend(this, {
     osd:       null,
     osdViewer: null,
     elements:  null,
     list:      null,
     parent:    null
    }, options);
  };
  
  $.OsdCanvasRenderer.prototype = {
    parseRegion: function(url) {
      var regionString;
      if (typeof url === 'object') {
        regionString = url.selector.value;  
      } else {
        regionString = url.split('#')[1];
      }
      var regionArray = regionString.split('=')[1].split(',');
      return regionArray;
    },
    
    getOsdFrame: function(region) {
      var rectX = region[0],
      rectY = region[1],
      rectW = region[2],
      rectH = region[3];
      
      return this.osdViewer.viewport.imageToViewportRectangle(rectX,rectY,rectW,rectH);
  
    }, 
    
    render: function() {
      var _this = this;
      _this.hideAll();
      this.list.forEach(function(annotation) {
        var region = _this.parseRegion(annotation.on);
        var osdOverlay = document.createElement('div');
        osdOverlay.className = 'annotation';
        osdOverlay.id = annotation['@id'];
        _this.osdViewer.addOverlay({
          element: osdOverlay,
          location: _this.getOsdFrame(region)
        });
      });

      this.bindEvents();
    },
    
    select: function(annotationId) {
      // jQuery(annotation element).trigger('click');
    },
    
    getAnnoFromRegion: function(regionId) {
      return this.list.filter(function(annotation) {
        return annotation['@id'] === regionId;
      });
    },
    
    bindEvents: function() {
      var _this = this;
      // be sure to properly delegate your event handlers
      jQuery(this.osdViewer.canvas).parent().on('click', '.annotation', function() { _this.onSelect(); });

      jQuery(this.osdViewer.canvas).parent().on('mouseenter', '.annotation', function() { 
        _this.onHover(_this.getAnnoFromRegion(jQuery(this)[0].id)); 
      });
      
      jQuery(this.osdViewer.canvas).parent().on('mouseleave', '.annotation', function() {
        _this.onMouseLeave();
      });
    },
    
    update: function() {
      this.render();
    },
    
    hideAll: function() {
      this.osdViewer.clearOverlays();
    },
    
    getElements: function() {
      this.elements = this.osdViewer.currentOverlays.reduce(function(result, currentOverlay) {
        currentOverlay = jQuery(currentOverlay);
        return result.add(currentOverlay);
      });
      return elements;
    },
    
    onHover: function(annotations) {
      var annotation = annotations[0];
      var position = this.parent.parseRegionForAnnotator(annotation.on);
      this.parent.annotator.showViewer(this.parent.prepareForAnnotator(annotation), position);
    },
    
    onMouseLeave: function() {
      this.parent.annotator.viewer.hide();
    },
    
    onSelect: function(annotation) {

    }
    
    /*var osdCanvasRenderer = {
      render: render,
      update: update,
      hideAll: hideAll
    };
  
    return osdCanvasRenderer;*/
  
  };
}(Mirador));
