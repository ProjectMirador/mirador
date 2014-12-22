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

    'availableAnnotationModes': [

    ],

    'availableAnnotationDrawingTools': [
     
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
    
    /*
    List of backends that have instance-specific configuration data as a hash, e.g.:
    {
      name: 'backend name',
      module: 'NameEndpoint',
      options: 
        {'url': '',
        'storeId': 123,
        'APIKey': '23983hf98j3f9283jf2983fj'
        }
    }*/
    'annotationEndpoints': [],

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
