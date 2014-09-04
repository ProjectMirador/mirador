(function($) {

  $.LayoutBox = function(options) {
    jQuery.extend(true, this, {
      width: null,
      height: null,
      x: null,
      y: null,
      container: null
    }, options);

    this.init();
  };

  $.LayoutBox.prototype = {
    init: function() {
      _this = this;

      this.element = jQuery(_this.template({
        slotID: this.id
      })).appendTo(_this.container);

      this.element.resizable({handles: this.handles, containment: 'parent'});
      this.element.appendTo(this.container);
      this.setPositionAndSize(this.x, this.y, this.width, this.height);
      // remove handles for top or bottom of column
      // or left or right of row.

      this.bindEvents();
    },

    bindEvents: function() {
      var _this = this;

    },

    resize: function() {
      // notify the layout manager with
      // appropriate information.
    },
    
    setPositionAndSize: function(x, y, w, h) {
      this.setSize(w, h);
      this.setPosition(x, y);
    },
    
    setPosition: function(x, y) {
      var _this = this;
      x = Math.round(x);
      y = Math.round(y);

      this.element.position({my: "left top", at: "left+" + x + " top+" + y, of: _this.container, collision: 'none' });
    },
    
    setSize: function(w, h) {
      this.element.width(Math.round(w));
      this.element.height(Math.round(h));
    },

    adjustToLayout: function() {

    },

    template: Handlebars.compile([
                                 '<div data-layout-slot-id="{{slotID}}" class="layout-slot">',
                                 '</div>'
    ].join(''))

  };

})(Mirador);

