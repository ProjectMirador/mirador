(function($) {

  $.ScrollView = function(options) {

    jQuery.extend(this, {
      currentImgIndex:      0,
      canvasID:              null,
      focusImages:          [],
      manifest:             null,
      element:              null,
      imagesList:           [],
      appendTo:             null,
      thumbInfo:            {thumbsHeight: 150, listingCssCls: 'listing-thumbs', thumbnailCls: 'thumbnail-view'},
      windowId:             null,
      panel:                false,
      vDirectionStatus: '',
      lazyLoadingFactor:    1.5  //should be >= 1
    }, options);

    jQuery.extend($.ScrollView.prototype, $.ThumbnailsView.prototype);
    this.init();
    if(this.vDirectionStatus == 'rtl') {
      jQuery(this.appendTo).find('.scroll-view').addClass('v-direction-rtl');
    }
  };

}(Mirador));
