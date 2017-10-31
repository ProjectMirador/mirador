describe('Window', function() {
  describe('Basic Operation', function() {
    beforeEach(function() {
      this.eventEmitter = new Mirador.EventEmitter();
      this.mockedEventEmitter = new MockEventEmitter(this.eventEmitter);
      this.appendTo = jQuery('<div/>');
      Mirador.viewer = {
        // all of this global state should be
        // removed as soon as possible.
        eventEmitter: this.mockedEventEmitter,
        annotationEndpoints: [],
        workspace: {
          slots: []
        }
      };
      spyOn(Mirador, 'ThumbnailsView').and.callFake(function() {
        this.updateImages = jasmine.createSpy();
        this.toggle = jasmine.createSpy();
        this.adjustHeight = jasmine.createSpy();
        this.updateFocusImages = jasmine.createSpy();
        this.updateImage = jasmine.createSpy();
      });
      spyOn(Mirador, 'ImageView').and.callFake(function() {
        this.toggle = jasmine.createSpy();
        this.adjustHeight = jasmine.createSpy();
        this.updateImage = jasmine.createSpy();
      });
      spyOn(Mirador, 'BookView').and.callFake(function() {
        this.updateImages = jasmine.createSpy();
        this.toggle = jasmine.createSpy();
        this.adjustHeight = jasmine.createSpy();
        this.updateImage = jasmine.createSpy();
      });

      var state = new Mirador.SaveController(jQuery.extend(true, {}, Mirador.DEFAULT_SETTINGS, {eventEmitter:this.eventEmitter}));
      this.window = new Mirador.Window(jQuery.extend(
        true,
        {},
        state.getStateProperty('windowSettings'),
        {
          state: state,
          eventEmitter: this.eventEmitter,
          manifest: {
            jsonLd: {
              sequences: [
                { viewingHint: 'paged',
                  canvases: [{
                    '@id': ''
                  }]
                }]
            },
            getCanvases: function() { return [{
              // This is an example of one canvas from richardson 7.
              label: "(seq. 3)",
              width: 4680,
              '@type': "sc:Canvas",
              images: [{
                resource: {
                  service: {
                    profile: "http://library.stanford.edu/iiif/image-api/1.1/conformance.html#level1",
                    '@context': "http://iiif.io/api/image/1/context.json",
                    '@id': "https://ids.lib.harvard.edu/ids/iiif/5981098"
                  },
                  format: "image/jpeg",
                  height: 5112,
                  width: 4680,
                  '@id': "https://ids.lib.harvard.edu/ids/iiif/5981098/full/full/0/native.jpg",
                  '@type': "dctypes:Image"
                },
                on: "https://iiif.lib.harvard.edu/manifests/drs:5981093/canvas/canvas-5981098.json",
                motivation: "sc:painting",
                '@id': "https://iiif.lib.harvard.edu/manifests/drs:5981093/annotation/anno-5981098.json",
                '@type': "oa:Annotation"
              }
                      ],
              height: 5112,
              '@id': "https://iiif.lib.harvard.edu/manifests/drs:5981093/canvas/canvas-5981098.json",
              thumbnail: {
                '@id': "https://ids.lib.harvard.edu/ids/iiif/5981098/full/,150/0/native.jpg",
                '@type': "dctypes:Image"
              }
            }, {
              '@id': "https://purl.stanford.edu/qm670kv1873/iiif/canvas/image_1",
              '@type': "sc:Canvas",
              label: "Upper board outside",
              height: 2236,
              width: 1732,
              images: [{
                '@id': "https://purl.stanford.edu/qm670kv1873/iiif/annotation/image_1",
                '@type': "oa:Annotation",
                motivation: "sc:painting",
                resource: {
                  '@id': "https://stacks.stanford.edu/image/iiif/qm670kv1873%2FW168_000001_300/full/full/0/default.jpg",
                  '@type': "dctypes:Image",
                  format: "image/jpeg",
                  height: 2236,
                  width: 1732,
                  service: {
                    '@context': "http://iiif.io/api/image/2/context.json",
                    '@id': "https://stacks.stanford.edu/image/iiif/qm670kv1873%2FW168_000001_300",
                    profile: "http://iiif.io/api/image/2/level1.json"
                  }
                },
                on: "https://purl.stanford.edu/qm670kv1873/iiif/canvas/image_1"
              }]
            }];
                                    },
            getAnnotationsListUrls: function() {
              return [];
            },
            getStructures: function() {
              return [];
            },
            getVersion: function() {
              return '1';
            },
            getViewingDirection: function() {
              return 'right-to-left';
            }
          },
          appendTo: this.appendTo,
          userButtons: [{
            'iconClass': 'fa-file-text-o',
            'attributes': {
              'class': 'mirador-icon-text',
              'href': 'http://example.com',
              'target': '_blank'
            }
          }]
        }));
    });

    afterEach(function() {
      delete Mirador.viewer;
    });

    describe('Initialisation', function() {
      it('should build the canvases index', function() {
        expect(this.window.canvases['https://iiif.lib.harvard.edu/manifests/drs:5981093/canvas/canvas-5981098.json']).not.toBe('undefined');
        expect(Object.keys(this.window.canvases).length).toEqual(2);
        expect(typeof this.window.canvases['https://iiif.lib.harvard.edu/manifests/drs:5981093/canvas/canvas-5981098.json'].getBounds).toBe('function');
      });
      it('should place itself in DOM', function() {
        expect(true).toBe(true);
        expect(this.appendTo.find('.window')).toExist();
        expect(this.appendTo.find('.remove-object-option').css('display')).toBe('none');
        expect(this.appendTo.find('.book-option')).toExist();
        expect(this.appendTo.find('.scroll-option')).toExist();
        var calls = Mirador.ImageView.calls;
        expect(calls.count()).toBe(1);
        expect(calls.first().args[0].appendTo.is(this.appendTo.find('.view-container'))).toBe(true);
      });

      it('should place default buttons in DOM', function(){
        expect(this.appendTo.find('.mirador-icon-view-type')).toExist();
        expect(this.appendTo.find('.mirador-icon-metadata-view')).toExist();
        expect(this.appendTo.find('.mirador-osd-fullscreen')).toExist();
      });

      it('should place user buttons in DOM', function(){
        expect(this.appendTo.find('.mirador-icon-text')).toExist();
        expect(this.appendTo.find('.mirador-icon-text').attr('href')).toBe('http://example.com');
        expect(this.appendTo.find('.mirador-icon-text').attr('target')).toBe('_blank');
        expect(this.appendTo.find('.mirador-icon-text').has('i.fa.fa-lg.fa-fw.fa-file-text-o').length).toBe(1);
      });
    });

    describe('Menu Events', function() {
      xit('should change to book view when button is clicked', function() {
        expect(this.appendTo.find('.book-option')).toExist();
        expect(this.window.focusModules.BookView).toBe(null);
        this.appendTo.find('.book-option').trigger('click');
        var calls = Mirador.BookView.calls;
        var bottomPanelCalls = this.window.bottomPanel.updateFocusImages.calls;
        expect(calls.count()).toBe(1);
        expect(bottomPanelCalls.count()).toBe(1);
      });
    });

    describe('r-t-l viewing', function() {
      it('causes the imagesList ordering to be reversed and the derivative lists to be generated', function() {
        expect(this.window.imagesListRtl[0]).toBe(this.window.imagesList[this.window.imagesList.length-1]);
        expect(this.window.vDirectionStatus).toBe('rtl');
      });
    });

    describe('Navigation events', function() {
      it('changing the canvasID changes the focused canvasModel', function() {
        expect(this.window.canvasID).toEqual('https://iiif.lib.harvard.edu/manifests/drs:5981093/canvas/canvas-5981098.json');
        this.window.setCurrentCanvasID('https://purl.stanford.edu/qm670kv1873/iiif/canvas/image_1');
        expect(this.window.canvasID).toEqual('https://purl.stanford.edu/qm670kv1873/iiif/canvas/image_1');
        this.eventEmitter.publish('SET_CURRENT_CANVAS_ID.' + this.window.id, 'https://iiif.lib.harvard.edu/manifests/drs:5981093/canvas/canvas-5981098.json');
        expect(this.window.canvasID).toEqual('https://iiif.lib.harvard.edu/manifests/drs:5981093/canvas/canvas-5981098.json');
      });
    });

    describe('Destroying', function () {

      it('should respond to windowRemoved', function () {
        spyOn(this.window,'destroy');
        this.eventEmitter.publish('windowRemoved', this.window.id);
        expect(this.window.destroy).toHaveBeenCalled();
      });

      it('should unsubscribe from all events', function () {
        this.window.destroy();
        for(var key in this.window.eventEmitter.events){
          expect(this.window.eventEmitter.events[key]).toBe(0);
        }
      });

      it('should remove dom element',function(){
        this.window.destroy();
        expect(this.appendTo.find('.window').length).toBe(0);
      });

    });

  });

  describe('Configuration', function() {

  });
});
