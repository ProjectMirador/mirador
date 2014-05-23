(function($) {

    $.ManifestsListItem = function(options) {

        jQuery.extend(true, this, {
            element:                    null,
            parent:                     null,
            manifestId:                 null,
            loadStatus:                 null,
            numPreviewImages:           8,
            thumbHeight:                80
        }, options);

        this.init();
        
    };

    $.ManifestsListItem.prototype = {

        init: function() {
          var _this = this;
            this.element = jQuery(this.template(this.fetchTplData(this.manifestId))).prependTo(this.parent.manifestListElement).hide().fadeIn('slow');
            this.bindEvents();
            this.fetchImages();
        },

        fetchTplData: function() {
          var _this = this;
          
          var manifest = $.viewer.manifests[_this.manifestId];
          var tplData = { 
            label: manifest.label,
            repository: jQuery.grep($.viewer.data, function(item) {
              return item.manifestUri === _this.manifestId;
            })[0].location,
            images: []
          };
          if (_this.numPreviewImages > $.viewer.manifests[_this.manifestId].sequences[0].canvases.length) {
            _this.numPreviewImages = $.viewer.manifests[_this.manifestId].sequences[0].canvases.length;
          }
          for ( var i=0; i < _this.numPreviewImages - 1 ; i++) {
            var resource = $.viewer.manifests[_this.manifestId].sequences[0].canvases[i].images[0].resource,
            url = $.Iiif.getUriWithHeight(resource.service['@id'], _this.thumbHeight),
            aspectRatio = resource.height/resource.width;
            width = (_this.thumbHeight/aspectRatio);
            console.log(resource);
   
            tplData.images.push({
              url: url,
              width: width
            });
          }

          return tplData;
        },

        fetchImages: function() {

        },

        bindEvents: function() {
        },

        hide: function() {
            var _this = this;
        },

        show: function() {
            var _this = this;
        },

        template: Handlebars.compile([
                      '<li>',
                      '<div class="repo-image">',
                        '<img src="images/sul_logo.jpeg" alt="repoImg">',
                      '</div>',
                      '<div class="select-metadata">',
                          '<h3 class="manifest-title">{{label}}</h3>',
                          '<h4 class="repository-label">{{repository}}</h4>',
                      '</div>',
                      '{{#each images}}',
                        '<img src="{{url}}" width="{{width}}"class="thumbnail-image" >',
                      '{{/each}}',
                      '</li>'
        ].join(''))
    };

}(Mirador));

