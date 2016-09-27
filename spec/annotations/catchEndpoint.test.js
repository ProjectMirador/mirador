describe('CatchEndpoint', function() {
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
      eventEmitter: this.eventEmitter
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
          "@type": "oa:SvgSelector",
          "value": "<svg xmlns='http://www.w3.org/2000/svg'><path xmlns=\"http://www.w3.org/2000/svg\" d=\"M268.95205,268.40608c65.72329,-53.76849 158.43664,-93.80806 251.59928,-93.76022l0,0l0,0c93.16264,0.04784 174.32292,37.50421 251.59928,93.76022c77.27636,56.25601 107.3127,141.97931 104.21583,226.3572c-3.09686,84.37789 -39.32693,167.41036 -104.21583,226.3572c-64.8889,58.94684 -158.43664,93.80806 -251.59928,93.76022c-93.16264,-0.04784 -185.94017,-35.00473 -251.59928,-93.76022c-65.65911,-58.7555 -104.19979,-141.3096 -104.21583,-226.3572c-0.01605,-85.0476 38.49254,-172.58871 104.21583,-226.3572z\" data-paper-data=\"{&quot;defaultStrokeValue&quot;:1,&quot;editStrokeValue&quot;:5,&quot;currentStrokeValue&quot;:1,&quot;rotation&quot;:0,&quot;deleteIcon&quot;:null,&quot;rotationIcon&quot;:null,&quot;group&quot;:null,&quot;editable&quot;:true,&quot;annotation&quot;:null}\" id=\"ellipse_8ea619e3-d548-4b84-a087-7bb7f1ffa6ce\" fill-opacity=\"0\" fill=\"#00bfff\" fill-rule=\"nonzero\" stroke=\"#00bfff\" stroke-width=\"3.38554\" stroke-linecap=\"butt\" stroke-linejoin=\"miter\" stroke-miterlimit=\"10\" stroke-dasharray=\"\" stroke-dashoffset=\"0\" font-family=\"sans-serif\" font-weight=\"normal\" font-size=\"12\" text-anchor=\"start\" style=\"mix-blend-mode: normal\"/></svg>"
        }
      },
      "@id": "51ac4477-7bcc-475d-a7bb-26112db1c230"
    };
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

  xdescribe('getAnnotationInEndpoint', function() {

  });
}); 
