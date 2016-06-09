/* Local fake JsonBlob endpoint */

/* global Storage, Mirador */

(function($){
    function generateUUID() {
        var d = new Date().getTime();
        var uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
            var r = (d + Math.random()*16)%16 | 0;
            d = Math.floor(d/16);
            return (c==='x' ? r : (r&0x3|0x8)).toString(16);
        });
        return uuid;
    }
    
    $.LocalJSONBlobAPI = function(opts) {
          this.options = {
              storage: window.localStorage
          };
          jQuery.extend(this.options, opts);
    };

    $.LocalJSONBlobAPI.prototype = {
        readSync: function(blobId) {
            return JSON.parse(this.options.storage.getItem(blobId));
        },
        save: function(blob) {
            var deferred = jQuery.Deferred(),
                uuid = generateUUID();
            this.options.storage.setItem("BM-" + uuid, JSON.stringify(blob));
            deferred.resolve("BM-" + uuid);
            return deferred.promise();
        }
    };
}(Mirador));

