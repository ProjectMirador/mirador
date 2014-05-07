(function($) {

  $.Workspace = function(options) {

     jQuery.extend(true, this, {
         type: null,
         workspaceSlotCls: 'slot'
         
     }, $.DEFAULT_SETTINGS, options);
     
     this.element  = this.element || jQuery('<div class="workspaceContainer">');
     
     this.init();

  };

  $.Workspace.prototype = {
      init: function () {
            this.element
            .addClass(this.workspaceSlotCls)
            .appendTo(this.parent.canvas);

            this.element.append(this.template({
                workspaceSlotCls: this.workspaceSlotCls
            }));
            jQuery(this.element).layout({ applyDefaultStyles: true });
      },
      template: Handlebars.compile([
      '<div class="{{workspaceSlotCls}} ui-layout-center">',
          '<span>',
          '<h1>Add Item to Workspace</h1>',
          '</span>',
          '<span class="icon-workspace-slot"></span>',
      '</div>'
      ].join(''))
  };

}(Mirador));

