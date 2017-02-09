(function($) {

  $.Mirador21Strategy = function(options) {
    jQuery.extend(this, {
      
    }, options);
    this.init();
  };
  
  $.Mirador21Strategy.prototype = {
    init: function() {
      
    },
    
    // Check whether an annotation is supported under this formatting strategy
    isThisType: function(annotation) {
      if (annotation.on && typeof annotation.on === 'object' &&
          annotation.on.selector && typeof annotation.on.selector === 'object' &&
          annotation.on.selector.value && typeof annotation.on.selector.value === 'string' &&
          annotation.on.selector['@type'] === 'oa:SvgSelector') {
        return true;
      }
      return false;
    },
    
    // Build the selector into a bare annotation, given a Window and an OsdSvgOverlay
    buildAnnotation: function(options) {
      var oaAnno = options.annotation,
          win = options.window,
          overlay = options.overlay,
          svg = overlay.getSVGString(overlay.draftPaths);
      oaAnno.on = {
          "@type": "oa:SpecificResource",
          "full": win.canvasID,
          "selector": {
            "@type": "oa:SvgSelector",
            "value": svg
          },
          "within": {
            "@id": win.loadedManifest,
            "@type": "sc:Manifest"
          }
        };
      return oaAnno;
    },
    
    // Parse the annotation into the OsdRegionDrawTool instance (only if its format is supported by this strategy)
    parseRegion: function(annotation, osdRegionDrawTool) {
      if (this.isThisType(annotation)) {
        return osdRegionDrawTool.svgOverlay.parseSVG(annotation.on.selector.value, annotation);
      }
    },
  };
  
}(Mirador));