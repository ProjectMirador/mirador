(function($) {

  $.TableOfContents = function(options) {

    jQuery.extend(true, this, {
      element:           null,
      appendTo:          null,
      parent:            null
    }, $.DEFAULT_SETTINGS, options);

    this.init();

  };

  $.TableOfContents.prototype = {
    init: function () {
      var _this = this;

      this.ranges = this.getTplData();
      console.log('ranges bound');
      console.log(this.ranges);
      this.render();
      this.bindEvents();
      this.element = jQuery(this.template({ ranges: _this.ranges })).appendTo(this.appendTo);
    },

    getTplData: function() {  
      var _this = this,
      ranges = [];
      if (!_this.manifest.structures) { return []; }
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
      

      ranges = _this.extractRangeTrees(ranges);
      return ranges;
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
            console.log('arrived at root');
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
            console.log('arrived at middle level');
            parent.children = children;
            console.log(parent.children);
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
    },

    bindEvents: function() {
      var _this = this;

      jQuery.subscribe('focusChanged', function(_, manifest, focusFrame) {
      });

    },

    template: function(tplData) {

      var template = Handlebars.compile([
        '{{#nestedRangeLevel ranges}}',
          '{{{tocLevel label level}}}',
          '{{#if children}}',
            '{{{nestedRangeLevel children}}}',
          '{{/if}}',
        '{{/nestedRangeLevel}}'
      ].join(''));

      var previousTemplate;

      Handlebars.registerHelper('nestedRangeLevel', function(children, options) {
        var out = '';

        if (options.fn !== undefined) {
          previousTemplate = options.fn;
        }

        children.forEach(function(child){
          out = out + previousTemplate(child);
        });

        return out;
      });

      Handlebars.registerHelper('tocLevel', function(label, level){
        console.log('inside tocLevel');
        return '<h' + (level+1) + '>' + label + '</h' + (level+1) + '>';
      });

      console.log(tplData);

      return template(tplData);
    },
    toggle: function(stateValue) {
        if (stateValue) { 
            this.show(); 
        } else {
            this.hide();
        }
    },
    
    hide: function() {
        jQuery(this.appendTo).hide({effect: "fade", duration: 1000, easing: "easeOutCubic"});
    },

    show: function() {
        jQuery(this.appendTo).show({effect: "fade", duration: 1000, easing: "easeInCubic"});
    }
  };

}(Mirador));

