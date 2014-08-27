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
      this.element.appendTo(this.appendTo);

      this.bindEvents();
    },

    bindEvents: function() {
      var _this = this;

      // Slot only subscribes under its own name,
      // so it will be the only one whose function is
      // called to create a window when the 
      // load menu is invoked from it.
      jQuery.subscribe('manifestToSlot', function(e, windowConfig) { 
        _this.clearSlot();
        if (_this.window && !windowConfig.id) {
           windowConfig.id = _this.window.id;
        }
        windowConfig.appendTo = _this.element;
        if (_this.window) {
          _this.window.update(windowConfig);
        } else {
          _this.window = new $.Window(windowConfig);
        }
      });
      
      this.element.find('.addItemLink').on('click', function(){ _this.addItem(); });
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

