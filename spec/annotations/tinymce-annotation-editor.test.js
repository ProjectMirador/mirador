describe('TinyMCEAnnotationBodyEditor', function() {
  var subject;
  beforeEach(function() {
    jQuery('body').append('<div id="mycontainer"></div>');
    this.sandbox = jQuery('#mycontainer');
    this.annotation = {
      "@context": "http://iiif.io/api/presentation/2/context.json",
      "@type": "oa:Annotation",
      "motivation": [
        "oa:commenting"
      ],
      "resource": [
        {
          "@type": "dctypes:Text",
          "format": "text/html",
          "chars": "<p>Waahoo</p>"
        },
        {
          "@type": "oa:Tag",
          "chars": "tagged"
        },
        {
          "@type": "oa:Tag",
          "chars": "silly"
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
    this.windowId = '380c9e54-7561-4010-a99f-f132f5dc13fd';
    this.tinyMce = new Mirador.TinyMCEAnnotationBodyEditor({
      annotation: this.annotation,
      windowId: this.windowId
    });
    subject = this.tinyMce;
    subject.show('#mycontainer');
  });

  afterEach(function() {
    delete this.tinyMce;
    $('body').html('');
  });
  
  // TODO: Find a way to trigger init event
  describe('Initialization', function() {
    it('should initialize', function() {
      expect(true).toBe(true); //Force beforeEach() setup to run
      expect(this.sandbox.find('.text-editor').val()).toEqual('<p>Waahoo</p>');
      expect(this.sandbox.find('.tags-editor').val()).toEqual('tagged silly');
    });
    it('should initialize with legacy annotations', function() {
      this.annotation.resource = {
        "@type": "dctypes:Text",
        "format": "text/plain",
        "chars": "Old stuff"
      };
      var legacyTinyMce = new Mirador.TinyMCEAnnotationBodyEditor({
        annotation: this.annotation,
        windowId: this.windowId
      });
      legacyTinyMce.show('#mycontainer');
      expect(this.sandbox.find('.text-editor').val()).toEqual('Old stuff');
    });
  });
  
  // TODO: Find a way to get tinymce.activeEditor without stubbing
  describe('isDirty', function() {
    var dirty;
    beforeEach(function() {
      tinymce.activeEditor = {
        isDirty: jasmine.createSpy('isDirty').and.callFake(function() {
          return dirty;
        })
      };
    });
    it('should return dirtiness when true', function() {
      dirty = true;
      expect(subject.isDirty()).toBe(true);
    });
    it('should return dirtiness when false', function() {
      dirty = false;
      expect(subject.isDirty()).toBe(false);
    });
  });

  // TODO: Find a way to get tinymce.activeEditor without stubbing
  describe('createAnnotation', function() {
    beforeEach(function() {
      var _this = this;
      tinymce.activeEditor = {
        getContent: jasmine.createSpy('getContent').and.callFake(function() {
          return _this.sandbox.find('.text-editor').val();
        })
      };
    });
    it('should create a full annotation', function() {
      this.sandbox.find('.text-editor').val('Sample annotation');
      this.sandbox.find('.tags-editor').val('tag nags');
      expect(subject.createAnnotation()).toEqual({
        "@context": "http://iiif.io/api/presentation/2/context.json",
        "@type": "oa:Annotation",
        "motivation": ['oa:tagging', 'oa:commenting'],
        "resource": [
          {
            "@type": "oa:Tag",
            "chars": "tag"
          },
          {
            "@type": "oa:Tag",
            "chars": "nags"
          },
          {
            "@type": "dctypes:Text",
            "format": "text/html",
            "chars": "Sample annotation"
          }
        ]
      });
    });
  });

  // TODO: Find a way to get tinymce.activeEditor without stubbing
  describe('updateAnnotation', function() {
    beforeEach(function() {
      var _this = this;
      tinymce.activeEditor = {
        getContent: jasmine.createSpy('getContent').and.callFake(function() {
          return _this.sandbox.find('.text-editor').val();
        })
      };
    });
    it('should update the given annotation', function() {
      var oaAnno = {
        "@context": "http://iiif.io/api/presentation/2/context.json",
        "@type": "oa:Annotation",
        "motivation": ['oa:commenting'],
        "resource": [{
          "@type": "dctypes:Text",
          "format": "text/html",
          "chars": "Sample annotation"
        }]
      };
      this.sandbox.find('.text-editor').val('Sample annotation 2');
      this.sandbox.find('.tags-editor').val('tag2 nags2');
      subject.updateAnnotation(oaAnno);
      expect(oaAnno).toEqual({
        "@context": "http://iiif.io/api/presentation/2/context.json",
        "@type": "oa:Annotation",
        "motivation": ['oa:commenting', 'oa:tagging'],
        "resource": [
          {
            "@type": "dctypes:Text",
            "format": "text/html",
            "chars": "Sample annotation 2"
          },
          {
            "@type": "oa:Tag",
            "chars": "tag2"
          },
          {
            "@type": "oa:Tag",
            "chars": "nags2"
          }
        ]
      });
    });
  });
}); 
