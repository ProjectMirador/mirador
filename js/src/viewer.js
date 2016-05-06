(function($) {

  $.Viewer = function(options) {
    jQuery.extend(true, this, {
      id:                     null,
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
      state:                  null,
      overlayStates:          {
        'workspacePanelVisible': false,
        'manifestsPanelVisible': false,
        'optionsPanelVisible': false,
        'bookmarkPanelVisible': false
      },
      manifests:             []
    }, options);

    this.id = this.state.getStateProperty('id');
    this.data = this.state.getStateProperty('data');
    // get initial manifests
    this.element = this.element || jQuery('#' + this.id);
    if (options.availableAnnotationDrawingTools && options.availableAnnotationDrawingTools.length > 0) {
      this.availableAnnotationDrawingTools = options.availableAnnotationDrawingTools;
    }

    if (this.data) {
      this.init();
    }
  };

  $.Viewer.prototype = {

    init: function() {
      var _this = this;
      //add background and positioning information on the root element that is provided in config
      var backgroundImage = _this.state.getStateProperty('buildPath') + _this.state.getStateProperty('imagesPath') + 'debut_dark.png';
      this.element.css('background-color', '#333').css('background-image','url('+backgroundImage+')').css('background-position','left top')
      .css('background-repeat','repeat').css('position','fixed');

      //initialize i18next
      i18n.init({debug: false, getAsync: false, resGetPath: _this.state.getStateProperty('buildPath') + _this.state.getStateProperty('i18nPath')+'__lng__/__ns__.json'});

      //register Handlebars helper
      Handlebars.registerHelper('t', function(i18n_key) {
        var result = i18n.t(i18n_key);
        return new Handlebars.SafeString(result);
      });

      //check all buttons in mainMenu.  If they are all set to false, then don't show mainMenu
      var showMainMenu = false;
      jQuery.each(this.state.getStateProperty('mainMenuSettings').buttons, function(key, value) {
        if (value) { showMainMenu = true; }
      });
      // but, mainMenu should be displayed if we have userButtons and/or userLogo defined
      if (this.state.getStateProperty('mainMenuSettings').userButtons && this.state.getStateProperty('mainMenuSettings').userButtons.length > 0) {
        showMainMenu = true;
      }
      if (this.state.getStateProperty('mainMenuSettings').userLogo && !jQuery.isEmptyObject(this.state.getStateProperty('mainMenuSettings').userLogo)) {
        showMainMenu = true;
      }

      //even if all these buttons are available, developer can override and set show to false,
      //in which case, don't show mainMenu at all
      if (this.state.getStateProperty('mainMenuSettings').show === false) {
        showMainMenu = false;
      }

      // add main menu
      if (showMainMenu) {
        this.mainMenu = new $.MainMenu({ appendTo: this.element, state: this.state });
      }

      // add viewer area
      this.canvas = jQuery('<div/>')
      .addClass('mirador-viewer')
      .appendTo(this.element);

      if (!showMainMenu) {
        this.canvas.css("top", "0px");
      }

      // add workspace configuration
      this.layout = typeof this.state.getStateProperty('layout') !== 'string' ? JSON.stringify(this.state.getStateProperty('layout')) : this.state.getStateProperty('layout');
      this.workspace = new $.Workspace({
        layoutDescription: this.layout.charAt(0) === '{' ? JSON.parse(this.layout) : $.layoutDescriptionFromGridString(this.layout),
        appendTo: this.element.find('.mirador-viewer'),
        state: this.state
      });

      this.workspacePanel = new $.WorkspacePanel({
        appendTo: this.element.find('.mirador-viewer'),
        state: this.state
      });

      this.manifestsPanel = new $.ManifestsPanel({ appendTo: this.element.find('.mirador-viewer'), state: this.state });
      //only instatiate bookmarkPanel if we need it
      if (showMainMenu && this.state.getStateProperty('mainMenuSettings').buttons.bookmark) {
        this.bookmarkPanel = new $.BookmarkPanel({ appendTo: this.element.find('.mirador-viewer'), state: this.state });
      }

      // set this to be displayed
      this.set('currentWorkspaceVisible', true);

      this.bindEvents();
      this.listenForActions();
      // retrieve manifests
      this.getManifestsData();

      if (this.state.getStateProperty('windowObjects').length === 0 && this.state.getStateProperty('openManifestsPage')) {
        this.workspace.slots[0].addItem();
      }
    },

    listenForActions: function() {
      var _this = this;

      // check that windows are loading first to set state of slot?
      jQuery.subscribe('manifestReceived', function(event, newManifest) {
        if (_this.state.getStateProperty('windowObjects')) {
          var check = jQuery.grep(_this.state.getStateProperty('windowObjects'), function(object, index) {
            return object.loadedManifest === newManifest.uri;
          });
          jQuery.each(check, function(index, config) {
            _this.loadManifestFromConfig(config);
          });
        }
      });

      jQuery.subscribe('TOGGLE_WORKSPACE_PANEL', function(event) {
        _this.toggleWorkspacePanel();
      });

      jQuery.subscribe('TOGGLE_BOOKMARK_PANEL', function(event) {
        _this.toggleBookmarkPanel();
      });

      jQuery.subscribe('TOGGLE_FULLSCREEN', function(event) {
        if ($.fullscreenElement()) {
          $.exitFullscreen();
          //enable any window-specific fullscreen buttons
          jQuery.publish('ENABLE_WINDOW_FULLSCREEN');
        } else {
          $.enterFullscreen(_this.element[0]);
          //disable any window-specific fullscreen buttons
          jQuery.publish('DISABLE_WINDOW_FULLSCREEN');
        }
      });
      
      jQuery(document).on("webkitfullscreenchange mozfullscreenchange fullscreenchange", function() {
        jQuery.publish('MAINMENU_FULLSCREEN_BUTTON');
        // in case the user clicked ESC instead of clicking on the toggle fullscreen button, reenable the window fullscreen button
        if (!$.fullscreenElement()) {
          jQuery.publish('ENABLE_WINDOW_FULLSCREEN');
        }
      });

      jQuery.subscribe('TOGGLE_LOAD_WINDOW', function(event) {
        _this.toggleLoadWindow();
      });

      jQuery.subscribe('ADD_MANIFEST_FROM_URL', function(event, url, location) {
        _this.addManifestFromUrl(url, location);
      });

      jQuery.subscribe('TOGGLE_OVERLAYS_FALSE', function(event) {
        jQuery.each(_this.overlayStates, function(oState, value) {
          // toggles the other top-level panels closed and focuses the
          // workspace. For instance, after selecting an object from the
          // manifestPanel.
          _this.set(oState, false, {parent: 'overlayStates'});
        });
      });

    },

    bindEvents: function() {
      var _this = this;
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
        if (manifest.hasOwnProperty('manifestContent')) {
          var content = manifest.manifestContent;
          _this.addManifestFromUrl(content['@id'], manifest.location ? manifest.location : '', content);
        } else if (manifest.hasOwnProperty('manifestUri')) {
          var url = manifest.manifestUri;
          _this.addManifestFromUrl(url, manifest.location ? manifest.location : '', null);
        } else if (manifest.hasOwnProperty('collectionUri')) {
          jQuery.getJSON(manifest.collectionUri).done(function (data, status, jqXHR) {
            if (data.hasOwnProperty('manifests')){
              jQuery.each(data.manifests, function (ci, mfst) {
                _this.addManifestFromUrl(mfst['@id'], '', null);
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

    addManifestFromUrl: function(url, location, content) {
      var _this = this,
        manifest;

      if (!_this.state.getStateProperty('manifests')[url]) {
        manifest = new $.Manifest(url, location, content);
        jQuery.publish('manifestQueued', manifest, location);
        manifest.request.done(function() {
          jQuery.publish('manifestReceived', manifest);
        });
      }
    },

    loadManifestFromConfig: function(options) {
      // check if there are available slots, otherwise don't process this object from config
      //if we have more windowObjects that slots in the layout, return
      var slotAddress = options.slotAddress ? options.slotAddress : this.workspace.getAvailableSlot() ? this.workspace.getAvailableSlot().layoutAddress : null;
      if (!slotAddress) {
        return;
      }

      var windowConfig = {
        manifest: this.state.getStateProperty('manifests')[options.loadedManifest],
        currentFocus : options.viewType,
        focusesOriginal : options.availableViews,
        currentCanvasID : options.canvasID,
        id : options.id,
        focusOptions : options.windowOptions,
        bottomPanelAvailable : options.bottomPanel,
        bottomPanelVisible : options.bottomPanelVisible,
        sidePanelAvailable : options.sidePanel,
        sidePanelOptions : options.sidePanelOptions,
        sidePanelVisible : options.sidePanelVisible,
        overlayAvailable : options.overlay,
        annotationLayerAvailable : options.annotationLayer,
        annotationCreationAvailable : options.annotationCreation,
        annotationState : options.annotationState,
        fullScreenAvailable : options.fullScreen,
        slotAddress: slotAddress,
        displayLayout : options.displayLayout,
        layoutOptions: options.layoutOptions
      };

      jQuery.publish('ADD_WINDOW', windowConfig);
    }
  };

}(Mirador));
