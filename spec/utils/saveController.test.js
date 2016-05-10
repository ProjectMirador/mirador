describe('SaveController', function () {

  beforeEach(function() {
    this.config = {
      id: 'mock_viewer_id',
      saveSession: false
    }; 
  });
  
  describe('Constructor', function () {
    xit ('should fail gracefully when storage is invalid or unavailable', function () {
      // When saveSession is true and the storage module fails to initiate,
      // display proper error message to user and possibly revert to 'no save' mode.
    });
  });
  
  describe('Sanity check when saveSession == false', function () {

    beforeEach(function () {
      this.config.saveSession = false;
      this.saveController = new Mirador.SaveController(this.config);
    });

    it('should not have this.storageModule', function () {
      expect(this.saveController.storageModule).toBe(undefined);
    });

    it ('should respond to published events', function () {
      // Just making sure bindEvents() is being called.
      
      // windowUpdated
      jQuery.publish('windowUpdated', {});
      expect(this.saveController.get('windowObjects', 'currentConfig')).toEqual([{}]);
    });
  });

  describe('Sanity check when saveSession == true', function () {
    
    beforeEach(function () {
      this.config.saveSession = true;
      this.saveController = new Mirador.SaveController(this.config);
    });

    it('should have _this.storageModule', function () {
      expect(this.saveController.storageModule).toBeTruthy();
    });

    it ('should respond to published events', function () {
      // Just making sure bindEvents() is being called.
      
      // windowUpdated
      jQuery.publish('windowUpdated', {});
      expect(this.saveController.get('windowObjects', 'currentConfig')).toEqual([{}]);
    });
  });
  
  describe('Working with localStorage', function () {
    xit('should deal with localStorage', function () {
    });
  });

  describe('Working with jsonStorageEndpoint', function () {

    beforeEach(function () {
      window.Mirador.MockJsonStorege = function () {
        this.readSync = function (blobId) {
          return {
            hash_1: { id: 'stored_config_1',
              windowObjects: []
            }
          }[blobId];
        };
      };
      this.config.jsonStorageEndpoint = {
        'name': 'Mock JSON Storage Endpoint',
        'module': 'MockJsonStorege'
      };
      this.config.saveSession = true;
      history.replaceState({}, 'History replaced', '/?key=hash_1');
      
      this.saveController = new Mirador.SaveController(this.config);
    });
    
    it('should read config from storage', function () {
      expect(this.saveController.currentConfig.id).toBe('stored_config_1');
    });
  });
  
  describe('getWindowObjectById', function () {

    beforeEach(function () {
      this.config.saveSession = false;
      this.saveController = new Mirador.SaveController(this.config);
    });

    // TODO porbably should test for different values of saveSession and 
    // storage engines.
    it('should retrieve the saved window object', function () {
      this.config.saveSeesion = false;
      this.config.windowObjects = [ 
        { id: 'mock_window_1' },
        { id: 'mock_window_2' } 
      ];
      var saveController = new Mirador.SaveController(this.config);
      expect(saveController.getWindowObjectById('mock_window_1').id).toBe('mock_window_1');
      expect(saveController.getWindowObjectById('mock_window_2').id).toBe('mock_window_2');
    });
  });
  
  describe('Get and set properties', function () {
    it('should retrieve saved values', function () {
      var saveController = new Mirador.SaveController(this.config);
      
      saveController.set('key_1', 'val_1');
      saveController.set('key_2', 'val_2', { parent: 'currentConfig'});

      expect(saveController.get('key_1')).toBe('val_1');
      expect(saveController.get('key_2', 'currentConfig')).toBe('val_2');
      expect(saveController.getStateProperty('key_2')).toBe('val_2');
    });
  });
  
  describe('Event handling', function () {
    xit('should handle windowUpdated', function () {
    });

    xit('should handle imageBoundsUpdated', function () {
    });
    
    it('should handle ANNOTATIONS_LIST_UPDATED', function () {
      var saveController = new Mirador.SaveController(this.config);
      var windowId = 'mock_window_1';
      var annotationsList = [
        { '@id': 'mock_annotation_1' },
        { '@id': 'mock_annotation_2' }
      ];
      jQuery.publish('ANNOTATIONS_LIST_UPDATED', { windowId: windowId, 
        annotationsList: annotationsList });
      expect(saveController.getWindowAnnotationsList(windowId)[0]['@id']).toBe('mock_annotation_1');
      expect(saveController.getWindowAnnotationsList(windowId)[1]['@id']).toBe('mock_annotation_2');
    });
    
    xit('should handle WINDOW_ELEMENT_UPDATED', function nnn() {
    });
    
    xit('should handle windowSlotAddressUpdated', function () {
    });
    
    xit('should handle manifestQueued', function () {
    });
    
    xit('should handle slotsUpdated', function () {
    });

    xit('should handle layoutChanged', function () {
    });
    
    xit('should handle windowSlotAdded', function () {
    });
    
    xit('should handle windowsRemoved', function () {
    });
    
    xit('should handle ...etc', function () {
      // What the heck is this.
    });
  });
  
});
