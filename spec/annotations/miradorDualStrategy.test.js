describe('Mirador SVG-xywh Open Annotation Strategy', function() {
  var subject;

  beforeEach(function() {
    jasmine.getJSONFixtures().fixturesPath = 'spec/fixtures';
    subject = new Mirador.MiradorDualStrategy();
    this.legacyOa = getJSONFixture('annotationLegacyOa.json');
    this.miradorLegacyOa = getJSONFixture('annotationMiradorLegacy.json');
    this.mirador21Oa = getJSONFixture('annotationMirador21.json');
    this.miradorDualOa = getJSONFixture('annotationMiradorDual.json');
  });

  describe('Initialization', function() {
    it('should initialize', function() {
      expect(true).toBe(true);
    });
  });

  describe('isThisType', function() {
    it('should not recognize a legacy OA annotation', function() {
      expect(subject.isThisType(this.legacyOa)).toBe(false);
    });
    it('should not recognize a Mirador 2.0.x OA annotation', function() {
      expect(subject.isThisType(this.miradorLegacyOa)).toBe(false);
    });
    it('should not a Mirador 2.1.x OA annotation', function() {
      expect(subject.isThisType(this.mirador21Oa)).toBe(false);
    });
    it('should recognize a dual-selector OA annotation', function() {
      expect(subject.isThisType(this.miradorDualOa)).toBe(true);
    });
  });

  describe('buildAnnotation', function() {
    var annotation, window, overlay;

    beforeEach(function() {
      // Generate mocks
      annotation = {
        "@context": "http://iiif.io/api/presentation/2/context.json",
        "@type": "oa:Annotation",
        "motivation": [
          "oa:commenting"
        ],
        "resource": [
          {
            "@type": "dctypes:Text",
            "format": "text/html",
            "chars": "<p>something</p>"
          }
        ],
        "@id": "d2eda2e2-951a-4f88-b4ec-03a7b25a5d07"
      };
      window = {
        canvasID: "https://oculus-dev.harvardx.harvard.edu/manifests/huam:320567/canvas/canvas-10466656.json",
        loadedManifest: "https://oculus-dev.harvardx.harvard.edu/manifests/huam:320567"
      };
      overlay = {
        getSVGString: jasmine.createSpy('getSVGString').and.returnValue("<svg xmlns='http://www.w3.org/2000/svg'><path xmlns=\"http://www.w3.org/2000/svg\" d=\"M1000.24213,219.15375l98.78935,0l0,0l98.78935,0l0,74.09201l0,74.09201l-98.78935,0l-98.78935,0l0,-74.09201z\" data-paper-data=\"{&quot;strokeWidth&quot;:1,&quot;rotation&quot;:0,&quot;annotation&quot;:null,&quot;editable&quot;:true}\" id=\"rectangle_7e2b56fa-b18b-4d09-a575-0bb19f560b56\" fill-opacity=\"0\" fill=\"#00bfff\" fill-rule=\"nonzero\" stroke=\"#00bfff\" stroke-width=\"30.87167\" stroke-linecap=\"butt\" stroke-linejoin=\"miter\" stroke-miterlimit=\"10\" stroke-dasharray=\"\" stroke-dashoffset=\"0\" font-family=\"sans-serif\" font-weight=\"normal\" font-size=\"12\" text-anchor=\"start\" style=\"mix-blend-mode: normal\"/></svg>"),
        draftPaths: [{bounds: { x: 1000, y: 219, width: 198, height: 148 }}]
      };
    });

    it('should build the on attribute in the annotation', function() {
      expect(subject.buildAnnotation({
        "annotation": annotation,
        "window": window,
        "overlay": overlay
      })).toEqual(this.miradorDualOa);
    });
  });

  describe('parseRegion', function() {
    var result, osdRegionDrawTool;

    beforeEach(function() {
      osdRegionDrawTool = {
        svgOverlay: {
            parseSVG: jasmine.createSpy('parseSVG').and.returnValue({
              bounds: { x: 1000, y: 219, width: 198, height: 148 }
            })
        }
      }
    });
    it ('should do nothing for a legacy OA annotation', function() {
      result = subject.parseRegion(this.legacyOa, osdRegionDrawTool);
      expect(result).toBe(undefined);
      expect(osdRegionDrawTool.svgOverlay.parseSVG).not.toHaveBeenCalled();
    });
    it('should do nothing for a Mirador 2.0.x OA annotation', function() {
      result = subject.parseRegion(this.miradorLegacyOa, osdRegionDrawTool);
      expect(result).toBe(undefined);
      expect(osdRegionDrawTool.svgOverlay.parseSVG).not.toHaveBeenCalled();
    });
    it('should do nothing for a Mirador 2.1.x OA annotation', function() {
      result = subject.parseRegion(this.mirador21Oa, osdRegionDrawTool);
      expect(result).toBe(undefined);
      expect(osdRegionDrawTool.svgOverlay.parseSVG).not.toHaveBeenCalled();
    });
    it('should parse the SVG for a dual-selector OA annotation', function() {
      result = subject.parseRegion(this.miradorDualOa, osdRegionDrawTool);
      expect(result).not.toBe(undefined);
      expect(osdRegionDrawTool.svgOverlay.parseSVG).toHaveBeenCalled();
    });
  });
});
