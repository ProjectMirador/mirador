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
                tocTab: false,
                annotationsTab: true
            }, true);

            this.listenForActions();
            this.render(this.state());
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
                parent: this.parent,
                appendTo: _this.element.find('.tabContentArea')
            });
        },
        state: function(state, initial) {
            if (!arguments.length) return this.tabState;
            this.tabState = state;

            if (!initial) {
                jQuery.publish('sidePanelStateUpdated' + this.windowId, this.tabState);
            }

            return this.tabState;
        },
        tabSelected: function(tabId) {
            var state = this.state();

            for (var tab in state) {
                state[tab] = false;
            }

            state[tabId] = true;
            this.state(state);
        },
        getTemplateData: function() {
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

            for (var tab in renderingData) {
                if (renderingData[tab] === true) {
                    var tabClass = '.tab.' + tab;
                    this.element.find(tabClass).addClass('selected');
                }
            }
        },
        template: Handlebars.compile([
            '<ul class="tabGroup">',
            '<li class="tab tocTab {{#if tocTab}}selected{{/if}}" data-tabId="tocTab">',
                    // '<i class="fa fa-indent fa-lg fa-fw"></i>',
            'Indices',
            '</li>',
            '<li class="tab annotationsTab {{#if annotationsTab}}selected{{/if}}" data-tabId="annotationsTab">',
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
