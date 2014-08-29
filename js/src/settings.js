(function($) {

  /**
   * Default values for settings
   */
  $.DEFAULT_SETTINGS = {

    'workspaceAutoSave': true,

    'currentWorkspaceType': 'singleObject',

    'availableWorkspaces': ['singleObject', 'compare', 'bookReading', 'quad'],
      
    'workspaces' : {
       'singleObject': {
            'slots': [{
            }],
            'label': 'Single Object',
            'addNew': false,
            'move': false,
            'iconClass': 'image'
        },
        'compare': {
          'slots': [{
            type: "column",
            size: 50
          },
          {
            type: "column",
            size: 50
          }],
            'label': 'Compare',
            'iconClass': 'columns'
        },
        
        'bookReading': {
            'slots': [
              {}
            ],
            'defaultWindowOptions': {
            },
            'label': 'Book Reading',
            'addNew': true,
            'move': false,
            'iconClass': 'book'
        },
        'quad': {
          'slots': [
            { type: 'column',
              size: 50,
              positions: [{
                type: 'row', 
                size:50
              },
              { 
                type: 'row',
                size:50
              }]
          },
            { type: 'column',
              size: 50,
              positions: [{
                type: 'row', 
                size:50
              },
              { 
                type: 'row',
                size:50
              }]
          }],
            'label': 'quad',
            'iconClass': 'th-large'
        }
        // add new workspace types by appending a 
        // profile with plugin initialisation code:
        // $.DEFAULT_SETTINGS.workspaces['myNwqWorkspace'] = {...}
    },
    
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
      *   "id" : [unique window ID - set by application and automatically saved in SaveController],
      **/
    ],
    
    // main (top) menu
    'mainMenu': {
      'autoHide': true,
      'height': 25,
      'width': '100%'
    },

   'repoImages' : {
      'Yale University': 'yale_logo.jpeg',
      'Stanford University': 'sul_logo.jpeg',
      'Harvard University': 'harvard_logo.png',
      'other': 'iiif_logo.png'
    },

    // // metadata view
    // unclear what options should exist here.
    // 'metadataView': {
    //   'height': 400,
    //   'width': 600
    // },

    // // metadata view
    //
    // What can we learn from this and the
    // openi https://github.com/CtrHellenicStudies/OpenSeaDragonAnnotation
    // annotator-based branches of the RC? 
    //
    // 'openLayersAnnotoriusView': {
    //   'appId': 'lQ9BqPkPRVJR4Qbe652BapTP2JVDNzS0G2k6GCWW', // Parse.com app id
    //   'jsKey': 'VbYdon3U70Wi8aht9Y8Z2eRk3FmOsO2n1lQhx1vV', // Parse.com js_key
    //   'height': 400,
    //   'width': 600,
    //   'maxSize': 2500, // max longest side to load in open layers
    //   'maxZoomLevel': 4
    // },
    
    'annotationEndpoint': {
      'url': '',
      'storeId': 123,
      'APIKey': '23983hf98j3f9283jf2983fj'
    },
    
    // parameters of saving system
    'saveController': {
        // TODO: make saving a function of significant user action, not timed intervals.
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
