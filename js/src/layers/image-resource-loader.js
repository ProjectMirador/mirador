(function ($) {

  var ImageResourceLoader = function (config) {
    this.canvas = config.canvas;
    this.viewer = config.osd;

    this.dispatcher = new $.LayersEventDispatcher({
      windowId: config.windowId,
      canvasID: config.canvasID,
      eventEmitter: config.eventEmitter
    });
  };

  ImageResourceLoader.prototype = {
    loadAllImagesFromCanvas: function () {
      var _this = this;

      return this.canvas.images.map(function (image, index) {
        return _this.load(image, {
          zIndex: index
        });
      });
    },

    load: function (image, options) {
      var _this = this;
      var imageUrl = $.Iiif._getImageUrl(image)+'/info.json';
      return new $.ImageResource({
        id: $.genUUID(),
        tileSource: imageUrl,
        parent: _this,
        zIndex: options.zIndex,
        imageInIIIF: image

        // bounds: {
        //   x: 0,
        //   y: 0,
        //   width: 1,
        //   height: 1
        // }
      });
    }


  };


  $.ImageResourceLoader = ImageResourceLoader;

}(Mirador));