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
      this.bindEvents();
    },

    bindEvents: function() {
      var _this = this,
      osd = _this.parent.osd;

      this.parent.element.find('.mirador-osd-next').on('click', function() {
        console.log('next');
        _this.parent.next();
      });

      this.parent.element.find('.mirador-osd-previous').on('click', function() {
        console.log('previous');
        _this.parent.previous();
      });
      
      this.parent.element.find('.mirador-osd-go-home').on('click', function() {
        console.log('previous');
        _this.parent.osd.viewport.goHome();
      });
      
      this.parent.element.find('.mirador-osd-up').on('click', function() {
        console.log('up');
        osd.viewport.panBy(new OpenSeadragon.Point(0, -0.05));
        osd.viewport.applyConstraints();
      });
      this.parent.element.find('.mirador-osd-right').on('click', function() {
        console.log('right');
        osd.viewport.panBy(new OpenSeadragon.Point(0.05, 0));
        osd.viewport.applyConstraints();
      });
      this.parent.element.find('.mirador-osd-down').on('click', function() {
        console.log('down');
        osd.viewport.panBy(new OpenSeadragon.Point(0, 0.05));
        osd.viewport.applyConstraints();
      });
      this.parent.element.find('.mirador-osd-left').on('click', function() {
        console.log('left');
        osd.viewport.panBy(new OpenSeadragon.Point(-0.05, 0));
        osd.viewport.applyConstraints();
      });
      
      this.parent.element.find('.mirador-osd-zoom-in').on('click', function() {
        if ( osd.viewport ) {
          osd.viewport.zoomBy(
            osd.zoomPerClick / 1.0

          );
          osd.viewport.applyConstraints();

        }
      });
      
      this.parent.element.find('.mirador-osd-zoom-out').on('click', function() {
        if ( osd.viewport ) {
          osd.viewport.zoomBy(
            1.0 / osd.zoomPerClick
          );
          osd.viewport.applyConstraints();
        }
      });

      this.parent.element.find('.mirador-osd-fullscreen').on('click', function() {
        _this.fullScreen();
      });
    },

    fullScreen: function() {
      var replacementButton;
      if (OpenSeadragon.isFullScreen()) {
        OpenSeadragon.exitFullScreen();
        replacementButton = jQuery('<i class="fa fa-expand"></i>');
        this.parent.element.find('.mirador-osd-fullscreen').empty().append(replacementButton);
      } else {
        OpenSeadragon.requestFullScreen(this.parent.element[0]);
        replacementButton = jQuery('<i class="fa fa-compress"></i>');
        this.parent.element.find('.mirador-osd-fullscreen').empty().append(replacementButton);
      }
    },

    template: Handlebars.compile([
                                 '<a class="mirador-osd-previous hud-control">',
                                 '<i class="fa fa-3x fa-chevron-left "></i>',
                                 '</a>',
                                 '<a class="mirador-osd-fullscreen hud-control">',
                                 '<i class="fa fa-expand"></i>',
                                 '</a>',
                                 '<a class="mirador-osd-next hud-control">',
                                 '<i class="fa fa-3x fa-chevron-right"></i>',
                                 '</a>',
                                 '<div class="mirador-pan-zoom-controls hud-control">',
                                     '<a class="mirador-osd-up hud-control">',
                                       '<i class="fa fa-chevron-circle-up"></i>',
                                     '</a>',
                                     '<a class="mirador-osd-right hud-control">',
                                       '<i class="fa fa-chevron-circle-right"></i>',
                                     '</a>',
                                     '<a class="mirador-osd-down hud-control">',
                                       '<i class="fa fa-chevron-circle-down"></i>',
                                     '</a>',
                                     '<a class="mirador-osd-left hud-control">',
                                       '<i class="fa fa-chevron-circle-left"></i>',
                                     '</a>',
                                     '<a class="mirador-osd-zoom-in hud-control">',
                                       '<i class="fa fa-plus-circle"></i>',
                                     '</a>',
                                     '<a class="mirador-osd-zoom-out hud-control">',
                                       '<i class="fa fa-minus-circle"></i>',
                                     '</a>',
                                     '<a class="mirador-osd-go-home hud-control">',
                                       '<i class="fa fa-home"></i>',
                                     '</a>',
                                 '</div>'
    ].join(''))

  };

}(Mirador));
