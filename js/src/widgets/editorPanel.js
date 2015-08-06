(function($) {

    $.EditorPanel= function(options) {
        jQuery.extend(true, this, {
            element:           null,
            appendTo:          null,
            windowId:          null
        }, options);

        this.init();
    };

    $.EditorPanel.prototype = {
        init: function() {
            var _this = this;

            this.state({
                position: 'bottom',
                title: 'untitled',
                annotations: [],
                showThumbnails: true,
                allowEditing: true,
                locked: true,
                size: 280,
                open: false
            }, true);

            this.listenForActions();
            this.render(this.state());
            this.bindEvents();

        },
        loadEditorPanelComponents: function() {
            var _this = this;

        },
        state: function(state, initial) {
            if (!arguments.length) return this.panelState;
            this.panelState = state;

            if (!initial) {
                jQuery.publish('editorPanelStateUpdated' + this.windowId, this.panelState);
            }

            return this.panelState;
        },
        openAnnotationList: function() {
            var state = this.state(),
                open = !state.open;

            state.open = open;
            this.state(state);
        },
        getTemplateData: function() {
            return {
                postion: this.state().position,
                size:  this.state().size
            };
        },
        listenForActions: function() {
            var _this = this;

            jQuery.subscribe('editorPanelStateUpdated' + this.windowId, function(_, data) {
                console.log('editorPanelToggled now');
                console.log(data);
                _this.render(data);
            });

            jQuery.subscribe('editorPanelResized', function() {
            });

            jQuery.subscribe('editorPanelToggled' + this.windowId, function() {
                _this.panelToggled();
            });

            jQuery.subscribe('openAnnotationList.' + this.windowId, function(event, data) {
                _this.openAnnotationList(data);
            });
        },
        bindEvents: function() {
            var _this = this;
        },
        render: function(renderingData) {
            var _this = this;

            if (!this.element) {
                this.element = jQuery(_this.template(renderingData)).appendTo(_this.appendTo);
                return;
            }

            var openValue = renderingData.open === true ? 'block' : 'none';
            this.element.css({'display':openValue});
        },
        template: Handlebars.compile([
            '<div class="editorPanel {{position}}">',
            '</div>'
        ].join('')),
        toggle: function () {}
    };

}(Mirador));
