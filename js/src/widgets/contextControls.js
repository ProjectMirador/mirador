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

      var annotationProperties = this.canvasControls.annotations;

      if (annotationProperties.annotationLayer && this.annoEndpointAvailable) {
        this.annotationElement = jQuery(this.annotationTemplate({
          tools : _this.availableAnnotationTools,
          showEdit : annotationProperties.annotationCreation,
          showRefresh : annotationProperties.annotationRefresh
        })).appendTo(this.container.find('.mirador-osd-annotation-controls'));
        this.annotationElement.hide();
        this.setQtips(this.annotationElement);
        this.setBorderFillColorPickers();
      }

      if (this.canvasControls.imageManipulation.manipulationLayer) {
        this.manipulationElement = jQuery(this.manipulationTemplate({
        })).appendTo(this.container.find('.mirador-manipulation-controls'));
        this.setQtips(this.manipulationElement);
        this.manipulationElement.hide();
      }

      this.bindEvents();
    },

    setQtips: function(element) {
      element.each(function() {
        jQuery(this).qtip({
          content: {
            text: jQuery(this).attr('title'),
          },
          position: {
            my: 'bottom center',
            at: 'top center',
            viewport: true
          },
          style: {
            classes: 'qtip-dark qtip-shadow qtip-rounded'
          }
        });
      });
    },

    setBorderFillColorPickers: function() {
      var _this = this;
      var defaultBorderColor = _this.state.getStateProperty('drawingToolsSettings').strokeColor,
      defaultFillColor = _this.state.getStateProperty('drawingToolsSettings').fillColor,
      defaultAlpha = _this.state.getStateProperty('drawingToolsSettings').fillColorAlpha,
      colorObj = tinycolor(defaultFillColor);
      colorObj.setAlpha(defaultAlpha);

      _this.container.find(".borderColorPicker").spectrum({
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
        maxSelectionSize: 4,
        color: defaultBorderColor,
        palette: [
          [defaultBorderColor, "black", "red", "green"],
          ["white", "blue", "magenta", "yellow"]
        ]
      });

      _this.container.find(".borderColorPicker").next(".sp-replacer").prepend("<i class='material-icons'>border_color</i>");
      _this.container.find(".borderColorPicker").next(".sp-replacer").append('<i class="fa fa-caret-down dropdown"></i>');

      _this.container.find(".fillColorPicker").spectrum({
        showInput: true,
        showInitial: false,
        showAlpha: true,
        showPalette: true,
        showButtons: false,
        showSelectionPalette: true,
        appendTo: 'parent',
        containerClassName: 'fillColorPickerPop'+_this.windowId,
        preferredFormat: "rgb",
        hide: function(color) {
          _this.eventEmitter.publish('changeFillColor.' + _this.windowId, [color.toHexString(), color.getAlpha()]);
          jQuery(this).spectrum("set", color);
        },
        maxSelectionSize: 4,
        color: colorObj,
        palette: [
          [colorObj, "black", "red", "green"],
          ["white", "blue", "magenta", "yellow"]
        ]
      });

      _this.container.find(".fillColorPicker").next(".sp-replacer").prepend("<i class='material-icons'>format_color_fill</i>");
      _this.container.find(".fillColorPicker").next(".sp-replacer").append('<i class="fa fa-caret-down dropdown"></i>');
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
      // this.container.find('.mirador-osd-back').on('click', function() {
      //   _this.element.remove();
      //   _this.element = jQuery(_this.template()).appendTo(_this.container);
      //   _this.bindEvents();
      // });
    },

    annotationTemplate: Handlebars.compile([
                                   '{{#if showEdit}}',
                                   '<a class="mirador-osd-pointer-mode hud-control selected">',
                                   '<i class="fa fa-mouse-pointer"></i>',
                                   '</a>',
                                   '{{#each tools}}',
                                   '<a class="mirador-osd-{{this.logoClass}}-mode hud-control mirador-osd-edit-mode" title="{{t this.tooltip}}">',
                                   '<i class="material-icons">{{this.logoClass}}</i>',
                                   '</a>',
                                   '{{/each}}',
                                   '<a class="hud-control mirador-osd-color-picker" title="{{t "borderColorTooltip"}}">',
                                   '<input type="text" class="borderColorPicker"/>',
                                   '</a>',
                                   '<a class="hud-control mirador-osd-color-picker" title="{{t "fillColorTooltip"}}">',
                                   '<input type="text" class="fillColorPicker"/>',
                                   '</a>',
                                  //  '<a class="hud-control draw-tool mirador-osd-delete-mode">',
                                  //  '<i class="fa fa-lg fa-trash-o"></i>',
                                  //  '</a>',
                                  //  '<a class="hud-control draw-tool mirador-osd-save-mode">',
                                  //  '<i class="fa fa-lg fa-save"></i>',
                                  //  '</a>',
                                   '{{#if showRefresh}}',
                                     '<a class="hud-control mirador-osd-refresh-mode">',
                                     '<i class="fa fa-lg fa-refresh"></i>',
                                     '</a>',
                                   '{{/if}}',
                                   '{{/if}}'
                                   /*'<a class="mirador-osd-list hud-control">',
                                   '<i class="fa fa-lg fa-list"></i>',
                                   '</a>',*/
                                   /*'<a class="mirador-osd-search hud-control" role="button">',
                                   '<i class="fa fa-lg fa-search"></i>',
                                   '</a>',*/
                                   /*'<a class="mirador-osd-rect-tool hud-control" role="button">',
                                   '<i class="fa fa-lg fa-gear"></i>',
                                   '</a>',*/
    ].join('')),

    manipulationTemplate: Handlebars.compile([
                                   '<a class="hud-control mirador-osd-rotate-right" title="{{t "rotateRightTooltip"}}">',
                                   '<i class="fa fa-lg fa-rotate-right"></i>',
                                   '</a>',
                                   '<a class="hud-control mirador-osd-rotate-left" title="{{t "rotateLeftTooltip"}}">',
                                   '<i class="fa fa-lg fa-rotate-left"></i>',
                                   '</a>',
                                   '<a class="hud-control mirador-osd-brightness" title="{{t "brightnessTooltip"}}">',
                                   '<i class="material-icons">wb_sunny</i>',
                                   '<i class="fa fa-caret-down"></i>',
                                   '<div class="mirador-osd-brightness-slider mirador-slider"/>',
                                   '</a>',
                                   '<a class="hud-control mirador-osd-contrast" title="{{t "contrastTooltip"}}">',
                                   '<i class="material-icons">brightness_6</i>',
                                   '<i class="fa fa-caret-down"></i>',
                                   '<div class="mirador-osd-contrast-slider mirador-slider"/>',
                                   '</a>',
                                   '<a class="hud-control mirador-osd-saturation" title="{{t "saturationTooltip"}}">',
                                   '<i class="material-icons">gradient</i>',
                                   '<i class="fa fa-caret-down"></i>',
                                   '<div class="mirador-osd-saturation-slider mirador-slider"/>',
                                   '</a>',
                                   '<a class="hud-control mirador-osd-grayscale" title="{{t "grayscaleTooltip"}}">',
                                   '<i class="material-icons">filter_b_and_w</i>',
                                   '</a>',
                                   '<a class="hud-control mirador-osd-invert" title="{{t "invertTooltip"}}">',
                                   '<i class="material-icons">invert_colors</i>',
                                   '</a>',
                                   '<a class="hud-control mirador-osd-reset" title="{{t "resetTooltip"}}">',
                                   '<i class="fa fa-lg fa-refresh"></i>',
                                   '</a>'
    ].join('')),

    // for accessibility, make sure to add aria-labels just like above
    editorTemplate: Handlebars.compile([
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
