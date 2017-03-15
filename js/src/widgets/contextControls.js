(function($) {

  $.ContextControls = function(options) {

    jQuery.extend(this, {
      element: null,
      container: null,
      mode: null,
      windowId: null,
      annoEndpointAvailable: false,
      eventEmitter: null
    }, options);

    this.init();
  };

  $.ContextControls.prototype = {

    init: function() {
      var _this = this;
      var showStrokeStyle = false,
      showStrokeColor = false,
      showFillColor = false;
      this.availableAnnotationStylePickers.forEach(function(picker) {
        if (picker === 'StrokeType') {
          showStrokeStyle = true;
        }
        if (picker === 'FillColor') {
          showFillColor = true;
        }
        if (picker === 'StrokeColor') {
          showStrokeColor = true;
        }
      });
      this.setBackground = {
        'solid':function(el){
          _this.setBackgroundImage(el, 'border_type_1.png');
        },
        'dashed':function(el){
          _this.setBackgroundImage(el, 'border_type_2.png');
        },
        'dotdashed':function(el){
          _this.setBackgroundImage(el, 'border_type_3.png');
        },
        'thick':function(el){
          _this.setBackgroundImage(el, 'border_type_4.png');
        },
        'thickest':function(el){
          _this.setBackgroundImage(el, 'border_type_5.png');
        },
      };
      var annotationProperties = this.canvasControls.annotations;

      if (annotationProperties.annotationLayer && this.annoEndpointAvailable) {
        this.annotationElement = jQuery(this.annotationTemplate({
          tools : _this.availableAnnotationTools,
          showEdit : annotationProperties.annotationCreation,
          showStrokeStyle: showStrokeStyle,
          showStrokeColor: showStrokeColor,
          showFillColor: showFillColor,
          showRefresh : annotationProperties.annotationRefresh
        })).appendTo(this.container.find('.mirador-osd-annotation-controls'));
        this.annotationElement.hide();
        this.setQtips(this.container.find('.mirador-osd-annotation-controls'));
        this.setBorderFillColorPickers();
      }

      if(showStrokeStyle){
        this.addStrokeStylePicker();
      }

      if (this.canvasControls.imageManipulation.manipulationLayer) {
        this.manipulationElement = jQuery(this.manipulationTemplate({
          filtersSupported: Modernizr.cssfilters,
          showRotate: this.canvasControls.imageManipulation.controls.rotate,
          showBrightness: this.canvasControls.imageManipulation.controls.brightness,
          showContrast: this.canvasControls.imageManipulation.controls.contrast,
          showSaturate: this.canvasControls.imageManipulation.controls.saturate,
          showGrayscale: this.canvasControls.imageManipulation.controls.grayscale,
          showInvert: this.canvasControls.imageManipulation.controls.invert,
          showMirror: this.canvasControls.imageManipulation.controls.mirror
        })).appendTo(this.container.find('.mirador-manipulation-controls'));
        this.setQtips(this.container.find('.mirador-manipulation-controls'));
        this.manipulationElement.hide();
      }

      this.bindEvents();
    },

    setQtips: function(element) {
      var _this = this;
      element.find('a').each(function() {
        jQuery(this).qtip({
          content: {
            text: jQuery(this).attr('title'),
          },
          position: {
            my: 'bottom center',
            at: 'top center',
            viewport: true,
            container: _this.qtipElement
          },
          style: {
            classes: 'qtip-dark qtip-shadow qtip-rounded'
          }
        });
      });
    },

    addColorPicker:function(selector,options){
      this.container.find(selector).spectrum(options);
    },

    getImagePath:function(imageName){
      return this.state.getStateProperty('buildPath') + this.state.getStateProperty('imagesPath') + imageName;
    },

    setBackgroundImage:function(el,imageName){
      el.css('background-image','url('+this.getImagePath(imageName)+')');
    },

    removeBackgroundImage:function(el){
      el.css('background-image','');
    },

    addStrokeStylePicker:function(){
      this.setBackground.solid(this.container.find('.mirador-line-type .solid'));
      this.setBackground.thick(this.container.find('.mirador-line-type .thick'));
      this.setBackground.thickest(this.container.find('.mirador-line-type .thickest'));
      this.setBackground.dashed(this.container.find('.mirador-line-type .dashed'));
      this.setBackground.dotdashed(this.container.find('.mirador-line-type .dotdashed'));
    },

    setBorderFillColorPickers: function() {
      var _this = this;
      var defaultBorderColor = _this.state.getStateProperty('drawingToolsSettings').strokeColor,
      defaultFillColor = _this.state.getStateProperty('drawingToolsSettings').fillColor,
      defaultAlpha = _this.state.getStateProperty('drawingToolsSettings').fillColorAlpha,
      colorObj = tinycolor(defaultFillColor);
      colorObj.setAlpha(defaultAlpha);

      this.addColorPicker('.borderColorPicker',{
        showInput: true,
        showInitial: false,
        showPalette: true,
        showButtons: false,
        showSelectionPalette: true,
        hideAfterPaletteSelect: true,
        appendTo: 'parent',
        containerClassName: 'borderColorPickerPop'+_this.windowId,
        preferredFormat: "rgb",
        hide: function(color) {
          _this.eventEmitter.publish('changeBorderColor.' + _this.windowId, color.toHexString());
          jQuery(this).spectrum("set", color.toHexString());
        },
        move: function(color) {
          _this.eventEmitter.publish('changeBorderColor.' + _this.windowId, color.toHexString());
        },
        show: function(color) {
          _this.setColorPickerInCanvas('.borderColorPicker');
        },
        maxSelectionSize: 4,
        color: defaultBorderColor,
        palette: [
          [defaultBorderColor, "black", "red", "green"],
          ["white", "blue", "magenta", "yellow"]
        ]
      });

      _this.container.find(".borderColorPicker").next(".sp-replacer").prepend("<i class='material-icons'>border_color</i>");
      // _this.container.find(".borderColorPicker").next(".sp-replacer").append('<i class="fa fa-caret-down dropdown-icon"></i>');

      _this.addColorPicker('.fillColorPicker',{
        showInput: true,
        showInitial: false,
        showAlpha: true,
        showPalette: true,
        showButtons: false,
        showSelectionPalette: true,
        appendTo: 'parent',
        clickoutFiresChange: true,
        containerClassName: 'fillColorPickerPop'+_this.windowId,
        preferredFormat: "rgb",
        hide: function(color) {
          _this.eventEmitter.publish('changeFillColor.' + _this.windowId, [color.toHexString(), color.getAlpha()]);
          jQuery(this).spectrum("set", color);
        },
        move: function(color) {
          _this.eventEmitter.publish('changeFillColor.' + _this.windowId, [color.toHexString(), color.getAlpha()]);
        },
        show: function(color) {
          _this.setColorPickerInCanvas('.fillColorPicker');
        },
        maxSelectionSize: 4,
        color: colorObj,
        palette: [
          [colorObj, "black", "red", "green"],
          ["white", "blue", "magenta", "yellow"]
        ]
      });

      _this.container.find(".fillColorPicker").next(".sp-replacer").prepend("<i class='material-icons'>format_color_fill</i>");
      // _this.container.find(".fillColorPicker").next(".sp-replacer").append('<i class="fa fa-caret-down dropdown-icon"></i>');
    },

    setColorPickerInCanvas: function(selector) {
      // check for the selector being out of canvas
      var pickerContainer=this.container.find(selector).siblings('.sp-container').first(),
      pickerOffset=pickerContainer.offset(),
      windowWidth = this.state.windowsElements[this.windowId].width();
      if (pickerContainer.width() + pickerOffset.left > windowWidth) {
        pickerContainer.css('left', windowWidth - (pickerContainer.outerWidth()));
      }
    },

    annotationShow: function() {
      this.annotationElement.fadeIn("150");
    },

    annotationHide: function() {
      this.annotationElement.fadeOut("150");
    },

    manipulationShow: function() {
      this.manipulationElement.fadeIn("150");
    },

    manipulationHide: function() {
      this.manipulationElement.fadeOut("150");
    },

    bindEvents: function() {
      var _this = this;
      // for some reason using :not selector isn't working for mouseenter/mouseleave,
      // so check for hud-disabled at the beginning instead
      this.container.find('.mirador-line-type').on('mouseenter', function() {
        if (jQuery(this).hasClass('hud-disabled')) {
          return false;
        }
        _this.container.find('.type-list').stop().slideFadeToggle(300);
      });
      this.container.find('.mirador-line-type').on('mouseleave', function() {
        if (jQuery(this).hasClass('hud-disabled')) {
          return false;
        }
        _this.container.find('.type-list').stop().slideFadeToggle(300);
      });
      this.container.find('.mirador-line-type').find('ul li').on('click', function() {
        if (jQuery(this).hasClass('hud-disabled')) {
          return false;
        }
        var className = jQuery(this).find('i').attr('class').replace(/fa/, '').replace(/ /, '');
        _this.removeBackgroundImage(_this.container.find('.mirador-line-type .border-type-image'));
        _this.setBackground[className](_this.container.find('.mirador-line-type .border-type-image'));
        _this.eventEmitter.publish('toggleBorderType.' + _this.windowId, className);
      });
    },

    annotationTemplate: $.Handlebars.compile([
                                   '{{#if showEdit}}',
                                   '<a class="mirador-osd-pointer-mode hud-control selected" title="{{t "pointerTooltip"}}">',
                                   '<i class="fa fa-mouse-pointer"></i>',
                                   '</a>',
                                   '{{#each tools}}',
                                   '<a class="mirador-osd-{{this.logoClass}}-mode hud-control mirador-osd-edit-mode" title="{{t this.tooltip}}">',
                                   '<i class="material-icons">{{this.logoClass}}</i>',
                                   '</a>',
                                   '{{/each}}',
                                   '{{#if showStrokeStyle}}',
                                   '<a class="hud-control hud-dropdown hud-disabled mirador-line-type" aria-label="{{t "borderTypeTooltip"}}" title="{{t "borderTypeTooltip"}}">',
                                   '<i class="material-icons mirador-border-icon">create</i>',
                                   '<i class="border-type-image solid"></i>',
                                   '<i class="fa fa-caret-down dropdown-icon"></i>',
                                   '<ul class="dropdown type-list">',
                                   '<li><i class="fa solid"></i> {{t "solid"}}</li>',
                                   '<li><i class="fa thick"></i> {{t "thick"}}</li>',
                                   '<li><i class="fa thickest"></i> {{t "thickest"}}</li>',
                                   '<li><i class="fa dashed"></i> {{t "dashed"}}</li>',
                                   '<li><i class="fa dotdashed"></i> {{t "dotDashed"}}</li>',
                                   '</ul>',
                                   '</a>',
                                   '{{/if}}',
                                   '{{#if showStrokeColor}}',
                                   '<a class="hud-control hud-dropdown hud-disabled mirador-osd-color-picker" title="{{t "borderColorTooltip"}}">',
                                   '<input type="text" class="borderColorPicker"/>',
                                   '</a>',
                                   '{{/if}}',
                                   '{{#if showFillColor}}',
                                   '<a class="hud-control hud-dropdown hud-disabled mirador-osd-color-picker" title="{{t "fillColorTooltip"}}">',
                                   '<input type="text" class="fillColorPicker"/>',
                                   '</a>',
                                   '{{/if}}',
                                   '{{#if showRefresh}}',
                                     '<a class="hud-control mirador-osd-refresh-mode">',
                                     '<i class="fa fa-lg fa-refresh"></i>',
                                     '</a>',
                                   '{{/if}}',
                                   '{{/if}}'
    ].join('')),

    manipulationTemplate: $.Handlebars.compile([
                                   '{{#if showRotate}}',
                                   '<a class="hud-control mirador-osd-rotate-right" title="{{t "rotateRightTooltip"}}">',
                                   '<i class="fa fa-lg fa-rotate-right"></i>',
                                   '</a>',
                                   '<a class="hud-control mirador-osd-rotate-left" title="{{t "rotateLeftTooltip"}}">',
                                   '<i class="fa fa-lg fa-rotate-left"></i>',
                                   '</a>',
                                   '{{/if}}',

                                '{{#if filtersSupported}}',
                                   '{{#if showBrightness}}',
                                   '<a class="hud-control mirador-osd-brightness" title="{{t "brightnessTooltip"}}">',
                                   '<i class="material-icons">wb_sunny</i>',
                                   '<i class="fa fa-caret-down"></i>',
                                   '<div class="mirador-osd-brightness-slider mirador-slider"/>',
                                   '</a>',
                                   '{{/if}}',
                                   '{{#if showContrast}}',
                                   '<a class="hud-control mirador-osd-contrast" title="{{t "contrastTooltip"}}">',
                                   '<i class="material-icons">brightness_6</i>',
                                   '<i class="fa fa-caret-down"></i>',
                                   '<div class="mirador-osd-contrast-slider mirador-slider"/>',
                                   '</a>',
                                   '{{/if}}',
                                   '{{#if showSaturate}}',
                                   '<a class="hud-control mirador-osd-saturation" title="{{t "saturationTooltip"}}">',
                                   '<i class="material-icons">gradient</i>',
                                   '<i class="fa fa-caret-down"></i>',
                                   '<div class="mirador-osd-saturation-slider mirador-slider"/>',
                                   '</a>',
                                   '{{/if}}',
                                   '{{#if showGrayscale}}',
                                   '<a class="hud-control mirador-osd-grayscale" title="{{t "grayscaleTooltip"}}">',
                                   '<i class="material-icons">filter_b_and_w</i>',
                                   '</a>',
                                   '{{/if}}',
                                   '{{#if showInvert}}',
                                   '<a class="hud-control mirador-osd-invert" title="{{t "invertTooltip"}}">',
                                   '<i class="material-icons">invert_colors</i>',
                                   '</a>',
                                   '{{/if}}',
                                   '{{#if showMirror}}',
                                   '<a class="hud-control mirador-osd-mirror" title="{{t "mirrorTooltip"}}">',
                                   '<i class="material-icons">swap_horiz</i>',
                                   '</a>',
                                   '{{/if}}',
                                   '<a class="hud-control mirador-osd-reset" title="{{t "resetTooltip"}}">',
                                   '<i class="fa fa-lg fa-refresh"></i>',
                                   '</a>',
      '{{/if}}',
    ].join('')),

    // for accessibility, make sure to add aria-labels just like above
    editorTemplate: $.Handlebars.compile([
                                 '<div class="mirador-osd-context-controls hud-container">',
                                   '<a class="mirador-osd-back hud-control" role="button">',
                                   '<i class="fa fa-lg fa-arrow-left"></i>',
                                   '</a>',
                                   '<a class="mirador-osd-rect-tool hud-control" role ="buton">',
                                   '<i class="fa fa-lg fa-pencil-square"></i>',
                                   '</a>',
                                   '<a class="mirador-osd-rect-tool hud-control" role="button">',
                                   '<i class="fa fa-lg fa-ellipsis-h"></i>',
                                   '</a>',
                                   '<a class="mirador-osd-rect-tool hud-control" role="button">',
                                   '<i class="fa fa-lg fa-gear"></i>',
                                   '</a>',
                                 '</div>'
    ].join(''))
  };
}(Mirador));
