(function($) {

  $.Workspace = function(options) {

     jQuery.extend(true, this, {
         type:             null,
         workspaceSlotCls: 'slot',
         window:          null
         
     }, $.DEFAULT_SETTINGS, options);
     
     this.element  = this.element || jQuery('<div id="workspaceContainer">');
     
     this.init();

  };

  $.Workspace.prototype = {
      init: function () {
            this.element.addClass(this.workspaceSlotCls).appendTo(this.parent.canvas);

            this.element.append(this.template({
                workspaceSlotCls: this.workspaceSlotCls
            }));
            
            //jQuery(this.element).layout({ applyDefaultStyles: true });
            
            this.window = new $.Window({appendTo: this.element});
            
            this.bindEvents();
      },
      
      bindEvents: function() {
            var _this = this;
            
            jQuery.subscribe('manifestToWorkspace', function(_, manifest, uiState) {
                //need to be able to set a specific window
                jQuery.publish('manifestToWindow', [manifest, uiState]);
            });
            
            jQuery.subscribe('toggleToImage', function(_, imageID) {
                //need to be able to set a specific window
                jQuery.publish('toggleImageView', imageID);
            });
            
            jQuery.subscribe('currentWorkspaceVisible.set', function(_, stateValue) {
                if (stateValue) { _this.show(); return; }
                _this.hide();
            });
      },
      
       hide: function() {
            var _this = this;
            
            _this.element.removeClass('visuallyactive');  
            _this.element.one('transitionend', function(e) {
                _this.element.removeClass('active');
            });
        },

        show: function() {
            var _this = this;

            _this.element.addClass('active');
            setTimeout(function() {  
                _this.element.addClass('visuallyactive active');  
            }, 20);
        },
      
      //template should be based on workspace type
      template: Handlebars.compile([
      '<div class="{{workspaceSlotCls}} ui-layout-center">',
      '</div>'
      ].join(''))
  };

}(Mirador));

