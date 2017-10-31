(function($) {

  $.MiradorDualStrategy = function(options) {
    jQuery.extend(this, {

    }, options);
    this.init();
  };

  $.MiradorDualStrategy.prototype = {
    init: function() {

    },

    // Check whether an annotation is supported under this formatting strategy
    isThisType: function(annotation) {
      if (annotation.on && jQuery.isArray(annotation.on) && annotation.on.length > 0 && typeof annotation.on[0] === 'object' &&
          annotation.on[0].selector && typeof annotation.on[0].selector === 'object' &&
          annotation.on[0].selector['@type'] === 'oa:Choice' &&
          annotation.on[0].selector.default && typeof annotation.on[0].selector.default === 'object' &&
          annotation.on[0].selector.default.value && typeof annotation.on[0].selector.default.value === 'string' &&
          annotation.on[0].selector.item && typeof annotation.on[0].selector.item === 'object' &&
          annotation.on[0].selector.item.value && typeof annotation.on[0].selector.item.value === 'string'
        ) {
        return annotation.on[0].selector.default.value.indexOf('xywh=') === 0 && annotation.on[0].selector.item.value.indexOf('<svg') === 0;
      }
      return false;
    },

    // Build the selector into a bare annotation, given a Window and an OsdSvgOverlay
    buildAnnotation: function(options) {
      var oaAnno = options.annotation,
          win = options.window,
          overlay = options.overlay;
      oaAnno.on = [];
      jQuery.each(overlay.draftPaths, function(index, path) {
        // getSVGString expects an array, so insert each path into a new array
        var svg = overlay.getSVGString([path]),
        bounds = path.bounds;
        oaAnno.on.push({
          "@type": "oa:SpecificResource",
          "full": win.canvasID,
          "selector": {
            "@type": "oa:Choice",
            "default": {
              "@type": "oa:FragmentSelector",
              "value": "xywh=" + Math.round(bounds.x) + "," + Math.round(bounds.y) + "," + Math.round(bounds.width) + "," + Math.round(bounds.height)
            },
            "item": {
              "@type": "oa:SvgSelector",
              "value": svg
            }
          },
          "within": {
            "@id": win.loadedManifest,
            "@type": "sc:Manifest"
          }
        });
      });
      return oaAnno;
    },

    // Parse the annotation into the OsdRegionDrawTool instance (only if its format is supported by this strategy)
    parseRegion: function(annotation, osdRegionDrawTool) {
      if (this.isThisType(annotation)) {
        var regionArray = [];
        jQuery.each(annotation.on, function(index, target) {
          regionArray = regionArray.concat(osdRegionDrawTool.svgOverlay.parseSVG(target.selector.item.value, annotation));
        });
        return regionArray;
      }
    },
  };

}(Mirador));
