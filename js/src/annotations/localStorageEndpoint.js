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

  $.LocalStorageEndpoint = function(options) {

    jQuery.extend(this, {
      token:     null,
      prefix:    null,
      dfd:       null,
      annotationsList: [],        
      windowID: null
    }, options);

    this.init();
  };

  $.LocalStorageEndpoint.prototype = {
    //Set up some options for catch
    init: function() {
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

      try {
        _this.annotationsList = _this.getAnnotationList(options.uri);
        jQuery.each(_this.annotationsList, function(index, value) {
          value.endpoint = _this;
        });
        if (typeof successCallback === "function") {
          successCallback(_this.annotationsList);
        } else {
          _this.dfd.resolve(true);
        }
      } catch (e) {
        if (typeof errorCallback === "function") {
          errorCallback();
        } else {
          console.log("There was an error searching this endpoint");
        }
      }
    },
    
    deleteAnnotation: function(annotationID, successCallback, errorCallback) {
      var _this = this,
      key = _this.annotationsList[0].on.full;
      
      try {
        //find the matching annotation in the array and update it
        _this.annotationsList = jQuery.grep(_this.annotationsList, function(value, index) {
          return value['@id'] !== annotationID;
        });

        //remove endpoint reference before JSON.stringify
        jQuery.each(_this.annotationsList, function(index, value) {
          delete value.endpoint;
        });

        localStorage.setItem(key, JSON.stringify(_this.annotationsList));

        //add endpoint reference after JSON.stringify
        jQuery.each(_this.annotationsList, function(index, value) {
          value.endpoint = _this;
        });

        if (typeof successCallback === "function") {
          successCallback();
        } 
      } catch (e) {
        if (typeof errorCallback === "function") {
          errorCallback();
        } 
      }
    },
    
    update: function(oaAnnotation, successCallback, errorCallback) {
      var _this = this,
      key = oaAnnotation.on.full,
      annotationID = oaAnnotation['@id'];
      
      try {
        if (_this.annotationsList.length === 0) {
          _this.annotationsList = _this.getAnnotationList(key);          
        }
        //find the matching annotation in the array and update it
        jQuery.each(_this.annotationsList, function(index, value) {
          if (value['@id'] === annotationID) {
            _this.annotationsList[index] = oaAnnotation;
            return false;
          }
        });

        //remove endpoint reference before JSON.stringify
        jQuery.each(_this.annotationsList, function(index, value) {
          delete value.endpoint;
        });

        localStorage.setItem(key, JSON.stringify(_this.annotationsList));

        //add endpoint reference after JSON.stringify
        jQuery.each(_this.annotationsList, function(index, value) {
          value.endpoint = _this;
        });

        if (typeof successCallback === "function") {
          successCallback(oaAnnotation);
        } 
      } catch (e) {
        if (typeof errorCallback === "function") {
          errorCallback();
        } 
      }
    },

    //takes OA Annotation, gets Endpoint Annotation, and saves
    //if successful, MUST return the OA rendering of the annotation
    create: function(oaAnnotation, successCallback, errorCallback) {
      var _this = this,
      key = oaAnnotation.on.full;

      try {
        if (_this.annotationsList.length === 0) {
          _this.annotationsList = _this.getAnnotationList(key);          
        }
        oaAnnotation["@id"] = $.genUUID();
        _this.annotationsList.push(oaAnnotation);

        //remove endpoint reference before JSON.stringify
        jQuery.each(_this.annotationsList, function(index, value) {
          delete value.endpoint;
        });

        localStorage.setItem(key, JSON.stringify(_this.annotationsList));

        //add endpoint reference after JSON.stringify
        jQuery.each(_this.annotationsList, function(index, value) {
          value.endpoint = _this;
        });

        if (typeof successCallback === "function") {
          successCallback(oaAnnotation);
        } 
      } catch (e) {
        if (typeof errorCallback === "function") {
          errorCallback();
        } 
      }
    },

    getAnnotationList: function(key) {
      var data = localStorage.getItem(key);
      if (data) {
        return JSON.parse(data);
      } else {
        return [];
      }
    },

    userAuthorize: function(action, annotation) {
      return true;
    }
  };

}(Mirador));
