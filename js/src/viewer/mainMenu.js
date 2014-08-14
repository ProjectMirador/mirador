(function($) {

    $.MainMenu = function(options) {

        jQuery.extend(true, this, {
            parent:                     null,
            element:                    null,
            mainMenuHeight:             $.DEFAULT_SETTINGS.mainMenu.height,
            mainMenuWidth:              $.DEFAULT_SETTINGS.mainMenu.width,
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
            this.element
            .addClass(this.mainMenuBarCls)
            .height(this.mainMenuHeight)
            .width(this.mainMenuWidth)
            .appendTo(this.appendTo);


            this.element.append(this.template({
                mainMenuCls: this.mainMenuCls
            }));

            this.bindEvents();
        },

        bindEvents: function() {
            var _this = this;
            this.element.find('.load-window').on('click', function() { _this.parent.toggleLoadWindow(); });
            this.element.find('.switch-workspace').on('click', function() { _this.parent.toggleSwitchWorkspace(); });
            this.element.find('.bookmark-workspace').on('click', function() { _this.parent.toggleBookmarkPanel(); });
        },

        template: Handlebars.compile([
        '<ul class="{{mainMenuCls}}">',
          '<li>',
            '<a href="javascript:;" class="bookmark-workspace" title="Bookmark Workspace">',
              '<span class="icon-bookmark-workspace"></span>Bookmark',
            '</a>',
          '</li>',
          '<li>',
            '<a href="javascript:;" class="load-window" title="Load Window">',
              '<span class="icon-load-window"></span>Select Object',
            '</a>',
          '</li>',
          '<li>',
            '<a href="javascript:;" class="window-options" title="Window Options">',
              '<span class="icon-window-options"></span>Options',
            '</a>',
          '</li>',
          '<li>',
            '<a href="javascript:;" class="switch-workspace" title="Switch Workspace">',
              '<span class="icon-window-options"></span>Switch Workspace',
            '</a>',
          '</li>',
        '</ul>'
      ].join(''))
    };
}(Mirador));
