(function($) {

  /**
   * Default values for settings
   */
  $.DEFAULT_SETTINGS = {

    'workspaceType': 'singleObject',

    'saveSession' : false,  //whether or not to store session to local storage

    'workspaces' : {
      'singleObject': {
        'label': 'Single Object',
        'addNew': false,
        'move': false,
        'iconClass': 'image'
      },
      'compare': {
        'label': 'Compare',
        'iconClass': 'columns'
      },
      'bookReading': {
        'defaultWindowOptions': {
        },
        'label': 'Book Reading',
        'addNew': true,
        'move': false,
        'iconClass': 'book'
      }
    },

    'manifests' : [],
    'data' : [],

    'layout': '1x1',

    'openManifestsPage' : false, //defaults to false, whether or not Mirador should display the manifests page,
                                //only valid if no windowObjects have been initialized
                                //if there are multiple slots, it will be bound to the first slot and the selected manifest will open in that slot

    // whether or not to preserve the order of the manifests, as provided in the configuration, in the manifest listing page
    'preserveManifestOrder' : false,

    //default window settings, but can be changed in Mirador configuration on initialization
    'windowSettings' : {
      "availableViews" : ['ThumbnailsView', 'ImageView', 'ScrollView', 'BookView'], //any subset removes others
      "viewType" : 'ImageView', //one of [_'ThumbnailsView'_, 'ImageView', 'ScrollView', 'BookView'] - if using availableViews, must be in subset
      "bottomPanel" : true, //whether or not to make the bottom panel available in this window
      "bottomPanelVisible" : true, //whether or not to make the bottom panel visible in this window on load. This setting is dependent on bottomPanel being true
      "sidePanel" : true, //whether or not to make the side panel available in this window
      //control what is available in the side panel. if "sidePanel" is false, these options won't be applied
      "sidePanelOptions" : {
        "toc" : true,
        "annotations" : false,
        "tocTabAvailable": true,
        "layersTabAvailable": false,
        "searchTabAvailable": false,
        "annotationTabAvailable": false
      },
      "sidePanelVisible" : true, //whether or not to make the side panel visible in this window on load. This setting is dependent on sidePanel being true
      "overlay" : true, //whether or not to make the metadata overlay available/visible in this window
      "canvasControls": { // The types of controls available to be displayed on a canvas
        "annotations" : {
          "annotationLayer" : true, //whether or not to make annotation layer available in this window
          "annotationCreation" : true, /*whether or not to make annotation creation available in this window,
                       only valid if annotationLayer is set to True and an annotationEndpoint is defined.
                       This setting does NOT affect whether or not a user can edit an individual annotation that has already been created.*/
          "annotationState" : 'off', //[_'off'_, 'on'] whether or not to turn on the annotation layer on window load
          "annotationRefresh" : false, //whether or not to display the refresh icon for annotations
        },
        "imageManipulation" : {
          "manipulationLayer" : true,
          "controls" : {
            "rotate" : true,
            "brightness" : true,
            "contrast" : true,
            "saturate" : true,
            "grayscale" : true,
            "invert" : true,
            "mirror" : false
          }
        }
      },
      "fullScreen" : true, //whether or not to make the window's fullScreen button visible to user
      "displayLayout" : true, //whether or not to display all layout options, removing individual menu options is separate
      //control individual menu items in layout menu. if "displayLayout" is false, these options won't be applied
      "layoutOptions" : {
        "newObject" : true,
        "close" : true,
        "slotRight" : true,
        "slotLeft" : true,
        "slotAbove" : true,
        "slotBelow" : true,
      }
    },

    'windowObjects' : [
      /* Using the same settings listed in `windowSettings`, change the settings for a specific window
       * Structured as an array of objects
       * A few additional settings only available in `windowObjecs`
       * "loadedManifest": [manifestURI] e.g. "http://dms-data.stanford.edu/data/manifests/Walters/qm670kv1873/manifest.json"
       * "canvasID": [canvas URI] e.g. "http://dms-data.stanford.edu/data/manifests/Walters/qm670kv1873/canvas/canvas-12"
       * "id" : [unique window ID - set by application and automatically saved in SaveController]
       * "windowOptions" : [data specific to the view type, such as OSD bounds and zoom level - automatically saved in SaveController]
       */
    ],

    // Control for whether or not to auto hide controls on the OSD canvas and specific durations in milliseconds
    // durations assume `autoHideControls` is true
    'autoHideControls': true,
    'fadeDuration': 400,
    'timeoutDuration': 3000,

    'availableAnnotationModes': [

    ],

    'availableAnnotationDrawingTools': [
       'Rectangle', 'Ellipse', 'Freehand', 'Polygon', 'Pin'
    ],
    'availableAnnotationStylePickers':[
        'StrokeColor','FillColor','StrokeType'
    ],
    'drawingToolsSettings': {
      // Additional tool settings.
      /**
       *'Pin': {
       *},
       **/
      //'selectedColor': 'red',
      'doubleClickReactionTime': 300,
      'strokeColor': 'deepSkyBlue',
      'fillColor': 'deepSkyBlue',
      'fillColorAlpha': 0.0,
      'shapeHandleSize':10,
      'fixedShapeSize':10,
      'newlyCreatedShapeStrokeWidthFactor':5,
      'hoverColor':'yellow'
    },

    'availableExternalCommentsPanel': false,
    'shapeHandleSize':10,


    'availableCanvasTools': [

    ],

    // main (top) menu
    //we don't actually take the height into account for the mirador-viewer div, so don't use for now
    'mainMenuSettings': {
      'show': true,
      'buttons' : {
        'bookmark' : false,
        'layout' : true,
        'options' : false,
        'fullScreenViewer': true
      }
      //'height': 25,
      //'width': '100%'
    },

    'workspacePanelSettings': {
      'maxRows': 5,
      'maxColumns': 5,
      'preserveWindows': true
    },

    //true or false.  controls display of "Add new object from URL" on manifest listing page
    'showAddFromURLBox' : true,

    'buildPath' : 'build/mirador/',

    'i18nPath' : 'locales/',

    'imagesPath' : 'images/',

    /**
     *  Annotation backend that have instance-specific configuration data as a hash, e.g.:
     *  {
     *  name: 'backend name',
     *  module: 'NameEndpoint',
     *  options:
     *  { 'url': '',
     *    'storeId': 123,
     *    'APIKey': '23983hf98j3f9283jf2983fj'
     *  }
     *  }
     **/
    'annotationEndpoint': {},

    'annotationBodyEditor': {
      'module': 'TinyMCEAnnotationBodyEditor',
      'options': {
        config: {
          plugins: "image link media directionality",
          toolbar: "bold italic | bullist numlist | link image media | removeformat | ltr rtl",
          tags: []
        }
      }
    },

    'jsonStorageEndpoint': {
      'name': 'JSONBlob API Endpoint',
      'module': 'JSONBlobAPI',
      'options': {
        'ssl': true,
        'port': '443',
        'host': 'jsonblob.com'
      }
    },

    'manifestsPanel': {
      'name': 'Classic Mirador Manifests Panel',
      'module': 'ManifestsPanel',
      'options': {
      }
    },
    
    'sharingEndpoint': {
      'url': '',
      'storeId': 123,
      'APIKey': '23983hf98j3f9283jf2983fj'
    },

    // linked image views configuration
    'lockController' : {
      'lockProfile' : 'lazyZoom',
      'notifyMaxMin' : true
    }
  };

}(Mirador));
