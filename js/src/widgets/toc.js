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
      previousOpenElements: [],
      openElements:     [],
      hoveredElement:   [],
      selectContext:    null,
      tocData: {},
      active: null,
      eventEmitter: null
    }, options);

    this.init();

    var self = this;
    window.render = function() {self.render();};
  };

  $.TableOfContents.prototype = {
    init: function () {
      var _this = this;
      if (!_this.structures || _this.structures.length === 0) {
        this.element = jQuery(this.emptyTemplate()).appendTo(this.appendTo);
      } else {
        this.element = jQuery(this.template({ ranges: this.getTplData() })).appendTo(this.appendTo);
        this.tocData = _this.initTocData();
        this.setSelectedElements($.getRangeIDByCanvasID(_this.structures, _this.canvasID));
        this.element.find('.has-child ul').hide();
        this.render();
      }
      this.bindEvents();
    },

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
          ranges;

      switch (_this.manifestVersion) {
      case '1':
        ranges = _this.extractV1RangeTrees(_this.structures);
        break;
      case '2':
        ranges = _this.extractV2RangeTrees(_this.structures);
        break;
        // case '2.1':
        //   _this.extractV21RangeTrees(_this.structures);
      }
      if (ranges.length < 2) {
        if (ranges[0].children) {
          ranges = ranges[0].children;
        }
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
        var children = [];
        if (parent.ranges) {
          jQuery.each(parent.ranges, function(index, id) {
            //make sure id is a string for grepping
            id = typeof id === 'object' ? id['@id'] : id;
            var child = jQuery.grep(flatRanges, function(range, index) {
              if (range['@id'] === id) {
                return range;
              }
            })[0];
            if (child) {
              children.push(child);
            }
          });
        } else if (parent['@id'] === 'root') {
          // we have created a dummy root node, get the top most range as only child
          var top = jQuery.grep(flatRanges, function(range, index) {
            //check if we have a viewingHint
            if (range.hasOwnProperty('viewingHint') && range.viewingHint === 'top') {
              //found the top most range
              return range;
            }
          })[0];
          if (top) {
            children.push(top);
          }
          // if we still don't have children, loop through and look for a range with children
          // if we still can't find one, then create a dummy range in which all ranges are its children
          if (children.length === 0) {
            jQuery.each(flatRanges, function(index, range) {
              if (range.ranges) {
                children.push(range);
                return false;
              }
            });
            if (children.length === 0) {
              children.push({"ranges" : flatRanges});
            }
          }
        }
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

    render: function() {

      var _this = this;
      var toDeselect = _this.previousSelectedElements.map(function(rangeID) {
        return _this.tocData[rangeID].element;
      }),
          toSelect = _this.selectedElements.map(function(rangeID) {
            return _this.tocData[rangeID].element;
          }),
          toOpen = _this.openElements.filter(function(rangeID) {
            return jQuery.inArray(rangeID, _this.previousOpenElements) === -1;
          }).map(function(rangeID) {
            return _this.tocData[rangeID].element;
          }),
          toClose = _this.previousOpenElements.filter(function(rangeID) {
            return jQuery.inArray(rangeID, _this.openElements) === -1;
          }).map(function(rangeID) {
            return _this.tocData[rangeID].element;
          });

      if (_this.previousSelectedElements !== _this.selectedElements) {
        // Deselect elements
        toDeselect.forEach(function(element) {
          element.removeClass('selected');
        });

        // Select new elements
        toSelect.forEach(function(element) {
          element.addClass('selected');
        });

        toClose.forEach(function(element) {
          element.removeClass('open');
          element.find('ul:first').slideFadeToggle();
        });

        toOpen.forEach(function(element) {
          // TODO if you open a range below an open range, it scrolls back up to the first open range
          // comment out scrolling for now
          //element.addClass('open').find('ul:first').slideFadeToggle(250, 'swing', scroll);
          element.addClass('open').find('ul:first').slideFadeToggle();
        });
      } else {
        toOpen.forEach(function(element) {
          element.addClass('open').find('ul:first').slideFadeToggle();
        });

        toClose.forEach(function(element) {
          element.removeClass('open').find('ul:first').slideFadeToggle();
        });
      }

      // Open newly opened sections
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
            canvasID = jQuery.grep(_this.structures, function(item) { return item['@id'] == rangeID; })[0].canvases[0];

        _this.eventEmitter.publish('SET_CURRENT_CANVAS_ID.' + _this.windowId, canvasID);
      });

      _this.element.find('.toc-caret').on('click', function(event) {
        event.stopPropagation();

        var rangeID = jQuery(this).parent().data().rangeid;
        _this.setOpenItem(rangeID);
        _this.render();
      });
    },

    setActive: function(active) {
      var _this = this;
      _this.active = active;
    },

    setOpenItem: function(rangeID) {
      var _this = this,
          alreadyOpen = jQuery.inArray(rangeID, _this.openElements) !== -1;

      _this.previousOpenElements = _this.openElements;
      _this.openElements = (function() {
        if (alreadyOpen) {
          return _this.openElements.filter(function(elementID) {
            return elementID !== rangeID;
          });
        }
        return _this.openElements.map(function(elementID) {return elementID;}).concat([rangeID]);
      })();

    },

    // focusCursorFrame: function() {
    // },

    // hoverItem: function() {
    // },

    setSelectedElements: function(rangeIDs) {
      var _this = this;

      _this.previousSelectedElements = _this.selectedElements;
      _this.selectedElements = rangeIDs;
      _this.previousOpenElements = _this.openElements;
      // Ensure that all new selected elements are added to
      // the list of open elements,
      // and all previously selected elements are removed.
      _this.openElements = _this.openElements.filter(function(openElementID) {
        return jQuery.inArray(openElementID, _this.previousSelectedElements) === -1;
      }).concat(rangeIDs).filter(function(openElementID,index,openElements){
        // this filters out any duplicates, which would cause a bug.
        return index === openElements.indexOf(openElementID);
      });
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
            cert = '<i class="fa fa-certificate star"></i>';
        return '<h' + (level+1) + '><a class="toc-link" data-rangeID="' + id + '">' + caret + cert + '<span>' + label + '</span></a></h' + (level+1) + '>';
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
