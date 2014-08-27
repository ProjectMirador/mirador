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
      var workspaceTemplate = [];
      jQuery.each(this.parent.availableWorkspaces, function(key, value) {
        workspaceTemplate.push({
          label : $.DEFAULT_SETTINGS.workspaces[value].label,
          iconClass: $.DEFAULT_SETTINGS.workspaces[value].iconClass
        });
        console.log($.DEFAULT_SETTINGS.workspaces[value].iconClass);
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
             '<li class="workspace-option {{label}}">',
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

