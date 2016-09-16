(function ($) {

  $.config_1 = {
    "id" : "mirador_viewer_1",
    "saveSession" : false,
    "layout" : "1x1",
    "data" : [
      { "manifestUri": "http://dms-data.stanford.edu/data/manifests/Walters/qm670kv1873/manifest.json", "location": "Stanford University" }
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
        "label" : "Example 1",
        "attributes" : { "id" : "logo", "href" : "http://iiif.io", "target" : "_blank" }
      }
    },
    "annotationEndpoint" : {
      "name": "Local Storage",
      "module": "LocalStorageEndpoint"
    }
  };

})(MiradorExample);
