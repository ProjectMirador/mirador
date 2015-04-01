(function($) {

  $.AnnotationTooltip = function(options) {

    jQuery.extend(this, {
      element:   null,
      parent:    null,
      annotations: []
    }, options);

    this.init();
  };

  $.AnnotationTooltip.prototype = {

    init: function() {
      this.bindEvents();
    },

    bindEvents: function() {
      var _this = this;
    },
    
    getEditor: function(annotation) {
      var annoText,
      tags = [],
      _this = this;

        if (jQuery.isArray(annotation.resource)) {
          jQuery.each(annotation.resource, function(index, value) {
            if (value['@type'] === "oa:Tag") {
              tags.push(value.chars);
            } else {
              annoText = value.chars;
            }
          });
        } else {
          annoText = annotation.resource.chars;
        }

      return this.editorTemplate({content : annoText,
      tags : tags.join(" "),
      id : annotation['@id']});
    },

    getViewer: function(annotations) {
      var annoText,
      tags = [],
      _this = this,
      htmlAnnotations = [],
      id;

      jQuery.each(annotations, function(index, annotation) {
        tags = [];
        if (jQuery.isArray(annotation.resource)) {
          jQuery.each(annotation.resource, function(index, value) {
            if (value['@type'] === "oa:Tag") {
              tags.push(value.chars);
            } else {
              annoText = value.chars;
            }
          });
        } else {
          annoText = annotation.resource.chars;
        }
        htmlAnnotations.push({
          annoText : annoText,
          tags : tags,
          id : annotation['@id'],
          //this needs to be fleshed out more based on permissions from the endpoint,
          //for now, just disable edit/delete for manifest annotations
          showEdit : annotation.endpoint === 'manifest' ? false : true,
          showDelete : annotation.endpoint === 'manifest' ? false : true
        });
      });

      var template = this.viewerTemplate({annotations : htmlAnnotations});      
      return template;
      //return combination of all of them
    },

    //when this is being used to edit an existing annotation, insert them into the inputs
    editorTemplate: Handlebars.compile([
                                       '<form class="annotation-editor annotation-tooltip" {{#if id}}data-anno-id="{{id}}"{{/if}}>',
                                       '<textarea class="text-editor" placeholder="Comments…">{{#if content}}{{content}}{{/if}}</textarea>',
                                       '<input class="tags-editor" placeholder="Add tags here…" {{#if tags}}value="{{tags}}"{{/if}}>',
                                       '<div>',
                                       // need to add a delete, if permissions allow
                                       '<div class="button-container">',
                                       '<a href="#cancel" class="cancel"><i class="fa fa-times-circle-o fa-fw"></i>Cancel</a>',
                                       '<a href="#save" class="save"><i class="fa fa-database fa-fw"></i>Save</a>',
                                       '</div>',
                                       '</div>',
                                       '</form>'
    ].join('')),

    viewerTemplate: Handlebars.compile([
                                       '<div class="all-annotations">',
                                       '{{#each annotations}}',
                                       '<div class="annotation-display annotation-tooltip" data-anno-id="{{id}}">',
                                       '<div class="button-container">',
                                         '{{#if showEdit}}<a href="#edit" class="edit"><i class="fa fa-pencil-square-o fa-fw"></i>Edit</a>{{/if}}',
                                         '{{#if showDelete}}<a href="#delete" class="delete"><i class="fa fa-trash-o fa-fw"></i>Delete</a>{{/if}}',
                                       '</div>',
                                       '<div class="text-viewer">',
                                       '<p>{{{annoText}}}</p>',
                                       '</div>',
                                       '<div class="tags-viewer">',
                                       '{{#each tags}}',
                                       '<span class="tag">{{this}}</span>',
                                       '{{/each}}',
                                       '</div>',
                                       '</div>',
                                       '{{/each}}',
                                       '</div>'                      
    ].join(''))
  };

}(Mirador));
