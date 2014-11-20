(function($) {


  // Takes a list of oa:annotations passed
  // by reference and renders their regions,
  // registering updates.
  
  $.OsdCanvasRenderer = function(options) {
  
    var osd = options.osd,
    osdViewer = options.viewer;
  
    var parseRegion  = function(url) {
      var regionString;
      if (typeof url === 'object') {
        regionString = url.selector.value;  
      } else {
        regionString = url.split('#')[1];
      }
      var regionArray = regionString.split('=')[1].split(',');
      return regionArray;
    },
    getOsdFrame = function(region) {
      rectX = region[0],
      rectY = region[1],
      rectW = region[2],
      rectH = region[3];
      
      return osdViewer.viewport.imageToViewportRectangle(rectX,rectY,rectW,rectH);
  
    }, 
    render = function() {
      console.log(options);
      options.list.forEach(function(annotation) {
        var region = parseRegion(annotation.on);
        osdOverlay = document.createElement('div');
        osdOverlay.className = 'annotation';
        osdViewer.addOverlay({
          element: osdOverlay,
          location:  getOsdFrame(region)
        });
        jQuery(osdOverlay).on('hover', function(annotation) {
          options.onHover(annotation);
        });
        jQuery(osdOverlay).on('click', function(annotation) {
          options.onSelect(annotation);
        });
      });
    },
    select = function(annotationId) {
      // jQuery(annotation element).trigger('click');
    },
    update = function() {
      render();
    },
    hideAll = function() {
      osdViewer.clearOverlays();
    },
    getElements = function() {

    };
  
    
    var osdCanvasRenderer = {
      render: render,
      update: update,
      hideAll: hideAll
    };
  
    return osdCanvasRenderer;
  
  };
}(Mirador));
