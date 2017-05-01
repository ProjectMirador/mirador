// This file defines the global Mirador constructor function.
// This is the entry point to Mirador and is intentionally sparse.
(function(global) {
  function checkContainer(containerId) {
    var container = jQuery('#' + containerId);
    if (!container.hasClass('mirador-container')) {
      // Add necessary namespace class to the container element so that
      // style definitions will be applied correctly
      container.addClass('mirador-container');
    }
  }

  function Mirador(config) {
    if (this instanceof Mirador) {
        checkContainer(config.id);

        // initialize the event emitter for this mirador instance
        this.eventEmitter = new Mirador.EventEmitter();

        // pass the config through the save and restore process,
        // returning the config that will, in fact, populate the application
        this.saveController = new Mirador.SaveController(jQuery.extend(true, {}, config, {'eventEmitter': this.eventEmitter}));

        // initialize the application
        this.viewer = new Mirador.Viewer({
            'state': this.saveController,
            'eventEmitter': this.eventEmitter
        });
        return this;
    } else {
        return new Mirador(config);
    }
  }
  global.Mirador = global.Mirador || Mirador;
})(window);
