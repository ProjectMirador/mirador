describe('Window', function() {
  describe('Basic Operation', function() {
    beforeEach(function() {
      this.appendTo = jQuery('<div/>');
      Mirador.viewer = {
        // all of this global state should be 
        // removed as soon as possible.
        annotationEndpoints: [],
        workspace: {
          slots: []
        }
      }
      spyOn(Mirador, 'ThumbnailsView').and.callFake(function() {
        this.updateImages = jasmine.createSpy();
        this.toggle = jasmine.createSpy();
        this.adjustHeight = jasmine.createSpy();
        this.updateFocusImages = jasmine.createSpy();
      });
      spyOn(Mirador, 'BookView').and.callFake(function() {
        this.updateImages = jasmine.createSpy();
        this.toggle = jasmine.createSpy();
        this.adjustHeight = jasmine.createSpy();
      });
      this.window = new Mirador.Window({
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
            '@id': '',
            'images':[{
            }]
          }];
          },
          getAnnotationsListUrl: function() {
            return undefined;
          },
          getStructures: function() {
            return [];
          }
        },
        appendTo: this.appendTo
      });
    });

    afterEach(function() {
      delete Mirador.viewer;
    });

    describe('Initialisation', function() {
      xit('should place itself in DOM', function() {
        expect(this.appendTo.find('.window')).toExist();
        expect(this.appendTo.find('.remove-object-option').css('display')).toBe('none');
        expect(this.appendTo.find('.book-option')).toExist();
        expect(this.appendTo.find('.scroll-option')).toExist();
        var calls = Mirador.ThumbnailsView.calls;
        expect(calls.count()).toBe(1);
        expect(calls.first().args[0].appendTo.is(this.appendTo.find('.view-container'))).toBe(true);
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
  });

  describe('Configuration', function() {

  });
})
