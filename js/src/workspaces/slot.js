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
      var _this = this,
          dropTarget = this.element.find('.dropMask');

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
      this.element.on('dragover', function(e) {
        e.preventDefault();
        dropTarget.show();
      });
      dropTarget.on('dragenter', function(e) {
        e.preventDefault();
        _this.element.addClass('draggedOver');
      });
      dropTarget.on('dragleave', function(e) {
        e.preventDefault();
        _this.element.removeClass('draggedOver');
        dropTarget.hide();
      });
      this.element.on('drop', _this.dropItem);

      jQuery.subscribe('layoutChanged', function(event, layoutRoot) {
        if (_this.parent.slots.length <= 1) {
          _this.element.find('.remove-slot-option').hide();
        } else {
          _this.element.find('.remove-slot-option').show();
        }

        // Must reset the slotAddress of the window.
        if (_this.window) {
          _this.window.slotAddress = _this.layoutAddress;
          jQuery.publish('windowSlotAddressUpdated', {
            id: _this.window.id,
            slotAddress: _this.window.slotAddress
          });
        }
      });
    },

    dropItem: function(e) {
      var _this = this;

      e.preventDefault();
      e.originalEvent.dataTransfer.items[0].getAsString(function(url){
        var manifestUrl = $.getQueryParams(url).manifest;

        $.viewer.addManifestFromUrl(manifestUrl, "(Added from URL)");

        jQuery.subscribe('manifestReceived', function(event, manifest) {
          console.log('event sent');
          var windowConfig;
          if (manifest.jsonLd['@id'] === manifestUrl) {
            windowConfig = {
              manifest: manifest,
              slotAddress: _this.layoutAddress
            };
            console.log(windowConfig);
            $.viewer.workspace.addWindow(windowConfig);
          }
        });
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
                                 // '<li class="new-object-option"><i class="fa fa-plus-square fa-lg fa-fw"></i> {{t "newObject"}}</li>',
                                 // '<li class="remove-object-option"><i class="fa fa-times fa-lg fa-fw"></i> {{t "close"}}</li>',
                                 // '<li class="add-slot-right"><i class="fa fa-caret-square-o-right fa-lg fa-fw"></i> {{t "addSlotRight"}}</li>',
                                 // '<li class="add-slot-left"><i class="fa fa-caret-square-o-left fa-lg fa-fw"></i> {{t "addSlotLeft}}</li>',
                                 // '<li class="add-slot-above"><i class="fa fa-caret-square-o-up fa-lg fa-fw"></i> {{t "addSlotAbove"}}</li>',
                                 // '<li class="add-slot-below"><i class="fa fa-caret-square-o-down fa-lg fa-fw"></i> {{t "addSlotBelow"}}</li>',
                                 // '</ul>',
                                 // '</a>',
                                '<h1 class="plus">',
                                    '<span>+</span>',
                                '<div class="dropIcon">',
                                    '<i class="fa fa-level-down"></i>',
                                '</div>',
                                '</h1>',
                                 '<h1 class="addItemText">{{t "addItem"}}</h1>',
                                 '<h1 class="dropMeMessage">Drop to Load Manifest</h1>',
                                 '</div>',
                                 '<a class="addItemLink"></a>',
                                 '<a class="remove-slot-option"><i class="fa fa-times fa-lg fa-fw"></i> {{t "close"}}</a>',
      '<a class="dropMask"></a>',
                                 '</div>'
    ].join(''))
  };

}(Mirador));

