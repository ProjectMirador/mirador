(function($) {

  // Given a parent, and a configuration structure,
  // produces an invisible grid into which you
  // may place any element.
  $.Layout = function(options) {

    jQuery.extend(true, this, {
      parent:           null,
      appendTo:         null,
      element:          null
    }, options);

    this.init();

  };

  $.Layout.prototype = {
    init: function() {
      console.log(this.tplData());
      this.bindEvents();
    },

    tplData: function() {
      var _this = this,
      slots = [];

      // extracts only the leaves of the tree.
      function crawlLayout(tree, slots) {
        tree.forEach(function(branch){
          if ( !branch.hasOwnProperty('children') && branch.slot === true ) {
            slots.push(branch);
          }
          else {
            crawlLayout(branch.children, slots);
          }
        });
      }

      crawlLayout(_this.layout, slots);

      return slots;
    },

    bindEvents: function() {
      var _this = this;

      // A layout element is resized. Detect whether
      // it is a row or a column and resize its siblings
      // accordingly, recalculating the layout.

      // The workspace container is resized, 

      // A new slot is added.
      
      // A new slot is removed.
      
      // A slot is moved from one place to another by dragging.

    },

    clearSlot: function() {
      if (this.window) { 
        this.window.element.toggle('scale').fadeOut();
        this.window.element.remove();
      }
    },

    addItem: function() {
      _this = this;
      _this.focused = true;
      _this.parent.addItem(_this.slotID);
    }

  };

}(Mirador));

