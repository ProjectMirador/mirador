(function($) {

  $.SaveController = function(config) {

    jQuery.extend(true, this, {
      currentConfig: null,
      originalConfig: null, // Don't know if we really need this.
      shareEndpoint: null, // the place where POST requests for new saved sessions will go 
      historySize: null, // wishful thinking for later.
      sessionID: null
    });

    this.init(jQuery.extend(false, $.DEFAULT_SETTINGS, config));

  };

  $.SaveController.prototype = {

    init: function(config) {
      var _this = this;
      
      // Don't want to save session, therefore don't set up save controller
      if (config.saveSession === false) {
        this.currentConfig = config;
        return false;
      }
      
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
          var params = paramURL.split('=');
          var jsonblob = params[1];
          var ajaxURL = "https://jsonblob.com/api/jsonBlob/"+jsonblob;
          jQuery.ajax({
            type: 'GET',
            url: ajaxURL, 
            headers: { 
              'Accept': 'application/json',
              'Content-Type': 'application/json' 
            },
            success: function(data, textStatus, request) {
              _this.currentConfig = data;
            },
            async: false
          });
          //get json from jsonblob and set currentConfig to it
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
      //http://stackoverflow.com/questions/17801614/popstate-passing-popped-state-to-event-handler

      //also remove ?json bit so it's a clean URL
      var cleanURL = window.location.href.replace(window.location.search, "");
      if (window.location.hash) {
        history.replaceState(this.currentConfig, "Mirador Session", cleanURL);
      } else {
        history.replaceState(this.currentConfig, "Mirador Session", cleanURL+"#"+this.sessionID);
      }

      this.bindEvents();

    },

    set: function(prop, value, options) {
      // when a property of the config is updated,
      // save it to localStore.
      if (options) {
        this[options.parent][prop] = value;
      } else {
        this[prop] = value;
      }
      this.save();
      jQuery.publish("saveControllerConfigUpdated");
    },

    bindEvents: function() {
      var _this = this;
      // listen to existing events and use the 
      // available data to update the appropriate 
      // field in the stored config.

      jQuery.subscribe('windowUpdated', function(event, options) {
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
      
      jQuery.subscribe("imageBoundsUpdated", function(event, options) {
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

      jQuery.subscribe('manifestQueued', function(event, manifestObject, repository) {
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
      });

      jQuery.subscribe("layoutChanged", function(event, layoutDescription) {
        // string parents to prevent invalid circular representation.
        var serialisedLayout = JSON.stringify(layoutDescription, function(key, value) {
          if (key === 'parent') return undefined;
          return value;
        });
        _this.set('layout', serialisedLayout, {parent: "currentConfig"} );
      });

      jQuery.subscribe("windowAdded", function(event, options) {
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

        jQuery.subscribe("windowsRemoved", function(event) {
          _this.set("windowObjects", [], {parent: "currentConfig"} );
        });

      jQuery.subscribe("windowRemoved", function(event, windowID) {
        var windowObjects = jQuery.grep(_this.currentConfig.windowObjects, function(window, index) {
          return window.id !== windowID;
        });
        _this.set("windowObjects", windowObjects, {parent: "currentConfig"} );
      });

      jQuery.subscribe('etc...', function(junk) {
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
      // jQuery.subscribe('set', function(junk) {
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
