(function($) {

  $.Slot = function(options) {

    jQuery.extend(true, this, {
      workspaceSlotCls: 'slot',
      slotID:           null,
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
        slotID: this.slotId 
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
      jQuery.subscribe('manifestToSlot.'+_this.slotID, function(e, windowConfig) { 
        _this.clearSlot();
        windowConfig.parent = _this;
        if (!_this.window && !windowConfig.id) {
           windowConfig.id = $.genUUID();
        }
        if (_this.window && !windowConfig.id) {
           windowConfig.id = _this.window.id;
        } 
        windowConfig.appendTo = _this.element;
        if (_this.window) {
          _this.window.update(windowConfig);
        } else {
          jQuery.publish("windowAdded", windowConfig.id);
          _this.window = new $.Window(windowConfig);
        }
      });
      
      this.element.find('.addItemLink').on('click', function(){ _this.addItem(); });
    },
    
    manifestToSlot: function(windowConfig) { 
        var _this = this;
        _this.clearSlot();
        windowConfig.parent = _this;
        if (!_this.window && !windowConfig.id) {
           windowConfig.id = $.genUUID();
        }
        if (_this.window && !windowConfig.id) {
           windowConfig.id = _this.window.id;
        } 
        windowConfig.appendTo = _this.element;
        jQuery.publish("windowAdded", windowConfig.id);
        //always create a new window so it's fresh and modified only by the config
        //this handles the situation of switching between paged and non-paged objects, for example
        _this.window = new $.Window(windowConfig);
      },

    clearSlot: function() {
      if (this.window) { 
         this.window.element.toggle('fade', 300, function() {
           jQuery(this).remove();        
        });
      }
    },

    resize: function() {
      // notify the layout manager with
      // appropriate information.
    },
    
    addItem: function() {
      _this = this;
      _this.parent.focused = true;
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

