(function($) {

  /**
   * Default values for settings
   */
  $.DEFAULT_SETTINGS = {

    'workspaceAutoSave': true,

    'workspaceType': 'singleObject',

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

    'layout': '1x2',

    'windowObjects' : [
      /** within a single object, the following options:
       *   "loadedManifest": [manifestURI] e.g. "http://dms-data.stanford.edu/data/manifests/Walters/qm670kv1873/manifest.json"
       *   "availableViews" : defaults to ['ThumbnailsView', 'ImageView', 'ScrollView', 'BookView'], any subset removes others
       *   "viewType" : one of ['ThumbnailsView', 'ImageView', 'ScrollView', 'BookView'] - if using availableViews, must be in subset
       *   "canvasID": [canvas URI] e.g. "http://dms-data.stanford.edu/data/manifests/Walters/qm670kv1873/canvas/canvas-12"
       *   "bottomPanel" : [true, false]
       *   "sidePanel" : [true, false]
       *   "overlay" : [true, false]
       *   "windowOptions" : [data specific to the view type, such as OSD bounds and zoom level - automatically saved in SaveController]
       *   "id" : [unique window ID - set by application and automatically saved in SaveController]
       *   "displayLayout" : [true, false], whether or not to display all layout options, removing individual menu options is separate
       *   "layoutOptions" : control individual menu items in layout menu. if "displayLayout" is false, these options won't be applied
       *     {
       *     "newObject" : [true, false]
       *     "close" : [true, false]
       *     "slotRight" : [true, false]
       *     "slotLeft" : [true, false]
       *     "slotAbove" : [true, false]
       *     "slotBelow" : [true, false]
       *     }
       **/
    ],

    'defaultWindowSettings': {

    },

    'availableAnnotationModes': [

    ],

    'availableAnnotationDrawingTools': [

    ],
    
    'availableCanvasTools': [

    ],

    // main (top) menu
    //we don't actually take the height into account for the mirador-viewer div, so don't use for now
    'mainMenuSettings': {
      'show': true,
      'buttons' : {
        'bookmark' : true,
        'layout' : true,
        'options' : false
      }
      //'height': 25,
      //'width': '100%'
    },

    //true or false.  controls display of "Add new object from URL" on manifest listing page
    'showAddFromURLBox' : true,

    'repoImages' : {
      'Yale University': 'yale_logo.jpeg',
      'Stanford University': 'sul_logo.jpeg',
      'Harvard University': 'harvard_logo.png',
      'ecodices': 'ecodices_logo.png',
      'BnF': 'bnf_logo.jpeg',
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
