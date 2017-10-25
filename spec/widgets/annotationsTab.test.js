describe('AnnotationsTab', function() {
  var subject;

  beforeEach(function() {
    jasmine.getJSONFixtures().fixturesPath = 'spec/fixtures';
    this.fixture = getJSONFixture('Richardson7manifest.json');
    this.element = document.createElement('div', {
      class: 'tab-container',
      id: 'annotationsTab'
    });
    this.eventEmitter = new Mirador.EventEmitter();
    this.manifest = new Mirador.Manifest(
      this.fixture['@id'], 'IIIF', this.fixture
    );
    this.imagesList = this.manifest.getCanvases();
    this.windowId = '380c9e54-7561-4010-a99f-f132f5dc13fd';
    this.annotationLists
    this.annotationsTab = new Mirador.AnnotationsTab({
      manifest: this.manifest,
      appendTo: this.element,
      visible: true,
      windowId: this.windowId,
      eventEmitter: this.eventEmitter,
      imagesList: this.imagesList
    });
    subject = this.annotationsTab;
  });

  afterEach(function() {
    delete this.annotationssTab;
  });

  describe('localState', function() {
    var target_state = {
      id: 'annotationsTab',
      visible: true,
      additional_key: true
    };
    it('should return the state as-is when given no arguments', function() {
      expect(subject.localState()).toEqual(subject.annoTabState);
      expect(subject.localState()).not.toEqual(target_state);
   });
    it('should set and return the new state when given arguments', function() {
      expect(subject.localState(target_state, true)).toEqual(target_state);
      expect(subject.localState()).toEqual(target_state);
    });
    it('should publish a annotationsTabStateUpdated event on non-initial setup', function() {
      spyOn(this.eventEmitter, 'publish');
      expect(subject.localState(target_state, false)).toEqual(target_state);
      expect(this.eventEmitter.publish).toHaveBeenCalledWith('annotationsTabStateUpdated.' + this.windowId, target_state);
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

  describe('annotationListLoaded', function() {
    beforeEach(function() {
      subject.state = {
        getWindowAnnotationsList: jasmine.createSpy('getWindowAnnotationsList').and.returnValue([
          { endpoint: 'dummy' },
          { endpoint: 'dummyUrl' },
          { endpoint: { name: 'endpointName' }}
        ])
      };
    });
    it('should correctly set local state', function() {
      subject.annotationListLoaded();
      expect(subject.localState().annotationLists[0]).toEqual(jasmine.objectContaining({ selected: false }));
      // expect(subject.localState().annotationLists[1]).toEqual(jasmine.objectContaining({ selected: false }));
    });
  });

  describe('List selection', function() {
    var dummyState;
    beforeEach(function() {
      dummyState = {
        selectedList: null,
        focusedList: null,
        annotationLists: [
          { annotationSource: 'boo', selected: false },
          { annotationSource: 'hoo', selected: false }
        ]
      };
      spyOn(subject, 'localState').and.callFake(function(arg) {
        if (!arguments.length) return dummyState; else dummyState=arg;
      });
    });
    it('should deselect a list', function() {
      dummyState.selectedList = 'boo';
      dummyState.annotationLists[0].selected = true;
      subject.deselectList('boo');
      expect(dummyState.selectedList).toBe(null);
      expect(dummyState.annotationLists[0].selected).toBe(false);
      expect(dummyState.annotationLists[1].selected).toBe(false);
    });
    it('should select a list', function() {
      subject.selectList('hoo');
      expect(dummyState.selectedList).toBe('hoo');
      expect(dummyState.annotationLists[0].selected).toBe(false);
      expect(dummyState.annotationLists[1].selected).toBe(true);
    });
    it('should focus a list', function() {
      subject.focusList('hoo');
      expect(dummyState.focusedList).toBe('hoo');
      expect(dummyState.annotationLists[0].focused).toBe(false);
      expect(dummyState.annotationLists[1].focused).toBe(true);
    });
  });

  xdescribe('toggle', function() {

  });

  describe('listenForActions', function() {
    it('should run tabStateUpdated upon getting a tabStateUpdated event', function() {
      var data = {
        selectedTabIndex: 0,
        tabs: [
          {
            options: {
              id: 'annotationsTab'
            }
          },
          {
            options: {
              id: 'someOtherTab'
            }
          }
        ]
      };
      spyOn(subject, 'tabStateUpdated');
      subject.eventEmitter.publish('tabStateUpdated.' + this.windowId, data);
      expect(subject.tabStateUpdated).toHaveBeenCalledWith(true);
    });
    it('should rerender upon getting a annotationsTabStateUpdated event', function() {
      var data = { visible: false };
      spyOn(subject, 'render');
      subject.eventEmitter.publish('annotationsTabStateUpdated.' + this.windowId, data);
      expect(subject.render).toHaveBeenCalledWith(data);
    })
    it('should run annotationListLoaded upon getting an annotationListLoaded event', function() {
      spyOn(subject, 'annotationListLoaded');
      subject.eventEmitter.publish('annotationListLoaded.' + this.windowId, {});
      expect(subject.annotationListLoaded).toHaveBeenCalled();
    });
    it('should run selectList upon getting a currentCanvasIDUpdated or listSelected event', function() {
      spyOn(subject, 'selectList');
      jQuery.each(['currentCanvasIDUpdated.', 'listSelected.'], function(_, ev) {
        subject.eventEmitter.publish(ev + subject.windowId, {});
        expect(subject.selectList).toHaveBeenCalled();
        subject.selectList.calls.reset();
      });
    });
    it('should run deselectList upon getting a listDeselected event', function() {
      spyOn(subject, 'deselectList');
      subject.eventEmitter.publish('listDeselected.' + this.windowId, 'sampleListId');
      expect(subject.deselectList).toHaveBeenCalledWith('sampleListId');
    });
  });

  describe('bindEvents', function() {
    beforeEach(function() {
      $('<span class="annotationListItem">waahoo1</span>').data('id', 'glub1').appendTo(subject.element);
      $('<span class="annotationListItem">waahoo2</span>').data('id', 'glub2').appendTo(subject.element);
      spyOn(this.eventEmitter, 'publish');
      subject.bindEvents();
    });
    // it('should deselect a selected item when re-clicked', function() {
    //   subject.localState({ selectedList: 'glub1' });
    //   subject.element.find('.annotationListItem').first().click();
    //   expect(this.eventEmitter.publish).toHaveBeenCalledWith('listDeselected.' + this.windowId, 'glub1');
    // });
    // it('should select an unselected item when clicked', function() {
    //   subject.localState({ selectedList: 'glub2' });
    //   subject.element.find('.annotationListItem').first().click();
    //   expect(this.eventEmitter.publish).toHaveBeenCalledWith('listSelected.' + this.windowId, 'glub1');
    // });
  });

  describe('render', function() {
    it('should hide itself if not visible', function() {
      spyOn(jQuery.fn, 'hide');
      subject.render({ visible: false });
      expect(subject.element.hide).toHaveBeenCalled();
    });
  });
});
