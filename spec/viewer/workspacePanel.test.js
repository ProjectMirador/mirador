describe('WorkspacePanel', function() {
  var workspacePanelSettings = {
    maxColumns: 3,
    maxRows: 5,
    buildPath: '/',
    imagesPath: 'images/'
  };
  
  beforeEach(function() {
    this.viewerDiv = jQuery('<div>');
    this.workspace = {
      setLayout: jasmine.createSpy()
    };
    this.panel = new Mirador.WorkspacePanel({
      appendTo: this.viewerDiv, 
      workspace: this.workspace,
      state: new Mirador.SaveController({"workspacePanelSettings": workspacePanelSettings}),
    });
  });

  it('should render the correct grid size given maxColumns and maxRows', function() {
    var gridSize = workspacePanelSettings.maxRows * workspacePanelSettings.maxColumns;
    expect(this.viewerDiv.find('.select-grid .grid-item').length).toBe(gridSize);
  });
  
  it('should listen for actions', function() {
    spyOn(this.panel, 'onPanelVisible');
    jQuery.publish('workspacePanelVisible');
    expect(this.panel.onPanelVisible).toHaveBeenCalled();
  });
  
  it('can detect layout selected', function() {
    var gridItem = this.viewerDiv.find('.grid-item').first();
    var gridString = gridItem.data('gridstring');
    spyOn(this.panel, 'select');
    gridItem.trigger('click');
    expect(this.panel.select).toHaveBeenCalledWith(gridString);
  });
  
  it('can detect layout hover', function() {
    var gridItem = this.viewerDiv.find('.grid-item').first();
    var gridString = gridItem.data('gridstring');
    spyOn(this.panel, 'hover');
    gridItem.trigger('mouseenter');
    expect(this.panel.hover).toHaveBeenCalledWith(gridString);
  });

  it('can detect layout mouseout', function() {
    var selectGrid = this.viewerDiv.find('.select-grid');
    spyOn(this.panel, 'reset');
    selectGrid.trigger('mouseout');
    expect(this.panel.reset).toHaveBeenCalledWith();
  });
  
  it('can reset itself', function() {
    var el = this.panel.element;
    this.panel.reset();
    expect(el.find('.grid-text').css('display')).toBe('none');
    expect(el.find('.grid-instructions').css('display')).not.toBe('none');
    expect(el.find('.grid-item.hovered').length).toBe(0);
  });

  it('should display the grid selection when a layout is hovered', function() {
    var rows = 2, cols = 2;
    var gridString = rows+'x'+cols;
    var el = this.panel.element;
    this.panel.hover(gridString);
    expect(el.find('.grid-instructions').css('display')).toBe('none');
    expect(el.find('.grid-text').text()).toContain(gridString);
    expect(el.find('.grid-item.hovered').length).toBe(rows*cols);
  });

  it('should publish events when a layout is selected', function() {
    var gridString = '2x2';
    var layoutDescription = Mirador.layoutDescriptionFromGridString(gridString);
    spyOn(jQuery, 'publish');
    this.panel.select(gridString);
    expect(jQuery.publish).toHaveBeenCalledWith('RESET_WORKSPACE_LAYOUT', {layoutDescription: layoutDescription});
    expect(jQuery.publish).toHaveBeenCalledWith('TOGGLE_WORKSPACE_PANEL');
  });

  it('should render the grid', function() {
    var maxRows = workspacePanelSettings.maxRows;
    var maxColumns = workspacePanelSettings.maxColumns;
    var maxGridString = maxRows + 'x' + maxColumns;
    expect(this.viewerDiv.find('#workspace-select-menu')).toExist();
    expect(this.viewerDiv.find('.select-grid .grid-row')).toExist();
    expect(this.viewerDiv.find('.select-grid .grid-row > .grid-item')).toExist();
    
    var gridItems = this.viewerDiv.find('.grid-item');
    expect(gridItems.length).toBe(maxRows * maxColumns);
    expect(jQuery(gridItems[gridItems.length - 1]).data('gridstring')).toBe(maxGridString);
  });

  it('should set panel visibility', function() {
    spyOn(this.panel, 'show');
    spyOn(this.panel, 'hide');

    this.panel.onPanelVisible(null, true);
    expect(this.panel.show).toHaveBeenCalled();
    expect(this.panel.hide).not.toHaveBeenCalled();
    
    this.panel.show.calls.reset();
    this.panel.hide.calls.reset();

    this.panel.onPanelVisible(null, false);
    expect(this.panel.show).not.toHaveBeenCalled();
    expect(this.panel.hide).toHaveBeenCalled();
  });

  ['hide', 'show'].forEach(function(action) {
    it('should ' + action, function() {
      spyOn(jQuery.fn, action);
      this.panel[action]();
      expect(jQuery.fn[action]).toHaveBeenCalled();
    });
  });

});
