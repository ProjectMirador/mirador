(function($) {

  $.SaveController = function(config) {

    jQuery.extend(true, this, {
      currentConfig: null,
      originalConfig: null, // Don't know if we really need this.
      shareEndpoint: null, // the place where POST requests for new saved sessions will go 
      historySize: null, // wishful thinking for later.
      sessionID: null
    }, $.DEFAULT_SETTINGS.saveController, config.saveController);

    this.init(config);

  };

  $.SaveController.prototype = {

    init: function(config) {
      var sessionID = window.location.hash; // will return empty string if none exists, causing the or statement below to evaluate to false, generating a new sesssionID.
      
      if ( sessionID ) {
        this.currentConfig = JSON.parse(localStore.getItem(sessionID));
        this.sessionID =  sessionID;
      } else {
        this.currentConfig = config;

        // generate a new sessionID and push an 
        // entry onto the history stack.
        // see: http://html5demos.com/history and http://diveintohtml5.info/history.html
        this.sessionID = $.genUUID(); // might want a cleaner thing for the url.
        // put history stuff here, for a great cross-browser demo, see: http://browserstate.github.io/history.js/demo/
      }

      this.bindEvents();
      
    },

    set: function(prop, value, options) {
      // when a property of the config is updated,
      // save it to localStore.
      _this.save();
    },

    bindEvents: function() {
      // listen to existing events and use the 
      // available data to update the appropriate 
      // field in the stored config.
      jQuery.subscribe('currentImageIDUpdated', function(junk) {
        // handle adding the property in the appropriate place 
        // in this.currentConfig by passing to the _this.set(), 
        // which "saves" to localstore as a side effect.
      });
      
      jQuery.subscribe('addManifestFromUrl', function(junk) {
        // handle adding the property in the appropriate place 
        // in this.currentConfig by passing to the _this.set(), 
        // which "saves" to localstore as a side effect.

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
      //  // this.currentConfig, with the sideEffect of
      //  // saving to localStorage. 
      //
      // });

      // you may need to bind another event here that responds to the
      // user navigating history, for the purpose of popping the 
      // history entry back off. 

    },

    save: function() {
      _this = this;

      // the hash must be stringified because
      // localStorage is a key:value store that
      // only accepts strings.

      localStorage.setItem(JSON.stringify(_this.sessionID, _this.currentConfig));
    }

  };

}(Mirador));
