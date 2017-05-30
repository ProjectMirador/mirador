(function ($) {

  $.OpenSeadragon = function (options) {

    var osd = OpenSeadragon(
      jQuery.extend({
        preserveViewport: true,
        preserveImageSizeOnResize: true,
        visibilityRatio: 1,
        minZoomLevel: 0,
        defaultZoomLevel: 0,
        blendTime: 0.1,
        alwaysBlend: false,
        showNavigationControl: false
      }, options)
    );

    if (options && options.state && options.state.getStateProperty('windowSettings').physicalRuler && options.state.getStateProperty('windowSettings').physicalRuler.enabled) {
      var service = options.currentCanvas.service;

      if (service) {
        var serviceUrl = service['@id'];
        if (serviceUrl) {
          var request = jQuery.ajax({
            url: serviceUrl,
            type: 'GET',
            dataType: 'json',
            async: true,
            contentType: "application/json; charset=utf-8"
          });

          request.done(function (response) {
            var metersPerPhysicalUnit = {
              'mm': 0.001,
              'cm': 0.01,
              'in': 0.0254
            };

            var pixelsPerMeter = 1 / (metersPerPhysicalUnit[response.physicalUnits] * response.physicalScale);
            osd.hasPhysicalDimensionData = false;

            jQuery.extend(true, this, {
              'scalebar': {
                'xOffset': 10,
                'yOffset': 10,
                'stayInsideImage': false,
                'color': 'black',
                'fontColor': 'rgb(100, 100, 100)',
                backgroundColor: 'rgba(255, 255, 255, 0.5)',
                fontSize: 'small',
                barThickness: 1,
                sizeAndTextRenderer: options.state.getStateProperty('windowSettings').physicalRuler.physicalUnits === 'in' ? OpenSeadragon.ScalebarSizeAndTextRenderer.IMPERIAL_LENGTH : OpenSeadragon.ScalebarSizeAndTextRenderer.METRIC_LENGTH
              }
            }, {
              'scalebar': {'pixelsPerMeter': pixelsPerMeter}
            });

            // setup the scalebar
            var _this = this;
            osd.scalebar(_this.scalebar);
            osd.hasPhysicalDimensionData = true;
          });
        }
      }

    }

    return osd;

  };

}(Mirador));
