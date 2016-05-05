(function($) {

  $.ImageView = function(options) {

    jQuery.extend(this, {
      currentImg:       null,
      windowId:         null,
      currentImgIndex:  0,
      canvasID:          null,
      imagesList:       [],
      element:          null,
      elemOsd:          null,
      manifest:         null,
      osd:              null,
      osdOptions: {
        osdBounds:        null,
        zoomLevel:        null
      },
      osdCls: 'mirador-osd',
      elemAnno:         null,
      annoCls:          'annotation-canvas',
      annotationLayerAvailable: null,
      annotationsLayer: null,
      forceShowControls: false
    }, options);

    this.init();
  };

  $.ImageView.prototype = {

    init: function() {    
      // check (for thumbnail view) if the canvasID is set. 
      // If not, make it page/item 1.
      if (this.canvasID !== null) {
        this.currentImgIndex = $.getImageIndexById(this.imagesList, this.canvasID);
      }

      if (!this.osdOptions) {
        this.osdOptions = {
          osdBounds:        null,
          zoomLevel:        null
        };
      }
      this.currentImg = this.imagesList[this.currentImgIndex];
      this.element = jQuery(this.template()).appendTo(this.appendTo);
      this.elemAnno = jQuery('<div/>')
      .addClass(this.annoCls)
      .appendTo(this.element);

      this.createOpenSeadragonInstance($.Iiif.getImageUrl(this.currentImg));
      jQuery.publish('UPDATE_FOCUS_IMAGES.' + this.windowId, {array: [this.canvasID]});

      var allTools = $.getTools();
      this.availableTools = [];
      for ( var i = 0; i < this.state.getStateProperty('availableAnnotationDrawingTools').length; i++) {
        for ( var j = 0; j < allTools.length; j++) {
          if (this.state.getStateProperty('availableAnnotationDrawingTools')[i] == allTools[j].name) {
            this.availableTools.push(allTools[j].logoClass);
          }
        }
      }
      // The hud controls are consistent 
      // throughout any updates to the osd canvas.
      this.hud = new $.Hud({
        appendTo: this.element,
        bottomPanelAvailable: this.bottomPanelAvailable,
        windowId: this.windowId,
        annotationLayerAvailable: this.annotationLayerAvailable,
        annotationCreationAvailable: this.annotationCreationAvailable,
        annoEndpointAvailable: this.annoEndpointAvailable,
        showNextPrev : this.imagesList.length !== 1,
        availableTools: this.availableTools
      });

      this.bindEvents();
      this.listenForActions();

      if (typeof this.bottomPanelAvailable !== 'undefined' && !this.bottomPanelAvailable) {
        jQuery.publish('SET_BOTTOM_PANEL_VISIBILITY.' + this.windowId, false);
      } else {
        jQuery.publish('SET_BOTTOM_PANEL_VISIBILITY.' + this.windowId, null);
      }
    },

    template: Handlebars.compile([
                                 '<div class="image-view">',
                                 '</div>'
    ].join('')),

    listenForActions: function() {
      var _this = this,
      firstCanvasId = _this.imagesList[0]['@id'],
      lastCanvasId = _this.imagesList[_this.imagesList.length-1]['@id'];

      jQuery.subscribe('bottomPanelSet.' + _this.windowId, function(event, visible) {
        var dodgers = _this.element.find('.mirador-osd-toggle-bottom-panel, .mirador-pan-zoom-controls');
        var arrows = _this.element.find('.mirador-osd-next, .mirador-osd-previous');
        if (visible === true) {
          dodgers.css({transform: 'translateY(-130px)'});
          arrows.css({transform: 'translateY(-65px)'});
        } else {
          dodgers.css({transform: 'translateY(0)'});
          arrows.css({transform: 'translateY(0)'});
        }
      });

      jQuery.subscribe('fitBounds.' + _this.windowId, function(event, bounds) {
        var rect = _this.osd.viewport.imageToViewportRectangle(Number(bounds.x), Number(bounds.y), Number(bounds.width), Number(bounds.height));
        _this.osd.viewport.fitBoundsWithConstraints(rect, false);
      });

      jQuery.subscribe('currentCanvasIDUpdated.' + _this.windowId, function(event, canvasId) {
        // If it is the first canvas, hide the "go to previous" button, otherwise show it.
        if (canvasId === firstCanvasId) {
          _this.element.find('.mirador-osd-previous').hide();
          _this.element.find('.mirador-osd-next').show();
        } else if (canvasId === lastCanvasId) {
          _this.element.find('.mirador-osd-next').hide();
          _this.element.find('.mirador-osd-previous').show();
        } else {
          _this.element.find('.mirador-osd-next').show();
          _this.element.find('.mirador-osd-previous').show();
        }
        // If it is the last canvas, hide the "go to previous" button, otherwise show it.
      });

      //Related to Annotations HUD
      jQuery.subscribe('HUD_REMOVE_CLASS.' + _this.windowId, function(event, elementSelector, className) {
        _this.element.find(elementSelector).removeClass(className);
      });

      jQuery.subscribe('HUD_ADD_CLASS.' + _this.windowId, function(event, elementSelector, className) {
        _this.element.find(elementSelector).addClass(className);
      });

      jQuery.subscribe('HUD_FADE_IN.' + _this.windowId, function(event, elementSelector, duration) {
        _this.element.find(elementSelector).fadeIn(duration);
      });

      jQuery.subscribe('HUD_FADE_OUT.' + _this.windowId, function(event, elementSelector, duration, complete) {
        _this.element.find(elementSelector).fadeOut(duration, complete);
      });

      jQuery.subscribe('initBorderColor.' + _this.windowId, function(event, color) {
        _this.element.find('.borderColorPicker').spectrum('set', color);
      });
      jQuery.subscribe('initFillColor.' + _this.windowId, function(event, color, alpha) {
        var colorObj = tinycolor(color);
        colorObj.setAlpha(alpha);
        _this.element.find('.fillColorPicker').spectrum('set', colorObj);
      });
      jQuery.subscribe('disableBorderColorPicker.'+_this.windowId, function(event, disablePicker) {
        if(disablePicker) {
          _this.element.find('.borderColorPicker').spectrum("disable");
        }else{
          _this.element.find('.borderColorPicker').spectrum("enable");
        }
      });
      jQuery.subscribe('disableFillColorPicker.'+_this.windowId, function(event, disablePicker) {
        if(disablePicker) {
          _this.element.find('.fillColorPicker').spectrum("disable");
        }else{
          _this.element.find('.fillColorPicker').spectrum("enable");
        }
      });
      jQuery.subscribe('showDrawTools.'+_this.windowId, function(event) {
        _this.element.find('.draw-tool').show();
      });
      jQuery.subscribe('hideDrawTools.'+_this.windowId, function(event) {
        _this.element.find('.draw-tool').hide();
      });
      //Related to Annotations HUD
    },

    bindEvents: function() {
      var _this = this;

      this.element.find('.mirador-osd-next').on('click', function() {
        _this.next();
      });

      this.element.find('.mirador-osd-previous').on('click', function() {
        _this.previous();
      });

      this.element.find('.mirador-osd-annotations-layer').on('click', $.debounce(function() {
        if (_this.hud.annoState.current === 'none') {
          _this.hud.annoState.startup(this);
        }
        if (_this.hud.annoState.current === 'annoOff') {
          _this.hud.annoState.displayOn(this);
        } else {
          _this.hud.annoState.displayOff(this);
        }
      },300));

      this.element.find('.mirador-osd-go-home').on('click', function() {
        _this.osd.viewport.goHome();
      });

      this.element.find('.mirador-osd-up').on('click', function() {
        var panBy = _this.getPanByValue();
        _this.osd.viewport.panBy(new OpenSeadragon.Point(0, -panBy.y));
        _this.osd.viewport.applyConstraints();
      });
      this.element.find('.mirador-osd-right').on('click', function() {
        var panBy = _this.getPanByValue();
        _this.osd.viewport.panBy(new OpenSeadragon.Point(panBy.x, 0));
        _this.osd.viewport.applyConstraints();
      });
      this.element.find('.mirador-osd-down').on('click', function() {
        var panBy = _this.getPanByValue();
        _this.osd.viewport.panBy(new OpenSeadragon.Point(0, panBy.y));
        _this.osd.viewport.applyConstraints();
      });
      this.element.find('.mirador-osd-left').on('click', function() {
        var panBy = _this.getPanByValue();
        _this.osd.viewport.panBy(new OpenSeadragon.Point(-panBy.x, 0));
        _this.osd.viewport.applyConstraints();
      });

      this.element.find('.mirador-osd-zoom-in').on('click', function() {
        var osd = _this.osd;
        if ( osd.viewport ) {
          osd.viewport.zoomBy(
            osd.zoomPerClick / 1.0
          );
          osd.viewport.applyConstraints();
        }
      });
      this.element.find('.mirador-osd-zoom-out').on('click', function() {
        var osd = _this.osd;
        if ( osd.viewport ) {
          osd.viewport.zoomBy(
            1.0 / osd.zoomPerClick
          );
          osd.viewport.applyConstraints();
        }
      });

      this.element.find('.mirador-osd-toggle-bottom-panel').on('click', function() {
        jQuery.publish('TOGGLE_BOTTOM_PANEL_VISIBILITY.' + _this.windowId);
      });

      //related the ContextControls
      this.element.find('.mirador-osd-close').on('click', $.debounce(function() {
        _this.hud.annoState.displayOff();
      },300));

      this.element.find('.mirador-osd-edit-mode').on('click', function() {
        if (_this.hud.annoState.current === 'annoOnCreateOff') {
          _this.hud.annoState.createOn();
          //when a user is in Create mode, don't let the controls auto fade as it could be distracting to the user
          _this.forceShowControls = true;
          _this.element.find(".hud-control").stop(true, true).removeClass('hidden', _this.state.getStateProperty('fadeDuration'));
        } else if (_this.hud.annoState.current === 'annoOnCreateOn') {
          _this.hud.annoState.createOff();
          //go back to allowing the controls to auto fade
          _this.forceShowControls = false;
        }
      });

      this.element.find('.mirador-osd-refresh-mode').on('click', function() {
        //update annotation list from endpoint
        jQuery.publish('updateAnnotationList.'+_this.windowId);
        jQuery.publish('refreshOverlay.'+_this.windowId, '');
      });
      this.element.find('.mirador-osd-delete-mode').on('click', function() {
        jQuery.publish('deleteShape.'+_this.windowId, '');
      });
      this.element.find('.mirador-osd-save-mode').on('click', function() {
        jQuery.publish('updateEditedShape.'+_this.windowId, '');
      });
      this.element.find('.mirador-osd-close').on('click', function() {
        jQuery.publish('toggleDefaultDrawingTool.'+_this.windowId);
      });
      this.element.find('.mirador-osd-edit-mode').on('click', function() {
        jQuery.publish('toggleDefaultDrawingTool.'+_this.windowId);
      });

      function make_handler(shapeMode) {
        return function () {
          jQuery.publish('toggleDrawingTool.'+_this.windowId, shapeMode);
        };
      }
      for (var value in _this.availableTools) {
        this.element.find('.material-icons:contains(\'' + _this.availableTools[value] + '\')').on('click', make_handler(_this.availableTools[value]));
      }
      //related the ContextControls
    },

    getPanByValue: function() {
      var bounds = this.osd.viewport.getBounds(true);
      //for now, let's keep 50% of the image on the screen
      var panBy = {
        "x" : bounds.width * 0.5,
        "y" : bounds.height * 0.5
      };
      return panBy;
    },

    setBounds: function() {
      var _this = this;
      this.osdOptions.osdBounds = this.osd.viewport.getBounds(true);
      jQuery.publish("imageBoundsUpdated", {
        id: _this.windowId, 
          osdBounds: {
            x: _this.osdOptions.osdBounds.x, 
            y: _this.osdOptions.osdBounds.y, 
            width: _this.osdOptions.osdBounds.width, 
            height: _this.osdOptions.osdBounds.height
          }
      });
      var rectangle = this.osd.viewport.viewportToImageRectangle(this.osdOptions.osdBounds);
      jQuery.publish("imageRectangleUpdated", {
        id: _this.windowId,
        osdBounds: {
          x: Math.round(rectangle.x),
          y: Math.round(rectangle.y),
          width: Math.round(rectangle.width),
          height: Math.round(rectangle.height)
        }
      });
    },

    toggle: function(stateValue) {
      if (stateValue) { 
        this.show(); 
      } else {
        this.hide();
      }
    },

    hide: function() {
      jQuery(this.element).hide({effect: "fade", duration: 300, easing: "easeOutCubic"});
    },

    show: function() {
      jQuery(this.element).show({effect: "fade", duration: 300, easing: "easeInCubic"});
    },

    adjustWidth: function(className, hasClass) {
      if (hasClass) {
        jQuery.publish('REMOVE_CLASS.'+this.windowId, className);
      } else {
        jQuery.publish('ADD_CLASS.'+this.windowId, className);
      }
    },

    adjustHeight: function(className, hasClass) {
      if (hasClass) {
        this.element.removeClass(className);
      } else {
        this.element.addClass(className);
      }
    },

    createOpenSeadragonInstance: function(imageUrl) {
      var infoJsonUrl = imageUrl + '/info.json',
      uniqueID = $.genUUID(),
      osdID = 'mirador-osd-' + uniqueID,
      infoJson,
      _this = this;

      this.element.find('.' + this.osdCls).remove();

      jQuery.getJSON(infoJsonUrl).done(function (infoJson, status, jqXHR) {
        _this.elemOsd =
          jQuery('<div/>')
        .addClass(_this.osdCls)
        .attr('id', osdID)
        .appendTo(_this.element);

        _this.osd = $.OpenSeadragon({
          'id':           osdID,
          'tileSources':  infoJson,
          'uniqueID' : uniqueID
        });

        _this.osd.addHandler('zoom', $.debounce(function(){
          var point = {
            'x': -10000000,
            'y': -10000000
          };
          jQuery.publish('updateTooltips.' + _this.windowId, [point, point]);
        }, 30));

        _this.osd.addHandler('pan', $.debounce(function(){
          var point = {
            'x': -10000000,
            'y': -10000000
          };
          jQuery.publish('updateTooltips.' + _this.windowId, [point, point]);
        }, 30));

        if (_this.state.getStateProperty('autoHideControls')) {
          var timeoutID = null,
          fadeDuration = _this.state.getStateProperty('fadeDuration'),
          timeoutDuration = _this.state.getStateProperty('timeoutDuration');
          var hideHUD = function() {
            _this.element.find(".hud-control").stop(true, true).addClass('hidden', fadeDuration);
          };
          hideHUD();
          jQuery(_this.element).on('mousemove', function() {
            window.clearTimeout(timeoutID);
            // When a user is in annotation create mode, force show the controls so they don't disappear when in a qtip, so check for that
            if (!_this.forceShowControls) {
              _this.element.find(".hud-control").stop(true, true).removeClass('hidden', fadeDuration);
              timeoutID = window.setTimeout(hideHUD, timeoutDuration);
            }
          }).on('mouseleave', function() {
            if (!_this.forceShowControls) {
              window.clearTimeout(timeoutID);
              hideHUD();
            }
          });
        }

        _this.osd.addHandler('open', function(){
          jQuery.publish('osdOpen.'+_this.windowId);
          if (_this.osdOptions.osdBounds) {
            var rect = new OpenSeadragon.Rect(_this.osdOptions.osdBounds.x, _this.osdOptions.osdBounds.y, _this.osdOptions.osdBounds.width, _this.osdOptions.osdBounds.height);
            _this.osd.viewport.fitBounds(rect, true);
          } else {
            //else reset bounds for this image
            _this.setBounds();
          }

          _this.addAnnotationsLayer(_this.elemAnno);
            
          // if current annoState is 'none' that means it has been initialized but not used
          // use annotationState to choose event
          if (_this.hud.annoState.current === 'none') {
              _this.hud.annoState.startup(null);
            if (_this.annotationState === 'annoOnCreateOff') {
              _this.hud.annoState.displayOn(null);
            } else if (_this.annotationState === 'annoOnCreateOn') {
              _this.hud.annoState.createOn(null);
            }
          } else {
            // if the current state is not 'none' then we need to update the annotations layer,
            // with the current state, for the new canvas
            if (_this.hud.annoState.current === 'annoOnCreateOff') {
              _this.hud.annoState.refreshCreateOff(null);
            } else if (_this.hud.annoState.current === 'annoOnCreateOn') {
              _this.hud.annoState.refreshCreateOn(null);
            }
          }

          // A hack. Pop the osd overlays layer after the canvas so 
          // that annotations appear.
          jQuery(_this.osd.canvas).children().first().remove().appendTo(_this.osd.canvas);

          _this.osd.addHandler('zoom', $.debounce(function() {
            _this.setBounds();
          }, 500));

          _this.osd.addHandler('pan', $.debounce(function(){
            _this.setBounds();
          }, 500));
        });
      });
    },

    addAnnotationsLayer: function(element) {
      var _this = this;
      _this.annotationsLayer = new $.AnnotationsLayer({
        state: _this.state,
        annotationsList: _this.state.getWindowAnnotationsList(_this.windowId) || [],
        viewer: _this.osd,
        windowId: _this.windowId,
        element: element
      });
    },

    updateImage: function(canvasID) {
      if (this.canvasID !== canvasID) {
        this.canvasID = canvasID;
        this.currentImgIndex = $.getImageIndexById(this.imagesList, canvasID);
        this.currentImg = this.imagesList[this.currentImgIndex];
        this.osdOptions = {
          osdBounds:        null,
          zoomLevel:        null
        };
        this.osd.close();
        this.createOpenSeadragonInstance($.Iiif.getImageUrl(this.currentImg));
        jQuery.publish('UPDATE_FOCUS_IMAGES.' + this.windowId, {array: [canvasID]});
      } else {
        jQuery.publish('UPDATE_FOCUS_IMAGES.' + this.windowId, {array: [canvasID]});
      }
    },

    next: function() {
      var next = this.currentImgIndex + 1;

      if (next < this.imagesList.length) {
        jQuery.publish('SET_CURRENT_CANVAS_ID.' + this.windowId, this.imagesList[next]['@id']);
      }
    },

    previous: function() {
      var prev = this.currentImgIndex - 1;

      if (prev >= 0) {
        jQuery.publish('SET_CURRENT_CANVAS_ID.' + this.windowId, this.imagesList[prev]['@id']);
      }
    }
  };

}(Mirador));
