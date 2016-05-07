describe('Slot', function () {
  beforeEach(function () {
    var windowElement = jQuery('<div id="MOCK_WINDOW_1"/>');
    this.appendTo = jQuery('<div/>').append(windowElement);
    
    var mockWindow = {
      id: 'MOCK_WINDOW_1',
      element: windowElement
    };
    
    var windowConfig = {
      state: new Mirador.SaveController(Mirador.DEFAULT_SETTINGS)
    };
    
    this.slot = new Mirador.Slot({
      window: mockWindow
    });
  });

  describe('listenForActions', function () {
    it('should respond to windowRemoved', function () {
      var window = this.slot.window;
      expect(this.appendTo.find('#MOCK_WINDOW_1').size()).toBe(1);
      expect(window.element.attr('id')).toEqual('MOCK_WINDOW_1');
      jQuery.publish('windowRemoved', 'MOCK_WINDOW_1');
      expect(this.slot.window).toBe(undefined);
      expect(this.appendTo.find('#MOCK_WINDOW_1').size()).toBe(0);
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
    jQuery.publish('windowRemoved', 'MOCK_WINDOW_1');
    jQuery.publish('layoutChanged', {});
    jQuery.publish('HIDE_REMOVE_SLOT');
    jQuery.publish('SHOW_REMOVE_SLOT');
    jQuery.publish('ADD_ITEM_FROM_WINDOW', 'MOCK_WINDOW_1');
    jQuery.publish('REMOVE_SLOT_FROM_WINDOW', 'MOCK_WINDOW_1');
    jQuery.publish('SPLIT_RIGHT_FROM_WINDOW', 'MOCK_WINDOW_1');
    jQuery.publish('SPLIT_LEFT_FROM_WINDOW', 'MOCK_WINDOW_1');
    jQuery.publish('SPLIT_DOWN_FROM_WINDOW', 'MOCK_WINDOW_1');
    jQuery.publish('SPLIT_UP_FROM_WINDOW', 'MOCK_WINDOW_1');
    expect(this.slot.window).toBe(undefined); // Just checking all the above code didn't fail.
  });
});
