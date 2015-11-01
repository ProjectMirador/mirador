(function($) {

  $.SearchWithin = function(options) {

    jQuery.extend(this, {
      manifest:             null,
      element:              null,
      parent:               null,
      metadataTypes:        null,
      metadataListingCls:   'metadata-listing',
      query:                null,
      searchService:        null,
    }, options);

    this.init();
  };


  $.SearchWithin.prototype = {

    init: function() {
      
      var _this = this;
          
      _this.searchService = this.manifest.getSearchWithinService();
      
      jQuery(this.appendTo).html("");
      jQuery("<h1>Search results for: " + this.query + "</h1>").appendTo(this.appendTo);
      
      var searchRequest = this.searchRequest(this.query);

      searchRequest.done(function(searchResults) {

        //create tplData array
        if (searchResults.hits){
          _this.tplData = _this.getHits(searchResults);
        }
        else{
          _this.tplData = _this.getSearchAnnotations(searchResults);
        }

        //add array to template 
        _this.element = jQuery(_this.template(_this.tplData)).appendTo(_this.appendTo);
        //bind events
        _this.bindEvents();
      });
    },

  // Base code from https://github.com/padolsey/prettyprint.js. Modified to fit Mirador needs
  searchRequest: function(query){
    var _this = this;
    var searchUrl = _this.searchService['@id'];
    var searchRequest = jQuery.ajax({
          url:  searchUrl + "?q=" + query,
          dataType: 'json',
          async: true
        });
     return searchRequest;
  },
  getSearchAnnotations: function(searchResults){
    var _this = this;
    tplData = [];
    searchResults.resources.forEach(function(result){
      var canvasid = result.on.split("#")[0];
      var coordinates = result.on.split("#")[1];
      //not sure how to get canvas label so I'm just hacking it for the moment
      var canvaslabel = canvasid.split("/").pop();
      
      resultobject = {canvasid: canvasid,
                      coordinates: coordinates,
                      canvaslabel: canvaslabel,
                      resulttext: result.resource.chars}; 

      tplData.push(resultobject);              
    });
    return tplData;
  },
  getHits: function(searchResults){
      var _this = this;
      tplData = [];
      searchResults.hits.forEach(function(hit){
        //this seems like a really slow way to retrieve on property from hits
        //note that at present it is only retrieving the first annotation 
        //but a hit annotation property takes an array and could have more than one
        //annotation -- its not a very common case but a possibility.
        var annotation = hit.annotations[0];
        //canvases could come back as an array
        var canvases = _this.getHitCanvases(searchResults, annotation);
        
        var canvasid = canvases[0].split("#")[0];
        var coordinates = canvases[0].split("#")[1];
        //not sure how to get canvas label so I'm just hacking it for the moment
        var canvaslabel = canvasid.split("/").pop();
        
        resultobject = {canvasid: canvasid,
                        coordinates: coordinates,
                        canvaslabel: canvaslabel,
                        resulttext: hit.before + "<span style='background-color: yellow'>" + hit.match + "</span>" + hit.after}; 

        tplData.push(resultobject);              
      });
    return tplData;
  },

  getHitCanvases: function(searchResults, annotationid){
    var results = [];
    searchResults.resources.forEach(function(resource){
      if (resource["@id"] === annotationid){
        results.push(resource.on);
      }
    //should return an array of canvasids; 
    //in most cases there will only be one result in that array
    });
    return results;
  },

  bindEvents: function() {
    _this = this;
    this.element.find('.js-show-canvas').on("click", function() {
      var canvasid = jQuery(this).attr('data-canvasid');
      var coordinates = jQuery(this).attr('data-coordinates');
      jQuery(".result-wrapper").css("background-color", "inherit");
      jQuery(this).parent().css("background-color", "lightyellow");
      //if there was more than one annotation 
      //(for example if a word crossed a line and needed two coordinates sets)
      //the miniAnnotationList should have multiple objects
      miniAnnotationList  = [
                              {
                              "@id": "test",
                              "@type": "oa:Annotation",
                              "motivation": "sc:painting",
                              "resource": {
                                "@type": "cnt:ContentAsText",
                                "chars": _this.query
                              },
                              "on": canvasid + "#" + coordinates
                              }
                            ]; 
      
      _this.parent.annotationsList = miniAnnotationList;
      _this.parent.toggleImageView(canvasid);
      
    });
  },

    //notes about template, I can't the js-show-canvas to fire when applied to the wrapping div.
    //so for now its applied on both the canvas number and the paragraph
  template: Handlebars.compile([
            '{{#each this}}',
            "<div class='result-wrapper'>",
            "<a style='cursor: pointer;' class='js-show-canvas' data-canvasid='{{canvasid}}' data-coordinates='{{coordinates}}'>Canvas ", 
            "{{canvaslabel}}",
            "</a>",
            "<div style='cursor: pointer;' class='result-paragraph js-show-canvas' data-canvasid='{{canvasid}}' data-coordinates='{{coordinates}}'>", 
            "{{resulttext}}",
            "</div>",
            "</div>",
            '{{/each}}'
            ].join(""), { noEscape: true })    

  };

}(Mirador));
