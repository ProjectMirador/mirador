(function($) {

  $.MiradorLegacyStrategy = function(options) {
    jQuery.extend(this, {
      
    }, options);
    this.init();
  };
  
  $.MiradorLegacyStrategy.prototype = {
    init: function() {
      
    },
    
    isThisType: function(annotation) {
      if (annotation.on && typeof annotation.on === 'object' &&
          annotation.on.selector && typeof annotation.on.selector === 'object' &&
          annotation.on.selector.value && typeof annotation.on.selector.value === 'string' &&
          annotation.on.selector['@type'] === 'oa:FragmentSelector') {
        return annotation.on.selector.value.indexOf('xywh=') === 0;
      }
      return false;
    },
    
    buildAnnotation: function(options) {
      var oaAnno = options.annotation,
          window = options.window,
          overlay = options.overlay,
          bounds = overlay.draftPaths[0].bounds;
      oaAnno.on = {
        "@type": "oa:SpecificResource",
        "full": window.canvasID,
        "selector": {
          "@type": "oa:FragmentSelector",
          "value": "xywh=" + bounds.x + "," + bounds.y + "," + bounds.width + "," + bounds.height
        }
      };
      return oaAnno;
    },
    
    parseRegion: function(annotation, osdRegionDrawTool) {
      if (this.isThisType(annotation)) {
        return osdRegionDrawTool.parseRectangle(annotation.on.full + "#" + annotation.on.selector.value, annotation);
      }
    },
  };
  
}(Mirador));