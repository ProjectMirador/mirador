(function($) {

  $.Hud = function(options) {

    jQuery.extend(this, {
      element:   null,
      windowId:  null,
      annoState: null,
      showAnnotations: true,
      annoEndpointAvailable: false,
      eventEmitter: null
    }, options);

    this.init();
  };

  $.Hud.prototype = {

    init: function() {   
      this.createStateMachine();

      this.element = jQuery(this.template({
        showNextPrev : this.showNextPrev, 
        showBottomPanel : typeof this.bottomPanelAvailable === 'undefined' ? true : this.bottomPanelAvailable,
        showAnno : this.annotationLayerAvailable
      })).appendTo(this.appendTo);

      if (this.annotationLayerAvailable && this.annoEndpointAvailable) {
        this.contextControls = new $.ContextControls({
          element: null,
          container: this.appendTo,
          mode: 'displayAnnotations',
          windowId: this.windowId,
          annotationCreationAvailable: this.annotationCreationAvailable,
          availableTools: this.availableTools,
          eventEmitter: this.eventEmitter
        });
      }

      this.bindEvents();
    },
     
    //BH edit to allow commenting annotations when images are non-IIIF
    bbShowAnnos: function(){
      this.parent.element.find(".bbAnnosContainer").show(); //imageview
    },

    //BH edit to allow commenting annotations when images are non-IIIF
    bbHideAnnos: function(){
      this.parent.element.find(".bbAnnosContainer").hide();//imageview
    },

    bindEvents: function() {
      var _this = this,
      firstCanvasId = _this.parent.imagesList[0]['@id'],
      lastCanvasId = _this.parent.imagesList[_this.parent.imagesList.length-1]['@id'];
      var imgFlag = false;

      // this.parent.element.find('.mirador-osd-next').on('click', function() {
      //   _this.parent.next();
      // });

      // this.parent.element.find('.mirador-osd-previous').on('click', function() {
      //   _this.parent.previous();
      // });

      this.parent.element.find('.mirador-osd-annotations-layer').on('click', function() {
        if (_this.annoState.current === 'none') {
          _this.annoState.startup(this);
        }
        if (_this.annoState.current === 'annoOff') {
          if(_this.parent.osd.viewport){
            //BH edit for toggling annotations from BB on non-IIIF images
            _this.bbShowAnnos();
            _this.annoState.displayOn(this);
          }
          else{ //it is one of ours
            //BH edit for toggling annotations on non-IIIF image
            _this.bbShowAnnos();
            _this.annoState.displayOn(this);
          }
          
        } 
        else {
          if(_this.parent.osd.viewport){
            _this.bbHideAnnos();
            _this.annoState.displayOff(this);
          }
          else{ //it is one of ours
            //BH edit for toggling annotations on non-IIIF image
            _this.bbHideAnnos();
            _this.annoState.displayOff(this);
          }
          _this.annoState.displayOn(this);
        } 

      });

      // this.parent.element.find('.mirador-osd-go-home').on('click', function() {
      //    if(_this.parent.osd.viewport){
      //     badImg = true;
      //     _this.parent.osd.goHome();
      //    }
      //  });

      // this.parent.element.find('.mirador-osd-up').on('click', function() {
      //   var panBy = _this.getPanByValue();
      //   var osd = _this.parent.osd;
      //   osd.viewport.panBy(new OpenSeadragon.Point(0, -panBy.y));
      //   osd.viewport.applyConstraints();
      // });
      // this.parent.element.find('.mirador-osd-right').on('click', function() {
      //   var panBy = _this.getPanByValue();
      //   var osd = _this.parent.osd;
      //   osd.viewport.panBy(new OpenSeadragon.Point(panBy.x, 0));
      //   osd.viewport.applyConstraints();
      // });
      // this.parent.element.find('.mirador-osd-down').on('click', function() {
      //   var panBy = _this.getPanByValue();
      //   var osd = _this.parent.osd;
      //   osd.viewport.panBy(new OpenSeadragon.Point(0, panBy.y));
      //   osd.viewport.applyConstraints();
      // });
      // this.parent.element.find('.mirador-osd-left').on('click', function() {
      //   var panBy = _this.getPanByValue();
      //   var osd = _this.parent.osd;
      //   osd.viewport.panBy(new OpenSeadragon.Point(-panBy.x, 0));
      //   osd.viewport.applyConstraints();
      // });
      // this.parent.element.find('.mirador-osd-zoom-in').on('click', function() {
      //   var osd = _this.parent.osd;
      //   //hack #2:  If no viewport, do it on something else?  osd or osd container perhaps?
      //   if (osd.viewport) {
      //     osd.viewport.zoomBy(
      //       osd.zoomPerClick / 1.0
      //     );
      //     osd.viewport.applyConstraints();
      //   }
      // });
      // this.parent.element.find('.mirador-osd-zoom-out').on('click', function() {
      //   var osd = _this.parent.osd;
      //   if ( osd.viewport ) {
      //     osd.viewport.zoomBy(
      //       1.0 / osd.zoomPerClick
      //     );
      //     osd.viewport.applyConstraints();
      //   }
      // });

      // this.parent.element.find('.mirador-osd-fullscreen').on('click', function() {
      //   if (OpenSeadragon.isFullScreen()) {
      //     OpenSeadragon.exitFullScreen();
      //   } else {
      //     OpenSeadragon.requestFullScreen(_this.parent.parent.element[0]);
      //   }
      // });

       this.parent.element.find('.mirador-osd-flip').on('click', function() {
        //Can do html rotations if we detect no viewport.
        var osd = _this.parent.osd;
        if ( osd.viewport ) {
        var currentRotation = parseInt(osd.viewport.getRotation());
          osd.viewport.setRotation(
            currentRotation + 180
          );
          osd.viewport.applyConstraints();
        }
      });
      this.parent.element.find('.mirador-osd-positive-rotate').on('click', function() {
        var osd = _this.parent.osd;
        //Can do html rotations if we detect no viewport.
        if ( osd.viewport ) {
        var currentRotation = parseInt(osd.viewport.getRotation());
            osd.viewport.setRotation(
            currentRotation + 90
          );
          osd.viewport.applyConstraints();
        }
      });
      this.parent.element.find('.mirador-osd-negative-rotate').on('click', function() {
        //Can do html rotations if we detect no viewport.
        var osd = _this.parent.osd;
        if ( osd.viewport ) {
          var currentRotation = parseInt(osd.viewport.getRotation());
            osd.viewport.setRotation(
            currentRotation - 90
          );
          osd.viewport.applyConstraints();
        }
      });
      this.parent.element.find('.mirador-osd-toggle-grayscale').on('click', function() {
        var osd = _this.parent.osd;
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
      
      this.parent.element.find('.mirador-osd-toggle-invert').on('click', function() {
        var osd = _this.parent.osd;
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
      
      this.parent.element.find('.mirador-osd-filters-off').on('click', function(event) {
        var osd = _this.parent.osd;
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

      this.parent.element.find('.mirador-pan-zoom-toggle').on('click', function(event){
        event = event || window.event;
        if(event.target.className.indexOf("opened") > -1 ){
          event.target.className = "viewImgManip closed";
          event.target.parentNode.style.right = "0px";
          event.target.parentNode.nextSibling.style.right = "-350px";
          event.target.parentNode.previousSibling.style.right = "0px";
          event.target.parentNode.setAttribute("title", "View Image Manipulation Tools");
        }
        else if (event.target.className.indexOf("closed") > -1){
          event.target.className = "viewImgManip opened";
          event.target.parentNode.nextSibling.style.right = "0px";
          event.target.parentNode.previousSibling.style.right = "194px";
          event.target.parentNode.style.right = "206px";
          event.target.parentNode.setAttribute("title", "Hide Image Manipulation Tools");
        }
        else{
          //You hit an odd target.  
        }
      });

      this.parent.element.find(".brightnessSlider").slider({
          orientation: "horizontal",
          range: "min",
          min: 0,
          max: 200,
          value:100,
          slide: function( event, ui ) {
            var osd = _this.parent.osd;
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

      this.parent.element.find(".contrastSlider").slider({
         orientation: "horizontal",
          range: "min",
          min: 0,
          max: 200,
          value:100,
          slide: function( event, ui ) {
            var osd = _this.parent.osd;
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

      // jQuery(document).on("webkitfullscreenchange mozfullscreenchange fullscreenchange", function() {
      //   _this.fullScreen();
      // });

      // this.parent.element.find('.mirador-osd-toggle-bottom-panel').on('click', function() {
      //   var visible = !_this.parent.parent.bottomPanelVisible;
      //   _this.parent.parent.bottomPanelVisibility(visible);
      // });

      // jQuery.subscribe('bottomPanelSet.' + _this.windowId, function(event, visible) {
      //   var dodgers = _this.parent.element.find('.mirador-osd-toggle-bottom-panel, .mirador-pan-zoom-controls, .mirador-pan-zoom-toggle, .mirador-img-manipulation');
      //   var arrows = _this.parent.element.find('.mirador-osd-next, .mirador-osd-previous');
      //   if (visible === true) {
      //     dodgers.css({transform: 'translateY(-130px)'});
      //     arrows.css({transform: 'translateY(-65px)'});
      //   } else {
      //     dodgers.css({transform: 'translateY(0)'});
      //     arrows.css({transform: 'translateY(0)'});
      //   }
      // });

      // jQuery.subscribe('currentCanvasIDUpdated.' + _this.windowId, function(event, canvasId) {
      //   // If it is the first canvas, hide the "go to previous" button, otherwise show it.
      //   if (canvasId === firstCanvasId) {
      //     _this.parent.element.find('.mirador-osd-previous').hide();
      //     _this.parent.element.find('.mirador-osd-next').show();
      //   } else if (canvasId === lastCanvasId) {
      //     _this.parent.element.find('.mirador-osd-next').hide();
      //     _this.parent.element.find('.mirador-osd-previous').show();
      //   } else {
      //     _this.parent.element.find('.mirador-osd-next').show();
      //     _this.parent.element.find('.mirador-osd-previous').show();
      //   }
        
        if(_this.parent.parent.element.find(".bbAnnosContainer").length === 0){
          //BH edit.  Create container for this image view's annotations.
          var windowSlotAnnos = jQuery("<div class='bbAnnosContainer'></div>");
          _this.parent.element.append(windowSlotAnnos);
        }
      });
    },

    createStateMachine: function() {
      //add more to these as AnnoState becomes more complex
      var _this = this,
      duration = "200";
      //initial state is 'none'
      this.annoState = StateMachine.create({
        events: [
          { name: 'startup',  from: 'none',  to: 'annoOff' },
          { name: 'displayOn',  from: 'annoOff',  to: 'annoOnCreateOff' },
          { name: 'refreshCreateOff',  from: 'annoOnCreateOff',  to: 'annoOnCreateOff' },          
          { name: 'createOn', from: ['annoOff','annoOnCreateOff'], to: 'annoOnCreateOn' },
          { name: 'refreshCreateOn',  from: 'annoOnCreateOn',  to: 'annoOnCreateOn' },          
          { name: 'createOff',  from: 'annoOnCreateOn',    to: 'annoOnCreateOff' },
          { name: 'displayOff', from: ['annoOnCreateOn','annoOnCreateOff'], to: 'annoOff' }
        ],
        callbacks: {
          onstartup: function(event, from, to) {
            _this.eventEmitter.publish(('windowUpdated'), {
              id: _this.windowId,
              annotationState: to
            });
          },
          ondisplayOn: function(event, from, to) { 
            if (_this.annoEndpointAvailable) {
                _this.eventEmitter.publish('HUD_FADE_OUT.' + _this.windowId, ['.mirador-osd-annotations-layer', duration, function() {      
                  _this.contextControls.show();
                }]);
            } else {
              _this.eventEmitter.publish('HUD_ADD_CLASS.'+_this.windowId, ['.mirador-osd-annotations-layer', 'selected']);
            }
            _this.eventEmitter.publish('modeChange.' + _this.windowId, 'displayAnnotations');
            _this.eventEmitter.publish(('windowUpdated'), {
              id: _this.windowId,
              annotationState: to
            });
          },
          onrefreshCreateOff: function(event, from, to) {
            _this.eventEmitter.publish('modeChange.' + _this.windowId, 'displayAnnotations');
            _this.eventEmitter.publish(('windowUpdated'), {
              id: _this.windowId,
              annotationState: to
            });
          },
          oncreateOn: function(event, from, to) {
            function enableEditingAnnotations() {
              _this.eventEmitter.publish('HUD_ADD_CLASS.'+_this.windowId, ['.mirador-osd-edit-mode', 'selected']);
              _this.eventEmitter.publish('modeChange.' + _this.windowId, 'editingAnnotations');
            }
            if (_this.annoEndpointAvailable) {
              if (from === "annoOff") {
                _this.eventEmitter.publish('HUD_FADE_OUT.' + _this.windowId, ['.mirador-osd-annotations-layer', duration, function() {      
                  _this.contextControls.show();
                  enableEditingAnnotations();
                }]);
              } else {
                enableEditingAnnotations();
              }
            }
            _this.eventEmitter.publish(('windowUpdated'), {
              id: _this.windowId,
              annotationState: to
            });
          },
          onrefreshCreateOn: function(event, from, to) {
            _this.eventEmitter.publish('modeChange.' + _this.windowId, 'editingAnnotations');
            _this.eventEmitter.publish(('windowUpdated'), {
              id: _this.windowId,
              annotationState: to
            });
          },
          oncreateOff: function(event, from, to) { 
            _this.eventEmitter.publish('HUD_REMOVE_CLASS.'+_this.windowId, ['.mirador-osd-edit-mode', 'selected']);
            _this.eventEmitter.publish('modeChange.' + _this.windowId, 'displayAnnotations');
            _this.eventEmitter.publish(('windowUpdated'), {
              id: _this.windowId,
              annotationState: to
            });
          },
          ondisplayOff: function(event, from, to) { 

            if (_this.annoEndpointAvailable) {
              _this.eventEmitter.publish('HUD_REMOVE_CLASS.'+_this.windowId, ['.mirador-osd-edit-mode', 'selected']);
              _this.contextControls.hide(function() {
                _this.eventEmitter.publish('HUD_FADE_IN.' + _this.windowId, ['.mirador-osd-annotations-layer', duration]);
              });
            } else {
              _this.eventEmitter.publish('HUD_REMOVE_CLASS.'+_this.windowId, ['.mirador-osd-annotations-layer', 'selected']);
            }
            _this.eventEmitter.publish('modeChange.' + _this.windowId, 'default');
            _this.eventEmitter.publish(('windowUpdated'), {
              id: _this.windowId,
              annotationState: to
            });
          }
        }
      });
    },

    template: Handlebars.compile([
                                 '{{#if showNextPrev}}',
                                 '<a class="mirador-osd-previous hud-control ">',
                                 '<i class="fa fa-3x fa-chevron-left "></i>',
                                 '</a>',
                                 '{{/if}}',
                                 '{{#if showAnno}}',
                                 '<a class="mirador-osd-annotations-layer hud-control" role="button" aria-label="Toggle annotations">',
                                 '<i class="fa fa-lg fa-comments"></i>',
                                 '</a>',
                                 '{{/if}}',
                                 '{{#if showNextPrev}}',
                                 '<a class="mirador-osd-next hud-control ">',
                                 '<i class="fa fa-3x fa-chevron-right"></i>',
                                 '</a>',
                                 '{{/if}}',
                                 '{{#if showBottomPanel}}',
                                 '<a class="mirador-osd-toggle-bottom-panel hud-control" role="button" aria-label="Toggle Bottom Panel">',
                                 '<i class="fa fa-2x fa-ellipsis-h"></i>',
                                 '</a>',
                                 '{{/if}}',
                                 '<div class="mirador-pan-zoom-controls hud-control">',
                                 '<a class="mirador-osd-up hud-control" role="button" aria-label="Move image up">',
                                 '<i class="fa fa-chevron-circle-up"></i>',
                                 '</a>',
                                 '<a class="mirador-osd-right hud-control" role="button" aria-label="Move image right">',
                                 '<i class="fa fa-chevron-circle-right"></i>',
                                 '</a>',
                                 '<a class="mirador-osd-down hud-control" role="button" aria-label="Move image down">',
                                 '<i class="fa fa-chevron-circle-down"></i>',
                                 '</a>',
                                 '<a class="mirador-osd-left hud-control" role="button" aria-label="Move image left">',
                                 '<i class="fa fa-chevron-circle-left"></i>',
                                 '</a>',
                                 '<a class="mirador-osd-zoom-in hud-control" role="button" aria-label="Zoom in">',
                                 '<i class="fa fa-plus-circle"></i>',
                                 '</a>',
                                 '<a class="mirador-osd-zoom-out hud-control" role="button" aria-label="Zoom out">',
                                 '<i class="fa fa-minus-circle"></i>',
                                 '</a>',
                                 '<a class="mirador-osd-go-home hud-control" role="button" aria-label="Reset image bounds">',
                                 '<i class="fa fa-home"></i>',
                                 '</a>',
                                 '</div>',
                                 '<div title="View Image Manipulation Tools" class="mirador-pan-zoom-toggle hud-control">',
                                 '<img class="viewImgManip closed" src="../brokenBooks/images/imageadjust.png">',
                                 '</div>',
                                 '<div class="mirador-img-manipulation hud-control">',
                                 '<div title="Change Image Brightness" class="mirador-osd-brightness hud-control">',
                                 '<span>Brightness</span>',
                                 '<span class="brightnessSlider"></span>',
                                 '<img class="imgManipIcon" src="../brokenBooks/images/brightness.png">',
                                 '</div>',
                                 '<div title="Change Image Contrast" class="mirador-osd-contrast hud-control">',
                                 '<span>Contrast</span>',
                                 '<span class="contrastSlider"></span>',
                                 '<img class="imgManipIcon" src="../brokenBooks/images/contrast.png">',
                                 '</div>',
                                 '<a title="Toggle Grayscale" class="mirador-osd-toggle-grayscale hud-control">',
                                 '<span>Grayscale</span><img class="imgManipIcon" src="../brokenBooks/images/grayscale.png">',
                                 '</a>',
                                 '<a title="Invert Colors" class="mirador-osd-toggle-invert hud-control">',
                                 '<span>Invert<span><img class="imgManipIcon" src="../brokenBooks/images/invert.png">',
                                 '</a>',
                                 '<a title="Rotate +180 degrees" class="mirador-osd-flip hud-control">',
                                 '<i class="fa fa-refresh"></i>',
                                 '</a>',
                                 '<a title="Rotate +90 degrees" class="mirador-osd-positive-rotate hud-control">',
                                 '<i class="fa fa-rotate-right"></i>',
                                 '</a>',
                                 '<a title="Rotate -90 degrees" class="mirador-osd-negative-rotate hud-control">',
                                 '<i class="fa fa-rotate-left"></i>',
                                 '</a>',
                                 '<a title="Remove Tool Effects" class="mirador-osd-filters-off hud-control">',
                                 '<span>RESET</span>',
                                 '</a>',
                                 '</div>'
    ].join(''))

  };

}(Mirador));
