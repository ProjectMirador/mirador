(function($) {

  $.LegacyOpenAnnotationStrategy = function(options) {
    jQuery.extend(this, {
      
    }, options);
    this.init();
  };
  
  $.LegacyOpenAnnotationStrategy.prototype = {
    init: function() {
      
    },
    
    // Check whether an annotation is supported under this formatting strategy
    isThisType: function(annotation) {
      if (annotation.on && typeof annotation.on === 'string') {
        return annotation.on.indexOf('xywh=') !== -1;
      }
      return false;
    },
    
    // Build the selector into a bare annotation, given a Window and an OsdSvgOverlay
    buildAnnotation: function(options) {
      var oaAnno = options.annotation,
          win = options.window,
          overlay = options.overlay,
          bounds = overlay.draftPaths[0].bounds;
      oaAnno.on = win.canvasID + "#xywh=" + Math.round(bounds.x) + "," + Math.round(bounds.y) + "," + Math.round(bounds.width) + "," + Math.round(bounds.height);
      return oaAnno;
    },
    
    // Parse the annotation into the OsdRegionDrawTool instance (only if its format is supported by this strategy)
    parseRegion: function(annotation, osdRegionDrawTool) {
      if (this.isThisType(annotation)) {
        return osdRegionDrawTool.parseRectangle(annotation.on, annotation);
      }
    },
  };
  
}(Mirador));