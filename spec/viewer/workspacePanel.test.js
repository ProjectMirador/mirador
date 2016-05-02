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
  
  it('can detect when a layout is selected', function() {
    var gridItem = this.viewerDiv.find('.grid-item').first();
    var gridString = gridItem.data('gridstring');
    spyOn(this.panel, 'onSelect');
    gridItem.trigger('click');
    expect(this.panel.onSelect).toHaveBeenCalledWith(gridString);
  });
  
  it('can detect when a layout is hovered', function() {
    var gridItem = this.viewerDiv.find('.grid-item').first();
    var gridString = gridItem.data('gridstring');
    spyOn(this.panel, 'onHover');
    gridItem.trigger('mouseenter');
    expect(this.panel.onHover).toHaveBeenCalledWith(gridString);
  });
  
  it('publishes events when a layout is selected', function() {
    var gridString = '2x2';
    var layoutDescription = Mirador.layoutDescriptionFromGridString(gridString);
    spyOn(jQuery, 'publish');
    this.panel.onSelect(gridString);
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

});
