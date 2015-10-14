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
                tocTabAvailable: true,
                annotationsTabAvailable: true,
                layersTabAvailable: false,
                toolsTabAvailable: false,
                width: 280,
                open: true
            }, true);

            this.listenForActions();
            this.render(this.state());
            this.bindEvents();

            this.loadSidePanelComponents();
        },
        loadSidePanelComponents: function() {
            var _this = this;

            new $.Tabs({
                windowId: this.parent.id,
                appendTo: this.appendTo
            });

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
            if (!arguments.length) return this.panelState;
            this.panelState = state;

            if (!initial) {
                jQuery.publish('sidePanelStateUpdated' + this.windowId, this.panelState);
            }

            return this.panelState;
        },
        panelToggled: function() {
            var state = this.state(),
                open = !state.open;

            state.open = open;
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

            jQuery.subscribe('sidePanelStateUpdated' + this.windowId, function(_, data) {
                console.log('sidePanelToggled now');
                console.log(data);
                _this.render(data);
            });

            jQuery.subscribe('sidePanelResized', function() {
            });

            jQuery.subscribe('sidePanelToggled' + this.windowId, function() {
                _this.panelToggled();
            });
        },
        bindEvents: function() {
            var _this = this;
        },
        render: function(renderingData) {
            var _this = this;

            if (!this.element) {
                this.element = this.appendTo;
                jQuery(_this.template(renderingData)).appendTo(_this.appendTo);
                return;
            }

            if (renderingData.open) {
                this.appendTo.removeClass('minimized');
            } else {
                this.appendTo.addClass('minimized');
            }
        },
        template: Handlebars.compile([
            '<div class="tabContentArea">',
            '</div>'
        ].join('')),
        toggle: function () {}
    };

}(Mirador));
