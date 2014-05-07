(function($){

    $.Manifest = function(manifestUri, dfd) {

        jQuery.extend(true, this, {
            jsonLd: null,
            uri: manifestUri
        });

        this.loadManifestDataFromURI(dfd);
    };

    $.Manifest.prototype = {

        loadManifestDataFromURI: function(dfd) {
            var _this = this;

            jQuery.ajax({
                url: _this.uri,
                dataType: 'json',
                async: true,

                success: function(jsonLd) {
                    _this.jsonLd = jsonLd;
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
