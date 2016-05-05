(function($) {

  $.MetadataView = function(options) {

    jQuery.extend(this, {
      manifest:             null,
      element:              null,
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

      _this.manifest = _this.manifest.jsonLd;
      this.metadataTypes = {};

      this.metadataTypes.details = _this.getMetadataDetails(_this.manifest);
      this.metadataTypes.rights = _this.getMetadataRights(_this.manifest);
      this.metadataTypes.links = _this.getMetadataLinks(_this.manifest);

      //vvvvv This is *not* how this should be done.
      jQuery.each(this.metadataTypes, function(metadataKey, metadataValue) {
        tplData[metadataKey] = [];

        jQuery.each(metadataValue, function(key, value) {
          if (typeof value === 'object') {
            value = _this.stringifyObject(value);
          }

          if (typeof value === 'string' && value !== '') {
            tplData[metadataKey].push({
              label: _this.extractLabelFromAttribute(key),
              value: (metadataKey === 'links') ? value : _this.addLinksToUris(value)
            });
          }
        });
      });

      if (_this.manifest.logo) {
        var logo = '';
        if (typeof _this.manifest.logo === "string") {
          logo = _this.manifest.logo;
        } else if (typeof _this.manifest.logo['@id'] !== 'undefined') {
          logo = _this.manifest.logo['@id'];
        }
        tplData.logo = logo;
      }

      this.element = jQuery(this.template(tplData)).appendTo(this.appendTo);
      this.bindEvents();
    },

  // Base code from https://github.com/padolsey/prettyprint.js. Modified to fit Mirador needs
  stringifyObject: function(obj, nestingMargin) {
    var type = typeof obj,
        _this = this,
        str,
        first = true,
        increment = 15,
        delimiter = '<br/>';

    if (obj instanceof RegExp) {
      return '/' + obj.source + '/';
    }

    if (typeof nestingMargin === 'undefined') {
      nestingMargin = 0;
    }

    if (obj instanceof Array) {
      str = '[ ';
      jQuery.each(obj, function (i, item) {
        str += (i === 0 ? '' : ', ') + _this.stringifyObject(item, nestingMargin + increment);
      });
      return str + ' ]';
    }

    if (typeof obj === 'object') {
      str = '<div style="margin-left:' +  nestingMargin + 'px">';
      for (var i in obj) {
        if (obj.hasOwnProperty(i)) {
          str += (first ? '' : delimiter) + i + ': ' + _this.stringifyObject(obj[i], nestingMargin + increment);
          first = false;
        }
      }

      return str + '</div>';
    }
    return obj.toString();
  },

  stringifyRelated: function(obj) {
    var _this = this,
        str,
        next,
        label,
        format;
    if (obj instanceof Array) {
      str = '';
      jQuery.each(obj, function (i, item) {
        next = _this.stringifyRelated(item);
        if (next !== '') str += (i === 0 ? '' : '<br/>') + next;
      });
      return str;
    }

    if (typeof obj === 'object' && '@id' in obj) {
      label = ('label' in obj)? obj.label : obj['@id'];
      format = ('format' in obj && obj.format !== 'text/html')? '(' + obj.format + ')' : '';
      return '<a href="' + obj['@id'] + '"  target="_blank">' + label + '</a> ' + format;
    }

    return _this.addLinksToUris(obj.toString());
  },

  getMetadataDetails: function(jsonLd) {
      // TODO: This should not default to English
      var mdList = {
        'label': '<b>' + ($.JsonLd.getTextValue(jsonLd.label) || '') + '</b>',
        'description':  $.JsonLd.getTextValue(jsonLd.description) || ''
      };

      if (jsonLd.metadata) {
        value = "";
        label = "";
        jQuery.each(jsonLd.metadata, function(index, item) {
          label = $.JsonLd.getTextValue(item.label);
          value = $.JsonLd.getTextValue(item.value);
          mdList[label] = value;
        });
      }

      return mdList;
    },

   getMetadataRights: function(jsonLd) {
       return {
           'license':      jsonLd.license || '',
           'attribution':  jsonLd.attribution || ''
        };
   },

   getMetadataLinks: function(jsonLd) {
     // #414
      return {
          'related': this.stringifyRelated(jsonLd.related || ''),
          'seeAlso': this.stringifyRelated(jsonLd.seeAlso || ''),
          'within':  this.stringifyObject(jsonLd.within || '')
        };
   },

   extractLabelFromAttribute: function(attr) {
    var label = attr;

    label = label.replace(/^@/, '');
    label = label.replace(/([A-Z])/g, ' $1');
    label = label.replace(/\s{2,}/g, ' ');
    label = label.replace(/\w\S*/g, function(txt) {
      return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
    });

    return label;
  },

    bindEvents: function() {
    },

    toggle: function(stateValue) {
        if (stateValue) {
            this.show();
        } else {
            this.hide();
        }
    },

    show: function() {
        var element = jQuery(this.element);
        if (this.panel) {
            element = element.parent();
        }
        element.show({effect: "slide", direction: "right", duration: 300, easing: "swing"});
    },

    hide: function() {
        var element = jQuery(this.element);
        if (this.panel) {
            element = element.parent();
        }
        element.hide({effect: "slide", direction: "right", duration: 300, easing: "swing"});    
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
    '<div class="sub-title">{{t "details"}}:</div>',
        '<div class="{{metadataListingCls}}">',
          '{{#each details}}',
            '<div class="metadata-item"><div class="metadata-label">{{label}}:</div><div class="metadata-value">{{{value}}}</div></div>',
          '{{/each}}',
        '</div>',
        '<div class="sub-title">{{t "rights"}}:</div>',
        '{{#if rights}}',
        '<div class="{{metadataListingCls}}">',
          '{{#each rights}}',
            '<div class="metadata-item"><div class="metadata-label">{{label}}:</div><div class="metadata-value">{{{value}}}</div></div>',
          '{{/each}}',
          '{{#if logo}}',
            '<div class="metadata-item"><div class="metadata-label">{{t "logo"}}:</div><img class="metadata-logo" src="{{logo}}"/></div>',
          '{{/if}}',
        '</div>',
        '{{else}}',
        '<div class="{{metadataListingCls}}">',
          '<div class="metadata-item"><div class="metadata-label">{{t "rightsStatus"}}:</div><div class="metadata-value">{{t "unspecified"}}</div></div>',
        '</div>',
        '{{/if}}',
        '{{#if links}}',
        '<div class="sub-title">{{t "links"}}:</div>',
        '<div class="{{metadataListingCls}}">',
          '{{#each links}}',
            '<div class="metadata-item"><div class="metadata-label">{{label}}:</div><div class="metadata-value">{{{value}}}</div></div>',
          '{{/each}}',
        // '{{#if relatedLinks}}',
        //   '<dt>{{label}}:</dt><dd>{{{value}}}</dd>',
        // '{{/if}}',
        '</dl>',
        '{{/if}}'

    ].join(''), { noEscape: true })

  };

}(Mirador));
