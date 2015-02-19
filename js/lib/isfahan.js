var Isfahan = function(configObject) {
  var _this = this,

  containerSize = function(containerId) {
    return [document.getElementById(containerId).offsetWidth,
      document.getElementById(containerId).offsetHeight]
  },
  containerId = configObject.containerId,
  pad = d3_layout_cellPadNull,
  round = Math.round,
  padding = configObject.padding,
  hierarchy = d3.layout.hierarchy(),
  layoutDescription = configObject.layoutDescription;

  function calculateLayout(node) {
    var children = node.children;

    if (children && children.length) {
      var rect = pad(node),
      type = node.type,
      group = [],
      remaining = children.slice(), // copy-on-write
      child,
      n;

      while ((n = remaining.length) > 0) {
        group.push(child = remaining[n - 1]);
        remaining.pop();
      }

      position(group, node.type, rect);
      children.forEach(function(child, index) {
        child.address = node.address.concat("." + child.type + (index + 1));
      })
      children.forEach(calculateLayout);
    }
  }

  // Positions the specified row of nodes. Modifies `rect`.
  function position(group, groupType, rect) {
    // console.log('%c\n'+' parent ' + groupType + ' rect is: ', 'background: #222; color: #EFEFEF; font-family: helvetica neue; font-size:20px; padding: 0 7px 3px 0;');
    // console.log(rect);
    var i = -1,
    row = (groupType === "row") ? false : true, // for ternary statements later, specifies whether that particular child is a row or not. Allows easy, centralised description of the parameter calculations that can be switched from row to column.
    n = group.length,
    x = rect.x,
    y = rect.y,
    o;
    var offset = 0;
    while (++i < n) {
      o = group[n-(i+1)],
      d = divisor(o, row, rect, group, n),
      o.id = typeof o.id !== 'undefined' ? o.id : genUuid(),
      o.x = row ?  x : x + offset,
      o.y = row ? y + offset : y,
      o.dx = row ? rect.dx : rect.dx/d,
      o.dy = row ? rect.dy/d : rect.dy,
      offset += row ? o.dy : o.dx;
      // console.log({x:o.x, y: o.y, width:o.dx, height: o.dy});
    }
  }

  function divisor(node, row, rect, group, n) {

    var old = false,
    dimension = row ? 'dy' : 'dx',
    total = rect[dimension],
    divisor;
    // if not already set, divide equally.
    group.forEach(function(item) {
      if (!item[dimension] === undefined) { 
        old = true;
      }
    });

    if (old) {
      console.log('preserved');
      var sum = group.reduce(
        function(previousValue, currentValue, index, array) {
        return previousValue[dimension] + currentValue[dimension];
      });
      console.log('sum: ' + sum);
      
      divisor = (node[dimension]/sum)*total;
      console.log("divisor: "+divisor);
      return divisor;
    } else {
      return n;
    }
  }

  function isfahan(configObject) {
    var nodes = hierarchy(configObject.layoutDescription),
    root = nodes[0];
    size = (function(containerSelector) {
      var width = jQuery(containerSelector).width();
      var height = jQuery(containerSelector).height();

      return [width, height];
    })(configObject.containerSelector);
    root.x = 0;
    root.y = 0;
    root.dx = containerSize(containerId)[0];
    root.dy = containerSize(containerId)[1];
    root.address = root.type + "1";
    root.id = root.id || genUuid();

    calculateLayout(root);
    isfahan.padding(padding);
    nodes = nodes.map(function(node) {
      return merge(node, pad(node));
    });

    return nodes;
  } 

  isfahan.size = function(x) {
    if (!arguments.length) return containerSize;
    containerSize = x;
    return isfahan;
  };

  isfahan.round = function(x) {
    if (!arguments.length) return round != Number;
    round = x ? Math.round : Number;
    return isfahan;
  };

  isfahan.padding = function(x) {
    if (!arguments.length) return padding;

    function padFunction(node) {
      var p = x.call(isfahan, node, node.depth);
      console.log(p);
      return p == null
      ? d3_layout_cellPadNull(node)
      : d3_layout_cellPad(node, typeof p === "number" ? [p, p, p, p] : p);
    }

    function padConstant(node) {
      return d3_layout_cellPad(node, x);
    }

    var type;
    pad = (padding = x) == null ? d3_layout_cellPadNull
    : (type = typeof x) === "function" ? padFunction
    : type === "number" ? (x = [x, x, x, x], padConstant)
    : padConstant;
    return isfahan;
  };

  function genUuid() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
      var r = Math.random()*16|0, v = c == 'x' ? r : (r&0x3|0x8);
      return v.toString(16);
    });
  }

  function d3_layout_cellPadNull(node) {
    return {x: node.x, y: node.y, dx: node.dx, dy: node.dy};
  }

  function d3_layout_cellPad(node, padding) {
    var x = node.x + padding[3],
    y = node.y + padding[0],
    dx = node.dx - padding[1] - padding[3],
    dy = node.dy - padding[0] - padding[2];
    if (dx < 0) { x += dx / 2; dx = 0; }
    if (dy < 0) { y += dy / 2; dy = 0; }
    return {x: x, y: y, dx: dx, dy: dy};
  }
  
  function merge(target, source) {

    /* Merges two (or more) objects,
       giving the last one precedence */

    if ( typeof target !== 'object' ) {
      target = {};
    }

    for (var property in source) {

      if ( source.hasOwnProperty(property) ) {

        var sourceProperty = source[ property ];

        if ( typeof sourceProperty === 'object' ) {
          target[ property ] = util.merge( target[ property ], sourceProperty );
          continue;
        }

        target[ property ] = sourceProperty;

      }

    }

    for (var a = 2, l = arguments.length; a < l; a++) {
      merge(target, arguments[a]);
    }

    return target;
  };

  // return d3.rebind(isfahan, hierarchy,"sort", "children", "value");
  return isfahan(configObject);
};
