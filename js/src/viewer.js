(function($) {

    $.Viewer = function(options) {

        jQuery.extend(true, this, {
            id:                     options.id,
            hash:                   options.id,
            data:                   null,
            element:                null,
            canvas:                 null,
            initialWorkspace:       $.DEFAULT_SETTINGS.initialWorkspace,
            activeWorkspace:        null,
            availableWorkspaces: $.DEFAULT_SETTINGS.availableWorkspaces,
            mainMenu:               null,
            mainMenuLoadWindowCls:  '.mirador-main-menu .load-window',
            workspaceAutoSave:      $.DEFAULT_SETTINGS.workspaceAutoSave,
            windowSize:             {},
            resizeRatio:            {},
            mainMenuPanels:			{'manifestPanelVisible': false, 'workspacesPanelVisible': false},
            manifests: {} 
        }, $.DEFAULT_SETTINGS, options);

        // get initial manifests
        this.manifests = new $.ManifestsLoader(options);
        this.element = this.element || jQuery('#' + this.id);

        if (this.data) {
            this.init();
        }

    };

    $.Viewer.prototype = {

        init: function() {

            // add main menu
            this.mainMenu = new $.MainMenu({ parent: this, appendTo: this.element });

            // add viewer area
            this.canvas = jQuery('<div/>')
            .addClass('mirador-viewer')
            .appendTo(this.element);

            // add workspace configuration
            this.workspace = new $.Workspace({initialWorkspace: this.initialWorkspace, parent: this });

            //add workspaces panel
            this.workspacesPanel = new $.WorkspacesPanel({appendTo: this.element.find('.mirador-viewer'), parent: this});

            // add workset select menu (hidden by default) 
            this.manifestsPanel = new $.ManifestsPanel({ parent: this, appendTo: this.element.find('.mirador-viewer') });

        },
        
        get: function(prop) {
			return this.mainMenuPanels[prop];
            //return this[prop];
        },

        set: function(prop, value, options) {
            _this = this;
            this.mainMenuPanels[prop] = value;
            console.log(value);
            jQuery.publish(prop + '.set');
        },

        switchWorkspace: function(type) {

        },

        toggleLoadWindow: function() {
            console.log(this);
            _this = this;
            if (this.get('manifestPanelVisible') === true) {
                this.set('manifestPanelVisible', false);
                return;

            }
            jQuery.each(this.mainMenuPanels, function(key, value) {
				if (key != 'manifestPanelVisible') {
					_this.set(key, false);
				}
			});
            this.set('manifestPanelVisible', true);
        },
        
        toggleSwitchWorkspace: function() {
            _this = this;
            if (this.get('workspacesPanelVisible') === true) {
                this.set('workspacesPanelVisible', false);
                return;

            }
			jQuery.each(this.mainMenuPanels, function(key, value) {
				if (key != 'workspacesPanelVisible') {
					_this.set(key, false);
				}
			});
            this.set('workspacesPanelVisible', true);
        },

        addManifestFromUrl: function(url) {
            var _this = this,
            dfd = jQuery.Deferred(),
            oldManifests = _this.get('manifests');

            var manifest = new $.Manifest(url, dfd);

            dfd.done(function(loaded) {
                if (loaded) {
                    oldManifests[url] = manifest.jsonLd;
                    _this.set('manifests', (function() {
                        console.log(oldManifests);
                        return oldManifests;
                    })());
                }
            });
        }

    };

}(Mirador));

