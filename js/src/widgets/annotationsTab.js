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
            jQuery.subscribe('annotationsTabStateUpdated' + _this.windowId, function(_, data) {
                _this.render(data);
            });

            jQuery.subscribe('tabStateUpdated' + _this.windowId, function(_, data) {
                _this.tabStateUpdated(data.annotationsTab);
            });


            jQuery.subscribe('annotationListLoaded.' + _this.windowId, function(_, data) {
                _this.annotationListLoaded();
            });

            jQuery.subscribe('currentCanvasIDUpdated.' + _this.windowId, function(event) {
              jQuery.subscribe('annotationListLoaded.' + _this.windowId, function(event) {
                  _this.annotationListLoaded();
              });
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
                this.element = jQuery(_this.template(list)).appendTo(_this.appendTo);
            } else {
                _this.appendTo.find(".annotationsPanel").empty();
                this.element = jQuery(_this.template(list)).appendTo(_this.appendTo);
            }

            if (state.visible) {
                this.element.show();
            } else {
                this.element.hide();
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
