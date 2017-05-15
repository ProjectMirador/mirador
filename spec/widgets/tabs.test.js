describe('Tabs', function() {
  var subject;
  beforeEach(function() {
    jQuery('body').append('<div id="mytabs"></div>');
    this.sandbox = jQuery('#mytabs');
    this.windowId = '380c9e54-7561-4010-a99f-f132f5dc13fd';
    this.eventEmitter = new Mirador.EventEmitter();
    this.tabList = [{
      name : 'toc',
      options : {
        available: true,
        id:'tocTab', 
        label:'Index'
      }
    },
    {
      name : 'layers',
      options : {
        available: true,
        id:'layersTab', 
        label:'Layers'
      }
    }];
    this.tabs = new Mirador.Tabs({
      appendTo: this.sandbox,
      windowId: this.windowId,
      tabs: this.tabList,
      eventEmitter: this.eventEmitter
    });
    subject = this.tabs;
  });

  afterEach(function() {
    delete this.tabs;
    this.sandbox.remove();
  });

  describe('Initialization', function() {
    it('should initialize with multiple tabs', function() {
      expect(true).toBe(true); //Force beforeEach() to run
      expect($('.tab').length).toEqual(2);
    });
    it('should initialize with Mirador defaults', function() {
      this.sandbox.html('');
      this.tabs = new Mirador.Tabs({
        appendTo: this.sandbox,
        windowId: this.windowId,
        tabs: [{
          name : 'toc',
          options : {
            available: true,
            id:'tocTab', 
            label:'Index'
          }
        },
        {
          name : 'layers',
          options : {
            available: false,
            id:'layersTab', 
            label:'Layers'
          }
        }],
        eventEmitter: this.eventEmitter
      });
      subject = this.tabs;
      expect($('.tab').length).toEqual(0);
    });
  });

  describe('state', function() {
    var target_state 
    beforeEach(function() {
      target_state = {};
      jQuery.extend(target_state, subject.tabState, {
        additional_key: true
      });
    });
    it('should return the state as-is when given no arguments', function() {
      expect(subject.state()).toEqual(subject.tabState);
      expect(subject.state()).not.toEqual(target_state);
   });
    it('should set and return the new state when given arguments', function() {
      expect(subject.state(target_state, true)).toEqual(target_state);
      expect(subject.state()).toEqual(target_state);
    });
    it('should publish a annotationsTabStateUpdated event on non-initial setup', function() {
      spyOn(this.eventEmitter, 'publish');
      expect(subject.state(target_state, false)).toEqual(target_state);
      expect(this.eventEmitter.publish).toHaveBeenCalledWith('tabStateUpdated.' + this.windowId, target_state);
      expect(subject.state()).toEqual(target_state);
    });
  });

  describe('tabSelected', function() {
    jQuery.each([0, 1], function(k, i) {
      it('should switch to tab ' + i, function() {
        subject.tabSelected(i);
        expect(subject.state().selectedTabIndex).toEqual(i);
      });
    });
  });

  describe('getTemplateData', function() {
    it('returns annotation and TOC tab info', function() {
      expect(Object.keys(subject.getTemplateData())).toEqual(['annotationsTab', 'tocTab', 'searchTab']);
    });
  });

  describe('listenForActions', function() {
    it('should re-render upon a tabStateUpdated event', function() {
      spyOn(subject, 'render');
      this.eventEmitter.publish('tabStateUpdated.' + this.windowId, { stuff: 'dummyData' });
      expect(subject.render).toHaveBeenCalledWith({stuff:'dummyData'});
    });
    it('should re-select tabs upon a tabSelected event', function() {
      spyOn(subject, 'tabSelected');
      this.eventEmitter.publish('tabSelected.' + this.windowId, 2);
      expect(subject.tabSelected).toHaveBeenCalledWith(2);
    });
  });

  describe('bindEvents', function() {
    it('should fire tabSelected for clicking on a tab', function() {
      spyOn(subject.eventEmitter, 'publish').and.callThrough();
      jQuery.each([0, 1], function(_, i) {
        subject.element.find('.tab').eq(i).click();
        expect(subject.eventEmitter.publish).toHaveBeenCalledWith('tabSelected.' + subject.windowId, i);
        expect(subject.state().selectedTabIndex).toEqual(i);
      });
    });
  });

  describe('render', function() {
    describe('Re-renders', function() {
      it('should change tab selection', function() {
        subject.render({
          tabs : this.tabList,
          selectedTabIndex: 1
        });
        expect($('.tab').first()).not.toHaveClass('selected');
        expect($('.tab').eq(1)).toHaveClass('selected');
      });
    });
    describe('From scratch', function() {
      beforeEach(function() {
        this.sandbox.html('');
        subject.element = null;
      });
      it('should hide tab selection if only one is available', function() {
        this.tabList[1].options.available = false;
        subject.hasStructures = false;
        spyOn(subject.eventEmitter, 'publish');
        subject.render({
          tabs: this.tabList,
          selectedTabIndex: 0
        });
        expect(subject.eventEmitter.publish).toHaveBeenCalledWith('sidePanelVisibilityByTab.'+subject.windowId, false);
        expect(subject.element.find('.tab')).not.toBeInDOM();
      });
    });
  });

  xdescribe('toggle', function() {

  });
}); 
