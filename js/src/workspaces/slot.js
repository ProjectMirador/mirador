(function($) {

  $.Slot = function(options) {

    jQuery.extend(true, this, {
      workspaceSlotCls: 'slot',
      slotID:           null,
      layoutAddress:    null,
      focused:          null,
      appendTo:         null,
      window:           null,
      windowElement:    null,
      state:            null,
      eventEmitter:     null
    }, options);

    this.init();

  };

  $.Slot.prototype = {
    init: function () {
      this.events = [];
      this.element = jQuery(this.template({
        workspaceSlotCls: this.workspaceSlotCls,
        slotID: this.slotId
      }));
      this.element.appendTo(this.appendTo);

      this.bindEvents();
      this.listenForActions();
    },

    listenForActions: function () {
      var _this = this;

      this.events = [
        _this.eventEmitter.subscribe('slotRemoved', function (event, slot) {
          if (_this.slotID === slot.slotID) {
            _this.clearSlot();
          }
        }),

        _this.eventEmitter.subscribe('layoutChanged', function (event, layoutRoot) {
          // Must reset the slotAddress of the window.
          if (_this.window) {
            _this.window.slotAddress = _this.layoutAddress;
            _this.eventEmitter.publish('windowSlotAddressUpdated', {
              id: _this.window.id,
              slotAddress: _this.window.slotAddress
            });
          }
        }),

        _this.eventEmitter.subscribe('HIDE_REMOVE_SLOT', function (event) {
          _this.element.find('.remove-slot-option').hide();
          if (_this.window) {
            _this.eventEmitter.publish('HIDE_REMOVE_OBJECT.' + _this.window.id);
          }
        }),

        _this.eventEmitter.subscribe('SHOW_REMOVE_SLOT', function (event) {
          _this.element.find('.remove-slot-option').show();
          if (_this.window) {
            _this.eventEmitter.publish('SHOW_REMOVE_OBJECT.' + _this.window.id);
          }
        }),

        _this.eventEmitter.subscribe('ADD_ITEM_FROM_WINDOW', function (event, id) {
          if (_this.window && _this.window.id === id) {
            _this.addItem();
          }
        }),

        _this.eventEmitter.subscribe('REMOVE_SLOT_FROM_WINDOW', function (event, id) {
          if (_this.window && _this.window.id === id) {
            _this.eventEmitter.publish('REMOVE_NODE', _this);
          }
        }),

        _this.eventEmitter.subscribe('SPLIT_RIGHT_FROM_WINDOW', function (event, id) {
          if (_this.window && _this.window.id === id) {
            _this.eventEmitter.publish('SPLIT_RIGHT', _this);
          }
        }),

        _this.eventEmitter.subscribe('SPLIT_LEFT_FROM_WINDOW', function (event, id) {
          if (_this.window && _this.window.id === id) {
            _this.eventEmitter.publish('SPLIT_LEFT', _this);
          }
        }),

        _this.eventEmitter.subscribe('SPLIT_DOWN_FROM_WINDOW', function (event, id) {
          if (_this.window && _this.window.id === id) {
            _this.eventEmitter.publish('SPLIT_DOWN', _this);
          }
        }),

        _this.eventEmitter.subscribe('SPLIT_UP_FROM_WINDOW', function (event, id) {
          if (_this.window && _this.window.id === id) {
            _this.eventEmitter.publish('SPLIT_UP', _this);
          }
        })];
    },

    bindEvents: function() {
      var _this = this,
          dropTarget = this.element.find('.dropMask');

      this.element.find('.addItemLink').on('click', function(){ _this.addItem(); });
      this.element.find('.remove-slot-option').on('click', function(){
        _this.eventEmitter.publish('REMOVE_NODE', _this);
      });
      this.element.on('dragover', function(e) {
        e.preventDefault();
        dropTarget.show();
      });
      dropTarget.on('dragenter', function(e) {
        e.preventDefault();
        _this.element.addClass('draggedOver');
      });
      dropTarget.on('dragleave', function(e) {
        e.preventDefault();
        _this.element.removeClass('draggedOver');
        dropTarget.hide();
      });
      this.element.on('drop', function(e) {
        _this.dropItem(e);
      });
    },

    dropItem: function(e) {
      var _this = this;

      e.preventDefault();
      var text_url = e.originalEvent.dataTransfer.getData("text/plain");
      if (text_url) {
        _this.handleDrop(text_url);
      } else {
        e.originalEvent.dataTransfer.items[0].getAsString(function(url) {
          _this.handleDrop(url);
        });
      }
    },

    handleDrop: function(url) {
        var _this = this;

        url = url || text_url;
        var manifestUrl = $.getQueryParams(url).manifest || url,
            collectionUrl = $.getQueryParams(url).collection,
            canvasId = $.getQueryParams(url).canvas,
            imageInfoUrl = $.getQueryParams(url).image,
            windowConfig;

        if (typeof _this.state.getStateProperty('manifests')[manifestUrl] !== 'undefined') {
          windowConfig = {
            manifest: _this.state.getStateProperty('manifests')[manifestUrl],
            slotAddress: _this.getAddress()
          };

          if (canvasId) {
            // If the canvasID is defined, we need to both add
            // it to the windowConfig and tell it to open in
            // image view. If we don't specify the focus, the
            // window will open in thumbnail view with the
            // chosen page highlighted.
            windowConfig.canvasID = canvasId;
            windowConfig.viewType = 'ImageView';
          }

          _this.eventEmitter.publish('ADD_WINDOW', windowConfig);

        }

        else if (typeof imageInfoUrl !== 'undefined') {
          if (!_this.state.getStateProperty('manifests')[imageInfoUrl]) {
            _this.eventEmitter.publish('ADD_MANIFEST_FROM_URL', [imageInfoUrl, "(Added from URL)"]);
          }
        }
        else if (typeof collectionUrl !== 'undefined'){
          jQuery.getJSON(collectionUrl).done(function (data, status, jqXHR) {
            if (data.hasOwnProperty('manifests')){
              jQuery.each(data.manifests, function (ci, mfst) {
                if (!_this.state.getStateProperty('manifests')[imageInfoUrl]) {
                  _this.eventEmitter.publish('ADD_MANIFEST_FROM_URL', [mfst['@id'], "(Added from URL)"]);
                }
              });
            } else if (data.hasOwnProperty('members')){
              jQuery.each(data.members, function (ci, mfst) {
                if (!_this.state.getStateProperty('manifests')[imageInfoUrl]) {
                  _this.eventEmitter.publish('ADD_MANIFEST_FROM_URL', [mfst['@id'], "(Added from URL)"]);
                }
              });
            }
          });

          //TODO:
          //this works;
          //but you might want to check if some "publish" action would be better
          _this.addItem();

        }
        else {
          if (!_this.state.getStateProperty('manifests')[imageInfoUrl]) {
            _this.eventEmitter.publish('ADD_MANIFEST_FROM_URL', [manifestUrl, "(Added from URL)"]);
          }
        }

        _this.eventEmitter.subscribe('manifestReceived', function(event, manifest) {
          var windowConfig;
          if (manifest.jsonLd['@id'] === manifestUrl || manifest.jsonLd['@id']+'/info.json' === imageInfoUrl) {
            // There are many manifests that may be received
            // while we are waiting for this one, so we
            // need to make sure the event actually refers to the
            // manifest we've just dropped.

            windowConfig = {
              manifest: manifest,
              slotAddress: _this.getAddress()
            };

            if (manifest.jsonLd['@id']+'/info.json' === imageInfoUrl) {
              // If this was added from a naked info.json, pick the
              // first (and only) page from the synthetic manifest.
              canvasId = manifest.jsonLd.sequences[0].canvases[0]['@id'];
            }

            if (canvasId) {
              // If the canvasID is defined, we need to both add
              // it to the windowConfig and tell it to open in
              // image view. If we don't specify the focus, the
              // window will open in thumbnail view with the
              // chosen page highlighted.
              windowConfig.canvasID = canvasId;
              windowConfig.viewType = 'ImageView';
            }

            _this.eventEmitter.publish('ADD_WINDOW', windowConfig);
          }
        });
    },

    destroyEvents:function(){
      var _this = this;
      this.events.forEach(function(event){
        _this.eventEmitter.unsubscribe(event.name,event.handler);
      });
    },

    clearSlot: function () {
      this.destroyEvents();

      // @TODO This is not a task that slots should fulfil
      // This prevents the save controller
      // from attempting to re-save the window
      // after having already removed it.
      if (this.window) {
        delete this.window;
      }
    },

    getAddress: function() {
      return this.layoutAddress;
    },

    addItem: function() {
      var _this = this;
      _this.focused = true;

      _this.eventEmitter.publish('ADD_SLOT_ITEM', _this);
    },

    // template should be based on workspace type
    template: $.Handlebars.compile([
                                 '<div id="{{slotID}}" class="{{workspaceSlotCls}}">',
                                 '<a class="remove-slot-option"><i class="fa fa-times fa-lg fa-fw"></i> {{t "close"}}</a>',
                                 '<div class="slotIconContainer">',
                                 // '<a href="javascript:;" class="mirador-btn mirador-icon-window-menu" title="Replace object"><i class="fa fa-table fa-lg fa-fw"></i>',
                                 // '<ul class="dropdown slot-controls">',
                                 // '<li class="new-object-option"><i class="fa fa-plus-square fa-lg fa-fw"></i> {{t "newObject"}}</li>',
                                 // '<li class="remove-object-option"><i class="fa fa-times fa-lg fa-fw"></i> {{t "close"}}</li>',
                                 // '<li class="add-slot-right"><i class="fa fa-caret-square-o-right fa-lg fa-fw"></i> {{t "addSlotRight"}}</li>',
                                 // '<li class="add-slot-left"><i class="fa fa-caret-square-o-left fa-lg fa-fw"></i> {{t "addSlotLeft}}</li>',
                                 // '<li class="add-slot-above"><i class="fa fa-caret-square-o-up fa-lg fa-fw"></i> {{t "addSlotAbove"}}</li>',
                                 // '<li class="add-slot-below"><i class="fa fa-caret-square-o-down fa-lg fa-fw"></i> {{t "addSlotBelow"}}</li>',
                                 // '</ul>',
                                 // '</a>',
                                 // accessbility-wise it's really bad practice to have h1 tags be used like this
                                 // most screen reader users get a sense of where they are based on header tags
                                 // if these are merely h1 tags for aesthetic purposes, it might be better to make them specific classes
                                '<h1 class="plus" role="presentation" aria-label="Add item using Link">',
                                    '<span>+</span>',
                                '<div class="dropIcon">',
                                    '<i class="fa fa-level-down"></i>',
                                '</div>',
                                '</h1>',
                                 '<h1 class="addItemText">{{t "addItem"}}</h1>',
                                 '<h1 class="dropMeMessage">{{t "dropToLoad"}}</h1>',
                                 '</div>',
                                 '<a class="addItemLink" role="button" aria-label="Add item"></a>',
      '<a class="dropMask"></a>',
                                 '</div>'
    ].join(''))
  };

}(Mirador));
