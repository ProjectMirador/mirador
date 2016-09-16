(function($) {

  $.AnnotationUtils = function(){

  };

  function PaperItem(item){
    this.item = item;
  }

  PaperItem.prototype  = {
    getItem:function(){
      return this.item;
    },
    translateByXY: function(x,y){
      this.item.position.x +=x;
      this.item.position.y +=y;
    },

    translateByPoint:function(point){
      this.item.position = this.item.position.add(point);
    },

    setOnMouseDownListener:function(callback){
      this.mouseDown = callback;
    },

    onMouseDown:function(){
      this.mouseDown.call(this,this.item);
    },

    remove:function(){
      this.item.remove();
    },

    rotate:function(angle,pivot){
      pivot?this.item.rotate(angle,pivot):this.item.rotate(angle);
    },

    setPosition:function(point){
      this.item.position = point;
    },

    getWidth:function(){
      return this.item.width;
    },

    getHeight:function(){
      return this.item.height;
    },

    addData:function(key,data){
      this.item.data[key] = data;
    },

    getData: function(key){
      return this.item.data[key];
    },

    resize:function(size){
      this.item.size = size;
    }
  };

  function Group(paperScope,opts){
    var item = new paperScope.Group(opts);
    PaperItem.call(this,item);
  }

  Group.prototype = Object.create(PaperItem.prototype,{});
  Group.constructor = Group;

  var Icon = function(paperScope,opts){
    this.paperScope = paperScope;
    var item = new paperScope.Raster(opts);
    PaperItem.call(this,item);
    if(opts && opts.onLoad){
      this.item.onLoad = opts.onLoad;
    }
  };

  Icon.prototype = Object.create(PaperItem.prototype, {});

  Icon.constructor = Icon;


  function PointText(paperScope,opts) {
    var text = new paperScope.PointText(opts);
    PaperItem.call(this,text);
  }

  PointText.prototype = Object.create(PaperItem.prototype);

  PointText.prototype.resize = function(newSize){
    this.item.fontSize = newSize;
  };

  PointText.constructor = PointText;

  function PointTextIcon(paperScope,opts){
    this.paperScope = paperScope;
    opts.justification = 'center';
    opts.font = 'FontAwesome';
    this.content = opts.content;
    PointText.call(this,paperScope,opts);

    this.rasterMask.addData('self',this);
  }

  PointTextIcon.prototype = Object.create(PointText.prototype, {});

  PointTextIcon.prototype.setPosition = function(point){
    this.rasterMask.setPosition(point);
    PointText.prototype.setPosition.call(this,point);
  };

  PointTextIcon.prototype.rotate = function(angle,pivot){
    this.rasterMask.rotate(angle,pivot);
    PointText.prototype.rotate.call(this,angle,pivot);
  };
  PointTextIcon.prototype.translateByPoint = function (point) {
    this.rasterMask.translateByPoint(point);
    PointText.prototype.translateByPoint.call(this,point);
  };
  PointTextIcon.prototype.translateByXY = function (x,y){
    this.rasterMask.translateByXY(x,y);
    PointText.prototype.translateByXY.call(this,x,y);
  };
  PointTextIcon.prototype.remove = function () {
    this.rasterMask.remove();
    PointText.prototype.remove.call(this);
  };
  PointTextIcon.prototype.resize = function (size) {
    this.rasterMask.resize(new this.paperScope.Size(size,size));
    PointText.prototype.resize.call(this,size);
  };

  PointTextIcon.prototype.getMask = function () {
    return this.rasterMask;
  };

  PointTextIcon.prototype.constructor = PointTextIcon;

  function DeleteActionIcon(paperScope,opts){
    this.paperScope = paperScope;
    opts.fillColor = opts.fillColor || 'black';
    opts.fontSize = opts.size || (24 * 1 / paperScope.view.zoom);
    opts.content = '\uf014';
    this.rasterMask = new Icon(paperScope,{
      name: opts.name.replace('delete','Delete_mask'),
      size: new paperScope.Size(opts.fontSize ,opts.fontSize)
    });
    PointTextIcon.call(this,paperScope,opts);
  }

  DeleteActionIcon.prototype = Object.create(PointTextIcon.prototype, {});

  DeleteActionIcon.prototype.setOnMouseDownListener = function (overlay) {
    this.mouseDown = function () {
      overlay.eventEmitter.publish('deleteShape.' + overlay.windowId, [this.getData('parent')]);
      overlay.mode = 'delete';
    };
  };

  function RotationIcon(paperScope,opts){
    this.paperScope = paperScope;
    opts.justification = 'center';
    opts.fillColor = opts.fillColor || 'black';
    opts.fontSize = opts.size || (16 * 1 / paperScope.view.zoom);
    opts.content = '\uf01e';
    this.rasterMask = new Icon(paperScope,{
      name: opts.name.replace('rotation','Rotation_mask'),
      size: new paperScope.Size(opts.fontSize ,opts.fontSize)
    });
    PointTextIcon.call(this,paperScope,opts);
  }

  RotationIcon.prototype = Object.create(PointTextIcon.prototype, {});

  RotationIcon.prototype.setOnMouseDownListener = function (overlay) {
    this.mouseDown = function () {
      overlay.mode = 'rotate';
    };
  };


  $.AnnotationUtils.prototype = {
    Icon:Icon,
    PointText:PointText,
    DeleteActionIcon:DeleteActionIcon,
    RotationIcon:RotationIcon,
    Group:Group
  };

}(Mirador));