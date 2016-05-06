(function ($) {
  
  $.config_2 = {
    "id" : "mirador_viewer_2",
    "saveSession" : false,
    "layout" : "1x1",
    "data" : [
      { "manifestUri": "http://iiif.biblissima.fr/manifests/ark:/12148/btv1b10500687r/manifest.json", "location": 'BnF' }
    ],
    "buildPath" : "/",
    "i18nPath" : "mirador/locales/",
    "imagesPath" : "mirador/images/",
    "logosPath" : "mirador/images/logos/",
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
    "windowObjects" : [
      {
        "loadedManifest" : null,
        "viewType" : "ImageView",
        "displayLayout" : true,
        "bottomPanel" : true,
        "sidePanel" : true,
        "annotationLayer" : true
      }
    ],
    "annotationLayer" : true,
    "annotationEndpoint" : {
      "name": "Local Storage", 
      "module": "LocalStorageEndpoint"
    }
  };
  
})(MiradorExample);
