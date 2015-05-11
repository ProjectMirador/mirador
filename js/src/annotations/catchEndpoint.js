/*
 * All Endpoints need to have at least the following:
 * annotationsList - current list of OA Annotations
 * dfd - Deferred Object
 * init()
 * search(uri)
 * create(oaAnnotation, returnSuccess, returnError)
 * update(oaAnnotation, returnSuccess, returnError)
 * deleteAnnotation(annotationID, returnSuccess, returnError) (delete is a reserved word)
 * TODO:
 * read() //not currently used
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
      userid:    "test@mirador.org",
      username:  "mirador-test",
      annotationsList: [],        //OA list for Mirador use
      annotationsListCatch: null  //internal list for module use
    }, options);

    this.init();
  };

  $.CatchEndpoint.prototype = {
    //Any set up for this endpoint, and triggers a search of the URI passed to object
    init: function() {
      this.catchOptions = {
        user: {
          id: this.userid, 
          name: this.username
        },
        permissions: {
          'read':   [],
          'update': [this.userid],
          'delete': [this.userid],
          'admin':  [this.userid]
        }
      };
      this.search(this.uri);        
    },

    // this is temporary because CATCH doesn't have indexes on new fields
    // for now, concatenate bits that we need into a single URI
    buildURI: function(uri) {
      var catchURI = uri;
      if (this.context_id && this.context_id !== "") {
        catchURI = catchURI + ":" + this.context_id;
        if (this.collection_id && this.collection_id !== "") {
          catchURI = catchURI + ":" + this.collection_id;
        }
      }
      return catchURI;
    },

    //Search endpoint for all annotations with a given URI
    search: function(uri) {
      var _this = this;
      this.annotationsList = [], //clear out current list
      updatedUri = this.buildURI(uri);
      
      jQuery.ajax({
        url: this.prefix+"/search",
        type: 'GET',
        dataType: 'json',
        headers: {
          "x-annotator-auth-token": this.token
        },
        data: {
          uri: updatedUri,
          media: "image",
          limit: 10000
          //pass in context, collection, group, if exists
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
    
    deleteAnnotation: function(annotationID, returnSuccess, returnError) {          
          jQuery.ajax({
             url: this.prefix+"/destroy/"+annotationID,
             type: 'DELETE',
             dataType: 'json',
             headers: {
               "x-annotator-auth-token": this.token
             },
             contentType: "application/json; charset=utf-8",
             success: function(data) {
               returnSuccess();
             },
             error: function() {
               returnError();
             }
             
           });
    },
    
    update: function(oaAnnotation, returnSuccess, returnError) {
      var annotation = this.getAnnotationInEndpoint(oaAnnotation),
      _this = this,
      annotationID = annotation.id;
      
      jQuery.ajax({
        url: this.prefix+"/update/"+annotationID,
        type: 'POST',
        dataType: 'json',
        headers: {
          "x-annotator-auth-token": this.token
        },
        data: JSON.stringify(annotation),
        contentType: "application/json; charset=utf-8",
        success: function(data) {
          returnSuccess();
        },
        error: function() {
          returnError();
        }
      });
    },

    //takes OA Annotation, gets Endpoint Annotation, and saves
    //if successful, MUST return the OA rendering of the annotation
    create: function(oaAnnotation, returnSuccess, returnError) {
      var annotation = this.getAnnotationInEndpoint(oaAnnotation),
      _this = this;
      
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
          returnSuccess(_this.getAnnotationInOA(data));
        },
        error: function() {
          returnError();
        }
      });
    },

    set: function(prop, value, options) {
      if (options) {
        this[options.parent][prop] = value;
      } else {
        this[prop] = value;
      }
    },

    userAuthorize: function(action, annotation) {
      var token, tokens, _i, _len;
      //if this is an instructor, they have access to student annotations      
      if (this.roles && this.roles.indexOf('Instructor') !== -1){
          return true;
      }
      //otherwise check annotation permissions
      if (annotation.permissions) {
        var permissionUserIds = annotation.permissions[action] || [];
        //if no userids set for a permission, it is open to everyone
        if (permissionUserIds.length === 0) {
          return true;
        }
        //otherwise compare userid of annotation to current userid
        if (permissionUserIds.indexOf(this.userid) !== -1) {
          return true;
        }
        return false;
      } else if (annotation.user) {
        //if no permissions, just check userids
        return this.userid === annotation.user.userid;
      }
      //otherwise, just return true
      return true;
    },

    //Convert Endpoint annotation to OA
    getAnnotationInOA: function(annotation) {
      var id, 
      motivation = [],
      resource = [],
      on,
      annotatedBy;
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
          "serializedAt" : annotation.updated,
          "permissions" : annotation.permissions,
          "endpoint" : this
        };
        return oaAnnotation;
    },

    // Converts OA Annotation to endpoint format
    getAnnotationInEndpoint: function(oaAnnotation) {
      var annotation = {},
      tags = [],
      text;
      
      if (oaAnnotation["@id"]) {
        annotation.id = oaAnnotation["@id"];
      }

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

      //annotation.uri = oaAnnotation.on.source;
      annotation.uri = this.buildURI(oaAnnotation.on.source);
      //TODO: add context, collection, etc
      var region = oaAnnotation.on.selector.value;
      var regionArray = region.split('=')[1].split(',');
      annotation.rangePosition = {"x":regionArray[0], "y":regionArray[1], "width":regionArray[2], "height":regionArray[3]};

      region = oaAnnotation.on.scope.value;
      regionArray = region.split('=')[1].split(',');
      annotation.bounds = {"x":regionArray[0], "y":regionArray[1], "width":regionArray[2], "height":regionArray[3]};

      annotation.updated = new Date().toISOString();
      if (oaAnnotation.annotatedAt) { 
        annotation.created = oaAnnotation.annotatedAt; 
      } else {
        annotation.created = annotation.updated;
      }
      // this needs to come from LTI annotation.user.id, annotation.user.name
      annotation.user = this.catchOptions.user;
      annotation.permissions = this.catchOptions.permissions;
      annotation.archived = false;
      annotation.ranges = [];
      annotation.parent = "0";
      return annotation;
    }
  };

}(Mirador));
