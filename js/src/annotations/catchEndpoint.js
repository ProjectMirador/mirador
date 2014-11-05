(function($){

    $.CatchEndpoint = function(options) {

        jQuery.extend(this, {
          token:     null,
          prefix:    null,
          urls:      null,
          uri:       null,
          element:   null,
          annotator: null
        }, options);

        this.init();
    };

    $.CatchEndpoint.prototype = {

        init: function() {
          var annotatorOptions = {
            optionsAnnotator: {
              permissions:{
                user: {
                    id:"", 
                    name:""
                },
                userString: function (user) {
                    if (user && user.name) 
                        return user.name;
                    return user;
                },
                userId: function (user) {
                    if (user && user.id) 
                        return user.id;
                    return user;
                },
                permissions: {
                        'read':   [],
                        'update': [],
                        'delete': [],
                        'admin':  []
                },
                showViewPermissionsCheckbox: false,
                showEditPermissionsCheckbox: false,
                userAuthorize: function(action, annotation, user) {
                    var token, tokens, _i, _len;
                    if (annotation.permissions) {
                      tokens = annotation.permissions[action] || [];
                      if (is_staff){
                          return true;
                      }
                      if (tokens.length === 0) {
                        return true;
                      }
                      for (_i = 0, _len = tokens.length; _i < _len; _i++) {
                        token = tokens[_i];
                        
                        if (this.userId(user) === token) {

                          return true;
                        }
                      }

                      return false;
                    } else if (annotation.user) {
                      if (user) {
                        return this.userId(user) === this.userId(annotation.user);
                      } else {
                        return false;
                      }
                    }
                    return true;
                  }
            },
              auth: {
                token: this.token
            },
              store: {
                // The endpoint of the store on your server.
                prefix: this.prefix,

                annotationData: {
                    uri: this.uri
                },

                urls: {
                    // These are the default URLs.
                    create:  '/create',
                    read:    '/read/:id',
                    update:  '/update/:id',
                    destroy: '/delete/:id',
                    search:  '/search'
                },

                loadFromSearch:{
                    limit:10,
                    offset:0,
                    //uri:this.uri,
                    media:'image'
                    //userid:''
                }
            },
              highlightTags:{
                tag: ""
            }
              /*richText: {
                tinymce:{
                    selector: "li.annotator-item textarea",
                    plugins: "image link codemirror media",
                    menubar: false,
                    toolbar_items_size: 'small',
                    extended_valid_elements : "iframe[src|frameborder|style|scrolling|class|width|height|name|align|id]",
                    toolbar: "insertfile undo redo | styleselect | bold italic | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | link image media | code ",
                    resize: "both",
                }
              }*/
            }
          };
          this.annotator = this.element.annotator().data('annotator');
          this.annotator.addPlugin('Auth', annotatorOptions.optionsAnnotator.auth);
          //this.annotator.addPlugin("Permissions", annotatorOptions.optionsAnnotator.permissions);
          this.annotator.addPlugin('Store', annotatorOptions.optionsAnnotator.store);
          console.log(this.annotator.plugins.Store);
          
        
        },
        search: function() {
          if (!this.annotator.plugins.Store) {
             
          }
           
        },
        
        getAnnotation: function() {
        
        }
    };

}(Mirador));
