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
        toggle: function() {},
        listenForActions: function() {
            var _this = this;

            jQuery.subscribe('tabSelected', function() {
            });

            jQuery.subscribe('annotationListLoaded.' + _this.windowId, function(event) {
              console.log(_this.parent.annotationsList);
              var list = { annotations: _this.parent.annotationsList };
              _this.render(list);
            });
        },
        bindEvents: function() {
            var _this = this;
            jQuery.subscribe('sidePanelStateUpdated', function() {
                //_this.render();
            });
        },
        render: function(list) {
            var _this = this;
            if (!this.element) {
                this.element = jQuery(_this.template(list)).appendTo(_this.appendTo);
            }
        },
        template: Handlebars.compile([
            '{{#each annotations}}<div>{{fullId}}</div>{{/each}}'
        ].join(''))
    };

}(Mirador));
