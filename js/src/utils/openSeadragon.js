
(function($) {

  $.OpenSeadragon = function(options) {

    return OpenSeadragon(

      jQuery.extend({
        preserveViewport: true,
        visibilityRatio:  1,
        minZoomLevel:     0,
        defaultZoomLevel: 0,
        prefixUrl:        'images/openseadragon/'
      }, options)

    );

  };

}(Mirador));