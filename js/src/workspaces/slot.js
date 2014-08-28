(function($) {

  $.Slot = function(options) {

    jQuery.extend(true, this, {
      workspaceSlotCls: 'slot',
      slotID:           1,
      focused:          null,
      appendTo:         null,
      parent:           null,
      window:           null,
      windowElement:    null

    }, options);

    this.init();

  };

  $.Slot.prototype = {
    init: function () {
      this.element = jQuery(this.template({
        workspaceSlotCls: this.workspaceSlotCls,
        slotID: 1
      }));
      this.element.resizable();
      this.element.appendTo(this.appendTo);

      this.bindEvents();
    },

    bindEvents: function() {
      var _this = this;

      // Slot only subscribes under its own name,
      // so it will be the only one whose function is
      // called to create a window when the 
      // load menu is invoked from it.
      jQuery.subscribe('manifestToSlot', function(e, manifest, focusState, imageID, windowID) {
        _this.clearSlot();
        if (_this.window && !windowID) {
           windowID = _this.window.id;
        }
        _this.window = new $.Window({appendTo: _this.element, currentFocus: focusState, currentImageID: imageID, manifest: manifest, id: windowID});
      });
      
      this.element.find('.addItemLink').on('click', function(){ _this.addItem(); });
    },

    clearSlot: function() {
      if (this.window) { 
        this.window.element.toggle('scale').fadeOut();
        this.window.element.remove();
      }
    },

    resize: function() {
      // notify the layout manager with
      // appropriate information.
    },

    addItem: function() {
      _this = this;
      _this.focused = true;
      _this.parent.addItem(_this.slotID);
    },

    // template should be based on workspace type
    template: Handlebars.compile([
                                 '<div id="{{slotID}}" class="{{workspaceSlotCls}}">',
                                 '<div class="slotIconContainer">',
                                 '<h1 class="plus">+</h1>',
                                 '<h1>Add Item to Workspace</h1>',
                                 '</div>',
                                 '<a class="addItemLink"></a>',
                                 '</div>'
    ].join(''))
  };

}(Mirador));

