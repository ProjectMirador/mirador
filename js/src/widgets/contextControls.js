(function($) {

  $.ContextControls = function(options) {

    jQuery.extend(this, {
      parent: null,
      element: null,
      container: null,
      mode: null,
      windowId: null,
      rectTool: null,
      annoEndpointAvailable: false
    }, options);

    this.init();
  };

  $.ContextControls.prototype = {

    init: function() {    
      this.element = jQuery(this.template()).appendTo(this.container);
      this.hide();
      this.bindEvents();
    },

    show: function() {
      this.element.show().fadeIn();
    },

    hide: function() {
      this.element.hide().fadeOut();
    },

    bindEvents: function() {
      var _this = this;

      this.container.find('.mirador-osd-close').on('click', function() {
        _this.parent.annoState.displayOff();
      });
      
      this.container.find('.mirador-osd-back').on('click', function() {
        _this.element.remove();
        _this.element = jQuery(_this.template()).appendTo(_this.container);
        _this.bindEvents();
      });
      
      this.container.find('.mirador-osd-edit-mode').on('click', function() {
        if (_this.parent.annoState.current === 'annoOnEditOff') {
          _this.parent.annoState.editOn();
        } else if (_this.parent.annoState.current === 'annoOnEditOn') {
          _this.parent.annoState.editOff();
        }
      });
      
    },

    template: Handlebars.compile([
                                 '<div class="mirador-osd-context-controls hud-container">',
                                   '<a class="mirador-osd-close hud-control">',
                                   '<i class="fa fa-2x fa-times"></i>',
                                   '</a>',
                                   '<a class="mirador-osd-edit-mode hud-control">',
                                   '<i class="fa fa-2x fa-edit"></i>',
                                   '</a>',
                                   /*'<a class="mirador-osd-list hud-control">',
                                   '<i class="fa fa-2x fa-list"></i>',
                                   '</a>',*/
                                   /*'<a class="mirador-osd-search hud-control">',
                                   '<i class="fa fa-2x fa-search"></i>',
                                   '</a>',*/
                                   /*'<a class="mirador-osd-rect-tool hud-control">',
                                   '<i class="fa fa-2x fa-gear"></i>',
                                   '</a>',*/
                                 '</div>'
    ].join('')),

    editorTemplate: Handlebars.compile([
                                 '<div class="mirador-osd-context-controls hud-container">',
                                   '<a class="mirador-osd-back hud-control">',
                                   '<i class="fa fa-2x fa-arrow-left"></i>',
                                   '</a>',
                                   '<a class="mirador-osd-rect-tool hud-control">',
                                   '<i class="fa fa-2x fa-pencil-square"></i>',
                                   '</a>',
                                   '<a class="mirador-osd-rect-tool hud-control">',
                                   '<i class="fa fa-2x fa-ellipsis-h"></i>',
                                   '</a>',
                                   '<a class="mirador-osd-rect-tool hud-control">',
                                   '<i class="fa fa-2x fa-gear"></i>',
                                   '</a>',
                                 '</div>'
    ].join(''))
  };
}(Mirador));
