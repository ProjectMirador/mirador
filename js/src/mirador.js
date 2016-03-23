window.Mirador = window.Mirador || function(config) {

  // pass the config through the save and restore process,
  // returning the config that will, in fact, populate the
  // application.
  Mirador.saveController = new Mirador.SaveController(config);

  //config = Mirador.saveController.currentConfig;

  // initialise application 
  Mirador.viewer = new Mirador.Viewer({'state' : Mirador.saveController});
};
