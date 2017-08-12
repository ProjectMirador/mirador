(function($) {

/**
 * UI + logic to get search results for a given search query. On initialization,
 * the provided search query is given tothe provided IIIF Search service.
 * The response is displayed as a list.
 *
 * Parameter 'query_params': {q: query, motivation: motivation, date: date, user: user}
 *
 * Currently follows IIIF Content Search API v1.0
 * (http://iiif.io/api/search/0.9/)
 */
$.SearchWithinResults = function(options) {

  jQuery.extend(this, {
    manifest:             null,
    element:              null,
    metadataTypes:        null,
    metadataListingCls:   'metadata-listing',
    /** Search service URL */
    searchService:     null,
    windowId:             null,
    /** {q: query, motivation: motivation, date: date, user: user} */
    query_params:         null,
    /** Used for paging. This assumes that searches start on page 1... */
    currentPage:          1,
    eventEmitter:         null
  }, options);

  this.init();
};

$.SearchWithinResults.prototype = {

  init: function() {
    this.registerHandlebars();

    jQuery(this.appendTo).empty();
    this.element = jQuery(this.template()).appendTo(this.appendTo);
    jQuery("<h3>Search results for: " + this.query_params.q + "</h3>")
        .appendTo(this.appendTo.find('.search-results-messages'));
    this.doSearchFromQuery(this.query_params);
  },

  doSearchFromQuery: function(query_params) {
    query_string = "";
    for (var param in query_params){
      if (param === "q"){
        query_string += param + "=" + query_params[param];
      }
      else if (query_params[param].length > 0){
       query_string += "&" + param + "=" + query_params[param];
      }
    }

    var url = this.searchService + '?' + query_string;
    this.doSearchFromUrl(url);
  },

  /**
   * AJAX request is made from here!
   *
   * TODO Perhaps emit a search event here for the purposes of
   * state tracking or analytics?
   *
   * @param  {[type]} url [description]
   * @return {[type]}     [description]
   */
  doSearchFromUrl: function(url) {
    var _this = this;

    this.element.find('.search-results-container').empty();

    jQuery.ajax({
      url: url,
      dataType: 'json',
      async: true
    })
    .done(function(searchResults) {
        if (searchResults.resources) {
          // display result totals
          _this.displayResultCounts(searchResults);
          // show results list
          _this.processResults(searchResults);
      } else {
        jQuery('.search-results-count').html("<p>No results</p>");
      }
    })
    .fail(function() {
        jQuery('.search-results-count').html("<p>No results</p>");
    })
    .always();
  },


  displayResultCounts: function(searchResults){
    var total = searchResults.within.total,
    startResultNumber = searchResults.startIndex + 1,
    endResultNumber = "";

    //if there is only only resource, it will not be array and therefore we can't
    //take the length of it; this conditions check first to see if the resources
    //property contains an array or single object

    // TODO: not that this single object vs. array seems to be problem throughout.
    // Pages with only one result do not display properly. See for example:
    // http://exist.scta.info/exist/apps/scta/iiif/pl-zbsSII72/search?q=fides&page=3

    if (searchResults.resources.constructor === Array) {
      endResultNumber = searchResults.startIndex + searchResults.resources.length;
    } else {
      endResultNumber = searchResults.startIndex + 1;
    }

    jQuery('.search-results-count').html("<p>Showing " + startResultNumber + " - " + endResultNumber + " out of " + total + "</p>");
  },

  processResults: function(searchResults) {
    //create tplData array
    if (searchResults.hits) {
      this.tplData = this.getHits(searchResults);
    } else {
      this.tplData = this.getSearchAnnotations(searchResults);
    }
    jQuery($.Handlebars.compile('{{> resultsList }}')(this.tplData)).appendTo(jQuery(this.element.find('.search-results-container')));
    this.bindEvents();

    this.setPager(searchResults);
  },

  /**
   * Look for necessary properties that point to the need for paging.
   * Check for total number of results vs number of returned results.
   *
   * @param  results IIIF Search results
   * @return TRUE if paging is needed
   */
  needsPager: function(results) {
    // Check for some properties on the search results
    if (!results || !results.within || !results.resources) {
      return false;
    }
    var total = results.within.total;
    // Check if 'resources' (list of annotations) is an array, or single value
    if (Array.isArray(results.resources)) {
      return results.resources.length < total;
    } else {
      return total > 1;
    }
  },

  /**
   * Initialize search results pager. It is assumed that it has already
   * been determined whether or not the pager needs to be created.
   * If a pager is created, it will be inserted into the DOM.
   *
   * If it is determined that this set of results does not need paging,
   * then this function will exit early and no paging will be set.
   * {@link SearchWithinResults#needsPager}
   *
   * @param  results - IIIF Search results
   */
  setPager: function(searchResults) {
    var _this = this;
    var pager = this.element.find('.search-results-pager');

    // HACK: pager.pagination will be undefined until canvasID are set properly
    if (!this.needsPager(searchResults) || !pager.pagination) {
      return;
    }

    /*
     * Hack to get proper page numbers.
     * TODO probably shouldn't use this library if it requires page numbers,
     * instead have something with ONLY FIRST/LAST and PREV/NEXT controls.
     */
    if (!this.onPageCount) { // This will be set with initial page and not be changed.
      this.onPageCount = searchResults.resources.length;
    }

    pager.pagination({
        items: searchResults.within.total,
        itemsOnPage: _this.onPageCount,
        currentPage: _this.currentPage,
        displayedPages: 1,
        edges: 1,
        ellipsePageSet: false,
        cssStyle: 'compact-theme',
        hrefTextPrefix: '',
        prevText: '<i class="fa fa-lg fa-angle-left"></i>',
        nextText: '<i class="fa fa-lg fa-angle-right"></i>',
        onPageClick: function(pageNumber, event) {
          event.preventDefault();
          pager.pagination('disable');

          if (pageNumber == _this.currentPage - 1) {
            _this.currentPage--;
            _this.doSearchFromUrl(searchResults.prev);
          } else if (pageNumber == _this.currentPage + 1) {
            _this.currentPage++;
            _this.doSearchFromUrl(searchResults.next);
          } else if (pageNumber == 1) {
            _this.doSearchFromUrl(searchResults.within.first);
            _this.currentPage = 1;
          } else {
            // Assume this is the last page........
            _this.doSearchFromUrl(searchResults.within.last);
            /*
             *  NOTE: There is no good way to get the page number from the search URL.
             *  IIIF Content Search v1.0 spec (I do not think) does not define
             *  how to specify a page.
             *      -- For example, the page could be put into the URL
             *  query string, or it could be put into the URL fragment, or somewhere
             *  else.
             *
             *  This hack pulls the number of the last page on the pager. :/
             */
            _this.currentPage = parseInt(
              _this.element.find('.search-results-pager li:nth-last-child(2)').text()
            );
          }
        }
    });
    pager.pagination('enable');
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

  parseSearchAnnotation: function(annotation){
    var _this = this;
    var canvasid = annotation.on;
    // deals with possibiliy of "on" propert taking an object
    if (typeof canvasid === 'object') {
      canvasid = annotation.on['@id'];
    }

    var canvaslabel = _this.getLabel(annotation);

    // Split ID from Coordinates if necessary
    var id_parts = _this.splitBaseUrlAndCoordinates(canvasid);

    return {
      canvasid: id_parts.base,
      coordinates: id_parts.coords,
      canvaslabel: canvaslabel,
      resulttext: annotation.resource.chars
    };
  },

  getSearchAnnotations: function(searchResults) {
    var _this = this;
    tplData = [];
    //add condition here to make sure searchResults.resources is not null
    if (searchResults.resources !== null) {
      //This conditional handles if the results come back as a single object or as an array
      //TODO: This possibility is not yet handled in the getHits function
      if (!Array.isArray(searchResults.resources)){
        annotation = searchResults.resources;
        tplData.push(_this.parseSearchAnnotation(annotation));
      }
      else {
        searchResults.resources.forEach(function(annotation){
          tplData.push(_this.parseSearchAnnotation(annotation));
        });
      }
    return tplData;
    }
  },

  getHits: function(searchResults) {
    var _this = this;
    tplData = [];
    searchResults.hits.forEach(function(hit) {
      //this seems like a really slow way to retrieve on property from hits
      //note that at present it is only retrieving the first annotation
      //but a hit annotation property takes an array and could have more than one
      //annotation -- its not a very common case but a possibility.
      var resultObject, resultObjects = [];
      hit.annotations.forEach(function(annotation) {
        //canvases could come back as an array
        var resource = _this.getHitResources(searchResults, annotation)[0],
            canvasLabel = _this.getLabel(resource),
            canvasID = resource && resource.on;
        // If you have the full annotation, set ID and label appropriately
        if (typeof canvasID === 'object') {
          canvasID = resource.on['@id'];
        }
        // Extract coordinates if necessary
        var canvasIDParts = _this.splitBaseUrlAndCoordinates(canvasID);
        resultObject = {
          canvasid: canvasIDParts.base,
          coordinates: canvasIDParts.coords,
          canvaslabel: canvasLabel,
          hit: hit      // TODO must handle different results structures, see IIIF search spec for different responses
        };
        resultObjects.push(resultObject);
      });
      // First result is returned and gets attached an array of all annotations
      if (resultObjects) {
        resultObject = resultObjects[0];
        if (resultObjects.length > 1) {
          resultObject.annotations = resultObjects;
        }
        tplData.push(resultObject);
      }
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

    // jQuery.subscribe(('currentCanvasIDUpdated.' + _this.windowId), function(event, canvasID) {
    //     //if (!_this.structures) { return; }
    //     //_this.setSelectedElements($.getRangeIDByCanvasID(_this.structures, canvasID));
    //     //_this.render();
    //
    //   });

    //TODO
    //This function works to move the user to the specified canvas
    //but if there are associated coordinates, it does not yet know how to highlight
    //those coordinates.

    //thie miniAnnotatList attempted to do this, but is no longer working
    //it needs to be replaced by a new strategy.

    this.element.find('.js-show-canvas').on("click", function(event) {
      event.stopPropagation();

      var canvasid = jQuery(this).attr('data-canvasid'),
          coordinates = jQuery(this).attr('data-coordinates'),
          xywh = coordinates && coordinates.split('=')[1].split(',').map(Number),
          bounds = xywh && {x: xywh[0], y: xywh[1], width: xywh[2], height: xywh[3]};
      jQuery(".result-wrapper,.result-wrapper *").css("background-color", "");
      jQuery(this).parent().css("background-color", "lightyellow");
      if (jQuery(this).is("a")) {
        jQuery(this).parent().next().css("background-color", "lightyellow");
      }
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
      var options = {
        "canvasID": canvasid,
        "bounds": bounds
      };
      _this.eventEmitter.publish('SET_CURRENT_CANVAS_ID.' + _this.windowId, options);
    });
  },

  registerHandlebars: function() {
    $.Handlebars.registerPartial('resultsList', [
      '{{#each this}}',
        '<div class="result-wrapper">',
          '<a class="search-result search-title js-show-canvas" data-canvasid="{{canvasid}}" data-coordinates="{{coordinates}}">',
            '{{canvaslabel}}',
          '</a>',
          '{{#if annotations}}',
            '<div>',
              '<em>Annotations</em>: ',
              '{{#each annotations}}',
                '<a class="search-result search-annotation js-show-canvas" data-canvasid="{{canvasid}}" data-coordinates="{{coordinates}}">',
                  '<i class="fa fa-fw" aria-hidden="true"></i>',
                '</a>',
              '{{/each}}',
            '</div>',
          '{{/if}}',
          '<div class="search-result result-paragraph js-show-canvas" data-canvasid="{{canvasid}}" data-coordinates="{{coordinates}}">',
            '{{#if hit.before}}',
              '{{hit.before}} ',
            '{{/if}}',
            '{{#if hit.match}}',
              '<span class="highlight">{{hit.match}}</span>',
            '{{else}}',
              '{{{resulttext}}}',   // If this text must NOT be escaped, use:   '{{resulttext}}'
            '{{/if}}',
            '{{#if hit.after}}',
              '{{ hit.after}}',
            '{{/if}}',
          '</div>',
        '</div>',
      '{{/each}}',
    ].join(''));
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
   *    var templateData = { template data goes here }
   *    var htmlString = template(templateData);
   */
  template: $.Handlebars.compile([
    '<div>',
      '<div class="search-results-messages"></div>',
      '<div class="search-results-count"></div>',
      '<div class="search-results-pager"></div>',
      '<div class="search-results-container">',
        '{{> resultsList }}',
      '</div>',
    '</div>'
  ].join(""))};

}(Mirador));
