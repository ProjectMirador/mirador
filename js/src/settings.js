(function($) {

  /**
   * Default values for settings
   */
  $.DEFAULT_SETTINGS = {

    'workspaceAutoSave': true,

    'currentWorkspaceType': 'singleObject',

    'availableWorkspaces': ['singleObject', 'compare', 'bookReading'],
      
    'workspaces' : {
      'singleObject': {
        'layout': [{ 
          type: "column",
          slot: true,
          id: 1
        }],
        'label': 'Single Object',
        'addNew': false,
        'move': false,
        'iconClass': 'image'
      },

      'compare': {
        'layout': [{ 
          type: "column",
          slot: true,
          id: 1
        },{ 
          type: "column",
          slot: true,
          id: 2
        }],
        'label': 'Compare',
        'iconClass': 'columns'
      },

      'bookReading': {
        'layout': [
          {
          type: "column",
          slot: true,
          id: 1
        }
        ],
        'defaultWindowOptions': {
        },
        'label': 'Book Reading',
        'addNew': true,
        'move': false,
        'iconClass': 'book'
      },
      'reference': {
        'layout': [{ 
          type: "column",
          slot: true,
          id: 1
        },
        { type: "column",
          children: [{
            type: "row",
            children: [{
              type: 'column',
              slot: true,
              id: 2
            },
            {
              type: 'column',
              slot: true,
              id: 3
            }
            ]
          },
          {
            type: 'column',
            slot: true,
            id: 4
          },
          {
            type: 'column',
            slot: true,
            id: 5
          }
          ]
        }],
        'label': 'Reference',
        'iconClass': 'th-list'
      }
      // add new workspace types by appending a 
      // profile with plugin initialisation code:
      // $.DEFAULT_SETTINGS.availableWorkspaces['myNwqWorkspace'] = {...}
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
    'mainMenuSettings': {
      'show': true,
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
