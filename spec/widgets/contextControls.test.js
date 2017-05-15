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

  describe('Manipulation Controls', function() {
    beforeAll(function(){
      this.container = jQuery('<div><div class="mirador-manipulation-controls"></div></div>');
      this.eventEmitter = new Mirador.EventEmitter;
      this.state = state = new Mirador.SaveController(jQuery.extend(
        true, {}, Mirador.DEFAULT_SETTINGS, {eventEmitter: this.eventEmitter}
      ));
      this.canvasControls = {
        "annotations" : {
          "annotationLayer" : true,
          "annotationCreation" : true,
          "annotationState" : 'annoOff',
          "annotationRefresh" : false
        },
        "imageManipulation" : {
          "manipulationLayer" : true,
          "controls" : {
            "rotate" : true,
            "brightness" : true,
            "contrast" : true,
            "saturate" : true,
            "grayscale" : true,
            "invert" : true,
            "mirror" : true
          }
        }
      };
      jasmine.getFixtures().set(this.container);
    });
    it('should add manipulation controls', function() {
      spyOn(Mirador.ContextControls.prototype,'init');
      var contextControls = new Mirador.ContextControls({
        container:this.container,
        availableAnnotationStylePickers:['StrokeType'],
        canvasControls: this.canvasControls
      });
      expect(contextControls.init).toHaveBeenCalled();
      // expect(contextControls.manipulationTemplate).toHaveBeenCalled();
    });
    it('shows configured tools', function() {
      subject = new Mirador.ContextControls({
        container: this.container,
        availableAnnotationStylePickers:['StrokeType'],
        canvasControls: this.canvasControls,
        state: this.state
      });
      subject.manipulationShow();
      var availableClasses = [
        '.mirador-osd-rotate-right', '.mirador-osd-rotate-left',
        '.mirador-osd-brightness', '.mirador-osd-contrast',
        '.mirador-osd-saturation', '.mirador-osd-grayscale',
        '.mirador-osd-invert', '.mirador-osd-mirror'
      ];
      availableClasses.forEach(function(class_selector) {
        // I could not get jasmine-jquery to work here. So going at it the old
        // fashioned way
        expect(subject.container.find(class_selector).length).toBe(1)
      });
      
    });
  });

  describe('AnnotationStylePickers', function() {

    beforeAll(function(){
      this.container = jQuery('<div><div class="mirador-osd-annotation-controls"></div></div>');
      jasmine.getFixtures().set(this.container);
    });

    it('should add stroke picker',function(){
      spyOn(Mirador.ContextControls.prototype,'addStrokeStylePicker');
      var canvasControls = {
        "annotations" : {
          "annotationLayer" : true,
          "annotationCreation" : true,
          "annotationState" : 'annoOff',
          "annotationRefresh" : false
        },
        "imageManipulation" : {
          "manipulationLayer" : true,
          "controls" : {
            "rotate" : true,
            "brightness" : true,
            "contrast" : true,
            "saturate" : true,
            "grayscale" : true,
            "invert" : true
          }
        }
      };
      var contextControls = new Mirador.ContextControls({
        container:this.container,
        availableAnnotationStylePickers:['StrokeType'],
        canvasControls: canvasControls
      });

      expect(contextControls.addStrokeStylePicker).toHaveBeenCalled();
    });

  });

});
