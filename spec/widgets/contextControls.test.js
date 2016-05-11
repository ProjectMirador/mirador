describe('ContextControls', function() {

  beforeEach(function() {

  });

  afterEach(function() {

  });

  xdescribe('Initialization', function() {
    it('should initialize', function() {

    });
  });

  xdescribe('show', function() {

  });

  xdescribe('hide', function() {

  });

  xdescribe('bindEvents', function() {

  });

  describe('AnnotationStylePickers', function() {

    beforeAll(function(){
      this.container = jQuery('<div><div class="mirador-osd-annotation-controls"></div></div>');
      jasmine.getFixtures().set(this.container);
    });

    it('should add stroke picker',function(){
      spyOn(Mirador.ContextControls.prototype,'addStrokeStylePicker');
      var contextControls = new Mirador.ContextControls({
        container:this.container,
        availableAnnotationStylePickers:['StrokeType']
      });

      expect(contextControls.addStrokeStylePicker).toHaveBeenCalled();
    })

  });

}); 
