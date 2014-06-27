(function($) {

	$.WorkspacesPanel = function(options) {

		jQuery.extend(true, this, {
			element: null,
			appendTo: null,
			parent: null
		}, $.DEFAULT_SETTINGS, options);
          
		this.init();

	};

	$.WorkspacesPanel.prototype = {
		init: function () {
			var workspaceTemplate = [];
			jQuery.each(this.parent.availableWorkspaces, function(key, value) {
				workspaceTemplate.push({label : key});
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
				'<h3>Choose Workspace Type</h3>',
				'<ul class="workspaces-listing">',
					'{{#each workspaces}}',
						'<li>',
							'<div class="workspace-label">{{label}}</div>',
						'</li>',
					'{{/each}}',
				'</ul>',
			'</div>'
		].join(''))
	};

}(Mirador));

