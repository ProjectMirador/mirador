(function($) {

/**
 * @param  {[type]} options init params, required
 *                          {
 *                          	parent: parent window that contains this widget,
 *                          	appendTo: the element in the parent to attach this widget,
 *                          	manifest: the Manifest object, containing manifest data/helper functions
 *                          	search: widget configs     ** TODO currently hardcoded below
 *                          }
 * @return {[type]}         Search Within widget
 */
$.SearchWidget = function(options) {
  
  jQuery.extend(this, {
    parent: null,   // Window object. To get window ID: this.parent.id
    appendTo: null,
    element: null,
    searchObject: null,
    width: 300,
    panelState: false,
    manifest: null, // Manifest object. To get search service: this.manifest.getSearchWithinService()
  }, options);

  this.init();

};

$.SearchWidget.prototype = {

  init: function() {
    var _this = this;
    this.registerWidget();

    var templateData = {};
    templateData.search = this.search;

    this.element = jQuery(this.template(templateData)).appendTo(this.appendTo);

    this.bindEvents();
  },

  toggle: function() {
    var searchIcon = this.parent.element.find('.mirador-icon-search-within');
    searchIcon.toggleClass('selected');
    this.element.stop().slideFadeToggle(300);
    // this.resizeParent(searchIcon.hasClass('selected'));
  },

  resizeParent: function(selected) {
    // Resize image view
    var view = this.parent.element.find('.view-container');

    if (selected) {
      var parentRight = view.position().left + view.width() - this.width;
      if (this.element.position().left !== parentRight) {
        this.element.css('left', parentRight + 'px');
      }

      view.css('width', view.width() - this.width + 'px');
    } else {
      view.css('width', view.width() + this.width + 'px');
    }
  },

  reposition: function(left) {
    var view = this.parent.element.find('.view-container');
    var parentRight = view.position().left + view.width() - this.element.width;

    if (this.element.position().left !== parentRight) {
      this.element.css('left', parentRight + 'px');
    }
  },

  bindEvents: function() {
    var _this = this;

    jQuery.subscribe('layoutChanged', function(event, layoutRoot) {
      if (_this.parent.element.find('.mirador-icon-search-within').hasClass('selected')) {
        var newWidth = _this.parent.element.width() - _this.element.width();
        _this.parent.element.find('.view-container').width(newWidth);
        _this.element.animate({left: _this.parent.element.position().left + newWidth + 'px'}, 300);
      } else {
        _this.parent.element.find('.view-container').width(_this.parent.element.width());
      }
    });

    this.parent.element.find('.mirador-icon-search-within').on('click', function() {
      _this.toggle();
    });

    this.parent.element.find('.mirador-btn.js-close-search-within').on('click', function() {
      _this.toggle();
    });

    this.element.find('.search-disclose-btn-more').on('click', function() {
      _this.element.find('#search-form').hide('fast');
      _this.element.find('.search-disclose').show('fast');
      _this.element.find('.search-disclose-btn-more').hide();
      _this.element.find('.search-disclose-btn-less').show();
    });

    this.element.find('.search-disclose-btn-less').on('click', function() {
      _this.element.find('#search-form').show('fast');
      _this.element.find('.search-disclose').hide('fast');
      _this.element.find('.search-disclose-btn-less').hide();
      _this.element.find('.search-disclose-btn-more').show();
    });

    this.element.find(".js-perform-query").on('submit', function(event){
        event.preventDefault();
        var query = _this.element.find(".js-query").val();
        _this.displaySearchWithin(query);
    });
  },

  displaySearchWithin: function(query){
    var _this = this;
    if (query !== "") {
      searchService = (_this.manifest.getSearchWithinService());
      this.searchObject = new $.SearchWithinResults({
        manifest: _this.manifest,
        appendTo: _this.element.find(".search-results-list"),
        parent: _this,
        panel: true,
        canvasID: _this.parent.currentCanvasID,
        imagesList: _this.imagesList,
        thumbInfo: {thumbsHeight: 80, listingCssCls: 'panel-listing-thumbs', thumbnailCls: 'panel-thumbnail-view'},
        query: query
      });
    }
  },

  registerWidget: function() {
    /*
     * Search within widget template
     * Uses default Window context.
     *
     * Example usage: {{> searchWithinWidget }}
     */
    Handlebars.registerPartial('searchWithinWidget',[
      '<div class="searchResults" style="display: none;">',
        '<a href="javascript:;" class="mirador-btn js-close-search-within" title="close">',
         '<i class="fa fa-times fa-lg"></i>',
        '</a>',  // Close button
        '<form id="search-form" class="js-perform-query">',
          '<input class="js-query" type="text" placeholder="search"/>',
          '<input type="submit"/>',
        '</form>',
        '<div class="search-results-list"></div>',
      '</div>',
    ].join(''));

    Handlebars.registerHelper('ifCond', function (v1, operator, v2, options) {
      switch (operator) {
        case '==':
          return (v1 == v2) ? options.fn(this) : options.inverse(this);
        case '===':
          return (v1 === v2) ? options.fn(this) : options.inverse(this);
        case '<':
          return (v1 < v2) ? options.fn(this) : options.inverse(this);
        case '<=':
          return (v1 <= v2) ? options.fn(this) : options.inverse(this);
        case '>':
          return (v1 > v2) ? options.fn(this) : options.inverse(this);
        case '>=':
          return (v1 >= v2) ? options.fn(this) : options.inverse(this);
        case '&&':
          return (v1 && v2) ? options.fn(this) : options.inverse(this);
        case '||':
          return (v1 || v2) ? options.fn(this) : options.inverse(this);
        default:
          return options.inverse(this);
      }
    });
  },

  template: Handlebars.compile([
    '{{> searchWithinWidget }}'
  ].join(''))

};

}(Mirador));
