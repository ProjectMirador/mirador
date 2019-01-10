/*
 * Edited version of https://github.com/IIIF/mirador/blob/9e3c6bbb894e044d01ad51aae1b70309939de5a9/js/src/annotations/catchEndpoint.js
 * This module tries to store the annotation as is in a RDF store but some fiddeling is required.
 * Fidles are:
 * - delete annotation fails if id has a / in it so have to send sanatised ids to mirador
 * - mirador requires an endpoint variable in the annotation pointing to this class.
 *
 * Note: this endpoint doesn't currently support authentication, just returns allow all
 *
 * All Endpoints need to have at least the following:
 * annotationsList - current list of OA Annotations
 * dfd - Deferred Object
 * init()
 * search(uri)
 * create(oaAnnotation, returnSuccess, returnError)
 * update(oaAnnotation, returnSuccess, returnError)
 * deleteAnnotation(annotationID, returnSuccess, returnError) (delete is a reserved word)
 *
 */
(function ($){

$.SimpleASEndpoint = function (options) {

  jQuery.extend(this, {
        token: null,
        // prefix:    'annotation', /**/
        uri: null,
        url: options.url,
        dfd: null,
        // OA list for Mirador use
        annotationsList: [],
        // internal list for module use to map id to URI
        idMapper: {}
    }, options);

    this.init();
  };

  $.SimpleASEndpoint.prototype = {
    // Any set up for this endpoint, and triggers a search of the URI passed to object
    init: function () {
      this.catchOptions = {
        user: {
          id: this.userid,
          name: this.username
        },
        permissions: {
          'read':   [],
          'update': [this.userid],
          'delete': [this.userid],
          'admin': [this.userid]
        }
      };
    },

    // Search endpoint for all annotations with a given URI
    search: function (options, successCallback, errorCallback) {
      var _this = this;

      this.annotationsList = []; // clear out current list
      jQuery.ajax({
        url: _this.url + '/search', // this.prefix+
        cache: false,
        type: 'GET',
        dataType: 'json',
        headers: {
          // 'x-annotator-auth-token': this.token
        },
        data: {
          uri: options.uri,
          APIKey: _this.APIKey,
          media: 'image',
          limit: 10000
        },

        contentType: 'application/json; charset=utf-8',
        success: function(data) {
          _this.annotationsList = data; // gmr
          jQuery.each(_this.annotationsList, function(index, value) {
            // Swap out URI of anno to shorter ID
            value.fullId = value['@id'];
            value['@id'] = $.genUUID();
            _this.idMapper[value['@id']] = value.fullId;
            value.endpoint = _this;
            // Ensure on is an array
            _this.fixOn(value);
          });
          if (typeof successCallback === 'function') {
            successCallback(data);
          } else {
            _this.dfd.resolve(true);
          }
        },
        error: function(xhr, statusText, err) {
          if (typeof errorCallback === 'function') {
            errorCallback();
          } else {
            _this.dfd.reject();
            console.log('The request for annotations has caused an error for endpoint: ' + options.uri + ' due to ' + statusText);
          }
        }

      });
    },

    fixOn: function (annotation) {
      var oldOn;
      if (annotation && annotation.on && !jQuery.isArray(annotation.on) && annotation.on.selector && annotation.on.selector.default) {
        oldOn = annotation.on;
        annotation.on = [oldOn];
      }
    },

    deleteAnnotation: function (annotationID, returnSuccess, returnError) {
      var _this = this;
      jQuery.ajax({
        url: _this.url + '/destroy?uri=' + encodeURIComponent(_this.idMapper[annotationID]) + '&APIKey=' + _this.APIKey, // this.prefix+
        type: 'DELETE',
        dataType: 'json',
        headers: {
          // 'x-annotator-auth-token': this.token
        },
        data: {
          uri: annotationID,
        },
        contentType: 'application/json; charset=utf-8',
        success: function(data) {
          if (typeof returnSuccess === 'function') {
            returnSuccess();
          }
        },
        error: function(xhr, statusText, err) {
          if (typeof returnError === 'function') {
            returnError();
          } else {
            console.log('Failed to delete annotation ' + annotationID + ' due to ' + statusText);
          }
        }

      });
    },

    update: function (oaAnnotation, returnSuccess, returnError) {
      var annotation = oaAnnotation;
      var _this = this;
      // slashes don't work in JQuery.find which is used for delete
      // so need to switch http:// id to full id and back again for delete.
      var shortId = annotation['@id'];
      var annotationID = annotation.fullId;// annotation['@id'];
      annotation['@id'] = annotation.fullId;
      delete annotation.fullId;
      delete annotation.endpoint;
      jQuery.ajax({
        url: _this.url + '/update?APIKey=' + _this.APIKey, // this.prefix+
        type: 'POST',
        dataType: 'json',
        headers: {
          // 'x-annotator-auth-token': this.token
        },
        data: JSON.stringify(annotation),
        contentType: 'application/json; charset=utf-8',
        success: function(data) {
          _this.fixOn(data);
          if (typeof returnSuccess === 'function') {
            returnSuccess(data);
          }
        },
        error: function(xhr, statusText, err) {
          if (typeof returnError === 'function') {
            returnError();
          } else {
            console.log('Failed to update annotation: ' + oaAnnotation['@id'] + ' due to ' + statusText);
          }
        }
      });
      // this is what updates the viewer
      annotation.endpoint = _this;
      annotation.fullId = annotation['@id'];
      annotation['@id'] = shortId;
    },

    create: function (oaAnnotation, returnSuccess, returnError) {
      var annotation = oaAnnotation;
      var _this = this;

      jQuery.ajax({
        url: _this.url + '/create?APIKey=' + _this.APIKey, // this.prefix+
        type: 'POST',
        dataType: 'json',
        headers: {
          // 'x-annotator-auth-token': this.token
        },
        data: JSON.stringify(annotation),
        contentType: 'application/json; charset=utf-8',
        success: function(data) {
          data.fullId = data['@id'];
          data['@id'] = $.genUUID();
          data.endpoint = _this;
          _this.idMapper[data['@id']] = data.fullId;
          _this.fixOn(data);
          if (typeof returnSuccess === 'function') {
            returnSuccess(data);
          }
        },
        error: function(xhr, statusText, err) {
          if (typeof returnError === 'function') {
            returnError();
          } else {
            console.log('Failed to create annotation: ' + oaAnnotation['@id'] + ' due to ' + statusText);
          }
        }
      });
    },

    set: function (prop, value, options) {
      if (options) {
        this[options.parent][prop] = value;
      } else {
        this[prop] = value;
      }
    },
    userAuthorize: function (action, annotation) {
      return true; // allow all
    }
  };
}(Mirador));
