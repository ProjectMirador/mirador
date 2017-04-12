//Can be static and stateless

(function ($) {


  var OSDLayersRenderer = function (options) {
    jQuery.extend(true, this, {
      osd: null,
      manifest: null,
      canvas: null,
      eventEmitter: null,
      windowId: null,
      state: null,
      initialImageStrategy: null,
      layersEnabled: null
    }, options);

    this.init();
  };

  OSDLayersRenderer.prototype = {
    init: function () {
      this.render();

      var _this = this;
      //should destroy all events
      this.events = [];
      this.imageResourceTransformCanvas = new $.ImageResourceTransformCanvas({
        windowId: this.windowId,
        eventEmitter: this.eventEmitter,
        osd: this.osd,
        state: this.state
      });

      this.events.push(this.eventEmitter.subscribe(this.windowId + ':layers-zIndex-updated', function (event, data) {
        _this.imageResources.forEach(function (imageRes) {
          imageRes.updateItemIndex();
        });
      }));

      this.events.push(this.eventEmitter.subscribe(this.windowId + ':layers-add-resource', function (event, data) {
        var imageResource = _this.imageResourceLoader.load(data, {
          zIndex: lastIndex
        });
        var lastIndex = _this.imageResources.length;
        _this.imageResources.push(imageResource);
        imageResource.openTileSource();
      }));

      this.events.push(this.eventEmitter.subscribe(this.windowId + ':layers-remove-resource', function (event, imageResource) {

        if (_this.shouldRemoveLayer(imageResource)) {
          var windowElement = _this.state.getWindowElement(_this.windowId);

          new $.DialogBuilder(windowElement).dialog({
            message: i18next.t('deleteLayer'),
            closeButton: false,
            buttons: {
              'yes': {
                label: i18next.t('yes'),
                className: 'btn-primary',
                callback: function () {
                  var removeOnIndex = -1;
                  _this.imageResources.forEach(function (imgResource, index) {
                    if (imgResource.id === imageResource.id) {
                      imageResource.destroy();
                      removeOnIndex = index;
                    }
                  });
                  if (removeOnIndex !== -1) {
                    _this.imageResources.splice(removeOnIndex, 1);
                    _this.eventEmitter.publish(_this.windowId + ':layers-resource-removed', [imageResource]);
                  }
                }
              },
              'no': {
                label: i18next.t('no'),
                className: 'btn-default',
                callback: function () {
                  return;
                }
              }
            }
          });

        }

      }));

      this.events.push(this.eventEmitter.subscribe(this.windowId + ':layers-lock-resource', function (event, imageResource) {
        if (imageResource.isLocked()) {
          imageResource.unlock();
        } else {
          imageResource.lock();
        }
      }));

      this.events.push(this.eventEmitter.subscribe(this.windowId + ':layers-visibility-change', function (event, imageResource) {
        if (imageResource.isVisible()) {
          imageResource.hide();
        } else {
          imageResource.show();
        }
      }));

      this.events.push(this.eventEmitter.subscribe(this.windowId + ':layers-transform-resource-mode-changed', function (event, resource, shouldSave) {
        if (!_this.imageResourceTransformCanvas.enabled && _this.shouldActivateTransformCanvas(resource)) {
          resource.setStatus($.ImageResource.Status.TRANSFORMING);
          _this.imageResourceTransformCanvas.enable(resource);
          _this.eventEmitter.publish(_this.windowId + ':layers-transform-resource-enabled', [resource]);
          return;
        }

        if (_this.shouldDeactivateTransformCanvas(resource)) {
          resource.setStatus($.ImageResource.Status.SHOWN);
          _this.imageResourceTransformCanvas.disable(shouldSave);
          _this.eventEmitter.publish(_this.windowId + ':layers-transform-resource-disabled', [resource]);
        }

      }));

      this.osd.addHandler('close', this.destroy.bind(this));

    },
    shouldRemoveLayer: function (resource) {
      return !resource.isLocked() && resource.getStatus() === $.ImageResource.Status.SHOWN;
    },
    shouldActivateTransformCanvas: function (resource) {
      var annoState = this.state.getWindowObjectById(this.windowId).annotationState;
      return (typeof annoState === 'undefined' || annoState === 'off') && resource.getStatus() !== $.ImageResource.Status.TRANSFORMING && !resource.isLocked() && resource.isVisible();
    },
    shouldDeactivateTransformCanvas: function (resouce) {
      return resouce.getStatus() === $.ImageResource.Status.TRANSFORMING;
    },

    render: function () {
      var _this = this;

      _this.imageResourceLoader = new $.ImageResourceLoader({
        windowId: _this.windowId,
        canvas: _this.canvas,
        osd: _this.osd,
        eventEmitter: _this.eventEmitter
      });

      var loadedImagesFromCanvasPromise = jQuery.Deferred();

      _this.imageResources = _this.imageResourceLoader.loadAllImagesFromCanvas();
      loadedImagesFromCanvasPromise.resolve(_this.imageResources);
      _this.initialImageStrategy.setTiledImages(loadedImagesFromCanvasPromise);
      var initialImageIndex = this.initialImageStrategy.chooseInitialImage().index;
      var initialImage = _this.imageResources[initialImageIndex];
      initialImage.lock(true);
      initialImage.openAsInitialTile(); //possible race condition, test and add promise if needed

      _this.imageResources.forEach(function (image, index) {

        if (index !== initialImageIndex && _this.layersEnabled) {
          image.openTileSource();
        }
      });


    },
    destroy: function () {
      var _this = this;
      _this.events.forEach(function (event) {
        _this.eventEmitter.unsubscribe(event.name, event.handler);
      });
    },

  };


  $.OSDLayersRenderer = OSDLayersRenderer;
}(Mirador));
