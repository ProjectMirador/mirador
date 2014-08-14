(function($) {

  $.BookmarkPanel = function(options) {

    jQuery.extend(true, this, {
      element: null,
      appendTo: null,
      parent: null,
      jsonblob: null
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
    },
    
    postSuccess: function() {
       
    },

    hide: function() {
      jQuery(this.element).hide({effect: "slide", direction: "up", duration: 1000, easing: "swing"});    
    },

    show: function() {
      var _this = this,
      ajaxType = 'POST',
      ajaxURL = "http://jsonblob.com/api/jsonBlob";
      
      if (this.jsonblob) {
          ajaxType = 'PUT';
          ajaxURL = ajaxURL + "/" + this.jsonblob;
      }
      jQuery.ajax({
          type: ajaxType,
          url: ajaxURL, 
          data: JSON.stringify(Mirador.saveController.currentConfig), 
          headers: { 
            'Accept': 'application/json',
            'Content-Type': 'application/json' 
          },
          success: function(data, textStatus, request) {
              if (!_this.jsonblob) {
                  _this.jsonblob = request.getResponseHeader('X-Jsonblob');
              }
              var bookmarkURL = window.location.href.replace(window.location.hash, '') + "?json="+_this.jsonblob;
              _this.element.find('#share-url').val(bookmarkURL);
         }
      });
      jQuery(this.element).show({effect: "slide", direction: "up", duration: 1000, easing: "swing"});
    },

    template: Handlebars.compile([
       '<div id="bookmark-panel">',
         '<h3>Bookmark or Share Your Workspace</h3>',
         '<span>URL: <input id="share-url" type="text"></input></span>',
       '</div>'
    ].join(''))
  };

}(Mirador));

