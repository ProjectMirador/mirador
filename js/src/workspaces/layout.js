(function($) {

  // Given a parent, and a configuration structure,
  // produces an invisible grid into which you
  // may place any element.
  $.Layout = function(options) {

    jQuery.extend(true, this, {
      slots:            {},
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

      this.graph = this.calculateSlotGraph();
      jQuery.each(_this.graph, function(index, slot) {
        _this.slots[slot.id] = slot;
        slot.layoutDimensions.parent = _this;
        _this.slots[slot.id].layoutBox = new $.LayoutBox(slot.layoutDimensions);
      });

      this.bindEvents();
    },

    calculateSlotGraph: function() {
      var _this = this,
      slots = {},
      containerWidth = _this.layoutContainer.outerWidth(),
      containerHeight = _this.layoutContainer.outerHeight();
      // given:
      // a slot's "position in the layout" and the container width,
      // 
      // It is required to find a slot's layoutDimensions.
      // the position in the layout means "what are the parents?"
      // "is it a row or a column?"
      //
      // With the simple case of the single column workspace:
      // the width is "width", there is only one child, and it is 
      // a leaf node. It will have 100% width and 100% height. 
      //
      // With the slightly more complicated case of the 2-column
      // compare workspace:
      // width is "width" (of the container), and the workspace
      // will now be bifurcated. Any remaining space will now
      // be partitioned out of half of the remaining space.
      // Thankfully, the next level are leaves, so there is 
      // no need to store or sort remaining space.
      //
      // With the "reference" workspace, or when there is a 
      // free-form tiled view, the subtraction of remaining
      // space must continue at each iteration.

      // extracts only the leaves of the tree.
      function crawlLayout(tree, slots) {
        tree.forEach(function(branch, index) {
          if ( !branch.hasOwnProperty('children') && branch.slot === true ) {
            var leaf = branch,
            siblings = tree;

            leaf.siblingIDs = siblings.map(function(sibling){ return sibling.id; });

            leaf.layoutDimensions = {
              id: leaf.id,
              x: leaf.x || containerWidth/tree.length*index,
              y: 0,
              width: leaf.width || containerWidth/tree.length,
              height: containerHeight,
              handles: (function() { 
                if (leaf.siblingIDs) {
                  return index === 1 ? "": "e";
                } else {
                  return "";
                }
              })(),
              container: _this.layoutContainer
            };

            slots[branch.id] = leaf;
            // siblings
            // layout dimensions
            // parent (a slot is always a leaf, and thus has no children).
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
      // jQuery('.viewer').on('resize', function() { _this.resizeContainer(); });
      
      // jQuery(window).resize($.debounce(function(){
      //   _this.resizeContainer();
      // }, 300));

      // A new slot is added.
      
      // A new slot is removed.
      
      // A slot is moved from one place to another by dragging.

    },

    resizeContainer: function() {
      var _this = this;
      
      // For given slot, select the siblings that 
      // need resizing, do some math for them, 
      // resize them along with a given element.
      
      var oldContainerWidth = jQuery.map(this.slots, function(slot, index){ return slot.layoutDimensions.width;})
      .reduce(function(a, b) {
        return a + b;
      }),
      newContainerWidth = this.layoutContainer.outerWidth();
      
      jQuery.each(this.slots, function(index, slot) {
        slot = slot.layoutDimensions;

        var oldWidth = slot.width,
        oldHeight = slot.height,
        percentageWidth = oldContainerWidth/oldWidth,
        percentageX = slot.x/oldContainerWidth,
        
        x = percentageX*newContainerWidth,
        y = 0,
        width = newContainerWidth/percentageWidth,
        height = _this.layoutContainer.outerHeight();

        jQuery.each(_this.slots, function(index, slot) {
          slot.layoutBox.setPositionAndSize(x, y, width, height);
        });
      });
      jQuery.publish("scrollViewResize");
    },

    addSlot: function() {
      // insert at position in DOM with 0 width/height
      // depending on if it is a column or a row and
      // animate resizing it to its correct position.
    },

    resizeSlot: function(slotID, event, ui) {
      var _this = this;
      event.stopPropagation();
      
      // For given slot, select the siblings that 
      // need resizing, do some math for them, 
      // resize them along with a given element.
      
      var oldLeaderWidth = _this.slots[slotID].layoutDimensions.width,
      newLeaderWidth = ui.size.width,
      containerWidth = this.slots[slotID].layoutDimensions.container.outerWidth(),
      oldRemainingWidth = containerWidth - oldLeaderWidth,
      remainingWidth = containerWidth - newLeaderWidth,
      delta = oldLeaderWidth - newLeaderWidth;
      
      this.slots[slotID].siblingIDs.filter(function(ID) {
        return slotID !== ID ? true : false;
      }).forEach(function(siblingID) {
        var sibling = _this.slots[siblingID].layoutDimensions;
        var oldWidth = sibling.width,
        oldHeight = sibling.height,
        percentageWidth = oldRemainingWidth/oldWidth,
        x = sibling.x - delta,
        y = sibling.y,
        width = remainingWidth/percentageWidth,
        height = sibling.height;

        _this.slots[siblingID].layoutBox.setPositionAndSize(x, y, width, height);
      });

      // Siblings must be resized. If the parent is a 
      // top-most column or row, then it will not be
      // resizeable in one direction. Therefore, the only
      // remaining dimension will steal or give space to 
      // the siblings that they must fill according to 
      // their previous occupation of the gnomon.  
      //
      // If the parent is a lower-level column or row, 
      // and the event target slot is resized in a way
      // that does not give room to its siblings, then
      // the virtual parent will expand, stealing room 
      // from its siblings. The result will be more room
      // that all its children will fill together.
      //
      // The resize events can be delegated up or down, 
      // affecting only one layer of hierarchy.
      event.stopPropagation();
    }
    
  };

}(Mirador));

