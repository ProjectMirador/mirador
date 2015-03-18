(function($) {

  $.WorkspacePanel = function(options) {

    jQuery.extend(true, this, {
      element: null,
      appendTo: null,
      workspace: null,
      maxRows: null,
      maxColumns: null
    }, options);

    this.init();

  };

  $.WorkspacePanel.prototype = {
    init: function () {
      var _this = this,
      templateData = {
        rows: $.layoutDescriptionFromGridString(_this.maxColumns + 'x' + _this.maxRows).children.map(function(column, rowIndex) {
          column.columns = column.children.map(function(row, columnIndex) {
            row.gridString = (rowIndex+1) + 'x' + (columnIndex+1);
            return row;
          });
          return column;
        })
      };
      console.log(templateData);

      this.element = jQuery(this.template(templateData)).appendTo(this.appendTo);
      this.bindEvents();
    },

    bindEvents: function() {
      var _this = this;
      // handle subscribed events
      jQuery.subscribe('workspacePanelVisible.set', function(_, stateValue) {
        if (stateValue) { _this.show(); return; }
        _this.hide();
      });

      _this.element.find('.grid-item').on('click', function() {
        var gridString = jQuery(this).data('gridstring');
        _this.onSelect(gridString);
      });

      _this.element.find('.grid-item').on('hover', _this.onHover);
    },

    onSelect: function(gridString) {
      var _this = this;
      var layoutDescription = $.layoutDescriptionFromGridString(gridString);
      _this.workspace.resetLayout(layoutDescription);
    },
    onHover: function(arg1, arg2, arg3) {
      console.log(arg1);
      console.log(arg2);
      console.log(arg3);
      var _this = this,
      highestRow = jQuery(this),
      highestColumns = jQuery(this);

      console.log(jQuery(this));
      _this.element.find('.grid-item').filter();
    },

    hide: function() {
      jQuery(this.element).hide({effect: "fade", duration: 160, easing: "easeOutCubic"});
    },

    show: function() {
      jQuery(this.element).show({effect: "fade", duration: 160, easing: "easeInCubic"});
    },

    template: Handlebars.compile([
                                 '<div id="workspace-select-menu">',
                                 '<h1>Change Layout</h1>',
                                 '<div class="select-grid">',
                                 '{{#each rows}}',
                                 '<div class="grid-row">',
                                   '{{#each columns}}',
                                   '<a class="grid-item" data-gridString="{{gridString}}">',
                                   '</a>',
                                   '{{/each}}',
                                 '</div>',
                                 '{{/each}}',
                                 '</div>',
                                 // '<div class="preview-container">',
                                 // '</div>',
                                 '</div>'
    ].join(''))
  };

}(Mirador));

