(function($) {

  $.Workspace = function(options) {

    jQuery.extend(true, this, {
      type:             null,
      workspaceSlotCls: 'slot',
      window:          null,
      appendTo:         null

    }, $.DEFAULT_SETTINGS, options);

    this.element  = this.element || jQuery('<div id="workspace-container">');

    this.init();

  };

  $.Workspace.prototype = {
    init: function () {
      this.element.appendTo(this.appendTo);

      /*this.element.append(this.template({
        workspaceSlotCls: this.workspaceSlotCls
      }));*/

      //jQuery(this.element).layout({ applyDefaultStyles: true });

      this.window = new $.Window({appendTo: this.element});

      this.bindEvents();
    },

    bindEvents: function() {
      var _this = this;

      jQuery.subscribe('manifestToWorkspace', function(_, manifest, uiState) {
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
    },

    hide: function() {
        jQuery(this.element).hide({effect: "fade", duration: 1000, easing: "easeOutCubic"});
    },

    show: function() {
        jQuery(this.element).show({effect: "fade", duration: 1000, easing: "easeInCubic"});
    },

    // template should be based on workspace type
    template: Handlebars.compile([
                                 '<div class="{{workspaceSlotCls}} ui-layout-center">',
                                 '</div>'
    ].join(''))
  };

}(Mirador));

