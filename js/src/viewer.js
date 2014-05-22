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
            availableWorkspaces:    $.DEFAULT_SETTINGS.availableWorkspaces,
            mainMenu:               null,
            //mainMenuLoadWindowCls:  '.mirador-main-menu .load-window',
            workspaceAutoSave:      $.DEFAULT_SETTINGS.workspaceAutoSave,
            windowSize:             {},
            resizeRatio:            {},
            uiState:                {'manifestsPanelVisible': false, 'workspacesPanelVisible': false, 'currentWorkspaceVisible': false, 'optionsPanelVisible': false},
            overlayState:           {},
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
            this.activeWorkspace = new $.Workspace({type: this.initialWorkspace, parent: this });

            //add workspaces panel
            this.workspacesPanel = new $.WorkspacesPanel({appendTo: this.element.find('.mirador-viewer'), parent: this});

            // add workset select menu (hidden by default) 
            this.manifestsPanel = new $.ManifestsPanel({ parent: this, appendTo: this.element.find('.mirador-viewer') });

        },
        
        get: function(prop, parent) {
            if (parent) {
                return this[parent][prop];
            }
            return this[prop];
        },

        set: function(prop, value, options) {
            _this = this;
            if (options) {
                this[options.parent][prop] = value;
            } else {
                this[prop] = value;
            }
            jQuery.publish(prop + '.set', value);
        },

        switchWorkspace: function(type) {

        },
        
        // Sets the state of the viewer so that only one div can be visible/active and all others are hidden
        toggleUI: function(state) {
            _this = this;
            if (this.get(state, 'uiState') === true) {
                this.set(state, false, {parent: 'uiState'});
                return;
            }
            jQuery.each(this.uiState, function(key, value) {
                if (key != state) {
                    _this.set(key, false, {parent: 'uiState'});
                }
            });
            this.set(state, true, {parent: 'uiState'});
        },
        
        // Sets state of overlays that layer over one of the UI states
        toggleOverlay: function() {
        
        },
        
        toggleLoadWindow: function() {
            this.toggleUI('manifestsPanelVisible');
        },
        
        toggleSwitchWorkspace: function() {
            this.toggleUI('workspacesPanelVisible');
        },
        
        toggleCurrentWorkspace: function() {
            this.toggleUI('currentWorkspaceVisible');
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
        },
        
        addManifestToWorkspace: function(manifestURI) {
            var manifest = this.manifests[manifestURI];
            
            jQuery.publish('manifestToWorkspace', manifest);
            this.toggleCurrentWorkspace();
        }

    };

}(Mirador));

