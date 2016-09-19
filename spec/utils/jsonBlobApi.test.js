describe('JsonBlobApi', function () {
  var subject;
  beforeEach(function() {
    this.jsonBlobEndpoint = new Mirador.JSONBlobAPI({
      'ssl': true,
      'port': '443',
      'host': 'jsonblob.com'
    });
    subject = this.jsonBlobEndpoint;
  });
  
  describe('Initialization', function() {
    it('should initialize properly under defaults', function() {
      expect(true).toBe(true); //Force beforeEach() to run
    });
  });
  
  describe('readSync', function () {
    var dummyData;
    beforeEach(function() {
      dummyData = JSON.stringify({ saveState: "dummy" });
      spyOn(jQuery, 'ajax').and.callFake(function(settings) {
        settings.success(dummyData, 'success', null);
      });
    });
    it('should grab the correct blob in HTTPS', function() {
      expect(subject.readSync('dummyBlobId')).toEqual(dummyData);
      expect(jQuery.ajax).toHaveBeenCalledWith(jasmine.objectContaining({
        type: 'GET',
        url: 'https://jsonblob.com:443/api/jsonBlob/dummyBlobId',
        contentType: 'application/json; charset=UTF-8',
        accept: 'application/json',
        dataType: 'json',
        async: false,
        processData: false
      }));
    });
    it('should grab the correct blob in HTTP', function() {
      subject.options.ssl = false;
      subject.options.port = null;
      expect(subject.readSync('dummyBlobId')).toEqual(dummyData);
      expect(jQuery.ajax).toHaveBeenCalledWith(jasmine.objectContaining({
        type: 'GET',
        url: 'http://jsonblob.com:80/api/jsonBlob/dummyBlobId',
        contentType: 'application/json; charset=UTF-8',
        accept: 'application/json',
        dataType: 'json',
        async: false,
        processData: false
      }));
    });
    it('should stringify the argument', function() {
      expect(subject.readSync({ id: 'dummyBlobId' })).toEqual(dummyData);
      expect(jQuery.ajax).toHaveBeenCalledWith(jasmine.objectContaining({
        type: 'GET',
        url: 'https://jsonblob.com:443/api/jsonBlob',
        contentType: 'application/json; charset=UTF-8',
        accept: 'application/json',
        dataType: 'json',
        data: '{"id":"dummyBlobId"}',
        async: false,
        processData: false
      }));
    });
  });
  
  describe('save', function () {
    var dummyData;
    beforeEach(function() {
      dummyData = { saveState: "dummy" };
      spyOn(jQuery, 'ajax').and.callFake(function(settings) {
        setTimeout(function() {
          settings.success(dummyData, 'success', {
            getResponseHeader: jasmine.createSpy('getResponseHeader').and.returnValue('WAAHOOID')
          });
        }, 1);
      });
    });
    it('should submit properly in HTTPS', function(done) {
      var result = subject.save(dummyData),
          doneCallback = jasmine.createSpy('doneCallback');
      expect(result).toEqual(jasmine.any(Object));
      expect(jQuery.ajax).toHaveBeenCalledWith(jasmine.objectContaining({
        type: 'POST',
        url: 'https://jsonblob.com:443/api/jsonBlob',
        contentType: 'application/json; charset=UTF-8',
        accept: 'application/json',
        dataType: 'json',
        data: '{"saveState":"dummy"}',
        processData: false
      }));
      result.done(function(n) {
        expect(result.state()).toEqual('resolved');
        expect(n).toEqual('WAAHOOID');
        done();
      });
    });
    it('should submit properly in HTTP', function(done) {
      subject.options.ssl = false;
      subject.options.port = null;
      var result = subject.save(dummyData),
          doneCallback = jasmine.createSpy('doneCallback');
      expect(result).toEqual(jasmine.any(Object));
      expect(jQuery.ajax).toHaveBeenCalledWith(jasmine.objectContaining({
        type: 'POST',
        url: 'http://jsonblob.com:80/api/jsonBlob',
        contentType: 'application/json; charset=UTF-8',
        accept: 'application/json',
        dataType: 'json',
        data: '{"saveState":"dummy"}',
        processData: false
      }));
      result.done(function(n) {
        expect(result.state()).toEqual('resolved');
        expect(n).toEqual('WAAHOOID');
        done();
      });
    });
  });
});
