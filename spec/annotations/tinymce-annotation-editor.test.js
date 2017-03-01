describe('TinyMCEAnnotationBodyEditor', function() {
  var subject;

  beforeEach(function() {
    Handlebars.registerHelper('t', function(i18n_key) {
      var result = i18next.t(i18n_key);
      return new Handlebars.SafeString(result);
    });
    subject = new Mirador.TinyMCEAnnotationBodyEditor();
  });

  afterEach(function() {

  });

  describe('Initialization', function() {
    it('should initialize with provided default configs', function() {
      expect(subject.config.plugins).toBe('');
      expect(subject.config.toolbar).toBe('')
    });
    it('should initialize with new configs for TinyMCE', function() {
      var thisSubject = new Mirador.TinyMCEAnnotationBodyEditor({
        config: {
          plugins: 'all of them',
          toolbar: 'some of them'
        }
      });
      expect(thisSubject.config.plugins).toBe('all of them');
      expect(thisSubject.config.toolbar).toBe('some of them')
    })
  });

  xdescribe('show', function() {

  });

  xdescribe('isDirty', function() {

  });

  xdescribe('createAnnotation', function() {

  });

  xdescribe('updateAnnotation', function() {

  });
}); 
