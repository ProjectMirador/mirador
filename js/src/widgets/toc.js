(function($) {

  $.TableOfContents = function(options) {

    jQuery.extend(true, this, {
      element:           null,
      appendTo:          null,
      parent:            null,
      previousSelectedElements: null,
      selectedElements: null,
      selectContext:    null,
      tocData: {}
    }, $.DEFAULT_SETTINGS, options);

    this.init();

  };

  $.TableOfContents.prototype = {
    init: function () {
      var _this = this;
      if (!_this.manifest.structures) {
        _this.hide();
        return;
      } else {
        this.ranges = this.setRanges();
        this.element = jQuery(this.template({ ranges: this.getTplData() })).appendTo(this.appendTo);
        this.tocData = this.initTocData();
        this.selectedElements = $.getRangeIDByCanvasID(this.manifest, this.parent.currentImageID);
        this.bindEvents();
        this.render();
      }
    },

    setRanges: function() {
      var _this = this,
      ranges = [];
      jQuery.each(_this.manifest.structures, function(index, range) {
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
          element: _this.element.find(attrString),
          open: false,
          selected: false
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
      var _this = this;

      // bind the parent markers.
      jQuery.each(_this.selectedElements, function(index, range) {
        // select new one.
        var attrString = '[data-rangeid="' + range +'"]';
        _this.element.find(attrString).parent().parent().addClass('selected');
      });
      
      var head = _this.element.find('.selected').first();
      _this.element.scrollTo(head, 800);
    },

    bindEvents: function() {
      var _this = this;

      jQuery.subscribe('focusChanged', function(_, manifest, focusFrame) {
      });
        
      jQuery.subscribe('CurrentImageIDUpdated', function(imageID) {
          console.log('event received by TOC: ' + imageID);
          if (!_this.manifest.structures) { return; }
          _this.selectedElements = $.getRangeIDByCanvasID(_this.manifest, _this.parent.currentImageID);
          _this.render();
      });

      jQuery('.has-child a').on('click', function() {
        event.stopPropagation();
        // The purpose of the immediate event is to update the data on the parent
        // by calling its "set" function. 
        // 
        // The parent (window) then emits an event notifying all panels of 
        // the update, so they can respond in their own unique ways
        // without window having to know anything about their DOMs or 
        // internal structure. 
        var rangeID = jQuery(this).data().rangeid,
        canvasID = jQuery.grep(_this.manifest.structures, function(item) { return item['@id'] == rangeID; })[0].canvases[0],
        isLeaf = jQuery(this).closest('li').hasClass('leaf-item');

        if (isleaf) {
          _this.parent.setCurrentImageID(canvasID);
        } else {
          _this.parent.setCursorFrameStart(canvasID);
        }
      });
      
      jQuery('.caret').on('click', function() {
        event.stopPropagation();

        // For now it's alright if this data gets lost in the fray.
        jQuery(this).closest('li').find('ul:first').addClass('open').slideFadeToggle();

        // The real purpose of the event is to update the data on the parent
        // by calling its "set" function. 
        
        // The parent (window) then emits an event notifying all panels of 
        // the update, so they can respond in their own unique ways
        // without window having to know anything about their DOMs or 
        // internal structure. 
      });

    },

    expandItem: function() {
      console.log('expandItem');
    },

    noOpExandItem: function() {
      console.log('noOpExpandItem');
    },

    focusCanvas: function() {
      console.log('focusCanvas');
    },

    returnToPlace: function() {
      console.log('returnToPlace');
    },

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
      if (!this.manifest.structures) { stateValue = false; }
      if (stateValue) { 
        this.show(); 
      } else {
        this.hide();
      }
    },
    
    hide: function() {
      jQuery(this.appendTo).hide();
      this.parent.element.find('.view-container').css('margin-left', 0);
    },

    show: function() {
      jQuery(this.appendTo).show({effect: "fade", duration: 1000, easing: "easeInCubic"});
      this.parent.element.find('.view-container').css('margin-left', 280);
    }
    
  };

}(Mirador));

