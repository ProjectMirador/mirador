(function($) {

    $.SidePanel= function(options) {
        jQuery.extend(true, this, {
            element:           null,
            appendTo:          null,
            parent:            null,
            manifest:          null
        }, options);

        this.init();
    };

    $.SidePanel.prototype = {
        init: function() {
            var _this = this;
            console.log(this.appendTo);

            console.log("it's being initialized");
            this.listenForActions();
            this.render();
            this.bindEvents();

            this.loadTabComponents();

        },
        loadTabComponents: function() {
            var _this = this;
            console.log(this.element.find('.tabContentArea'));
            console.log(this.manifest);

            new $.TableOfContents({
                manifest: this.manifest,
                appendTo: this.element.closest('.tabContentArea'),
                parent: this.parent,
                panel: true,
                canvasID: this.parent.currentCanvasID,
                imagesList: this.parent.imagesList,
                thumbInfo: {thumbsHeight: 80, listingCssCls: 'panel-listing-thumbs', thumbnailCls: 'panel-thumbnail-view'}
            });

            // new $.AnnotationsTab({
            //     manifest: _this.manifest,
            //     appendTo: _this.element.find('.'+panelType)
            // });
        },
        toggle: function() {},
        listenForActions: function() {
            jQuery.subscribe('tabSelected', function() {
            });
            jQuery.subscribe('tabFocused', function() {
            });
            jQuery.subscribe('sidePanelResized', function() {
            });
        },
        bindEvents: function() {
            var _this = this;
            jQuery.subscribe('sidePanelStateUpdated' + _this.parent.id, function() {
                _this.render();
            });
        },
        render: function() {
            var _this = this;
            if (!this.element) {
                this.element = jQuery(_this.template()).appendTo(_this.appendTo);
            }
        },
        template: Handlebars.compile([
            '<ul class="tabGroup">',
                '<li class="tab tocTab selected">',
                    // '<i class="fa fa-indent fa-lg fa-fw"></i>',
            'Indices',
            '</li>',
                '<li class="tab annotationTab">',
                    // '<i class="fa fa-keyboard-o fa-lg fa-fw"></i>',
            'Annotations',
            '</li>',
            '</ul>',
            '<div class="tabContentArea">',
            '</div>'
        ].join(''))
    };

}(Mirador));
