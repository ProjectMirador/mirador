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
      _this.hideAll(),
      overlays = [];
      this.list.forEach(function(annotation) {
        var region = _this.parseRegion(annotation.on),
        osdOverlay = document.createElement('div');
        osdOverlay.className = 'annotation';
        osdOverlay.id = annotation['@id'];
        _this.osdViewer.addOverlay({
          element: osdOverlay,
          location: _this.getOsdFrame(region)
        });
        overlays.push(jQuery(osdOverlay));
      });
      
      this.tooltips = jQuery(overlays).qtip({
            overwrite : false,
            content: {
             text : ''
             },
             position : {
              target : 'mouse',
              adjust : {
                mouse: false
              }
             },
             style : {
              classes : 'qtip-bootstrap'
             },
             show: {
              delay: 20
             },
             hide: {
                fixed: true,
                delay: 50
             },
             events: {
               show: function(event, api) {
                 var overlays = _this.getOverlaysFromPosition(event.originalEvent),
                 annoTooltip = new $.AnnotationTooltip(), //pass permissions
                 annotations = [];
                 
                 jQuery.each(overlays, function(index, overlay) {
                   annotations.push(_this.getAnnoFromRegion(overlay.id)[0]);
                 });
                 api.set({'content.text' : annoTooltip.getViewer(annotations)});
                 
                 },
               move: function(event, api) {
                 _this.annotationEvents(event, api);
                 _this.annotationSaveEvent(event, api);
               },
               hidden: function(event, api) {
                 jQuery('.annotation-tooltip a.delete').off("click");
                 jQuery('.annotation-tooltip a.edit').off("click");
                 jQuery('.annotation-tooltip a.save').off("click");
                 jQuery('.annotation-tooltip a.cancel').off("click");
               },
               hide: function(event, api) { }
             }
      });

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

    getOverlaysFromPosition: function(event) {
      var _this = this;
      var overlays = jQuery(_this.osdViewer.canvas).find('.annotation').map(function() {
        var self = jQuery(this),
        offset = self.offset(),
        l = offset.left,
        t = offset.top,
        h = self.outerHeight(),
        w = self.outerWidth(),
        x = new OpenSeadragon.getMousePosition(event).x,
        y = new OpenSeadragon.getMousePosition(event).y,
        maxx = l+w,
        maxy = t+h;

        return (y <= maxy && y >= t) && (x <= maxx && x >= l) ? this : null;
      });
      
      return overlays;
    },

    bindEvents: function() {
      var _this = this;
      
      jQuery.subscribe('removeTooltips.' + _this.parent.windowId, function() {
        jQuery(_this.osdViewer.canvas).find('.annotation').qtip('destroy', true);
      });

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

    annotationEvents: function(event, api) {
      var _this = this,
      annoTooltip = new $.AnnotationTooltip();
      jQuery('.annotation-tooltip a.delete').on("click", function(event) {
        event.preventDefault();
        
        if (!window.confirm("Do you want to delete this annotation?")) { 
          return false;
        }

        console.log("clicked delete");
        var display = jQuery(this).parents('.annotation-display'),
        id = display.attr('data-anno-id'),
        oaAnno = _this.getAnnoFromRegion(id)[0];
        jQuery.publish('annotationDeleted.'+_this.parent.windowId, [oaAnno]);

        //remove this annotation's overlay from osd
        //should there be some sort of check that it was successfully deleted? or pass when publishing?
        _this.osdViewer.removeOverlay(jQuery(_this.osdViewer.element).find(".annotation#"+id)[0]);
        
        //if there will be no more displayed annotations after removing current one from dom, then hide the qtip
        if(jQuery(this).parents('.all-annotations').find('.annotation-display').length-1 === 0) {
          api.hide();
        }
        display.remove(); //remove this annotation display from dom
      });

      jQuery('.annotation-tooltip a.edit').on("click", function(event) {
        event.preventDefault();
        
        var display = jQuery(this).parents('.annotation-display'),
        id = display.attr('data-anno-id'),
        oaAnno = _this.getAnnoFromRegion(id)[0];
        //need to bind save action with editor
        api.set({'content.text' : annoTooltip.getEditor(oaAnno)});
      });
    },
    
    annotationSaveEvent: function(event, api) {
      var _this = this,
      annoTooltip = new $.AnnotationTooltip();
      
      jQuery('.annotation-tooltip').on("submit", function(event) {
        event.preventDefault();
        jQuery('.annotation-tooltip a.save').click();
      });

      jQuery('.annotation-tooltip a.save').on("click", function(event) {
        event.preventDefault();
                  
        var display = jQuery(this).parents('.annotation-tooltip'),
        id = display.attr('data-anno-id'),
        oaAnno = _this.getAnnoFromRegion(id)[0];
                  
        //check if new resourceText is empty??
        var tagText = jQuery(this).parents('.new-annotation-form').find('.tags-editor').val(),
        resourceText = jQuery(this).parents('.new-annotation-form').find('.text-editor').val(),
        tags = [];
        tagText = $.trimString(tagText);
        if (tagText) {
            tags = tagText.split(/\s+/);
        }

        var bounds = _this.osdViewer.viewport.getBounds(true);
        var scope = _this.osdViewer.viewport.viewportToImageRectangle(bounds);
        //bounds is giving negative values?
        //update scope?
                  
        var motivation = [],
        resource = [],
        on;
                  
        //remove all tag-related content in annotation
        oaAnno.motivation = jQuery.grep(oaAnno.motivation, function(value) {
            return value !== "oa:tagging";
        });
        oaAnno.resource = jQuery.grep(oaAnno.resource, function(value) {
            return value["@type"] !== "oa:Tag";
        });
        //re-add tagging if we have them
        if (tags.length > 0) {
            oaAnno.motivation.push("oa:tagging");
            jQuery.each(tags, function(index, value) {
                oaAnno.resource.push({      
                    "@type":"oa:Tag",
                     "chars":value
                });
            });
        }
        jQuery.each(oaAnno.resource, function(index, value) {
            if (value["@type"] === "dctypes:Text") {
                value.chars = resourceText;
            }
        });
        //save to endpoint
        jQuery.publish('annotationUpdated.'+_this.parent.windowId, [oaAnno]);
                
        //update content of this qtip to make it a viewer, not editor
        api.set({'content.text' : annoTooltip.getViewer([oaAnno])});
        });
        
        jQuery('.annotation-tooltip a.cancel').on("click", function(event) {
          event.preventDefault();
          var display = jQuery(this).parents('.annotation-tooltip'),
          id = display.attr('data-anno-id'),
          oaAnno = _this.getAnnoFromRegion(id)[0];

          //go back to viewer
          api.set({'content.text' : annoTooltip.getViewer([oaAnno])});
        });

    }
  };
})(Mirador);
