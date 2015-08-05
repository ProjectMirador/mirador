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
        annotationListLoaded: function() {
            var motivations = [], 
            _this = this; 
              
              for(i = 0; i < _this.parent.annotationsList.length; i++)
              {
                for(x = 0; x < _this.parent.annotationsList[i].motivation.length; x++)
                {
                    motivation = _this.parent.annotationsList[i].motivation[x];
                    motivation = motivation.split(":")[1];
                    motivation = motivation.charAt(0).toUpperCase() + motivation.substr(1);
                    motivations.push(motivation);
                }
              }

              jQuery.unique(motivations);

              var list = { motivations: motivations };
              _this.render(list);
        },
        toggle: function() {},
        listenForActions: function() {
            var _this = this;

            jQuery.subscribe('tabStateUpdated' + _this.windowId, function(_, data) {
                _this.tabStateUpdated(data.annotationsTab);
            });

            jQuery.subscribe('annotationListLoaded.' + _this.windowId, function(_, data) {
                _this.annotationListLoaded(); 
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
            '<ul class="motivations">', 
            '{{#each motivations}}<li><a href="#" class="motivation">{{this}}</li>{{/each}}',
            '</ul>',
            '</div>',
        ].join(''))
    };

}(Mirador));
