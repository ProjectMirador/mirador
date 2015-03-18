(function($) {

  $.WorkspacePanel = function(options) {

    jQuery.extend(true, this, {
      element: null,
      appendTo: null,
      parent: null,
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

      _this.element.find('.grid-item').on('hover', function() {
        var gridString = jQuery(this).data('gridstring');
        _this.onHover(gridString);
      });
    },

    onSelect: function(gridString) {
      var _this = this;
      var layoutDescription = $.layoutDescriptionFromGridString(gridString);
      _this.workspace.resetLayout(layoutDescription);
      _this.parent.toggleWorkspacePanel();
    },
    onHover: function(gridString) {
      console.log('hovering');
      var _this = this,
      highestRow = gridString.charAt(0),
      highestColumn = gridString.charAt(2),
      gridItems = _this.element.find('.grid-item');
      gridItems.removeClass('hovered');
      gridItems.filter(function() {
        return gridString.charAt(0)<highestRow && gridString.charAt(2)<highestColumn;
      }).addClass('hovered');
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

