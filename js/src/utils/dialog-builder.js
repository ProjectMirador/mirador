(function ($) {
  $.DialogBuilder = function (container) {
    this.container = container || jQuery('.window');

    bootbox.setDefaults({
      container: this.container
    });
  };

  $.DialogBuilder.prototype = {
    confirm: function (message, callback) {
      return this._attachEvents(bootbox.confirm(message, callback));
    },
    dialog: function(opts){
      this._attachEvents(bootbox.dialog(opts));
    },
    _attachEvents:function(el){
      var _this = this;
      el.init(function(){
        // set bigger z-index that one used in qtip
        var zIndex = 20000;

        jQuery(el).css('z-index',zIndex);
        // workaround because bootstap does not support external configuration for backdrop parent
        jQuery('.modal-backdrop').prependTo(_this.container).css('z-index',zIndex);
      });
      jQuery(el).on('hidden.bs.modal',function(){
        jQuery('.modal-backdrop').remove();
      });
    }
  };

})(Mirador);