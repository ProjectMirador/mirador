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
        //_this.tplData = []; 

        //loop through restuls and fill array
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
    //var searchUrl = "";
    //if (_this.searchService.constructor === Array){
    //  searchUrl = _this.searchService[0]['@id'];
    //}
    //else{
    //  searchUrl = _this.searchService['@id'];
    //}

    var searchUrl = _this.searchService['@id'];
    
    console.log("searchUrl", searchUrl);

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
        var annotation = hit.annotations[0];
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
    //should return an array of canvasids
    });
    console.log(results);
    return results;
  },
  

  

  bindEvents: function() {
    _this = this;
    this.element.find('.js-show-canvas').on("click", function() {
      console.log("event triggered");
      var canvasid = jQuery(this).attr('data-canvasid');
      var coordinates = jQuery(this).attr('data-coordinates');
      jQuery(".result-wrapper").css("background-color", "inherit");
      jQuery(this).parent().css("background-color", "lightyellow");

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
      console.log("parent test", _this.parent);
      _this.parent.toggleImageView(canvasid);
      
    });
/*
    jQuery(document).on("click", ".js-show-canvas", function(){
      var canvasid = jQuery(this).attr('data-canvasid');
      jQuery(".result-wrapper").css("background-color", "inherit");
      jQuery(this).parent().css("background-color", "lightyellow");
      _this.toggleImageView(canvasid);

    });
*/
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
