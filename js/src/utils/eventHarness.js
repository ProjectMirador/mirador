(function($) {

  $.EventHarness = function(options) {

     jQuery.extend(true, this, {
         type: null
     }, $.DEFAULT_SETTINGS, options);

  };

  $.EventHarness.prototype = {

  };

}(Mirador));

