(function($) {

  $.LegacyOpenAnnotationStrategy = function(options) {
    jQuery.extend(this, {
      
    }, options);
    this.init();
  };
  
  $.LegacyOpenAnnotationStrategy.prototype = {
    init: function() {
      
    },
    
    isThisType: function(annotation) {
      if (annotation.on && typeof annotation.on === 'string') {
        return annotation.on.indexOf('xywh=') !== -1;
      }
      return false;
    },
    
    buildAnnotation: function(options) {
      var oaAnno = options.annotation,
          window = options.window,
          overlay = options.overlay,
          bounds = overlay.draftPaths[0].bounds;
      oaAnno.on = window.canvasID + "#xywh=" + bounds.x + "," + bounds.y + "," + bounds.width + "," + bounds.height;
      return oaAnno;
    },
    
    parseRegion: function(annotation, osdRegionDrawTool) {
      if (this.isThisType(annotation)) {
        return osdRegionDrawTool.parseRectangle(annotation.on, annotation);
      }
    },
  };
  
}(Mirador));