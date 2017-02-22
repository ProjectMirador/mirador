/*
 * All Endpoints need to have at least the following:
 * annotationsList - current list of OA Annotations
 * dfd - Deferred Object
 * init()
 * search(options, successCallback, errorCallback)
 * create(oaAnnotation, successCallback, errorCallback)
 * update(oaAnnotation, successCallback, errorCallback)
 * deleteAnnotation(annotationID, successCallback, errorCallback) (delete is a reserved word)
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
      params:    "",
      dfd:       null,
      context_id: "None",
      collection_id: "None",
      userid:    "test@mirador.org",
      username:  "mirador-test",
      annotationsList: [],        //OA list for Mirador use
      annotationsListCatch: null,  //internal list for module use
      windowID: null,
      eventEmitter: null
    }, options);

    this.init();
  };

  $.CatchEndpoint.prototype = {
    //Set up some options for catch
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
    },

    set: function(prop, value, options) {
      if (options) {
        this[options.parent][prop] = value;
      } else {
        this[prop] = value;
      }
    },

    //Search endpoint for all annotations with a given URI
    search: function(options, successCallback, errorCallback) {
      var _this = this;
      this.annotationsList = []; //clear out current list

      jQuery.ajax({
        url: this.prefix+"/search" + this.params,
        type: 'GET',
        dataType: 'json',
        headers: {
          "x-annotator-auth-token": this.token
        },
        data: {
          uri: options.uri,
          userid : options.userid ? options.userid : undefined,
          username : options.username ? options.username : undefined,
          text : options.text ? options.text : undefined,
          tag : options.tag ? options.tag : undefined,
          parentid : options.parentid ? options.parentid : undefined,
          contextId: _this.context_id,
          collectionId: _this.collection_id,
          media: options.media ? options.media : "image",
          limit: options.limit ? options.limit : -1
        },

        contentType: "application/json; charset=utf-8",
        success: function(data) {
          //check if a function has been passed in, otherwise, treat it as a normal search
          if (typeof successCallback === "function") {
            successCallback(data);
          } else {
            _this.annotationsListCatch = data.rows;
            jQuery.each(_this.annotationsListCatch, function(index, value) {
              _this.annotationsList.push(_this.getAnnotationInOA(value));
            });
            _this.dfd.resolve(true);
            _this.eventEmitter.publish('catchAnnotationsLoaded.'+_this.windowID, _this.annotationsListCatch);
          }
        },
        error: function() {
          if (typeof errorCallback === "function") {
            errorCallback();
          } else {
            console.log("There was an error searching this endpoint");
          }
        }

      });
    },

    deleteAnnotation: function(annotationID, successCallback, errorCallback) {
      var _this = this;
      jQuery.ajax({
       url: this.prefix+"/destroy/"+annotationID + this.params,
       type: 'DELETE',
       dataType: 'json',
       headers: {
         "x-annotator-auth-token": this.token
       },
       contentType: "application/json; charset=utf-8",
       success: function(data) {
        if (typeof successCallback === "function") {
          successCallback();
        }
        _this.eventEmitter.publish('catchAnnotationDeleted.'+_this.windowID, annotationID);
      },
      error: function() {
        if (typeof errorCallback === "function") {
          errorCallback();
        }
      }

    });
    },

    update: function(oaAnnotation, successCallback, errorCallback) {
      var annotations = this.getAnnotationInEndpoint(oaAnnotation),
      _this = this;

      annotations.forEach(function(annotation) {
        var annotationID = annotation.id;

        jQuery.ajax({
          url: _this.prefix+"/update/"+annotationID + _this.params,
          type: 'POST',
          dataType: 'json',
          headers: {
            "x-annotator-auth-token": _this.token
          },
          data: JSON.stringify(annotation),
          contentType: "application/json; charset=utf-8",
          success: function(data) {
            if (typeof successCallback === "function") {
              successCallback(_this.getAnnotationInOA(data));
            }
            _this.eventEmitter.publish('catchAnnotationUpdated.'+_this.windowID, annotation);
          },
          error: function() {
            if (typeof errorCallback === "function") {
              errorCallback();
            }
          }
        });
      });
    },

    //takes OA Annotation, gets Endpoint Annotation, and saves
    //if successful, MUST return the OA rendering of the annotation
    create: function(oaAnnotation, successCallback, errorCallback) {
      var _this = this,
      annotations = this.getAnnotationInEndpoint(oaAnnotation);
      annotations.forEach(function(annotation) {
        _this.createCatchAnnotation(annotation, successCallback, errorCallback);
      });
    },

    createCatchAnnotation: function(catchAnnotation, successCallback, errorCallback) {
      var _this = this;

      jQuery.ajax({
        url: this.prefix+"/create" + this.params,
        type: 'POST',
        dataType: 'json',
        headers: {
          "x-annotator-auth-token": this.token
        },
        data: JSON.stringify(catchAnnotation),
        contentType: "application/json; charset=utf-8",
        success: function(data) {
          if (typeof successCallback === "function") {
            successCallback(_this.getAnnotationInOA(data));
          }
          _this.eventEmitter.publish('catchAnnotationCreated.'+_this.windowID, data);
        },
        error: function() {
          if (typeof errorCallback === "function") {
            errorCallback();
          }
        }
      });
    },

    userAuthorize: function(action, annotation) {
      var token, tokens, _i, _len;
      //if this is an instructor, they have access to student annotations
      if (this.roles && (this.roles.indexOf('Instructor') !== -1 || this.roles.indexOf('Administrator') !== -1)){
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
        var value;
        motivation.push("oa:commenting");
        if (jQuery.isArray(annotation.rangePosition)) {
          //dual strategy
          on  = annotation.rangePosition;
        } else if (typeof annotation.rangePosition === 'object') {
          //legacy strategy
          value = "xywh="+annotation.rangePosition.x+","+annotation.rangePosition.y+","+annotation.rangePosition.width+","+annotation.rangePosition.height;
          on = { "@type" : "oa:SpecificResource",
            "full" : annotation.uri,
            "selector": {
                "@type": "oa:FragmentSelector",
                "value": value
            }
          };
        } else {
          //2.1 strategy
          value = annotation.rangePosition;
          on = { "@type" : "oa:SpecificResource",
            "full" : annotation.uri,
            "selector": {
              "@type": "oa:SvgSelector",
              "value": value
            }
          };
        }
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
      var _this = this,
      uris = [];
      oaAnnotation.on.forEach(function(value) {
        if (jQuery.inArray(value.full, uris) === -1) {
          uris.push(value.full);
        }
      });
      var annotations = [];

      uris.forEach(function(uri) {
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

        annotation.uri = uri;
        annotation.contextId = _this.context_id;
        annotation.collectionId = _this.collection_id;
        annotation.rangePosition = oaAnnotation.on;

        var coordsArray = [];
        oaAnnotation.on.forEach(function(value) {
          var xywh = value.selector.default.value.split('=')[1].split(',');
          coordsArray.push(xywh.map(function(i) {return parseInt(i);}));
        });
        var left = coordsArray.map(function(i) {return i[0];});
        var top = coordsArray.map(function(i) {return i[1];});
        var right = coordsArray.map(function(i) {return i[0] + i[2];});
        var bottom = coordsArray.map(function(i) {return i[1] + i[3];});

        var newRect = {
          "x" : Math.min.apply(null, left),
          "y" : Math.min.apply(null, top),
          "width" : Math.max.apply(null, right) - Math.min.apply(null, left),
          "height" : Math.max.apply(null, bottom) - Math.min.apply(null, top)
        };

        var canvas = _this.imagesList[$.getImageIndexById(_this.imagesList, uri)];
        var imageUrl = $.getThumbnailForCanvas(canvas, 300);
        imageUrl = imageUrl.replace('full', newRect.x+','+newRect.y+','+newRect.width+','+newRect.height);
        annotation.thumb = imageUrl;
        annotation.bounds = {"x":newRect.x, "y":newRect.y, "width":newRect.width, "height":newRect.height};

        annotation.updated = new Date().toISOString();
        if (oaAnnotation.annotatedAt) {
          annotation.created = oaAnnotation.annotatedAt;
        } else {
          annotation.created = annotation.updated;
        }
        // this needs to come from LTI annotation.user.id, annotation.user.name
        annotation.user = {};
        if (oaAnnotation.annotatedBy) {
          annotation.user.name = oaAnnotation.annotatedBy.name;
          annotation.user.id = oaAnnotation.annotatedBy['@id'];
        } else {
          annotation.user = _this.catchOptions.user;
        }
        annotation.permissions = _this.catchOptions.permissions;
        annotation.archived = false;
        annotation.ranges = [];
        annotation.parent = "0";
        annotations.push(annotation);
      });
      return annotations;
    }
  };

}(Mirador));
