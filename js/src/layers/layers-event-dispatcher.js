(function ($) {

  var LayersEventDispatcher = function (config) {
    this.windowId= config.windowId;
    this.eventEmitter = config.eventEmitter;
  };


  LayersEventDispatcher.prototype = {
    emit: function (event, data) {
      this.eventEmitter.publish(this.windowId + ':' + event, [data]);
    }
  };

  $.LayersEventDispatcher = LayersEventDispatcher;

}(Mirador));