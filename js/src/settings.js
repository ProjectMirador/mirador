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

    'layout': '1x1',

    'openManifestsPage' : false, //defaults to false, whether or not Mirador should display the manifests page,
                                //only valid if no windowObjects have been initialized
                                //if there are multiple slots, it will be bound to the first slot and the selected manifest will open in that slot

    'windowObjects' : [
      /** within a single object, the following options:
       *   "loadedManifest": [manifestURI] e.g. "http://dms-data.stanford.edu/data/manifests/Walters/qm670kv1873/manifest.json"
       *   "canvasID": [canvas URI] e.g. "http://dms-data.stanford.edu/data/manifests/Walters/qm670kv1873/canvas/canvas-12"
       *
       *   "availableViews" : defaults to ['ThumbnailsView', 'ImageView', 'ScrollView', 'BookView'], any subset removes others
       *   "viewType" : one of [_'ThumbnailsView'_, 'ImageView', 'ScrollView', 'BookView'] - if using availableViews, must be in subset
       *
       *   "bottomPanel" : [_true_, false] whether or not to make the bottom panel available in this window
       *   "bottomPanelVisible" : [_true_, false] whether or not to make the bottom panel visible in this window on load. This setting is dependent
       *                           on bottomPanel being true
       *   "sidePanel" : [_true_, false] whether or not to make the side panel available in this window
       *   "sidePanelOptions" : control individual menu items in layout menu. if "displayLayout" is false, these options won't be applied
       *     {
       *     "toc" : [_true_, false]
       *     "annotations" : [true, _false_]
       *     }
       *   "sidePanelVisible" : [_true_, false] whether or not to make the side panel visible in this window on load. This setting is dependent
       *                           on sidePanel being true
       *   "overlay" : [_true_, false] whether or not to make the overlay available/visible in this window
       *
       *   "annotationLayer" : [_true_, false] whether or not to make annotation layer available in this window
       *   "annotationCreation" : [_true_, false] whether or not to make annotation creation available in this window,
       *                          only valid if annotationLayer is set to True and an annotationEndpoint is defined.
       *                          This setting does NOT affect whether or not a user can edit an individual annotation that has already been created.
       *   "annotationState" : [_'annoOff'_, 'annoOnCreateOff', 'annoOnCreateOn'] whether or not to turn on the annotation layer on window load
       *
       *   "fullScreen" : [_true_, false] whether or not to make the fullScreen HUD button visible to user
       *
       *   "displayLayout" : [_true_, false], whether or not to display all layout options, removing individual menu options is separate
       *   "layoutOptions" : control individual menu items in layout menu. if "displayLayout" is false, these options won't be applied
       *     {
       *     "newObject" : [_true_, false]
       *     "close" : [_true_, false]
       *     "slotRight" : [_true_, false]
       *     "slotLeft" : [_true_, false]
       *     "slotAbove" : [_true_, false]
       *     "slotBelow" : [_true_, false]
       *     }
       *   "windowOptions" : [data specific to the view type, such as OSD bounds and zoom level - automatically saved in SaveController]
       *   "id" : [unique window ID - set by application and automatically saved in SaveController]
       **/
    ],

    'defaultWindowSettings': {

    },

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

    'drawingToolsSettings': {
      'doubleClickReactionTime': 300,
      'strokeColor': 'deepSkyBlue',
      'fillColor': 'deepSkyBlue',
      'fillColorAlpha': 0.0
    },

    'availableCanvasTools': [

    ],

    // main (top) menu
    //we don't actually take the height into account for the mirador-viewer div, so don't use for now
    'mainMenuSettings': {
      'show': true,
      'buttons' : {
        'bookmark' : true,
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

    'logosPath' : 'images/logos/',

    'repoImages' : {
      'other': 'iiif_logo.png'
    },

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
      'options': {}
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
