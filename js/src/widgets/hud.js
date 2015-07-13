(function($) {

  $.Hud = function(options) {

    jQuery.extend(this, {
      element:   null,
      parent:    null,
      windowId:  null,
      annoState: null,
      showAnnotations: true,
      annoEndpointAvailable: false
    }, options);

    this.init();
  };

  $.Hud.prototype = {

    init: function() {   
      this.createStateMachine();

      this.element = jQuery(this.template({
        showNextPrev : this.parent.imagesList.length !== 1, 
        showBottomPanel : typeof this.bottomPanelAvailable === 'undefined' ? true : this.bottomPanelAvailable,
        showAnno : this.annotationLayerAvailable
      })).appendTo(this.element);

      if (this.annotationLayerAvailable && this.annoEndpointAvailable) {
        this.contextControls = new $.ContextControls({
          element: null,
          container: this.parent.element,
          mode: 'displayAnnotations',
          parent: this,
          windowId: this.windowId
        });
      }

      this.bindEvents();

      if (typeof this.bottomPanelAvailable !== 'undefined' && !this.bottomPanelAvailable) {
        this.parent.parent.bottomPanelVisibility(false);
      } else {
        this.parent.parent.bottomPanelVisibility(this.parent.parent.bottomPanelVisible);
      }
    },

    bindEvents: function() {
      var _this = this,
      firstCanvasId = _this.parent.imagesList[0]['@id'],
      lastCanvasId = _this.parent.imagesList[_this.parent.imagesList.length-1]['@id'];

      this.parent.element.find('.mirador-osd-next').on('click', function() {
        _this.parent.next();
      });

      this.parent.element.find('.mirador-osd-previous').on('click', function() {
        _this.parent.previous();
      });

      this.parent.element.find('.mirador-osd-annotations-layer').on('click', function() {
        if (_this.annoState.current === 'annoOff') {
          _this.annoState.displayOn(this);
        } else {
          _this.annoState.displayOff(this);          
        }
      });

      this.parent.element.find('.mirador-osd-go-home').on('click', function() {
        _this.parent.osd.viewport.goHome();
      });

      this.parent.element.find('.mirador-osd-up').on('click', function() {
        var osd = _this.parent.osd;
        osd.viewport.panBy(new OpenSeadragon.Point(0, -0.05));
        osd.viewport.applyConstraints();
      });
      this.parent.element.find('.mirador-osd-right').on('click', function() {
        var osd = _this.parent.osd;
        osd.viewport.panBy(new OpenSeadragon.Point(0.05, 0));
        osd.viewport.applyConstraints();
      });
      this.parent.element.find('.mirador-osd-down').on('click', function() {
        var osd = _this.parent.osd;
        osd.viewport.panBy(new OpenSeadragon.Point(0, 0.05));
        osd.viewport.applyConstraints();
      });
      this.parent.element.find('.mirador-osd-left').on('click', function() {
        var osd = _this.parent.osd;
        osd.viewport.panBy(new OpenSeadragon.Point(-0.05, 0));
        osd.viewport.applyConstraints();
      });
      this.parent.element.find('.mirador-osd-zoom-in').on('click', function() {
        var osd = _this.parent.osd;
        if ( osd.viewport ) {
          osd.viewport.zoomBy(
            osd.zoomPerClick / 1.0
          );
          osd.viewport.applyConstraints();
        }
      });
      this.parent.element.find('.mirador-osd-zoom-out').on('click', function() {
        var osd = _this.parent.osd;
        if ( osd.viewport ) {
          osd.viewport.zoomBy(
            1.0 / osd.zoomPerClick
          );
          osd.viewport.applyConstraints();
        }
      });

      this.parent.element.find('.mirador-osd-fullscreen').on('click', function() {
        if (OpenSeadragon.isFullScreen()) {
          OpenSeadragon.exitFullScreen();
        } else {
          OpenSeadragon.requestFullScreen(_this.parent.parent.element[0]);
        }
      });

       this.parent.element.find('.mirador-osd-flip').on('click', function() {
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
        if ( osd.viewport ) {
        var currentRotation = parseInt(osd.viewport.getRotation());
            osd.viewport.setRotation(
            currentRotation + 90
          );
          osd.viewport.applyConstraints();
        }
      });
      this.parent.element.find('.mirador-osd-negative-rotate').on('click', function() {
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
          osd.viewport.zoomTo(0);
          parentElement.find(".brightnessSlider").slider("option","value",100); //reset sliders.
          parentElement.find(".contrastSlider").slider("option","value",100); //reset sliders.
          osd.viewport.applyConstraints();
        }
      });

      this.parent.element.find('.mirador-pan-zoom-toggle').on('click', function(event){
        event = event || window.event;
        if(event.target.className == "fa fa-2x fa-mail-forward"){
          event.target.className = "fa fa-2x fa-mail-reply";
          event.target.parentNode.style.right = "118px";
          event.target.parentNode.nextSibling.style.right = "-350px";
          event.target.parentNode.setAttribute("title", "View Image Manipulation Tools");
        }
        else if (event.target.className == "fa fa-2x fa-mail-reply"){
          event.target.className = "fa fa-2x fa-mail-forward";
          event.target.parentNode.nextSibling.style.right = "117px";
          event.target.parentNode.style.right = "371px";
          event.target.parentNode.setAttribute("title", "Hide Image Manipulation Tools");
        }
        else{
          //You hit an odd target.  
        }
      });

      this.parent.element.find(".brightnessSlider").slider({
        orientation: "vertical",
          range: "min",
          min: 0,
          max: 200,
          value:100,
          slide: function( event, ui ) {
            var osd = _this.parent.osd;
            var newFilter = "";
            
            if ( osd.viewport ) {
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
              } 
              else {
                //Not a browser we accounted for so filter will not work
              }
              var currentContrast = "100%";
              var currentStyle = osd.viewport.viewer.canvas.parentNode.getAttribute("style");
              var alteredStyle = "";
              var pieceToRemove = "";
              var filterString = "";
              var contrastPiece = "";
              //Account for the different ways filter can be represented and alter it accordingly
              if(currentStyle.indexOf("-webkit-filter") >= 0){
                //get current contrast to preserve its value as it will not change. 
                filterString = osd.viewport.viewer.canvas.parentNode.style.webkitFilter;

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
                alteredStyle = currentStyle;
              }
               else if(currentStyle.indexOf("-o-filter") >= 0){
                //get current contrast to preserve its value as it will not change. 
                filterString = osd.viewport.viewer.canvas.parentNode.style.mozFilter;

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
                filterString = osd.viewport.viewer.canvas.parentNode.style.filter;
                console.log(filterString);

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
              osd.viewport.viewer.canvas.parentNode.setAttribute("style",alteredStyle);
            }
        }
      });

      this.parent.element.find(".contrastSlider").slider({
         orientation: "vertical",
          range: "min",
          min: 0,
          max: 200,
          value:100,
          slide: function( event, ui ) {
            var osd = _this.parent.osd;
            var newFilter = "-webkit-filter: ";
            //First find any existing filter for brightness and remove it.
            if ( osd.viewport ) {
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
              } 
              else {
                console.log("unknown");
              }
              var currentBrightness = "100%";
              
              var currentStyle = osd.viewport.viewer.canvas.parentNode.getAttribute("style");
              var alteredStyle = "";
              var pieceToRemove = "";
              var filterString = "";
              var brightnessPiece = "";
              var contrastPiece = "";
              //Account for the different ways filter can be represented and alter it accordingly
              if(currentStyle.indexOf("-webkit-filter") >= 0){
                //get current brightness to preserve its value as it will not change. 
                filterString = osd.viewport.viewer.canvas.parentNode.style.webkitFilter;

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
                filterString = osd.viewport.viewer.canvas.parentNode.style.mozFilter;

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
                filterString = osd.viewport.viewer.canvas.parentNode.style.filter;

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
              osd.viewport.viewer.canvas.parentNode.setAttribute("style",alteredStyle);
            }
        }
      });

      jQuery(document).on("webkitfullscreenchange mozfullscreenchange fullscreenchange", function() {
        _this.fullScreen();
      });

      this.parent.element.find('.mirador-osd-toggle-bottom-panel').on('click', function() {
        var visible = !_this.parent.parent.bottomPanelVisible;
        _this.parent.parent.bottomPanelVisibility(visible);
      });

      jQuery.subscribe('bottomPanelSet.' + _this.windowId, function(event, visible) {
        var dodgers = _this.parent.element.find('.mirador-osd-toggle-bottom-panel, .mirador-pan-zoom-controls, .mirador-osd-annotations-layer');
        var arrows = _this.parent.element.find('.mirador-osd-next, .mirador-osd-previous');
        if (visible === true) {
          dodgers.css({transform: 'translateY(-130px)'});
          arrows.css({transform: 'translateY(-65px)'});
        } else {
          dodgers.css({transform: 'translateY(0)'});
          arrows.css({transform: 'translateY(0)'});
        }
      });

      jQuery.subscribe('currentCanvasIDUpdated.' + _this.windowId, function(event, canvasId) {
        // console.log(canvasId);
        // console.log(lastCanvasId);
        // If it is the first canvas, hide the "go to previous" button, otherwise show it.
        if (canvasId === firstCanvasId) {
          _this.parent.element.find('.mirador-osd-previous').hide();
          _this.parent.element.find('.mirador-osd-next').show();
        } else if (canvasId === lastCanvasId) {
          _this.parent.element.find('.mirador-osd-next').hide();
          _this.parent.element.find('.mirador-osd-previous').show();
        } else {
          _this.parent.element.find('.mirador-osd-next').show();
          _this.parent.element.find('.mirador-osd-previous').show();
        }
        // If it is the last canvas, hide the "go to previous" button, otherwise show it.
      });
    },

    createStateMachine: function() {
      //add more to these as AnnoState becomes more complex
      var _this = this;
      this.annoState = StateMachine.create({
        initial: 'annoOff',
        events: [
          { name: 'displayOn',  from: 'annoOff',  to: 'annoOnEditOff' },
          { name: 'editOn', from: 'annoOnEditOff', to: 'annoOnEditOn' },
          { name: 'editOff',  from: 'annoOnEditOn',    to: 'annoOnEditOff' },
          { name: 'displayOff', from: ['annoOnEditOn','annoOnEditOff'], to: 'annoOff' }
        ],
        callbacks: {
          ondisplayOn: function(event, from, to) { 
            _this.parent.element.find('.mirador-osd-annotations-layer').addClass("selected");
            if (_this.annoEndpointAvailable) {
              _this.contextControls.show();
            }
            jQuery.publish('modeChange.' + _this.windowId, 'displayAnnotations');
          },
          oneditOn: function(event, from, to) { 
            _this.parent.element.find('.mirador-osd-edit-mode').addClass("selected");
            jQuery.publish('modeChange.' + _this.windowId, 'editingAnnotations');
            if (_this.annoEndpointAvailable) {
              _this.contextControls.rectTool.enterEditMode();
            }
          },
          oneditOff: function(event, from, to) { 
            _this.parent.element.find('.mirador-osd-edit-mode').removeClass("selected");
            jQuery.publish('modeChange.' + _this.windowId, 'displayAnnotations');
            if (_this.annoEndpointAvailable) {
              _this.contextControls.rectTool.exitEditMode();
            }
          },
          ondisplayOff: function(event, from, to) { 
            if (_this.annoEndpointAvailable && _this.contextControls.rectTool) {
              _this.contextControls.rectTool.exitEditMode();
            }
            _this.parent.element.find('.mirador-osd-edit-mode').removeClass("selected");
            _this.parent.element.find('.mirador-osd-annotations-layer').removeClass("selected");
            if (_this.annoEndpointAvailable) {
              _this.contextControls.hide();
            }
            jQuery.publish('modeChange.' + _this.windowId, 'default');            
          }
        }
      });
    },

    fullScreen: function() {
      var replacementButton,
      bottomPanelHeight = this.parent.parent.element.find('.bottomPanel').innerHeight();

      if (!OpenSeadragon.isFullScreen()) {
        replacementButton = jQuery('<i class="fa fa-expand"></i>');
        this.parent.element.find('.mirador-osd-fullscreen').empty().append(replacementButton);
        this.parent.element.find('.mirador-osd-toggle-bottom-panel').show();
        this.parent.parent.bottomPanelVisibility(true);
      } else {

        replacementButton = jQuery('<i class="fa fa-compress"></i>');
        this.parent.element.find('.mirador-osd-fullscreen').empty().append(replacementButton);
        this.parent.element.find('.mirador-osd-toggle-bottom-panel').hide();
        this.parent.parent.bottomPanelVisibility(false);
      }
    },

    template: Handlebars.compile([
                                 '{{#if showNextPrev}}',
                                 '<a class="mirador-osd-previous hud-control ">',
                                 '<i class="fa fa-3x fa-chevron-left "></i>',
                                 '</a>',
                                 '{{/if}}',
                                 '<a class="mirador-osd-fullscreen hud-control">',
                                 '<i class="fa fa-expand"></i>',
                                 '</a>',
                                 '{{#if showAnno}}',
                                 '<a class="mirador-osd-annotations-layer hud-control ">',
                                 '<i class="fa fa-2x fa-comments"></i>',
                                 '</a>',
                                 '{{/if}}',
                                 '{{#if showNextPrev}}',
                                 '<a class="mirador-osd-next hud-control ">',
                                 '<i class="fa fa-3x fa-chevron-right"></i>',
                                 '</a>',
                                 '{{/if}}',
                                 '{{#if showBottomPanel}}',
                                 '<a class="mirador-osd-toggle-bottom-panel hud-control ">',
                                 '<i class="fa fa-2x fa-ellipsis-h"></i>',
                                 '</a>',
                                 '{{/if}}',
                                 '<div class="mirador-pan-zoom-controls hud-control ">',
                                 '<a class="mirador-osd-up hud-control">',
                                 '<i class="fa fa-chevron-circle-up"></i>',
                                 '</a>',
                                 '<a class="mirador-osd-right hud-control">',
                                 '<i class="fa fa-chevron-circle-right"></i>',
                                 '</a>',
                                 '<a class="mirador-osd-down hud-control">',
                                 '<i class="fa fa-chevron-circle-down"></i>',
                                 '</a>',
                                 '<a class="mirador-osd-left hud-control">',
                                 '<i class="fa fa-chevron-circle-left"></i>',
                                 '</a>',
                                 '<a class="mirador-osd-zoom-in hud-control">',
                                 '<i class="fa fa-plus-circle"></i>',
                                 '</a>',
                                 '<a class="mirador-osd-zoom-out hud-control">',
                                 '<i class="fa fa-minus-circle"></i>',
                                 '</a>',
                                 '<a class="mirador-osd-go-home hud-control">',
                                 '<i class="fa fa-home"></i>',
                                 '</a>',
                                 '</div>',
                                 '<div title="View Image Manipulation Tools" class="mirador-pan-zoom-toggle hud-control">',
                                 '<i class="fa fa-2x fa-mail-reply"></i>',
                                 '</div>',
                                 '<div class="mirador-img-manipulation hud-control">',
                                 '<a title="Rotate +90 degrees" class="mirador-osd-positive-rotate hud-control">',
                                 '<i class="fa fa-rotate-right"></i>',
                                 '</a>',
                                 '<a title="Rotate -90 degrees" class="mirador-osd-negative-rotate hud-control">',
                                 '<i class="fa fa-rotate-left"></i>',
                                 '</a>',
                                 '<a title="Rotate +180 degrees" class="mirador-osd-flip hud-control">',
                                 '<i class="fa fa-refresh"></i>',
                                 '</a>',
                                 '<a title="Toggle Grayscale" class="mirador-osd-toggle-grayscale hud-control">',
                                 '<span>gray</span>',
                                 '</a>',
                                 '<a title="Invert Colors" class="mirador-osd-toggle-invert hud-control">',
                                 '<span>invert<span>',
                                 '</a>',
                                 '<a title="Reset Viewport" class="mirador-osd-filters-off hud-control">',
                                 '<span>RESET</span>',
                                 '</a>',
                                 '<div title="Change Image Brightness" class="mirador-osd-brightness">',
                                 '<span>Brightness</span>',
                                 '<span class="brightnessSlider"></span>',
                                 '</div>',
                                 '<div title="Change Image Contrast" class="mirador-osd-contrast">',
                                 '<span>Contrast</span>',
                                 '<span class="contrastSlider"></span>',
                                 '</div>',
                                 '</div>'
    ].join(''))

  };

}(Mirador));
