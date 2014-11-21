(function($) {


  // Takes a list of oa:annotations passed
  // by reference and renders their regions,
  // registering updates.
  
  $.OsdCanvasRenderer = function(options) {
  
    var osd = options.osd,
    osdViewer = options.viewer,
    elements,
    list = options.list;
  
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
      options.list.forEach(function(annotation) {
        var region = parseRegion(annotation.on);
        osdOverlay = document.createElement('div');
        osdOverlay.className = 'annotation';
        osdOverlay.id = annotation['@id'];
        osdViewer.addOverlay({
          element: osdOverlay,
          location:  getOsdFrame(region)
        });
      });

      bindEvents();
    },
    select = function(annotationId) {
      // jQuery(annotation element).trigger('click');
    },
    getAnnoFromRegion = function(regionId) {
      return list.filter(function(annotation) {
        return annotation['@id'] === regionId;
      });
    },
    bindEvents = function() {
      // be sure to properly delegate your event handlers
      jQuery(osdViewer.canvas).parent().on('click', '.annotation', function() { options.onSelect(); });

      jQuery(osdViewer.canvas).parent().on('mouseenter', '.annotation', function() { 
        options.onHover(getAnnoFromRegion(jQuery(this)[0].id)); 
      });
      
      jQuery(osdViewer.canvas).parent().on('mouseleave', '.annotation', function() {});
    },
    update = function() {
      render();
    },
    hideAll = function() {
      osdViewer.clearOverlays();
    },
    getElements = function() {
      var set = jQuery();
      elements = osdViewer.currentOverlays.reduce(function(result, currentOverlay) {
        currentOverlay = jQuery(currentOverlay);
        return result.add(currentOverlay);
      });
      return elements;
    };
    
    var osdCanvasRenderer = {
      render: render,
      update: update,
      hideAll: hideAll
    };
  
    return osdCanvasRenderer;
  
  };
}(Mirador));
