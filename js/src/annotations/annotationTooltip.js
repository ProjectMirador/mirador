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
            if (value['@type'] === "dctypes:Text") {
              annoText = value.chars;
            } else if (value['@type'] == "oa:Tag") {
              tags.push(value.chars);
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
        if (jQuery.isArray(annotation.resource)) {
          jQuery.each(annotation.resource, function(index, value) {
            if (value['@type'] === "dctypes:Text") {
              annoText = value.chars;
            } else if (value['@type'] == "oa:Tag") {
              tags.push(value.chars);
            }
          });
        } else {
          annoText = annotation.resource.chars;
        }
        htmlAnnotations.push({
          annoText : annoText,
          tags : tags,
          id : annotation['@id']
        });
      });

      return this.viewerTemplate({annotations : htmlAnnotations});
      //return combination of all of them
    },

    //when this is being used to edit an existing annotation, insert them into the inputs
    editorTemplate: Handlebars.compile([
                                       '<form class="new-annotation-form annotation-tooltip" {{#if id}}data-anno-id="{{id}}"{{/if}}>',
                                       '<ul>',
                                       '<li>',
                                       '<textarea class="text-editor" placeholder="Comments…">{{#if content}}{{content}}{{/if}}</textarea>',
                                       '</li>',
                                       '<li>',
                                       '<input class="tags-editor" placeholder="Add some tags here…" {{#if tags}}value="{{tags}}"{{/if}}>',
                                       '</li>',
                                       '</ul>',
                                       '<div>',
                                       //need to add a delete, if permissions allow
                                       '<a href="#cancel" class="cancel">Cancel</a>',
                                       '<a href="#save" class="save">Save</a>',
                                       '</div>',
                                       '</form>'
    ].join('')),

    viewerTemplate: Handlebars.compile([
                                       '<div class="all-annotations">',
                                       '{{#each annotations}}',
                                       '<div class="annotation-display annotation-tooltip" data-anno-id="{{id}}">',
                                       '<a href="#edit" class="edit">Edit</a>',
                                       '<a href="#delete" class="delete">Delete</a>',
                                       '<a href="#save" style="display:none;" class="save">Save</a>',
                                       '<div class="text-viewer">{{annoText}}</div>',
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
