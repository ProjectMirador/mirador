describe('CollectionTreeManifestsPanel', function() {
  beforeEach(function() {
    jasmine.getJSONFixtures().fixturesPath = 'spec/fixtures';
    this.dummyManifestContent = getJSONFixture('dummyManifest.json');
    this.viewerDiv = jQuery('<div>');
    this.eventEmitter = new Mirador.EventEmitter();
    this.panel = new Mirador.CollectionTreeManifestsPanel({
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
    var collection = new Mirador.Collection(null, 'Dummy Location', {
      "@context": "http://iiif.io/api/presentation/2/context.json",
      "@id": "http://example.org/iiif/collection/top",
      "@type": "sc:Collection",
      "label": "Top Level Collection for Example Organization"
    });
    spyOn(this.panel, 'onPanelVisible');
    spyOn(this.panel, 'onManifestReceived');
    spyOn(this.panel, 'onCollectionReceived');
    spyOn(this.panel, 'addObjectFromUrl');
    spyOn(this.panel, 'addCollectionFromUrl');
    this.eventEmitter.publish('manifestsPanelVisible.set');
    this.eventEmitter.publish('manifestReceived', manifest);
    this.eventEmitter.publish('collectionReceived', collection);
    this.eventEmitter.publish('ADD_OBJECT_FROM_URL', [collection.uri, 'Dummy Location']);
    this.eventEmitter.publish('ADD_COLLECTION_FROM_URL', [collection.uri, 'Dummy Location']);
    expect(this.panel.onPanelVisible).toHaveBeenCalled();
    expect(this.panel.onManifestReceived).toHaveBeenCalled();
    expect(this.panel.onCollectionReceived).toHaveBeenCalled();
    expect(this.panel.addObjectFromUrl).toHaveBeenCalled();
    expect(this.panel.addCollectionFromUrl).toHaveBeenCalled();
  });
  
  it('should bind events', function() {
    var element = this.panel.element;
    
    spyOn(this.panel, 'addObjectUrl');
    element.find('form#url-load-form').trigger('submit');
    expect(this.panel.addObjectUrl).toHaveBeenCalled();
    
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
  
  it('should add object from url', function() {
    spyOn(this.eventEmitter, 'publish');
    var url = "http://example.com/manifest.json";
    this.panel.addObjectUrl(url);
    expect(this.eventEmitter.publish).toHaveBeenCalledWith('ADD_OBJECT_FROM_URL', [url, "(Added from URL)"]);
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
    expect(this.panel.manifestListItems.length).toBe(0);
    
    this.panel.expectedThings.push(manifest.uri);
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
  
  it('should not respond to non-expected manifests', function() {
    var manifest = new Mirador.Manifest(null, 'Dummy Location', this.dummyManifestContent);
    expect(this.panel.manifestListItems.length).toBe(0);
    this.panel.onManifestReceived(null, manifest);
    expect(this.panel.manifestListItems.length).toBe(0);
  });
  
  it('should receive a new manifest when expected', function() {
    var manifest = new Mirador.Manifest(null, 'Dummy Location', this.dummyManifestContent);
    expect(this.panel.manifestListItems.length).toBe(0);
    this.panel.expectedThings.push(manifest.uri);
    this.panel.onManifestReceived(null, manifest);
    expect(this.panel.manifestListItems.length).toBe(1);
  });
  
  it('should receive drops in the My Objects folder', function() {
    expect(this.panel.userManifests).not.toContain('http://www.example.org/manifest.json');
    this.eventEmitter.publish('ADD_MANIFEST_FROM_URL', 'http://www.example.org/manifest.json');
    expect(this.panel.userManifests).toContain('http://www.example.org/manifest.json');
  });

  it('should clear itself', function() {
    var manifest = new Mirador.Manifest(null, 'Dummy Location', this.dummyManifestContent);
    expect(this.panel.manifestListItems.length).toBe(0);
    this.panel.expectedThings.push(manifest.uri);
    this.panel.onManifestReceived(null, manifest);
    expect(this.panel.manifestListItems.length).toBe(1);
    this.panel.clearManifestItems();
    expect(this.panel.manifestListItems.length).toBe(0);
    expect(this.panel.element.find('.items-listing li').length).toBe(0);
  });
  
  describe('Folder changes', function() {
    beforeEach(function() {
      this.panel.preloadedManifests = ['http://www.example.org/foo.json', 'http://www.example.org/bar.json'];
      this.panel.userManifests = ['http://www.example.org/waa.json', 'http://www.example.org/hoo.json'];
    });
    
    it('should cleanly change to preloads', function() {
      this.panel.changeNode({ id: 'preload' });
      expect(this.panel.expectedThings).toContain('http://www.example.org/foo.json');
      expect(this.panel.expectedThings).toContain('http://www.example.org/bar.json');
      expect(this.panel.expectedThings).not.toContain('http://www.example.org/waa.json');
      expect(this.panel.expectedThings).not.toContain('http://www.example.org/hoo.json');
    });

    it('should cleanly change to my objects', function() {
      this.panel.changeNode({ id: 'user' });
      expect(this.panel.expectedThings).not.toContain('http://www.example.org/foo.json');
      expect(this.panel.expectedThings).not.toContain('http://www.example.org/bar.json');
      expect(this.panel.expectedThings).toContain('http://www.example.org/waa.json');
      expect(this.panel.expectedThings).toContain('http://www.example.org/hoo.json');
    });
    
    it('should cleanly change to a loaded collection', function() {
      this.panel.nodeManifests['foo'] = ['http://www.example.org/coo.json'];
      this.panel.changeNode({ id: 'foo' });
      expect(this.panel.expectedThings).toContain('http://www.example.org/coo.json');
    });
  });
  
  describe('Expanding nodes', function() {
    it('should expand subcollection URLs', function() {
      spyOn(this.panel, 'updateCollectionFromUrl');
      this.panel.nodeCollections['abc'] = ['http://www.example.org/foo.json', 'http://www.example.org/bar.json'];
      this.panel.expandNode({ id: 'abc' });
      expect(this.panel.updateCollectionFromUrl).toHaveBeenCalledWith('http://www.example.org/foo.json', 'abc');
      expect(this.panel.updateCollectionFromUrl).toHaveBeenCalledWith('http://www.example.org/bar.json', 'abc');
    });
  });
  
  describe('Adding manifests from URL', function() {
    it('should grab cached manifests from the state manager and add it right away', function() {
      var manifest = new Mirador.Manifest(this.dummyManifestContent['@id'], 'Dummy Location', this.dummyManifestContent);
      this.panel.eventEmitter.publish('manifestQueued', manifest, '');
      expect(this.panel.manifestListItems.length).toBe(0);
      this.panel.addManifestFromUrl(manifest.uri);
      expect(this.panel.manifestListItems.length).toBe(1);
    });
    it('should grab new manifests from the source and not add it just yet', function() {
      var manifest = new Mirador.Manifest(this.dummyManifestContent['@id'], 'Dummy Location', this.dummyManifestContent);
      expect(this.panel.manifestListItems.length).toBe(0);
      this.panel.addManifestFromUrl(manifest.uri);
      expect(this.panel.manifestListItems.length).toBe(0);
    });
  });
  
  describe('Adding collections from URL', function() {
    var dummyCollection;
    beforeEach(function() {
      dummyCollection = new Mirador.Collection("http://example.org/iiif/collection/top", 'Dummy Location', {
        "@context": "http://iiif.io/api/presentation/2/context.json",
        "@id": "http://example.org/iiif/collection/top",
        "@type": "sc:Collection",
        "label": "Top Level Collection for Example Organization",
        "collections": [
          {
            "@id": "http://example.org/iiif/collection/part2",
            "@type": "sc:Collection",
            "label": "Sub Collection 2"
          }
        ]
      });
      spyOn(this.panel, 'addCollectionNode').and.returnValue('qqqq');
    });
    it('should grab cached collectionss from the state manager and add it right away', function() {
      this.panel.eventEmitter.publish('manifestQueued', dummyCollection, '');
      expect(this.panel.addCollectionNode).not.toHaveBeenCalled();
      this.panel.addCollectionFromUrl(dummyCollection.uri);
      expect(this.panel.addCollectionNode).toHaveBeenCalled();
    });
    it('should grab new manifests from the source and not add it just yet', function() {
      expect(this.panel.addCollectionNode).not.toHaveBeenCalled();
      this.panel.addCollectionFromUrl(dummyCollection.uri);
      expect(this.panel.addCollectionNode).not.toHaveBeenCalled();
    });
    it('should also jump to the node if the jumpToIt parameter is set', function() {
      spyOn(jQuery.fn, 'jstree');
      this.panel.eventEmitter.publish('manifestQueued', dummyCollection, '');
      expect(this.panel.addCollectionNode).not.toHaveBeenCalled();
      this.panel.addCollectionFromUrl(dummyCollection.uri, null, true);
      expect(this.panel.addCollectionNode).toHaveBeenCalled();
      expect(jQuery.fn.jstree).toHaveBeenCalledWith('deselect_all');
      expect(jQuery.fn.jstree).toHaveBeenCalledWith('select_node', 'qqqq');
      expect(jQuery.fn.jstree).toHaveBeenCalledWith('open_node', 'qqqq');
    });
    it('should add to the top-level only once per URI', function() {
      this.panel.eventEmitter.publish('manifestQueued', dummyCollection, '');
      expect(this.panel.addCollectionNode).not.toHaveBeenCalled();
      this.panel.addCollectionFromUrl(dummyCollection.uri, null);
      expect(this.panel.addCollectionNode).toHaveBeenCalled();
      this.panel.addCollectionNode.calls.reset();
      this.panel.addCollectionFromUrl(dummyCollection.uri, null);
      expect(this.panel.addCollectionNode).not.toHaveBeenCalled();
    });
  });
  
  describe('Updating collections from URL', function() {
    var dummyCollection;
    beforeEach(function() {
      dummyCollection = new Mirador.Collection("http://example.org/iiif/collection/top", 'Dummy Location', {
        "@context": "http://iiif.io/api/presentation/2/context.json",
        "@id": "http://example.org/iiif/collection/top",
        "@type": "sc:Collection",
        "label": "Top Level Collection for Example Organization"
      });
      spyOn(this.panel, 'updateCollectionNode');
    });
    it('should grab cached collectionss from the state manager and update it right away', function() {
      this.panel.eventEmitter.publish('manifestQueued', dummyCollection, '');
      expect(this.panel.updateCollectionNode).not.toHaveBeenCalled();
      this.panel.updateCollectionFromUrl(dummyCollection.uri);
      expect(this.panel.updateCollectionNode).toHaveBeenCalled();
    });
    it('should grab new manifests from the source and not updated it just yet', function() {
      expect(this.panel.updateCollectionNode).not.toHaveBeenCalled();
      this.panel.updateCollectionFromUrl(dummyCollection.uri);
      expect(this.panel.updateCollectionNode).not.toHaveBeenCalled();
    });
  });
  
  describe('Receiving good collections', function() {
    var collection;
    beforeEach(function() {
      collection = new Mirador.Collection(null, 'Dummy Location', {
        "@context": "http://iiif.io/api/presentation/2/context.json",
        "@id": "http://example.org/iiif/collection/top",
        "@type": "sc:Collection",
        "label": "Top Level Collection for Example Organization"
      });
      spyOn(this.panel, 'addCollectionNode');
      spyOn(this.panel, 'updateCollectionNode');
    });
    it('should defer if the tree is not ready', function() {
      this.panel.treeQueue = [];
      this.panel.eventEmitter.publish('collectionReceived', [collection, collection.uri, null]);
      expect(this.panel.treeQueue[0].length).toEqual(4);
      expect(this.panel.addCollectionNode).not.toHaveBeenCalled();
      expect(this.panel.updateCollectionNode).not.toHaveBeenCalled();
    });
    it('should add a new node if no parent node ID is specified', function() {
      delete this.panel.treeQueue;
      this.panel.eventEmitter.publish('collectionReceived', [collection, collection.uri, null]);
      expect(this.panel.addCollectionNode).toHaveBeenCalled();
      expect(this.panel.updateCollectionNode).not.toHaveBeenCalled();
    });
    it('should update under an existing node if a parent node ID is specified', function() {
      delete this.panel.treeQueue;
      this.panel.eventEmitter.publish('collectionReceived', [collection, collection.uri, 'dummyNode']);
      expect(this.panel.addCollectionNode).not.toHaveBeenCalled();
      expect(this.panel.updateCollectionNode).toHaveBeenCalled();
    });
  });
  
  describe('Receiving failed collections', function() {
    beforeEach(function() {
      spyOn(jQuery.fn, 'jstree');
    });
    it('should defer if the tree is not ready', function() {
      this.panel.treeQueue = [];
      this.panel.eventEmitter.publish('collectionNotReceived', ['foo', null]);
      expect(jQuery.fn.jstree).not.toHaveBeenCalled();
    });
    it('mark all nodes of this URI as defective', function() {
      delete this.panel.treeQueue;
      this.panel.registerNodeIdUriPair('nodeId', 'foo');
      this.panel.eventEmitter.publish('collectionNotReceived', ['foo', 'nodeId']);
      expect(jQuery.fn.jstree).toHaveBeenCalledWith('set_icon', 'nodeId', 'fa fa-ban');
      expect(jQuery.fn.jstree).toHaveBeenCalledWith('disable_node', 'nodeId');
    });
  });
  
  describe('Registering nodeID-URI pairings', function() {
    it('should register a URI once successfully', function() {
      this.panel.registerNodeIdUriPair('nodeId', 'http://www.foo.net/stuff.json');
      expect(this.panel.nodeIdToUri['nodeId']).toEqual('http://www.foo.net/stuff.json');
      expect(this.panel.uriToNodeId['http://www.foo.net/stuff.json']).toEqual(['nodeId']);
    });
    it('should register a URI twice successfully', function() {
      this.panel.registerNodeIdUriPair('nodeId', 'http://www.foo.net/stuff.json');
      this.panel.registerNodeIdUriPair('nodeId2', 'http://www.foo.net/stuff.json');
      expect(this.panel.nodeIdToUri['nodeId']).toEqual('http://www.foo.net/stuff.json');
      expect(this.panel.nodeIdToUri['nodeId2']).toEqual('http://www.foo.net/stuff.json');
      expect(this.panel.uriToNodeId['http://www.foo.net/stuff.json']).toEqual(['nodeId', 'nodeId2']);
    });
  });
  
  describe('Adding nodes', function() {
    var collection;
    beforeEach(function() {
      collection = new Mirador.Collection("http://example.org/iiif/collection/top", null, {
        "@context": "http://iiif.io/api/presentation/2/context.json",
        "@id": "http://example.org/iiif/collection/top",
        "@type": "sc:Collection",
        "label": "Top Level Collection for Example Organization",
        "collections": [
          {
            "@id": "http://example.org/iiif/collection/part2",
            "@type": "sc:Collection",
            "label": "Sub Collection 2"
          }
        ],
        "manifests": [
          {
            "@id": "http://example.org/iiif/book1/manifest",
            "@type": "sc:Manifest",
            "label": "Book 1"
          },
          {
            "@id": "http://example.org/iiif/book2/manifest",
            "@type": "sc:Manifest",
            "label": "Book 2"
          }
        ],
      });
    });
    it('should add unexpanded nodes', function() {
      var newNodeId = this.panel.addCollectionNode(null, collection, true);
      expect(newNodeId).not.toBeUndefined();
      expect(this.panel.nodeCollections[newNodeId]).toEqual(["http://example.org/iiif/collection/part2"]);
      expect(this.panel.nodeManifests[newNodeId]).toEqual(["http://example.org/iiif/book1/manifest", "http://example.org/iiif/book2/manifest"]);
      expect(this.panel.nodeChildren[newNodeId]).toEqual([]);
    });
    it('should add expanded nodes', function() {
      var newNodeId = this.panel.addCollectionNode(null, collection);
      expect(newNodeId).not.toBeUndefined();
      expect(this.panel.nodeCollections[newNodeId]).toEqual(["http://example.org/iiif/collection/part2"]);
      expect(this.panel.nodeManifests[newNodeId]).toEqual(["http://example.org/iiif/book1/manifest", "http://example.org/iiif/book2/manifest"]);
      expect(this.panel.nodeChildren[newNodeId].length).toEqual(1);
    });
  });
  
  describe('Updating nodes', function() {
    var collection;
    beforeEach(function() {
      spyOn(this.panel, 'addCollectionNode');
      spyOn(jQuery.fn, 'jstree');
      collection = new Mirador.Collection("http://example.org/iiif/collection/top", null, {
        "@context": "http://iiif.io/api/presentation/2/context.json",
        "@id": "http://example.org/iiif/collection/top",
        "@type": "sc:Collection",
        "label": "Top Level Collection for Example Organization",
        "collections": [
          {
            "@id": "http://example.org/iiif/collection/part2",
            "@type": "sc:Collection",
            "label": "Sub Collection 2"
          }
        ],
        "manifests": [
          {
            "@id": "http://example.org/iiif/book1/manifest",
            "@type": "sc:Manifest",
            "label": "Book 1"
          },
          {
            "@id": "http://example.org/iiif/book2/manifest",
            "@type": "sc:Manifest",
            "label": "Book 2"
          }
        ],
      });
    });
    it('should update information', function() {
      this.panel.registerNodeIdUriPair('junk', "http://example.org/iiif/collection/supertop");
      this.panel.nodeCollections['junk'] = "http://example.org/iiif/collection/top";
      this.panel.registerNodeIdUriPair('abc', "http://example.org/iiif/collection/top");
      this.panel.nodeChildren['junk'] = ['abc'];
      this.panel.unexpandedNodes['abc'] = true;
      
      this.panel.updateCollectionNode('junk', collection);
      expect(this.panel.nodeCollections['abc']).toEqual(["http://example.org/iiif/collection/part2"]);
      expect(this.panel.nodeManifests['abc']).toEqual(["http://example.org/iiif/book1/manifest", "http://example.org/iiif/book2/manifest"]);
      expect(this.panel.nodeChildren['abc'].length).toEqual(1);
    });
  });
  
  describe('Adding objects from URL', function() {
    var manifest, collection, responseValue;
    beforeEach(function() {
      manifest = new Mirador.Manifest(this.dummyManifestContent['@id'], 'Dummy Location', this.dummyManifestContent);
      collection = new Mirador.Collection("http://example.org/iiif/collection/top", 'Dummy Location', {
        "@context": "http://iiif.io/api/presentation/2/context.json",
        "@id": "http://example.org/iiif/collection/top",
        "@type": "sc:Collection",
        "label": "Top Level Collection for Example Organization"
      });
      spyOn(jQuery, 'ajax').and.callFake(function(args) {
        args.success(responseValue);
      });
    });
    it('should add loaded collections', function() {
      this.panel.eventEmitter.publish('manifestQueued', collection, '');
      spyOn(this.panel.eventEmitter, 'publish');
      this.panel.addObjectFromUrl(collection.uri, "From Foo");
      expect(this.panel.eventEmitter.publish).toHaveBeenCalledWith('ADD_COLLECTION_FROM_URL', [collection.uri, "From Foo"]);
    });
    it('should add loaded manifests', function() {
      this.panel.eventEmitter.publish('manifestQueued', manifest, '');
      spyOn(this.panel.eventEmitter, 'publish');
      this.panel.addObjectFromUrl(manifest.uri, "From Foo");
      expect(this.panel.eventEmitter.publish).toHaveBeenCalledWith('ADD_MANIFEST_FROM_URL', [manifest.uri, "From Foo"]);
    });
    it('should add new collections', function() {
      spyOn(this.panel.eventEmitter, 'publish');
      responseValue = collection.jsonLd;
      this.panel.addObjectFromUrl(collection.uri, "From Foo");
      expect(this.panel.eventEmitter.publish).toHaveBeenCalledWith('manifestQueued', jasmine.any(Object), '');
      expect(this.panel.eventEmitter.publish).toHaveBeenCalledWith('ADD_COLLECTION_FROM_URL', [collection.uri, "From Foo"]);
    });
    it('should add new manifests', function() {
      spyOn(this.panel.eventEmitter, 'publish');
      responseValue = manifest.jsonLd;
      this.panel.addObjectFromUrl(manifest.uri, "From Foo");
      expect(this.panel.eventEmitter.publish).toHaveBeenCalledWith('manifestQueued', jasmine.any(Object), '');
      expect(this.panel.eventEmitter.publish).toHaveBeenCalledWith('ADD_MANIFEST_FROM_URL', [manifest.uri, "From Foo"]);
    });
  });
});
