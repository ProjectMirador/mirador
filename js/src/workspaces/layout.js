(function($) {

  // Given a parent, and a configuration structure,
  // produces an invisible grid into which you
  // may place any element.
  $.Layout = function(options) {

    jQuery.extend(true, this, {
      layout:           null,
      parent:           null,
      layoutContainer:  null,
      elements:         null
    }, options);

    this.init();

  };

  $.Layout.prototype = {
    init: function() {
      var _this = this;

      this.calculateSlotGraph().forEach(function(slot) {
        var layoutSlot = jQuery(_this.singleLayoutSlotTemplate({
          slotID: slot.id
        })).appendTo(_this.layoutContainer);
        layoutSlot.resizable({handles: "all", containment: 'parent'});
        layoutSlot.position({my:"left top", at: "center center", of: _this.layoutContainer, collision: "fit"});
        // remove handles for top or bottom of column
        // or left or right of row.
      });

      this.bindEvents();
    },

    tplData: function() {
      var tplData = {
      };
    },

    calculateSlotGraph: function() {
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

    // for a given area, get the required dimensions
    //
    // (width, height, x/y positions for a layout
    // slot's DOM element)
    getDimensionsFromLayoutGraph: function() {

    },

    bindEvents: function() {
      var _this = this;

      // A layout element is resized. Detect whether
      // it is a row or a column and resize its siblings
      // accordingly, recalculating the layout.
      
      // throttle the resize event and broadcast the
      // new widths and heights to all necessary children,
      // having them resize themselves.

      // The workspace container is resized, 

      // A new slot is added.
      
      // A new slot is removed.
      
      // A slot is moved from one place to another by dragging.

    },

    addSlot: function() {
      // insert at position in DOM with 0 width/height
      // depending on if it is a column or a row and
      // animate resizing it to its correct position.
    },

    resizeSlot: function() {
      // for given slot, select the siblings that 
      // need resizing, do some math for them, 
      // resize them along with a given element.

    },
    
    singleLayoutSlotTemplate: Handlebars.compile([
                                 '<div data-layout-slot-id="{{slotID}}" class="layout-slot">',
                                 '</div>'
    ].join(''))

  };

}(Mirador));

