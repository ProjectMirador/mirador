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
      forceShowControls: false,
      eventEmitter:     null
    }, options);

    this.init();
  };

  $.ImageView.prototype = {

    init: function() {    
      var _this = this;
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
      _this.eventEmitter.publish('UPDATE_FOCUS_IMAGES.' + this.windowId, {array: [this.canvasID]});

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
        availableTools: this.availableTools,
        eventEmitter: this.eventEmitter
      });

      if (this.annotationOn && this.hud.annoState.current === 'annoOff') {
        this.hud.annoState.displayOn(null);
      }

      this.bindEvents();
      this.listenForActions();

      if (typeof this.bottomPanelAvailable !== 'undefined' && !this.bottomPanelAvailable) {
        _this.eventEmitter.publish('SET_BOTTOM_PANEL_VISIBILITY.' + this.windowId, false);
      } else {
        _this.eventEmitter.publish('SET_BOTTOM_PANEL_VISIBILITY.' + this.windowId, null);
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

      _this.eventEmitter.subscribe('bottomPanelSet.' + _this.windowId, function(event, visible) {
        var dodgers = _this.element.find('.mirador-osd-toggle-bottom-panel, .mirador-pan-zoom-controls, .mirador-img-manipulation, .mirador-pan-zoom-toggle');
        var arrows = _this.element.find('.mirador-osd-next, .mirador-osd-previous');
        if (visible === true) {
          dodgers.css({transform: 'translateY(-130px)'});
          arrows.css({transform: 'translateY(-65px)'});
        } else {
          dodgers.css({transform: 'translateY(0)'});
          arrows.css({transform: 'translateY(0)'});
        }
      });

      _this.eventEmitter.subscribe('fitBounds.' + _this.windowId, function(event, bounds) {
        var rect = _this.osd.viewport.imageToViewportRectangle(Number(bounds.x), Number(bounds.y), Number(bounds.width), Number(bounds.height));
        _this.osd.viewport.fitBoundsWithConstraints(rect, false);
      });

      _this.eventEmitter.subscribe('currentCanvasIDUpdated.' + _this.windowId, function(event, canvasId) {
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
      _this.eventEmitter.subscribe('HUD_REMOVE_CLASS.' + _this.windowId, function(event, elementSelector, className) {
        _this.element.find(elementSelector).removeClass(className);
      });

      _this.eventEmitter.subscribe('HUD_ADD_CLASS.' + _this.windowId, function(event, elementSelector, className) {
        _this.element.find(elementSelector).addClass(className);
      });

      _this.eventEmitter.subscribe('HUD_FADE_IN.' + _this.windowId, function(event, elementSelector, duration) {
        _this.element.find(elementSelector).fadeIn(duration);
      });

      _this.eventEmitter.subscribe('HUD_FADE_OUT.' + _this.windowId, function(event, elementSelector, duration, complete) {
        _this.element.find(elementSelector).fadeOut(duration, complete);
      });

      _this.eventEmitter.subscribe('initBorderColor.' + _this.windowId, function(event, color) {
        _this.element.find('.borderColorPicker').spectrum('set', color);
      });
      _this.eventEmitter.subscribe('initFillColor.' + _this.windowId, function(event, color, alpha) {
        var colorObj = tinycolor(color);
        colorObj.setAlpha(alpha);
        _this.element.find('.fillColorPicker').spectrum('set', colorObj);
      });
      _this.eventEmitter.subscribe('disableBorderColorPicker.'+_this.windowId, function(event, disablePicker) {
        if(disablePicker) {
          _this.element.find('.borderColorPicker').spectrum("disable");
        }else{
          _this.element.find('.borderColorPicker').spectrum("enable");
        }
      });
      _this.eventEmitter.subscribe('disableFillColorPicker.'+_this.windowId, function(event, disablePicker) {
        if(disablePicker) {
          _this.element.find('.fillColorPicker').spectrum("disable");
        }else{
          _this.element.find('.fillColorPicker').spectrum("enable");
        }
      });
      _this.eventEmitter.subscribe('showDrawTools.'+_this.windowId, function(event) {
        _this.element.find('.draw-tool').show();
      });
      _this.eventEmitter.subscribe('hideDrawTools.'+_this.windowId, function(event) {
        _this.element.find('.draw-tool').hide();
      });
      //Related to Annotations HUD
    },

        //BH edit to allow commenting annotations when images are non-IIIF
    bbShowAnnos: function(){
      this.element.find(".bbAnnosContainer").show(); //imageview
    },

    //BH edit to allow commenting annotations when images are non-IIIF
    bbHideAnnos: function(){
      this.element.find(".bbAnnosContainer").hide();//imageview
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
          if(_this.osd.viewport){
            //BH edit for toggling annotations from BB on non-IIIF images
            _this.bbShowAnnos();
            _this.hud.annoState.displayOn(this);
          }
          else{ //it is one of ours
            //BH edit for toggling annotations on non-IIIF image
            _this.bbShowAnnos();
            _this.hud.annoState.displayOn(this);
          }
          
        } 
        else {
          if(_this.osd.viewport){
            _this.bbHideAnnos();
            _this.hud.annoState.displayOff(this);
          }
          else{ //it is one of ours
            //BH edit for toggling annotations on non-IIIF image
            _this.bbHideAnnos();
            _this.hud.annoState.displayOff(this);
          }
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
        _this.eventEmitter.publish('TOGGLE_BOTTOM_PANEL_VISIBILITY.' + _this.windowId);
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
        _this.eventEmitter.publish('updateAnnotationList.'+_this.windowId);
        _this.eventEmitter.publish('refreshOverlay.'+_this.windowId, '');
      });
      this.element.find('.mirador-osd-delete-mode').on('click', function() {
        _this.eventEmitter.publish('deleteShape.'+_this.windowId, '');
      });
      this.element.find('.mirador-osd-save-mode').on('click', function() {
        _this.eventEmitter.publish('updateEditedShape.'+_this.windowId, '');
      });
      this.element.find('.mirador-osd-close').on('click', function() {
        _this.eventEmitter.publish('toggleDefaultDrawingTool.'+_this.windowId);
      });
      this.element.find('.mirador-osd-edit-mode').on('click', function() {
        _this.eventEmitter.publish('toggleDefaultDrawingTool.'+_this.windowId);
      });

      function make_handler(shapeMode) {
        return function () {
          _this.eventEmitter.publish('toggleDrawingTool.'+_this.windowId, shapeMode);
        };
      }
      for (var value in _this.availableTools) {
        this.element.find('.material-icons:contains(\'' + _this.availableTools[value] + '\')').on('click', make_handler(_this.availableTools[value]));
      }
      //related the ContextControls

      this.element.find('.mirador-osd-annotations-layer').on('click', function() {
       

      });

  
       this.element.find('.mirador-osd-flip').on('click', function() {
        //Can do html rotations if we detect no viewport.
        var osd = _this.osd;
        if ( osd.viewport ) {
        var currentRotation = parseInt(osd.viewport.getRotation());
          osd.viewport.setRotation(
            currentRotation + 180
          );
          osd.viewport.applyConstraints();
        }
      });
      this.element.find('.mirador-osd-positive-rotate').on('click', function() {
        var osd = _this.osd;
        //Can do html rotations if we detect no viewport.
        if ( osd.viewport ) {
        var currentRotation = parseInt(osd.viewport.getRotation());
            osd.viewport.setRotation(
            currentRotation + 90
          );
          osd.viewport.applyConstraints();
        }
      });
      this.element.find('.mirador-osd-negative-rotate').on('click', function() {
        //Can do html rotations if we detect no viewport.
        var osd = _this.osd;
        if ( osd.viewport ) {
          var currentRotation = parseInt(osd.viewport.getRotation());
            osd.viewport.setRotation(
            currentRotation - 90
          );
          osd.viewport.applyConstraints();
        }
      });
      this.element.find('.mirador-osd-toggle-grayscale').on('click', function() {
        var osd = _this.osd;
        if ( osd.viewport ) {
          if(osd.viewport.viewer.canvas.className.indexOf('grayscaleEffect') >= 0){
            osd.viewport.viewer.canvas.className = osd.viewport.viewer.canvas.className.replace('grayscaleEffect', '');
          }
          else{
            osd.viewport.viewer.canvas.className = osd.viewport.viewer.canvas.className + " grayscaleEffect";
          }
          osd.viewport.applyConstraints();
        }
        else{
          if(osd.canvas.className.indexOf('grayscaleEffect') >= 0){
            osd.canvas.className = osd.canvas.className.replace('grayscaleEffect', '');
          }
          else{
            osd.canvas.className = osd.canvas.className + " grayscaleEffect";
          }
          osd.applyConstraints();
        }
      });
      
      this.element.find('.mirador-osd-toggle-invert').on('click', function() {
        var osd = _this.osd;
        if ( osd.viewport ) {
          if(osd.viewport.viewer.canvas.className.indexOf('invertEffect') >= 0){
            osd.viewport.viewer.canvas.className = osd.viewport.viewer.canvas.className.replace('invertEffect', '');
          }
          else{
            osd.viewport.viewer.canvas.className = osd.viewport.viewer.canvas.className + " invertEffect";
          }
          osd.viewport.applyConstraints();
        }
        else{
          if(osd.canvas.className.indexOf('invertEffect') >= 0){
            osd.canvas.className = osd.canvas.className.replace('invertEffect', '');
          }
          else{
            osd.canvas.className = osd.canvas.className + " invertEffect";
          }
          osd.applyConstraints();
        }
      });
      /*
        This removes all filters and zooms so that the user can click it to return to the 'normal' starting position of the image
      */
      
      this.element.find('.mirador-osd-filters-off').on('click', function(event) {
        var osd = _this.osd;
        if ( osd.viewport ) {
          osd.viewport.viewer.canvas.className = osd.viewport.viewer.canvas.className.replace('invertEffect', '');
          osd.viewport.viewer.canvas.className = osd.viewport.viewer.canvas.className.replace('grayscaleEffect', '');
          osd.viewport.viewer.canvas.parentNode.style.webkitFilter = "";
          osd.viewport.viewer.canvas.parentNode.style.mozFilter = "";
          osd.viewport.viewer.canvas.parentNode.style.filter = "";
          osd.viewport.setRotation(0);
          //osd.viewport.zoomTo(1);
          jQuery(".brightnessSlider").slider("option","value",100); //reset sliders.
          jQuery(".contrastSlider").slider("option","value",100); //reset sliders.
          osd.viewport.applyConstraints();
        }
        else{
          osd.canvas.className = osd.viewport.viewer.canvas.className.replace('invertEffect', '');
          osd.canvas.className = osd.viewport.viewer.canvas.className.replace('grayscaleEffect', '');
          osd.canvas.parentNode.style.webkitFilter = "";
          osd.canvas.parentNode.style.mozFilter = "";
          osd.canvas.parentNode.style.filter = "";
          //osd.viewport.setRotation(0);
          // osd.viewport.zoomTo(0);
          jQuery(".brightnessSlider").slider("option","value",100); //reset sliders.
          jQuery(".contrastSlider").slider("option","value",100); //reset sliders.
          osd.applyConstraints();
        }
      });

      this.element.find('.mirador-pan-zoom-toggle').on('click', function(event){
        event = event || window.event;
        if(event.target.className.indexOf("opened") > -1 ){
          event.target.className = "viewImgManip closed";
          event.target.parentNode.style.right = "33px";
          event.target.parentNode.nextSibling.style.right = "-320px";
          event.target.parentNode.previousSibling.style.right = "2px";
          event.target.parentNode.setAttribute("title", "View Image Manipulation Tools");
        }
        else if (event.target.className.indexOf("closed") > -1){
          event.target.className = "viewImgManip opened";
          event.target.parentNode.nextSibling.style.right = "32px";
          event.target.parentNode.previousSibling.style.right = "226px";
          event.target.parentNode.style.right = "238px";
          event.target.parentNode.setAttribute("title", "Hide Image Manipulation Tools");
        }
        else{
          //You hit an odd target.  
        }
      });

      this.element.find(".brightnessSlider").slider({
          orientation: "horizontal",
          range: "min",
          min: 0,
          max: 200,
          value:100,
          slide: function( event, ui ) {
            var osd = _this.osd;
            var newFilter = "";
            var moz = false;
              //Need to be able to tell which vendor preifxes I need.  Order is always brightness then contrast, so I can put brightness in right away here.
              if( navigator.userAgent.indexOf("Chrome") != -1 ) {
                newFilter = "-webkit-filter: brightness("+ui.value+"%)";
              } 
              else if( navigator.userAgent.indexOf("Opera") != -1 ) {
                newFilter = "-o-filter: brightness("+ui.value+"%)";
              }
              else if( navigator.userAgent.indexOf("MSIE") != -1 ) {
                newFilter="filter: brightness("+ui.value+"%)";
              } 
              else if( navigator.userAgent.indexOf("Firefox") != -1 ) {
                //The latst version of firefox does not use the -moz- prefix
                newFilter = "filter: brightness("+ui.value+"%)";
                moz = true;
              } 
              else {
                //Not a browser we accounted for so filter will not work
              }
              var currentContrast = "100%";
              var currentStyle = "";
              if ( osd.viewport ) {
                currentStyle  = osd.viewport.viewer.canvas.parentNode.getAttribute("style");
              }
              else{
                currentStyle  = osd.canvas.parentNode.getAttribute("style");
              }
               
              var alteredStyle = "";
              var pieceToRemove = "";
              var filterString = "";
              var contrastPiece = "";
              //Account for the different ways filter can be represented and alter it accordingly
              if(currentStyle.indexOf("-webkit-filter") >= 0){
                //get current contrast to preserve its value as it will not change. 
                if ( osd.viewport ) {
                  filterString = osd.viewport.viewer.canvas.parentNode.style.webkitFilter;
                }
                else{
                  filterString = osd.canvas.parentNode.style.webkitFilter;
                }
                

                //Break the contrast piece off so that we can play with the brightness piece
                contrastPiece = filterString.substring(filterString.lastIndexOf(" "), filterString.lastIndexOf(")") + 1);
                filterString.replace(contrastPiece, "");

                //Get the current contrast
                currentContrast = contrastPiece.substring(contrastPiece.indexOf("(")+1, contrastPiece.lastIndexOf(")"));

                //Remove the existing filter in the style string.
                pieceToRemove = currentStyle.substring(currentStyle.indexOf("-webkit-filter"), currentStyle.lastIndexOf(";") + 1);

                //Add the second half of the filter
                newFilter += " contrast("+currentContrast+");";

                //Piece the style string back together
                alteredStyle = currentStyle.replace(pieceToRemove, "") + newFilter;    
              }
              else if(currentStyle.indexOf("-moz-filter") >= 0){
                //The current version of firefox uses filter without the -moz- prefix 
                
              }
               else if(currentStyle.indexOf("-o-filter") >= 0){
                //get current contrast to preserve its value as it will not change. 
                if ( osd.viewport ) {
                  filterString = osd.viewport.viewer.canvas.parentNode.style.webkitFilter;
                }
                else{
                  filterString = osd.canvas.parentNode.style.webkitFilter;
                }

                //Break the contrast piece off so that we can play with the brightness piece
                contrastPiece = filterString.substring(filterString.lastIndexOf(" "), filterString.lastIndexOf(")") + 1);
                filterString.replace(contrastPiece, "");

                //Get the current contrast
                currentContrast = contrastPiece.substring(contrastPiece.indexOf("(")+1, contrastPiece.lastIndexOf(")"));

                //Remove the existing filter in the style string.
                pieceToRemove = currentStyle.substring(currentStyle.indexOf("-o-filter"), currentStyle.lastIndexOf(";") + 1);

                //Add the second half of the filter
                newFilter += " contrast("+currentContrast+");";

                //Piece the style string back together
                alteredStyle = currentStyle.replace(pieceToRemove, "") + newFilter;    
              }
              else if(currentStyle.indexOf("filter") >= 0){
                //get current contrast to preserve its value as it will not change. 
                if ( osd.viewport ) {
                  if(moz){
                    filterString = osd.viewport.viewer.canvas.parentNode.style.filter;
                  }
                  else{
                    filterString = osd.viewport.viewer.canvas.parentNode.style.webkitFilter;
                  }
                  
                }
                else{
                  if(moz){
                    filterString = osd.canvas.parentNode.style.filter;
                  }
                  else{
                    filterString = osd.canvas.parentNode.style.webkitFilter;
                  }
                  
                }
               

                //Break the contrast piece off so that we can play with the brightness piece
                contrastPiece = filterString.substring(filterString.lastIndexOf(" "), filterString.lastIndexOf(")") + 1);
                filterString.replace(contrastPiece, "");

                //Get the current contrast
                currentContrast = contrastPiece.substring(contrastPiece.indexOf("(")+1, contrastPiece.lastIndexOf(")"));

                //Remove the existing filter in the style string.
                pieceToRemove = currentStyle.substring(currentStyle.indexOf("filter"), currentStyle.lastIndexOf(";") + 1);

                //Add the second half of the filter
                newFilter += " contrast("+currentContrast+");";

                //Piece the style string back together
                alteredStyle = currentStyle.replace(pieceToRemove, "") + newFilter;
              }
              else{
                //There was no filter found, so we have to contruct it for the first time.
                newFilter += " contrast(100%);";
                alteredStyle = currentStyle + " "+newFilter;    
              }
              if ( osd.viewport ) {
                  osd.viewport.viewer.canvas.parentNode.setAttribute("style",alteredStyle);
              }
              else{
                osd.canvas.parentNode.setAttribute("style",alteredStyle);
              }
              
            }
      });

      this.element.find(".contrastSlider").slider({
         orientation: "horizontal",
          range: "min",
          min: 0,
          max: 200,
          value:100,
          slide: function( event, ui ) {
            var osd = _this.osd;
            var newFilter = "-webkit-filter: ";
            var moz = false;
            //First find any existing filter for brightness and remove it.
              
              //Need to be able to tell which vendor preifxes I need if any.  
              if( navigator.userAgent.indexOf("Chrome") != -1 ) {
                newFilter = "-webkit-filter: ";
              } 
              else if( navigator.userAgent.indexOf("Opera") != -1 ) {
                newFilter = "-o-filter: ";
              }
              else if( navigator.userAgent.indexOf("MSIE") != -1 ) {
                newFilter="filter: ";
              } 
              else if( navigator.userAgent.indexOf("Firefox") != -1 ) {
                //newFilter = "-moz-filter: "  as of the latest version of firefox, it works without the prefix. 
                newFilter = "filter: ";
                moz = true;
              } 
              else {
                //unsupported
              }
              var currentBrightness = "100%";
              var currentStyle = "";
              if ( osd.viewport ) {
                  currentStyle = osd.viewport.viewer.canvas.parentNode.getAttribute("style");
              }
              else{
                currentStyle = osd.canvas.parentNode.getAttribute("style");
              }
              var alteredStyle = "";
              var pieceToRemove = "";
              var filterString = "";
              var brightnessPiece = "";
              var contrastPiece = "";
              //Account for the different ways filter can be represented and alter it accordingly
              if(currentStyle.indexOf("-webkit-filter") >= 0){
                //get current brightness to preserve its value as it will not change. 
                if ( osd.viewport ) {
                  filterString = osd.viewport.viewer.canvas.parentNode.style.webkitFilter;
                }
                else{
                  filterString = osd.canvas.parentNode.style.webkitFilter;
                }
                

                //break contrast piece from the string so we can play with brightness and contrast separately
                contrastPiece = filterString.substring(filterString.lastIndexOf(" "), filterString.lastIndexOf(")") + 1);
                brightnessPiece = filterString.replace(contrastPiece, "");

                //Get the current brightness value
                currentBrightness = brightnessPiece.substring(brightnessPiece.indexOf("(")+1, brightnessPiece.lastIndexOf(")"));

                //Remove current filter string from the style attribute
                pieceToRemove = currentStyle.substring(currentStyle.indexOf("-webkit-filter"), currentStyle.lastIndexOf(";") + 1);

                //Put the pieces of the filter together
                newFilter += "brightness("+currentBrightness+") contrast("+ui.value+"%);";
                alteredStyle = currentStyle.replace(pieceToRemove, "") + newFilter;    
              }
              else if(currentStyle.indexOf("-moz-filter") >= 0){
                //The latest version of firefox works without the -moz- prefix

              }
              else if(currentStyle.indexOf("-o-filter") >= 0){
                //get current contrast to preserve its value as it will not change. 
                if ( osd.viewport ) {
                  filterString = osd.viewport.viewer.canvas.parentNode.style.webkitFilter;
                }
                else{
                  filterString = osd.canvas.parentNode.style.webkitFilter;
                }

                //Break the contrast piece off so that we can play with the brightness piece
                contrastPiece = filterString.substring(filterString.lastIndexOf(" "), filterString.lastIndexOf(")") + 1);
                filterString.replace(contrastPiece, "");

                //Get the current contrast
                currentContrast = contrastPiece.substring(contrastPiece.indexOf("(")+1, contrastPiece.lastIndexOf(")"));

                //Remove the existing filter in the style string.
                pieceToRemove = currentStyle.substring(currentStyle.indexOf("-o-filter"), currentStyle.lastIndexOf(";") + 1);

                //Add the second half of the filter
                newFilter += " contrast("+currentContrast+");";

                //Piece the style string back together
                alteredStyle = currentStyle.replace(pieceToRemove, "") + newFilter;    
              }
              else if(currentStyle.indexOf("filter") >= 0){
                //get current brightness to preserve its value as it will not change. 
                if ( osd.viewport ) {
                  if(moz){
                    filterString = osd.viewport.viewer.canvas.parentNode.style.filter;
                  }
                  else{
                    filterString = osd.viewport.viewer.canvas.parentNode.style.webkitFilter;
                  }
                  
                }
                else{
                  if(moz){
                    filterString = osd.canvas.parentNode.style.filter;
                  }
                  else{
                    filterString = osd.canvas.parentNode.style.webkitFilter;
                  }
                  
                }

                //break contrast piece from the string so we can play with brightness and contrast separately
                contrastPiece = filterString.substring(filterString.lastIndexOf(" "), filterString.lastIndexOf(")") + 1);
                brightnessPiece = filterString.replace(contrastPiece, "");

                //Get the current brightness value
                currentBrightness = brightnessPiece.substring(brightnessPiece.indexOf("(")+1, brightnessPiece.lastIndexOf(")"));

                //Remove current filter string from the style attribute
                pieceToRemove = currentStyle.substring(currentStyle.indexOf("filter"), currentStyle.lastIndexOf(";") + 1);

                //Put the pieces of the filter together
                newFilter += "brightness("+currentBrightness+") contrast("+ui.value+"%);";
                alteredStyle = currentStyle.replace(pieceToRemove, "") + newFilter;    
              }
              else{
                newFilter += "brightness(100%) contrast("+ui.value+"%);";
                alteredStyle = currentStyle + " "+newFilter;    
              }
              if ( osd.viewport ) {
                  osd.viewport.viewer.canvas.parentNode.setAttribute("style",alteredStyle);
              }
              else{
                osd.canvas.parentNode.setAttribute("style",alteredStyle);
              }
        }
      });
        
        if(_this.element.find(".bbAnnosContainer").length === 0){
          //BH edit.  Create container for this image view's annotations.
          var windowSlotAnnos = jQuery("<div class='bbAnnosContainer'></div>");
          _this.element.append(windowSlotAnnos);
        }
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
      _this.eventEmitter.publish("imageBoundsUpdated", {
        id: _this.windowId, 
          osdBounds: {
            x: _this.osdOptions.osdBounds.x, 
            y: _this.osdOptions.osdBounds.y, 
            width: _this.osdOptions.osdBounds.width, 
            height: _this.osdOptions.osdBounds.height
          }
      });
      var rectangle = this.osd.viewport.viewportToImageRectangle(this.osdOptions.osdBounds);
      _this.eventEmitter.publish("imageRectangleUpdated", {
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
      var _this = this;
      if (hasClass) {
        _this.eventEmitter.publish('REMOVE_CLASS.'+this.windowId, className);
      } else {
        _this.eventEmitter.publish('ADD_CLASS.'+this.windowId, className);
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
          _this.eventEmitter.publish('updateTooltips.' + _this.windowId, [point, point]);
        }, 30));

        _this.osd.addHandler('pan', $.debounce(function(){
          var point = {
            'x': -10000000,
            'y': -10000000
          };
          _this.eventEmitter.publish('updateTooltips.' + _this.windowId, [point, point]);
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
          _this.eventEmitter.publish('osdOpen.'+_this.windowId);
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

          jQuery(_this.osd.canvas).on('mousemove', $.throttle(function(event) {
            if (_this.hud.annoState.current === 'annoOnEditOn') {
              var insideCanvas = (function() {
                var elementCoordinates = OpenSeadragon.getMousePosition(event);
                //console.log(elementCoordinates);
                //var tiledImage = _this.osd.world.getItemAt(0);
                //var imageCoordinates = tiledImage.viewerElementToImageCoordinates(elementCoordinates);
                //var viewportCoordinates = tiledImage.imageToViewportCoordinates(imageCoordinates);
                //console.log(imageCoordinates);
                //console.log(viewportCoordinates);
                //console.log(_this.osd.viewport.pointFromPixel(event.position));
                /*if (viewportCoordinates.x >= 0 && viewportCoordinates.y >= 0) {
                  jQuery(_this.osd.canvas).css('cursor', 'crosshair');
                }*/

              })();
            }
          }, 100, true));

          _this.osd.addHandler('zoom', $.debounce(function() {
            _this.setBounds();
          }, 500));

          _this.osd.addHandler('pan', $.debounce(function(){
            _this.setBounds();
          }, 500));
        });
      })
      .fail(function(){
        //BH edit:  On fail, then it is not an image with a IIIF service.  We can only build certain parts of OSD
        //but we can still get the image out
        _this.elemOsd =
          jQuery('<div/>')
        .addClass(_this.osdCls)
        .attr('id', osdID)
        .appendTo(_this.element);

        //I may not know the height or width of this image or canvas.  Our application does not allow for drawing annotations, so we are not concerned with height/width
        //when we make the canvases.  They are just filled with arbitrary values.  

        var currentCanvasIndex = _this.currentImgIndex;
        var currentCanvasHeight = _this.imagesList[currentCanvasIndex].height;
        var currentCanvasWidth = _this.imagesList[currentCanvasIndex].width;
        
        _this.osd = $.OpenSeadragon({
          'id':           osdID,
          'tileSources':  [
              { 
              'type': 'legacy-image-pyramid',
              'levels':[{ 
                'url': imageUrl,
                'height': currentCanvasHeight,
                'width': currentCanvasWidth
              }
              ]
            }], //This is the consequence of not getting the JSON.  It creates the viewport on which the OSD functions are called.  Without it, OSD does not work.
          'uniqueID' : uniqueID
        });

         

        _this.osd.addHandler('open', function(){
          // console.log(_this.osdOptions.osdBounds);
          if (_this.osdOptions.osdBounds) {
            //var rect = new OpenSeadragon.Rect(0, 0, 1000, 1500);
            var rect = new OpenSeadragon.Rect(0, 0, parseInt(currentCanvasWidth), parseInt(currentCanvasHeight));
            _this.osd.viewport.fitBounds(rect, true);
            //_this.osd.container.fitBounds(rect, true);
          }

          _this.addAnnotationsLayer(_this.elemAnno);
          //re-add correct annotationsLayer mode based on annoState
          if (_this.hud.annoState.current !== "annoOff") {
            jQuery.publish('modeChange.' + _this.windowId, 'displayAnnotations');          
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

        jQuery(_this.osd.canvas).on('mousemove', $.throttle(function(event) {
            if (_this.hud.annoState.current === 'annoOnEditOn') {
              var insideCanvas = (function() {
                var elementCoordinates = OpenSeadragon.getMousePosition(event);
                //console.log(elementCoordinates);
                //var tiledImage = _this.osd.world.getItemAt(0);
                //var imageCoordinates = tiledImage.viewerElementToImageCoordinates(elementCoordinates);
                //var viewportCoordinates = tiledImage.imageToViewportCoordinates(imageCoordinates);
                //console.log(imageCoordinates);
                //console.log(viewportCoordinates);
                //console.log(_this.osd.viewport.pointFromPixel(event.position));
                /*if (viewportCoordinates.x >= 0 && viewportCoordinates.y >= 0) {
                  jQuery(_this.osd.canvas).css('cursor', 'crosshair');
                }*/

              })();
            }
          }, 100, true));
      
       });
    },

    addAnnotationsLayer: function(element) {
      var _this = this;
      _this.annotationsLayer = new $.AnnotationsLayer({
        state: _this.state,
        annotationsList: _this.state.getWindowAnnotationsList(_this.windowId) || [],
        viewer: _this.osd,
        windowId: _this.windowId,
        element: element,
        eventEmitter: _this.eventEmitter
      });

    }, 

    updateImage: function(canvasID) {
      //console.log("Load new full image.  Need to empty and hide bbAnnos.  Can i find it in this 3 ?");
      //console.log(this);
      this.element.find(jQuery(".bbAnnosContainer")).empty().hide();
      //bh edit: hide the anno containers.  We can make it specific to the canvas. 
      var _this = this;
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
        _this.eventEmitter.publish('UPDATE_FOCUS_IMAGES.' + this.windowId, {array: [canvasID]});
      } else {
        _this.eventEmitter.publish('UPDATE_FOCUS_IMAGES.' + this.windowId, {array: [canvasID]});
      }
    },

    next: function() {
      var _this = this;
      var next = this.currentImgIndex + 1;

      if (next < this.imagesList.length) {
        _this.eventEmitter.publish('SET_CURRENT_CANVAS_ID.' + this.windowId, this.imagesList[next]['@id']);
      }
    },

    previous: function() {
      var _this = this;
      var prev = this.currentImgIndex - 1;

      if (prev >= 0) {
        _this.eventEmitter.publish('SET_CURRENT_CANVAS_ID.' + this.windowId, this.imagesList[prev]['@id']);
      }
    }
  };

}(Mirador));
