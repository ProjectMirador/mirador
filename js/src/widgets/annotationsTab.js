(function($) {

    $.AnnotationsTab = function(options) {
        jQuery.extend(true, this, {
            element:           null,
            appendTo:          null,
            manifest:          null
        }, options);

        this.init();
    };

    $.AnnotationsTab.prototype = {
        init: function() {
            var _this = this;

            this.listenForActions();
            this.render();
            this.bindEvents();

            this.loadTabComponents();

        },
        loadTabComponents: function() {
            var _this = this;
        },
        toggle: function() {},
        listenForActions: function() {
            jQuery.subscribe('tabSelected', function() {
            });
        },
        bindEvents: function() {
            var _this = this;
            jQuery.subscribe('sidePanelStateUpdated', function() {
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
            '<div>hello Annotations!</div>'
        ].join(''))
    };

}(Mirador));
