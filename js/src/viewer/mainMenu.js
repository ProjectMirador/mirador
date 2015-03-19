(function($) {

    $.MainMenu = function(options) {

        jQuery.extend(true, this, {
            parent:                     null, //viewer
            element:                    null,
            mainMenuHeight:             null,
            mainMenuWidth:              null,
            windowOptionsMenu:          null,
            loadWindow:                 null,
            clearLocalStorage:          '',
            viewerCls:                  'mirador-viewer',
            mainMenuBarCls:             'mirador-main-menu-bar',
            mainMenuCls:                'mirador-main-menu',
            windowOptionsMenuCls:       'mirador-window-options-menu',
            clearLocalStorageCls:       'clear-local-storage',
            clearLocalStorageDialogCls: 'mirador-main-menu-clear-local-storage',
            collectionsListingCls:      'mirador-listing-collections'
        }, options);

        this.element  = this.element || jQuery('<div/>');

        this.init();
    };


    $.MainMenu.prototype = {

        init: function() {
            //this.mainMenuHeight = this.parent.mainMenuSettings.height;
            //this.mainMenuWidth = this.parent.mainMenuSettings.width;
            this.element
            .addClass(this.mainMenuBarCls)
            //.height(this.mainMenuHeight)
            //.width(this.mainMenuWidth)
            .appendTo(this.appendTo);

            this.element.append(this.template({
                mainMenuCls: this.mainMenuCls,
                showBookmark : this.parent.mainMenuSettings.buttons.bookmark,
                showLayout : this.parent.mainMenuSettings.buttons.layout,
                showOptions: this.parent.mainMenuSettings.buttons.options
            }));

            this.bindEvents();
        },

        bindEvents: function() {
            var _this = this;
            //change 'change-layout' to mouseover events rather than click?
            this.element.find('.change-layout').on('click', function() { 
              _this.parent.toggleWorkspacePanel(); 
            });
            this.element.find('.bookmark-workspace').on('click', function() { _this.parent.toggleBookmarkPanel(); 
            });
            // when options are implemented, this will need to do something
            this.element.find('.window-options').on('click', function() { });
        },

        template: Handlebars.compile([
        '<ul class="{{mainMenuCls}}">',
        '{{#if showBookmark}}',
          '<li>',
            '<a href="javascript:;" class="bookmark-workspace" title="Bookmark Workspace">',
              '<span class="icon-bookmark-workspace"></span>Bookmark',
            '</a>',
          '</li>',
        '{{/if}}',
        /*'{{#if showOptions}}',
          '<li>',
            '<a href="javascript:;" class="window-options" title="Window Options">',
              '<span class="icon-window-options"></span>Options',
            '</a>',
          '</li>',
        '{{/if}}',*/
        '{{#if showLayout}}',
          '<li>',
            '<a href="javascript:;" class="change-layout" title="Change Layout">',
              '<span class="icon-window-options"></span>Change Layout',
            '</a>',
          '</li>',
        '{{/if}}',
        '</ul>'
      ].join(''))
    };
}(Mirador));
