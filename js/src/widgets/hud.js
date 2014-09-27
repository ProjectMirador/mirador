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
      this.parent.parent.bottomPanelVisibility(this.parent.parent.bottomPanelVisible);
    },

    bindEvents: function() {
      var _this = this;

      this.parent.element.find('.mirador-osd-next').on('click', function() {
        console.log('next');
        _this.parent.next();
      });

      this.parent.element.find('.mirador-osd-previous').on('click', function() {
        console.log('previous');
        _this.parent.previous();
      });
      
      this.parent.element.find('.mirador-osd-go-home').on('click', function() {
        _this.parent.osd.viewport.goHome();
      });
      
      this.parent.element.find('.mirador-osd-up').on('click', function() {
        console.log('up');
        var osd = _this.parent.osd;
        osd.viewport.panBy(new OpenSeadragon.Point(0, -0.05));
        osd.viewport.applyConstraints();
      });
      this.parent.element.find('.mirador-osd-right').on('click', function() {
        console.log('right');
        var osd = _this.parent.osd;
        osd.viewport.panBy(new OpenSeadragon.Point(0.05, 0));
        osd.viewport.applyConstraints();
      });
      this.parent.element.find('.mirador-osd-down').on('click', function() {
        console.log('down');
        var osd = _this.parent.osd;
        osd.viewport.panBy(new OpenSeadragon.Point(0, 0.05));
        osd.viewport.applyConstraints();
      });
      this.parent.element.find('.mirador-osd-left').on('click', function() {
        console.log('left');
        var osd = _this.parent.osd;
        osd.viewport.panBy(new OpenSeadragon.Point(-0.05, 0));
        osd.viewport.applyConstraints();
      });
      
      this.parent.element.find('.mirador-osd-zoom-in').on('click', function() {
        var osd = _this.parent.osd;
        if ( osd.viewport ) {
          osd.viewport.zoomBy(
            osd.zoomPerClick / 1.0

          );
          osd.viewport.applyConstraints();

        }
      });
      
      this.parent.element.find('.mirador-osd-zoom-out').on('click', function() {
        var osd = _this.parent.osd;
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
      
      this.parent.element.find('.mirador-osd-toggle-bottom-panel').on('click', function() {
        var visible = !_this.parent.parent.bottomPanelVisible;
        _this.parent.parent.bottomPanelVisibility(visible);
      });
      
      jQuery.subscribe('bottomPanelSet.' + _this.parent.parent.id, function(event, visible) {
        var dodgers = _this.parent.element.find('.mirador-osd-toggle-bottom-panel, .mirador-pan-zoom-controls');
        var arrows = _this.parent.element.find('.mirador-osd-next, .mirador-osd-previous');
        console.log(dodgers);
        if (visible.visible === true) {
          dodgers.css({transform: 'translateY(-130px)'});
          arrows.css({transform: 'translateY(-65px)'});
        } else {
          dodgers.css({transform: 'translateY(0)'});
          arrows.css({transform: 'translateY(0)'});
        }

      });
    },

    fullScreen: function() {
      var replacementButton,
      bottomPanelHeight = this.parent.parent.element.find('.bottomPanel').innerHeight();

      if (OpenSeadragon.isFullScreen()) {

        OpenSeadragon.exitFullScreen();
        replacementButton = jQuery('<i class="fa fa-expand"></i>');
        this.parent.element.find('.mirador-osd-fullscreen').empty().append(replacementButton);
        this.parent.element.find('.mirador-osd-toggle-bottom-panel').show();
        this.parent.parent.bottomPanelVisibility(true);

        } else {

        OpenSeadragon.requestFullScreen(this.parent.element[0]);
        replacementButton = jQuery('<i class="fa fa-compress"></i>');
        this.parent.element.find('.mirador-osd-fullscreen').empty().append(replacementButton);
        this.parent.element.find('.mirador-osd-toggle-bottom-panel').hide();
        this.parent.parent.bottomPanelVisibility(false);

      }
    },

    template: Handlebars.compile([
                                 '<a class="mirador-osd-previous hud-control ">',
                                   '<i class="fa fa-3x fa-chevron-left "></i>',
                                 '</a>',
                                 '<a class="mirador-osd-fullscreen hud-control">',
                                   '<i class="fa fa-expand"></i>',
                                 '</a>',
                                 '<a class="mirador-osd-next hud-control ">',
                                   '<i class="fa fa-3x fa-chevron-right"></i>',
                                 '</a>',
                                 '<a class="mirador-osd-toggle-bottom-panel hud-control ">',
                                   '<i class="fa fa-2x fa-ellipsis-h"></i>',
                                 '</a>',
                                 '<div class="mirador-pan-zoom-controls hud-control ">',
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
