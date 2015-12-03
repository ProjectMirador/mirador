(function($){

  var JSONBLOB_API_BASE = 'jsonblob.com/api/jsonBlob';

  function getAPIUri(relURI, ssl) {

	var proto = 'http';
	if ( ssl ) {
		proto = 'https';
	}

	if ( typeof relURI !== 'undefined'  && relURI.length > 0) {
		return proto + '://' + JSONBLOB_API_BASE + '/' + relURI;
	}

	return proto + '://' + JSONBLOB_API_BASE;
  }

  function initSettings(method, relURI, ssl, requestBody) {

	var ajaxSettings = {
		type: method,
		url: getAPIUri(relURI, ssl),
		contentType: 'application/json; charset=UTF-8',
		accept: 'application/json',
		dataType: 'json',
		processData: false,
		data: JSON.stringify(requestBody)
	};

	return ajaxSettings;
  }

  function syncRequest(method, relURI, ssl, requestBody) {
	var result;
	var settings = initSettings(method, relURI, ssl, requestBody);
	settings.async = false;
	settings.success = function(data, textStatus, request) {
          result = data;
        };
	jQuery.ajax(settings);
	return result;
  }

  function asyncRequest(method, relURI, ssl, requestBody, cb) {
	var settings = initSettings(method, relURI, ssl, requestBody);
	settings.success = cb;
	jQuery.ajax(settings);
  }

  $.JSONBlobAPI = function(options) {
	this.options = options;
  };


  $.JSONBlobAPI.prototype = {
	readSync: function(blobId) {
		return syncRequest('GET', blobId, this.options.ssl);
	},
	save: function(blob) {
		var deferred = jQuery.Deferred();
		asyncRequest('POST', '', this.options.ssl, blob, function(data, textStatus, request) {
			var blobid = request.getResponseHeader('X-Jsonblob');
			deferred.resolve(blobid);
		});
		return deferred.promise();
	}
  };

}(Mirador));

