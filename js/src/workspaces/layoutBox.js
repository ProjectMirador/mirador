(function($) {

  $.LayoutBox = function(options) {
    jQuery.extend(true, this, {
      handles: null,
      id: null,
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
      var _this = this;

      this.element = jQuery(_this.template({
        slotID: this.id
      })).appendTo(_this.container);

      console.log('did this get done?');

      this.element.resizable({
        handles: this.handles, 
        containment: 'parent',
        start: _this.start,
        resize: function(event, ui) { _this.resize(event, ui); },
        stop: _this.stop
      });
      this.element.appendTo(this.container);
      this.setPositionAndSize(this.x, this.y, this.width, this.height);
      // remove handles for top or bottom of column
      // or left or right of row.

      this.bindEvents();
    },

    bindEvents: function() {
      var _this = this;

    },

    start: function(event, ui) {
     
    },

    resize: function(event, ui) {
      event.stopImmediatePropagation();
      this.parent.resizeSlot(this.id, event, ui);
    },

    stop: function(event, ui) {
      // save new workspace layout.
    },

    setPositionAndSize: function(x, y, w, h) {
      this.x = x;
      this.y = y;
      this.width = w;
      this.heightx = h;
      
      this.setSize(this.width, this.height);
      this.setPosition(this.x, this.y);
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

    template: Handlebars.compile([
                                 '<div data-layout-slot-id="{{slotID}}" class="layout-slot">',
                                 '</div>'
    ].join(''))

  };

})(Mirador);

