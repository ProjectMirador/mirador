window.MiradorExample = {};

(function ($) {
  
  jQuery(document).ready(function () {
    $.app = new $.App();
  });
  
  $.App = function () {
    this.configSelect = jQuery('#config_select');
    
    this.reloadMirador();
    this.bindEvents();
  };
  
  $.App.prototype = {
    reloadMirador: function () {
      console.log('config: ' + this.configSelect.val());
      var config = $[this.configSelect.val()];
      Mirador(config);
    },
    
    bindEvents: function () {
      var _this = this;
      
      this.configSelect.change(function () {
        _this.reloadMirador();
      });
    }
  }
  
})(MiradorExample);
