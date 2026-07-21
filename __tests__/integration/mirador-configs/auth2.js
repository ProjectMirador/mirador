// Import the Auth2 test fixtures as JSON modules
import auth2KioskManifest from '/__tests__/fixtures/version-3/auth2-kiosk.json' with { type: 'json' };
import auth2ActiveManifest from '/__tests__/fixtures/version-3/auth2-active.json' with { type: 'json' };

export default {
  id: 'mirador',
  // Enable debug logging for auth workflows
  window: { 
    allowFullscreen: true,
    defaultView: 'single',
    views: [
      { key: 'single', behaviors: ['individuals'] },
      { key: 'book', behaviors: ['paged'] },
    ]
  },
  // Auth configuration to support both Auth 1.0 and Auth 2.0
  auth: {
    serviceProfiles: [
      { profile: 'http://iiif.io/api/auth/1/external', external: true },
      { profile: 'http://iiif.io/api/auth/1/kiosk', kiosk: true },
      { profile: 'http://iiif.io/api/auth/1/login' },
      { profile: 'http://iiif.io/api/auth/1/clickthrough' },
      // Auth 2.0 profiles
      { profile: 'external', external: true },
      { profile: 'kiosk', kiosk: true },
      { profile: 'active' }, // This should be interactive for Auth 2.0
    ]
  },
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
    //  { manifestId: 'http://localhost:3001/bb001dq8600/iiif3/manifest' },
     { manifestId: 'https://iiif-auth2-server.herokuapp.com/manifest/02_gauguin.jpg' },
  ]
};
