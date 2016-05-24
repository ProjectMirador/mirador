(function ($) {
  
  $.config_3 = {
    "_comment": "Multi-slot",
    "id" : "mirador_viewer_1",
    "saveSession" : false,
    "layout" : "2x2",
    "mainMenuSettings" : {
      "show" : false
    },
    "data" : [
      {
        "manifestUri" : "http://dms-data.stanford.edu/data/manifests/Walters/qm670kv1873/manifest.json",
        "location" : "Stanford University"
      },
      {
        "manifestUri" : "http://oculus-dev.harvardx.harvard.edu/manifests/huam:200515",
        "location": "Harvard University"
      },
      {
        "manifestUri" : "http://iiif.biblissima.fr/manifests/ark:/12148/btv1b84539771/manifest.json",
        "location": "BnF"
      }
    ],
    "windowObjects" : [
      {
        "loadedManifest" : "http://iiif.biblissima.fr/manifests/ark:/12148/btv1b84539771/manifest.json",
        "viewType" : "ThumbnailsView"
      },
      {
        "loadedManifest" : "http://iiif.biblissima.fr/manifests/ark:/12148/btv1b84539771/manifest.json",
        "viewType" : "ImageView"
      },
      {
        "loadedManifest" : "http://iiif.biblissima.fr/manifests/ark:/12148/btv1b84539771/manifest.json",
        "viewType" : "ScrollView"
      },
      {
        "loadedManifest" : "http://iiif.biblissima.fr/manifests/ark:/12148/btv1b84539771/manifest.json",
        "//1" : "slotAddress: row1.column2.row1",
        "viewType" : "BookView"
      }
    ],
    "buildPath" : "/",
    "i18nPath" : "mirador/locales/",
    "imagesPath" : "mirador/images/",
    "logosPath" : "mirador/images/logos/"
  }

})(MiradorExample);
