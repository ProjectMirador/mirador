(function($) {
  $.EventEmitter = function(config) {
    jQuery.extend(true, this, {
      'debug': $.EventEmitter.debug
    }, config);
    this.emitterId = $.EventEmitter.nextId();
  };
  
  $.EventEmitter.debug = false;
  $.EventEmitter.id = 0;
  $.EventEmitter.nextId = function() {
    $.EventEmitter.id++;
    return $.EventEmitter.id;
  };
  
  ['subscribe', 'unsubscribe', 'publish'].forEach(function(action) {
    $.EventEmitter.prototype[action] = function() {
      var args = Array.prototype.slice.call(arguments);
      args[0] = this.emitterId.toString() +"::"+ args[0];
      if (this.debug) {
        console.trace("EventEmitter:"+action+":", args);
      }
      jQuery[action].apply(jQuery, args);
    };
  });
})(Mirador);