(function($) {

    $.Viewer = function(options) {

        jQuery.extend(true, this, {
            id:                     options.id,
            hash:                   options.id,
            data:                   null,
            element:                null,
            canvas:                 null,
            currentWorkspace:       null,
            activeWorkspace:        null,
            availableWorkspaces:    null,
            mainMenu:               null,
            //mainMenuLoadWindowCls:  '.mirador-main-menu .load-window',
            workspaceAutoSave:      null,
            windowSize:             {},
            resizeRatio:            {},
            currentWorkspaceVisible: true,
            overlayStates:           {'workspacesPanelVisible': false, 'manifestsPanelVisible': false, 'optionsPanelVisible': false, 'bookmarkPanelVisible': false},
            manifests:               {}
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
            this.activeWorkspace = new $.Workspace({type: this.currentWorkspace, parent: this, appendTo: this.element.find('.mirador-viewer') });

            //add workspaces panel
            this.workspacesPanel = new $.WorkspacesPanel({appendTo: this.element.find('.mirador-viewer'), parent: this});

            // add workset select menu (hidden by default) 
            this.manifestsPanel = new $.ManifestsPanel({ parent: this, appendTo: this.element.find('.mirador-viewer') });
            
            this.bookmarkPanel = new $.BookmarkPanel({ parent: this, appendTo: this.element.find('.mirador-viewer') });
            
            //set this to be displayed
            this.set('currentWorkspaceVisible', true);
            
            this.bindEvents();
        },
        
        bindEvents: function() {
           var _this = this;
           jQuery.subscribe('manifestAdded', function(event, newManifest, repository) {
               if (_this.windowObjects) {
                   jQuery.each(_this.windowObjects, function(index, object) {
                       if (object.loadedManifest === newManifest) {
                           _this.loadManifestFromConfig(object);
                       }
                   });
               }
           });
        },
        
        get: function(prop, parent) {
            if (parent) {
                return this[parent][prop];
            }
            return this[prop];
        },

        set: function(prop, value, options) {
            var _this = this;
            if (options) {
                this[options.parent][prop] = value;
            } else {
                this[prop] = value;
            }
            jQuery.publish(prop + '.set', value);
        },

        switchWorkspace: function(type) {

        },
        
        // Sets state of overlays that layer over the UI state
        toggleOverlay: function(state) {
           var _this = this;
           //first confirm all others are off
           jQuery.each(this.overlayStates, function(oState, value) {
              if (state !== oState) {
                 _this.set(oState, false, {parent: 'overlayStates'});
              }
           });
           var currentState = this.get(state, 'overlayStates');
           this.set(state, !currentState, {parent: 'overlayStates'});
        },
        
        toggleLoadWindow: function(targetSlot) {
            this.toggleOverlay('manifestsPanelVisible');
        },
        
        toggleSwitchWorkspace: function() {
            this.toggleOverlay('workspacesPanelVisible');
        },
        
        toggleBookmarkPanel: function() {
            this.toggleOverlay('bookmarkPanelVisible');
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
                    _this.addManifestFromUrl(url, manifest.location ? manifest.location : '');
                }

            });

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

        addManifestFromUrl: function(url, location) {
            var _this = this,
            dfd = jQuery.Deferred();

            var manifest = new $.Manifest(url, dfd);

            dfd.done(function(loaded) {
                if (loaded && !_this.manifests[url]) {
                    _this.manifests[url] = manifest.jsonLd;
                    _this.manifests[url].miradorRepository = location;
                    jQuery.publish('manifestAdded', [url, location]);
                }
            });
        },
        
        loadManifestFromConfig: function(options) {
           var windowConfig = {
           currentFocus : options.viewType,
           currentImageID : options.canvasID,
           id : options.id,
           focusOptions : options.windowOptions,
           bottomPanelAvailable : options.bottomPanel,
           sidePanelAvailable : options.sidePanel
           };
           this.addManifestToWorkspace(options.loadedManifest, windowConfig);
        },
        
        addManifestToWorkspace: function(manifestURI, windowConfig) {
            var manifest = this.manifests[manifestURI],
            _this = this;
            windowConfig.manifest = manifest;
            jQuery.each(this.overlayStates, function(oState, value) {
                _this.set(oState, false, {parent: 'overlayStates'});
            });
            
            // If the chooseManifest panel was not invoked from a 
            // particular slot, but rather from the selectObject menu,
            // then let the viewer decide where to put the resulting window
            // according to the workspace type.
              // slotID is appended to event name so only 
              // the invoking slot initialises a new window in 
              // itself.
              jQuery.publish('manifestToSlot', windowConfig); 
        },
        
        toggleImageViewInWorkspace: function(imageID, manifestURI) {
           this.addManifestToWorkspace(manifestURI, 
              {currentFocus: 'ImageView', 
              currentImageID: imageID});
        },
        
        toggleThumbnailsViewInWorkspace: function(manifestURI) {
           this.addManifestToWorkspace(manifestURI,
              {currentFocus: 'ThumbnailsView', 
              currentImageID: null});
        }
    };

}(Mirador));

