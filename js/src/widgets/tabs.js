(function($) {

    $.Tabs = function(options) {
        jQuery.extend(true, this, {
            element:           null,
            appendTo:          null,
            windowId:          null
        }, options);

        this.init();
    };

    $.Tabs.prototype = {
        init: function() {
            var _this = this;

            this.state({
                tocTab: true,
                annotationsTab: false
            }, true);

            this.listenForActions();
            this.render(this.state());
            this.bindEvents();
        },
        state: function(state, initial) {
            if (!arguments.length) return this.tabState;
            this.tabState = state;

            if (!initial) {
                jQuery.publish('tabStateUpdated' + this.windowId, this.tabState);
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

            jQuery.subscribe('tabStateUpdated' + this.windowId, function(_, data) {
                _this.render(data);
            });

            jQuery.subscribe('tabSelected' + this.windowId, function(_, data) {
                _this.tabSelected(data);
            });

            jQuery.subscribe('tabFocused', function() {
            });
        },
        bindEvents: function() {
            var _this = this;

            this.element.find('.tab').on('click', function(event) {
                jQuery.publish('tabSelected' + _this.windowId, jQuery(this).data('tabid'));
            });
        },
        render: function(renderingData) {
            var _this = this;

            if (!this.element) {
                this.element = jQuery(_this.template(renderingData)).prependTo(_this.appendTo);
                return;
            }

            this.element.find('.tab').removeClass('selected');

            for (var tab in renderingData) {
                if (renderingData[tab] === true) {
                    var tabClass = '.' + tab;
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
        ].join('')),
        toggle: function () {}
    };

}(Mirador));
