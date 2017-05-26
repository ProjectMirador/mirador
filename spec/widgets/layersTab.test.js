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
              id:1,
              url: 'aurl',
              getOpacity: function() {
                return 0.3;
              },
              getVisible: function() {
                return true;
              },
              getStatus: function() {
                return 'drawn';
              }
            },
            {id:2,
              url: 'aurl',
             getOpacity: function() {
               return 1;
             },
             getVisible: function() {
               return false;
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
      spyOn(subject.eventEmitter, 'publish').and.callThrough();
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

  describe('event callbacks', function() {
    it('canvasIdUpdated', function() {
      var mockCanvasId = 'https://oculus-dev.harvardx.harvard.edu/manifests/drs:5981093/canvas/canvas-5981096.json';

      expect(subject.localState().canvasID).toEqual('https://oculus-dev.harvardx.harvard.edu/manifests/drs:5981093/canvas/canvas-5981094.json');
      subject.canvasIdUpdated({}, mockCanvasId); // blank object represents event.
      expect(subject.localState().canvasID).toEqual(mockCanvasId);
    });

    it('updateImageResourceStatus should show the resource status rendered appropriately', function() {
      var mockImageResourceObject1 = {
        id:2,
        url: 'aurl',
        getOpacity: function() {
          return 1;
        },
        getVisible: function() {
          return false;
        },
        getStatus: function() {
          return 'loaded';
        }
      };
      var mockImageResourceObject2 = {
        id:2,
        url: 'aurl',
        getOpacity: function() {
          return 1;
        },
        getVisible: function() {
          return false;
        },
        getStatus: function() {
          return 'requested';
        }
      };
      var mockImageResourceObject3 = {
        id:2,
        url: 'aurl',
        getOpacity: function() {
          return 1;
        },
        getVisible: function() {
          return false;
        },
        getStatus: function() {
          return 'initialized';
        }
      };
      var mockImageResourceObject4 = {
        id:2,
        url: 'aurl',
        getOpacity: function() {
          return 1;
        },
        getVisible: function() {
          return false;
        },
        getStatus: function() {
          return 'drawn';
        }
      };
      expect(this.element.find('.layers-list-item').last()).toHaveClass('requested');
      subject.updateImageResourceStatus({}, mockImageResourceObject1);
      expect(this.element.find('.layers-list-item').last()).toHaveClass('loaded');

      expect(this.element.find('.layers-list-item').last()).toHaveClass('loaded');
      subject.updateImageResourceStatus({}, mockImageResourceObject2);
      expect(this.element.find('.layers-list-item').last()).toHaveClass('requested');

      expect(this.element.find('.layers-list-item').last()).toHaveClass('requested');
      subject.updateImageResourceStatus({}, mockImageResourceObject3);
      expect(this.element.find('.layers-list-item').last()).toHaveClass('initialized');

      expect(this.element.find('.layers-list-item').last()).toHaveClass('initialized');
      subject.updateImageResourceStatus({}, mockImageResourceObject4);
      expect(this.element.find('.layers-list-item').last()).toHaveClass('drawn');
    });

    it('hideImageResource should set the visibility of the image resource to false', function() {
      var mockImageResourceObject = {
        id:1,
        url: 'aurl',
        getOpacity: function() {
          return 0.3;
        },
        getVisible: function() {
          return 'false';
        },
        getStatus: function() {
          return 'drawn';
        }
      };
      expect(this.element.find('.layers-listing li').first().find('.visibility-toggle')[0].checked).toBe(true);
      subject.hideImageResource({}, mockImageResourceObject); // empty object mocks event object in callback
      expect(this.element.find('.layers-listing li').first().find('.visibility-toggle')[0].checked).toBe(false);
    });

    it('showImageResource should set the visibility of the image resource to true', function() {
      var mockImageResourceObject = {
        id:2,
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
      };
      expect(this.element.find('.layers-listing li').last().find('.visibility-toggle')[0].checked).toBe(false);
      expect(this.element.find('.layers-listing li').last().find('.opacity-label')).toHaveClass('disabled');
      console.info(this.element.find('.layers-listing li').last().find('.opacity-label'));
      subject.showImageResource({}, mockImageResourceObject); // empty object mocks event object in callback
      expect(this.element.find('.layers-listing li').last().find('.opacity-label')).not.toHaveClass('disabled');
      expect(this.element.find('.layers-listing li').last().find('.visibility-toggle')[0].checked).toBe(true);
    });

    it('updateImageResourceOpacity should adjust the value of the slider bar', function() {
      var mockImageResourceObject = {
        id:2,
        url: 'aurl',
        getOpacity: function() {
          return 0.9;
        },
        getVisible: function() {
          return 'true';
        },
        getStatus: function() {
          return 'drawn';
        }
      };

      expect(this.element.find('.layers-listing li').last().find('.opacity-slider').val()).toEqual('100');
      subject.updateImageResourceOpacity({}, mockImageResourceObject); // empty object mocks event object in callback
      expect(this.element.find('.layers-listing li').last().find('.opacity-slider').val()).toEqual('90');
    });

    it('imageFocusUpdated should display the disabled message and not the default template', function() {
      expect(subject.localState().active).toBe(true);
      subject.imageFocusUpdated('ThumbnailsView');
      expect(subject.localState().active).toBe(false);
      subject.imageFocusUpdated('ImageView');
      expect(subject.localState().active).toBe(true);
      subject.imageFocusUpdated('ScrollView');
      expect(subject.localState().active).toBe(false);
    });

  });

  describe('render', function() {
    it('should hide itself if not visible', function() {
      spyOn(jQuery.fn, 'hide');
      subject.render({
        canvasID: 'https://oculus-dev.harvardx.harvard.edu/manifests/drs:5981093/canvas/canvas-5981094.json',
        active: true,
        visible: false
      });
      expect(subject.element.hide).toHaveBeenCalled();
      expect(this.element.find('.layers-listing').children().length).toEqual(2);
    });
  });
});
