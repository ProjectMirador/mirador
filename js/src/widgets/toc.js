(function($) {

  $.TableOfContents = function(options) {

    jQuery.extend(true, this, {
      element:           null,
      appendTo:          null
    }, $.DEFAULT_SETTINGS, options);

    this.init();

  };

  $.TableOfContents.prototype = {
    init: function () {
      var _this = this;

      this.ranges = this.manifest;
      console.log(this.ranges);
      this.render();
      this.bindEvents();
    },

    getTplData: function() {  
      return this.ranges;
    },

    render: function() {

    },

    bindEvents: function() {
      var _this = this;

      jQuery.subscribe('focusChanged', function(_, manifest, focusFrame) {
      });

    },

    template: (function() {

      var template = Handlebars.compile([
        '{{#nestedRangeLevel ranges}}',
          '{{{tocLevel label level}}}',
          '{{#if children}}',
            '{{{nestedRangeLevel children}}}',
          '{{/if}}',
        '{{/nestedRangeLevel}}'
      ].join(''));

      var previousTemplate;

      Handlebars.registerHelper('nestedRangeLevel', function(children, options) {
        var out = '';

        if (options.fn !== undefined) {
          previousTemplate = options.fn;
        }

        children.forEach(function(child){
          out = out + previousTemplate(child);
        });

        return out;
      });

      Handlebars.registerHelper('tocLevel', function(label, level){
        return '<h' + (level+1) + '>' + label + '</h' + (level+1) + '>';
      });

      return template;
    })()
  };

}(Mirador));

