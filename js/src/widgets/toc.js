(function($) {

  $.TableOfContents = function(options) {

    jQuery.extend(true, this, {
      element:           null,
      appendTo:          null,
      parent:            null,
      manifest:          null,
      structures:        null,
      previousSelectedElements: [],
      selectedElements: [],
      openElements:     [],
      hoveredElement:   [],
      selectContext:    null,
      tocData: {},
      active: null
    }, options);

    this.init();

  };

  $.TableOfContents.prototype = {
    init: function () {
      var _this = this;
      _this.structures = _this.manifest.getStructures();
      if (!_this.structures || _this.structures.length === 0) {
        _this.hide();
        _this.parent.setTOCBoolean(false);
        return;
      } else {
        _this.parent.setTOCBoolean(true);
        this.ranges = this.setRanges();
        this.element = jQuery(this.template({ ranges: this.getTplData() })).appendTo(this.appendTo);
        this.tocData = this.initTocData();
        this.selectedElements = $.getRangeIDByCanvasID(_this.structures, _this.parent.currentCanvasID);
        this.element.find('.has-child ul').hide();
        this.render();
        this.bindEvents();
      }
    },

    setRanges: function() {
      var _this = this,
      ranges = [];
      jQuery.each(_this.structures, function(index, range) {
        if (range['@type'] === 'sc:Range') {
          ranges.push({
            id: range['@id'],
            canvases: range.canvases,
            within: range.within,
            label: range.label
          });
        }
      });

      return ranges;

    },

    getTplData: function() {  
      var _this = this,
      ranges = _this.extractRangeTrees(_this.ranges);
      
      if (ranges.length < 2) {
        ranges = ranges[0].children;
      }

      return ranges;
    },

    initTocData: function() {
      var _this = this,
      tocData = {};

      jQuery.each(_this.ranges, function(index, item) {
        var rangeID = item.id,
        attrString = '[data-rangeid="' + rangeID +'"]';

        tocData[item.id] = {
          element: _this.element.find(attrString).closest('li') //,
          // open: false,
          // selected: false,
          // hovered: false
        };
      });

      return tocData;
    },

    extractRangeTrees: function(rangeList) {
      var tree, parent;
      // Recursively build tree/table of contents data structure
      // Begins with the list of topmost categories
      function unflatten(flatRanges, parent, tree) {
        // To aid recursion, define the tree if it does not exist,
        // but use the tree that is being recursively built
        // by the call below.
        tree = typeof tree !== 'undefined' ? tree : [];
        parent = typeof parent !== 'undefined' ? parent : {id: "root", label: "Table of Contents" };
        var children = jQuery.grep(flatRanges, function(child) { if (!child.within) { child.within = 'root'; } return child.within == parent.id; });
        if ( children.length ) {
          if ( parent.id === 'root') {
            // If there are children and their parent's 
            // id is a root, bind them to the tree object.
            // 
            // This begins the construction of the object,
            // and all non-top-level children are now
            // bound the these base nodes set on the tree
            // object.
            children.forEach(function(child) {
              child.level = 0;
            });
            tree = children;   
          } else {
            // If the parent does not have a top-level id,
            // bind the children to the parent node in this
            // recursion level before handing it over for
            // another spin. 
            //
            // Because "child" is passed as 
            // the second parameter in the next call, 
            // in the next iteration "parent" will be the
            // first child bound here.
            children.forEach(function(child) { 
              child.level = parent.level+1;
            });
            parent.children = children;
          }
          // The function cannot continue to the return 
          // statement until this line stops being called, 
          // which only happens when "children" is empty.
          jQuery.each( children, function( index, child ){ unflatten( flatRanges, child ); } );                    
        }
        return tree;
      }

      return unflatten(rangeList);
    },

    render: function() {
      var _this = this,
      toDeselect = jQuery.map(_this.previousSelectedElements, function(rangeID) {
            return _this.tocData[rangeID].element.toArray();
      }),
      toSelect = jQuery.map(_this.selectedElements, function(rangeID) {
            return _this.tocData[rangeID].element.toArray();
      }),
      toOpen = jQuery.map(_this.selectedElements, function(rangeID) {
          if ((jQuery.inArray(rangeID, _this.openElements) < 0) && (jQuery.inArray(rangeID, _this.previousSelectedElements) < 0)) {
            return _this.tocData[rangeID].element.toArray();
          }
      }),
      toClose = jQuery.map(_this.previousSelectedElements, function(rangeID) {
          if ((jQuery.inArray(rangeID, _this.openElements) < 0) && (jQuery.inArray(rangeID, _this.selectedElements) < 0)) {
            return _this.tocData[rangeID].element.toArray();
          }
      });

      // Deselect elements
      jQuery(toDeselect).removeClass('selected');
      
      // Select new elements
      jQuery(toSelect).addClass('selected');
      
      // Scroll to new elements
      scroll();
      
      // Open new ones
      jQuery(toOpen).toggleClass('open').find('ul:first').slideFadeToggle();
      // Close old ones (find way to keep scroll position).
      jQuery(toClose).toggleClass('open').find('ul:first').slideFadeToggle(400, 'swing', scroll);
       
      // Get the sum of the outer height of all elements to be removed.
      // Subtract from current parent height to retreive the new height.
      // Scroll with respect to this. 
      scroll();

      function scroll() {
        var head = _this.element.find('.selected').first();
        _this.element.scrollTo(head, 400);
      } 

    },

    bindEvents: function() {
      var _this = this;
      // var eventString = _this.parent.id

      jQuery.subscribe('focusChanged', function(_, manifest, focusFrame) {
      });
      
      jQuery.subscribe('cursorFrameUpdated', function(_, manifest, cursorBounds) {
      });
        
      jQuery.subscribe(('currentCanvasIDUpdated.' + _this.parent.id), function(event, canvasID) {
        if (!_this.structures) { return; }
        _this.setSelectedElements($.getRangeIDByCanvasID(_this.structures, canvasID));
        _this.render();
      });

      _this.element.find('.toc-link').on('click', function(event) {
        event.stopPropagation();
        // The purpose of the immediate event is to update the data on the parent
        // by calling its "set" function. 
        // 
        // The parent (window) then emits an event notifying all panels of 
        // the update, so they can respond in their own unique ways
        // without window having to know anything about their DOMs or 
        // internal structure. 
        var rangeID = jQuery(this).data().rangeid,
        canvasID = jQuery.grep(_this.structures, function(item) { return item['@id'] == rangeID; })[0].canvases[0],
        isLeaf = jQuery(this).closest('li').hasClass('leaf-item');

        // if ( _this.parent.currentFocus === 'ThumbnailsView' & !isLeaf) {
        //   _this.parent.setCursorFrameStart(canvasID);
        // } else {
          _this.parent.setCurrentCanvasID(canvasID);
        // }
      });
      
      _this.element.find('.caret').on('click', function(event) {
        event.stopPropagation();
        
        var rangeID = jQuery(this).parent().data().rangeid;
        _this.setOpenItem(rangeID); 

        // For now it's alright if this data gets lost in the fray.
        jQuery(this).closest('li').toggleClass('open').find('ul:first').slideFadeToggle();

        // The parent (window) then emits an event notifying all panels of 
        // the update, so they can respond in their own unique ways
        // without window having to know anything about their DOMs or
        // internal structure.
      });

    },

    setActive: function(active) {
      var _this = this;
      _this.active = active;
    },

    setOpenItem: function(rangeID) {
      var _this = this;

      if (jQuery.inArray(rangeID, _this.openElements)<0) {
        _this.openElements.push(rangeID);
      } else {
        _this.openElements.splice(jQuery.inArray(rangeID, _this.openElements), 1);
      }
    },

    // focusCursorFrame: function() {
    //   console.log('focusCursorFrame');
    // },

    // hoverItem: function() {
    //   console.log('hoverItem');
    // },

    setSelectedElements: function(rangeIDs) {
      var _this = this;

      _this.previousSelectedElements = _this.selectedElements;
      _this.selectedElements = rangeIDs;
    },

    // returnToPlace: function() {
    //   console.log('returnToPlace');
    // },

    template: function(tplData) {

      var template = Handlebars.compile([
        '<ul class="toc">',
          '{{#nestedRangeLevel ranges}}',
            '<li class="{{#if children}}has-child{{else}}leaf-item{{/if}}"">',
              '{{{tocLevel id label level children}}}',
              '{{#if children}}',
                '<ul>',
                '{{{nestedRangeLevel children}}}',
                '</ul>',
              '{{/if}}',
            '<li>',
          '{{/nestedRangeLevel}}',
        '</ul>'
      ].join(''));

      var previousTemplate;

      Handlebars.registerHelper('nestedRangeLevel', function(children, options) {
        var out = '';

        if (options.fn !== undefined) {
          previousTemplate = options.fn;
        }

        children.forEach(function(child) {
          out = out + previousTemplate(child);
        });
        
        return out;
      });

      Handlebars.registerHelper('tocLevel', function(id, label, level, children) {
        var caret = '<i class="fa fa-caret-right caret"></i>',
        cert = '<i class="fa fa-certificate star"></i>';
        return '<h' + (level+1) + '><a class="toc-link" data-rangeID="' + id + '">' + caret + cert + '<span class="label">' + label + '</span></a></h' + (level+1) + '>';
      });

      return template(tplData);
    },

    toggle: function(stateValue) {
      if (!this.structures) { stateValue = false; }
      if (stateValue) { 
        this.show(); 
      } else {
        this.hide();
      }
    },
    
    hide: function() {
      jQuery(this.appendTo).hide();
      this.parent.element.find('.view-container').addClass('focus-max-width');
    },

    show: function() {
      jQuery(this.appendTo).show({effect: "fade", duration: 300, easing: "easeInCubic"});
      this.parent.element.find('.view-container').removeClass('focus-max-width');
    }
    
  };

}(Mirador));

