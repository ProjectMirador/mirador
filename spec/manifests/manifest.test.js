describe('Manifest', function() {
  beforeEach(function() {
    this.server = sinon.fakeServer.create();
    this.dfd = jQuery.Deferred();
    this.manifestUri = 'path/to/manifest.json';
  });

  afterEach(function() {
    this.server.restore();
  });

  it('resolve deferred to true on success, and have expected data', function(done) {
    var data = {manifest : "here"};

    this.server.respondWith("GET", "path/to/manifest.json",
                            [200,
                              { "Content-Type": "application/json" },
                              JSON.stringify(data)]);
   var manifestInstance = new Mirador.Manifest(this.manifestUri, this.dfd);

   this.dfd.done(function(result) {
     expect(result).toBe(true);
     expect(manifestInstance.jsonLd).toEqual(data);
     done();
   });

   this.server.respond();
  });
  
  it('resolve deferred to false on error', function(done) {
    var data = {manifest : "here"};

    this.server.respondWith("GET", "path/to/manifest.json",
                            [500,
                              {},
                              JSON.stringify(data)]);
   var manifestInstance = new Mirador.Manifest(this.manifestUri, this.dfd);

   this.dfd.done(function(result) {
     expect(result).toBe(false);
     done();
   });

   this.server.respond();
  });
});
