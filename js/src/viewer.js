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
      overlayStates:          {
        'workspacePanelVisible': false,
        'manifestsPanelVisible': false,
        'optionsPanelVisible': false,
        'bookmarkPanelVisible': false
      },
      manifests:             [] 
    }, $.DEFAULT_SETTINGS, options);

    // get initial manifests
    this.element = this.element || jQuery('#' + this.id);

    if (this.data) {
      this.init();
    }
  };

  $.Viewer.prototype = {

    init: function() {
      var _this = this;
      // retrieve manifests
      this.getManifestsData();

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

      // add workspace configuration
      this.layout = typeof this.layout !== 'string' ? JSON.stringify(this.layout) : this.layout;
      this.workspace = new $.Workspace({
        layoutDescription: this.layout.charAt(0) === '{' ? JSON.parse(this.layout) : $.layoutDescriptionFromGridString(this.layout), 
        parent: this, 
        appendTo: this.element.find('.mirador-viewer')
      });
      
      this.workspacePanel = new $.WorkspacePanel({
        appendTo: this.element.find('.mirador-viewer'),
        parent: this,
        maxRows: this.workspacePanelSettings.maxRows,
        maxColumns: this.workspacePanelSettings.maxColumns,
        preserveWindows: this.workspacePanelSettings.preserveWindows,
        workspace: this.workspace
      });
      
      this.manifestsPanel = new $.ManifestsPanel({ parent: this, appendTo: this.element.find('.mirador-viewer') });

      this.bookmarkPanel = new $.BookmarkPanel({ parent: this, appendTo: this.element.find('.mirador-viewer') });


      // set this to be displayed
      this.set('currentWorkspaceVisible', true);

      this.bindEvents();
    },

    bindEvents: function() {
      var _this = this;
      // check that windows are loading first to set state of slot?
      jQuery.subscribe('manifestReceived', function(event, newManifest) {
        if (_this.windowObjects) {
          var check = jQuery.grep(_this.windowObjects, function(object, index) {
            return object.loadedManifest === newManifest.uri;
          });
          jQuery.each(check, function(index, config) {
            _this.loadManifestFromConfig(config);
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

    // Sets state of overlays that layer over the UI state
    toggleOverlay: function(state) {
      var _this = this;
      // first confirm all others are off
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

    toggleWorkspacePanel: function() {
      this.toggleOverlay('workspacePanelVisible');
    },

    toggleBookmarkPanel: function() {
      this.toggleOverlay('bookmarkPanelVisible');
    },

    getManifestsData: function() {
      var _this = this;

      _this.data.forEach(function(manifest) {
        if (manifest.hasOwnProperty('manifestUri')) {
          var url = manifest.manifestUri;
          _this.addManifestFromUrl(url, manifest.location ? manifest.location : '');
        } else if (manifest.hasOwnProperty('collectionUri')) {
          jQuery.getJSON(manifest.collectionUri).done(function (data, status, jqXHR) {
            if (data.hasOwnProperty('manifests')){
              jQuery.each(data.manifests, function (ci, mfst) {
                _this.addManifestFromUrl(mfst['@id'], '');
              });
            }
          }).fail(function(jqXHR, status, error) {
            console.log(jqXHR, status, error);
          });
        }
      });
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
      manifest;

      if (!_this.manifests[url]) {
        manifest = new $.Manifest(url, location);
        _this.manifests[url] = manifest;
        _this.manifests.push(manifest);
        jQuery.publish('manifestQueued', manifest);
        manifest.request.done(function() {
          jQuery.publish('manifestReceived', manifest);
        });
      }
    },

    loadManifestFromConfig: function(options) {
      // check if there are available slots, otherwise don't process this object from config
      var slotAddress = options.slotAddress ? options.slotAddress : this.workspace.getAvailableSlot().layoutAddress;
      var windowConfig = {
        manifest: this.manifests[options.loadedManifest],
        currentFocus : options.viewType,
        focuses : options.availableViews,
        currentCanvasID : options.canvasID,
        id : options.id,
        focusOptions : options.windowOptions,
        bottomPanelAvailable : options.bottomPanel,
        sidePanelAvailable : options.sidePanel,
        overlayAvailable : options.overlay,
        annotationLayerAvailable : options.annotationLayer,
        slotAddress: slotAddress,
        displayLayout : options.displayLayout,
        layoutOptions: options.layoutOptions
      };

      this.workspace.addWindow(windowConfig);
    }
  };

}(Mirador));
