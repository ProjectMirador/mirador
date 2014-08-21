(function($) {

  $.Workspace = function(options) {

    jQuery.extend(true, this, {
      type:             null,
      workspaceSlotCls: 'slot',
      focusedSlot:      null,
      slots:            null,
      appendTo:         null,
      parent:           null

    }, options);

    this.element  = this.element || jQuery('<div class="workspace-container">');
    this.init();

  };

  $.Workspace.prototype = {
    init: function () {
      this.element.appendTo(this.appendTo);

      if (this.focusedSlot === null) {
        // set the focused slot to the first in the list
        this.focusedSlot = 0;
      }
      
      if (!this.slots) { 
        this.slots = [];
        this.slots.push(new $.Slot({
          slotId: 0,
          focused: true,
          parent: this,
          appendTo: this.element
        }));
        this.element.append(this.template({ slots: $.DEFAULT_SETTINGS.workspaces[this.type].slots }));
        } else {
        this.element.append(this.template(this.slots));
      }

      this.bindEvents();
    },
    template: function(tplData) {

      var template = Handlebars.compile([
        '{{#each slots}}'
        '{{/each slots}}'
      ].join(''));

      var previousTemplate;

      Handlebars.registerHelper('insertParentSlot', function(children, options) {
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

    bindEvents: function() {
      var _this = this;
    },

    addSlot: function() {

    },
    removeSlot: function() {

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

