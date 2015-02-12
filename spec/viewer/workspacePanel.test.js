describe('WorkspacePanel', function() {
  beforeEach(function() {
    var viewer = jQuery('<div>');
    var windowElem = jQuery('<div class="window">').add('<div class="window">');
    this.workspace = {
      setLayout: jasmine.createSpy()
    };
    this.panel = new Mirador.WorkspacePanel({
      windowElements: this.windowElem,
      appendTo: viewer, 
      maxX : 3,
      maxY : 5,
      workspace: this.workspace
    });
  });

  it('should know its own maxX and maxY', function() {
    expect(this.panel.maxX).toBe(3);
    expect(this.panel.maxY).toBe(5);
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
