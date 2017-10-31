describe('BookmarkPanel', function() {
  beforeEach(function() {
    this.eventEmitter = new Mirador.EventEmitter();
    this.viewerDiv = jQuery('<div>');
    this.panel = new Mirador.BookmarkPanel({
      appendTo: this.viewerDiv,
      state: new Mirador.SaveController(jQuery.extend(true, {}, Mirador.DEFAULT_SETTINGS, {eventEmitter:this.eventEmitter})),
      eventEmitter: this.eventEmitter
    });
  });

  it('should initialize itself', function() {
    expect(this.panel).toBeDefined();
    expect(this.panel.storageModule).toBeDefined();
  });

  it('should listen for actions', function() {
    spyOn(this.panel, 'onPanelVisible');
    spyOn(this.panel, 'onConfigUpdated');
    this.eventEmitter.publish('bookmarkPanelVisible');
    this.eventEmitter.publish('saveControllerConfigUpdated');
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

  it('should update the share url when the saveController config is updated', function() {
    var shareUrl,
        blobId = "123abc",
        dfd = jQuery.Deferred(),
        storageModuleMock = {
          save: function(config) {
            return dfd.promise();
          }
        },
        urlBar = this.viewerDiv.find('#share-url');

    this.panel.storageModule = storageModuleMock;
    this.panel.onConfigUpdated();
    dfd.resolve(blobId).then(function() {
      shareUrl = urlBar.val();
      expect(shareUrl).toBeDefined();
      expect(shareUrl).toContain("?json="+blobId);
    }); // place the test runs at the end of the promise chain.
  });
  
  it('should show itself', function() {
    spyOn(jQuery.fn, 'show').and.callThrough();
    this.panel.show();
    expect(jQuery.fn.show).toHaveBeenCalled();
  });
  
  it('should hide itself', function() {
    spyOn(jQuery.fn, 'hide').and.callThrough();
    this.panel.hide();
    expect(jQuery.fn.hide).toHaveBeenCalled();
  });
});
