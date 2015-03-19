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

      this.element = jQuery(this.template(templateData)).appendTo(this.appendTo);
      this.bindEvents();
    },

    bindEvents: function() {
      var _this = this;
      jQuery.subscribe('workspacePanelVisible.set', function(_, stateValue) {
        if (stateValue) { _this.show(); return; }
        _this.hide();
      });

      _this.element.find('.grid-item').on('click', function() {
        var gridString = jQuery(this).data('gridstring');
        _this.onSelect(gridString);
      });

      _this.element.find('.grid-item').on('mouseover', function() {
        var gridString = jQuery(this).data('gridstring');
        _this.onHover(gridString);
      });
      
      _this.element.find('.select-grid').on('mouseout', function() {
        _this.element.find('.grid-item').removeClass('hovered');
        _this.element.find('.grid-instructions').show();
        _this.element.find('.grid-text').hide();
      });
    },

    onSelect: function(gridString) {
      var _this = this;
      var layoutDescription = $.layoutDescriptionFromGridString(gridString);
      _this.workspace.resetLayout(layoutDescription);
      _this.parent.toggleWorkspacePanel();
    },

    onHover: function(gridString) {
      var _this = this,
      highestRow = gridString.charAt(0),
      highestColumn = gridString.charAt(2),
      gridItems = _this.element.find('.grid-item');
      gridItems.removeClass('hovered');
      gridItems.filter(function(index) {
        var element = jQuery(this);
        var change = element.data('gridstring').charAt(0) <= highestRow && element.data('gridstring').charAt(2)<=highestColumn;
        return change;
      }).addClass('hovered');
      _this.element.find('.grid-instructions').hide();
      _this.element.find('.grid-text').text(gridString).show();
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
                                 '<h3 class="grid-text"></h3>',
                                 '<h3 class="grid-instructions">Select a grid below</h3>',
                                 '<div class="select-grid">',
                                 '{{#each rows}}',
                                 '<div class="grid-row">',
                                   '{{#each columns}}',
                                   '<a class="grid-item" data-gridString="{{gridString}}">',
                                   '<div class="grid-icon"></div>',
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

