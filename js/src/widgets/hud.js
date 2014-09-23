(function($) {

  $.Hud = function(options) {

    jQuery.extend(this, {
      parent: null
    }, options);
    
    this.init();
  };

  $.Hud.prototype = {
  
    init: function() {    
      this.element = jQuery(this.template()).appendTo(this.element);
    },
    
    template: Handlebars.compile([
        '<a class="mirador-osd-previous hud-control">',
          '<i class="fa fa-2x fa-chevron-left "></i>',
        '</a>',
        // '<a class="mirador-btn mirador-icon-zoom-in"></a>', 
        // '<a class="mirador-btn mirador-icon-zoom-out"></a>',
        // '<a class="mirador-btn mirador-icon-home"></a>',
        '<a class="mirador-osd-fullscreen hud-control">',
          '<i class="fa fa-expand"></i>',
        '</a>',
        '<a class="mirador-osd-next hud-control">',
          '<i class="fa fa-2x fa-chevron-right"></i>',
        '</a>' //,
        // '<div class="mirador-pan-zoom-controls hud-control">',
        //     '<a class="mirador-osd-up hud-control">',
        //       '<i class="fa fa-angle-up"></i>',
        //     '</a>',
        //     '<a class="mirador-osd-right hud-control">',
        //       '<i class="fa fa-angle-right"></i>',
        //     '</a>',
        //     '<a class="mirador-osd-down hud-control">',
        //       '<i class="fa fa-angle-down"></i>',
        //     '</a>',
        //     '<a class="mirador-osd-left hud-control">',
        //       '<i class="fa fa-angle-left"></i>',
        //     '</a>',
        //     '<a class="mirador-osd-zoom-in hud-control">',
        //       '<i class="fa fa-plus"></i>',
        //     '</a>',
        //     '<a class="mirador-osd-zoom-out hud-control">',
        //       '<i class="fa fa-minus"></i>',
        //     '</a>',
        // '</div>'
    ].join('')),
    
    bindEvents: function() {
       var _this = this;

    }
  };

}(Mirador));
