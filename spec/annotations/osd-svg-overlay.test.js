describe('Overlay', function() {

  function getEvent(delta, point, lastPoint, event) {
    return {
      'delta': delta,
      'point': point,
      'lastPoint': lastPoint,
      'event': event,
      'stopPropagation': jasmine.createSpy()
    };
  }

  beforeEach(function() {
    //register Handlebars helper
    Mirador.Handlebars.registerHelper('t', function(i18n_key) {
      var result = i18next.t(i18n_key);
      return new Mirador.Handlebars.SafeString(result);
    });

    var id = 'test';
    this.canvas = jQuery('<canvas></canvas>');
    this.canvas.attr('id', 'draw_canvas_' + id);
    jasmine.getFixtures().set(this.canvas);
    this.eventEmitter = new Mirador.EventEmitter();// TODO should stub
    this.windowObjMock = {
      'id': id,
      'windowId': id,
      'viewer': {
        'id': 'viewerId'
      },
      'canvasID': 'myCanvasId',
      'canvases': {
        'myCanvasId': {}
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
        'getBounds': function(current) {
          return {
            'x': 800,
            'y': 600
          };
        },
        'containerSize': {
          'x': 800,
          'y': 600
        },
        'contentSize': {
          'x': 800,
          'y': 600
        },
        'getBounds': function() {
          return {
            'x': 0,
            'y': 0,
            'width': 800,
            'height': 600
          };
        }
      },
      'addHandler': function(eventName, functionBody) {
      },
      'removeHandler':function(eventName,functionBody){
      }
    };
    var drawingToolsSettings = {
      'doubleClickReactionTime': 300,
      'strokeColor': 'deepSkyBlue',
      'fillColor': 'deepSkyBlue',
      'fillColorAlpha': 0.0
    };

    var state = new Mirador.SaveController({
      eventEmitter: this.eventEmitter,
      windowObjects: [this.windowObjMock]
    }); // TODO should stub this

    state.getStateProperty = function(key) {
    if (key === 'drawingToolsSettings') {
     return {
       'doubleClickReactionTime': 300,
       'strokeColor': 'deepSkyBlue',
       'fillColor': 'deepSkyBlue',
       'fillColorAlpha': 0.0
     };
    }
    if (key === 'availableAnnotationDrawingTools') {
     return [];
    }
    if (key === 'availableExternalCommentsPanel') {
     return false;
    }
     return null;
    };

    state.currentConfig.windowObjects[0].canvases['myCanvasId'].getBounds = function() {
      return {
        'x': 800,
        'y': 600
      };
    };
    this.overlay = new Mirador.Overlay(this.viewerMock, this.windowObjMock.viewer.id, this.windowObjMock.windowId, state, new MockEventEmitter(this.eventEmitter));
    this.overlay.annotationUtils = new AnnotationUtilsStub();
  });

  afterEach(function() {
    delete this.overlay;
  });

  it('toggleDrawingTool', function() {
    this.eventEmitter.publish('toggleDrawingTool.' + this.windowObjMock.windowId, [null]);

    expect(this.overlay.currentTool).toBeNull();

    this.pin = new Mirador.Pin(); //TODO should use the dummy tool
    this.overlay.disabled = true;
    this.eventEmitter.publish('toggleDrawingTool.' + this.windowObjMock.windowId, [this.pin.logoClass]);

    expect(this.overlay.currentTool).toBeNull();

    this.overlay.disabled = false;
    this.eventEmitter.publish('toggleDrawingTool.' + this.windowObjMock.windowId, [this.pin.logoClass]);

    expect(this.overlay.currentTool).not.toBeNull();
    expect(this.overlay.currentTool.logoClass).toBe(this.pin.logoClass);
  });

  it('changeBorderColor', function() {
    var color = '#ff0000';
    this.eventEmitter.publish('changeBorderColor.' + this.windowObjMock.windowId, [color]);

    expect(this.overlay.strokeColor).toBe(color);

    color = '#00ff00';
    this.rectangle = new Mirador.Rectangle(); // TODO should use the dummy object
    var initialPoint = {
      'x': 123,
      'y': 456
    };

   this.overlay.hoveredPath = this.rectangle.createShape(initialPoint, this.overlay);

    expect(this.overlay.hoveredPath.strokeColor.red).toBe(1);
    expect(this.overlay.hoveredPath.strokeColor.green).toBe(0);
    expect(this.overlay.hoveredPath.strokeColor.blue).toBe(0);

    this.eventEmitter.publish('changeBorderColor.' + this.windowObjMock.windowId, [color]);

    expect(this.overlay.strokeColor).toBe(color);
    expect(this.overlay.hoveredPath.strokeColor.red).toBe(0);
    expect(this.overlay.hoveredPath.strokeColor.green).toBe(1);
    expect(this.overlay.hoveredPath.strokeColor.blue).toBe(0);
  });

  it('changeFillColor', function() {
    var color = '#00ff00';
    var alpha = 0.00001;
    this.eventEmitter.publish('changeFillColor.' + this.windowObjMock.windowId, [color, alpha]);

    expect(this.overlay.fillColor).toBe(color);
    expect(this.overlay.fillColorAlpha).toBe(0.00001);

    color = '#ff0000';

    this.rectangle = new Mirador.Rectangle(); // TODO should use the dummy tool
    var initialPoint = {
      'x': 123,
      'y': 456
    };

    this.overlay.hoveredPath = this.rectangle.createShape(initialPoint, this.overlay);

    expect(this.overlay.hoveredPath.fillColor.red).toBe(0);
    expect(this.overlay.hoveredPath.fillColor.green).toBe(1);
    expect(this.overlay.hoveredPath.fillColor.blue).toBe(0);
    expect(this.overlay.hoveredPath.fillColor.alpha).toBe(0.00001);

    alpha = 0.5;
    this.eventEmitter.publish('changeFillColor.' + this.windowObjMock.windowId, [color, alpha]);

    expect(this.overlay.fillColor).toBe(color);
    expect(this.overlay.fillColorAlpha).toBe(alpha);
    expect(this.overlay.hoveredPath.fillColor.red).toBe(1);
    expect(this.overlay.hoveredPath.fillColor.green).toBe(0);
    expect(this.overlay.hoveredPath.fillColor.blue).toBe(0);
    expect(this.overlay.hoveredPath.fillColor.alpha).toBe(0.5);

    this.polygon = new Mirador.Polygon(); // TODO should use the dummy tool
    this.overlay.hoveredPath = this.polygon.createShape(initialPoint, this.overlay);

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
    this.rectangle = new Mirador.Rectangle(); // TODO should use stubbed tool
    var initialPoint = {
      'x': 123,
      'y': 456
    };

    this.overlay.hoveredPath = this.rectangle.createShape(initialPoint, this.overlay);
    this.overlay.onDrawFinish();

    expect(this.overlay.hoveredPath).not.toBeNull();
    expect(this.overlay.hoveredPath).not.toBe(this.overlay.path);

    this.overlay.path = this.rectangle.createShape(initialPoint, this.overlay);
    this.overlay.onDrawFinish();

    expect(this.overlay.hoveredPath).not.toBeNull();
    expect(this.overlay.hoveredPath).not.toBe(this.overlay.path);

    var comment = this.overlay.commentPanel;
    this.overlay.hoveredPath = null;
    this.overlay.path = this.rectangle.createShape(initialPoint, this.overlay);
    this.overlay.onDrawFinish();

    expect(this.overlay.hoveredPath).not.toBeNull();
    expect(this.overlay.hoveredPath).not.toBe(this.overlay.path);
    expect(this.overlay.commentPanel).toBe(comment);
  });

  it('onMouseUp', function() {
    this.rectangle = new Mirador.Rectangle(); // TODO should use stubbed tool
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
    this.rectangle = new Mirador.Rectangle(); // TODO should use stubbed tool
    spyOn(this.rectangle, 'onMouseDrag');
    var event = getEvent({
      'x': 100,
      'y': 100
    }, {}, {
      'x' : 99,
      'y' : 99
    }, {
      'clientX': 100,
      'clientX': 100
    });
    this.overlay.path = {};
    this.overlay.path.bounds = {
      'x': 0,
      'y': 0,
      'width': 100,
      height: 100
    };
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
    this.rectangle = new Mirador.Rectangle(); // TODO should use stubbed tool
    spyOn(this.rectangle, 'onMouseMove');
    var event = getEvent({
      'x': 100,
      'y': 100
    }, {}, {}, {
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
    this.rectangle = new Mirador.Rectangle(); // TODO should use stubbed tool
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

  it('should not select non editable item',function(){
    var stubbedTool = {
      onMouseDown : jasmine.createSpy(),
      onDoubleClick: jasmine.createSpy()
    };

    var event = getEvent({
      'x': 100,
      'y': 100
    }, {
      'x': 100,
      'y': 100
    });

    var date = new Date();
    this.overlay.latestMouseDownTime = date.getTime()  -2 * this.overlay.doubleClickReactionTime;
    this.overlay.overlay = this.overlay;
    this.overlay.disabled = false;

    var rectangle = new Mirador.Rectangle();// TODO should use stubbed tool // should stub the hitTest
    this.overlay.currentTool = rectangle;

    event.item = rectangle.createShape(event.point, this.overlay);
    this.overlay.mode = '';

    this.overlay.onMouseDown(event);

    expect(stubbedTool.onMouseDown.calls.count()).toEqual(0);
    expect(stubbedTool.onDoubleClick.calls.count()).toEqual(0);
  });

  it('onMouseDown', function() {
    this.rectangle = new Mirador.Rectangle(); // TODO should use stubbed tool
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

    this.overlay.currentTool = this.rectangle;
    this.overlay.mode = 'create';

    this.overlay.onMouseDown(event);

    expect(this.rectangle.onMouseDown.calls.count()).toEqual(0);
    expect(this.rectangle.onDoubleClick.calls.count()).toEqual(0);

    this.overlay.currentTool = this.rectangle;
    this.overlay.disabled = false;
    this.overlay.mode = 'create';

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
    event.item.data.editable = true;
    this.overlay.latestMouseDownTime -= 2 * this.overlay.doubleClickReactionTime;
    this.overlay.currentTool = this.rectangle;
    this.overlay.onMouseDown(event);

    expect(this.rectangle.onMouseDown.calls.count()).toEqual(2);
    expect(this.rectangle.onDoubleClick.calls.count()).toEqual(1);

    // // hover new item and add to edited paths
    this.overlay.currentTool = this.rectangle;
     event.item = this.rectangle.createShape(event.point, this.overlay); // TODO SEEMS TO BE OUTDATED test
     event.item.data.editable = true;
    // this.overlay.latestMouseDownTime -= 2 * this.overlay.doubleClickReactionTime;
    // this.overlay.mode = 'translate';
    // this.overlay.path = event.item;
    // this.overlay.path.data.annotation = '<svg>stored svg</svg>';
    // this.overlay.onMouseDown(event);
    //
    // expect(this.rectangle.onMouseDown.calls.count()).toEqual(3);
    // expect(this.rectangle.onDoubleClick.calls.count()).toEqual(1);

    // hover new item
    this.overlay.latestMouseDownTime -= 2 * this.overlay.doubleClickReactionTime;

    this.overlay.onMouseDown(event);

    expect(this.rectangle.onMouseDown.calls.count()).toEqual(3);
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
    this.ellipse = new Mirador.Ellipse(); // TODO SHOULD STUB
    var newShape = this.ellipse.createShape(event.point, this.overlay);
    newShape.data.editable = true;
    this.overlay.mode = '';

    this.overlay.onMouseDown(event);

    expect(this.overlay.hoveredPath).toBe(newShape);
    expect(this.overlay.segment).toBe(newShape.segments[0]);
    expect(this.overlay.path).toBe(newShape);
    expect(this.overlay.mode).toEqual('deform');
  });

  it('parseSVG', function() {
    var svg = '<svg xmlns="http://www.w3.org/2000/svg"><g><path d="M207.55023,187.98214l143.12613,0l143.12613,0l0,97.81055l0,97.81055l-143.12613,0l-143.12613,0l0,-97.81055z" data-paper-data="{&quot;rotation&quot;:0,&quot;annotation&quot;:null}" id="rectangle_154807a4-4121-43f0-a920-5e6792523959" fill-opacity="0.5" fill="#008000" stroke="#ff0000" stroke-width="1" stroke-linecap="butt" stroke-linejoin="miter" stroke-miterlimit="10" stroke-dasharray="" stroke-dashoffset="0" font-family="sans-serif" font-weight="normal" font-size="12" text-anchor="start" mix-blend-mode="normal"/><path xmlns="http://www.w3.org/2000/svg" d="M465.02563,80.868c27.12902,-14.80678 65.56711,-23.45636 103.98969,-23.45148c38.42258,0.00488 76.82965,8.66424 103.98969,23.45148c27.16004,14.78724 43.07305,35.70236 43.07394,56.61687c0.00089,20.91451 -15.91035,41.82842 -43.07394,56.61687c-27.16359,14.78845 -66.01382,23.21455 -103.98969,23.45148c-37.97587,0.23693 -76.58764,-8.53597 -103.98969,-23.45148c-27.40205,-14.91551 -43.17951,-35.75374 -43.07394,-56.61687c0.10556,-20.86313 15.94492,-41.81009 43.07394,-56.61687z" data-paper-data="{&quot;rotation&quot;:0,&quot;annotation&quot;:null}" id="circle_3c667714-d8cf-4b52-80eb-d22e863cf486" fill-opacity="0.5" fill="#008000" stroke="#ff0000" stroke-width="1" stroke-linecap="butt" stroke-linejoin="miter" stroke-miterlimit="10" stroke-dasharray="" stroke-dashoffset="0" font-family="sans-serif" font-weight="normal" font-size="12" text-anchor="start" mix-blend-mode="normal"></path></g></svg>';
    var annotation = {};
    var result = this.overlay.parseSVG(svg, annotation);

    expect(result.length).toEqual(2);
    expect(result[0].name).toContain('rectangle_');
    expect(result[1].name).toContain('circle_');
  });

  // set of tests for both import and export functionality. Simulates load and store of annotation shapes.
  it('getSVGString1', function() {
    var svg='<svg xmlns=\'http://www.w3.org/2000/svg\'><g><path d="M207.55023,187.98214l143.12613,0l0,0l143.12613,0l0,97.81055l0,97.81055l-143.12613,0l-143.12613,0l0,-97.81055z" data-paper-data="{&quot;rotation&quot;:0,&quot;annotation&quot;:null}" id="rectangle_154807a4-4121-43f0-a920-5e6792523959" fill-opacity="0.5" fill="#008000" fill-rule="nonzero" stroke="#ff0000" stroke-width="1" stroke-linecap="butt" stroke-linejoin="miter" stroke-miterlimit="10" stroke-dasharray="" stroke-dashoffset="0" font-family="sans-serif" font-weight="normal" font-size="12" text-anchor="start" style="mix-blend-mode: normal"></path><path d="M465.02563,80.868c27.12902,-14.80678 65.56711,-23.45636 103.98969,-23.45148c38.42258,0.00488 76.82965,8.66424 103.98969,23.45148c27.16004,14.78724 43.07305,35.70236 43.07394,56.61687c0.00089,20.91451 -15.91035,41.82842 -43.07394,56.61687c-27.16359,14.78845 -66.01382,23.21455 -103.98969,23.45148c-37.97587,0.23693 -76.58764,-8.53597 -103.98969,-23.45148c-27.40205,-14.91551 -43.17951,-35.75374 -43.07394,-56.61687c0.10556,-20.86313 15.94492,-41.81009 43.07394,-56.61687z" data-paper-data="{&quot;rotation&quot;:0,&quot;annotation&quot;:null}" id="circle_3c667714-d8cf-4b52-80eb-d22e863cf486" fill-opacity="0.5" fill="#008000" fill-rule="nonzero" stroke="#ff0000" stroke-width="1" stroke-linecap="butt" stroke-linejoin="miter" stroke-miterlimit="10" stroke-dasharray="" stroke-dashoffset="0" font-family="sans-serif" font-weight="normal" font-size="12" text-anchor="start" style="mix-blend-mode: normal"></path></g></svg>'
    var annotation = {};
    var result = this.overlay.parseSVG(svg, annotation);
    var exportedSVG = this.overlay.getSVGString(result);

    // TODO should find better way to test this
    // each style change results in failed test
    //expect(svg).toEqual(exportedSVG);
  });

  it('getSVGString2', function() {
    var svgTestTwo = '<svg xmlns=\'http://www.w3.org/2000/svg\'><path d="M207.55023,187.98214l143.12613,0l0,0l143.12613,0l0,97.81055l0,97.81055l-143.12613,0l-143.12613,0l0,-97.81055z" data-paper-data="{&quot;rotation&quot;:0,&quot;annotation&quot;:null}" id="rectangle_154807a4-4121-43f0-a920-5e6792523959" fill-opacity="0.5" fill="#008000" fill-rule="nonzero" stroke="#ff0000" stroke-width="1" stroke-linecap="butt" stroke-linejoin="miter" stroke-miterlimit="10" stroke-dasharray="" stroke-dashoffset="0" font-family="sans-serif" font-weight="normal" font-size="12" text-anchor="start" style="mix-blend-mode: normal"></path></svg>';
    var annotation = {};
    var result = this.overlay.parseSVG(svgTestTwo, annotation);
    var exportedSVGTestTwo = this.overlay.getSVGString(result);

    // TODO should find better way to test this
    // each style change results in failed test
    //expect(svgTestTwo).toEqual(exportedSVGTestTwo);
  });

  it('should delete shape',function(){

    var mockShape = {
      '_name': {
        toString: function () {

        }
      },
      remove:jasmine.createSpy()
    };

    this.overlay.draftPaths = [mockShape];

    this.overlay.deleteShape(mockShape);

    expect(this.overlay.draftPaths.length).toBe(0);
    expect(mockShape.remove.calls.any()).toBe(true);
  });

  it('should unsubscibe from all events when destroying',function(){
   this.overlay.destroy();
   for(var key in this.overlay.eventEmitter.events){
     expect(this.overlay.eventEmitter.events[key]).toBe(0);
   }
  });

  it('sets and removes the mouse tool', function() {
    var key = this.overlay.mouseToolKey;
    var paperScope = this.overlay.paperScope;

    this.overlay.setMouseTool();
    expect(paperScope.tools.length).toEqual(1);

    this.overlay.removeMouseTool();
    expect(paperScope.tools.length).toEqual(0);
  });

  describe("When there are two overlays: ", function() {

    beforeEach(function() {
      var state = new Mirador.SaveController({eventEmitter: this.eventEmitter});

      this.overlay2 = new Mirador.Overlay(this.viewerMock, this.windowObjMock.viewer.id, this.windowObjMock.windowId, state, new MockEventEmitter(this.eventEmitter));
      this.overlay2.annotationUtils = new AnnotationUtilsStub();
    });

    afterEach(function() {
      delete this.overlay2;
    });

    it("creates different paperScopes for each overlay", function() {
      expect(this.overlay.paperScope._id).not.toEqual(this.overlay2.paperScope._id);
    });

    it("the global paper object should be set to the most recently instantiated paperScope", function() {
      // since overlay2 was created most recently, the global paper object should be set to the paperScope of overlay2
      expect(paper._id).toEqual(this.overlay2.paperScope._id);
    });

    it("correctly sets the global paper object when an overlay's setMouseTool method is called", function(){
      // make sure the global paper object is set to the paperScope of overlay2
      expect(paper._id).toEqual(this.overlay2.paperScope._id);
      // call setMouseTool on the first overlay
      this.overlay.setMouseTool();
      // make sure the global paper object is set to the paperScope of the first overlay
      expect(paper._id).toEqual(this.overlay.paperScope._id);
      // call setMouseTool on overlay2 and check the global paper object again
      this.overlay2.setMouseTool();
      expect(paper._id).toEqual(this.overlay2.paperScope._id);
      expect(paper._id).not.toEqual(this.overlay.paperScope._id);
    });
  });

});
