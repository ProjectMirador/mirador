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
    
    return osd;

  };

}(Mirador));
