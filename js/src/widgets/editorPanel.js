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
                selectedAnno: null,
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
        refreshAnnotationList: function(listId){
          var _this = this,
              state = this.state();

          var window = $.viewer.workspace.windows.map(function(window){
                if(window.id == _this.windowId){ return window; }
              });

          if(listId === null){
            state.annotations = window[0].annotationsList;
          }else{
            state.annotations = window[0].annotationsList.filter(function(annotation){
              if(annotation.endpoint === listId){
                return true;
              }

              if(annotation.endpoint.name === listId){
                return true;
              }

              return false;
            });
          }

          this.state(state);
        },
        deselectAnno: function(annoId) {
            var _this = this;
            var state = this.state();
            state.selectedAnno = null;
            this.state(state);
        },
        selectAnno: function(annoId) {
            var _this = this;
            var state = this.state();
            state.selectedAnno = annoId;
            this.state(state);
        },
        openAnnotationList: function() {
            var _this = this,
                state = this.state(),
                open = true;

            state.open = open;
            this.state(state);
        },
        closeAnnotationList: function() {
            var _this = this,
                state = this.state(),
                open = false;

            state.open = open;
            this.state(state);
        },
        getTemplateData: function(state) {
            return {
                annotations: state.annotations,
                selected: state.selectedAnno,
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

            jQuery.subscribe('annotationsTabStateUpdated.' + _this.windowId, function(event, annotationsTabState) {
              _this.refreshAnnotationList(annotationsTabState.selectedList);
              if(annotationsTabState.selectedList === null){
                _this.closeAnnotationList();
              }else{
                _this.openAnnotationList();
              }

            });

            jQuery.subscribe('editorPanelResized', function() {
            });

            jQuery.subscribe('editorPanelToggled' + this.windowId, function() {
                _this.panelToggled();
            });

            jQuery.subscribe('annoSelected.' + _this.windowId, function(event, annoId) {
                _this.selectAnno(annoId);
            });

            jQuery.subscribe('annoDeselected.' + _this.windowId, function(event, annoId) {
                _this.deselectAnno(annoId);
            });

        },
        bindEvents: function() {
            var _this = this,
                annoItems = _this.element.find('.annotationItem');
            state = this.state();

            annoItems.on('click', function(event) {
              var annoClicked = jQuery(this).data('id');
              if(_this.state().selectedAnno === annoClicked){
                  jQuery.publish('annoDeselected.' + _this.windowId, annoClicked);
              }else{
                  jQuery.publish('annoSelected.' + _this.windowId, annoClicked);
              }
            });

        },
        render: function(state) {
            var _this = this;
            var templateData = _this.getTemplateData(state);

            // Handlebars does not like the @ symbol in template variables so massaging here...
            var arrayLength = templateData.annotations.length;
            for (var i = 0; i < arrayLength; i++) {
              for (var property in templateData.annotations[i]) {
                  if (templateData.annotations[i].hasOwnProperty(property)) {
                      var messaged = property.replace('@', '');
                      if (typeof templateData.annotations[i][property] !== "undefined") {
                        templateData.annotations[i][messaged] = templateData.annotations[i][property];
                        templateData.annotations[i].selected = templateData.annotations[i].id === templateData.selected ? true : false;
                      }
                  }
              }
            }

            if (!this.element) {
                this.element = jQuery(_this.template(templateData)).appendTo(_this.appendTo);
                return;
            } else {
                _this.appendTo.find(".editorPanel").empty();
                var contents = jQuery(_this.template(templateData)).children();

                this.element.html(contents);
            }
            var openValue = templateData.open === true ? 'block' : 'none';
            _this.bindEvents();
            this.element.css({'display':openValue});
        },
        template: Handlebars.compile([
            '<div class="editorPanel {{position}}">',
            '<ul class="annotations">',
            '{{#each annotations}}',
            '<li class="annotationItem {{#if this.selected}}selected{{/if}}" data-id="{{this.id}}">',
                '<span>{{{this.resource.chars}}}</span>',
            '</li>',
            '{{/each}}',
            '</ul>',
            '<div class="editorTools">',
            '<span><i class="fa fa-icon-pencil"></i> full page</span>',
            '</div>',
            '</div>'
        ].join('')),
        toggle: function () {}
    };

}(Mirador));
