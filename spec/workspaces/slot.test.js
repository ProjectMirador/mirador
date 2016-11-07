describe('Slot', function () {
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

    this.slot = new Mirador.Slot({
      window: mockWindow,
      eventEmitter: this.eventEmitter
    });
  });

  describe('listenForActions', function () {
    it('should respond to windowRemoved', function () {
      var window = this.slot.window;
      expect(this.appendTo.find('#MOCK_WINDOW_1').length).toBe(1);
      expect(window.element.attr('id')).toEqual('MOCK_WINDOW_1');
      this.eventEmitter.publish('windowRemoved', 'MOCK_WINDOW_1');
      expect(this.slot.window).toBe(undefined);
      expect(this.appendTo.find('#MOCK_WINDOW_1').length).toBe(0);
    });
  });

  xit('bindEvents', function () {
  });
  xit('dropItem', function () {
  });
  xit('clearSlot', function () {
  });
  xit('getAddress', function () {
  });
  xit('addItem', function () {
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
