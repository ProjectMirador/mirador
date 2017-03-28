(function ($) {
  $.DialogBuilder = function (container) {
    this.container = container || jQuery('.window');

    bootbox.setDefaults({
      container: this.container
    });
  };

  $.DialogBuilder.prototype = {
    confirm: function (message, callback) {
      this.dialogInstance = bootbox.confirm(message, callback);
      this._attachEvents();
      return this.dialogInstance;
    },
    dialog: function (opts) {
      this.dialogInstance = bootbox.dialog(opts);
      this._attachEvents();
      return this.dialogInstance;
    },
    _attachEvents: function () {
      var _this = this;
      this.dialogInstance.init(function () {
        // set bigger z-index that one used in qtip
        var zIndex = 20000;

        jQuery(_this.dialogInstance).css('z-index', zIndex);
        // workaround because bootstap does not support external configuration for backdrop parent
        jQuery('.modal-backdrop').prependTo(_this.container).css('z-index', zIndex);
      });
      jQuery(_this.dialogInstance).on('hidden.bs.modal', function () {
        jQuery('.modal-backdrop').remove();
      });
    }
  };

})(Mirador);