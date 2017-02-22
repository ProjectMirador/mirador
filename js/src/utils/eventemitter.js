(function($) {
  $.EventEmitter = function(config) {
    jQuery.extend(true, this, {
      'debug': $.EventEmitter.debug, // Log events to console if true
      'trace': $.EventEmitter.trace,  // Use console.trace for logging if true, console.log if false
      'debugExclude': $.EventEmitter.excludePatterns // substring patterns for event IDs to exclude
    }, config);
    this.emitterId = $.EventEmitter.nextId();
    if (this.debug) {
      this.logger = new $.EventEmitter.Logger({
        trace: this.trace,
        debugExclude: this.debugExclude
      });
    }
  };

  $.EventEmitter.id = 0;
  $.EventEmitter.nextId = function() {
    $.EventEmitter.id++;
    return $.EventEmitter.id;
  };

  /************************
   * BEGIN debug settings *
   ************************/
  $.EventEmitter.debug = false;
  $.EventEmitter.trace = false;

  // Event IDs that contains any substring in the array will be ignored by the logger
  // e.g. ['updateTooltips', 'ANNO.*UPDATED']
  $.EventEmitter.excludePatterns = [];

  $.EventEmitter.Logger = function(options) {
    this.trace = options.trace;
    this.debugExclude = options.debugExclude;
    this.scaffoldMap = {};
  };
  $.EventEmitter.Logger.prototype = {
    log: function() {
      if (this.trace) {
        console.trace.apply(console, arguments);
      } else {
        console.log.apply(console, arguments);
      }
    },
    exclude: function(str) {
      var patterns = this.debugExclude;
      for (var i = 0; i < patterns.length; ++i) {
        if (str.match(patterns[i])) {
          return true;
        }
      }
      return false;
    },
    scaffoldHandler: function(eventId, handler) {
      var _this = this;
      var scaffold = function() {
        _this.log("EventEmitter:handler:", eventId, handler, Array.prototype.slice.call(arguments));
        handler.apply(null, arguments);
      };
      this.scaffoldMap[handler] = scaffold;
      return scaffold;
    },
    unscaffold: function(handler) {
      var scaffold = this.scaffoldMap[handler];
      delete this.scaffoldMap[handler];
      return scaffold;
    }
  };
  /**********************
   * END debug settings *
   **********************/

  ['subscribe', 'unsubscribe', 'publish'].forEach(function(action) {
    $.EventEmitter.prototype[action] = function() {
      var args = Array.prototype.slice.call(arguments);
      var eventId = args[0];
      var globalEventId = this.emitterId.toString() + '::' + eventId;
      var logging = this.logger && !this.logger.exclude(globalEventId);
      var event;

      if (action === 'subscribe') {
        event = {
          name: eventId,
          handler: args[1]
        };
        if (logging) {
          args[1] = this.logger.scaffoldHandler(globalEventId, args[1]);
        }
      }

      if (action === 'unsubscribe') {
        if (logging) {
          args[1] = this.logger.unscaffold(args[1]);
        }
      }

      args[0] = globalEventId;
      if (logging) {
        this.logger.log("EventEmitter:" + action + ":", args);
      }
      jQuery[action].apply(jQuery, args);

      if (event) {
        return event;
      }
    };
  });
})(Mirador);
