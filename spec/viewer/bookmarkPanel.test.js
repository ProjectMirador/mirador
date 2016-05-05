describe('BookmarkPanel', function() {
  beforeEach(function() {
    this.viewerDiv = jQuery('<div>');
    this.panel = new Mirador.BookmarkPanel({
      appendTo: this.viewerDiv,
      state: new Mirador.SaveController({})
    })
  });
  
  it('should initialize itself', function() {
    expect(this.panel).toBeDefined();
    expect(this.panel.storageModule).toBeDefined();
  });
  
  it('should listen for actions', function() {
    spyOn(this.panel, 'onPanelVisible');
    spyOn(this.panel, 'onConfigUpdated');
    jQuery.publish('bookmarkPanelVisible');
    jQuery.publish('saveControllerConfigUpdated');
    expect(this.panel.onPanelVisible).toHaveBeenCalled();
    expect(this.panel.onConfigUpdated).toHaveBeenCalled();
  });
  
  it('should know how to show itself', function() {
    spyOn(this.panel, 'hide');
    spyOn(this.panel, 'show');

    this.panel.onPanelVisible(null, true);
    expect(this.panel.show).toHaveBeenCalled();
    expect(this.panel.hide).not.toHaveBeenCalled();
  });
  
  it('should know how to hide itself', function() {
    spyOn(this.panel, 'hide');
    spyOn(this.panel, 'show');

    this.panel.onPanelVisible(null, false);
    expect(this.panel.show).not.toHaveBeenCalled();
    expect(this.panel.hide).toHaveBeenCalled();
  });
  
  it('should update the share url when the saveConroller config is updated', function() {
    var shareUrl;
    var blobId = "123abc";
    var dfd = jQuery.Deferred();
    var storageModuleMock = {
      save: function(config) {
        return dfd.promise();
      }
    };
    
    this.panel.storageModule = storageModuleMock;
    this.panel.onConfigUpdated();
    dfd.resolve(blobId);
    shareUrl = this.viewerDiv.find('#share-url').val();
    
    expect(shareUrl).toBeDefined();
    expect(shareUrl).toContain("?json="+blobId);
  });
});