(function ($) {
  $.ManifestList = function(options) {
    this.appendTo = options.appendTo;
    this.manifests = options.manifests;
    this.init();
  };

  $.ManifestList.prototype = {

    init: function() {
      this.element = jQuery('<div>').addClass('manifest-load-status-indicator').prependTo(this.appendTo);
      this.element.append('<h3 class="loading-status">');
      this.bindEvents();
    },

    render: function() {
      var _this = this;

      var pending = _this.manifests.filter(function(d,i) {
        return d.request.state() === 'pending';
      }),
      rejected = _this.manifests.filter(function(d,i) {
        return d.request.state() === 'rejected';
      }),
      resolved = _this.manifests.filter(function(d,i) {
        return d.request.state() === 'resolved';
      });

      // pending, failed, or complete
      var requests = d3.select(_this.element[0])
      .selectAll('div.pending')
      .data(pending);

      // add new requests to the queue.
      requests.enter()
      .insert('div', ':nth-child(2)')
      .classed('request-status-bar', true)
      .classed('pending', true)
      .style('left', '3000px')
      .transition()
      .duration(300)
      .style('left', '0');

      requests.exit()
      .classed('pending', false)
      .transition()
      .duration(300)
      .style('opacity', 0)
      .remove();

      d3.select(_this.element.find('h3')[0])
      .text(function() {
        var count = pending.length;
        return "Loading " + count + " Items...";
      });
    },

    bindEvents: function() {
      var _this = this;
      jQuery.subscribe('manifestQueued', function(manifest) {
        _this.render();
      });
      jQuery.subscribe('manifestReceived', function(manifest) {
        _this.render();
      });
    },

    hide: function() {
      var _this = this;
      jQuery(this.element).hide({effect: "fade", duration: 160, easing: "easeOutCubic"});
    },

    show: function() {
      var _this = this;
      jQuery(this.element).show({effect: "fade", duration: 160, easing: "easeInCubic"});
    }
  };

})(Mirador);
