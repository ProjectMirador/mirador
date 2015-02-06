/*
 * All Endpoints need to have at least the following:
 * annotationsList - current list of OA Annotations
 * dfd - Deferred Object
 * init()
 * search(uri)
 * save(oaAnnotation)
 * TODO:
 * create()
 * read()
 * update()
 * delete()
 *
 * Optional, if endpoint is not OA compliant:
 * getAnnotationInOA(endpointAnnotation)
 * getAnnotationInEndpoint(oaAnnotation)
 */
(function($){

    $.CatchEndpoint = function(options) {

        jQuery.extend(this, {
          token:     null,
          prefix:    null,
          urls:      null,
          uri:       null,
          dfd:       null,
          annotationsList: [],        //OA list for Mirador use
          annotationsListCatch: null  //internal list for module use
        }, options);

        this.init();
    };

    $.CatchEndpoint.prototype = {
        //Any set up for this endpoint, and triggers a search of the URI passed to object
        init: function() {
          var userid = "test@mirador.org";
          var username = "mirador";
          this.annotatorOptions = {
            optionsAnnotator: {
              permissions:{
                user: {
                    id: userid, 
                    name: username
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
                        'update': [userid],
                        'delete': [userid],
                        'admin':  [userid]
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

                urls: {
                    // These are the default URLs.
                    create:  '/create',
                    read:    '/read/:id',
                    update:  '/update/:id',
                    destroy: '/delete/:id',
                    search:  '/search'
                },

                loadFromSearch:{
                    //limit:10,
                    //offset:0,
                    media:"image",
                    uri:this.uri
                    //parentid:58616
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
          this.search(this.uri);        
        },
        
        //Search endpoint for all annotations with a given URI
        search: function(uri) {
           var _this = this;
           this.annotationsList = []; //clear out current list
           jQuery.ajax({
             url: this.prefix+"/search",
             type: 'GET',
             dataType: 'json',
             headers: {
               "x-annotator-auth-token": this.token
             },
             data: {
               uri: uri,
               media: "image",
               limit: 10000
             },
             contentType: "application/json; charset=utf-8",
             success: function(data) {
               _this.annotationsListCatch = data.rows;
               jQuery.each(_this.annotationsListCatch, function(index, value) {
                 _this.annotationsList.push(_this.getAnnotationInOA(value));
               });
               _this.dfd.resolve(true);
             },
             error: function() {
               console.log("error searching");
             }
             
           });
        },
        
        //takes OA Annotation, gets Endpoint Annotation, and saves
        save: function(oaAnnotation) {
          var annotation = this.getAnnotationInEndpoint(oaAnnotation),
          _this = this,
          newId;
          jQuery.ajax({
             url: this.prefix+"/create",
             type: 'POST',
             dataType: 'json',
             headers: {
               "x-annotator-auth-token": this.token
             },
             data: JSON.stringify(annotation),
             contentType: "application/json; charset=utf-8",
             success: function(data) {
               newId = data.id;
             },
             error: function() {
               console.log("error saving");
             }
             
           });
          return newId;
        },
        
        set: function(prop, value, options) {
          if (options) {
            this[options.parent][prop] = value;
          } else {
            this[prop] = value;
          }
        },
        
        //Convert Endpoint annotation to OA
        getAnnotationInOA: function(annotation) {
          var id, 
          motivation = [],
          resource = [],
          on,
          annotatedBy,
          bounds,
          selector,
          scope;
          //convert annotation to OA format
      
         id = annotation.id;  //need to make URI
         
         if (annotation.tags.length > 0) {
           motivation.push("oa:tagging");
           jQuery.each(annotation.tags, function(index, value) {
             resource.push({      
               "@type":"oa:Tag",
               "chars":value
               });
           });
         }
         if (annotation.parent && annotation.parent !== "0") {
           motivation.push("oa:replying");
           on = annotation.parent;  //need to make URI
         } else {
           motivation.push("oa:commenting");
           on = { "@type" : "oa:SpecificResource",
                  "source" : annotation.uri,
                  "selector" : {
                    "@type" : "oa:FragmentSelector",
                    "value" : "xywh="+annotation.rangePosition.x+","+annotation.rangePosition.y+","+annotation.rangePosition.width+","+annotation.rangePosition.height
                  },
                  "scope": {
                    "@context" : "http://www.harvard.edu/catch/oa.json",
                    "@type" : "catch:Viewport",
                    "value" : "xywh="+annotation.bounds.x+","+annotation.bounds.y+","+annotation.bounds.width+","+annotation.bounds.height
                  }
                };
         }
         resource.push( {
            "@type" : "dctypes:Text",
            "format" : "text/html",
            "chars" : annotation.text
         });
         
         annotatedBy = { "@id" : annotation.user.id,
                         "name" : annotation.user.name};
         
          var oaAnnotation = {
            "@context" : "http://iiif.io/api/presentation/2/context.json",
            "@id" : String(id),
            "@type" : "oa:Annotation",
            "motivation" : motivation,
            "resource" : resource,
            "on" : on,
            "annotatedBy" : annotatedBy,
            "annotatedAt" : annotation.created,
            "serializedAt" : annotation.updated
          };
          return oaAnnotation;
        },
        
        // Converts OA Annotation to endpoint format
        getAnnotationInEndpoint: function(oaAnnotation) {
          var annotation = {},
              tags = [],
              text,
              rangePostion,
              bounds,
              media;
              
            annotation.media = "image";
            jQuery.each(oaAnnotation.resource, function(index, value) {
              if (value['@type'] === 'oa:Tag') {
                tags.push(value.chars); 
              } else if (value['@type'] === 'dctypes:Text') {
                text = value.chars;
              }
            });
            annotation.tags = tags;
            annotation.text = text;
            
            annotation.uri = oaAnnotation.on.source;
            var region = oaAnnotation.on.selector.value;
            var regionArray = region.split('=')[1].split(',');
            rangePosition = {"x":regionArray[0], "y":regionArray[1], "width":regionArray[2], "height":regionArray[3]};
            annotation.rangePosition = rangePosition;
            
            region = oaAnnotation.on.scope.value;
            regionArray = region.split('=')[1].split(',');
            bounds = {"x":regionArray[0], "y":regionArray[1], "width":regionArray[2], "height":regionArray[3]};
            annotation.bounds = bounds;
            
            annotation.updated = new Date().toISOString(); // - updated
            if (typeof annotation.created == 'undefined') { annotation.created = annotation.updated; }// - created
            // this needs to come from LTI annotation.user.id, annotation.user.name
            annotation.user = this.annotatorOptions.optionsAnnotator.permissions.user;
            annotation.permissions = this.annotatorOptions.optionsAnnotator.permissions.permissions;
            annotation.archived = false;
            annotation.ranges = [];
            annotation.parent = "0";
            return annotation;
        }
    };

}(Mirador));
