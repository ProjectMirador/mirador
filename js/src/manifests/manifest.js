(function($){

    $.Manifest = function(manifestUri) {

        jQuery.extend(true, this, {
            jsonLd: null,
            uri: manifestUri,
            request: null 
        });

        this.init(manifestUri);
    };

    $.Manifest.prototype = {
        init: function(manifestUri) {
            var _this = this;
            this.request = jQuery.ajax({
                url: manifestUri,
                dataType: 'json',
                async: true
            });

            this.request.done(function(jsonLd) {
              _this.jsonLd = jsonLd;
            });
        }
    };

}(Mirador));
