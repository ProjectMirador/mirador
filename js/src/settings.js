(function($) {

  /**
   * Default values for settings
   */
  $.DEFAULT_SETTINGS = {

    'workspaceAutoSave': true,

    'currentWorkspace': 'singleObject',

    'availableWorkspaces': ['singleObject', 'compare', 'bookReading', 'reference'],
      
    'workspaces' : {
      'singleObject': {
        'layout': [{
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
          {}
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
          children: [{
            type: 'row',
            slot: true,
            id: 1
          }]
        },
        { type: "column",
          children: [{
            type: "row",
            children: [{
              type: 'column',
              slot: true,
              id: 1
            },
            {
              type: 'column',
              slot: true,
              id: 1
            }
            ]
          },
          { type: 'slot',
            id: 3
          },
          {type: 'slot'}
          ]
        }],
        'label': 'Reference',
        'iconClass': 'th-list'
      }
      // add new workspace types by appending a 
      // profile with plugin initialisation code:
      // $.DEFAULT_SETTINGS.availableWorkspaces['myNwqWorkspace'] = {...}
    },
    
    // main (top) menu
    'mainMenu': {
      'height': 25,
      'width': '100%'
    },

    'repoImages' : {
      'Yale University': 'yale_logo.jpeg',
      'Stanford University': 'sul_logo.jpeg',
      'Harvard University': 'harvard_logo.png',
      'other': 'iiif_logo.png'
    },

    // annotorius options
    /*'openLayersAnnotoriusView': {
      'appId': 'lQ9BqPkPRVJR4Qbe652BapTP2JVDNzS0G2k6GCWW', // Parse.com app id
      'jsKey': 'VbYdon3U70Wi8aht9Y8Z2eRk3FmOsO2n1lQhx1vV', // Parse.com js_key
      'height': 400,
      'width': 600,
      'maxSize': 2500, // max longest side to load in open layers
      'maxZoomLevel': 4
    },*/
    
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
      'notifyMaxMin' : false
    }
  };

}(Mirador));
