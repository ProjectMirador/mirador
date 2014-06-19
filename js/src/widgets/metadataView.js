(function($) {

  $.MetadataView = function(options) {

    jQuery.extend(this, {
      manifest:             null,
      element:              null,
      parent:               null,
      metadataTypes:        null,
      metadataListingCls:   'metadata-listing'
    }, options);

    this.init();
  };


  $.MetadataView.prototype = {

    init: function() {
      var _this = this,
          tplData = {
            metadataListingCls: this.metadataListingCls
          };
          
      this.metadataTypes = {};

      this.metadataTypes.about = $.getMetadataAbout(_this.manifest);
      this.metadataTypes.details = $.getMetadataDetails(_this.manifest);
      this.metadataTypes.rights = $.getMetadataRights(_this.manifest);
      this.metadataTypes.links = $.getMetadataLinks(_this.manifest);
      this.metadataTypes.metadata = $.getMetadataFields(_this.manifest);

      jQuery.each(this.metadataTypes, function(metadata_key, metadata_value) {
        tplData[metadata_key] = [];

        // alert(type + ' ' + _this.metadata[type]);
        jQuery.each(metadata_value, function(key, value) {
          if (typeof value === 'object') {
            value = $.stringifyObject(value);
          }

          if (typeof value === 'string' && value !== '') {
            tplData[metadata_key].push({
              label: $.extractLabelFromAttribute(key),
              value: _this.addLinksToUris(value)
            });
          }
        });
      });

      //this.element.append(this.template(tplData));

      this.bindEvents();
    },

    bindEvents: function() {
    },


    addLinksToUris: function(text) {
      // http://stackoverflow.com/questions/8188645/javascript-regex-to-match-a-url-in-a-field-of-text
      var regexUrl = /(http|ftp|https):\/\/[\w\-]+(\.[\w\-]+)+([\w.,@?\^=%&amp;:\/~+#\-]*[\w@?\^=%&amp;\/~+#\-])?/gi,
          textWithLinks = text,
          matches;

      if (typeof text === 'string') {
        matches = text.match(regexUrl);

        if (matches) {
          jQuery.each(matches, function(index, match) {
            textWithLinks = textWithLinks.replace(match, '<a href="' + match + '" target="_blank">' + match + '</a>');
          });
        }
      }

      return textWithLinks;
    },
    
    template: Handlebars.compile([
    '<div class="sub-title">Details (Metadata about physical object/intellectual work):</div>',
        '<dl class="{{metadataListingCls}}">',
          '{{#each details}}',
            '<dt>{{label}}:</dt><dd>{{value}}</dd>',
          '{{/each}}',
        '</dl>',
        '<div class="sub-title">Rights Metadata:</div>',
        '<dl class="{{metadataListingCls}}">',
          '{{#each rights}}',
            '<dt>{{label}}:</dt><dd>{{value}}</dd>',
          '{{/each}}',
        '</dl>',
        '<div class="sub-title">Linking Metadata:</div>',
        '<dl class="{{metadataListingCls}}">',
          '{{#each links}}',
            '<dt>{{label}}:</dt><dd>{{value}}</dd>',
          '{{/each}}',
        '</dl>',
        '<div class="sub-title">About (Metadata about this manuscript\'s manifest file):</div>',
        '<dl class="{{metadataListingCls}}">',
          '{{#each about}}',
            '<dt>{{label}}:</dt><dd>{{value}}</dd>',
          '{{/each}}',
        '</dl>'
    ].join(''))

  };


}(Mirador));