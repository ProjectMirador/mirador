window.Mirador = window.Mirador || function(config) {

  // Fetch manifest, parse and render widgets from config
  Mirador.manifests = new Mirador.ManifestsLoader(config);
  // Render viewer using loaded manifests data
  Mirador.viewer = new Mirador.Viewer(config);
  
};

