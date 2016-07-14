(function($) {

  $.AnnotationUtils = function(){

  };

  var Icon = function(paperScope,opts){
    this.paperScope = paperScope;
    this.raster = new paperScope.Raster(opts);
    if(opts && opts.onLoad){
      this.raster.onLoad = opts.onLoad;
    }
  };

  Icon.prototype = {

    translateByXY: function(x,y){
      this.raster.position.x +=x;
      this.raster.position.y +=y;
    },

    translateByPoint:function(point){
      this.raster.position = this.raster.position.add(point);
    },

    setOnMouseDownListener:function(callback){
      this.mouseDown = callback;
    },

    onMouseDown:function(){
      this.mouseDown.call(this,this.raster);
    },

    remove:function(){
      this.raster.remove();
    },

    rotate:function(angle,pivot){
      pivot?this.raster.rotate(angle,pivot):this.raster.rotate(angle);
    },

    getWidth:function(){
      return this.raster.width;
    },

    getHeight:function(){
      return this.raster.height;
    },

    setSize:function(width,height){
      this.raster.set({
        size:new this.paperScope.Size(width,height)
      });
      this.raster.scale(0.8);
    },

    addData:function(key,data){
      this.raster.data[key] = data;
    }

  };

  $.AnnotationUtils.prototype = {
    Icon:Icon
  };

}(Mirador));