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
            manifestPanelVisible:   false,
            manifests: {} 
        }, $.DEFAULT_SETTINGS, options);

        // get initial manifests
        this.element = this.element || jQuery('#' + this.id);

        if (this.data) {
            this.init();
        }

    };

    $.Viewer.prototype = {

        init: function() {
            // retrieve manifests
            this.manifests = this.getManifestsData();

            // add main menu
            this.mainMenu = new $.MainMenu({ parent: this, appendTo: this.element });

            // add viewer area
            this.canvas = jQuery('<div/>')
            .addClass('mirador-viewer')
            .appendTo(this.element);

            // add workspace configuration
            this.workspace = new $.Workspace({initialWorkspace: this.initialWorkspace, parent: this });

            // add workspaces select
            // this.workspacesSelect = new $.WorkspacesSelect({appendTo: this.element.find('.mirador-viewer'), parent: this});

            // add workset select menu (hidden by default) 
            this.manifestsPanel = new $.ManifestsPanel({ parent: this, appendTo: this.element.find('.mirador-viewer') });

        },
        
        get: function(prop) {
            return this[prop];
        },

        set: function(prop, value, options) {
            _this = this;
            this[prop] = value;
            console.log(value);
            jQuery.publish(prop + '.set');
        },

        switchWorkspace: function(type) {

        },

        toggleLoadWindow: function() {
            console.log(this);
            if (this.get('manifestPanelVisible') === true) {
                this.set('manifestPanelVisible', false);
                return;

            }
            this.set('manifestPanelVisible', true);
        },
        
        getManifestsData: function() {
            var _this = this,
            manifests = {},
            loadingOrder = [];

            jQuery.each(_this.data, function(index, collection) {
                if (_this.hasWidgets(collection)) {
                    loadingOrder.unshift(index);
                } else {
                    loadingOrder.push(index);
                }
            });

            jQuery.each(loadingOrder, function(index, order) {
                var manifest = _this.data[order];
                var url = manifest.manifestUri;

                if (!jQuery.isEmptyObject(manifest)) {
                    // populate blank object for immediate, synchronous return
                    manifests[url] = null;
                    console.log(manifest);
                    _this.addManifestFromUrl(url);
                }

            });

            console.log(manifests);
            return manifests;
        },
        
        hasWidgets: function(collection) {
            return (
                typeof collection.widgets !== 'undefined' &&
                collection.widgets &&
                !jQuery.isEmptyObject(collection.widgets) &&
                collection.widgets.length > 0
            );
        },

        addManifestFromUrl: function(url) {
            var _this = this,
            dfd = jQuery.Deferred(),
            manifests = _this.get('manifests');

            var manifest = new $.Manifest(url, dfd);

            dfd.done(function(loaded) {
                if (loaded) {
                    manifests[url] = manifest.jsonLd;
                    _this.set('manifests', (function() {
                        console.log(manifests);
                        return manifests;
                    })());
                }
            });
        }

    };

}(Mirador));

