describe("saveController", function() {

  beforeEach(function() {
    this.config = {
      id: 'viewer',
      layout: "1x2",
      data: [{
        "manifestUri": "spec/data/manifest.json",
        "location": "Stanford University",
        "title": "MS 5",
        "widgets": []
      }],
    }; 
  });
  
  describe('saveSession == false', function() {

    beforeEach(function() {
      this.config.saveSession = false;
      this.saveController = new Mirador.SaveController(this.config);
    });

    it("should not have _this.storageModule", function() {
      expect(this.saveController.storageModule).toBe(undefined);

    });

    it("should not have a URL with hash", function() {
      expect(window.location.hash).toBeFalsy();
    });

    it ("should respond to published events", function() {

      // windowUpdated
      jQuery.publish("windowUpdated", {});
      expect(this.saveController.get("windowObjects", 'currentConfig')).toEqual([{}]);

      // imageBoundsUpdated
      //
      // ANNOTATIONS_LIST_UPDATED
      //
      // ...
    });
  });

  describe('saveSession == true', function() {

    beforeEach(function() {
      this.config.saveSession = true;
      this.saveController = new Mirador.SaveController(this.config);
    });

    it("should have _this.storageModule", function() {
      expect(this.saveController.storageModule).toBeTruthy();
    });

    it("should have a URL with hash", function() {
      expect(window.location.hash).toBeTruthy();
    });

    it ("should respond to published events", function() {

      // windowUpdated
      jQuery.publish("windowUpdated", {});
      expect(this.saveController.get("windowObjects", 'currentConfig')).toEqual([{}]);

      // imageBoundsUpdated
      //
      // ANNOTATIONS_LIST_UPDATED
      //
      // ...
    });

  });

  describe('default settings set to undefined', function() {

    beforeEach(function() {
      // clear $.DEFAULT_SETTINGS
      window.Mirador.DEFAULT_SETTINGS = {};
      this.config.jsonStorageEndpoint = {
        'name': 'JSONBlob API Endpoint',
        'module': 'JSONBlobAPI',
        'options': {
          'ssl': true,
          'port': '443',
          'host': 'jsonblob.com'
        }
      };
      this.config.saveSession = true;
      this.saveController = new Mirador.SaveController(this.config);
    });

    it("should have _this.storageModule", function() {
      expect(this.saveController.storageModule).toBeTruthy();

    });

    it("should have a URL with hash", function() {
      expect(window.location.hash).toBeTruthy();
    });

    it ("should respond to published events", function() {

      // windowUpdated
      jQuery.publish("windowUpdated", {});
      expect(this.saveController.get("windowObjects", 'currentConfig')).toEqual([{}]);

      // imageBoundsUpdated
      //
      // ANNOTATIONS_LIST_UPDATED
      //
      // ...
    });
  });
});
