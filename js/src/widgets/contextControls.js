(function($) {

  $.ContextControls = function(options) {

    jQuery.extend(this, {
      element: null,
      container: null,
      mode: null,
      windowId: null,
      annoEndpointAvailable: false,
      annotationCreationAvailable: true,
      eventEmitter: null
    }, options);

    this.init();
  };

  $.ContextControls.prototype = {

    init: function() {
      var _this = this;
      this.element = jQuery(this.annotationTemplate({
        tools : _this.availableAnnotationTools,
        showEdit : this.annotationCreationAvailable,
        showRefresh : this.annotationRefresh
      })).appendTo(this.container.find('.mirador-osd-annotation-controls'));

      this.setBorderFillColorPickers();
      this.hide();
      this.bindEvents();
    },

    setBorderFillColorPickers: function() {
      var _this = this;
      _this.container.find(".borderColorPicker").spectrum({
        showInput: true,
        showInitial: true,
        showPalette: true,
        showSelectionPalette: true,
        appendTo: 'parent',
        containerClassName: 'borderColorPickerPop'+_this.windowId,
        preferredFormat: "rgb",
        show: function(color) {
          jQuery.data(document.body, 'borderColorPickerPop' + _this.windowId, color);
        },
        change: function(color) {
          jQuery.data(document.body, 'borderColorPickerPop' + _this.windowId, color);
        },
        move: function(color) {
          jQuery.data(document.body, 'borderColorPickerPop' + _this.windowId, color);
        },
        hide: function(color) {
          color = jQuery.data(document.body, 'borderColorPickerPop' + _this.windowId);
          if (color) {
            _this.eventEmitter.publish('changeBorderColor.' + _this.windowId, color.toHexString());
          }
        },
        maxSelectionSize: 4,
        palette: [
          ["black", "red", "green", "blue"],
          ["white", "cyan", "magenta", "yellow"]
        ]
      });
      
      _this.container.find(".borderColorPicker").next(".sp-replacer").prepend("<i class='material-icons'>border_color</i>");
      
      var borderPicker = jQuery('.borderColorPickerPop'+_this.windowId);
      borderPicker.find(".sp-cancel").html('<i class="fa fa-times-circle-o fa-fw"></i>Cancel');
      borderPicker.find(".sp-cancel").parent().append('<a class="sp-choose" href="#"><i class="fa fa-thumbs-o-up fa-fw"></i>Choose</a>');
      borderPicker.find('button.sp-choose').hide();
      
      borderPicker.find('a.sp-cancel').on('click', function() {
        jQuery.data(document.body, 'borderColorPickerPop' + _this.windowId, null);
      });
      
      jQuery._data(borderPicker.find(".sp-cancel")[0], "events").click.reverse();
      
      borderPicker.find('a.sp-choose').on('click',function(){
        borderPicker.find('button.sp-choose').click();
      });
      
      _this.container.find(".fillColorPicker").spectrum({
        showInput: true,
        showInitial: true,
        showAlpha: true,
        showPalette: true,
        showSelectionPalette: true,
        appendTo: 'parent',
        containerClassName: 'fillColorPickerPop'+_this.windowId,
        preferredFormat: "rgb",
        show: function(color) {
          jQuery.data(document.body, 'fillColorPickerPop' + _this.windowId, color);
        },
        change: function(color) {
          jQuery.data(document.body, 'fillColorPickerPop' + _this.windowId, color);
        },
        move: function(color) {
          jQuery.data(document.body, 'fillColorPickerPop' + _this.windowId, color);
        },
        hide: function(color) {
          color = jQuery.data(document.body, 'fillColorPickerPop' + _this.windowId);
          if (color) {
            _this.eventEmitter.publish('changeFillColor.' + _this.windowId, [color.toHexString(), color.getAlpha()]);
          }
        },
        maxSelectionSize: 4,
        palette: [
          ["black", "red", "green", "blue"],
          ["white", "cyan", "magenta", "yellow"]
        ]
      });
      
      _this.container.find(".fillColorPicker").next(".sp-replacer").prepend("<i class='material-icons'>format_color_fill</i>");
      
      var fillPicker = jQuery('.fillColorPickerPop'+_this.windowId);
      
      fillPicker.find(".sp-cancel").html('<i class="fa fa-times-circle-o fa-fw"></i>Cancel');
      fillPicker.find(".sp-cancel").parent().append('<a class="sp-choose" href="#"><i class="fa fa-thumbs-o-up fa-fw"></i>Choose</a>');
      fillPicker.find('button.sp-choose').hide();
      
      fillPicker.find('a.sp-cancel').on('click', function() {
        jQuery.data(document.body, 'fillColorPickerPop' + _this.windowId, null);
      });
      
      jQuery._data(fillPicker.find(".sp-cancel")[0], "events").click.reverse();
      
      fillPicker.find('a.sp-choose').on('click',function(){
        fillPicker.find('button.sp-choose').click();
      });
    },

    show: function() {
      this.element.fadeIn("150");
    },

    hide: function() {
      this.element.fadeOut("150");
    },

    bindEvents: function() {
      var _this = this;
      this.container.find('.mirador-osd-back').on('click', function() {
        _this.element.remove();
        _this.element = jQuery(_this.template()).appendTo(_this.container);
        _this.bindEvents();
      });
    },

    annotationTemplate: Handlebars.compile([
                                   '{{#if showEdit}}',
                                   '<a class="mirador-osd-edit-mode hud-control" role="button" aria-label="Make a new annotation using mouse">',
                                   '<i class="fa fa-lg fa-edit"></i>',
                                   '</a>',
                                   '<a class="hud-control draw-tool" style="color:#abcdef;">',
                                   '|',
                                   '</a>',
                                   '{{#each tools}}',
                                   '<a class="mirador-osd-{{this}}-mode hud-control draw-tool">',
                                   '<i class="material-icons">{{this}}</i>',
                                   '</a>',
                                   '{{/each}}',
                                   '<a class="hud-control draw-tool" style="color:#abcdef;">',
                                   '|',
                                   '</a>',
                                   '<a class="hud-control draw-tool">',
                                   '<input type="text" class="borderColorPicker"/>',
                                   '</a>',
                                   '<a class="hud-control draw-tool">',
                                   '<input type="text" class="fillColorPicker"/>',
                                   '</a>',
                                   '<a class="hud-control draw-tool" style="color:#abcdef;">',
                                   '|',
                                   '</a>',
                                   '<a class="hud-control draw-tool mirador-osd-delete-mode">',
                                   '<i class="fa fa-lg fa-trash-o"></i>',
                                   '</a>',
                                   '<a class="hud-control draw-tool mirador-osd-save-mode">',
                                   '<i class="fa fa-lg fa-save"></i>',
                                   '</a>',
                                   '{{#if showRefresh}}',
                                     '<a class="hud-control draw-tool mirador-osd-refresh-mode">',
                                     '<i class="fa fa-lg fa-refresh"></i>',
                                     '</a>',
                                   '{{/if}}',
                                   '{{/if}}',
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
