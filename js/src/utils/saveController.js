// Manage the saving and retrieval of settings and // initialisation options.

(function($) {
  $.SaveController = function(options) {
    jQuery.extend(true, this, {
      saveInterval: $.DEFAULT_SETTINGS.saveController.saveInterval
    });
  };

  $.SaveController.prototype = {

    buildJSON : function() {
      var widgetIndex = {},
          configData = {
            id: 'viewer',
            data: [
            ]
          };

      jQuery.each($.viewer.manifests, function(key, value) {

        var manifestEntry = {
          manifestUri:  key,
          title:        value.label,
          widgets:      [],
          location:     value.miradorRepository
        };

        configData.data.push(manifestEntry);
      });

      return JSON.stringify(configData);
    },

    save : function() {
      if ($.viewer) {
        localStorage.setItem('Mirador_data', this.buildJSON());
      }

      setTimeout(function() {
        $.viewer.saveController.save();
        $.viewer.addStatusBarMessage('right', 'Workspace saved at ' + (new Date()), 1000, false);
      }, ($.viewer) ? $.viewer.saveController.saveInterval : $.DEFAULT_SETTINGS.saveController.saveInterval);
    }
  };

})(Mirador);
