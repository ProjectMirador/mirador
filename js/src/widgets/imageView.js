(function($) {

  $.ImageView = function(options) {

    jQuery.extend(this, {
      currentImg:       null,
      currentImgIndex:  0,
      imageID:          null,
      imagesList:       [],
      element:          null,
      elemChoice:       null,
      height:           null,
      width:            null,
      parent:           null,
      manifest:         null,
      units:            "mm",
      unitsLong:        "Millimetres",
      leading:          false,
      navToolbarCls:    'mirador-image-view-nav-toolbar',
      annotationsLayer:  null,
      zoomLevel:        null,
      osd:              null,
      osdBounds:        null,
      osdCls:           'mirador-osd',
      osdToolbarCls:    'mirador-osd-toolbar',
      scale:            null,
      scaleCls:         'mirador-image-scale',
      selectedChoice:   '',
      statusbarCls:     'mirador-image-view-statusbar',
      imageViewBgCls:   'mirador-image-view-bg'
    }, options);

    //this.parent.element.find('.mirador-widget-content').addClass(this.imageViewBgCls);
    
    this.init();
  };


  $.ImageView.prototype = {
  
    init: function() {
        this.imagesList = $.getImagesListByManifest(this.manifest);
    
        if (this.imageID !== null) {
            this.currentImgIndex = this.getImageIndexById(this.imageID);
        }

        this.currentImg = this.imagesList[this.currentImgIndex];
        
        this.element = jQuery(this.template()).appendTo(this.appendTo);
        this.createOpenSeadragonInstance($.Iiif.getImageUrl(this.currentImg));
    },
    
    template: Handlebars.compile([
      '<div class="image-view">',
       '</div>'
    ].join('')),

    render: function() {
      this.addToolbarNav();
      this.addStatusbarNav();
      this.attachWindowEvents();
      this.addAnnotationsLayer();
    },

    createOpenSeadragonInstance: function(imageUrl, osdBounds) {
      var infoJsonUrl = $.Iiif.getUri(imageUrl) + '/info.json',
      osdId = 'mirador-osd-' + $.genUUID(),
      osdToolBarId = osdId + '-toolbar',
      infoJson,
      elemOsd,
      _this = this;

      //this.element.find('.' + this.osdCls).remove();

      //this.addOpenSeadragonToolBar(osdToolBarId);

      infoJson = $.getJsonFromUrl(infoJsonUrl, false);

      elemOsd =
        jQuery('<div/>')
      .addClass(this.osdCls)
      .attr('id', osdId)
      .appendTo(this.element);

      this.osd = $.OpenSeadragon({
        'id':           elemOsd.attr('id'),
        //'toolbar':      osdToolBarId,
        'tileSources':  $.Iiif.prepJsonForOsd(infoJson)
      });

      this.osd.addHandler('open', function(){
        //_this.addScale();
        //_this.attachOsdEvents();
        _this.zoomLevel = _this.osd.viewport.getZoom();

        if (typeof osdBounds != 'undefined') {
          _this.osd.viewport.fitBounds(osdBounds, true);
        }
      });

      //this.parent.element.dialog('option', 'title', this.getTitle());

      // hide browser based full-screen icon
      //this.parent.toolbar.element.find('.' + this.osdToolbarCls + ' button:last-child').hide();

      //this.renderChoices();
    },


    clearOpenSeadragonInstance: function() {
      this.element.find('.' + this.osdCls).remove();
      // this.element.find('.' + this.scaleCls).remove();
      this.osd = null;

      this.renderChoices();
    },


    addOpenSeadragonToolBar: function(id) {
      var osdToolbar =
        jQuery('<div/>')
      .addClass(this.osdToolbarCls)
      .attr('id', id);

      this.parent.toolbar.element.find('.' + this.osdToolbarCls).remove();
      this.parent.toolbar.append(osdToolbar);
    },


    renderChoices: function() {
      var _this = this,
      choicesInfo = [];

      this.clearChoices();

      if (this.currentImg.choices.length > 0) {
        choicesInfo.push({
          label: this.currentImg.choiceLabel,
          imageUrl: this.currentImg.imageUrl
        });

        jQuery.each(this.currentImg.choices, function(index, choice) {
          choicesInfo.push({
            label: choice.choiceLabel,
            imageUrl: choice.imageUrl
          });
        });

        this.elemChoice.show();
        this.selectedChoice = this.currentImg.choiceLabel;

        this.elemChoice.tooltipster({
          arrow: true,
          content: $.Templates.imageView.imageChoices({ choicesInfo: choicesInfo }),
          functionReady: function() { _this.addImageChoiceEvents(); },
          interactive: true,
          position: 'bottom',
          theme: '.tooltipster-mirador'
        });

        this.addImageChoiceEvents();
      }
    },


    addImageChoiceEvents: function() {
      var _this = this,
      elemOptionChoices = jQuery(document).find('.mirador-image-view-choices');

      elemOptionChoices.find('li a').each(function(index) {
        jQuery(this).removeClass('mirador-image-view-choice-selected');

        if (jQuery(this).data('choice') === _this.selectedChoice) {
          jQuery(this).addClass('mirador-image-view-choice-selected');
        }
      });


      elemOptionChoices.on('click', 'li a', function(event) {
        var selectedChoice = jQuery(event.target),
        dfd = jQuery.Deferred();

        _this.storeCurrentOsdBounds(dfd);

        dfd.done(function() {
          if (selectedChoice.data('choice') !== 'No Image') {
            _this.createOpenSeadragonInstance(selectedChoice.data('image-url'), _this.osdBounds);
          } else {
            _this.clearOpenSeadragonInstance();
          }
        });

        _this.selectedChoice = selectedChoice.data('choice');

        elemOptionChoices.find('li a').removeClass('mirador-image-view-choice-selected');
        selectedChoice.addClass('mirador-image-view-choice-selected');
      });

    },


    clearChoices: function() {
      if (this.elemChoice.data('plugin_tooltipster') !== '') {
        this.elemChoice.tooltipster('destroy');
      }

      this.elemChoice.hide();
    },


    storeCurrentOsdBounds: function(dfd) {
      if (this.parent.viewObj.osd !== null) {
        this.osdBounds = this.parent.viewObj.osd.viewport.getBounds();
      }
      dfd.resolve();
    },


    addToolbarNav: function() {
      this.parent.toolbar.append($.Templates.imageView.navToolbar({
        navToolbarCls: this.navToolbarCls,
        hasAnnotations: this.currentImg.annotations
      }));

      this.elemChoice = this.parent.toolbar.element.find('.' + this.navToolbarCls + ' .mirador-icon-choices');
      this.elemChoice.hide();

      this.attachNavEvents();
    },


    addStatusbarNav: function() {
      this.parent.statusbar.append($.Templates.imageView.statusbar({
        statusbarCls: this.statusbarCls,
        width: this.width,
        height: this.height
      }));

      this.attachStatusbarEvents();
    },


    addScale: function() {
      if (!this.scale) {
        this.scale = new $.WidgetScale({
          parent: this,
          showScale: true
        });
      }
    },


    addAnnotationsLayer: function() {
      this.annotationsLayer = new $.AnnotationsLayer({
        parent: this,
        annotationUrls: this.currentImg.annotations
      });
    },


    getImageIndexByTitle: function(title) {
      var _this = this,
      imgIndex = 0;

      jQuery.each(this.imagesList, function(index, img) {
        if ($.trimString(img.title) === $.trimString(title)) {
          imgIndex = index;
        }
      });

      return imgIndex;
    },


    getImageIndexById: function(id) {
      var _this = this,
          imgIndex = 0;

      jQuery.each(this.imagesList, function(index, img) {
        if ($.trimString(img['@id']) === $.trimString(id)) {
          imgIndex = index;
        }
      });

      return imgIndex;
    },


    getTitle: function() {
      var titles = [];

      titles.push(
        $.getViewLabel(this.parent.type) + ' : ' +
        $.getTitlePrefix(this.parent.metadataDetails)
      );

      if (this.currentImg.title) {
        titles.push(this.currentImg.title);
      }

      return titles.join(" / ");
    },


    setHeight: function(h) {
      this.height = h;
    },


    setWidth: function(w) {
      this.width = w;
    },


    next: function() {
      var next = this.currentImgIndex + 1,
      infoJsonUrl;

      if (next < this.imagesList.length) {
        this.currentImgIndex = next;
        this.currentImg = this.imagesList[next];

        infoJsonUrl = this.currentImg.imageUrl;

        this.createOpenSeadragonInstance(infoJsonUrl);
        this.annotationsLayer.set('annotationUrls', this.currentImg.annotations);
      }
    },


    prev: function() {
      var prev = this.currentImgIndex - 1,
      infoJsonUrl;

      if (prev >= 0) {
        this.currentImgIndex = prev;
        this.currentImg = this.imagesList[prev];

        this.createOpenSeadragonInstance(this.currentImg.imageUrl);
        this.annotationsLayer.set('annotationUrls', this.currentImg.annotations);
      }
    },


    attachWindowEvents: function() {
      var _this = this;

      this.parent.element.on({
        // It is necessary to know which view to use as
        // the "leader" for event broadcasting in order to
        // prevent an infinite loop. This is accomplished by
        // tracking mouse position for now until OSD integrates
        // events that don't broadcast events.
        mouseenter: function() {
          _this.leading = true;
        },
        mouseleave: function(){
          _this.leading = false;
        }
      });

      this.parent.element.dialog({
        resize: function(event, ui) {
          _this.osd.viewport.ensureVisible();
        }
      });

      this.parent.element.bind('dialogextendmaximize dialogextendrestore', function(event, ui) {
        _this.osd.viewport.ensureVisible();
      });
    },


    attachOsdEvents: function() {
      var _this = this,
      newWidth = null;

      this.osd.addHandler('zoom', function() { _this.broadcast(); });
      this.osd.addHandler('pan', function() { _this.broadcast(); });
    },


    attachNavEvents: function() {
      var navToolbar = this.parent.toolbar.element.find('.' + this.navToolbarCls),
      selectorAnnotationsView = '.mirador-icon-annotations',
      selectorMetadataView    = '.mirador-icon-metadata-view',
      selectorScrollView      = '.mirador-icon-scroll-view',
      selectorThumbnailsView  = '.mirador-icon-thumbnails-view',
      selectorNext            = '.mirador-icon-next',
      selectorPrevious        = '.mirador-icon-previous',
      _this = this;

      navToolbar.on('click', selectorPrevious, function() {
        _this.prev();
      });

      navToolbar.on('click', selectorNext, function() {
        _this.next();
      });

      navToolbar.on('click', selectorMetadataView, function() {
        $.viewer.loadView("metadataView", _this.manifestId);
      });

      navToolbar.on('click', selectorScrollView, function() {
        $.viewer.loadView("scrollView", _this.manifestId);
      });

      navToolbar.on('click', selectorThumbnailsView, function() {
        $.viewer.loadView("thumbnailsView", _this.manifestId);
      });

      navToolbar.on('click', selectorAnnotationsView, function() {
        _this.annotationsLayer.setVisible();
      });

    },


    attachStatusbarEvents: function() {
      var statusbar = this.parent.statusbar.element.find('.' + this.statusbarCls),
      lockCls = '.mirador-icon-lock',
      dimensionCls = '.mirador-image-view-physical-dimensions',
      unitCls = '.units',
      _this = this;

      statusbar.on('keypress paste keyup', dimensionCls, function(e) { _this.dimensionChange(e); });

      statusbar.on('input', unitCls, function() { _this.unitChange(); });

    },

    // Event Handlers
    broadcast: function() {
      this.scale.render();

      if (this.osd !== null && this.osd.viewport !== null) {
        this.zoomLevel = this.osd.viewport.getZoom();
      }
    },

    reachedExtent : function (minmax) {
      // console.log('reached: '+minmax);
    },

    dimensionChange: function(e) {
      var valid = (/[0-9]|\./.test(String.fromCharCode(e.keyCode)) && !e.shiftKey),
      textAreaClass = e.currentTarget.className,
      dimension = textAreaClass.charAt(textAreaClass.length-1),
      aspectRatio = this.parent.viewObj.currentImg.aspectRatio,
      width,
      height;
      // check if the value of the number is an integer 0-9
      // if not, declare invalid
      if (!valid) {
        e.preventDefault();
      }
      // console.log(e.type+ " : " + e.key);

      // check if keystroke is "enter"
      // if so, exit or deselect the box
      if ((e.keyCode || e.which) === 13) {
        e.target.blur();
      }

      if (dimension === 'x') {
        width = this.parent.statusbar.element.find('.x').val();
        height = Math.floor(aspectRatio * width);
        if (!width) {
          // console.log('empty');
          this.parent.statusbar.element.find('.y').val('');
        } else {
          this.parent.statusbar.element.find('.y').val(height);
        }
      } else {
        height = this.parent.statusbar.element.find('.y').val();
        width = Math.floor(height/aspectRatio);
        if (!height) {
          // console.log('empty');
          this.parent.statusbar.element.find('.x').val('');
        } else {
          this.parent.statusbar.element.find('.x').val(width);
        }
        this.height = height;
        this.width = width;

      }
      // console.log("dimension: " + dimension);
      // console.log("width: " + width);
      // console.log("height: " + height);

      unitCls = '.units';

      this.setWidth(width);
      this.setHeight(height);

      if (width) {
        this.scale.dimensionsProvided = true;
      } else {
        this.scale.dimensionsProvided = false;
      }
      this.scale.render();
    },

    unitChange: function() {
      // console.log('units updated');
    }

  };

}(Mirador));
