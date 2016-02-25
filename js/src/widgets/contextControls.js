(function($) {

  $.ContextControls = function(options) {

    jQuery.extend(this, {
      parent: null,  //hud
      element: null,
      container: null,
      mode: null,
      windowId: null,
      annoEndpointAvailable: false,
      annotationCreationAvailable: true
    }, options);

    this.init();
  };

  $.ContextControls.prototype = {

    init: function() {    
      var allTools = $.getTools();
      this.availableTools = [];
      for ( var i = 0; i < $.viewer.availableAnnotationDrawingTools.length; i++) {
        for ( var j = 0; j < allTools.length; j++) {
          if ($.viewer.availableAnnotationDrawingTools[i] == allTools[j].name) {
            this.availableTools.push(allTools[j].logoClass);
          }
        }
      }
      var _this = this;
      this.element = jQuery(this.template({
        tools : _this.availableTools,
        showEdit : this.annotationCreationAvailable
      })).appendTo(this.container);
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
            jQuery.publish('changeBorderColor.' + _this.windowId, color.toHexString());
          }
        },
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
            jQuery.publish('changeFillColor.' + _this.windowId, [color.toHexString(), color.getAlpha()]);
          }
        },
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
      this.hide();
      this.bindEvents();
    },

    show: function() {
      this.element.fadeIn("200");
    },

    hide: function(complete) {
      this.element.fadeOut("200", complete);
    },

    bindEvents: function() {
      var _this = this;

      this.container.find('.fa-refresh').on('click', function() {
        jQuery.publish('updateAnnotationList.'+_this.windowId);
        jQuery.publish('refreshOverlay.'+_this.windowId, '');
      });
      this.container.find('.fa-trash-o').on('click', function() {
        jQuery.publish('deleteShape.'+_this.windowId, '');
      });
      this.container.find('.fa-save').on('click', function() {
        jQuery.publish('updateEditedShape.'+_this.windowId, '');
      });
      this.container.find('.fa-times').on('click', function() {
        jQuery.publish('toggleDefaultDrawingTool.'+_this.windowId);
      });
      this.container.find('.fa-edit').on('click', function() {
        jQuery.publish('toggleDefaultDrawingTool.'+_this.windowId);
      });

      function make_handler(shapeMode) {
        return function () {
          jQuery.publish('toggleDrawingTool.'+_this.windowId, shapeMode);
        };
      }
      for (var value in _this.availableTools) {
        this.container.find('.material-icons:contains(\'' + _this.availableTools[value] + '\')').on('click', make_handler(_this.availableTools[value]));
      }

      jQuery.subscribe('initBorderColor.' + _this.windowId, function(event, color) {
        _this.container.find('.borderColorPicker').spectrum('set', color);
      });
      jQuery.subscribe('initFillColor.' + _this.windowId, function(event, color, alpha) {
        var colorObj = tinycolor(color);
        colorObj.setAlpha(alpha);
        _this.container.find('.fillColorPicker').spectrum('set', colorObj);
      });
      jQuery.subscribe('disableBorderColorPicker.'+_this.windowId, function(event, disablePicker) {
        if(disablePicker) {
          _this.container.find('.borderColorPicker').spectrum("disable");
        }else{
          _this.container.find('.borderColorPicker').spectrum("enable");
        }
      });
      jQuery.subscribe('disableFillColorPicker.'+_this.windowId, function(event, disablePicker) {
        if(disablePicker) {
          _this.container.find('.fillColorPicker').spectrum("disable");
        }else{
          _this.container.find('.fillColorPicker').spectrum("enable");
        }
      });
      jQuery.subscribe('showDrawTools.'+_this.windowId, function(event) {
        _this.container.find('.draw-tool').show();
      });
      jQuery.subscribe('hideDrawTools.'+_this.windowId, function(event) {
        _this.container.find('.draw-tool').hide();
      });

      this.container.find('.mirador-osd-close').on('click', $.debounce(function() {
        _this.parent.annoState.displayOff();
      },300));
      
      this.container.find('.mirador-osd-back').on('click', function() {
        _this.element.remove();
        _this.element = jQuery(_this.template()).appendTo(_this.container);
        _this.bindEvents();
      });
      
      this.container.find('.mirador-osd-edit-mode').on('click', function() {
        if (_this.parent.annoState.current === 'annoOnCreateOff') {
          _this.parent.annoState.createOn();
        } else if (_this.parent.annoState.current === 'annoOnCreateOn') {
          _this.parent.annoState.createOff();
        }
      });
      this.container.find('.mirador-osd-refresh-mode').on('click', function() {
        //update annotation list from endpoint
        jQuery.publish('updateAnnotationList.'+_this.windowId);
      });
      
    },

    template: Handlebars.compile([
                                 '<div class="mirador-osd-context-controls hud-container">',
                                   '<a class="mirador-osd-close hud-control" role="button" aria-label="Turn off annotations">',
                                   '<i class="fa fa-lg fa-times"></i>',
                                   '</a>',
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
                                   '<a class="hud-control draw-tool">',
                                   '<i class="fa fa-lg fa-trash-o"></i>',
                                   '</a>',
                                   '<a class="hud-control draw-tool">',
                                   '<i class="fa fa-lg fa-save"></i>',
                                   '</a>',
                                   '<a class="hud-control draw-tool">',
                                   '<i class="fa fa-lg fa-refresh"></i>',
                                   '</a>',
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
                                 '</div>'
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
