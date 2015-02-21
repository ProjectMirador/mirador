(function($) {

    $.Viewer = function(options) {

        jQuery.extend(true, this, {
            id:                     options.id,
            hash:                   options.id,
            data:                   null,
            element:                null,
            canvas:                 null,
            workspaceType:          null,
            layout:                 null,
            workspace:              null,
            mainMenu:               null,
            workspaceAutoSave:      null,
            windowSize:             {},
            resizeRatio:            {},
            currentWorkspaceVisible: true,
            overlayStates:          {'workspacesPanelVisible': false, 'manifestsPanelVisible': false, 'optionsPanelVisible': false, 'bookmarkPanelVisible': false},
            manifests:              {}
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
            
            //check all buttons in mainMenu.  If they are all set to false, then don't show mainMenu
            var showMainMenu = false;
            jQuery.each(this.mainMenuSettings.buttons, function(key, value) {
               if (value) { showMainMenu = true; }
            });
            //even if buttons are available, developer can override and set show to false
            if (this.mainMenuSettings.show === false) {
              showMainMenu = false;
            }

            // add main menu
            if (showMainMenu) {
              this.mainMenu = new $.MainMenu({ parent: this, appendTo: this.element });
            }

            // add viewer area
            this.canvas = jQuery('<div/>')
            .addClass('mirador-viewer')
            .appendTo(this.element);
                        
            if (!showMainMenu) {
               this.canvas.css("top", "0px");
            }
            
            // add workspaces panel
            this.workspacePanel = new $.WorkspacePanel({appendTo: this.element.find('.mirador-viewer'), parent: this});

            // add workset select menu (hidden by default) 
            this.manifestsPanel = new $.ManifestsPanel({ parent: this, appendTo: this.element.find('.mirador-viewer') });
            
            this.bookmarkPanel = new $.BookmarkPanel({ parent: this, appendTo: this.element.find('.mirador-viewer') });
            
            // add workspace configuration
            this.layout = typeof this.layout !== 'string' ? JSON.stringify(this.layout) : this.layout;
            this.workspace = new $.Workspace({
              layoutDescription: this.layout.charAt(0) === '{' ? JSON.parse(this.layout) : $.layoutDescriptionFromGridString(this.layout), 
              parent: this, 
              appendTo: this.element.find('.mirador-viewer')
            });
            
            // set this to be displayed
            this.set('currentWorkspaceVisible', true);

            // this.windowObjects.forEach(windowObjects, function(windowConfig) {
            //   this.workspace.addWindow(windowConfig);
            // });
            
            this.bindEvents();
        },
        
        bindEvents: function() {
           var _this = this;
           jQuery.subscribe('manifestAdded', function(event, newManifest, repository) {
               if (_this.windowObjects) {
                   var check = jQuery.grep(_this.windowObjects, function(object, index) {
                      return object.loadedManifest === newManifest;
                   });
                   jQuery.each(check, function(index, value) {
                     _this.loadManifestFromConfig(value);
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

        updateLayout: function(type) {
          _this = this;
          
          //remove all windows from config
          //need to remove windows that are no longer in the layout
          //jQuery.publish("windowsRemoved");
          _this.workspaceType = type;
          _this.workspace.set('layoutDescription', _this.workspaces[_this.workspaceType].layout);
          _this.workspace.calculateLayout();
          $.viewer.toggleSwitchWorkspace();

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
        
        toggleLoadWindow: function() {
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
                var what = _this.data[order];
                if (what.hasOwnProperty('manifestUri')) {
                  var url = what.manifestUri;
                  // populate blank object for immediate, synchronous return
                  manifests[url] = null;
                  _this.addManifestFromUrl(url, what.location ? what.location : '');
                } else if (what.hasOwnProperty('collectionUri')) {
                  jQuery.getJSON(what.collectionUri).done(function (data, status, jqXHR) {
                    if (data.hasOwnProperty('manifests')){
                      jQuery.each(data.manifests, function (ci, mfst) {
                        console.log(mfst['@id']);
                      manifests[url] = null;
                      _this.addManifestFromUrl(mfst['@id'], '');
                    });
                  }
                  }).fail(function(jqXHR, status, error) {
                    console.log(jqXHR, status, error);
                  });
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
          //check if there are available slots, otherwise don't process this object from config
          var slot = this.workspace.availableSlot();
          if (slot) {
            var windowConfig = {
              currentFocus : options.viewType,
              focuses : options.availableViews,
              currentImageID : options.canvasID,
              id : options.id,
              focusOptions : options.windowOptions,
              bottomPanelAvailable : options.bottomPanel,
              sidePanelAvailable : options.sidePanel,
              overlayAvailable : options.overlay,
              slotID : slot ? slot : options.slot,
              displayLayout : options.displayLayout,
              layoutOptions: options.layoutOptions
            };

             this.addManifestToWorkspace(options.loadedManifest, windowConfig);
          }
        },
        
        addManifestToWorkspace: function(manifestURI, windowConfig) {
            var _this = this,
            targetSlotID,
            slot;

            windowConfig.manifest = this.manifests[manifestURI];
            windowConfig.currentImageMode = this.workspace.type === "bookReading" ? 'BookView' : 'ImageView';
            
            jQuery.each(this.overlayStates, function(oState, value) {
                _this.set(oState, false, {parent: 'overlayStates'});
            });
            
            // slotID is appended to event name so only 
            // the invoking slot initialises a new window in 
            // itself.

            // Just assign the slotIDs in order of manifest listing.
            
            if (windowConfig.slotID) {
               targetSlotID = windowConfig.slotID;
            } else {
              targetSlotID = _this.workspace.focusedSlot || _this.workspace.slots.filter(function(slot) { 
                return slot.hasOwnProperty('window') ? true : false;
              })[0].slotID;
            }
            
            //The publish is sending too many events and it's creating a lot of cascading issues
            //Need to call it once, to the exact slot
            //jQuery.publish('manifestToSlot.'+targetSlotID, windowConfig); 
            
            jQuery.each(this.workspace.slots, function(index, workspaceSlot) {
               if (workspaceSlot.slotID === targetSlotID) {
                  slot = workspaceSlot;
                  return false;
               }
            });

            slot.manifestToSlot(windowConfig);
        },
        
        toggleImageViewInWorkspace: function(imageID, manifestURI) {
           this.addManifestToWorkspace(manifestURI, 
              {currentFocus: this.workspace.type === "bookReading" ? 'BookView' : 'ImageView', 
              currentImageID: imageID});
        },
        
        toggleThumbnailsViewInWorkspace: function(manifestURI) {
           this.addManifestToWorkspace(manifestURI,
              {currentFocus: 'ThumbnailsView', 
              currentImageID: null});
        }
    };

}(Mirador));
