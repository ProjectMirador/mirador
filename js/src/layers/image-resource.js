(function ($) {
  var ImageResource = function (config) {
    this.id = config.id;
    this.label = config.label || "No Label";
    this.needed = config.needed || false;
    this.visible = config.visible || false;
    this.clipRegion = config.clipRegion;
    this.opacity = config.opacity || 1;
    this.bounds = config.bounds || new OpenSeadragon.Rect(0, 0, 1, 1);
    this.zIndex = config.zIndex;
    this.tileSource = config.tileSource;
    this.dynamic = config.dynamic || false;
    this.imageType = config.imageType || "main"; // can be 'main', 'alternate', 'detail' or 'thumbnail'
    this.status = 'initialized'; // can be 'requested', 'pending','shown', or 'failed'
    this.parent = config.parent;
    this.dispatcher = config.parent.dispatcher;
    this.viewer = config.parent.viewer;
    this.tileSourceUrl = config.tileSourceUrl;
    this.imageInIIIF = config.imageInIIIF;
    this.locked = config.locked || false;
    this.hardlocked = config.hardlocked || false;
    this.rotation = config.rotation || 0;
  };

  ImageResource.Status = {
    SHOWN: 'shown',
    TRANSFORMING: 'transform'
  };

  ImageResource.prototype = {

    hide: function () {
      this.visible = false;
      this.updateOpacity();
      this.dispatcher.emit('image-hide', {detail: this.id});
    },

    show: function () {
      this.visible = true;
      this.updateOpacity();
      this.dispatcher.emit('image-show', {detail: this.id});
    },

    rotate: function (angle, immediate) {
      this.rotation += angle;
      this.tiledImage.setRotation(this.rotation, immediate);
    },

    resetRotation:function () {
      this.tiledImage.setRotation(0,true);
    },

    setRotation:function(angle){
      this.tiledImage.setRotation(angle,true);
    },

    getRotation: function () {
      return this.rotation;
    },

    isVisible: function () {
      return this.visible;
    },

    lock: function (hardlock) {
      if (hardlock) {
        this.hardlocked = true;
      }
      this.locked = true;
    },

    unlock: function () {
      this.locked = false;
    },

    isLocked: function () {
      return this.locked || this.hardlocked;
    },


    isHardLocked: function () {
      return this.hardlocked;
    },

    updateOpacity: function () {
      if (this.tiledImage) {
        if (this.visible) {
          this.tiledImage.setOpacity(this.opacity);
        } else {
          this.tiledImage.setOpacity(0);
        }
      }
    },

    setOpacity: function (opacity) {
      this.opacity = opacity;
      this.updateOpacity();
    },

    getOpacity: function () {
      return this.opacity;
    },

    openAsInitialTile: function () {
      this._onSuccessfulOpen(this.viewer.world.getItemAt(0));
    },

    _onSuccessfulOpen: function (tiledImage) {
      this.tiledImage = tiledImage;
      this.updateOpacity();
      this.updateItemIndex();
      this.show();
      this.status = 'shown';
      this.dispatcher.emit('image-resource-tile-source-opened', {
        detail: this
      });
    },

    openTileSource: function (options) {
      var self = this;

      options = options || {};

      // We've already loaded this tilesource
      if (this.status === 'shown') {
        return;
      }

      // otherwise, continue loading the tileSource.
      this.dispatcher.emit('image-resource-tile-source-requested', {'detail': self});
      this.status = 'requested';
      var bounds = this._getBoundsInViewer(this.bounds);

      this.viewer.addTiledImage({
        x: bounds.x,
        y: bounds.y,
        width: bounds.width,
        tileSource: this.tileSource,
        opacity: this.opacity,
        clip: this.clipRegion,
        index: this.zIndex,

        success: function (event) {
          var main = event.item;

          self._onSuccessfulOpen(main);
        },

        error: function (event) {
          var errorInfo = {
            id: self.tileSource,
            message: event.message,
            source: event.source
          };
          self.status = 'failed';
          self.dispatcher.emit('image-resource-tile-source-failed', {detail: errorInfo});
        }
      });
    },

    getImageType: function () {
      return this.imageType;
    },

    getBounds: function () {
      return new OpenSeadragon.Rect(this.bounds.x, this.bounds.y, this.bounds.width, this.bounds.height);
    },

    _getBoundsInViewer: function (rect) {
      return rect;
      // if (rect) {
      //   return new OpenSeadragon.Rect(
      //       this.parent.bounds.x + (this.parent.bounds.width * rect.x),
      //       this.parent.bounds.y + (this.parent.bounds.width * rect.y),
      //       this.parent.bounds.width * rect.width,
      //       this.parent.bounds.height * rect.height
      //   );
      // }
    },


    //Assumes that the point parameter is already in viewport coordinates.
    containsViewerPoint: function (point) {
      var bounds = this._getBoundsInViewer(this.bounds);

      var width = this.parent.bounds.width * this.width;
      var height = this.parent.bounds.height * this.height;

      var rectRight = bounds.x + bounds.width;
      var rectBottom = bounds.y + bounds.height;

      return (bounds.x <= point.x && rectRight >= point.x && bounds.y <= point.y && rectBottom >= point.y);
    },

    setStatus: function (status) {
      this.status = status;
    },

    getStatus: function () {
      return this.status;
    },

    getId: function () {
      return this.id;
    },

    destroy: function () {
      if (this.tiledImage) {
        this.viewer.world.removeItem(this.tiledImage);
        this.tiledImage = null;
      }
    },

    fade: function (targetOpacity, callback) {
      var self = this;
      var currentOpacity = this.opacity;
      var step = (targetOpacity - currentOpacity) / 30;
      if (step === 0) {
        if (callback) callback();
        return;
      }

      var frame = function () {
        currentOpacity += step;
        if ((step > 0 && currentOpacity >= targetOpacity) || (step < 0 && currentOpacity <= targetOpacity)) {
          self.setOpacity(targetOpacity);
          if (callback) callback();
          return;
        }

        self.setOpacity(currentOpacity);
        OpenSeadragon.requestAnimationFrame(frame);
      };
      OpenSeadragon.requestAnimationFrame(frame);
    },

    setZIndex: function (zIndex) {
      this.zIndex = zIndex;
      this.updateItemIndex();
    },

    updateItemIndex: function () {
      if (this.tiledImage && this.viewer.world.getItemCount() > this.zIndex) {
        this.viewer.world.setItemIndex(this.tiledImage, this.zIndex);
      }
    }

  };

  $.ImageResource = ImageResource;


}(Mirador));

