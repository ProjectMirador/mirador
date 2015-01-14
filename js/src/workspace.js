(function($) {

  $.Workspace = function(options) {

    jQuery.extend(true, this, {
      type:             null,
      workspaceSlotCls: 'slot',
      focusedSlot:      null,
      slots:            [],
      appendTo:         null,
      parent:           null
    }, options);

    this.element  = this.element || jQuery('<div class="workspace-container" id="workspace">');
    this.init();

  };

  $.Workspace.prototype = {
    init: function () {
      this.element.appendTo(this.appendTo);
      if (this.type === "none") {
        this.parent.toggleSwitchWorkspace();
        return;
      }

      this.calculateLayout();

      if (this.focusedSlot === null) {
        // set the focused slot to the first in the list
        this.focusedSlot = this.slots[0].slotID;
      }

      this.bindEvents();
    },
    slotList: function(layoutSlots) {
      var _this = this;

      layoutSlots.forEach(function(slotData) {

        if (!jQuery.grep(_this.slots, function(slot) { return slotData.id === slot.slotID; }).length) {
          var appendTo = _this.element.children('div').filter('[data-layout-slot-id="'+slotData.id+'"]')[0];
          _this.slots.push(new $.Slot({
            slotID: slotData.id,
            focused: true,
            parent: _this,
            appendTo: appendTo
          }));
        }
      });
    },

    calculateLayout: function() {
      var _this = this,
      layout;

      _this.layout = layout = new Isfahan({
        containerId: _this.element.attr('id'),
        layoutDescription: _this.parent.workspaces[_this.parent.currentWorkspaceType].layout,
        configuration: null,
        padding: 3 
      });

      var data = layout.filter( function(d) {
        return !d.children;
      });

      // Data Join.
      var divs = d3.select("#" + _this.element.attr('id')).selectAll(".layout-slot")
      .data(data, function(d) { return d.id; });

      // Implicitly updates the existing elements.
      // Must come before the enter function.
      divs.call(cell);

      // Enter
      divs.enter().append("div")
      .attr("class", "layout-slot")
      .attr("data-layout-slot-id", function(d) { return d.id; })
      .call(cell)
      .each(function(d) { console.log(d); });

      // Exit
      divs.exit()
      .remove("div")
      .each(function(d) { 
        var slot = jQuery.grep(_this.slots, function(slot) {
          return slot.slotID === d.id;
        })[0];

        // if (slot.window !== null) {
        //   jQuery.publish("windowRemoved", slot.window.id);
        // }
        _this.slots.splice(_this.slots.indexOf(slot), 1);
      });

      function cell() {
        this
        .style("left", function(d) { return d.x + "px"; })
        .style("top", function(d) { return d.y + "px"; })
        .style("width", function(d) { return Math.max(0, d.dx ) + "px"; })
        .style("height", function(d) { return Math.max(0, d.dy ) + "px"; });
      }

      _this.slotList(data);

    },

    splitLeft: function() {

    },

    splitRight: function() {

    },

    splitDown: function(targetSlot) {
      var _this = this,
      node = jQuery.grep(_this.layout, function(node) { return node.id === targetSlot.slotID; })[0],

      // if it's a column, 
      // create a new node that is the parent
      // of this node.
      newParent = _this.newNode(node.type, node.address, node.parent),
      oldAddress = node.address;

      // Recalculate the address of this node
      // and flip its type while keeping
      // the same id.
      node.type = node.type === 'row' ? 'column' : 'row';

      console.log(node);

      node.address = node.address.concat(node.type + '1');

      // Create a new node (which will be childless)
      // that is also a sibling of this node.
      newSibling = _this.newNode(node.type, oldAddress.concat(node.type + '1'), newParent);
      // maintain array ordering.
      newParent.children.push(node, newSibling);

      // Recalculate the layout (just UI code????).
      node.parent = newParent;
      _this.layout.push(newParent, newSibling);
      var root = jQuery.grep(_this.layout, function(node) { return !node.parent;})[0];
      _this.parent.workspaces[_this.parent.currentWorkspaceType].layout = root;
      _this.calculateLayout();
    },

    splitUp: function() {

    },

    newNode: function(type, address, parent) {
      return {
        type: type,
        address: address,
        id: $.genUUID(),
        parent: parent,
        children: []
      };
    },

    treeifyLayout: function(flatLayout) {
      
      flatLayout.forEach(function(node) {
        if (node.parent) {
          // add to parent
          var parent = dataMap[node.parent];
          if (parent) {
            // create child array if it doesn't exist
            (parent.children || (parent.children = []))
            // add node to child array
            .push(node);
          } else {
            // parent is null or missing
            treeData.push(node);
          }
        }
      });

      console.log(dataMap);

      return dataMap;
    },

    availableSlot: function() {
      var toReturn = null;
      jQuery.each(this.slots, function(index, value) {
        if (!value.window) {
          toReturn = value.slotID;
          return false;
        }
      });
      return toReturn;
    },

    bindEvents: function() {
      var _this = this;

      d3.select(window).on('resize', function(event) {
        _this.calculateLayout();
      });
    },

    clearSlot: function(slotId) {
      if (this.slots[slodId].windowElement) { 
        this.slots[slotId].windowElement.remove();
      }
      this.slots[slotId].window = new $.Window();
    },

    addItem: function(slotID) {
      this.focusedSlot = slotID;
      this.parent.toggleLoadWindow();
    },

    hide: function() {
      jQuery(this.element).hide({effect: "fade", duration: 1000, easing: "easeOutCubic"});
    },

    show: function() {
      jQuery(this.element).show({effect: "fade", duration: 1000, easing: "easeInCubic"});
    }
  };

}(Mirador));

