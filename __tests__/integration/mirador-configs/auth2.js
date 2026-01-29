// Import the Auth2 test fixtures as JSON modules
import auth2KioskManifest from '../../../fixtures/version-3/auth2-kiosk.json' with { type: 'json' };
import auth2ActiveManifest from '../../../fixtures/version-3/auth2-active.json' with { type: 'json' };

export default {
  id: 'mirador',
  catalog: [
    // { manifestId: 'http://localhost:3000/bb001dq8600/iiif/manifest' },

  ],
  windows: [
    // location restricted audio
    //  { manifestId: 'https://purl.stanford.edu/bb099mt5053/iiif3/manifest' },
     // stanford image 
    //  { manifestId: 'https://sul-purl-stage.stanford.edu/nx825qm1785/iiif3/manifest' }
    // stanford audio CORS
    //  { manifestId: 'https://sul-purl-stage.stanford.edu/gv579fz2779/iiif3/manifest' }
     { manifestId: 'https://iiif-auth2-server.herokuapp.com/manifest/01_Icarus_Breughel.jpg' },
  ]
};
