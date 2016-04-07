(function($) {

  /**
   * UI + logic to get search results for a given search query. On initialization,
   * the provided search query is given tothe provided IIIF Search service.
   * The response is displayed as a list.
   *
   * Currently follows IIIF Search API v0.9.1-draft
   * (http://iiif.io/api/search/0.9/)
   */
  $.SearchWithinResults = function(options) {

    jQuery.extend(this, {
      manifest:             null,
      element:              null,
      metadataTypes:        null,
      metadataListingCls:   'metadata-listing',
      query:                null,
      searchService:        null,
      windowId:       null,

    }, options);

    this.init();
  };

  $.SearchWithinResults.prototype = {

    init: function() {
      var _this = this;

      _this.searchService = this.manifest.getSearchWithinService();

      jQuery(this.appendTo).empty();
      
      jQuery("<hr/><h3>Search results for: " + _this.query + "</h3><hr/>").appendTo(_this.appendTo);

      this.searchRequest(this.query).done(function(searchResults) {

        //create tplData array
        if (searchResults.hits) {
          _this.tplData = _this.getHits(searchResults);
        }
        else {
          _this.tplData = _this.getSearchAnnotations(searchResults);
        }

        _this.element = jQuery(_this.template(_this.tplData)).appendTo(_this.appendTo);
        _this.bindEvents();
      });
    },

  // Base code from https://github.com/padolsey/prettyprint.js. Modified to fit Mirador needs
  searchRequest: function(query ){
    var _this = this;

    return jQuery.ajax({
        url:   _this.searchService['@id'] + "?q=" + query,
        dataType: 'json',
        async: true
      });
  },

  /**
   * Look for necessary properties that point to the need for paging.
   *
   * @param  results IIIF Search results
   * @return TRUE if paging is needed
   */
  needsPager: function(results) {
    return results && results.next;
  },

  /**
   * Initialize search results pager. It is assumed that it has already
   * been determined whether or not the pager needs to be created.
   * If a pager is created, it will be inserted into the DOM.
   *
   * @param  results - IIIF Search results
   */
  setPager: function(results) {
    var onPageCount = results.hits ? results.hits.length : results.resources.length;
    var urlPrefix = 'blah';

    var startIndex = results.startIndex ? results.startIndex : results.

    $('.search-results-pager').pagination({
        items: results.within.total,
        itemsOnPage: onPageCount,
        currentPage: this.float2int(results.within.total / onPageCount),
        cssStyle: 'compact-theme',
        ellipsePageSet: true,
        hrefTextPrefix: urlPrefix    // Take from the search results
    });
  },

  /**
   * Do a Bitwise OR to truncate decimal
   *
   * @param  num original number, could be integer or decimal
   * @return integer with any decimal part of input truncated (no rounding)
   */
  float2int: function(num) {
    return num | 0;
  },

  getSearchAnnotations: function(searchResults) {
    var _this = this;
    tplData = [];
    //add condition here to make sure searchResults.resources is not null
    if (searchResults.resources !== null) {
      searchResults.resources.forEach(function(result){
        // Set to resouce.on, which is usually a simple String ID
        var canvasid = result.on;
        var canvaslabel = _this.getLabel(result);

        if (!canvaslabel) {   // Do not add this result if no label is found
          return;
        }

        // If resource.on is an Object, containing extra information about the
        // parent object, set ID appropriately
        if (typeof canvasid === 'object') {
          canvasid = result.on['@id'];
        }

        // Split ID from Coordinates if necessary
        var id_parts = _this.splitBaseUrlAndCoordinates(canvasid);

        resultobject = {
          canvasid: id_parts.base,
          coordinates: id_parts.coords,
          canvaslabel: canvaslabel,
          resulttext: result.resource.chars
        };

        tplData.push(resultobject);
      });
    }
    return tplData;
  },

  getHits: function(searchResults) {
    var _this = this;
    tplData = [];
    searchResults.hits.forEach(function(hit) {
      //this seems like a really slow way to retrieve on property from hits
      //note that at present it is only retrieving the first annotation
      //but a hit annotation property takes an array and could have more than one
      //annotation -- its not a very common case but a possibility.
      var annotation = hit.annotations[0];
      //canvases could come back as an array
      var canvases = _this.getHitResources(searchResults, annotation);

      var resource = canvases[0];
      var canvasid = resource;
      var canvaslabel = _this.getLabel(resource);

      if (!canvaslabel) {   // Do not add this result if no label is found
        return;
      }

      // If you have the full annotation, set ID and label appropriately
      if (typeof canvasid === 'object') {
        canvasid = resource.on['@id'];
      }

      // Extract coordinates if necessary
      var id_parts = _this.splitBaseUrlAndCoordinates(canvasid);

      resultobject = {
        canvasid: id_parts.base,
        coordinates: id_parts.coords,
        canvaslabel: canvaslabel,
        hit: hit      // TODO must handle different results structures, see IIIF search spec for different responses
      };

      tplData.push(resultobject);
    });
    return tplData;
  },

  /**
   * Get a label describing a search match. This label is set to the
   * associated annotation label, if available, or to the label of the
   * parent canvas.
   *
   * @param  {[type]} resource annotation associated with the search match
   * @return {[type]}          string label
   */
  getLabel: function(resource) {
    var label;

    if (resource && typeof resource === 'object') {
      if (resource.label) {
        return resource.label;
      } else if (resource.resource.label){
        return resource.resource.label;
      } else if (resource.on && typeof resource.on === 'string') {
        label = this.manifest.getCanvasLabel(resource.on);
        return label ? 'Canvas ' + label : undefined;
      } else if (resource.on && typeof resource.on === 'object') {
        label = resource.on.label ? resource.on.label : this.manifest.getCanvasLabel(resource.on['@id']);
        return label ? 'Canvas ' + label : undefined;
      }
    } else {
      return undefined;
    }
  },

  getHitResources: function(searchResults, annotationid) {
    // Get array of results
    return searchResults.resources.filter(function(resource){
      return resource['@id'] === annotationid;
    });
  },

  /**
   * @param  url - a resource ID
   * @return {
   *   base: base URL, or the original url param if no coords are present,
   *   coords: coordinates from ID if present
   * }
   */
  splitBaseUrlAndCoordinates: function(url) {
    var coordinates;
    var base = url;

    if (typeof url === 'string') {
      // Separate base ID from fragment selector
      var parts = url.split('#');

      base = parts[0];
      if (parts.length === 2) {
        coordinates = parts[1];
      }
    }

    return {
      base: base,
      coords: coordinates
    };
  },

  bindEvents: function() {
    var _this = this;

    jQuery.subscribe(('currentCanvasIDUpdated.' + _this.windowId), function(event, canvasID) {
        //if (!_this.structures) { return; }
        //_this.setSelectedElements($.getRangeIDByCanvasID(_this.structures, canvasID));
        //_this.render();
        
      });

    this.element.find('.js-show-canvas').on("click", function() {
      event.stopPropagation();

      var canvasid = jQuery(this).attr('data-canvasid');
      var coordinates = jQuery(this).attr('data-coordinates');
      jQuery(".result-wrapper").css("background-color", "inherit");
      jQuery(this).parent().css("background-color", "lightyellow");
      //if there was more than one annotation
      //(for example if a word crossed a line and needed two coordinates sets)
      //the miniAnnotationList should have multiple objects
      miniAnnotationList  = [{
        "@id": "test",
        "@type": "oa:Annotation",
        "motivation": "sc:painting",
        "resource": {
          "@type": "cnt:ContentAsText",
          "chars": _this.query
        },
        "on": canvasid + (coordinates ? "#" + coordinates : '')
        }];

      //_this.parent.annotationsList = miniAnnotationList;
      console.log(_this.parent);
      //_this.parent.setCurrentCanvasID(canvasid);
      jQuery.publish('SET_CURRENT_CANVAS_ID.' + _this.windowId, canvasid);

      
    });


  },

  /**
   * Handlebars template. Accepts data and formats appropriately. To use,
   * just pass in the template data and this will return a String with
   * the formatted HTML which can then be inserted into the DOM.
   *
   * This template expects a IIIF AnnotationList formatted to represent
   * IIIF Search results.
   *
   * EX: assume context:
   * 	var templateData = { template data goes here }
   * 	var htmlString = template(templateData);
   */
  template: Handlebars.compile([
    '<div class="search-results-pager"></div>',
    '<div class="search-results-container">',
      '{{#each this}}',
        '<div class="result-wrapper">',
          '<a class="search-result search-title js-show-canvas" data-canvasid="{{canvasid}}" data-coordinates="{{coordinates}}">',
            '{{canvaslabel}}',
          '</a>',
          '<div class="search-result result-paragraph js-show-canvas" data-canvasid="{{canvasid}}" data-coordinates="{{coordinates}}">',
            '{{#if hit.before}}',
              '{{hit.before}} ',
            '{{/if}}',
            '{{#if hit.match}}',
              '<span class="highlight">{{hit.match}}</span>',
            '{{else}}',
              '{{{resulttext}}}',   // If this text must NOT be escaped, use:   '{{{resulttext}}}'
            '{{/if}}',
            '{{#if hit.after}}',
              '{{ hit.after}}',
            '{{/if}}',
          '</div>',
        '</div>',
      '{{/each}}',
    '</div>'
  ].join(""))};

}(Mirador));
