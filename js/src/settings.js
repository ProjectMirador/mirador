(function($) {

  /**
   * Default values for settings
   */
  $.DEFAULT_SETTINGS = {

    'workspaceAutoSave': true,

    'showNoImageChoiceOption': true,

    'initialWorkspace': 'singleObject',

    'availableWorkspaces': {
        'singleObject': {
            'slots': [{
                width: '100%'
                // windowOptions: {...}
            }],
            'addNew': false,
            'move': false
        },
        'compare': {
            'slots': [
                {},
                {}
            ]
        },
        'detailView': {

        },
        'bookReading': {

        }
        // add new workspace types by appending a 
        // profile with plugin initialisation code:
        // $.DEFAULT_SETTINGS.availableWorkspaces['myNwqWorkspace'] = {...}
    },

    'maxWidgetsLimit': 10,

    // main (top) menu
    'mainMenu': {
      'height': 25,
      'width': '100%'
    },

    // status bar
    'statusBar': {
      'show': true,
      'height': 25,
      'width': '100%'
    },

    // scale
    'scale': {
      'height': 60,
      'maxWidth': 230
    },

    // widget toolbar
    'widgetToolbar': {
      'height': 25
    },

    // widget status bar
    'widgetStatusBar': {
      'height': 26
    },

    // window options 
    'imageView': {
      'height': 400,
      'width': 350,
      'annotationsList': {
        'display': true,
        'width': 200
      }
    },

    // scroll view
    'scrollView': {
      'height': 400,
      'imageLabelHeight': 25,
      'toolbarHeight': 25,
      'width': 600
    },

    // thumbnails view
    'thumbnailsView': {
      'height': 400,
      'thumbsMaxHeight': 150,
      'thumbsMinHeight': 50,
      'thumbsDefaultZoom': 0.5,
      'width': 600
    },

    'repoImages' : {
      'Yale University': 'yale_logo.jpeg',
      'Stanford University': 'sul_logo.jpeg',
      'Harvard UNiversity': 'harvard_logo.png',
      'other': 'iiif_logo.png'
    },

    // metadata view
    'metadataView': {
      'height': 400,
      'width': 600
    },

    // metadata view
    'openLayersAnnotoriusView': {
      'appId': 'lQ9BqPkPRVJR4Qbe652BapTP2JVDNzS0G2k6GCWW', // Parse.com app id
      'jsKey': 'VbYdon3U70Wi8aht9Y8Z2eRk3FmOsO2n1lQhx1vV', // Parse.com js_key
      'height': 400,
      'width': 600,
      'maxSize': 2500, // max longest side to load in open layers
      'maxZoomLevel': 4
    },

    // parameters of saving system
    'saveController': {
        // TODO: make saving a function of significant user action, not timed intervals.
      'saveInterval': 8000 // number of milliseconds between automatic saves.
    },

    // linked image views configuration
    'lockController' : {
      'lockProfile' : 'lazyZoom',
      'notifyMaxMin' : false
    }
  };

}(Mirador));
