(function($) {

  $.Slot = function(options) {

    jQuery.extend(true, this, {
      workspaceSlotCls: 'slot',
      slotID:           null,
      layoutAddress:    null,
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

      this.element.find('.addItemLink').on('click', function(){ _this.addItem(); });
      this.element.find('.remove-slot-option').on('click', function(){ 
        _this.parent.removeNode(_this); 
      });
      jQuery.subscribe('windowRemoved', function(event, id) {
        if (_this.window && _this.window.id === id) {
          // This prevents the save controller
          // from attempting to re-save the window
          // after having already removed it.
          _this.clearSlot();
        }
      });
      jQuery.subscribe('layoutChanged', function(event, layoutRoot) {
        if (_this.parent.slots.length <= 1) {
          _this.element.find('.remove-slot-option').hide();
        } else {
          _this.element.find('.remove-slot-option').show();
        }

        // Must reset the slotAddress of the window.
        if (_this.window) {
          _this.window.slotAddress = _this.layoutAddress;
          jQuery.publish('windowUpdated', {
            id: _this.window.id,
            slotAddress: _this.window.slotAddress
          });
        }
      });
    },

    clearSlot: function() {
      if (this.window) { 
        this.window.element.remove();
        delete this.window;
      }
    },

    addItem: function() {
      var _this = this;
      _this.focused = true;
      
      _this.parent.addItem(_this);
    },

    // template should be based on workspace type
    template: Handlebars.compile([
                                 '<div id="{{slotID}}" class="{{workspaceSlotCls}}">',
                                 '<div class="slotIconContainer">',
                                 // '<a href="javascript:;" class="mirador-btn mirador-icon-window-menu" title="Replace object"><i class="fa fa-table fa-lg fa-fw"></i>',
                                 // '<ul class="dropdown slot-controls">',
                                 // '<li class="new-object-option"><i class="fa fa-plus-square fa-lg fa-fw"></i> New Object</li>',
                                 // '<li class="remove-object-option"><i class="fa fa-times fa-lg fa-fw"></i> Close</li>',
                                 // '<li class="add-slot-right"><i class="fa fa-caret-square-o-right fa-lg fa-fw"></i> Add Slot Right</li>',
                                 // '<li class="add-slot-left"><i class="fa fa-caret-square-o-left fa-lg fa-fw"></i> Add Slot Left</li>',
                                 // '<li class="add-slot-above"><i class="fa fa-caret-square-o-up fa-lg fa-fw"></i> Add Slot Above</li>',
                                 // '<li class="add-slot-below"><i class="fa fa-caret-square-o-down fa-lg fa-fw"></i> Add Slot Below</li>',
                                 // '</ul>',
                                 // '</a>',
                                 '<h1 class="plus">+</h1>',
                                 '<h1>Add Item</h1>',
                                 '</div>',
                                 '<a class="addItemLink"></a>',
                                 '<a class="remove-slot-option"><i class="fa fa-times fa-lg fa-fw"></i> Close</a>',
                                 '</div>'
    ].join(''))
  };

}(Mirador));

