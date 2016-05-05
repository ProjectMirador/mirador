(function($) {

  $.WorkspacePanel = function(options) {

    jQuery.extend(true, this, {
      element: null,
      appendTo: null,
      workspace: null
    }, options);

    this.init();

  };

  $.WorkspacePanel.prototype = {
    init: function () {
      var _this = this,
      templateData = {
        rows: $.layoutDescriptionFromGridString(_this.state.getStateProperty('workspacePanelSettings').maxColumns + 'x' + _this.state.getStateProperty('workspacePanelSettings').maxRows).children.map(function(column, rowIndex) {
          column.columns = column.children.map(function(row, columnIndex) {
            row.gridString = (rowIndex+1) + 'x' + (columnIndex+1);
            return row;
          });
          return column;
        })
      };

      this.element = jQuery(this.template(templateData)).appendTo(this.appendTo);
      var backgroundImage = _this.state.getStateProperty('buildPath') + _this.state.getStateProperty('imagesPath') + 'debut_dark.png';
      this.element.css('background-image','url('+backgroundImage+')').css('background-repeat','repeat');
      
      this.bindEvents();
      this.listenForActions();
    },

    listenForActions: function() {
      var _this = this;
      jQuery.subscribe('workspacePanelVisible.set', function(_, stateValue) {
        _this.onPanelVisible(_, stateValue);
      });
    },

    bindEvents: function() {
      var _this = this;

      _this.element.find('.grid-item').on('click', function() {
        var gridString = jQuery(this).data('gridstring');
        _this.select(gridString);
      });

      _this.element.find('.grid-item').on('mouseover', function() {
        var gridString = jQuery(this).data('gridstring');
        _this.hover(gridString);
      });
      
      _this.element.find('.select-grid').on('mouseout', function() {
        _this.reset();
      });
    },

    select: function(gridString) {
      var _this = this;
      var layoutDescription = $.layoutDescriptionFromGridString(gridString);
      jQuery.publish('RESET_WORKSPACE_LAYOUT', {layoutDescription: layoutDescription});
      jQuery.publish('TOGGLE_WORKSPACE_PANEL');
    },

    hover: function(gridString) {
      var _this = this,
      highestRow = gridString.charAt(0),
      highestColumn = gridString.charAt(2),
      gridItems = _this.element.find('.grid-item');
      gridItems.removeClass('hovered');
      gridItems.filter(function(index) {
        var gridString = jQuery(this).data('gridstring');
        var change = gridString.charAt(0) <= highestRow && gridString.charAt(2) <= highestColumn;
        return change;
      }).addClass('hovered');
      _this.element.find('.grid-instructions').hide();
      _this.element.find('.grid-text').text(gridString).show();
    },
    
    reset: function() {
      var _this = this;
      _this.element.find('.grid-item').removeClass('hovered');
      _this.element.find('.grid-instructions').show();
      _this.element.find('.grid-text').hide();
    },

    hide: function() {
      jQuery(this.element).hide({effect: "fade", duration: 160, easing: "easeOutCubic"});
    },

    show: function() {
      jQuery(this.element).show({effect: "fade", duration: 160, easing: "easeInCubic"});
    },

    onPanelVisible: function(_, stateValue) {
      var _this = this;
      if (stateValue) { _this.show(); return; }
      _this.hide();
    },

    template: Handlebars.compile([
                                 '<div id="workspace-select-menu">',
                                 '<h1>{{t "changeLayout"}}</h1>',
                                 '<h3 class="grid-text"></h3>',
                                 '<h3 class="grid-instructions">{{t "selectGrid"}}</h3>',
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

