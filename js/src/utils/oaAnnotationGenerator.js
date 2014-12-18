(function($) { 

  $.OaAnnotation = function(options) {

    jQuery.extend(this, {
      text: null,
      tags: null,
      bounds: null, // the "frame" or "cnotext" bounds, in canvas coordinates
      regionFragment: null,
      id: null, // the oa (canvas) @id under which to save it, preferably a uri.
      oaAnnotation: null
    }, options);

    this.init();
  };

  $.OaAnnotation.prototype = {

    init: function() {    
      this.oaAnnotation = {}; // stub text of valid oa annotation (as
                   // it would appear in an oa:annotationList)
                   // to go here. Properties will be queried and 
                   // twiddled by the get/set methods for each
                   // property below (as the annotation is 
                   // passed through the annotation creation process).
    },

    chars: function(chars) {
      // getter and setter for text of annotation.
      // If arguments are present, the property
      // is set to the given value. If there are no
      // arguments given, then
      if (!arguments.length) return _this.oa.resource.chars; // not sure if this is the right "path"?
      _this.oa.resource.chars = chars;
      return this; // allow chaining?
    },

    tags: function(tags) {
      if (!arguments.length) return _this.oa.resource.chars; // not sure if this is the right "path"?
      _this.oa.resource.chars = chars;
      return this; // allow chaining?
      // getter and setter for tag field (only the part that can be changed by user).
      // If arguments are present, the property
      // is set to the given value. If there are no
      // arguments given, then
    },

    regionFragment: function() {
      if (!arguments.length) return _this.oa.on; // not sure if this is the right "path"?
      _this.oa.on = chars; // not exactly, parse the "on" field to add the new context after hash.
      return this; // allow chaining?
      // getter and setter for tag field (only the part that can be changed by user).
      // If arguments are present, the property
      // is set to the given value. If there are no
      // arguments given, then
    }
  };
}(Mirador));
