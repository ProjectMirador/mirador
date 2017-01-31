(function($) {
  $.EventEmitter = function(config) {
    jQuery.extend(true, this, {
      'debug': $.EventEmitter.debug, // Log events to console if true
      'trace': $.EventEmitter.trace  // Use console.trace for logging if true, console.log if false
    }, config);
    this.emitterId = $.EventEmitter.nextId();
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
  $.EventEmitter.prototype.excludePatterns = [];
  
  $.EventEmitter.prototype.log = function() {
    if (this.trace) {
      console.trace.apply(console, arguments);
    } else {
      console.log.apply(console, arguments);
    }
  };
  $.EventEmitter.prototype.exclude = function(str) {
    for (var i = 0; i < this.excludePatterns.length; ++i) {
      if (str.match(this.excludePatterns[i])) {
        return true;
      }
    }
    return false;
  };
  $.EventEmitter.prototype.okToLog = function(str) {
    return this.debug && !this.exclude(str);
  };
  $.EventEmitter.prototype.scaffoldHandler = function(eventId, handler) {
    var _this = this;
    return function() {
      _this.log("EventEmitter:handler:", eventId, handler, Array.prototype.slice.call(arguments));
      handler.apply(null, arguments);
    };
  };
  /**********************
   * END debug settings *
   **********************/
  
  ['subscribe', 'unsubscribe', 'publish'].forEach(function(action) {
    $.EventEmitter.prototype[action] = function() {
      var _this = this;
      var args = Array.prototype.slice.call(arguments);
      var eventId = args[0];
      var newEventId = this.emitterId.toString() + '::' + eventId;
      var event;

      if (action === 'subscribe') {
        var handler = args[1];
        if (this.okToLog(newEventId)) {
          handler = this.scaffoldHandler(newEventId, handler);
          args[1] = handler;
        }
        event = {
          name: eventId,
          handler: handler
        };
      }

      args[0] = newEventId;
      if (this.okToLog(newEventId)) {
        this.log("EventEmitter:" + action + ":", args);
      }
      jQuery[action].apply(jQuery, args);

      if(event){
        return event;
      }
    };
  });
})(Mirador);