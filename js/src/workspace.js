(function($) {

  $.Workspace = function(options) {

     jQuery.extend(true, this, {
         type:             null,
         workspaceSlotCls: 'slot',
         objects:          []
         
     }, $.DEFAULT_SETTINGS, options);
     
     this.element  = this.element || jQuery('<div id="workspaceContainer">');
     
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
            
            this.bindEvents();
      },
      
      bindEvents: function() {
            var _this = this;
            
            jQuery.subscribe('manifestToWorkspace', function(_, manifest) {
                _this.objects = [manifest];
            });
            
            jQuery.subscribe('currentWorkspaceVisible.set', function(_, stateValue) {
                if (stateValue) { _this.show(); return; }
                _this.hide();
            });
      },
      
      hide: function() {
            var _this = this;
            _this.element.removeClass('active');
      },

      show: function() {
            var _this = this;
            _this.element.addClass('active');
      },
      
      //template should be based on workspace type
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

