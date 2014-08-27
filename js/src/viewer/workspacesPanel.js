(function($) {

  $.WorkspacesPanel = function(options) {

    jQuery.extend(true, this, {
      element: null,
      appendTo: null,
      parent: null
    }, options);

    this.init();

  };

  $.WorkspacesPanel.prototype = {
    init: function () {
      var _this = this,
      workspaceTemplate = [];
      
      jQuery.each(this.parent.availableWorkspaces, function(index, value) {
        workspaceTemplate.push({
          dataClass: value,
          label : _this.parent.workspaces[value].label,
          iconClass: _this.parent.workspaces[value].iconClass
        });
      });

      this.element = jQuery(this.template({ workspaces : workspaceTemplate})).appendTo(this.appendTo);
      this.bindEvents();
    },

    bindEvents: function() {
      var _this = this;
      // handle subscribed events
      jQuery.subscribe('workspacesPanelVisible.set', function(_, stateValue) {
        if (stateValue) { _this.show(); return; }
        _this.hide();
      });

      jQuery('#workspace-select-menu').find('.workspace-option').on('click', function() {
        console.log(jQuery(this));
        $.viewer.switchWorkspace(jQuery(this).data('workspaceType'));
      });
    },

    hide: function() {
      jQuery(this.element).hide({effect: "fade", duration: 160, easing: "easeOutCubic"});
    },

    show: function() {
      jQuery(this.element).show({effect: "fade", duration: 160, easing: "easeInCubic"});
    },

    template: Handlebars.compile([
       '<div id="workspace-select-menu">',
         '<h1>Choose Workspace Type</h1>',
         '<ul class="workspaces-listing">',
           '{{#each workspaces}}',
             '<li class="workspace-option" data-workspace-type="{{dataClass}}">',
               '<a href="javascrippt:void(0);" name="{{label}}">',
                 '<i class="fa fa-{{iconClass}} workspace-icon"></i>',
                 '<h2 class="workspace-label">{{label}}</h2>',
               '</a>',
             '</li>',
           '{{/each}}',
         '</ul>',
       '</div>'
    ].join(''))
  };

}(Mirador));

