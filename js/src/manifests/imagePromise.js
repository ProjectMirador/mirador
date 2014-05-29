(function($){

    $.ImagePromise = function(imageUri) {

        jQuery.extend(true, this, {
            uri: imageUri,
            dimensions: [],
            dfd: null
        });
        
        dfd = jQuery.Deferred();
        return this.loadImageDataFromURI(dfd);
    };

    $.ImagePromise.prototype = {

        loadImageDataFromURI: function(dfd) {
            var img = new Image();
            var self = this;
        
            img.onload = function() {
                dfd.resolveWith(self, [img.src]);
            };
        
            img.onerror = function() {
                dfd.rejectWith(self, [img.src]);
            };
        
            dfd.fail(function() {
                console.log('image failed to load: ' + img.src);
            });
        
            img.src = self.uri;
            return dfd.promise();
        }
    };

}(Mirador));
