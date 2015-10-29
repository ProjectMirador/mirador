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
          console.log("this",this);
          console.log("this_", _this);
          console.log("test", _this.query);
      
      _this.searchService = this.manifest.getSearchWithinService();
      console.log(this.searchService);


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

        console.log("tplData", _this.tplData);
        //add array to template 
        _this.element = jQuery(_this.template(_this.tplData)).appendTo(_this.appendTo);
        //bind events
        _this.bindEvents();
      });
    },

  // Base code from https://github.com/padolsey/prettyprint.js. Modified to fit Mirador needs
  searchRequest: function(query){
    _this = this;
    var searchRequest = jQuery.ajax({
          url: _this.searchService['@id'] + "?q=" + query,
          //url: "http://wellcomelibrary.org/annoservices/search/b18035978" + "?q=" + query,
          dataType: 'json',
          async: true
        });
     return searchRequest;
  },
  getSearchAnnotations: function(results){
    tplData = [];
    searchResults.resources.forEach(function(result){
      var canvasid = result.on.split("#")[0];
      //not sure how to get canvas label so I'm just hacking it for the moment
      var canvaslabel = canvasid.split("/").pop();
      
      resultobject = {canvasid: canvasid,
                      canvaslabel: canvaslabel,
                      resulttext: result.resource.chars}; 

      tplData.push(resultobject);              
    });
    return tplData;
  },
  getHits: function(searchResults){
      tplData = [];
      searchResults.hits.forEach(function(hit){
        //var canvasid = result.on.split("#")[0];
        //not sure how to get canvas label so I'm just hacking it for the moment
        //var canvaslabel = canvasid.split("/").pop();
        
        resultobject = {canvasid: "test",
                        canvaslabel: "test",
                        resulttext: hit.before + "<span style='background-color: yellow'>" + hit.match + "</span>" + hit.after}; 

        tplData.push(resultobject);              
      });
      return tplData;
  },

  

  bindEvents: function() {
    _this = this;
    this.element.find('.js-show-canvas').on("click", function() {
      console.log("event triggered");
      var canvasid = jQuery(this).attr('data-canvasid');
      jQuery(".result-wrapper").css("background-color", "inherit");
      jQuery(this).parent().css("background-color", "lightyellow");

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
            "<a style='cursor: pointer;' class='js-show-canvas' data-canvasid='{{canvasid}}'>Canvas ", 
            "{{canvaslabel}}",
            "</a>",
            "<div style='cursor: pointer;' class='result-paragraph js-show-canvas' data-canvasid='{{canvasid}}'>", 
            "{{resulttext}}",
            "</div>",
            "</div>",
            '{{/each}}'
            ].join(""), { noEscape: true })    

  };

}(Mirador));
