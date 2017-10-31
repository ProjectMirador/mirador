(function($) {

    $.AnnotationsTab = function(options) {
        jQuery.extend(true, this, {
            element:           null,
            appendTo:          null,
            manifest:          null,
            visible:           null,
            state:             null,
            eventEmitter:      null
        }, options);

        this.init();
    };

    $.AnnotationsTab.prototype = {
        init: function() {
            var _this = this;
            this.windowId = this.windowId;

            this.localState({
                id: 'annotationsTab',
                visible: this.visible,
                annotationLists: [],
                selectedList: null,
                empty: true,
                focusedList: null
            }, true);

            this.listenForActions();
            this.render(this.localState());
            this.loadTabComponents();
            this.bindEvents();
        },
        localState: function(state, initial) {
            var _this = this;
            if (!arguments.length) return this.annoTabState;
            this.annoTabState = state;

            if (!initial) {
                _this.eventEmitter.publish('annotationsTabStateUpdated.' + this.windowId, this.annoTabState);
            }

            return this.annoTabState;
        },
        loadTabComponents: function() {
            var _this = this;

        },
        tabStateUpdated: function(visible) {
            localState = this.localState();
            localState.visible = visible;
            this.localState(localState);
            visible ? this.element.show() : this.element.hide();
        },
        annotationListLoaded: function() {
            var _this = this,
            annotationSources = [],
            localState = this.localState();
            jQuery.each(_this.state.getWindowAnnotationsList(_this.windowId), function(index, value) {
              //loads annoations from external annotationLists
              if(value.endpoint && typeof value.endpoint === 'string') {
                  annotationSources.push(value.resource);
              }
              else if (value.resource){
                //loads annoations from external annotationLists
                if(value.resource.endpoint && typeof value.resource.endpoint === 'string') {
                  annotationSources.push(value.resource);
                }
                //loads annoations from local annotation endpoint
                else {
                  annotationSources.push(value.resource[0]);
                }
              }
            });
            // make unique
            annotationSources = annotationSources.filter(function(itm,i,annotationSources){
                return i==annotationSources.indexOf(itm);
            });

            localState.annotationLists = annotationSources.map(function(annotationSource) {
                //var s = (annotationSource === localState.selectedList ? true : false);
                return {
                    annotationSource: annotationSource,
                    layer: null,
                    selected: (annotationSource === localState.selectedList ? true : false),
                    focused: false
                };
            });

            if(localState.annotationLists.length){
              localState.empty = false;
            }
            this.localState(localState);
        },
        deselectList: function(listId) {
            var _this = this;
            var localState = this.localState();
            localState.selectedList = null;
            localState.annotationLists.forEach(function(list){ list.selected = false; });
            this.localState(localState);
        },
        selectList: function(listId) {
            var _this = this;
            var localState = this.localState();
            localState.selectedList = listId;
            localState.annotationLists.forEach(function(list){ list.selected = list.annotationSource === listId ? true : false; });
            this.localState(localState);
        },
        focusList: function(listId) {
            var localState = this.localState();
            localState.focusedList = listId;
            localState.annotationLists.forEach(function(list){ list.focused = list.annotationSource === listId ? true : false;});
            this.localState(localState);
        },
        toggle: function() {},
        listenForActions: function() {
            var _this = this;

            _this.eventEmitter.subscribe('annotationsTabStateUpdated.' + _this.windowId, function(_, data) {
                _this.render(data);
            });

            _this.eventEmitter.subscribe('tabStateUpdated.' + _this.windowId, function(_, data) {
                _this.tabStateUpdated(data.tabs[data.selectedTabIndex].options.id == 'annotationsTab');
            });


            _this.eventEmitter.subscribe('annotationListLoaded.' + _this.windowId, function(_, data) {
                _this.annotationListLoaded();
            });

            _this.eventEmitter.subscribe('currentCanvasIDUpdated.' + _this.windowId, function(event) {

            _this.eventEmitter.subscribe('annotationListLoaded.' + _this.windowId, function(event) {
                _this.annotationListLoaded();
            });

              _this.selectList(_this.localState().selectedList);

            });

            _this.eventEmitter.subscribe('listSelected.' + _this.windowId, function(event, listId) {
                _this.selectList(listId);
            });

            _this.eventEmitter.subscribe('listDeselected.' + _this.windowId, function(event, listId) {
                _this.deselectList(listId);
            });

        },
        bindEvents: function() {
            var _this = this,
                listItems = this.element.find('.annotationListItem');

            // listItems.on('click', function(event) {
            //     //event.stopImmediatePropagation();
            //     var listClicked = jQuery(this).data('id');
            //     if(_this.localState().selectedList === listClicked){
            //         //_this.deselectList(listClicked);
            //         _this.eventEmitter.publish('listDeselected.' + _this.windowId, listClicked);
            //     }else{
            //         //_this.selectList(listClicked);
            //         _this.eventEmitter.publish('listSelected.' + _this.windowId, listClicked);
            //     }
            //
            // });

        },
        render: function(state) {
            var _this = this,
                templateData = {
                    annotationSources: state.annotationLists
                };
            if (!this.element) {
                this.element = jQuery(_this.template(templateData)).appendTo(_this.appendTo);
            } else {
                jQuery(_this.appendTo).find(".annotationsPanel").remove();
                this.element = jQuery(_this.template(templateData)).appendTo(_this.appendTo);
            }
            _this.bindEvents();


            if (state.visible) {
                this.element.show();
            } else {
                this.element.hide();
            }
        },
        template: $.Handlebars.compile([
            '<div class="annotationsPanel">',
            '<ul class="annotationSources">',
            '{{#each annotationSources}}',
            //'<li class="annotationListItem {{#if this.selected}}selected{{/if}} {{#if this.focused }}focused{{/if}}" data-id="{{this.annotationSource.chars}}">',
            '<li class="annotationListItem" {{#if this.selected}}selected{{/if}} {{#if this.focused }}focused{{/if}}">',
            '<span style="font-weight: bold">{{{this.annotationSource.label}}}</span>',
            '<br/>',
            '<span>{{{this.annotationSource.chars}}}</span>',
            //'<span>{{this.annotationSource}}</span>',
            '</li>',
            '{{/each}}',
            '</ul>',
            '</div>',
        ].join(''))
    };

}(Mirador));
