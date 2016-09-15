(function($) {

  $.SaveController = function(config) {

    jQuery.extend(true, this, {
      currentConfig: null,
      originalConfig: null, // Don't know if we really need this.
      shareEndpoint: null, // the place where POST requests for new saved sessions will go
      historySize: null, // wishful thinking for later.
      sessionID: null,
      slots: [],
      eventEmitter: null
    });

    // error check - removes invalid annotation tools
    if (config.availableAnnotationDrawingTools) {
      config.availableAnnotationDrawingTools = jQuery.grep(config.availableAnnotationDrawingTools, function(element, index) {
        return jQuery.inArray(element, $.DEFAULT_SETTINGS.availableAnnotationDrawingTools) >= 0;
      });
    }

    // error check on mainMenuSettings
    if (config.mainMenuSettings && !config.mainMenuSettings.buttons) {
      config.mainMenuSettings.buttons = {};
    }

    // if a user used dot notation for nested settings, unpack
    // e.g. windowSettings.canvasControls.annotations.annotationState
    function index(previousValue,currentValue,currentIndex) {
      var newObj = {};
      newObj[currentValue] = previousValue;
      return newObj;
    }
    jQuery.each(config, function(key, value) {
      if (typeof key === "string" && key.indexOf('.') !== -1) {
        var array = key.split('.').reverse();
        var object = array.reduce(index, value);
        delete config[key];
        jQuery.extend(true, config, object);
      }
    });
    this.init(jQuery.extend(true, {}, $.DEFAULT_SETTINGS, config));
  };

  $.SaveController.prototype = {

    init: function(config) {
      var _this = this;

      this.eventEmitter = config.eventEmitter;

      // Don't want to save session
      if (config.saveSession === false) {
        this.currentConfig = config;
        this.bindEvents();
        return false;
      }

      saveModule = config.jsonStorageEndpoint.module,
      saveOptions = config.jsonStorageEndpoint.options;
      _this.storageModule = new $[saveModule](saveOptions);

      var sessionID = window.location.hash.substring(1); // will return empty string if none exists, causing the or statement below to evaluate to false, generating a new sesssionID.

      if (sessionID) {
        this.sessionID =  sessionID;
      } else {
        this.sessionID = $.genUUID(); // might want a cleaner thing for the url.
      }

      if (localStorage.getItem(this.sessionID)) {
        this.currentConfig = JSON.parse(localStorage.getItem(sessionID));
      } else {
        var paramURL = window.location.search.substring(1);
        if (paramURL) {
          //get json from JSON storage and set currentConfig to it
          var params = paramURL.split('=');
          var jsonblob = params[1];
          this.currentConfig = this.storageModule.readSync(jsonblob) || config;
        } else {
          this.currentConfig = config;
        }
      }
      //remove empty hashes from config
      this.currentConfig.windowObjects = jQuery.map(this.currentConfig.windowObjects, function(value, index) {
        if (Object.keys(value).length === 0) return null;
        return value;
      });

      //add UUIDs to parts of config that need them
      if (this.currentConfig.windowObjects) {
        jQuery.each(this.currentConfig.windowObjects, function(index, window) {
          if (!window.id) {
            window.id = $.genUUID();
          }
        });
      }

      // see: http://html5demos.com/history and http://diveintohtml5.info/history.html
      // put history stuff here, for a great cross-browser demo, see: http://browserstate.github.io/history.js/demo/
      // http://stackoverflow.com/questions/17801614/popstate-passing-popped-state-to-event-handler

      //also remove ?json bit so it's a clean URL
      var cleanURL = window.location.href.replace(window.location.search, "");
      if (window.location.hash) {
       history.replaceState(this.currentConfig, "Mirador Session", cleanURL);
      } else {
       history.replaceState(this.currentConfig, "Mirador Session", cleanURL+"#"+this.sessionID);
      }

      this.bindEvents();

    },

    getWindowObjectById: function(windowId) {
      var returnObject = null;
      jQuery.each(this.currentConfig.windowObjects, function(index, window) {
        if (window.id === windowId) {
          returnObject = window;
          return false;
        }
      });
      return returnObject;
    },

    getWindowAnnotationsList: function(windowId) {
      if (this.windowsAnnotationsLists) {
        return this.windowsAnnotationsLists[windowId];
      } else {
        return null;
      }
    },

    getSlots: function() {
      return this.slots;
    },

    getWindowElement: function(windowId) {
      if (this.windowsElements) {
        return this.windowsElements[windowId];
      } else {
        return null;
      }
    },

    getStateProperty: function(prop) {
      return this.get(prop, 'currentConfig');
    },

    getManifestIndex: function(manifestUri) {
      var manifestIndex = -1;
      jQuery.each(this.currentConfig.data, function(index, dataObj) {
        if (dataObj.manifestUri === manifestUri) {
          manifestIndex = index;
          return false;
        }
      });
      return manifestIndex;
    },

    get: function(prop, parent) {
      if (parent) {
        return this[parent][prop];
      }
      return this[prop];
    },

    set: function(prop, value, options) {
      var _this = this;
      // when a property of the config is updated,
      // save it to localStore.
      if (options) {
        this[options.parent][prop] = value;
      } else {
        this[prop] = value;
      }
      if (this.currentConfig.saveSession) {
        this.save();
      }
      _this.eventEmitter.publish("saveControllerConfigUpdated");
    },

    bindEvents: function() {
      var _this = this;
      // listen to existing events and use the
      // available data to update the appropriate
      // field in the stored config.

      _this.eventEmitter.subscribe('manifestsPanelVisible.set', function(event, manifestPanelVisible) {
        _this.set("manifestPanelVisible", manifestPanelVisible, {parent: "currentConfig"} );
      });

      _this.eventEmitter.subscribe('windowUpdated', function(event, options) {
        var windowObjects = _this.currentConfig.windowObjects;
        if (windowObjects && windowObjects.length > 0) {
          jQuery.each(windowObjects, function(index, window){
            if (window.id === options.id) {
              jQuery.extend(windowObjects[index], options);
            }
          });
        } else {
          windowObjects = [options];
        }
        _this.set("windowObjects", windowObjects, {parent: "currentConfig"} );
      });

      _this.eventEmitter.subscribe("imageBoundsUpdated", function(event, options) {
        var windowObjects = _this.currentConfig.windowObjects;
        if (windowObjects && windowObjects.length > 0) {
          jQuery.each(windowObjects, function(index, window){
            if (window.id === options.id) {
              if (!windowObjects[index].windowOptions) {
                windowObjects[index].windowOptions = {};
              }
              windowObjects[index].windowOptions.osdBounds = options.osdBounds;
            }
          });
        }
        _this.set("windowObjects", windowObjects, {parent: "currentConfig"} );
      });

      _this.eventEmitter.subscribe('ANNOTATIONS_LIST_UPDATED', function(event, options) {
        if (!_this.windowsAnnotationsLists) {
          _this.windowsAnnotationsLists = {};
        }
        _this.windowsAnnotationsLists[options.windowId] = options.annotationsList;
        _this.eventEmitter.publish('annotationListLoaded.' + options.windowId);
      });

      _this.eventEmitter.subscribe('WINDOW_ELEMENT_UPDATED', function(event, options) {
        if (!_this.windowsElements) {
          _this.windowsElements = {};
        }
        _this.windowsElements[options.windowId] = options.element;
      });

      _this.eventEmitter.subscribe('windowSlotAddressUpdated', function(event, options) {
        var windowObjects = _this.currentConfig.windowObjects;
        if (windowObjects && windowObjects.length > 0) {
          jQuery.each(windowObjects, function(index, window){
            if (window.id === options.id) {
              jQuery.extend(windowObjects[index], options);
            }
          });
        } else {
          windowObjects = [options];
        }
        _this.set("windowObjects", windowObjects, {parent: "currentConfig"} );
      });

      _this.eventEmitter.subscribe('manifestQueued', function(event, manifestObject, repository) {
        var data = _this.currentConfig.data,
        objectInConfig = false,
        url = manifestObject.uri;

        jQuery.each(data, function(index, manifestObject){
          if (manifestObject.manifestUri === url) {
            objectInConfig = true;
          }
        });
        if (!objectInConfig) {
          data.push({"manifestUri":url, "location":repository});
          _this.set("data", data, {parent: "currentConfig"});
        }
        var manifests = _this.currentConfig.manifests;
        manifests[url] = manifestObject;
        _this.set('manifests', manifests, {parent: 'currentConfig'});
      });

      _this.eventEmitter.subscribe("slotsUpdated", function(event, options) {
        _this.slots = options.slots;
      });

      _this.eventEmitter.subscribe("layoutChanged", function(event, layoutDescription) {
        // string parents to prevent invalid circular representation.
        var serialisedLayout = JSON.stringify(layoutDescription, function(key, value) {
          if (key === 'parent') return undefined;
          return value;
        });
        _this.set('layout', serialisedLayout, {parent: "currentConfig"} );
      });

      _this.eventEmitter.subscribe("windowSlotAdded", function(event, options) {
        var windowObjects = _this.currentConfig.windowObjects,
        inArray = jQuery.grep(windowObjects, function(windowObj) {
          return windowObj.id === options.id;
        });
        if (inArray.length === 0) {
          windowObjects.push({
            'id' : options.id,
            'slotAddress': options.slotAddress
          });
          _this.set("windowObjects", windowObjects, {parent: "currentConfig"} );
        }
      });

        _this.eventEmitter.subscribe("windowsRemoved", function(event) {
          _this.set("windowObjects", [], {parent: "currentConfig"} );
        });

      _this.eventEmitter.subscribe("windowRemoved", function(event, windowID) {
        var windowObjects = jQuery.grep(_this.currentConfig.windowObjects, function(window, index) {
          return window.id !== windowID;
        });
        _this.set("windowObjects", windowObjects, {parent: "currentConfig"} );
      });


      _this.eventEmitter.subscribe('DELETE_FROM_CONFIG', function(event, options) {
        var windowObjects = jQuery.grep(_this.currentConfig.windowObjects, function(window, index) {
          return window.loadedManifest !== options.loadedManifest || window.id;
        });
        _this.set("windowObjects", windowObjects, {parent: "currentConfig"} );
      });

      _this.eventEmitter.subscribe('etc...', function(junk) {
        // handle adding the property in the appropriate place
        // in this.currentConfig by passing to the _this.set(),
        // which "saves" to localstore as a side effect.

      });

      // We could have simply listened to the 'set' event that
      // would have been emitted by objects when their models were
      // updated and sent the results to a parser function that
      // would extract the calling object's properties in the config
      // and updated them if they were different, but we can't
      // currently do that the way the app is written, since we
      // didn't actually follow that patttern almost anywhere.
      //
      // _this.eventEmitter.subscribe('set', function(junk) {
      //  // 1.) send the junk to a parser function
      //  // 2.) use this.set(parsedJunk) to update
      //  // this.currentConfig, with the side effect of
      //  // saving to localStorage.
      //
      // });

      // you may need to bind another event here that responds to the
      // user navigating history, for the purpose of popping the
      // history entry back off.

    },

    save: function() {
      var _this = this;

      // the hash must be stringified because
      // localStorage is a key:value store that
      // only accepts strings.

      localStorage.setItem(_this.sessionID, JSON.stringify(_this.currentConfig));
    }

  };

}(Mirador));
