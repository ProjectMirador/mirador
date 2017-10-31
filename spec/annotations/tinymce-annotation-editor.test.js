describe('TinyMCEAnnotationBodyEditor', function() {
  var subject;
  beforeEach(function() {
    jQuery('body').append('<div id="mycontainer"></div>');
    tinymce = jasmine.createSpyObj('tinymce', ['init']);
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
      "on": [{
        "@type": "oa:SpecificResource",
        "full": "https://oculus-dev.harvardx.harvard.edu/manifests/huam:320567/canvas/canvas-10466656.json",
        "selector": {
          "@type": "oa:Choice",
          "default": {
            "@type": "oa:FragmentSelector",
            "value": "xywh=1000,219,198,148"
          },
          "item": {
            "@type": "oa:SvgSelector",
            "value": "<svg xmlns='http://www.w3.org/2000/svg'><path xmlns=\"http://www.w3.org/2000/svg\" d=\"M1000.24213,219.15375l98.78935,0l0,0l98.78935,0l0,74.09201l0,74.09201l-98.78935,0l-98.78935,0l0,-74.09201z\" data-paper-data=\"{&quot;strokeWidth&quot;:1,&quot;rotation&quot;:0,&quot;annotation&quot;:null,&quot;editable&quot;:true}\" id=\"rectangle_7e2b56fa-b18b-4d09-a575-0bb19f560b56\" fill-opacity=\"0\" fill=\"#00bfff\" fill-rule=\"nonzero\" stroke=\"#00bfff\" stroke-width=\"30.87167\" stroke-linecap=\"butt\" stroke-linejoin=\"miter\" stroke-miterlimit=\"10\" stroke-dasharray=\"\" stroke-dashoffset=\"0\" font-family=\"sans-serif\" font-weight=\"normal\" font-size=\"12\" text-anchor=\"start\" style=\"mix-blend-mode: normal\"/></svg>"
          }
        },
        "within": {
          "@id": "https://oculus-dev.harvardx.harvard.edu/manifests/huam:320567",
          "@type": "sc:Manifest"
        }
      }],
      "@id": "51ac4477-7bcc-475d-a7bb-26112db1c230"
    };
    this.windowId = '380c9e54-7561-4010-a99f-f132f5dc13fd';
    this.tinyMce = new Mirador.TinyMCEAnnotationBodyEditor({
      annotation: this.annotation,
      windowId: this.windowId,
      config: {
        tags: ["config1", "config2"]
      }
    });
    subject = this.tinyMce;
    subject.show('#mycontainer');
  });

  afterEach(function() {
    delete this.tinyMce;
    $('body').html('');
  });

  describe('Initialization', function() {
    it('should initialize', function() {
      expect(true).toBe(true); //Force beforeEach() setup to run
      expect(this.sandbox.find('.text-editor').val()).toEqual('<p>Waahoo</p>');
      expect(this.sandbox.find('.tags-editor').val()).toEqual(['tagged', 'silly']);
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

  describe('createAnnotation', function() {
    beforeEach(function() {
      var _this = this;
      tinymce.activeEditor = {
        getContent: jasmine.createSpy('getContent').and.callFake(function() {
          return _this.sandbox.find('.text-editor').val();
        })
      };
    });
    it('should create a full annotation with tags from config', function() {
      this.sandbox.find('.text-editor').val('Sample annotation');
      this.sandbox.find('.tags-editor').val(['config1', 'config2']).trigger('change');
      expect(subject.createAnnotation()).toEqual({
        "@context": "http://iiif.io/api/presentation/2/context.json",
        "@type": "oa:Annotation",
        "motivation": ['oa:tagging', 'oa:commenting'],
        "resource": [
          {
            "@type": "oa:Tag",
            "chars": "config1"
          },
          {
            "@type": "oa:Tag",
            "chars": "config2"
          },
          {
            "@type": "dctypes:Text",
            "format": "text/html",
            "chars": "Sample annotation"
          }
        ]
      });
    });

    it('should create a full annotation with new tags', function() {
      this.sandbox.find('.text-editor').val('Sample annotation');
      this.sandbox.find('.tags-editor').append('<option value="tag">tag</option>');
      this.sandbox.find('.tags-editor').append('<option value="nags">nags</option>');
      this.sandbox.find('.tags-editor').val(['tag', 'nags']).trigger('change');
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

  describe('updateAnnotation', function() {
    beforeEach(function() {
      var _this = this;
      tinymce.activeEditor = {
        getContent: jasmine.createSpy('getContent').and.callFake(function() {
          return _this.sandbox.find('.text-editor').val();
        })
      };
    });
    it('should update the given annotation with new tags', function() {
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
      this.sandbox.find('.tags-editor').append('<option value="tag2">tag2</option>');
      this.sandbox.find('.tags-editor').append('<option value="nags2">nags2</option>');
      this.sandbox.find('.tags-editor').val(['tag2', 'nags2']).trigger('change');
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

    it('should update the given annotation with tags from config', function() {
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
      this.sandbox.find('.tags-editor').val(['config1', 'config2']).trigger('change');
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
            "chars": "config1"
          },
          {
            "@type": "oa:Tag",
            "chars": "config2"
          }
        ]
      });
    });

  });
});
