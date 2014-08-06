(function($) {

  $.Workspace = function(options) {

    jQuery.extend(true, this, {
      type:             null,
      workspaceSlotCls: 'slot',
      focusedSlot:      1,
      slots:            null,
      appendTo:         null,
      parent:           null

    }, $.DEFAULT_SETTINGS, options);

    this.element  = this.element || jQuery('<div class="workspace-container">');
    this.init();

  };

  $.Workspace.prototype = {
    init: function () {
      this.element.appendTo(this.appendTo);

      if (this.focusedSlot === null) {
        this.focusedSlot = 0;
      }
      
      if (!this.slots) { 
        this.slots = [];
        this.slots.push(new $.Slot({
          slotId: 0,
          focused: true,
          parent: this,
          appendTo: this.element
        }));
      }

      this.bindEvents();
    },

    bindEvents: function() {
      var _this = this;
    },

    clearSlot: function(slotId) {
      if (this.slots[slodId].windowElement) { 
        this.slots[slotId].windowElement.remove();
      }
      this.slots[slotId].window = new $.Window();
    },

    addItem: function(slotID) {
      console.log('registered the active slot as: ' + slotID);
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

