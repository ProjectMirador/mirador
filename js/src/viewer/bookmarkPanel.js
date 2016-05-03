(function($) {

  $.BookmarkPanel = function(options) {

    jQuery.extend(true, this, {
      element: null,
      appendTo: null,
    }, options);

    this.init();

  };

  $.BookmarkPanel.prototype = {
    init: function () {
      this.element = jQuery(this.template()).appendTo(this.appendTo);
      var jsonStorageEndpoint = this.state.getStateProperty('jsonStorageEndpoint'),
      saveModule = jsonStorageEndpoint.module,
      saveOptions = jsonStorageEndpoint.options;
      this.storageModule = new $[saveModule](saveOptions);
      
      this.bindEvents();
      this.listenForActions();
    },

    bindEvents: function() {
      var _this = this;
    },

    listenForActions: function() {
      var _this = this;
      jQuery.subscribe('bookmarkPanelVisible.set', function(_, stateValue) {
        _this.onPanelVisible(_, stateValue);
      });
      jQuery.subscribe('saveControllerConfigUpdated', function() {
        _this.onConfigUpdated();
      });
    },

    onPanelVisible: function(_, stateValue) {
      var _this = this;
      if (stateValue) { _this.show(); return; }
      _this.hide();
    },

    onConfigUpdated: function() {
      var _this = this;
      _this.storageModule.save(_this.state.currentConfig)
      .then(function(blobId) {
        var bookmarkURL = window.location.href.replace(window.location.hash, '') + "?json="+blobId;
        _this.element.find('#share-url').val(bookmarkURL).focus().select();
      });
    },

    hide: function() {
      jQuery(this.element).hide({effect: "slide", direction: "up", duration: 300, easing: "swing"});
    },

    show: function() {
      jQuery(this.element).show({effect: "slide", direction: "up", duration: 300, easing: "swing"});
    },

    template: Handlebars.compile([
       '<div id="bookmark-panel">',
         '<h3>{{t "bookmarkTitle"}}</h3>',
         '<span>',
         '{{t "url"}}: <input id="share-url" type="text"></input>',
         '<a href="javascript:;" class="mirador-btn mirador-icon-copy" data-clipboard-target="share-url"><i class="fa fa-files-o fa-lg"></i></a>',
         '</span>',
       '</div>'
    ].join(''))
  };

}(Mirador));
