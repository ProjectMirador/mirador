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
    var layoutDescription = Mirador.layoutDescriptionFromGridString(gridString);
    spyOn(jQuery, 'publish');
    gridItem.trigger('click');
    expect(jQuery.publish).toHaveBeenCalledWith('RESET_WORKSPACE_LAYOUT', {layoutDescription: layoutDescription});
    expect(jQuery.publish).toHaveBeenCalledWith('TOGGLE_WORKSPACE_PANEL');
  });
  
  xit('should create grid data', function() {
    this.panel.find('.layout-cell').first().hover();
  });
  
  xit('should render the grid', function() {
    expect(this.panel.element.find('.grid-container')).toExist();
    expect(this.panel.element.find('.select-grid .preview-container')).toExist();
    expect(this.panel.element.find('.select-grid .preview-container .layout-strip')).toExist();
    var cellElements = this.panel.element.find('.layout-cell');
    expect(cellElements.length).toBe(15);
    expect(cellElements[cellElements.length -1 ].data('selection')).toBe('3x5');
  });
  
  xit('should trigger new layout on workspace, according to selection', function() {
    this.panel.onSelect('2x2');
    expect(this.workspace.setLayout).toHaveBeenCalledWith('2x2');
  });
});
