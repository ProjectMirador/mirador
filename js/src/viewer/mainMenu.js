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
                showBookmark : this.state.getStateProperty('mainMenuSettings').buttons.bookmark,
                showLayout : this.state.getStateProperty('mainMenuSettings').buttons.layout,
                showOptions: this.state.getStateProperty('mainMenuSettings').buttons.options,
                showFullScreenViewer : this.state.getStateProperty('mainMenuSettings').buttons.fullScreenViewer,
                userButtons: this.state.getStateProperty('mainMenuSettings').userButtons,
                userLogo:    this.state.getStateProperty('mainMenuSettings').userLogo
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
            this.element.find('.fullscreen-viewer').on('click', function() {
              _this.parent.fullscreenElement() ? _this.parent.exitFullscreen() : _this.parent.enterFullscreen();
            });
        },

        template: Handlebars.compile([
        '{{#if userLogo}}',
          '<ul class="user-logo {{mainMenuCls}}">',
            '{{userlogo userLogo}}',
          '</ul>',
        '{{/if}}',
        '<ul class="{{mainMenuCls}}">',
        '{{#if showBookmark}}',
          '<li>',
            '<a href="javascript:;" class="bookmark-workspace" title="{{t "bookmark"}}">',
              '<span class="icon-bookmark-workspace"></span>{{t "bookmark"}}',
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
            '<a href="javascript:;" class="change-layout" title="{{t "changeLayout"}}">',
              '<span class="icon-window-options"></span>{{t "changeLayout"}}',
            '</a>',
          '</li>',
        '{{/if}}',
        '{{#if showFullScreenViewer}}',
          '<li>',
            '<a href="javascript:;" class="fullscreen-viewer" title="{{t "fullScreen"}}">',
              '<span class="fa fa-expand"></span> {{t "fullScreen"}}',
            '</a>',
          '</li>',
        '{{/if}}',
        '</ul>',
        '{{#if userButtons}}',
          '{{userbtns userButtons}}',
        '{{/if}}'
        ].join(''))
    };

    /* Helper methods for processing userButtons provided in configuration */

    /*    Processes userButtons configuration setting   *
     ****************************************************
     * userButtons, if present, should be an array      *
     *                                                  *
     * Its elements should be objects, which can        *
     * have the following attributes:                   *
     *                                                  *
     *   label: text label assigned to the link         *
     *          created. (required)                     *
     *   attributes: HTML attributes to add to the      *
     *          button.  If there is a "callback"       *
     *          attribute for the button, this MUST     *
     *          exist and MUST contain an "id" value    *
     *   li_attributes: HTML attributes to add to the   *
     *          list item containing the button.        *
     *   iconClass: class or space-separated list of    *
     *          classes. If present, an empty span with *
     *          these classes will be prepended to the  *
     *          content of the link element
     *   sublist: Sublist of buttons, to be implemented *
     *          as a dropdown via CSS/JS                *
     *   ul_attributes: HTML attributes to add to the   *
     *          sublist UL contained in the button.     *
     *          Ignored if button isn't representing    *
     *          a sublist.                              *
     *                                                  *
     * NOTE: sublist dropdown functionality is not yet  *
     *       implemented                                *
     ****************************************************/
    var processUserButtons = function (btns) {
        var output = [];
        var btn;
        var btns_len = btns.length;

        for (var i = 0; i < btns_len; i++){
            output.push(processUserBtn(btns[i]));
        }
        return output;
    };

    var processUserBtn = function (btn) {
        var $li = jQuery('<li>');
        var $a = jQuery('<a>');
        var $sub_ul;

        try {
            /* Enclosing <li> for button */
            if (btn.li_attributes){
                $li.attr(btn.li_attributes);
            }

            /* Link for button. */
            if (!btn.label) {
                throw "userButtons must have labels";
            }

            $a.text(btn.label);

            if (btn.iconClass) {
                $a.prepend('<span class="' + btn.iconClass + '"></span> ');
            }

            if (btn.attributes){
                $a.attr(btn.attributes);
            }

            $li.append($a);

            /* Sublist if present */
            if (btn.sublist) {
                $sub_ul = jQuery('<ul>');
                if (btn.ul_attributes){
                    $sub_ul.attr(btn.ul_attributes);
                }
                /* Recurse! */
                $sub_ul.append(processUserButtons(btn.sublist));

                $li.append($sub_ul);
            }

            return $li;
        }
        catch (err) {
            console && console.log && console.log(err);
            return jQuery();
        }
    };

    Handlebars.registerHelper('userbtns', function (userButtons) {
        return new Handlebars.SafeString(
            jQuery('<ul class="user-buttons ' + this.mainMenuCls +'"></ul>').append(processUserButtons(userButtons)).get(0).outerHTML
        );
    });

    Handlebars.registerHelper('userlogo', function (userLogo) {
        return new Handlebars.SafeString(
            processUserBtn(userLogo).get(0).outerHTML
        );
    });

}(Mirador));
