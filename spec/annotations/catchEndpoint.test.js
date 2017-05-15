// TODO: Please fix CatchEndpoints's getAnnotationEndpoint as you see fit.
// An older version of this test used to work in 2.1.3.
// Please also verify the shims in the initial beforeEach() for appropriateness.
xdescribe('CatchEndpoint', function() {
  var subject, ajaxSuccess, ajaxData, annotation;
  
  beforeEach(function() {
    this.token = 'token';
    this.prefix = 'http://catch.myexample.net';
    this.dfd = jQuery.Deferred();
    this.annotationsList = [];
    this.windowID = '380c9e54-7561-4010-a99f-f132f5dc13fd';
    this.eventEmitter = new Mirador.EventEmitter;
    this.catchEndpoint = new Mirador.CatchEndpoint({
      token: this.token,
      prefix: this.prefix,
      dfd: this.dfd,
      annotationsList: this.annotationsList,
      windowID: this.windowID,
      eventEmitter: this.eventEmitter,
    });
    subject = this.catchEndpoint;
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
    annotation = {
      "@context": "http://iiif.io/api/presentation/2/context.json",
      "@type": "oa:Annotation",
      "motivation": [
        "oa:commenting", "oa:tagging"
      ],
      "resource": [
        {
          "@type": "dctypes:Text",
          "format": "text/html",
          "chars": "<p>Cell</p>"
        },
        {
          "@type": "oa:Tag",
          "chars": "Example"
        },
      ],
      "on": {
        "@type": "oa:SpecificResource",
        "full": "http://wellcomelibrary.org/iiif/b18035723/canvas/c4",
        "selector": {
          "@type": "oa:Choice",
          "default": {
            "@type": "oa:FragmentSelector",
            "value": "xywh=1000,219,198,148"
          },
          "item": {
            "@type": "oa:SvgSelector",
            "value": "<svg xmlns='http://www.w3.org/2000/svg'><path xmlns=\"http://www.w3.org/2000/svg\" d=\"M1000.24213,219.15375l98.78935,0l0,0l98.78935,0l0,74.09201l0,74.09201l-98.78935,0l-98.78935,0l0,-74.09201z\" data-paper-data=\"{&quot;defaultStrokeValue&quot;:1,&quot;editStrokeValue&quot;:5,&quot;currentStrokeValue&quot;:5,&quot;rotation&quot;:0,&quot;annotation&quot;:null,&quot;editable&quot;:true}\" id=\"rectangle_7e2b56fa-b18b-4d09-a575-0bb19f560b56\" fill-opacity=\"0\" fill=\"#00bfff\" fill-rule=\"nonzero\" stroke=\"#00bfff\" stroke-width=\"30.87167\" stroke-linecap=\"butt\" stroke-linejoin=\"miter\" stroke-miterlimit=\"10\" stroke-dasharray=\"\" stroke-dashoffset=\"0\" font-family=\"sans-serif\" font-weight=\"normal\" font-size=\"12\" text-anchor=\"start\" style=\"mix-blend-mode: normal\"/></svg>"
          }
        }
      },
      "@id": "51ac4477-7bcc-475d-a7bb-26112db1c230"
    };
    // Shims for PhantomJS 2.1.1: Please evaluate
    // Shim for missing implementation of Array.prototype.forEach in PhantomJS 2.1.1
    if (typeof annotation.on.forEach === 'undefined') {
      annotation.on.forEach = function(f) {
        var _this = this;
        jQuery.each(_this, function(k, v) {
          f(v, k, _this);
        });
      }
    }
    // Shim for _this.imagesList references in catchEndpoint
    subject.imagesList = [{}];
    spyOn(Mirador, 'getImageIndexById').and.returnValue(0);
    spyOn(Mirador, 'getThumbnailForCanvas').and.returnValue('http://www.example.org/iiif/0123456/full/full/0/default.jpg');
  });

  afterEach(function() {
    delete this.catchEndpoint;
  });

  describe('Initialization', function() {
    it('should initialize', function() {
      expect(true).toBe(true); // Force beforeEach setup to run
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
    var successCallback, errorCallback;
    beforeEach(function() {
      successCallback = jasmine.createSpy('successCallback');
      errorCallback = jasmine.createSpy('errorCallback');
      subject.annotationsList = [];
      spyOn(subject, 'getAnnotationInOA').and.callFake(function(val) {
        return "oa:" + val;
      });
      ajaxData = {
        rows: ['a','b','c']
      };
    });
    it('should run callback on success if provided', function() {
      subject.search({}, successCallback, errorCallback);
      expect(successCallback).toHaveBeenCalledWith(ajaxData);
      expect(errorCallback).not.toHaveBeenCalled();
    });
    it('should update internal annotation list if provided', function() {
      expect(subject.dfd.state()).not.toEqual('resolved');
      spyOn(subject.eventEmitter, 'publish');
      subject.search({});
      expect(successCallback).not.toHaveBeenCalled();
      expect(errorCallback).not.toHaveBeenCalled();
      expect(subject.dfd.state()).toEqual('resolved');
      expect(subject.annotationsList).toEqual(['oa:a', 'oa:b', 'oa:c']);
      expect(subject.eventEmitter.publish).toHaveBeenCalledWith('catchAnnotationsLoaded.'+this.windowID, subject.annotationsListCatch);
      
    });
    it('should add console log on failure with no callback given', function() {
      ajaxSuccess = false;
      spyOn(console, 'log');
      subject.search({});
      expect(successCallback).not.toHaveBeenCalled();
      expect(errorCallback).not.toHaveBeenCalled();
      expect(console.log).toHaveBeenCalledWith("There was an error searching this endpoint");
    });
    it('should run callback on failure if provided', function() {
      ajaxSuccess = false;
      subject.search({}, successCallback, errorCallback);
      expect(successCallback).not.toHaveBeenCalled();
      expect(errorCallback).toHaveBeenCalled();
    });
  });

  describe('deleteAnnotation', function() {
    var successCallback, errorCallback;
    beforeEach(function() {
      successCallback = jasmine.createSpy('successCallback');
      errorCallback = jasmine.createSpy('errorCallback');
    });
    it('should run callback and fire event on success', function() {
      spyOn(subject.eventEmitter, 'publish');
      subject.deleteAnnotation('123', successCallback, errorCallback);
      expect(successCallback).toHaveBeenCalled();
      expect(errorCallback).not.toHaveBeenCalled();
      expect(subject.eventEmitter.publish).toHaveBeenCalledWith('catchAnnotationDeleted.'+this.windowID, '123');
    });
    it('should run callback on failure', function() {
      ajaxSuccess = false;
      subject.deleteAnnotation('ABC', successCallback, errorCallback);
      expect(successCallback).not.toHaveBeenCalled();
      expect(errorCallback).toHaveBeenCalled();
    });
  });

  describe('update', function() {
    var successCallback, errorCallback;
    beforeEach(function() {
      successCallback = jasmine.createSpy('successCallback');
      errorCallback = jasmine.createSpy('errorCallback');
    });
    it('should run callback and fire event on success', function() {
      spyOn(subject.eventEmitter, 'publish');
      subject.update(annotation, successCallback, errorCallback);
      expect(successCallback).toHaveBeenCalled();
      expect(errorCallback).not.toHaveBeenCalled();
      expect(subject.eventEmitter.publish).toHaveBeenCalledWith('catchAnnotationUpdated.'+this.windowID, jasmine.any(Object));
    });
    it('should run callback on failure', function() {
      ajaxSuccess = false;
      subject.update(annotation, successCallback, errorCallback);
      expect(successCallback).not.toHaveBeenCalled();
      expect(errorCallback).toHaveBeenCalled();
    });
  });

  describe('create', function() {
    var successCallback, errorCallback;
    beforeEach(function() {
      successCallback = jasmine.createSpy('successCallback');
      errorCallback = jasmine.createSpy('errorCallback');
    });
    it('should run callback and fire event on success', function() {
      spyOn(subject.eventEmitter, 'publish');
      ajaxData = jQuery.extend(true, {
        id: '1234567890'
      }, subject.getAnnotationInEndpoint(annotation));
      subject.create(annotation, successCallback, errorCallback);
      expect(successCallback).toHaveBeenCalledWith(jasmine.any(Object));
      expect(errorCallback).not.toHaveBeenCalled();
      expect(subject.eventEmitter.publish).toHaveBeenCalledWith('catchAnnotationCreated.'+this.windowID, jasmine.any(Object));
    });
    it('should run callback on failure', function() {
      ajaxSuccess = false;
      subject.create(annotation, successCallback, errorCallback);
      expect(successCallback).not.toHaveBeenCalled();
      expect(errorCallback).toHaveBeenCalled();
    });
  });

  describe('userAuthorize', function() {
    var catchAnnotation;
    beforeEach(function() {
      catchAnnotation = subject.getAnnotationInEndpoint(annotation);
    });
    describe('Instructor', function() {
      beforeEach(function() {
        subject.roles = ['Instructor'];
      });
      it('should have full access', function() {
        expect(subject.userAuthorize('admin', catchAnnotation)).toBe(true);
      });
    });
    describe('Administrator', function() {
      beforeEach(function() {
        subject.roles = ['Administrator'];
      });
      it('should have full access', function() {
        expect(subject.userAuthorize('admin', catchAnnotation)).toBe(true);
      });
    });
    describe('Regular users', function() {
      beforeEach(function() {
        subject.userid = 'student1';
      });
      it('should be allowed access to permission-free annotations', function() {
        delete catchAnnotation.permissions;
        delete catchAnnotation.user;
        expect(subject.userAuthorize('admin', catchAnnotation)).toBe(true);
      });
      it('should be allowed access to actions not explicitly set (e.g. read)', function() {
        catchAnnotation.permissions.read = [];
        expect(subject.userAuthorize('read', catchAnnotation)).toBe(true);
      });
      it('should be allowed access to annotations where the user is whitelisted', function() {
        catchAnnotation.permissions.admin = ['student2', subject.userid];
        expect(subject.userAuthorize('admin', catchAnnotation)).toBe(true);
      });
      it('should be denied access to annotations where the user is not whitelisted', function() {
        catchAnnotation.permissions.admin = ['student2'];
        expect(subject.userAuthorize('admin', catchAnnotation)).toBe(false);
      });
      it('should be allowed access to own annotations', function() {
        delete catchAnnotation.permissions;
        catchAnnotation.user.userid = subject.userid;
        expect(subject.userAuthorize('admin', catchAnnotation)).toBe(true);
      });
      it('should be denied access to annotations owned by others', function() {
        delete catchAnnotation.permissions;
        catchAnnotation.user.userid = 'student2';
        expect(subject.userAuthorize('admin', catchAnnotation)).toBe(false);
      });
    });
  });

  xdescribe('getAnnotationInOA', function() {

  });

  describe('getAnnotationInEndpoint', function() {
    it('should convert the example in this test properly', function() {
      expect(subject.getAnnotationInEndpoint(annotation)).not.toBeUndefined();
    });
  });
}); 
