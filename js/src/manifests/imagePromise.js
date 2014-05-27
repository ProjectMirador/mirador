(function($){

    $.ImagePromise = function(imageUri, dfd) {

        jQuery.extend(true, this, {
            uri: imageUri,
            dimensions: []
        });

        this.loadImageDataFromURI(dfd);
    };

    $.ImagePromise.prototype = {

        loadImageDataFromURI: function(dfd) {
            var _this = this;

            jQuery.ajax({
                url: _this.uri,
                dataType: 'json',
                async: true,

                success: function(jsonLd) {
                    dfd.resolve(true);
                },

                error: function() {
                    console.log('Failed loading ' + _this.uri);
                    dfd.resolve(false);
                }
            });

        }
    };

}(Mirador));
