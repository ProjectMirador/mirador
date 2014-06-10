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
            var _this = this;
            
            _this.element.removeClass('visuallyactive');  
            _this.element.one('transitionend', function(e) {
                _this.element.removeClass('active');
            });
        },

        show: function() {
            var _this = this;

            _this.element.addClass('active');
            setTimeout(function() {  
                _this.element.addClass('visuallyactive active');  
            }, 20);
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

