describe('SimpleASEndpoint', function() {
  var subject, ajaxSuccess, ajaxData, endpointOpts;

  beforeEach(function() {
    this.dfd = jQuery.Deferred();
    endpointOpts = {
      url:'test',
      userid:'1',
      dfd: this.dfd
    };
    this.endpoint = new Mirador.SimpleASEndpoint(endpointOpts);
    subject = this.endpoint;
    ajaxSuccess = true;
    ajaxData = null;
    spyOn(jQuery, 'ajax').and.callFake(function(args) {
      if (ajaxSuccess) {
        if (typeof args.success === 'function') args.success(ajaxData);
      }
      else {
        if (typeof args.error === 'function') args.error(ajaxData);
      }
    });
  });

  afterEach(function() {
    delete this.endpoint;
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

  describe('search', function() {
    var successCallback, errorCallback, genUuidCounter;
    beforeEach(function() {
      successCallback = jasmine.createSpy('successCallback');
      errorCallback = jasmine.createSpy('errorCallback');
      subject.annotationsList = [];
      ajaxData = [
        { '@id': 'AAA' },
        { '@id': 'BBB' }
      ];
      genUuidCounter = 0;
      spyOn(Mirador, 'genUUID').and.callFake(function() {
        return 'uuid' + genUuidCounter++;
      });
    });
    it('should run callback on success if provided', function() {
      subject.search({}, successCallback, errorCallback);
      expect(successCallback).toHaveBeenCalledWith(ajaxData);
      expect(errorCallback).not.toHaveBeenCalled();
    });
    it('should update internal annotation list if provided', function() {
      expect(subject.dfd.state()).not.toEqual('resolved');
      subject.search({});
      expect(successCallback).not.toHaveBeenCalled();
      expect(errorCallback).not.toHaveBeenCalled();
      expect(subject.dfd.state()).toEqual('resolved');
      expect(subject.annotationsList).toEqual(ajaxData);
      expect(subject.idMapper.uuid0).toEqual('AAA');
      expect(subject.idMapper.uuid1).toEqual('BBB');
    });
    it('should add console log on failure with no callback given', function() {
      ajaxSuccess = false;
      spyOn(console, 'log');
      subject.search({uri: "http://sas.example.net"});
      expect(successCallback).not.toHaveBeenCalled();
      expect(errorCallback).not.toHaveBeenCalled();
      expect(console.log).toHaveBeenCalledWith("The request for annotations has caused an error for endpoint: http://sas.example.net due to undefined");
    });
    it('should run callback on failure if provided', function() {
      ajaxSuccess = false;
      subject.search({}, successCallback, errorCallback);
      expect(successCallback).not.toHaveBeenCalled();
      expect(errorCallback).toHaveBeenCalled();
    });
  });

  describe('deleteAnnotations', function() {
    var returnSuccess, returnError;
    beforeEach(function() {
      subject.idMapper = {
        'uuid0': 'AAA',
        'uuid1': 'BBB'
      };
      subject.annotationsList = [
        { '@id': 'AAA' },
        { '@id': 'BBB' }
      ];
      returnSuccess = jasmine.createSpy('returnSuccess');
      returnError = jasmine.createSpy('returnError');
    });
    it('should run callback on success', function() {
      subject.deleteAnnotation('uuid0', returnSuccess, returnError);
      expect(jQuery.ajax).toHaveBeenCalledWith(jasmine.objectContaining({
        url: subject.url + "/destroy?uri=AAA&APIKey=" + subject.APIKey,
        type: 'DELETE'
      }));
      expect(returnSuccess).toHaveBeenCalled();
      expect(returnError).not.toHaveBeenCalled();
    });
    it('should run callback on failure', function() {
      ajaxSuccess = false;
      subject.deleteAnnotation('uuid1', returnSuccess, returnError);
      expect(jQuery.ajax).toHaveBeenCalledWith(jasmine.objectContaining({
        url: subject.url + "/destroy?uri=BBB&APIKey=" + subject.APIKey,
        type: 'DELETE'
      }));
      expect(returnSuccess).not.toHaveBeenCalled();
      expect(returnError).toHaveBeenCalled();
    });
  });

  describe('update', function() {
    var returnSuccess, returnError, oaAnnotation;
    beforeEach(function() {
      returnSuccess = jasmine.createSpy('returnSuccess');
      returnError = jasmine.createSpy('returnError');
      oaAnnotation = {
        '@id': 'uuid0',
        fullId: 'AAA',
        endpoint: {}
      };
    });
    it('should run callback on success', function() {
      subject.update(oaAnnotation, returnSuccess, returnError);
      expect(jQuery.ajax).toHaveBeenCalledWith(jasmine.objectContaining({
        url: subject.url + "/update?APIKey=" + subject.APIKey,
        type: 'POST'
      }));
      expect(returnSuccess).toHaveBeenCalled();
      expect(returnError).not.toHaveBeenCalled();
      expect(oaAnnotation.endpoint).toEqual(subject);
    });
    it('should run callback on failure', function() {
      ajaxSuccess = false;
      subject.update(oaAnnotation, returnSuccess, returnError);
      expect(jQuery.ajax).toHaveBeenCalledWith(jasmine.objectContaining({
        url: subject.url + "/update?APIKey=" + subject.APIKey,
        type: 'POST'
      }));
      expect(returnSuccess).not.toHaveBeenCalled();
      expect(returnError).toHaveBeenCalled();
    });
  });

  describe('create', function() {
    var returnSuccess, returnError, oaAnnotation;
    beforeEach(function() {
      returnSuccess = jasmine.createSpy('returnSuccess');
      returnError = jasmine.createSpy('returnError');
      oaAnnotation = {
        fullId: 'AAA',
        endpoint: {}
      };
    });
    it('should run callback on success', function() {
      ajaxData = {
        '@id': 'nuevo',
      };
      subject.create(oaAnnotation, returnSuccess, returnError);
      expect(jQuery.ajax).toHaveBeenCalledWith(jasmine.objectContaining({
        url: subject.url + "/create?APIKey=" + subject.APIKey,
        type: 'POST'
      }));
      expect(returnSuccess).toHaveBeenCalledWith(ajaxData);
      expect(returnError).not.toHaveBeenCalled();
      expect(ajaxData.endpoint).toEqual(subject);
    });
    it('should run callback on failure', function() {
      ajaxSuccess = false;
      subject.create(oaAnnotation, returnSuccess, returnError);
      expect(jQuery.ajax).toHaveBeenCalledWith(jasmine.objectContaining({
        url: subject.url + "/create?APIKey=" + subject.APIKey,
        type: 'POST'
      }));
      expect(returnSuccess).not.toHaveBeenCalled();
      expect(returnError).toHaveBeenCalled();
    });
  });

  describe('set', function() {
    it('should set the property to the value with 2 arguments', function() {
      subject.set('waahoo', 'xekko');
      expect(subject.waahoo).toEqual('xekko');
    });
    it('should set the sub-property to the value with 3 arguments', function() {
      subject.set(0, 'xekko', { parent: 'annotationsList' });
      expect(subject.annotationsList[0]).toEqual('xekko');
    })
  });

  describe('userAuthorize', function() {
    it('should let everyone through for now', function() {
      expect(subject.userAuthorize('read', {})).toBe(true);
      expect(subject.userAuthorize('create', {})).toBe(true);
      expect(subject.userAuthorize('update', {})).toBe(true);
      expect(subject.userAuthorize('delete', {})).toBe(true);
      expect(subject.userAuthorize('admin', {})).toBe(true);
    });
  });
});
