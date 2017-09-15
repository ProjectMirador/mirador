describe('ClassicManifestsPanel', function() {
  beforeEach(function() {
    jasmine.getJSONFixtures().fixturesPath = 'spec/fixtures';
    this.dummyManifestContent = getJSONFixture('dummyManifest.json');
    this.viewerDiv = jQuery('<div>');
    this.eventEmitter = new Mirador.EventEmitter();
    this.panel = new Mirador.ClassicManifestsPanel({
      appendTo: this.viewerDiv,
      state: new Mirador.SaveController({eventEmitter: this.eventEmitter}),
      eventEmitter: this.eventEmitter
    })
  });

  it('should initialize itself', function() {
    expect(this.panel).toBeDefined();
  });

  it('should listen for actions', function() {
    var manifest = new Mirador.Manifest(null, 'Dummy Location', this.dummyManifestContent);
    spyOn(this.panel, 'onPanelVisible');
    spyOn(this.panel, 'onManifestReceived');
    this.eventEmitter.publish('manifestsPanelVisible.set');
    this.eventEmitter.publish('manifestReceived', manifest);
    expect(this.panel.onPanelVisible).toHaveBeenCalled();
    expect(this.panel.onManifestReceived).toHaveBeenCalled();
  });
  
  it('should bind events', function() {
    var element = this.panel.element;
    
    spyOn(this.panel, 'addManifestUrl');
    element.find('form#url-load-form').trigger('submit');
    expect(this.panel.addManifestUrl).toHaveBeenCalled();
    
    spyOn(this.panel, 'togglePanel');
    element.find('.remove-object-option').trigger('click');
    expect(this.panel.togglePanel).toHaveBeenCalled();
    
    spyOn(this.panel, 'filterManifests');
    element.find('#manifest-search').trigger('keyup');
    expect(this.panel.filterManifests).toHaveBeenCalled();
    
    spyOn(jQuery.Event.prototype, 'preventDefault').and.callThrough();
    expect(jQuery.Event.prototype.preventDefault).not.toHaveBeenCalled();
    element.find('#manifest-search-form').submit();
    expect(jQuery.Event.prototype.preventDefault).toHaveBeenCalled();
    
    spyOn(this.panel, 'resizePanel');
    jQuery(window).trigger('resize');
    expect(this.panel.resizePanel).toHaveBeenCalled();
  });
  
  ['hide', 'show'].forEach(function(action) {
    it('should ' + action, function() {
      spyOn(jQuery.fn, action);
      this.panel[action]();
      expect(jQuery.fn[action]).toHaveBeenCalled();
    });
  });

  it('should add manifest from url', function() {
    spyOn(this.eventEmitter, 'publish');
    var url = "http://example.com/manifest.json";
    this.panel.addManifestUrl(url);
    expect(this.eventEmitter.publish).toHaveBeenCalledWith('ADD_MANIFEST_FROM_URL', [url, "(Added from URL)"]);
  });
  
  it('should toggle load window', function() {
    spyOn(this.eventEmitter, 'publish');
    this.panel.togglePanel();
    expect(this.eventEmitter.publish).toHaveBeenCalledWith('TOGGLE_LOAD_WINDOW');
  });
  
  it('should filter manifests', function() {
    var manifest = new Mirador.Manifest(null, 'Dummy Location', this.dummyManifestContent);
    var searchText = this.dummyManifestContent.label
    var item = null;

    this.panel.onManifestReceived(null, manifest);
    expect(this.panel.manifestListItems.length).toBe(1);
    
    item = this.panel.element.find('.items-listing li:first');
    expect(item.length).toBe(1);

    this.panel.filterManifests(searchText);
    expect(item.css('display')).not.toBe('none');
    
    this.panel.filterManifests("XXX");
    expect(item.css('display')).toBe('none');
    
    this.panel.filterManifests("");
    expect(item.css('display')).not.toBe('none');
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
  
  it('should resize', function() {
    spyOn(this.eventEmitter, 'publish');
    this.panel.resizePanel();
    expect(this.eventEmitter.publish).toHaveBeenCalledWith('manifestPanelWidthChanged', this.panel.resultsWidth);
  });
  
  it('should receive a new manifest', function() {
    var manifest = new Mirador.Manifest(null, 'Dummy Location', this.dummyManifestContent);
    expect(this.panel.manifestListItems.length).toBe(0);
    this.panel.onManifestReceived(null, manifest);
    expect(this.panel.manifestListItems.length).toBe(1);
  });

});