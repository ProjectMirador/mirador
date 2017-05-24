describe('LayersTab', function() {
  var subject;

  beforeEach(function() {
    jasmine.getJSONFixtures().fixturesPath = 'spec/fixtures';
    this.fixture = getJSONFixture('Richardson7manifest.json');
    this.element = jQuery('<div class="tab-container" id="layersTab"></div>');
    this.eventEmitter = new Mirador.EventEmitter();
    this.manifest = new Mirador.Manifest(
      this.fixture['@id'], 'IIIF', this.fixture
    );
    this.imagesList = this.manifest.getCanvases();
    this.windowId = '380c9e54-7561-4010-a99f-f132f5dc13fd';
    this.layersTab = new Mirador.LayersTab({
      manifest: this.manifest,
      appendTo: this.element,
      visible: true,
      windowId: this.windowId,
      eventEmitter: this.eventEmitter,
      imagesList: this.imagesList,
      canvases: {
        'https://oculus-dev.harvardx.harvard.edu/manifests/drs:5981093/canvas/canvas-5981094.json': {
          getVisibleImages: function() { return []; },
          label: 'f. 033v - 034',
          getBounds: function() {
            return {
              'x': 800,
              'y': 600,
              'width': 800,
              'height': 600
            };
          },
          show: function() {
          },
          images: [
            {
              url: 'aurl',
              getOpacity: function() {
                return 0.3;
              },
              getVisible: function() {
                return 'true';
              },
              getStatus: function() {
                return 'drawn';
              }
            },
            {url: 'aurl',
             getOpacity: function() {
               return 1;
             },
             getVisible: function() {
               return 'true';
             },
             getStatus: function() {
               return 'requested';
             }
            }
          ]
        },
        'https://oculus-dev.harvardx.harvard.edu/manifests/drs:5981093/canvas/canvas-5981096.json': {
          getVisibleImages: function() { return []; },
          getBounds: function() {
            return {
              'x': 800,
              'y': 600,
              'width': 800,
              'height': 600
            };
          },
          show: function() {
          },
          images: [
            {
              url: 'aurl',
              getOpacity: function() {
                return 0.3;
              },
              getVisible: function() {
                return 'true';
              },
              getStatus: function() {
                return 'drawn';
              }
            },
            {url: 'aurl',
             getOpacity: function() {
               return 1;
             },
             getVisible: function() {
               return 'true';
             },
             getStatus: function() {
               return 'requested';
             }
            }
          ]
        }
      },
      canvasID: 'https://oculus-dev.harvardx.harvard.edu/manifests/drs:5981093/canvas/canvas-5981094.json'
    });
    subject = this.layersTab;
  });

  afterEach(function() {
    delete this.layersTab;
  });

  describe('Initialization', function() {
    it('should initialize', function() {
      expect(true).toBe(true); //Force beforeEach() setup to run
    });
  });

  describe('localState', function() {
    var target_state = {
      id: 'layersTab',
      visible: true,
      additional_key: true
    };
    it('should return the state as-is when given no arguments', function() {
      expect(subject.localState()).toEqual(subject.layerTabState);
      expect(subject.localState()).not.toEqual(target_state);
    });
    it('should set and return the new state when given arguments', function() {
      expect(subject.localState(target_state, true)).toEqual(target_state);
      expect(subject.localState()).toEqual(target_state);
    });
    it('should publish a layersTabStateUpdated event on non-initial setup', function() {
      spyOn(this.eventEmitter, 'publish');
      expect(subject.localState(target_state, false)).toEqual(target_state);
      expect(this.eventEmitter.publish).toHaveBeenCalledWith('layersTabStateUpdated.' + this.windowId, target_state);
      expect(subject.localState()).toEqual(target_state);
    });
  });

  describe('tabStateUpdated', function() {
    beforeEach(function() {
      spyOn(subject.eventEmitter, 'publish');
    });
    it('should set visible in the local state', function() {
      jQuery.each([false, true], function(k, visible) {
        subject.tabStateUpdated(visible);
        expect(subject.localState().visible).toEqual(visible);
        expect(subject.eventEmitter.publish).toHaveBeenCalled();
      });
    });
  });

  describe('listenForActions', function() {
    it('should run layersTabStateUpdated upon getting a layersTabStateUpdated event', function() {
      var data = {
        selectedTabIndex: 0,
        tabs: [
          {
            options: {
              id: 'layersTab'
            }
          },
          {
            options: {
              id: 'someOtherTab'
            }
          }
        ],
        layersTab: true
      };
      spyOn(subject, 'tabStateUpdated');
      subject.eventEmitter.publish('tabStateUpdated.' + this.windowId, data);
      expect(subject.tabStateUpdated).toHaveBeenCalledWith(true);
    });
    it('should rerender upon getting a layerTabStateUpdated event', function() {
      var data = { visible: false };
      spyOn(subject, 'render');
      subject.eventEmitter.publish('layersTabStateUpdated.' + this.windowId, data);
      expect(subject.render).toHaveBeenCalledWith(data);
    });
  });

  //   xdescribe('bindEvents', function() {

  //   });

  describe('render', function() {
    it('should hide itself if not visible', function() {
      spyOn(jQuery.fn, 'hide');
      subject.render({
        canvasID: 'https://oculus-dev.harvardx.harvard.edu/manifests/drs:5981093/canvas/canvas-5981094.json',
        active: true,
        visible: false
      });
      console.info(subject.canvasID);
      console.info(subject.canvases);
      expect(subject.element.hide).toHaveBeenCalled();
    });
  });
});
