(function($) {

  $.Workspace = function(options) {

    jQuery.extend(true, this, {
      type:             null,
      workspaceSlotCls: 'slot',
      focusedSlot:      null,
      window:           null,
      appendTo:         null

    }, $.DEFAULT_SETTINGS, options);

    this.element  = this.element || jQuery('<div class="workspace-container">');

    this.init();

  };

  $.Workspace.prototype = {
    init: function () {
      this.element.appendTo(this.appendTo);

      this.element.append(this.template({
        workspaceSlotCls: this.workspaceSlotCls,
        slotId: 0
      }));

      // Not final. A unique identifier should be added here for multiple slots.
      if (this.focusedSlot === null) {
        this.focusedSlot = 0;
      }

      this.bindEvents();
    },

    bindEvents: function() {
      var _this = this;

      jQuery.subscribe('manifestToWorkspace', function(_, manifest, uiState) {
        this.window = new $.Window({appendTo: this.element});
        //need to be able to set a specific window
        jQuery.publish('manifestToWindow', [manifest, uiState]);
      });

      jQuery.subscribe('toggleToImage', function(_, imageID) {
        //need to be able to set a specific window
        jQuery.publish('toggleImageView', imageID);
      });

      jQuery.subscribe('currentWorkspaceVisible.set', function(_, stateValue) {
        if (stateValue) { _this.show(); return; }
        _this.hide();
      });

      this.element.find('a').on('click', function(){console.log('added');});
    },

    hide: function() {
        jQuery(this.element).hide({effect: "fade", duration: 1000, easing: "easeOutCubic"});
    },

    show: function() {
        jQuery(this.element).show({effect: "fade", duration: 1000, easing: "easeInCubic"});
    },

    // template should be based on workspace type
    template: Handlebars.compile([
                                 '<div id="{{slotId}}" class="{{workspaceSlotCls}}">',
                                   '<div class="slotIconContainer">',
                                     '<h1 class="plus">+</h1>',
                                     '<i class="fa fa-camera-retro fa-5x"></i><h1>Add Item to Workspace</h1>',
                                   '</div>',
                                   '<a class="addItemLink"></a>',
                                 '</div>'
    ].join(''))
  };

}(Mirador));

