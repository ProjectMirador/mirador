(function($) {

  $.TableOfContents = function(options) {

    jQuery.extend(true, this, {
      element:           null,
      appendTo:          null,
      windowId:          null,
      structures:        [],
      manifestVersion:   null,
      previousSelectedElements: [],
      selectedElements: [],
      openElements:     [],
      hoveredElement:   [],
      selectContext:    null,
      tocData: {},
      active: null,
      eventEmitter: null
    }, options);

    this.init();

  };

  $.TableOfContents.prototype = {
    init: function () {
      var _this = this;
      if (!_this.structures || _this.structures.length === 0) {
        this.element = jQuery(this.emptyTemplate()).appendTo(this.appendTo);
      } 
      else {
        this.element = jQuery(this.template({ ranges: this.getTplData() })).appendTo(this.appendTo);
        this.tocData = _this.initTocData();
        this.selectedElements = $.getRangeIDByCanvasID(_this.structures, _this.canvasID);
        this.element.find('.has-child ul').hide();
        this.render();
      }
      this.bindEvents();
    },

    // setRanges: function() {
    //   var _this = this,
    //   ranges = [];
    //   jQuery.each(_this.structures, function(index, range) {
    //     if (range['@type'] === 'sc:Range') {
    //       ranges.push({
    //         id: range['@id'],
    //         canvases: range.canvases,
    //         within: range.within,
    //         label: range.label
    //       });
    //     }
    //   });
    //   return ranges;

    // },

    tabStateUpdated: function(data) {
      if (data.tabs[data.selectedTabIndex].options.id === 'tocTab') {
        this.element.show();
      } else {
        this.element.hide();
      }
    },

    getTplData: function() {
      var _this = this,
      filteredStructures = _this.structures.map(function(structure) {
        structure.id = structure['@id'];
        return structure;
      }),
      ranges =  _this.extractV21RangeTrees(_this.structures);
      // switch (_this.manifestVersion) {
      // case '1':
      //   ranges = _this.extractV1RangeTrees(_this.structures);
      //   break;
      // case '2':
      //   ranges = _this.extractV2RangeTrees(_this.structures);
      //   break;
      //   // case '2.1':
      //   //   _this.extractV21RangeTrees(_this.structures);
      // }

      if (ranges.length < 2) {
         ranges = ranges[0].children; //Why do this?  It doesn't make sense here. 2.1 wants this uncommented, seemed to work fine. 
        /*
            BH edit
            A range can exist outside of a parent.  Therefore, even if the length is just one, we still 
            want to return the array of one range.  The template function checks the one item, realizes it doesn't have
            children and deems it a leaf, which is what we want. 
        */
      }

      return ranges;
    },

    initTocData: function() {
      var _this = this,
          tocData = {};

      _this.structures.forEach(function(structure) {
        var rangeID = structure['@id'],
            attrString = '[data-rangeid="' + rangeID +'"]';

        tocData[structure['@id']] = {
          element: _this.element.find(attrString).closest('li')
        };
      });
      return tocData;
    },

    extractV1RangeTrees: function(rangeList) {
      var tree, parent;
      // Recursively build tree/table of contents data structure
      // Begins with the list of topmost categories
      function unflatten(flatRanges, parent, tree) {
        // To aid recursion, define the tree if it does not exist,
        // but use the tree that is being recursively built
        // by the call below.
        tree = typeof tree !== 'undefined' ? tree : [];
        parent = typeof parent !== 'undefined' ? parent : {'@id': "root", label: "Table of Contents" };
        var children = jQuery.grep(flatRanges, function(child) { if (!child.within) { child.within = 'root'; } return child.within == parent['@id']; });
        if ( children.length ) {
          if ( parent['@id'] === 'root') {
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

    /* 
    */
    extractV2RangeTrees: function(rangeList) {
      var tree, parent;
      // Recursively build tree/table of contents data structure
      // Begins with the list of topmost categories
      function unflatten(flatRanges, parent, tree) {
        // To aid recursion, define the tree if it does not exist,
        // but use the tree that is being recursively built
        // by the call below.
        tree = typeof tree !== 'undefined' ? tree : [];
        parent = typeof parent !== 'undefined' ? parent : {'@id': "root", label: "Table of Contents" };
        var children = jQuery.grep(flatRanges, function(child) { if (!child.within) { child.within = 'root'; } return child.within == parent['@id']; });
        if ( children.length ) {
          if ( parent['@id'] === 'root') {
            // If there are children and their parent's
            // id is a root, bind them to the tree object.
            //
            // This begins the construction of the object,
            // and all non-top-level children are now
            // bound to these base nodes set on the tree
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
    
     extractV21RangeTrees: function(rangeList){
      /*
        In order for this to work, there must be a most parent aggregating range to start from that stands out from all the other ranges.
        range.within = 'root' works here, that will be our most parent range that will list and order the next highest level children (and this continues recursively until
        the leaves).  From there, the ranges property actually orders the structures for us, so we can use the range id's to pull them out of the array of all ranges 
        we already have.  That way, the ranges will always be in order, and we don't have to worry about structures being an actual list because there are many 
        situations where it simply is not.  range.within to track the tree also causes troubles because a range can be within multiple ranges, but mirador only looks for
        it to be within one.  This algorithm will solve that problem as well. 

        contact bhaberbe@slu.edu (thehabes on github) with questions.  See IIIF/mirador issue #680.
      */

        /* Helper function to find the root object from a manifest's structures array, or return a 'root' holder object. */
        var tree, parent;
        function getParentest(rangeList){
            var parentest = {'@id': "root", label: "Table of Contents", within:"root" };
            for(var i=0; i<rangeList.length; i++){
                if(rangeList[i].within && rangeList[i].within == "root"){ //There can only be one range with this, otherwise this algorithm breaks.
                    parentest = rangeList[i];
                    break; //no need to keep looking, there is only 1.
                }
            }
            return parentest;
        }
       
        /* 
          Helper function to pull an object out of the rangeList by its @id property or return an empty object.
          BE CAREFUL HERE.  An empty object returned means a URI was in range.ranges[] but was not in manifest.structures[], which is an ERROR.
          We do not want the TOC to print out an empty holder for this.  Essentially we would like the algorithm to SKIP THIS CHILD.
         */
        function pullFromStructures(uri, rangeList){
            var pull_this_out = {};
            for(var i=0; i<rangeList.length; i++){
                if(rangeList[i]["@id"] == uri){
                    pull_this_out = rangeList[i];
                    break;
                }
            }
            return pull_this_out;
        }
   
        // Recursively build tree/table of contents data structure
        // Begins with the list of topmost categories
        function unflatten(flatRanges, parent, tree) {
          // To aid recursion, define the tree if it does not exist,
          // but use the tree that is being recursively built
          // by the call below.
          var children_uris = [];
          var children = [];
          tree = typeof tree !== 'undefined' ? tree : [];
          parent = typeof parent !== 'undefined' ? parent : getParentest(flatRanges);
          if(typeof parent.ranges !== 'undefined'){ 
            children_uris = parent.ranges;
          }
          for(var i=0; i<children_uris.length; i++){ //get the children in order by their @id property from the structures array
            var new_child = pullFromStructures(children_uris[i], flatRanges);
            if(!jQuery.isEmptyObject(new_child)){
              //BE CAREFUL HERE.  his is an error, we dont want this child to be a part of the recursion.
              children.push(new_child);
            }
          }
          if ( children.length ) {
            if ( parent.within === 'root' || parent.id == 'root') { 
              // If there are children and their parent's
              // id is a root or within is root, bind them to the tree object.
              //
              // This begins the construction of the object,
              // and all non-top-level children are now
              // bound to these base nodes set on the tree
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
              children.forEach(function(child) {
                child.level = parent.level+1;
              });
              parent.children = children;
            }
            // The function cannot continue to the return
            // statement until this line stops being called,
            // which only happens when "children" is empty.
            jQuery.each(children, function( index, child ){unflatten(flatRanges, child);});
          }
          return tree;
        }
        return unflatten(rangeList);
     },

    render: function() {
      var _this = this,
          toDeselect = _this.previousSelectedElements.map(function(rangeID) {
            return _this.tocData[rangeID].element;
          }),
          toSelect = _this.selectedElements.map(function(rangeID) {
            return _this.tocData[rangeID].element;
          }),
          toOpen = _this.selectedElements.filter(function(rangeID) {
            return (jQuery.inArray(rangeID, _this.openElements) < 0) && (jQuery.inArray(rangeID, _this.previousSelectedElements) < 0);
          }).map(function(rangeID) {
            return _this.tocData[rangeID].element;
          }),
          toClose = _this.previousSelectedElements.filter(function(rangeID) {
            return (jQuery.inArray(rangeID, _this.openElements) < 0) && (jQuery.inArray(rangeID, _this.selectedElements) < 0);
          }).map(function(rangeID) {
            return _this.tocData[rangeID].element;
          });

      // Deselect elements
      toDeselect.forEach(function(element) {
          element.removeClass('selected');
      });

      // Select new elements
      toSelect.forEach(function(element) {
        element.addClass('selected');
      });

      // Scroll to new elements
      scroll();

      // Open newly opened sections
      toOpen.forEach(function(element) {
        jQuery(element).addClass('open').find('ul:first').slideFadeToggle();
      });

      // Close previously opened selections (find way to keep scroll position).
      toClose.forEach(function(element) {
        jQuery(element).removeClass('open').find('ul:first').slideFadeToggle(400, 'swing', scroll);
      });

      // Get the sum of the outer height of all elements to be removed.
      // Subtract from current parent height to retreive the new height.
      // Scroll with respect to this.
      scroll();

      function scroll() {
        var head = _this.element.find('.selected').first();
        if (head.length > 0) {
          _this.element.scrollTo(head, 400);
        }
      } 

    },

    bindEvents: function() {
      var _this = this;

      // _this.eventEmitter.subscribe('focusChanged', function(_, focusFrame) {
      // });

      // _this.eventEmitter.subscribe('cursorFrameUpdated', function(_, cursorBounds) {
      // });

      _this.eventEmitter.subscribe('tabStateUpdated.' + _this.windowId, function(_, data) {
        _this.tabStateUpdated(data);
      });

      _this.eventEmitter.subscribe(('currentCanvasIDUpdated.' + _this.windowId), function(event, canvasID) {
        if (!_this.structures) { return; }
        _this.setSelectedElements($.getRangeIDByCanvasID(_this.structures, canvasID));
        _this.render();
      });

      _this.element.find('.toc-link').on('click', function(event) {
        event.stopPropagation();

        var rangeID = jQuery(this).data().rangeid,
            canvasID = jQuery.grep(_this.structures, function(item) { return item['@id'] == rangeID; })[0].canvases[0],
            isLeaf = jQuery(this).closest('li').hasClass('leaf-item');

        _this.eventEmitter.publish('SET_CURRENT_CANVAS_ID.' + _this.windowId, canvasID);
      });

      _this.element.find('.toc-caret').on('click', function(event) {
        var caret = this;
        event.stopPropagation();
        var rangeID = jQuery(this).parent().data().rangeid;
        _this.setOpenItem(rangeID);
        _this.render();
        //BH FIX: This way does not open up the list.  The event is detected, but nothing happens.
        jQuery(caret).toggleClass("selected").parents("li:first").toggleClass('open').find('ul:first').slideFadeToggle();
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

    emptyTemplate: Handlebars.compile([
      '<ul class="toc">',
      '<li class="leaf-item open">',
      '<h2><span>No index available</span></h2>',
      '</ul>',
    ].join('')),

    template: function(tplData) {

      var template = Handlebars.compile([
        '<ul class="toc">',
        '{{#nestedRangeLevel ranges}}',
        '<li class="{{#if children}}has-child{{else}}leaf-item{{/if}}">',
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
          child.label = $.JsonLd.getTextValue(child.label);
          out = out + previousTemplate(child);
        });
        return out;
      });

      Handlebars.registerHelper('tocLevel', function(id, label, level, children) {
        var caret = '<i class="fa fa-caret-right toc-caret"></i>',
        //cert = '<i class="fa fa-certificate star"></i>';
        cert = '<i class="fa star"></i>';
        //BH edit: move caret to the right of the label.
        return '<h' + (level+1) + '><a class="toc-link" data-rangeID="' + id + '"><span>' + label + '</span>' + caret + cert + '</a></h' + (level+1) + '>';   
      });

      return template(tplData);
    },

    hide: function() {
      var _this = this;
      jQuery(this.appendTo).hide();
      _this.eventEmitter.publish('ADD_CLASS.'+this.windowId, 'focus-max-width');
    },

    show: function() {
      var _this = this;
      jQuery(this.appendTo).show({effect: "fade", duration: 300, easing: "easeInCubic"});
      _this.eventEmitter.publish('REMOVE_CLASS.'+this.windowId, 'focus-max-width');
    }

  };

}(Mirador));
