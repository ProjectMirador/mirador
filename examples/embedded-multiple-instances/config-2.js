(function ($) {

  $.config_2 = {
    "id" : "mirador_viewer_2",
    "saveSession" : false,
    "layout" : "1x1",
    "data" : [
      { "manifestUri": "http://iiif.biblissima.fr/manifests/ark:/12148/btv1b10500687r/manifest.json", "location": 'BnF' }
    ],
    "buildPath" : "/build/mirador/",
    "mainMenuSettings" : {
      "show" : true,
      "buttons" : {
        "bookmark" : false,
        "fullScreenViewer": true,
        "options": false
      },
      "userButtons" : [
      ],
      "userLogo" : {
        "label" : "Example 2",
        "attributes" : { "id" : "logo", "href" : "http://iiif.io", "target" : "_blank" }
      }
    },
    "annotationEndpoint" : {
      "name": "Local Storage",
      "module": "LocalStorageEndpoint"
    }
  };

})(MiradorExample);
