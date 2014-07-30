
(function($) {

  $.OpenSeadragon = function(options) {

    var osd = OpenSeadragon(

      jQuery.extend({
        preserveViewport: true,
        visibilityRatio:  1,
        minZoomLevel:     0,
        defaultZoomLevel: 0,
        prefixUrl:        'images/openseadragon/',
        autoHideControls: false,
        zoomInButton:   "zoom-in",
        zoomOutButton:  "zoom-out",
        homeButton:     "home",
        fullPageButton: "full-page"
      }, options)

    );
    
    var div = document.getElementById("osd-toolbar");

    osd.addControl(div, {anchor: OpenSeadragon.ControlAnchor.BOTTOM_RIGHT});
    
    div = document.createElement("div");
    var anno = document.createElement("a");
    anno.className = 'mirador-btn mirador-icon-annotations';
    var i = document.createElement("i");
    i.className = "fa fa-comments fa-lg";
    anno.appendChild(i);
    
    var choices = document.createElement("a");
    choices.className = "mirador-btn mirador-icon-choices";

	div.appendChild(anno);
	div.appendChild(choices);
	osd.addControl(div, {anchor: OpenSeadragon.ControlAnchor.BOTTOM_LEFT});

    return osd;

  };

}(Mirador));