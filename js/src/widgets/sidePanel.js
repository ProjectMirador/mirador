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
            this.windowId = this.parent.id;

            this.state({
                tocTab: true,
                annotationsTab: false
            });

            this.listenForActions();
            this.render();
            this.bindEvents();

            this.loadTabComponents();
        },
        loadTabComponents: function() {
            var _this = this;

            new $.TableOfContents({
                manifest: this.manifest,
                appendTo: this.element.find('.tabContentArea'),
                parent: this.parent,
                panel: true,
                canvasID: this.parent.currentCanvasID,
                imagesList: this.parent.imagesList,
                thumbInfo: {thumbsHeight: 80, listingCssCls: 'panel-listing-thumbs', thumbnailCls: 'panel-thumbnail-view'}
            });

            new $.AnnotationsTab({
                manifest: _this.manifest,
                appendTo: _this.element.find('.tabContentArea')
            });
        },
        state: function(state) {
            if (!arguments.length) return this.tabState;
            this.tabState = state;

            jQuery.publish('sidePanelStateUpdated', this.tabState);

            return this.tabState;
        },
        tabSelected: function(tabId) {
            var state = this.state();

            for (var tab in state) {
                tab = false;
            }

            state[tabId] = true; 
            this.state(state);
        },
        getTemplateData: function() {
            console.log(this);
            return {
                annotationsTab: this.state().annotationsTab,
                tocTab: this.state().tocTab
            };
        },
        listenForActions: function() {
            var _this = this;

            jQuery.subscribe('tabSelected' + this.windowId, function(_, data) {
                _this.tabSelected(data);
            });
            jQuery.subscribe('tabFocused', function() {
            });
            jQuery.subscribe('sidePanelResized', function() {
            });
        },
        bindEvents: function() {
            var _this = this;

            jQuery.subscribe('sidePanelStateUpdated' + this.windowId, function(_, data) {
                _this.render(data);
            });

            this.element.find('.tab').on('click', function(event) {
                window.ell = jQuery(this);
                jQuery.publish('tabSelected' + _this.windowId, jQuery(this).data('tabid'));
            });
        },
        render: function(renderingData) {
            var _this = this;

            if (!this.element) {
                this.element = this.appendTo;
                jQuery(_this.template(renderingData)).appendTo(_this.appendTo);
                return;
            }

            this.element.find('.tab').removeClass('selected');
            renderingData.forEach(function(tab) {
                if (tab === true) {
                    this.element.find(tab).addClass('selected');
                }
                return;
            });
        },
        template: Handlebars.compile([
            '<ul class="tabGroup">',
                '<li class="tab {{#if tocTab}}selected{{/if}}" data-tabId="tocTab">',
                    // '<i class="fa fa-indent fa-lg fa-fw"></i>',
            'Indices',
            '</li>',
            '<li class="tab {{#if annotationsTab}}selected{{/if}}" data-tabId="annotationsTab">',
                    // '<i class="fa fa-keyboard-o fa-lg fa-fw"></i>',
            'Annotations',
            '</li>',
            '</ul>',
            '<div class="tabContentArea">',
            '</div>'
        ].join('')),
        toggle: function () {}
    };

}(Mirador));
