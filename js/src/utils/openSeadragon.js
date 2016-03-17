(function($) {

  $.OpenSeadragon = function(options) {

    var osd = OpenSeadragon(

      jQuery.extend({
        preserveViewport: true,
        visibilityRatio:  1,
        minZoomLevel:     0,
        defaultZoomLevel: 0,
        blendTime:        0.1,
        alwaysBlend:      false,
        prefixUrl:        'images/openseadragon/',
        showNavigationControl: false
      }, options)

    );

    var ts;
    var pixelsPerMeter;
    var metersPerPhysicalUnit = {
      'mm': 0.001,
      'cm': 0.01,
      'in': 0.0254
    };

    // check if a valid IIIF physical dimension service exists
    if (options.hasOwnProperty('tileSources')) {

      ts = options.tileSources;
      
      if (ts.hasOwnProperty('service') &&
          ts.service.profile === 'http://iiif.io/api/annex/services/physdim' &&
          ts.service['@context'] === 'http://iiif.io/api/annex/services/physdim/1/context.json' &&
          ts.service.hasOwnProperty('physicalScale') &&
          metersPerPhysicalUnit.hasOwnProperty(ts.service.physicalUnits)) {
  
	// openseadragon-scalebar needs to know pixels per meter to render ruler
        pixelsPerMeter = 1 / (metersPerPhysicalUnit[ts.service.physicalUnits] * ts.service.physicalScale);
   
        // set pixels per meter
        jQuery.extend(true, this, {
          'scalebar': $.DEFAULT_SETTINGS.scalebar
        }, {
          'scalebar': { 'pixelsPerMeter': pixelsPerMeter }	
        });
  
        // setup the scalebar
        osd.scalebar(this.scalebar);

	osd.hasPhysicalDimensionData = true;
        return osd;
      }
    }

    osd.hasPhysicalDimensionData = false;
    return osd;

  };

}(Mirador));
