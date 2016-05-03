paper.install(window);

describe('Overlay', function() {

  function getEvent(delta, point, event) {
    return {
      'delta': delta,
      'point': point,
      'event': event,
      'stopPropagation': function() {
      }
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
      'doubleClickReactionTime': 300,
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
        getBounds: function() {
          return {x:0, y:0, width:10, height: 10};
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
    var drawingToolsSettings = {
      'doubleClickReactionTime': 300,
      'strokeColor': 'deepSkyBlue',
      'fillColor': 'deepSkyBlue',
      'fillColorAlpha': 0.0
    };
    var state = new Mirador.SaveController({});
    this.overlay = new Mirador.Overlay(this.viewerMock, this.windowObjMock.viewer.id, this.windowObjMock.windowId, state);
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

  it('toggleDefaultDrawingTool', function() {
    jQuery.publish('toggleDefaultDrawingTool.' + this.windowObjMock.windowId, []);

    expect(this.overlay.currentTool).toBeNull();

    this.overlay.disabled = false;
    this.rectangle = new Mirador.Rectangle();
    this.overlay.availableAnnotationDrawingTools = ['Rectangle', 'Pin'];
    jQuery.publish('toggleDefaultDrawingTool.' + this.windowObjMock.windowId, []);

    expect(this.overlay.currentTool).not.toBeNull();
    expect(this.overlay.currentTool.logoClass).toBe(this.rectangle.logoClass);
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
    this.overlay.disabled = true;
    this.overlay.onMouseUp(event);

    expect(this.rectangle.onMouseUp.calls.count()).toEqual(0);

    this.overlay.currentTool = this.rectangle;
    this.overlay.disabled = false;
    this.overlay.onMouseUp(event);

    expect(this.rectangle.onMouseUp.calls.count()).toEqual(1);
  });

  it('onMouseDrag', function() {
    this.rectangle = new Mirador.Rectangle();
    spyOn(this.rectangle, 'onMouseDrag');
    var event = getEvent({
      'x': 100,
      'y': 100
    }, {}, {
      'clientX': 100,
      'clientX': 100
    });
    this.overlay.overlay = this.overlay;
    this.overlay.disabled = true;
    this.overlay.onMouseDrag(event);

    expect(this.rectangle.onMouseDrag.calls.count()).toEqual(0);

    this.overlay.currentTool = this.rectangle;
    this.overlay.disabled = false;
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
    this.overlay.disabled = true;
    this.overlay.onMouseMove(event);

    expect(this.rectangle.onMouseMove.calls.count()).toEqual(0);

    this.overlay.currentTool = this.rectangle;
    this.overlay.disabled = false;
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

  it('onMouseDown', function() {
    this.rectangle = new Mirador.Rectangle();
    spyOn(this.rectangle, 'onMouseDown');
    spyOn(this.rectangle, 'onDoubleClick');
    var event = getEvent({
      'x': 100,
      'y': 100
    }, {
      'x': 100,
      'y': 100
    });
    var date = new Date();
    this.overlay.latestMouseDownTime = date.getTime();
    this.overlay.overlay = this.overlay;
    this.overlay.disabled = true;
    this.overlay.onMouseDown(event);

    expect(this.rectangle.onMouseDown.calls.count()).toEqual(0);
    expect(this.rectangle.onDoubleClick.calls.count()).toEqual(0);

    this.overlay.currentTool = this.rectangle;
    this.overlay.disabled = false;
    this.overlay.onMouseDown(event);

    expect(this.rectangle.onMouseDown.calls.count()).toEqual(0);
    expect(this.rectangle.onDoubleClick.calls.count()).toEqual(1);

    this.overlay.latestMouseDownTime -= 2 * this.overlay.doubleClickReactionTime;
    this.overlay.onMouseDown(event);

    expect(this.rectangle.onMouseDown.calls.count()).toEqual(1);
    expect(this.rectangle.onDoubleClick.calls.count()).toEqual(1);

    // click without hovering items
    this.overlay.latestMouseDownTime -= 2 * this.overlay.doubleClickReactionTime;
    this.overlay.currentTool = undefined;
    this.overlay.onMouseDown(event);

    expect(this.rectangle.onMouseDown.calls.count()).toEqual(1);
    expect(this.rectangle.onDoubleClick.calls.count()).toEqual(1);

    // hover item
    event.item = this.rectangle.createShape(event.point, this.overlay);
    this.overlay.latestMouseDownTime -= 2 * this.overlay.doubleClickReactionTime;
    this.overlay.currentTool = this.rectangle;
    this.overlay.onMouseDown(event);

    expect(this.rectangle.onMouseDown.calls.count()).toEqual(2);
    expect(this.rectangle.onDoubleClick.calls.count()).toEqual(1);

    // hover new item and add to edited paths
    event.item = this.rectangle.createShape(event.point, this.overlay);
    this.overlay.latestMouseDownTime -= 2 * this.overlay.doubleClickReactionTime;
    this.overlay.mode = 'translate';
    this.overlay.path = event.item;
    this.overlay.path.data.annotation = '<svg>stored svg</svg>';
    this.overlay.onMouseDown(event);

    expect(this.rectangle.onMouseDown.calls.count()).toEqual(3);
    expect(this.rectangle.onDoubleClick.calls.count()).toEqual(1);

    // hover new item
    this.overlay.latestMouseDownTime -= 2 * this.overlay.doubleClickReactionTime;
    this.overlay.onMouseDown(event);

    expect(this.rectangle.onMouseDown.calls.count()).toEqual(4);
    expect(this.rectangle.onDoubleClick.calls.count()).toEqual(1);

    this.overlay.restoreEditedShapes();
    this.overlay.restoreDraftShapes();

    this.overlay.latestMouseDownTime -= 2 * this.overlay.doubleClickReactionTime;
    this.overlay.hoveredPath = this.rectangle.createShape(event.point, this.overlay);
    this.overlay.segment = this.overlay.hoveredPath.segments[0];
    this.overlay.path = this.overlay.hoveredPath;
    event = getEvent({
      'x': 1000,
      'y': 1000
    }, {
      'x': 1000,
      'y': 1000
    });
    this.ellipse = new Mirador.Ellipse();
    var newShape = this.ellipse.createShape(event.point, this.overlay);
    this.overlay.mode = '';

    this.overlay.onMouseDown(event);

    expect(this.overlay.hoveredPath).toBe(newShape);
    expect(this.overlay.segment).toBe(newShape.segments[0]);
    expect(this.overlay.path).toBe(newShape);
    expect(this.overlay.mode).toEqual('deform');
  });

  it('parseSVG', function() {
    var svg = '<svg xmlns="http://www.w3.org/2000/svg"><g><path d="M207.55023,187.98214l143.12613,0l143.12613,0l0,97.81055l0,97.81055l-143.12613,0l-143.12613,0l0,-97.81055z" data-paper-data="{&quot;rotation&quot;:0,&quot;annotation&quot;:null}" id="rectangle_154807a4-4121-43f0-a920-5e6792523959" fill-opacity="0.5" fill="#008000" stroke="#ff0000" stroke-width="1" stroke-linecap="butt" stroke-linejoin="miter" stroke-miterlimit="10" stroke-dasharray="" stroke-dashoffset="0" font-family="sans-serif" font-weight="normal" font-size="12" text-anchor="start" mix-blend-mode="normal"/><path xmlns="http://www.w3.org/2000/svg" d="M465.02563,80.868c27.12902,-14.80678 65.56711,-23.45636 103.98969,-23.45148c38.42258,0.00488 76.82965,8.66424 103.98969,23.45148c27.16004,14.78724 43.07305,35.70236 43.07394,56.61687c0.00089,20.91451 -15.91035,41.82842 -43.07394,56.61687c-27.16359,14.78845 -66.01382,23.21455 -103.98969,23.45148c-37.97587,0.23693 -76.58764,-8.53597 -103.98969,-23.45148c-27.40205,-14.91551 -43.17951,-35.75374 -43.07394,-56.61687c0.10556,-20.86313 15.94492,-41.81009 43.07394,-56.61687z" data-paper-data="{&quot;rotation&quot;:0,&quot;annotation&quot;:null}" id="circle_3c667714-d8cf-4b52-80eb-d22e863cf486" fill-opacity="0.5" fill="#008000" stroke="#ff0000" stroke-width="1" stroke-linecap="butt" stroke-linejoin="miter" stroke-miterlimit="10" stroke-dasharray="" stroke-dashoffset="0" font-family="sans-serif" font-weight="normal" font-size="12" text-anchor="start" mix-blend-mode="normal"></path></g></svg>'
    var annotation = {};
    var result = this.overlay.parseSVG(svg, annotation);

    expect(result.length).toEqual(2);
    expect(result[0].name).toContain('rectangle_');
    expect(result[1].name).toContain('circle_');
  });

  // set of tests for both import and export functionality. Simulates load and store of annotation shapes.
  xit('getSVGString1', function() {
    var svg = '<svg xmlns=\'http://www.w3.org/2000/svg\'><g><path xmlns="http://www.w3.org/2000/svg" d="M207.55023,187.98214l143.12613,0l143.12613,0l0,97.81055l0,97.81055l-143.12613,0l-143.12613,0l0,-97.81055z" data-paper-data="{&quot;rotation&quot;:0,&quot;annotation&quot;:null}" id="rectangle_154807a4-4121-43f0-a920-5e6792523959" fill-opacity="0.5" fill="#008000" stroke="#ff0000" stroke-width="1" stroke-linecap="butt" stroke-linejoin="miter" stroke-miterlimit="10" stroke-dasharray="" stroke-dashoffset="0" font-family="sans-serif" font-weight="normal" font-size="12" text-anchor="start" mix-blend-mode="normal"/><path xmlns="http://www.w3.org/2000/svg" d="M465.02563,80.868c27.12902,-14.80678 65.56711,-23.45636 103.98969,-23.45148c38.42258,0.00488 76.82965,8.66424 103.98969,23.45148c27.16004,14.78724 43.07305,35.70236 43.07394,56.61687c0.00089,20.91451 -15.91035,41.82842 -43.07394,56.61687c-27.16359,14.78845 -66.01382,23.21455 -103.98969,23.45148c-37.97587,0.23693 -76.58764,-8.53597 -103.98969,-23.45148c-27.40205,-14.91551 -43.17951,-35.75374 -43.07394,-56.61687c0.10556,-20.86313 15.94492,-41.81009 43.07394,-56.61687z" data-paper-data="{&quot;rotation&quot;:0,&quot;annotation&quot;:null}" id="circle_3c667714-d8cf-4b52-80eb-d22e863cf486" fill-opacity="0.5" fill="#008000" stroke="#ff0000" stroke-width="1" stroke-linecap="butt" stroke-linejoin="miter" stroke-miterlimit="10" stroke-dasharray="" stroke-dashoffset="0" font-family="sans-serif" font-weight="normal" font-size="12" text-anchor="start" mix-blend-mode="normal"/></g></svg>';
    var annotation = {};
    var result = this.overlay.parseSVG(svg, annotation);
    var exportedSVG = this.overlay.getSVGString(result);

    expect(svg).toEqual(exportedSVG);
  });

  xit('getSVGString2', function() {
    var svgTestTwo = '<svg xmlns=\'http://www.w3.org/2000/svg\'><path xmlns="http://www.w3.org/2000/svg" d="M207.55023,187.98214l143.12613,0l143.12613,0l0,97.81055l0,97.81055l-143.12613,0l-143.12613,0l0,-97.81055z" data-paper-data="{&quot;rotation&quot;:0,&quot;annotation&quot;:null}" id="rectangle_154807a4-4121-43f0-a920-5e6792523959" fill-opacity="0.5" fill="#008000" stroke="#ff0000" stroke-width="1" stroke-linecap="butt" stroke-linejoin="miter" stroke-miterlimit="10" stroke-dasharray="" stroke-dashoffset="0" font-family="sans-serif" font-weight="normal" font-size="12" text-anchor="start" mix-blend-mode="normal"/></svg>';
    var annotation = {};
    var result = this.overlay.parseSVG(svgTestTwo, annotation);
    var exportedSVGTestTwo = this.overlay.getSVGString(result);

    expect(svgTestTwo).toEqual(exportedSVGTestTwo);
  });
});
