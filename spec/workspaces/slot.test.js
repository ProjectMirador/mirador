describe('Slot', function () {
  var subject;
  beforeEach(function () {
    var windowElement = jQuery('<div id="MOCK_WINDOW_1"/>');
    this.appendTo = jQuery('<div/>').append(windowElement);
    this.eventEmitter = new Mirador.EventEmitter();

    var mockWindow = {
      id: 'MOCK_WINDOW_1',
      element: windowElement
    };
    
    var windowConfig = {
      state: new Mirador.SaveController(jQuery.extend(true, {}, Mirador.DEFAULT_SETTINGS, {eventEmitter:this.eventEmitter}))
    };
    
    jasmine.getJSONFixtures().fixturesPath = 'spec/fixtures';
    this.slot = new Mirador.Slot({
      window: mockWindow,
      eventEmitter: this.eventEmitter,
      state: windowConfig.state,
      layoutAddress: '1,1'
    });
    subject = this.slot;
  });

  describe('listenForActions', function () {
    beforeEach(function() {
      spyOn(subject.eventEmitter, 'publish').and.callThrough();
    });
    it('should respond to layoutChanged', function() {
      subject.eventEmitter.publish('layoutChanged', '2x2');
      expect(subject.eventEmitter.publish).toHaveBeenCalledWith('windowSlotAddressUpdated', {
        id: subject.window.id,
        slotAddress: '1,1'
      });
    });
    it('should respond to HIDE_REMOVE_SLOT', function() {
      spyOn(jQuery.fn, 'hide');
      subject.eventEmitter.publish('HIDE_REMOVE_SLOT');
      expect(jQuery.fn.hide).toHaveBeenCalled();
      expect(subject.eventEmitter.publish).toHaveBeenCalledWith('HIDE_REMOVE_OBJECT.MOCK_WINDOW_1');
    });
    it('should respond to SHOW_REMOVE_SLOT', function() {
      spyOn(jQuery.fn, 'show');
      subject.eventEmitter.publish('SHOW_REMOVE_SLOT');
      expect(jQuery.fn.show).toHaveBeenCalled();
      expect(subject.eventEmitter.publish).toHaveBeenCalledWith('SHOW_REMOVE_OBJECT.MOCK_WINDOW_1');
    });
    it('should respond to ADD_ITEM_FROM_WINDOW', function() {
      spyOn(subject, 'addItem');
      subject.eventEmitter.publish('ADD_ITEM_FROM_WINDOW', 'MOCK_WINDOW_1');
      expect(subject.addItem).toHaveBeenCalled();
    });
    it('should respond to REMOVE_SLOT_FROM_WINDOW', function() {
      subject.eventEmitter.publish('REMOVE_SLOT_FROM_WINDOW', 'MOCK_WINDOW_1');
      expect(subject.eventEmitter.publish).toHaveBeenCalledWith('REMOVE_NODE', subject);
    });
    jQuery.each(['RIGHT', 'LEFT', 'DOWN', 'UP'], function(_, dir) {
      it('should respond to SPLIT_' + dir + '_FROM_WINDOW', function() {
        subject.eventEmitter.publish('SPLIT_' + dir + '_FROM_WINDOW', 'MOCK_WINDOW_1');
        expect(subject.eventEmitter.publish).toHaveBeenCalledWith('SPLIT_' + dir, subject);
      });
    });
  });
  
  describe('bindEvents', function () {
    it('should add item when Add Item is clicked', function() {
      spyOn(subject, 'addItem').and.callThrough();
      subject.element.find('.addItemLink').click();
      expect(subject.addItem).toHaveBeenCalled();
    });
    it('should remove itself when Remove Slot is clicked', function() {
      spyOn(subject.eventEmitter, 'publish').and.callThrough();
      subject.element.find('.remove-slot-option').click();
      expect(subject.eventEmitter.publish).toHaveBeenCalledWith('REMOVE_NODE', subject);
    });
    it('should receive a drop', function() {
      spyOn(subject, 'dropItem');
      subject.element.trigger('drop');
      expect(subject.dropItem).toHaveBeenCalled();
    });
    it('should prevent defaults on drops', function() {
      var spyDragOver = spyOnEvent(subject.element, 'dragover'), 
          spyDragEnter = spyOnEvent(subject.element.find('.dropMask'), 'dragenter'),
          spyDragLeave = spyOnEvent(subject.element.find('.dropMask'), 'dragleave');
      subject.element.trigger('dragover');
      expect(spyDragOver).toHaveBeenPrevented();
      expect(subject.element.find('.dropMask')).toExist();
      subject.element.find('.dropMask').trigger('dragenter');
      expect(spyDragEnter).toHaveBeenPrevented();
      expect(subject.element).toHaveClass('draggedOver');
      subject.element.find('.dropMask').trigger('dragleave');
      expect(spyDragLeave).toHaveBeenPrevented();
      expect(subject.element).not.toHaveClass('draggedOver');
    });
  });
  
  describe('dropItem', function () {
    var getData, getAsString, mockEvent;
    beforeEach(function() {
      getData = "";
      getAsString = "";
      mockEvent = {
        preventDefault: jasmine.createSpy('preventDefault'),
        originalEvent: {
          dataTransfer: {
            getData: jasmine.createSpy('getData').and.callFake(function() { return getData; }),
            items: [ { getAsString: jasmine.createSpy('getAsString').and.callFake(function(f) { return f(getAsString); }) } ]
          }
        }
      };
      spyOn(subject, 'handleDrop');
    });
    it('should handle dropped URLs', function() {
      getData = "http://text.url.net";
      subject.dropItem(mockEvent);
      expect(mockEvent.preventDefault).toHaveBeenCalled();
      expect(subject.handleDrop).toHaveBeenCalledWith('http://text.url.net');
    });
    it('should handle dropped files', function() {
      getAsString = "http://text2.url.net";
      subject.dropItem(mockEvent);
      expect(mockEvent.preventDefault).toHaveBeenCalled();
      expect(subject.handleDrop).toHaveBeenCalledWith('http://text2.url.net')
    });
  });
  
  describe('handleDrop', function() {
    var manifestsState, manifestUrl, canvasUrl, imageInfoUrl, collectionUrl, fullUrl, fixture, fullFixture;
    beforeEach(function() {
      manifestsState = {};
      manifestUrl = 'https://oculus-dev.harvardx.harvard.edu/manifests/drs:5981093';
      canvasUrl = 'https://oculus-dev.harvardx.harvard.edu/manifests/drs:5981093/canvas/canvas-5982052.json';
      imageInfoUrl = 'https://images-dev.harvardx.harvard.edu/ids/iiif/5982052/info.json';
      collectionUrl = 'https://iiif.test.net/collection.json';
      fixture = { '@id': 'https://oculus-dev.harvardx.harvard.edu/manifests/drs:5981093' };
      fullFixture = getJSONFixture('Richardson7manifest.json');
      spyOn(subject.state, 'getStateProperty').and.callFake(function(arg) {
        return manifestsState;
      });
      spyOn(subject.eventEmitter, 'publish').and.callThrough();
    });
    it('should handle manifest-only URLs (not cached)', function() {
      subject.handleDrop(manifestUrl);
      expect(subject.eventEmitter.publish).toHaveBeenCalledWith('ADD_MANIFEST_FROM_URL', [manifestUrl, '(Added from URL)']);
      var mani = new Mirador.Manifest(manifestUrl, 'IIIF', fullFixture);
      subject.eventEmitter.publish('manifestReceived', mani);
      expect(subject.eventEmitter.publish).toHaveBeenCalledWith('ADD_WINDOW', {
        manifest: mani,
        slotAddress: '1,1'
      });
    });
    it('should handle manifest-only URLs (cached)', function() {
      manifestsState[manifestUrl] = fixture;
      subject.handleDrop(manifestUrl);
      expect(subject.eventEmitter.publish).toHaveBeenCalledWith('ADD_WINDOW', {
        manifest: fixture,
        slotAddress: '1,1'
      });
    });
    it('should handle manifest URLs with canvas (not cached)', function() {
      fullUrl = 'http://projectmirador.org?manifest=' + manifestUrl + '&canvas=' + canvasUrl;
      subject.handleDrop(fullUrl);
      expect(subject.eventEmitter.publish).toHaveBeenCalledWith('ADD_MANIFEST_FROM_URL', [manifestUrl, '(Added from URL)']);
      var mani = new Mirador.Manifest(manifestUrl, 'IIIF', fullFixture);
      subject.eventEmitter.publish('manifestReceived', mani);
      expect(subject.eventEmitter.publish).toHaveBeenCalledWith('ADD_WINDOW', {
        manifest: mani,
        slotAddress: '1,1',
        canvasID: canvasUrl,
        viewType: 'ImageView'
      });
    });
    it('should handle manifest URLs with canvas (cached)', function() {
      fullUrl = 'http://projectmirador.org?manifest=' + manifestUrl + '&canvas=' + canvasUrl;
      manifestsState[manifestUrl] = fixture;
      subject.handleDrop(fullUrl);
      expect(subject.eventEmitter.publish).toHaveBeenCalledWith('ADD_WINDOW', {
        manifest: fixture,
        slotAddress: '1,1',
        canvasID: canvasUrl,
        viewType: 'ImageView'
      });
    });
    it('should handle single-image URLs', function() {
      fullUrl = 'http://projectmirador.org?canvasId=' + canvasUrl + '&image=' + imageInfoUrl;
      subject.handleDrop(fullUrl);
      expect(subject.eventEmitter.publish).toHaveBeenCalledWith('ADD_MANIFEST_FROM_URL', [imageInfoUrl, '(Added from URL)']);
    });
    it('should handle collection URLs', function() {
      spyOn(jQuery, 'getJSON').and.returnValue({
        done: function(f) {
          f({
            "@context": "http://iiif.io/api/presentation/2/context.json",
            "@id": collectionUrl,
            "@type": "sc:Collection",
            "label": "Dummy collection",
            "manifests": [
              {
                "@id": manifestUrl,
                "@type": "sc:Manifest",
                "label": "Richardson 7 fixture"
              },
              {
                "@id": "http://demos.biblissima-condorcet.fr/iiif/metadata/florus-dispersus/manifest.json",
                "@type": "sc:Manifest",
                "label": "BNF fixture" 
              }
            ]
          }, {}, {});
        }
      });
      fullUrl = 'http://projectmirador.org?collection=' + collectionUrl;
      subject.handleDrop(fullUrl);
      expect(subject.eventEmitter.publish).toHaveBeenCalledWith('ADD_MANIFEST_FROM_URL', [manifestUrl, '(Added from URL)']);
      expect(subject.eventEmitter.publish).toHaveBeenCalledWith('ADD_MANIFEST_FROM_URL', ["http://demos.biblissima-condorcet.fr/iiif/metadata/florus-dispersus/manifest.json", '(Added from URL)']);
    });
  });
  
  it('clearSlot', function () {
    subject.clearSlot();
    expect(subject.window).toBeUndefined();
  });
  
  it('getAddress', function () {
    expect(subject.getAddress()).toEqual(subject.layoutAddress);
  });
  
  it('addItem', function () {
    subject.focused = false;
    spyOn(subject.eventEmitter, 'publish');
    subject.addItem();
    expect(subject.focused).toBe(true);
    expect(subject.eventEmitter.publish).toHaveBeenCalledWith('ADD_SLOT_ITEM', subject);
  });

  it("shouldn't break when slot does not contain a window", function () {
    delete this.slot.window;
    this.eventEmitter.publish('windowRemoved', 'MOCK_WINDOW_1');
    this.eventEmitter.publish('layoutChanged', {});
    this.eventEmitter.publish('HIDE_REMOVE_SLOT');
    this.eventEmitter.publish('SHOW_REMOVE_SLOT');
    this.eventEmitter.publish('ADD_ITEM_FROM_WINDOW', 'MOCK_WINDOW_1');
    this.eventEmitter.publish('REMOVE_SLOT_FROM_WINDOW', 'MOCK_WINDOW_1');
    this.eventEmitter.publish('SPLIT_RIGHT_FROM_WINDOW', 'MOCK_WINDOW_1');
    this.eventEmitter.publish('SPLIT_LEFT_FROM_WINDOW', 'MOCK_WINDOW_1');
    this.eventEmitter.publish('SPLIT_DOWN_FROM_WINDOW', 'MOCK_WINDOW_1');
    this.eventEmitter.publish('SPLIT_UP_FROM_WINDOW', 'MOCK_WINDOW_1');
    expect(this.slot.window).toBe(undefined); // Just checking all the above code didn't fail.
  });
});
