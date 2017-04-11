(function ($) {

  var ImageResourceTransformCanvas = function (options) {
    jQuery.extend(true, this, {
      osd: null,
      eventEmitter: null,
      windowId: null,
      state: null
    }, options);

    this.init();
  };


  ImageResourceTransformCanvas.prototype = {
    init: function () {

      this.enabled = false;
      this.canvas = document.createElement('canvas');
      this.canvas.id = 'layer_transform_canvas_' + this.windowId;
      //this.canvas.style.border = '1px solid yellow';
    },
    enable: function (imageResource) {
      if (this.enabled) {
        console.error("Already enabled");
        return;
      }
      this.enabled = true;
      this.currentImageResource = imageResource;


      var homeBounds = this.osd.viewport.getHomeBounds();
      this.osd.viewport.fitBounds(homeBounds, true);
      this.osd.setMouseNavEnabled(false);
      this.osd.addOverlay({
        element: this.canvas,
        location: homeBounds
      });
      this.paperScope = new paper.PaperScope();
      this.paperScope.setup(this.canvas);
      this.paperScope.project.options.handleSize = 10;
      this.paperScope.activate();

      //too hacked create a parser
      var url = $.Iiif.getThumbnailForImage(imageResource.imageInIIIF, 1024);

      var _this = this;
      var raster = new this.paperScope.Raster({
        source: url,
        position: {
          x: 0,
          y: 0
        }
      });

      this.resize(imageResource.tiledImage);
      _this.raster = raster;
      var imageBounds = imageResource.tiledImage.getBounds(true);
      _this.initialImageBounds = imageBounds;
      var imageBoundsCenter = imageBounds.getCenter(true);
      var imageToOSDViewportRatio = (imageResource.tiledImage.source.width / (imageBounds.width));

      var mouseTool = new this.paperScope.Tool();
      mouseTool.overlay = this;

      var mode = ''; // can be resize | translate
      var handlePoint = null;
      var scaleCenter = null;
      var scaleSign = null;

      var epsEqual = function (x, y) {
        return Math.abs(x - y) <= 0.001;
      };

      var pointEqual = function (a, b) {
        return epsEqual(a.x, b.x) && epsEqual(a.y, b.y);
      };

      mouseTool.onMouseDrag = function (event) {
        var newOsdPos;
        if (mode === 'translate') {
          raster.data.group.translateByXY(event.delta.x, event.delta.y);
          newOsdPos = new OpenSeadragon.Point(raster.bounds.x / imageToOSDViewportRatio, raster.bounds.y / imageToOSDViewportRatio);
          imageResource.tiledImage.setPosition(newOsdPos);
          return;
        }

        if (mode === 'resize') {

          var newWidth = raster.width + scaleSign * event.delta.x;
          var scaleRatio = 1.0 * newWidth / raster.width;

          raster.data.group.getItem().scale(scaleRatio, scaleCenter);

          imageResource.tiledImage.setWidth(imageResource.tiledImage.getBounds(true).width * scaleRatio, true);
          newOsdPos = new OpenSeadragon.Point(raster.bounds.x / imageToOSDViewportRatio, raster.bounds.y / imageToOSDViewportRatio);
          imageResource.tiledImage.setPosition(newOsdPos);

        }

        // The osd method setPosition rotates the point that is why we should pass the bounds without the rotation
        // var clone = raster.clone();
        // clone.rotate(-imageResource.getRotation());
        // clone.visible = false;

      };

      mouseTool.onMouseDown = function (event) {
        var hitResult = _this.paperScope.project.hitTest(event.point, {handles: true, stroke: true, tolerance: 25});
        if (hitResult) {
          if (hitResult.type === 'handle-in') {
            mode = 'resize';
            handlePoint = hitResult.point;
            if (pointEqual(raster.data.selectionRect.segments[0].point, handlePoint)) {
              scaleCenter = raster.bounds.bottomRight;
              scaleSign = -1;
            }
            else if (pointEqual(raster.data.selectionRect.segments[1].point, handlePoint)) {
              scaleCenter = raster.bounds.bottomLeft;
              scaleSign = 1;
            }
            else if (pointEqual(raster.data.selectionRect.segments[2].point, handlePoint)) {
              scaleCenter = raster.bounds.topLeft;
              scaleSign = 1;
            }
            else if (pointEqual(raster.data.selectionRect.segments[3].point, handlePoint)) {
              scaleCenter = raster.bounds.topRight;
              scaleSign = -1;
            }
          } else {
            mode = 'translate';
            handlePoint = null;
          }
        }
      };

      mouseTool.onMouseMove = function (event) {
        var hitResult = _this.paperScope.project.hitTest(event.point, {handles: true, stroke: true, tolerance: 25});
        if (hitResult) {
          if (hitResult.type === 'handle-in') {
            _this.eventEmitter.publish('POINTER_CURSOR.' + _this.windowId);
          }
        } else {
          _this.eventEmitter.publish('DEFAULT_CURSOR.' + _this.windowId);
        }
      };


      var annotationUtils = new $.AnnotationUtils();
      raster.onLoad = function () {

        raster.opacity = imageResource.getOpacity();

        raster.position = new _this.paperScope.Point(imageBoundsCenter.x * imageToOSDViewportRatio, imageBoundsCenter.y * imageToOSDViewportRatio);
        raster.width = imageResource.tiledImage.source.width;
        raster.height = imageResource.tiledImage.source.height;
        raster.fullySelected = false;

        imageResource.hide();

        // imageResource.setRotation(imageResource.getRotation());

        // raster.rotate(imageResource.getRotation());

        // if (raster.data.rotationIcon) {
        //   raster.data.rotation = imageResource.getRotation();
        //   raster.data.rotationIcon.addData('pivot', raster.bounds.getCenter());
        //   raster.data.rotationIcon.addData('type', 'rotationIcon');
        //   raster.data.rotationIcon.addData('self', raster.data.rotationIcon);
        //   raster.data.rotationIcon.addData('parent', raster);
        //
        //   raster.data.rotationIcon.setPosition(raster.data.rotationIcon.getData('pivot').add(new _this.paperScope.Point(0, 21 / _this.paperScope.view.zoom).rotate(raster.data.rotation)));
        // }

        if (!raster.data.selectionRect) {
          var selectionRect = new _this.paperScope.Path(
            {
              segments: [raster.bounds.topLeft, raster.bounds.topRight, raster.bounds.bottomRight, raster.bounds.bottomLeft],
              fullySelected: true
            }
          );
          selectionRect.segments[0].selected = false;
          selectionRect.segments[1].selected = false;
          selectionRect.segments[2].selected = false;
          selectionRect.segments[3].selected = false;
          selectionRect.closed = true;
          raster.data.group.getItem().appendTop(selectionRect);
          raster.data.selectionRect = selectionRect;
          selectionRect.fillColor = 'red';
          selectionRect.opacity = 0.00000001;

        }

      };


      if (!raster.data.rotationIcon) {
        raster.data.rotationIcon = new annotationUtils.RotationIcon(_this.paperScope, {
          name: raster.name + 'rotation',
          fillColor: raster.selectedColor
        });
      }


      if (!raster.data.group) {
        raster.data.group = new annotationUtils.Group(this.paperScope, [raster]);
      }

      // raster.data.rotationIcon.getMask().getItem().onMouseDrag = function (event) {
      //   var rotation = Math.atan2(event.point.y - raster.position.y + event.delta.y, event.point.x - raster.position.x + event.delta.x) - Math.atan2(event.point.y - raster.position.y, event.point.x - raster.position.x);
      //   rotation = rotation * (180 / Math.PI);
      //   raster.data.group.rotate(rotation, raster.position);
      //   raster.data.rotationIcon.rotate(-rotation);
      //   imageResource.rotate(rotation, true);
      // };


      this.paperScope.view.draw();

    },
    disable: function (shouldSave) {
      if (this.enabled) {
        if (!shouldSave) {
          this.currentImageResource.tiledImage.setPosition(this.initialImageBounds);
          this.currentImageResource.tiledImage.setWidth(this.initialImageBounds.width);
        }
        this._clearCanvas();
        this.enabled = false;
        this.osd.setMouseNavEnabled(true);
      }
    },
    _clearCanvas: function () {
      this.currentImageResource.show();
      this.currentImageResource = null;
      this.paperScope.clear();
      this.paperScope.remove();
      this.canvas.getContext('2d').clearRect(0, 0, this.canvas.width, this.canvas.height);
      this.osd.removeOverlay(this.canvas);
    },

    resize: function (tiledImage) {
      var viewportBounds = this.osd.viewport.getBounds(true);
      /* in viewport coordinates */
      this.canvas.width = this.osd.viewport.containerSize.x;
      this.canvas.height = this.osd.viewport.containerSize.y;
      var transform = 'translate(0px,0px)';
      this.canvas.style.WebkitTransform = transform;
      this.canvas.style.msTransform = transform;
      this.canvas.style.transform = transform;
      this.canvas.style.marginLeft = '0px';
      this.canvas.style.marginTop = '0px';
      if (this.paperScope && this.paperScope.view) {
        this.paperScope.view.viewSize = new this.paperScope.Size(this.canvas.width, this.canvas.height);
        this.paperScope.view.zoom = tiledImage.viewportToImageZoom(this.osd.viewport.getZoom(true));
        this.paperScope.view.center = new this.paperScope.Size(
          tiledImage.source.dimensions.x * viewportBounds.getCenter().x * (1 / tiledImage.getBounds(true).width ),
          tiledImage.source.dimensions.x * viewportBounds.getCenter().y * ( 1 / tiledImage.getBounds(true).width )
        );
        //if (this.center) this.center.remove();
        // this.center = new this.paperScope.Path.Circle(new this.paperScope.Point(tiledImage.source.dimensions.x * viewportBounds.x + this.paperScope.view.bounds.width / 2, tiledImage.source.dimensions.y * viewportBounds.y + this.paperScope.view.bounds.height / 2), 50);
        // this.center.fillColor = 'red';
        this.paperScope.view.update(true);
      }
    }

  };


  $.ImageResourceTransformCanvas = ImageResourceTransformCanvas;

}(Mirador));


/**

 Known issues:
 Layer translate does not work properly with multiple slots on the left/right (the space left for the viewer is too narrow)
 Layer rotation and translate near canvas does not work properly;

 */