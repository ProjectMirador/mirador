describe('LocalStorageEndpoint', function() {
  var subject, bogusStorage;
  

  beforeEach(function() {
    bogusStorage = {};
    spyOn(localStorage, 'setItem').and.callFake(function(k, v) {
      bogusStorage[k] = v;
    });
    spyOn(localStorage, 'getItem').and.callFake(function(k) {
      return bogusStorage[k];
    });
    this.token = 'token';
    this.prefix = 'BM-';
    this.dfd = jQuery.Deferred();
    this.windowID = '380c9e54-7561-4010-a99f-f132f5dc13fd';
    this.eventEmitter = new Mirador.EventEmitter;
    this.annotationsList = [];
    this.localStorageEndpoint = new Mirador.LocalStorageEndpoint({
      token: this.token,
      prefix: this.prefix,
      dfd: this.dfd,
      windowID: this.windowID,
      eventEmitter: this.eventEmitter,
      annotationsList: this.annotationsList
    });
    subject = this.localStorageEndpoint;
  });

  afterEach(function() {
    delete this.localStorageEndpoint;
  });

  describe('Initialization', function() {
    it('should initialize with defaults', function() {
      expect(true).toBe(true); //Force beforeEach() setup to run
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

  describe('search', function() {
    var successCallback, errorCallback, dummyList;
    beforeEach(function() {
      successCallback = jasmine.createSpy('successCallback');
      errorCallback = jasmine.createSpy('errorCallback');
      dummyList = [
        {'@id':'A', "on": { full: 'http://0.0.0.0/A' }}, 
        {'@id':'B', "on": { full: 'http://0.0.0.0/B' }}
      ];
    });
    it('should resolve the DFD when successful without a callback', function() {
      spyOn(subject, 'getAnnotationList').and.returnValue(dummyList);
      expect(subject.dfd.state()).not.toEqual('resolved');
      subject.search({uri: "ABC"});
      expect(subject.dfd.state()).toEqual('resolved');
    });
    it('should run the success callback when successful', function() {
      spyOn(subject, 'getAnnotationList').and.returnValue(dummyList);
      subject.search({uri: "ABC"}, successCallback, errorCallback);
      expect(successCallback).toHaveBeenCalledWith(dummyList);
      expect(errorCallback).not.toHaveBeenCalled();
    });
    it('should show a console message when unsuccessful without a callback', function() {
      spyOn(console, 'log');
      spyOn(subject, 'getAnnotationList').and.throwError('fail');
      subject.search({uri: "ABC"});
      expect(console.log).toHaveBeenCalledWith('There was an error searching this endpoint');
    });
    it('should run the error callback when unsuccessful', function() {
      spyOn(subject, 'getAnnotationList').and.throwError('fail');
      subject.search({uri: "ABC"}, successCallback, errorCallback);
      expect(successCallback).not.toHaveBeenCalled();
      expect(errorCallback).toHaveBeenCalled();
    });
  });

  describe('deleteAnnotation', function() {
    var successCallback, errorCallback;
    beforeEach(function() {
      successCallback = jasmine.createSpy('successCallback');
      errorCallback = jasmine.createSpy('errorCallback');
      subject.annotationsList = [
        {'@id':'A', "on": { full: 'http://0.0.0.0/A' }}, 
        {'@id':'B', "on": { full: 'http://0.0.0.0/B' }}
      ];
    });
    it('should update the virtual annotations list when successful without a callback', function() {
      subject.deleteAnnotation('B');
      expect(subject.annotationsList.length).toEqual(1);
      expect(subject.annotationsList[0]).toEqual(jasmine.objectContaining({'@id':'A', "on": { full: 'http://0.0.0.0/A' }}));
    });
    it('should run the success callback when successful', function() {
      subject.deleteAnnotation('B', successCallback, errorCallback);
      expect(successCallback).toHaveBeenCalled();
      expect(errorCallback).not.toHaveBeenCalled();
    });
    it('should run the error callback when unsuccessful', function() {
      spyOn(jQuery, 'grep').and.throwError('fail');
      subject.deleteAnnotation('B', successCallback, errorCallback);
      expect(successCallback).not.toHaveBeenCalled();
      expect(errorCallback).toHaveBeenCalled();
    });
  });

  describe('update', function() {
    var successCallback, errorCallback, updated;
    beforeEach(function() {
      successCallback = jasmine.createSpy('successCallback');
      errorCallback = jasmine.createSpy('errorCallback');
      updated = {'@id':'A', edited: true, "on": { full: 'http://0.0.0.0/A' }};
      subject.annotationsList = [
        {'@id':'A', "on": { full: 'http://0.0.0.0/A' }}, 
        {'@id':'B', "on": { full: 'http://0.0.0.0/B' }}
      ];
    });
    it('should grab the new annotations list if the current one is empty', function() {
      subject.annotationsList = [];
      spyOn(subject, 'getAnnotationList').and.returnValue([
        {'@id':'A', "on": { full: 'http://0.0.0.0/A' }}, 
        {'@id':'B', "on": { full: 'http://0.0.0.0/B' }}
      ]);
      subject.update(updated);
      expect(subject.annotationsList.length).toEqual(2);
      expect(subject.annotationsList[0]).toEqual(jasmine.objectContaining({'@id':'A', edited: true, "on": { full: 'http://0.0.0.0/A' }}));
    });
    it('should resolve the virtual annotations list  when successful without a callback', function() {
      subject.update(updated);
      expect(subject.annotationsList.length).toEqual(2);
      expect(subject.annotationsList[0]).toEqual(jasmine.objectContaining({'@id':'A', edited: true, "on": { full: 'http://0.0.0.0/A' }}));
    });
    it('should run the success callback when successful', function() {
      subject.update(updated, successCallback, errorCallback);
      expect(successCallback).toHaveBeenCalledWith(jasmine.objectContaining(updated));
      expect(errorCallback).not.toHaveBeenCalled();
    });
    it('should run the error callback when unsuccessful', function() {
      spyOn(JSON, 'stringify').and.throwError('fail');
      subject.update(updated, successCallback, errorCallback);
      expect(successCallback).not.toHaveBeenCalled();
      expect(errorCallback).toHaveBeenCalled();
    });
  });

  describe('create', function() {
    var successCallback, errorCallback, new_anno, created;
    beforeEach(function() {
      spyOn(Mirador, 'genUUID').and.returnValue('ultra-waahoo');
      successCallback = jasmine.createSpy('successCallback');
      errorCallback = jasmine.createSpy('errorCallback');
      new_anno = { "on": { full: 'http://0.0.0.0/B' }};
      created = { '@id': 'ultra-waahoo', "on": { full: 'http://0.0.0.0/B' }};
      subject.annotationsList = [
        {'@id':'A', "on": { full: 'http://0.0.0.0/A' }}
      ];
    });
    it('should grab the new annotations list if the current one is empty', function() {
      subject.annotationsList = [];
      spyOn(subject, 'getAnnotationList').and.returnValue([
        {'@id':'A', "on": { full: 'http://0.0.0.0/A' }}
      ]);
      subject.create(new_anno);
      expect(subject.annotationsList.length).toEqual(2);
      expect(subject.annotationsList[1]).toEqual(jasmine.objectContaining(created));
    });
    it('should resolve the virtual annotations list  when successful without a callback', function() {
      subject.create(new_anno);
      expect(subject.annotationsList.length).toEqual(2);
      expect(subject.annotationsList[1]).toEqual(jasmine.objectContaining(created));
    });
    it('should run the success callback when successful', function() {
      subject.create(new_anno, successCallback, errorCallback);
      expect(successCallback).toHaveBeenCalledWith(jasmine.objectContaining(created));
      expect(errorCallback).not.toHaveBeenCalled();
    });
    it('should run the error callback when unsuccessful', function() {
      spyOn(JSON, 'stringify').and.throwError('fail');
      subject.create(new_anno, successCallback, errorCallback);
      expect(successCallback).not.toHaveBeenCalled();
      expect(errorCallback).toHaveBeenCalled();
    });
  });

  describe('getAnnotationList', function() {
    it('should start empty if no existing data is found', function() {
      expect(subject.getAnnotationList('brand_new')).toEqual([]);
    });
    it('should parse the existing data if found', function() {
      localStorage.setItem('my_annotations', '[{"data":"junk"}]');
      expect(subject.getAnnotationList('my_annotations')).toEqual([{data:"junk"}]);
    });
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
