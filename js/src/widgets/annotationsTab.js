(function($) {

    $.AnnotationsTab = function(options) {
        jQuery.extend(true, this, {
            element:           null,
            appendTo:          null,
            parent:            null,
            manifest:          null
        }, options);

        this.init();
    };

    $.AnnotationsTab.prototype = {
        init: function() {
            var _this = this;
            this.windowId = this.parent.id;

            this.listenForActions();
            //this.render();
            this.bindEvents();

            this.loadTabComponents();
        },
        loadTabComponents: function() {
            var _this = this;
        },
        tabStateUpdated: function(visible) {
            if (visible) {
                this.element.show();
            } else {
                this.element.hide();
            }
        },
        toggle: function() {},
        listenForActions: function() {
            var _this = this;

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
            var _this = this;
            if (!this.element) {
                this.element = jQuery(_this.template(list)).appendTo(_this.appendTo);
            }
        },
        template: Handlebars.compile([
            '<div class="annotationsPanel">',
            '{{#each annotations}}<div>{{fullId}}</div>{{/each}}',
            '</div>',
        ].join(''))
    };

}(Mirador));
