(function($) {

  $.Workspace = function(options) {

    jQuery.extend(true, this, {
      type:             null,
      workspaceSlotCls: 'slot',
      focusedSlot:      null,
      slots:            null,
      appendTo:         null,
      parent:           null

    }, options);

    this.element  = this.element || jQuery('<div class="workspace-container">');
    this.init();

  };

  $.Workspace.prototype = {
    init: function () {
      this.element.appendTo(this.appendTo);
      

      this.layout = new $.Layout({
        layout: this.parent.workspaces[this.parent.currentWorkspaceType].layout,
        parent: this,
        layoutContainer: this.element
      });
      
      this.slots = this.extractSlots(this.parent.workspaces[this.parent.currentWorkspaceType].layout);

      if (this.focusedSlot === null) {
        // set the focused slot to the first in the list
        this.focusedSlot = 0;
      }
      
      this.bindEvents();
    },
    extractSlots: function(layout) {
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

      crawlLayout(layout, slots);

      slotObjects = slots.map(function(slotData) {
        return new $.Slot({
          slotID: slotData.id,
          focused: true,
          parent: _this,
          appendTo: _this.layout.slots[slotData.id].element
        });
      });

      return slotObjects;
    },

    bindEvents: function() {
      var _this = this;
    },

    addSlot: function() {

    },

    removeSlot: function() {

    },

    clearSlot: function(slotId) {
      if (this.slots[slodId].windowElement) { 
        this.slots[slotId].windowElement.remove();
      }
      this.slots[slotId].window = new $.Window();
    },

    addItem: function(slotID) {
      this.focusedSlot = slotID;
      this.parent.toggleLoadWindow();
    },

    hide: function() {
      jQuery(this.element).hide({effect: "fade", duration: 1000, easing: "easeOutCubic"});
    },

    show: function() {
      jQuery(this.element).show({effect: "fade", duration: 1000, easing: "easeInCubic"});
    }
  };

}(Mirador));

