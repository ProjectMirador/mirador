(function($) {

  $.Workspace = function(options) {

    jQuery.extend(true, this, {
      workspaceSlotCls: 'slot',
      focusedSlot:      null,
      slots:            [],
      windows:          [],
      appendTo:         null,
      layoutDescription:    null,
      state:            null,
      eventEmitter:     null
    }, options);

    var uid = $.genUUID();
    this.element  = this.element || jQuery('<div class="workspace-container" id="workspace-'+uid+'">');
    this.init();

  };

  $.Workspace.prototype = {
    init: function () {
      this.element.appendTo(this.appendTo);
      // this if statement does not appear to be doing anything because toggleSwitchWorkspace is not a function anywhere
      // if (this.type === "none") {
      //   this.parent.toggleSwitchWorkspace();
      //   return;
      // }

      this.calculateLayout();

      this.bindEvents();
      this.listenForActions();
    },

    listenForActions: function() {
      var _this = this;

      _this.eventEmitter.subscribe('resizeMirador', function(event) {
        _this.calculateLayout();
      });

      _this.eventEmitter.subscribe('manifestQueued', function(event, manifestPromise) {
        // Trawl windowObjects preemptively for slotAddresses and
        // notify those slots to display a "loading" state.
        // Similar to the operation of the manifestLoadStatusIndicator
        // and its associated manifestList controller.
        var targetSlot;

        if (_this.state.getStateProperty('windowObjects')) {
          var check = _this.state.getStateProperty('windowObjects').forEach(function(windowConfig, index) {
            // windowConfig.slotAddress will give the slot;
            // change the state on that slot to be "loading"
            if (windowConfig.slotAddress) {
              targetSlot = _this.getSlotFromAddress(windowConfig.slotAddress);
            } else {
              targetSlot = _this.focusedSlot || _this.slots.filter(function(slot) {
                return slot.hasOwnProperty('window') ? true : false;
              })[0];
            }
          });
        }
      });

      _this.eventEmitter.subscribe('REMOVE_WINDOW', function(event, windowId){
        _this.removeWindow(windowId);
      });

      _this.eventEmitter.subscribe('REMOVE_NODE', function(event, node){
        _this.removeNode(node);
      });

      _this.eventEmitter.subscribe('ADD_SLOT_ITEM', function(event, slot){
        _this.addItem(slot);
      });

      _this.eventEmitter.subscribe('ADD_WINDOW', function(event, windowConfig) {
        _this.addWindow(windowConfig);
      });

      _this.eventEmitter.subscribe('SPLIT_RIGHT', function(event, slot) {
        _this.splitRight(slot);
      });

      _this.eventEmitter.subscribe('SPLIT_LEFT', function(event, slot) {
        _this.splitLeft(slot);
      });

      _this.eventEmitter.subscribe('SPLIT_DOWN', function(event, slot) {
        _this.splitDown(slot);
      });

      _this.eventEmitter.subscribe('SPLIT_UP', function(event, slot) {
        _this.splitUp(slot);
      });

      _this.eventEmitter.subscribe('RESET_WORKSPACE_LAYOUT', function(event, options) {
        _this.resetLayout(options.layoutDescription);
      });
    },

    bindEvents: function() {
      var _this = this;

      d3.select(window).on('resize', function(event) {
        _this.calculateLayout();
      });
    },

    get: function(prop, parent) {
      if (parent) {
        return this[parent][prop];
      }
      return this[prop];
    },

    set: function(prop, value, options) {
      var _this = this;
      if (options) {
        this[options.parent][prop] = value;
      } else {
        this[prop] = value;
      }
      _this.eventEmitter.publish(prop + '.set', value);
    },

    calculateLayout: function(resetting) {
      var _this = this,
          layout;

      _this.layout = layout = new Isfahan({
        containerId: _this.element.attr('id'),
        layoutDescription: _this.layoutDescription,
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
      divs.call(cell).each(function(d) {
        _this.slots.forEach(function(slot) {
          if (slot.slotID === d.id) {
            slot.layoutAddress = d.address;
          }
        });
      });

      // Enter
      divs.enter().append("div")
        .attr("class", "layout-slot")
        .attr("data-layout-slot-id", function(d) { return d.id; })
        .call(cell)
        .each(function(d) {
          var appendTo = _this.element.children('div').filter('[data-layout-slot-id="'+ d.id+'"]')[0];
          _this.slots.push(new $.Slot({
            slotID: d.id,
            layoutAddress: d.address,
            focused: true,
            appendTo: appendTo,
            state: _this.state,
            eventEmitter: _this.eventEmitter
          }));
        });

      // Exit
      divs.exit()
        .remove("div")
        .each(function(d) {
          var slotMap = _this.slots.reduce(function(map, temp_slot) {
            if (d.id === temp_slot.slotID) {
              map[d.id] = temp_slot;
            }
            return map;
          }, {}),
              slot = slotMap[d.id];

          if (slot && slot.window && !resetting) {
            _this.eventEmitter.publish('REMOVE_WINDOW', slot.window.id);
          }

          // nullify the window parameter of old slots
          slot.window = null;
          _this.slots.splice(_this.slots.indexOf(slot), 1);
        });

      function cell() {
        this
          .style("left", function(d) { return d.x + "px"; })
          .style("top", function(d) { return d.y + "px"; })
          .style("width", function(d) { return Math.max(0, d.dx ) + "px"; })
          .style("height", function(d) { return Math.max(0, d.dy ) + "px"; });
      }

      var root = jQuery.grep(_this.layout, function(node) { return !node.parent;})[0];

      _this.eventEmitter.publish("layoutChanged", root);
      _this.eventEmitter.publish('slotsUpdated', {slots: _this.slots});

      if (_this.slots.length <= 1) {
        _this.eventEmitter.publish('HIDE_REMOVE_SLOT');
      } else {
        _this.eventEmitter.publish('SHOW_REMOVE_SLOT');
      }
    },

    split: function(targetSlot, direction) {
      var _this = this,
          node = jQuery.grep(_this.layout, function(node) { return node.id === targetSlot.slotID; })[0];
      nodeIndex = node.parent ? node.parent.children.indexOf(node) : 0,
      nodeIsNotRoot = node.parent;

      function addSibling(node, indexDifference) {
        if (nodeIsNotRoot) {
          var siblingIndex = nodeIndex + indexDifference,
              newSibling = _this.newNode(node.type, node);

          node.parent.children.splice(siblingIndex, 0, newSibling);
          _this.layout.push(newSibling);
          return newSibling;
        }

        // handles the case where the root needs to be mutated.
        node.type = node.type === 'row' ? 'column' : 'row';
        mutateAndAdd(node, indexDifference);
      }

      function mutateAndAdd(node, indexDifference) {
        // Locally mutate the tree to accommodate a
        // sibling of another kind, transforming
        // both the target node and its parent.
        var newParent = _this.newNode(node.type, node.parent);

        // Flip its type while keeping
        // the same id.
        node.type = node.type === 'row' ? 'column' : 'row';

        // Create a new node (which will be childless)
        // that is also a sibling of this node.
        newSibling = _this.newNode(node.type, newParent);

        // maintain array ordering.
        newParent.children = [];
        newParent.children.push(node); // order matters, place node first.
        newParent.children.splice(indexDifference, 0, newSibling); // order matters, so put new sibling on one side or the other.
        if (nodeIsNotRoot) {
          newParent.parent = node.parent;
          // replace the old node in its parent's child
          // array with the new parent.
          newParent.parent.children[nodeIndex] = newParent;
        }

        node.parent = newParent;
        _this.layout.push(newParent, newSibling);
      }

      if (node.type === 'column') {
        // Since it is a column:
        //
        // If adding to a side, simply
        // add a sibling.
        // Left means before, right means after.
        if (direction === 'r' || direction === 'l') {
          indexDifference = direction === 'r' ? 1 : 0;
          addSibling(node, indexDifference);
        }
        // If adding above or below, the
        // operation must be changed to mutating
        // the structure.
        // Up means before, Down means after.
        else {
          indexDifference = direction === 'd' ? 1 : 0;
          mutateAndAdd(node, indexDifference);
        }
      } else {
        // Since it is a row:
        //
        // If adding to a side, mutate the
        // structure.
        // Left means before, right means after.
        if (direction === 'r' || direction === 'l') {
          indexDifference = direction === 'r' ? 1 : 0;
          mutateAndAdd(node, indexDifference);
        }
        // If adding above or below, the
        // operations must be switched to adding
        // a sibling.
        // Up means before, Down means after.
        else {
          indexDifference = direction === 'd' ? 1 : 0;
          addSibling(node, indexDifference);
        }
      }

      // Recalculate the layout.
      // The original hierarchical structure is
      // accessible from the root node. Passing
      // it back through the layout code will
      // recalculate everything else needed for
      // the redraw.
      var root = jQuery.grep(_this.layout, function(node) { return !node.parent;})[0];
      _this.layoutDescription = root;
      _this.calculateLayout();

    },

    splitRight: function(targetSlot) {
      var _this = this;
      _this.split(targetSlot, 'r');
    },

    splitLeft: function(targetSlot) {
      var _this = this;
      _this.split(targetSlot, 'l');
    },

    splitUp: function(targetSlot) {
      var _this = this;
      _this.split(targetSlot, 'u');
    },

    splitDown: function(targetSlot) {
      var _this = this;
      _this.split(targetSlot, 'd');
    },

    removeNode: function(targetSlot) {
      // de-mutate the tree structure.
      var _this = this,
          node = jQuery.grep(_this.layout, function(node) { return node.id === targetSlot.slotID; })[0],
          nodeIndex = node.parent.children.indexOf(node),
          parentIndex,
          remainingNode,
          root = jQuery.grep(_this.layout, function(node) { return !node.parent;})[0];

      if (node.parent.children.length === 2) {
        // de-mutate the tree without destroying
        // the children of the remaining node,
        // which in this case means changing their
        // IDs.
        node.parent.children.splice(nodeIndex,1);
        remainingNode = node.parent.children[0];

        remainingNode.parent.id = remainingNode.id;
        delete node.parent;
      } else if (node.parent.children.length === 1) {
      } else {
        // If the node is one of more than 2 siblings,
        // simply splice it out of the parent's children
        // array.
        node.parent.children.splice(nodeIndex, 1);
      }

      //delete targetSlot;
      _this.layoutDescription = root;
      _this.calculateLayout();
      _this.eventEmitter.publish('slotRemoved',targetSlot);
    },

    newNode: function(type, parent) {
      if (typeof parent === 'undefined') {
        return {
          type: type,
          id: $.genUUID()
        };
      } else {
        return {
          type: type,
          id: $.genUUID(),
          parent: parent
        };
      }
    },

    getSlotFromAddress: function(address) {
      var _this = this;
      return _this.slots.filter(function(slot) {
        return slot.layoutAddress === address;
      })[0];
    },

    resetLayout: function(layoutDescription) {
      this.layoutDescription = layoutDescription;
      this.calculateLayout(true);
      this.placeWindows();
    },

    placeWindows: function() {
      // take the windows array and place
      // as many windows into places as can
      // fit.
      var _this = this,
          deletedWindows;

      if (_this.windows.length > _this.slots.length) {
        // This issues the REMOVE_WINDOW action for
        // the earliest windows for which a slot will
        // not be available after the layout changes.
        //
        // We use slice, not splice, here because it is
        // non-destructive. The actual state mutation will
        // be handled in the action callback, since only
        // actions should be allowed to mutate global state.
        _this.windows.slice(0, _this.windows.length -_this.slots.length)
          .forEach(function(removedWindow){
            _this.eventEmitter.publish('REMOVE_WINDOW', removedWindow.id);
          });
      }

      _this.windows.forEach(function(window) {
        var slot = _this.getAvailableSlot();
        slot.window = window;

        window.update({
          id: window.id,
          slotAddress: slot.layoutAddress,
          state: _this.state,
          appendTo: slot.element,
          canvasID: window.canvasID,
          viewType: window.viewType
        });
      });
    },

    getAvailableSlot: function() {
      return this.slots.filter(function(slot) {
        return !slot.window;
      })[0];
    },

    clearSlot: function(slotId) {
      if (this.slots[slotId].windowElement) {
        this.slots[slotId].windowElement.remove();
      }
      this.slots[slotId].window = null;
    },

    addItem: function(slot) {
      var _this = this;
      this.focusedSlot = slot;
      _this.eventEmitter.publish('TOGGLE_LOAD_WINDOW');
    },

    addWindow: function(windowConfig) {
      // Windows can be added from a config,
      // from a saved state, (in both those cases they are in the form of "windowObjects")
      // from the workspace windows list after a grid layout change,
      // from the manifests panel in image mode,
      // or from the manifests panel in thumbnail mode.
      var _this = this,
          newWindow,
          targetSlot;

      // toggles the other top-level panels closed and focuses the
      // workspace. For instance, after selecting an object from the
      // manifestPanel.
      _this.eventEmitter.publish('TOGGLE_OVERLAYS_FALSE');

      if (windowConfig.slotAddress) {
        targetSlot = _this.getSlotFromAddress(windowConfig.slotAddress);
      } else {
        targetSlot = _this.focusedSlot || _this.getAvailableSlot();
      }

      windowConfig.appendTo = targetSlot.element;
      windowConfig.state = _this.state;
      windowConfig.eventEmitter = _this.eventEmitter;

      if (targetSlot.window) {
        _this.eventEmitter.publish('REMOVE_WINDOW', targetSlot.window.id);
      }

      windowConfig.slotAddress = targetSlot.layoutAddress;
      windowConfig.id = windowConfig.id || $.genUUID();

      _this.eventEmitter.publish("windowSlotAdded", {id: windowConfig.id, slotAddress: windowConfig.slotAddress});

      //extend the windowConfig with the default settings
      var mergedConfig = jQuery.extend(true, {}, _this.state.getStateProperty('windowSettings'), windowConfig);

      //"rename" some keys in the merged object to align settings parameters with window parameters
      if (mergedConfig.hasOwnProperty('loadedManifest')) {
        mergedConfig.manifest = _this.state.getStateProperty('manifests')[mergedConfig.loadedManifest];
        delete mergedConfig.loadedManifest;
      }

      if (mergedConfig.hasOwnProperty('bottomPanel')) {
        mergedConfig.bottomPanelAvailable = mergedConfig.bottomPanel;
        delete mergedConfig.bottomPanel;
      }

      if (mergedConfig.hasOwnProperty('sidePanel')) {
        mergedConfig.sidePanelAvailable = mergedConfig.sidePanel;
        delete mergedConfig.sidePanel;
      }

      if (windowConfig.state.currentConfig.hasOwnProperty('sidePanelOptions')) {
        jQuery.extend(
          mergedConfig.sidePanelOptions,
          windowConfig.state.currentConfig.sidePanelOptions
        );
      }

      if (mergedConfig.hasOwnProperty('overlay')) {
        mergedConfig.overlayAvailable = mergedConfig.overlay;
        delete mergedConfig.overlay;
      }
      newWindow = new $.Window(mergedConfig);
      _this.windows.push(newWindow);

      targetSlot.window = newWindow;

      _this.eventEmitter.publish("windowAdded", {id: windowConfig.id, slotAddress: windowConfig.slotAddress});

  },

  removeWindow: function(windowId) {
    var _this = this;

    _this.windows = _this.windows.filter(function(window) {
      return window.id !== windowId;
    });
    _this.eventEmitter.publish('windowRemoved', windowId);
  }
};
}(Mirador));
