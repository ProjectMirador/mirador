(function($) {

  $.Slot = function(options) {

    jQuery.extend(true, this, {
      workspaceSlotCls: 'slot',
      slotId:           null,
      focused:          null,
      appendTo:         null,
      parent:           null,
      window:           null,
      windowElement:    null

    }, $.DEFAULT_SETTINGS, options);

    this.init();

  };

  $.Slot.prototype = {
    init: function () {
      this.element = jQuery(this.template({
        workspaceSlotCls: this.workspaceSlotCls,
        slotId: 0
      }));
      this.element.appendTo(this.appendTo);

      this.bindEvents();
    },

    bindEvents: function() {
      var _this = this;

      jQuery.subscribe('manifestToWorkspace', function(_, manifest, uiState) {
        _this.clearSlot();
        console.log(uiState);
        console.log(manifest);
        _this.window = new $.Window({appendTo: _this.element, uiState: uiState, manifest: manifest});
      });
      
      this.element.find('.addItemLink').on('click', function(){ _this.addItem(); });
    },

    clearSlot: function() {
      if (this.windowElement) { 
        this.windowElement.fadeOut();
        this.windowElement.remove();
      }
    },

    addItem: function() {
      this.focused = true;
      this.parent.focusedSlot = this.slotId;
      this.parent.parent.toggleLoadWindow();
    },

    // template should be based on workspace type
    template: Handlebars.compile([
                                 '<div id="{{slotId}}" class="{{workspaceSlotCls}}">',
                                 '<div class="slotIconContainer">',
                                 '<h1 class="plus">+</h1>',
                                 '<h1>Add Item to Workspace</h1>',
                                 '</div>',
                                 '<a class="addItemLink"></a>',
                                 '</div>'
    ].join(''))
  };

}(Mirador));

