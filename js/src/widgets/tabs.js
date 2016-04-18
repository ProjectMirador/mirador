(function($) {

    $.Tabs = function(options) {
        jQuery.extend(true, this, {
            element:           null,
            appendTo:          null,
            windowId:          null,
            tabState:          {},
            tabs:              []
        }, options);

        this.init();
    };

    $.Tabs.prototype = {
        init: function() {
            var _this = this;

            this.state({
                tabs : this.tabs,
                //tabs: [{id:'tocTab', label:'Indices'}, {id:'annotationsTab', label:'Annotations'}],
                //tabs: [{id:'tocTab', label:'Indices'}],
                selectedTabIndex: 0
            }, true);
            this.listenForActions();
            this.render(this.state());
            this.bindEvents();
        },
        state: function(state, initial) {
            if (!arguments.length) return this.tabState;
            jQuery.extend(true, this.tabState, state);

           if (!initial) {
                jQuery.publish('tabStateUpdated.' + this.windowId, this.tabState);
           }

            return this.tabState;
        },
        tabSelected: function(index) {
            var state = this.state();
            state.selectedTabIndex = index;
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

            jQuery.subscribe('tabStateUpdated.' + this.windowId, function(_, data) {
                _this.render(data);
            });

            jQuery.subscribe('tabSelected.' + this.windowId, function(_, data) {
                _this.tabSelected(data);
            });

            jQuery.subscribe('tabFocused.', function() {
            });
        },
        bindEvents: function() {
            var _this = this;

            this.element.find('.tab').on('click', function(event) {
                jQuery.publish('tabSelected.' + _this.windowId, jQuery( this ).index());
            });
        },
        render: function(renderingData) {
            var _this = this;

            if (!this.element) {
                var displayLabels = false;
                var tabs = jQuery.grep(renderingData.tabs, function(value, index) {
                    return value.options.available;
                });
                renderingData.tabs = tabs;
                if(renderingData.tabs.length === 1){                    
                    // TODO: temporary logic to minimize side panel if only tab is toc and toc is empty
                    if (renderingData.tabs[0].name === 'toc' && !_this.hasStructures) {
                        jQuery.publish("sidePanelVisibilityByTab." + _this.windowId, false);
                    }

                    // don't show button if only one tab
                    renderingData.tabs = []; 
                } 
                //TODO: add text if there is one label or no content within this tab
                this.element = jQuery(_this.template(renderingData)).prependTo(_this.appendTo);
                return;
            }

            this.element.find('.tab').removeClass('selected');
            var tabClass = '.' + renderingData.tabs[renderingData.selectedTabIndex].options.id;
            this.element.find(tabClass).addClass('selected');

        },
        template: Handlebars.compile([
          '<ul class="tabGroup">',
            '{{#each tabs}}',
            '<li class="tab {{this.options.id}} {{#unless @index}}selected{{/unless}}" data-tabId="{{this.options.id}}">',
                '{{this.options.label}}',
            '</li>',
            '{{/each}}',
          '</ul>',
        ].join('')),
        toggle: function () {}
    };

}(Mirador));
