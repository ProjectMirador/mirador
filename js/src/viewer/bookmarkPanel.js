(function($) {

  $.BookmarkPanel = function(options) {

    jQuery.extend(true, this, {
      element: null,
      appendTo: null,
      parent: null
    }, options);

    this.init();

  };

  $.BookmarkPanel.prototype = {
    init: function () {
      this.element = jQuery(this.template()).appendTo(this.appendTo);
      this.bindEvents();
    },

    bindEvents: function() {
      var _this = this;
      // handle subscribed events
      jQuery.subscribe('bookmarkPanelVisible.set', function(_, stateValue) {
        if (stateValue) { _this.show(); return; }
        _this.hide();
      });
      
      jQuery.subscribe('saveControllerConfigUpdated', function() {
        var ajaxType = 'POST',
        ajaxURL = "https://jsonblob.com/api/jsonBlob";
      
        jQuery.ajax({
          type: ajaxType,
          url: ajaxURL, 
          data: JSON.stringify(Mirador.saveController.currentConfig), 
          headers: { 
            'Accept': 'application/json',
            'Content-Type': 'application/json' 
          },
          success: function(data, textStatus, request) {
              var jsonblob = request.getResponseHeader('X-Jsonblob');
              
              var bookmarkURL = window.location.href.replace(window.location.hash, '') + "?json="+jsonblob;
              _this.element.find('#share-url').val(bookmarkURL).focus().select();
         }
        });
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
         '<h3>Bookmark or Share Your Workspace</h3>',
         '<span>',
         'URL: <input id="share-url" type="text"></input>',
         '<a href="javascript:;" class="mirador-btn mirador-icon-copy" data-clipboard-target="share-url"><i class="fa fa-files-o fa-lg"></i></a>',
         '</span>',
       '</div>'
    ].join(''))
  };

}(Mirador));

