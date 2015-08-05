(function($) {

    $.AnnotationsTab = function(options) {
        jQuery.extend(true, this, {
            element:           null,
            appendTo:          null,
            parent:            null,
            manifest:          null,
            visible:           null
        }, options);

        this.init();
    };

    $.AnnotationsTab.prototype = {
        init: function() {
            var _this = this;
            this.windowId = this.parent.id;

            var state = this.state({
                visible: this.visible,
                annotationLists: []
            }, true);

            this.listenForActions();
            this.bindEvents();
            // this.tabStateUpdated(state.visible);
            this.loadTabComponents();
        },
        state: function(state, initial) {
            if (!arguments.length) return this.tabState;
            this.tabState = state;

            if (!initial) {
                jQuery.publish('annotationsTabStateUpdated' + this.windowId, this.tabState);
            }

            return this.tabState;
        },
        loadTabComponents: function() {
            var _this = this;
        },
        tabStateUpdated: function(visible) {
            var state = this.state();
            state.visible = state.visible ? false : true;

            this.state(state);
        },
        toggle: function() {},
        listenForActions: function() {
            var _this = this;
            jQuery.subscribe('annotationsTabStateUpdated' + _this.windowId, function(_, data) {
                _this.render(data);
            });

            jQuery.subscribe('tabStateUpdated' + _this.windowId, function(_, data) {
                _this.tabStateUpdated(data.annotationsTab);
            });

            jQuery.subscribe('annotationListLoaded.' + _this.windowId, function(event) {
              console.log(_this.parent.annotationsList);
              var list = { annotations: _this.parent.annotationsList };
              _this.render(list);
            });
        },
        bindEvents: function() {
            var _this = this;
        },
        render: function(list) {
            console.log(list);
            var _this = this,
                state = this.state();

            if (!this.element) {
                this.element = jQuery(_this.template(list));
                this.element.appendTo(_this.appendTo);
            }

            if (state.visible) {
                this.element.show();
            } else {
                this.element.hide();
            }
        },
        template: Handlebars.compile([
            '<div class="annotationsPanel">',
            '{{#each annotations}}<div>{{fullId}}</div>{{/each}}',
            '</div>',
        ].join(''))
    };

}(Mirador));
