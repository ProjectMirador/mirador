(function ($) {
  $.DialogBuilder = function (config) {

  };

  $.DialogBuilder.prototype = {
    confirm: function (message, callback) {
      return bootbox.confirm(message, callback);
    },
    dialog: function(opts){
      return bootbox.dialog(opts);
    }
  };

})(Mirador);