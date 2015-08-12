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
        openAnnotationList: function(selected) {
            var _this = this,
                state = this.state(),
                open = !state.open;

            var listId = selected.listId;
            var prev = selected.prev;
            if (listId !== prev && prev !== null){ open = true; }

            var window = $.viewer.workspace.windows.map(function(window){
                  if(window.id == _this.windowId){ return window; }
                });

            state.annotations = window[0].annotationsList.filter(function(annotation){
              if(annotation.endpoint === listId){
                return true;
              }

              if(annotation.endpoint.name === listId){
                return true;
              }

              return false;
            });

            state.open = open;
            this.state(state);
        },
        getTemplateData: function(state) {
            return {
                annotations: state.annotations,
                postion: state.position,
                open: state.open,
                size:  state.size
            };
        },
        listenForActions: function() {
            var _this = this;

            jQuery.subscribe('editorPanelStateUpdated' + this.windowId, function(_, data) {
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
        render: function(state) {
            var _this = this;
            var templateData = _this.getTemplateData(state);

            if (!this.element) {
                this.element = jQuery(_this.template(templateData)).appendTo(_this.appendTo);
                return;
            } else {
                _this.appendTo.find(".editorPanel").empty();
                var contents = jQuery(_this.template(templateData)).children();

                this.element.html(contents);
            }
            var openValue = templateData.open === true ? 'block' : 'none';
            this.element.css({'display':openValue});
        },
        template: Handlebars.compile([
            '<div class="editorPanel {{position}}">',
            '<ul class="annotations">',
            '{{#each annotations}}',
            '<li class="annotationItem">',
                '<span>{{this.resource.chars}}{{#each this.resource}}{{chars}}{{/each}}</span>',
            '</li>',
            '{{/each}}',
            '</ul>',
            '</div>'
        ].join('')),
        toggle: function () {}
    };

}(Mirador));
