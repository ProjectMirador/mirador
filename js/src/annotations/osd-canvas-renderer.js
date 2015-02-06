(function($) {


  // Takes a list of oa:annotations passed
  // by reference and renders their regions,
  // registering updates.
  
  $.OsdCanvasRenderer = function(options) {
  
    jQuery.extend(this, {
     osd:       null,
     osdViewer: null,
     elements:  null,
     list:      null,
     parent:    null,
     annoTooltips: {},
     tooltips:  null
    }, options);
  };
  
  $.OsdCanvasRenderer.prototype = {
    parseRegion: function(url) {
      var regionString;
      if (typeof url === 'object') {
        regionString = url.selector.value;  
      } else {
        regionString = url.split('#')[1];
      }
      var regionArray = regionString.split('=')[1].split(',');
      return regionArray;
    },
    
    getOsdFrame: function(region) {
      var rectX = region[0],
      rectY = region[1],
      rectW = region[2],
      rectH = region[3];
      
      return this.osdViewer.viewport.imageToViewportRectangle(rectX,rectY,rectW,rectH);
  
    }, 
    
    render: function() {
      var _this = this;
      _this.hideAll();
      this.list.forEach(function(annotation) {
        var region = _this.parseRegion(annotation.on);
        var osdOverlay = document.createElement('div');
        osdOverlay.className = 'annotation';
        osdOverlay.id = annotation['@id'];
        _this.osdViewer.addOverlay({
          element: osdOverlay,
          location: _this.getOsdFrame(region)
        });
        var annoText,
        tags = [];
        if (jQuery.isArray(annotation.resource)) {
          jQuery.each(annotation.resource, function(index, value) {
            if (value['@type'] === "dctypes:Text") {
              annoText = value.chars;
            } else if (value['@type'] == "oa:Tag") {
              tags.push(value.chars);
            }
          });
        } else {
          annoText = annotation.resource.chars;
        }
        /*var annoOverlay = document.createElement('div');
        annoOverlay.className = 'osd-annotation-overlay';
        _this.osdViewer.addOverlay({
          element: annoOverlay,
          location: _this.getOsdFrame(region)
        });*/
        /*var tooltip = jQuery(osdOverlay).qtip({
           //overwrite : false,
           prerender: true,
           content: {
            title : annoText,
            text : tags
            },
            position : {
              target : 'mouse',
              //container : jQuery(_this.osdViewer.element).find('.openseadragon-canvas'),
              adjust : {
                mouse: false
              }
            },
            style : {
              classes : 'qtip-bootstrap'
            },
            hide: {
                fixed: true,
                delay: 100
            },
            show: {
              event: false
            },
            events : {
              visible: function(event, api) {
                //console.log("showing this");
                //console.log(api);
                //console.log(jQuery('.qtip.qtip-bootstrap'));
              },
              focus: function(event, api){
                //console.log(jQuery('.qtip.qtip-bootstrap[aria-hidden="false"]').height());
                
              }
            }
         });*/
         //_this.annoTooltips[annotation['@id']] = tooltip;
      });
      //console.log(_this.annoTooltips);
      this.bindEvents();
    },
    
    select: function(annotationId) {
      // jQuery(annotation element).trigger('click');
    },
    
    getAnnoFromRegion: function(regionId) {
      return this.list.filter(function(annotation) {
        return annotation['@id'] === regionId;
      });
    },
    
    getAnnotationsFromPosition: function(event, imageViewElem) {
      var _this = this,
      annos = imageViewElem.find('.annotation').map(function() {
        var self = jQuery(this),
        offset = self.offset(),
        l = offset.left,
        t = offset.top,
        h = self.height(),
        w = self.width(),
        x = new OpenSeadragon.getMousePosition(event).x,
        y = new OpenSeadragon.getMousePosition(event).y,
        maxx = l+w,
        maxy = t+h;
      
        //console.log(y, maxy, t, x, maxx, l);
        if ((y <= maxy && y >= t) && (x <= maxx && x >= l)) {
        //console.log(_this.getAnnoFromRegion(this.id));
        }
      
        return (y <= maxy && y >= t) && (x <= maxx && x >= l) ? _this.getAnnoFromRegion(this.id) : null;
      });
      //console.log(annos);
      return annos;
      //console.log(overlays);
    },
    
    getAnnoIdsFromPosition: function(event, imageViewElem) {
      var _this = this,
      annos = imageViewElem.find('.annotation').map(function() {
        var self = jQuery(this),
        offset = self.offset(),
        l = offset.left,
        t = offset.top,
        h = self.height(),
        w = self.width(),
        x = new OpenSeadragon.getMousePosition(event).x,
        y = new OpenSeadragon.getMousePosition(event).y,
        maxx = l+w,
        maxy = t+h;
        
        return (y <= maxy && y >= t) && (x <= maxx && x >= l) ? this.id : null;
      });
      
      return annos;
    },
    
    getOverlaysFromPosition: function(event, imageViewElem) {
      console.log(imageViewElem);
      var _this = this,
      annos = imageViewElem.find('.annotation').map(function() {
        var self = jQuery(this),
        offset = self.offset(),
        l = offset.left,
        t = offset.top,
        h = self.height(),
        w = self.width(),
        x = new OpenSeadragon.getMousePosition(event).x,
        y = new OpenSeadragon.getMousePosition(event).y,
        maxx = l+w,
        maxy = t+h;
        
        return (y <= maxy && y >= t) && (x <= maxx && x >= l) ? this : null;
      });
      
      return annos;
    },
    
    bindEvents: function() {
      var _this = this;
      // be sure to properly delegate your event handlers
      jQuery(this.osdViewer.canvas).parent().on('click', '.annotation', function() { _this.onSelect(); });

      /*jQuery(this.osdViewer.canvas).parent().parent().on('mouseover', '.annotation', function() { 
        //_this.onHover(_this.getAnnoFromRegion(jQuery(this)[0].id)); 
        console.log("entered an annotation overlay");
        console.log(jQuery(this));
        _this.onHover(event, jQuery(this)); 
        console.log(_this.osd);
        console.log(_this.osdViewer);
      });*/
                  
      /*jQuery('.annotation').mouseenter( function(event) { 
        console.log("entered an annotation overlay");
      });*/
      
      jQuery(this.osdViewer.canvas).parent().parent().on('mousemove', function(event) { 
        var mouseElem = this;
        if(typeof movewait != 'undefined'){
          clearTimeout(movewait);
        }
        movewait = setTimeout(function(){
          console.log("inside settimeout");
          _this.onHover(event, _this.getOverlaysFromPosition(event, jQuery(mouseElem)));
        },20);
        //_this.onHover(event, _this.getAnnotationsFromPosition(event, jQuery(this))); 
      });
      
      /*jQuery(this.osdViewer.canvas).parent().on('mouseleave', '.annotation', function() {
        _this.onMouseLeave();
      });*/
    },
    
    update: function() {
      this.render();
    },
    
    hideAll: function() {
      this.osdViewer.clearOverlays();
    },
    
    getElements: function() {
      this.elements = this.osdViewer.currentOverlays.reduce(function(result, currentOverlay) {
        currentOverlay = jQuery(currentOverlay);
        return result.add(currentOverlay);
      });
      return elements;
    },
    
    onHover: function(event, overlays) {
      console.log("inside onhover");
      //first hide all annotations and then find new ones to display
      //this.parent.annotator.viewer.hide();
      /*jQuery.each(this.annoTooltips, function(key, value) {
        var api = value.qtip('api');
        api.hide();
      });*/
      var renderAnnotations = [],
      _this = this,
      annoTooltip = new $.AnnotationTooltip(); //pass permissions
      var offset = 0,
      annotations = [];
      console.log(overlays);
      jQuery.each(overlays, function(index, overlay) {
        //var annotation = _this.getAnnoFromRegion(id)[0];
        //console.log(annotation);
        //console.log(overlay);
        //console.log(id);
        //var api = _this.annoTooltips[id].qtip('api');
        //console.log(api.get('position.adjust'));
        //console.log(api.elements.tooltip.height());
        //console.log(offset);
        //api.set('position.adjust.y', offset);
        //console.log(api.get('position.adjust'));
        //api.show();
        //api.reposition();
        //offset = offset + jQuery(api.elements.tooltip).height();
        annotations.push(_this.getAnnoFromRegion(overlay.id)[0]);

      });
      /*var annoText,
        tags = [];
        if (jQuery.isArray(annotation.resource)) {
          jQuery.each(annotation.resource, function(index, value) {
            if (value['@type'] === "dctypes:Text") {
              annoText = value.chars;
            } else if (value['@type'] == "oa:Tag") {
              tags.push(value.chars);
            }
          });
        } else {
          annoText = annotation.resource.chars;
        }*/
        if (annotations.length > 0) {
          console.log(annotations);
          //console.log(overlays.first());
          if (this.tooltips) {
            var api = this.tooltips.qtip('api');
            api.set({'content.text' : annoTooltip.getViewer(annotations),
            'show.target' : overlays.first(),
            'position.target' : 'mouse'});
            api.reposition();
          } else {
           this.tooltips = jQuery(_this.osdViewer.element).qtip({
            overwrite : false,
            content: {
             text : annoTooltip.getViewer(annotations),
             button: 'Close'
             },
             position : {
              target : 'mouse',
              //viewport : jQuery(_this.osdViewer.element),
              adjust : {
                mouse: true
              }
             },
             style : {
              classes : 'qtip-bootstrap'
             },
             show: {
              target: overlays.first(),
              ready: true,
              delay: 300
             },
             hide: {
                fixed: true,
                delay: 10
             },
             events: {
               hide: function(event, api) {
                 //api.destroy();
               },
               show: function(event, api) {
                 //api.reposition();
               }
             } 
            });
           }
        } else {
          if (this.tooltips) {
            //this.tooltips.qtip('api').hide();
          }
        }
      
      
      //need to account for various menu bars and side panel that affect the mouse position
      //var topOffset = jQuery(window).height() - _this.osdViewer.container.offsetHeight-2; //subtract a few pixels so mouse pointer is closer to annotation
      //var leftOffset = jQuery(window).width()-_this.osdViewer.container.offsetWidth;
      //var position = {
      //              top: new OpenSeadragon.getMousePosition(event).y-topOffset,
      //              left: new OpenSeadragon.getMousePosition(event).x-leftOffset
      //          };
      //this.parent.annotator.showViewer(this.parent.prepareForAnnotator(annotation), position);
      //if (renderAnnotations.length > 0) {this.parent.annotator.showViewer(renderAnnotations, position);}
    },
    
    onMouseLeave: function() {
      this.parent.annotator.viewer.hide();
    },
    
    onSelect: function(annotation) {

    }
    
    /*var osdCanvasRenderer = {
      render: render,
      update: update,
      hideAll: hideAll
    };
  
    return osdCanvasRenderer;*/
  
  };
}(Mirador));
