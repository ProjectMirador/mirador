(function($) {

  $.Window = function(options) {

     jQuery.extend(true, this, {
         element:           null,
         appendTo:          null,
         manifest:          null
         
     }, $.DEFAULT_SETTINGS, options);
          
     this.init();

  };

  $.Window.prototype = {
      init: function () {
            this.element = jQuery(this.template()).appendTo(this.appendTo);

            this.bindEvents();
      },
      
      bindEvents: function() {
            var _this = this;
            
            jQuery.subscribe('manifestToWindow', function(_, manifest) {
                _this.manifest = manifest;
            });
      },
      
      //template should be based on workspace type
      template: Handlebars.compile([
      '<div>',
      '</div>'
      ].join(''))
  };

}(Mirador));

