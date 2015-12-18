paper.install(window);

describe('Overlay', function() {

  function getEvent(delta, point, event) {
    return {
      'delta': delta,
      'point': point,
      'event': event
    };
  }

  function getOverlay(paperScope, strokeColor, fillColor, fillColorAlpha, mode, path, segment) {
    return {
      'paperScope': paperScope,
      'strokeColor': strokeColor,
      'fillColor': fillColor,
      'fillColorAlpha': fillColorAlpha,
      'mode': mode,
      'path': path,
      'segment': segment,
      'hitOptions': {
        'fill': true,
        'stroke': true,
        'segments': true,
        'tolerance': 0
      },
      onDrawFinish: function() {
      },
      getName: function(tool) {
        return tool.idPrefix + '1';
      }
    };
  }

  beforeEach(function() {
    //register Handlebars helper
    Handlebars.registerHelper('t', function(i18n_key) {
      var result = i18n.t(i18n_key);
      return new Handlebars.SafeString(result);
    });

    var id = 'test';
    this.canvas = jQuery('<canvas></canvas>');
    this.canvas.attr('id', 'draw_canvas_' + id);
    jasmine.getFixtures().set(this.canvas);
    this.windowObjMock = {
      'windowId': id,
      'viewer': {
        'id': 'viewerId'
      }
    };
    this.viewerMock = {
      'canvas': {
        'appendChild': function() {
        }
      },
      'viewport': {
        'getZoom': function() {
          return 1.0;
        },
        'pixelFromPoint': function(point, current) {
          return point;
        },
        'containerSize': {
          'x': 800,
          'y': 600
        },
        'contentSize': {
          'x': 800,
          'y': 600
        }
      },
      'addHandler': function(eventName, functionBody) {
      }
    };
    this.overlay = new Mirador.Overlay(this.viewerMock, this.windowObjMock);
  });

  afterEach(function() {
    delete this.overlay;
  });

  it('toggleDrawingTool', function() {
    jQuery.publish('toggleDrawingTool.' + this.windowObjMock.windowId, [null]);

    expect(this.overlay.currentTool).toBeNull();

    this.pin = new Mirador.Pin();
    this.overlay.disabled = true;
    jQuery.publish('toggleDrawingTool.' + this.windowObjMock.windowId, [this.pin.logoClass]);

    expect(this.overlay.currentTool).toBeNull();

    this.overlay.disabled = false;
    jQuery.publish('toggleDrawingTool.' + this.windowObjMock.windowId, [this.pin.logoClass]);

    expect(this.overlay.currentTool).not.toBeNull();
    expect(this.overlay.currentTool.logoClass).toBe(this.pin.logoClass);
  });

  it('changeBorderColor', function() {
    var color = '#ff0000';
    jQuery.publish('changeBorderColor.' + this.windowObjMock.windowId, [color]);

    expect(this.overlay.strokeColor).toBe(color);

    color = '#00ff00';
    this.rectangle = new Mirador.Rectangle();
    var initialPoint = {
      'x': 123,
      'y': 456
    };
    var overlay = getOverlay(paper, '#ff0000', '#00ff00', 1.0, null, null, null);
    this.overlay.hoveredPath = this.rectangle.createShape(initialPoint, overlay);

    expect(this.overlay.hoveredPath.strokeColor.red).toBe(1);
    expect(this.overlay.hoveredPath.strokeColor.green).toBe(0);
    expect(this.overlay.hoveredPath.strokeColor.blue).toBe(0);

    jQuery.publish('changeBorderColor.' + this.windowObjMock.windowId, [color]);

    expect(this.overlay.strokeColor).toBe(color);
    expect(this.overlay.hoveredPath.strokeColor.red).toBe(0);
    expect(this.overlay.hoveredPath.strokeColor.green).toBe(1);
    expect(this.overlay.hoveredPath.strokeColor.blue).toBe(0);
  });

  it('changeFillColor', function() {
    var color = '#00ff00';
    var alpha = 0.0;
    jQuery.publish('changeFillColor.' + this.windowObjMock.windowId, [color, alpha]);

    expect(this.overlay.fillColor).toBe(color);
    expect(this.overlay.fillColorAlpha).toBe(alpha);

    color = '#ff0000';
    alpha = 0.5;
    this.rectangle = new Mirador.Rectangle();
    var initialPoint = {
      'x': 123,
      'y': 456
    };
    var overlay = getOverlay(paper, '#ff0000', '#00ff00', 1.0, null, null, null);
    this.overlay.hoveredPath = this.rectangle.createShape(initialPoint, overlay);

    expect(this.overlay.hoveredPath.fillColor.red).toBe(0);
    expect(this.overlay.hoveredPath.fillColor.green).toBe(1);
    expect(this.overlay.hoveredPath.fillColor.blue).toBe(0);
    expect(this.overlay.hoveredPath.fillColor.alpha).toBe(1);

    jQuery.publish('changeFillColor.' + this.windowObjMock.windowId, [color, alpha]);

    expect(this.overlay.fillColor).toBe(color);
    expect(this.overlay.fillColorAlpha).toBe(alpha);
    expect(this.overlay.hoveredPath.fillColor.red).toBe(1);
    expect(this.overlay.hoveredPath.fillColor.green).toBe(0);
    expect(this.overlay.hoveredPath.fillColor.blue).toBe(0);
    expect(this.overlay.hoveredPath.fillColor.alpha).toBe(0.5);

    this.polygon = new Mirador.Polygon();
    this.overlay.hoveredPath = this.polygon.createShape(initialPoint, overlay);

    expect(this.overlay.hoveredPath.fillColor).toBeUndefined();

    jQuery.publish('changeFillColor.' + this.windowObjMock.windowId, [color, alpha]);

    expect(this.overlay.hoveredPath.fillColor).toBeUndefined();
  });

  it('getTools', function() {
    expect(Mirador.svgOverlayTools).not.toBeNull();

    var cache = Mirador.svgOverlayTools;
    var newTools = Mirador.getTools();

    expect(cache.length).toBe(newTools.length);
    for (var i = 0; i < cache.length; i++) {
      expect(cache[i]).toBe(newTools[i]);
    }
  });

  it('onDrawFinish', function() {
    this.rectangle = new Mirador.Rectangle();
    var initialPoint = {
      'x': 123,
      'y': 456
    };
    var overlay = getOverlay(paper, '#ff0000', '#00ff00', 1.0, null, null, null);
    this.overlay.hoveredPath = this.rectangle.createShape(initialPoint, overlay);
    this.overlay.onDrawFinish();

    expect(this.overlay.hoveredPath).not.toBeNull();
    expect(this.overlay.hoveredPath).not.toBe(this.overlay.path);

    this.overlay.path = this.rectangle.createShape(initialPoint, overlay);
    this.overlay.onDrawFinish();

    expect(this.overlay.hoveredPath).not.toBeNull();
    expect(this.overlay.hoveredPath).not.toBe(this.overlay.path);

    var comment = this.overlay.commentPanel;
    this.overlay.hoveredPath = null;
    this.overlay.path = this.rectangle.createShape(initialPoint, overlay);
    this.overlay.onDrawFinish();

    expect(this.overlay.hoveredPath).not.toBeNull();
    expect(this.overlay.hoveredPath).not.toBe(this.overlay.path);
    expect(this.overlay.commentPanel).toBe(comment);
  });

  it('onMouseUp', function() {
    this.rectangle = new Mirador.Rectangle();
    spyOn(this.rectangle, 'onMouseUp');
    var event = getEvent({
      'x': 100,
      'y': 100
    });
    this.overlay.overlay = this.overlay;
    this.overlay.onMouseUp(event);

    expect(this.rectangle.onMouseUp.calls.count()).toEqual(0);

    this.overlay.currentTool = this.rectangle;
    this.overlay.onMouseUp(event);

    expect(this.rectangle.onMouseUp.calls.count()).toEqual(1);
  });

  it('onMouseDrag', function() {
    this.rectangle = new Mirador.Rectangle();
    spyOn(this.rectangle, 'onMouseDrag');
    var event = getEvent({
      'x': 100,
      'y': 100
    });
    this.overlay.overlay = this.overlay;
    this.overlay.onMouseDrag(event);

    expect(this.rectangle.onMouseDrag.calls.count()).toEqual(0);

    this.overlay.currentTool = this.rectangle;
    this.overlay.onMouseDrag(event);

    expect(this.rectangle.onMouseDrag.calls.count()).toEqual(1);
  });

  it('onMouseMove', function() {
    this.rectangle = new Mirador.Rectangle();
    spyOn(this.rectangle, 'onMouseMove');
    var event = getEvent({
      'x': 100,
      'y': 100
    }, {}, {
      'clientX': 100,
      'clientX': 100
    });
    this.overlay.overlay = this.overlay;
    this.overlay.onMouseMove(event);

    expect(this.rectangle.onMouseMove.calls.count()).toEqual(0);

    this.overlay.currentTool = this.rectangle;
    this.overlay.onMouseMove(event);

    expect(this.rectangle.onMouseMove.calls.count()).toEqual(1);
  });

  it('onDoubleClick', function() {
    this.rectangle = new Mirador.Rectangle();
    spyOn(this.rectangle, 'onDoubleClick');
    var event = getEvent({
      'x': 100,
      'y': 100
    });
    this.overlay.overlay = this.overlay;
    this.overlay.onDoubleClick(event);

    expect(this.rectangle.onDoubleClick.calls.count()).toEqual(0);

    this.overlay.currentTool = this.rectangle;
    this.overlay.onDoubleClick(event);

    expect(this.rectangle.onDoubleClick.calls.count()).toEqual(1);
  });
});