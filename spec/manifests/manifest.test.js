describe('Manifest', function() {
  beforeEach(function() {
    this.server = sinon.fakeServer.create();
    this.manifestUri = 'path/to/manifest.json';
  });

  afterEach(function() {
    this.server.restore();
  });

  xit('should resolve request to true on success, and have expected data', function(done) {
    var data = {manifest : "here"};

    this.server.respondWith("GET", "path/to/manifest.json",
                            [200,
                              { "Content-Type": "application/json" },
                              JSON.stringify(data)
                            ]
                           );
                           var manifestInstance = new Mirador.Manifest(this.manifestUri);
                           this.server.respond();

                           expect(result).toBe(true);
                           expect(manifestInstance.jsonLd).toEqual(data);
                           done();
  });

  xit('resolve request to false on error', function(done) {
    var data = {manifest : "here"};

    this.server.respondWith("GET", "path/to/manifest.json",
                            [500,
                              {},
                              JSON.stringify(data)]);
                              var manifestInstance = new Mirador.Manifest(this.manifestUri);

                              expect(result).toBe(false);
                              done();

                              this.server.respond();
  });
});
