(function($) {

  $.WorkspacePanel = function(options) {

    jQuery.extend(true, this, {
      element: null,
      appendTo: null,
      workspace: null,
      maxX: null,
      maxY: null
    }, options);

    this.init();

  };

  $.WorkspacePanel.prototype = {
    init: function () {
      var _this = this,
      workspaceTemplate = [];
      
      this.element = jQuery(this.template({ workspaces : workspaceTemplate})).appendTo(this.appendTo);
      this.bindEvents();
    },

    bindEvents: function() {
      var _this = this;
      // handle subscribed events
      jQuery.subscribe('layoutPanelVisible.set', function(_, stateValue) {
        if (stateValue) { _this.show(); return; }
        _this.hide();
      });
      
      jQuery('#workspace-select-menu').find('.workspace-option').on('click', function() {
        $.viewer.updateLayout(jQuery(this).data('workspaceType'));
      });
    },

    onSelect: function(gridString) {
      var layoutDescription = $.layoutDescriptionFromGridString(gridString);
      this.workspace.resetLayout(layoutDescription);
    },

    hide: function() {
      jQuery(this.element).hide({effect: "fade", duration: 160, easing: "easeOutCubic"});
    },

    show: function() {
      jQuery(this.element).show({effect: "fade", duration: 160, easing: "easeInCubic"});
    },

    template: Handlebars.compile([
       '<div id="workspace-select-menu">',
         '<h1>Change Layout</h1>',
         '<div class="select-grid">',
       '</div>',
         '<div class="preview-container">',
       '</div>',
       '</div>'
    ].join(''))
  };

}(Mirador));

