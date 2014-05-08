(function($) {

	$.WorkspacesSelect = function(options) {

		jQuery.extend(true, this, {
			element: null,
			appendTo: null,
			parent: null
		}, $.DEFAULT_SETTINGS, options);
          
		this.init();

	};

	$.WorkspacesSelect.prototype = {
		init: function () {
			var workspaceTemplate = [];
			jQuery.each(this.parent.availableWorkspaces, function(key, value) {
				workspaceTemplate.push({label : key});
			});
			this.element = this.template({ workspaces : workspaceTemplate});
			jQuery(this.element).appendTo(this.appendTo);
		},

		template: Handlebars.compile([
			'<div class="workspace-select-menu">',
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

