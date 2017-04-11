(function ($) {

  var DefaultInitialImageStrategy = function () {
    this.loadedImagesFromCanvasPromise = jQuery.Deferred();
  };


  DefaultInitialImageStrategy.prototype = {
    chooseInitialImage: function () {
      return {
        index: 0,
        url: $.Iiif.getImageUrl(this.canvas),
      };
    },

    setCanvas: function (canvas) {
      this.canvas = canvas;
    },
    // nasty hack to get the tiledImage
    setTiledImages: function (loadedImagesFromCanvasPromise) {
      this.loadedImagesFromCanvasPromise = loadedImagesFromCanvasPromise;
    },

    getTiledImages: function () {
      return this.loadedImagesFromCanvasPromise;
    }
  };

  $.DefaultInitialImageStrategy = DefaultInitialImageStrategy;

}(Mirador));