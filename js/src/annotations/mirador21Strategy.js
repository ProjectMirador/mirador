(function($) {

  $.Mirador21Strategy = function(options) {
    jQuery.extend(this, {
      
    }, options);
    this.init();
  };
  
  $.Mirador21Strategy.prototype = {
    init: function() {
      
    },
    
    isThisType: function(annotation) {
      if (annotation.on && typeof annotation.on === 'object' &&
          annotation.on.selector && typeof annotation.on.selector === 'object' &&
          annotation.on.selector.value && typeof annotation.on.selector.value === 'string' &&
          annotation.on.selector['@type'] === 'oa:SvgSelector') {
        return true;
      }
      return false;
    },
    
    buildAnnotation: function(options) {
      var oaAnno = options.annotation,
          window = options.window,
          overlay = options.overlay,
          svg = overlay.getSVGString(overlay.draftPaths);
      oaAnno.on = {
          "@type": "oa:SpecificResource",
          "full": window.canvasID,
          "selector": {
            "@type": "oa:SvgSelector",
            "value": svg
          },
          "within": {
            "@id": window.loadedManifest,
            "@type": "sc:Manifest"
          }
        };
      return oaAnno;
    },
    
    parseRegion: function(annotation, osdRegionDrawTool) {
      if (this.isThisType(annotation)) {
        return osdRegionDrawTool.svgOverlay.parseSVG(annotation.on.selector.value, annotation);
      }
    },
  };
  
}(Mirador));