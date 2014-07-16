(function($) {

  $.isValidView = function(view) {
    return (typeof $.DEFAULT_SETTINGS.availableViews.view === 'undefined');
  };


  $.inArrayToBoolean = function(index) {
    return index === -1 ? false : true;
  };


  $.castToArray = function(obj) {
    return (typeof obj === 'string') ? [obj] : obj;
  };


  // Removes duplicates from an array.
  $.getUniques = function(arr) {
    var temp = {},
    unique = [];

    for (var i = 0; i < arr.length; i++) {
      temp[arr[i]] = true;
    }

    for (var k in temp) {
      unique.push(k);
    }

    return unique;
  };


  $.getTitlePrefix = function(details) {
    var prefixes = [];

    if (details && details.label) {
      prefixes.push(details.label);
    }

    return prefixes.join(' / ');
  };


  $.trimString = function(str) {
    return str.replace(/^\s+|\s+$/g, '');
  };


  $.trimStringBy = function(str, length) {
    if (str.length > length) {
      str = str.substr(0, length) + '...';
    }

    return str;
  };


  // Base code from https://github.com/padolsey/prettyprint.js. Modified to fit Mirador needs
  $.stringifyObject = function(obj, nestingMargin) {
    var type = typeof obj,
        str,
        first = true,
        increment = 15,
        delimiter = '<br/>';

    if (obj instanceof RegExp) {
      return '/' + obj.source + '/';
    }

    if (typeof nestingMargin === 'undefined') {
      nestingMargin = 0;
    }

    if (obj instanceof Array) {
      str = '[ ';

      jQuery.each(obj, function (i, item) {
        str += (i === 0 ? '' : ', ') + $.stringifyObject(item, nestingMargin + increment);
      });

      return str + ' ]';
    }

    if (typeof obj === 'object') {
      str = '<div style="margin-left:' +  nestingMargin + 'px">';

      for (var i in obj) {
        if (obj.hasOwnProperty(i)) {
          str += (first ? '' : delimiter) + i + ': ' + $.stringifyObject(obj[i], nestingMargin + increment);
          first = false;
        }
      }

      return str + '</div>';
    }


    return obj.toString();
  };


  $.getJsonFromUrl = function(url, async) {
    var json;

    jQuery.ajax({
      url: url,
      dataType: 'json',
      async: async || false,

      success: function(data) {
        json = data;
      },

      error: function(xhr, status, error) {
        console.error(xhr, status, error);
      }
    });

    return json;
  };


  $.getViewLabel = function(type) {
    var view = $.DEFAULT_SETTINGS.availableViews[type];

    return (view && view.label) ? view.label : type;
  };


  $.extractLabelFromAttribute = function(attr) {
    var label = attr;

    label = label.replace(/^@/, '');
    label = label.replace(/([A-Z])/g, ' $1');
    label = label.replace(/\s{2,}/g, ' ');
    label = label.replace(/\w\S*/g, function(txt) {
      return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
    });

    return label;
  };


  $.toString = function(obj, delimiter) {
    var str = '',
    joint = delimiter || ' ';

    if (jQuery.type(obj) === 'string') {
      str = obj;
    }

    if (jQuery.isArray(obj)) {
      str = obj.join(joint);
    }

    return str;
  };


  /* --------------------------------------------------------------------------
     Methods related to manifest data
     -------------------------------------------------------------------------- */

  $.getManifestIdByUri = function(uri) {
    var id;

    id = jQuery.map($.manifests, function(manifest, manifestId) {
      if (uri === manifest.uri) {
        return manifestId;
      }
    });

    return id[0] || id;
  };
  
  $.getMetadataAbout = function(jsonLd) {
      return {
         '@context': jsonLd['@context'] || '',
         '@id':      jsonLd['@id'] || ''
        };
    };

  $.getMetadataDetails = function(jsonLd) {
      return {
          'label':        jsonLd.label || '',
          'agent':        jsonLd.agent || '',
          'location':     jsonLd.location || '',
          'date':         jsonLd.date || '',
          'description':  jsonLd.description || ''
        };
    };

  $.getMetadataFields = function(jsonLd) {
      // parse and store metadata pairs (API 1.0)
      var mdList = {};
      if (typeof jsonLd.metadata !== 'undefined') {
          jQuery.each(jsonLd.metadata, function(index, item) {
              mdList[item.label] = item.value;
            });
        }
        return mdList;
   };

   $.getMetadataRights =function(jsonLd) {
       return {
           'license':      jsonLd.license || '',
           'attribution':  jsonLd.attribution || ''
        };
   };

   $.getMetadataLinks = function(jsonLd) {
      return {
          'service':  jsonLd.service || '',
          'seeAlso':  jsonLd.seeAlso || '',
          'within':   jsonLd.within || ''
        };
   };

  $.getImagesListByManifestId = function(manifestId) {
    return $.manifests[manifestId].sequences[0].imagesList;
  };

  $.getImageIndexById = function(imagesList, id) {
      var imgIndex = 0;

      jQuery.each(imagesList, function(index, img) {
        if ($.trimString(img['@id']) === $.trimString(id)) {
          imgIndex = index;
        }
      });

      return imgIndex;
    };
    
  $.getImagesListByManifest = function(manifest) {
    return manifest.sequences[0].canvases;
  };
  
  $.getImageUrlForCanvas = function(canvas) {
    var resource = canvas.images[0].resource;
    var service = resource['default'] ? resource['default'].service : resource.service;
    return service['@id'];
  };
  
  $.getImageTitleForCanvas = function(canvas) {
    
  };

  $.getCollectionTitle = function(metadata) {
    return metadata.details.label || '';
  };


  $.getImageTitlesAndIds = function(images) {
    var data = [];

    jQuery.each(images, function(index, image) {
      data.push({
        'title': image.title,
        'id': image.id
      });
    });

    return data;
  };


  $.genUUID = function() {
    var idNum = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
      var r = Math.random() * 16|0, v = c == 'x' ? r : (r&0x3|0x8);
      return v.toString(16);
    });

    return "uuid-" + idNum;
  };
  
  jQuery.fn.slideFadeToggle  = function(speed, easing, callback) {
            return this.animate({opacity: 'toggle', height: 'toggle'}, speed, easing, callback);
  };


  $.throttle = function(func, wait, options) {
    var context, args, result;
    var timeout = null;
    var previous = 0;

    if (typeof options !== 'undefined') {
      options = {};
    }

    var later = function() {
      previous = options.leading === false ? 0 : new Date();
      timeout = null;
      result = func.apply(context, args);
    };
    return function() {
      var now = new Date();
      if (!previous && options.leading === false) previous = now;
      var remaining = wait - (now - previous);
      context = this;
      args = arguments;
      if (remaining <= 0) {
        clearTimeout(timeout);
        timeout = null;
        previous = now;
        result = func.apply(context, args);
      } else if (!timeout && options.trailing !== false) {
        timeout = setTimeout(later, remaining);
      }
      return result;
    };
  };


  $.debounce = function(func, wait, immediate) {
    var timeout, args, context, timestamp, result;
    return function() {
      context = this;
      args = arguments;
      timestamp = new Date();
      var later = function() {
        var last = (new Date()) - timestamp;
        if (last < wait) {
          timeout = setTimeout(later, wait - last);
        } else {
          timeout = null;
          if (!immediate) result = func.apply(context, args);
        }
      };
      var callNow = immediate && !timeout;
      if (!timeout) {
        timeout = setTimeout(later, wait);
      }
      if (callNow) result = func.apply(context, args);
      return result;
    };
  };

  $.parseRegion  = function(url) {
    url = new URI(url);
    var regionString = url.hash();
    regionArray = regionString.split('=')[1].split(',');
    return regionArray;
  };

  $.getOsdFrame = function(region, currentImg) {
    var imgWidth = currentImg.width,
    imgHeight = currentImg.height,
    canvasWidth = currentImg.canvasWidth,
    canvasHeight = currentImg.canvasHeight,
    widthNormaliser = imgWidth/canvasWidth,
    heightNormaliser = imgHeight/canvasHeight,
    rectX = (region[0]*widthNormaliser)/imgWidth,
    rectY = (region[1]*heightNormaliser)/imgWidth,
    rectW = (region[2]*widthNormaliser)/imgWidth,
    rectH = (region[3]*heightNormaliser)/imgWidth;

    var osdFrame = new OpenSeadragon.Rect(rectX,rectY,rectW,rectH);

    return osdFrame;
  };
  
//http://upshots.org/javascript/jquery-test-if-element-is-in-viewport-visible-on-screen
  $.isOnScreen = function(elem) {
    var win = jQuery(window);
    var viewport = {
      top : win.scrollTop(),
      left : win.scrollLeft()
    };
    viewport.bottom = viewport.top + win.height();
    viewport.right = viewport.left + win.width();

    var el = jQuery(elem);
    var bounds = el.offset();
    bounds.bottom = bounds.top + el.height();
    bounds.right = bounds.left + el.width();

    return (!(viewport.right < bounds.left || viewport.left > bounds.right || viewport.bottom < bounds.top || viewport.top > bounds.bottom));
  };

  $.getRangeIDByCanvasID = function(manifest, canvasID /*, [given parent range] (for multiple ranges, later) */) {
    var ranges = jQuery.grep(manifest.structures, function(range) { return jQuery.inArray(canvasID, range.canvases) > -1; }),
    rangeIDs = jQuery.map(ranges,  function(range) { return range['@id']; });

    return rangeIDs;

  };

}(Mirador));
