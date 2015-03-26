// for scroll view
// source: http://stackoverflow.com/questions/14035083/jquery-bind-event-on-scroll-stops
jQuery.fn.scrollStop = function(callback) {
  $(this).scroll(function() {
    var self  = this,
    $this = $(self);

    if ($this.data('scrollTimeout')) {
      clearTimeout($this.data('scrollTimeout'));
    }

    $this.data('scrollTimeout', setTimeout(callback, 250, self));
  });
};


// for resize events
// source: https://github.com/f/jquery.resizestop
(function($) {
  var slice = Array.prototype.slice;

  // Special event definition
  $.extend($.event.special, {
    resizestop: {
      add: function(handle) {
        var handler = handle.handler;

        $(this).resize(function(e) {
          clearTimeout(handler._timer);
          e.type = 'resizestop';

          var _proxy = $.proxy(handler, this, e);
          handler._timer = setTimeout(_proxy, handle.data || 200);
        });
      }
    },

    resizestart: {
      add: function(handle) {
        var handler = handle.handler;

        $(this).on('resize', function(e) {
          clearTimeout(handler._timer);

          if (!handler._started) {
            e.type = 'resizestart';
            handler.apply(this, arguments);
            handler._started = true;
          }

          handler._timer = setTimeout($.proxy(function() {
            handler._started = false;
          }, this), handle.data || 300);
        });
      }
    }
  });

  // binding and currying the shortcuts.
  $.extend($.fn, {
    resizestop: function() {
      $(this).on.apply(this, ["resizestop"].concat(slice.call(arguments)));
    },
    resizestart: function() {
      $(this).on.apply(this, ["resizestart"].concat(slice.call(arguments)));
    }
  });
})(jQuery);