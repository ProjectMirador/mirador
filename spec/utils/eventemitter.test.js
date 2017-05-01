describe('EventEmitter', function () {

  beforeEach(function() {
    Mirador.EventEmitter.id = 0;
  });

  it('should initialize itself', function() {
    var em = new Mirador.EventEmitter();
    expect(em).toBeTruthy();
  });

  it('should have an identity andpublish, subscribe, and unsubscribe methods', function() {
    var em = new Mirador.EventEmitter();
    expect(typeof em.emitterId).toBe("number");
    expect(em.emitterId > 0).toBeTruthy();
    expect(em.publish).toBeTruthy();
    expect(em.subscribe).toBeTruthy();
    expect(em.unsubscribe).toBeTruthy();
  });
  
  it('should generate a unique id for each instance', function() {
    var em1 = new Mirador.EventEmitter();
    var em2 = new Mirador.EventEmitter();
    var em3 = new Mirador.EventEmitter();
    expect(em1.emitterId > 0).toBeTruthy();
    expect(em1.emitterId < em2.emitterId).toBeTruthy();
    expect(em2.emitterId < em3.emitterId).toBeTruthy();
  });

  it('should be able to publish and subscribe/unsubscribe to an event', function() {
    var em = new Mirador.EventEmitter();
    var obj = {callback: function() {}};
    var eventName = "some_mirador_test_event";

    spyOn(obj, 'callback');

    em.subscribe(eventName, obj.callback);
    em.publish(eventName);
    expect(obj.callback).toHaveBeenCalled();

    obj.callback.calls.reset();

    em.unsubscribe(eventName, obj.callback);
    em.publish(eventName);
    expect(obj.callback).not.toHaveBeenCalled();
  });

  it('should publish events with the unique ID', function() {
    var em = new Mirador.EventEmitter();
    var prefix = em.emitterId.toString() + "::";
    var eventName = 'foo';
    var obj = {callback:function() {}};

    spyOn(jQuery, 'subscribe');
    spyOn(jQuery, 'unsubscribe');
    spyOn(jQuery, 'publish');

    em.publish(eventName);
    expect(jQuery.publish).toHaveBeenCalledWith(prefix + eventName);

    em.subscribe(eventName, obj.callback);
    expect(jQuery.subscribe).toHaveBeenCalledWith(prefix + eventName, obj.callback);

    em.unsubscribe(eventName, obj.callback);
    expect(jQuery.unsubscribe).toHaveBeenCalledWith(prefix + eventName, obj.callback);
  });

  it('should log events when debug mode is enabled', function() {
    var em = new Mirador.EventEmitter({debug: true});
    var eventName = "foo";
    spyOn(console, 'log');
    em.publish(eventName);
    expect(console.log).toHaveBeenCalled();
  });

  it('should recognize trace option when logging events', function() {
    var em = new Mirador.EventEmitter({debug: true, trace: true});
    spyOn(console, 'trace');
    em.publish('foo');
    expect(console.trace).toHaveBeenCalled();
  });

  it('should recognize exclude patterns when logging events', function() {
    var em = new Mirador.EventEmitter({debug: true,
      debugExclude: ['hello'] 
    });
    spyOn(console, 'log');
    em.publish('hello_world');
    expect(console.log).not.toHaveBeenCalled();
    em.publish('goodbye_world');
    expect(console.log).toHaveBeenCalled();
  });

  it('should log when subscribed handlers are called in debug mode', function() {
    var em = new Mirador.EventEmitter({debug: true});
    var handler = jasmine.createSpy('spy');
    spyOn(console, 'log');
    em.subscribe('foo', handler);
    expect(console.log.calls.count()).toEqual(1); // trace from subscribe
    em.publish('foo');
    expect(console.log.calls.count()).toEqual(3); // trace from publish and handler
    expect(handler).toHaveBeenCalled();
  });
  
  it('should unsubscribe correctly when in debug mode', function() {
    var em = new Mirador.EventEmitter({debug: true});
    var handler = jasmine.createSpy('spy');
    spyOn(console, 'log');
    em.subscribe('foo', handler);
    em.publish('foo');
    expect(handler).toHaveBeenCalled();
    handler.calls.reset();
    em.unsubscribe('foo', handler);
    em.publish('foo');
    expect(handler).not.toHaveBeenCalled();
  });
});