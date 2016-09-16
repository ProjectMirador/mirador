describe('SimpleASEndpoint', function() {

  var endpointOpts = {
    url:'test',
    userid:'1'
  };


  beforeEach(function() {

    this.endpoint  = new Mirador.SimpleASEndpoint(endpointOpts);

  });

  afterEach(function() {

  });

  describe('Initialization', function() {
    it('should initialize', function() {

      expect(this.endpoint.catchOptions).toBeDefined();
      expect(this.endpoint.catchOptions.user.id).toBe(endpointOpts.userid);

      expect(this.endpoint.catchOptions.permissions.read.length).toBe(0);
      expect(this.endpoint.catchOptions.permissions.update).toContain(endpointOpts.userid);
      expect(this.endpoint.catchOptions.permissions.delete).toContain(endpointOpts.userid);
      expect(this.endpoint.catchOptions.permissions.admin).toContain(endpointOpts.userid);
    });
  });

  xdescribe('search', function() {

  });

  xdescribe('deleteAnnotations', function() {

  });

  xdescribe('update', function() {

  });

  xdescribe('create', function() {

  });

  xdescribe('set', function() {

  });

  xdescribe('userAuthorize', function() {

  });
}); 
