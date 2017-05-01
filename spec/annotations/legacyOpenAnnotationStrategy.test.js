describe('Legacy OA Strategy', function() {
  var subject;
  
  beforeEach(function() {
    jasmine.getJSONFixtures().fixturesPath = 'spec/fixtures';
    subject = new Mirador.LegacyOpenAnnotationStrategy();
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
    it('should recognize a legacy OA annotation', function() {
      expect(subject.isThisType(this.legacyOa)).toBe(true);
    });
    it('should not recognize a Mirador 2.0.x OA annotation', function() {
      expect(subject.isThisType(this.miradorLegacyOa)).toBe(false);
    });
    it('should not recognize a Mirador 2.1.x OA annotation', function() {
      expect(subject.isThisType(this.mirador21Oa)).toBe(false);
    });
    it('should not recognize a dual-selector OA annotation', function() {
      expect(subject.isThisType(this.miradorDualOa)).toBe(false);
    });
  });
  
  describe('buildAnnotation', function() {
    var annotation, window, overlay;
    
    beforeEach(function() {
      // Generate mocks
      annotation = {
        "@id": "http://iiif.ultrawaahoo.net/annotations/27",
        "@type": "oa:Annotation",
        "motivation": "sc:painting",
        "resource": {
          "@id": "http://iiif.ultrawaahoo.net/annotations/27",
          "@type": "cnt:ContentAsText",
          "format": "text/plain",
          "chars": "This is a legacy annotation."
        }
      };
      window = { canvasID: "http://iiif.ultrawaahoo.net/canvases/3927" };
      overlay = { draftPaths: [{bounds: { x: 154, y: 304, width: 3507, height: 164 }}] };
    });
    
    it('should build the on attribute in the annotation', function() {
      expect(subject.buildAnnotation({
        "annotation": annotation,
        "window": window,
        "overlay": overlay
      })).toEqual(this.legacyOa);
    });
  });
  
  describe('parseRegion', function() {
    var result, osdRegionDrawTool;
    
    beforeEach(function() {
      osdRegionDrawTool = {
        parseRectangle: jasmine.createSpy('parseRectangle').and.returnValue({
          bounds: { x: 2218, y: 3217, width: 371, height: 78 }
        })
      }
    });
    it ('should parse the rectangle for a legacy OA annotation', function() {
      result = subject.parseRegion(this.legacyOa, osdRegionDrawTool);
      expect(result).not.toBe(undefined);
      expect(osdRegionDrawTool.parseRectangle).toHaveBeenCalled();
    });
    it('should do nothing for a Mirador 2.0.x OA annotation', function() {
      result = subject.parseRegion(this.miradorLegacyOa, osdRegionDrawTool);
      expect(result).toBe(undefined);
      expect(osdRegionDrawTool.parseRectangle).not.toHaveBeenCalled();
    });
    it('should do nothing for a Mirador 2.1.x OA annotation', function() {
      result = subject.parseRegion(this.mirador21Oa, osdRegionDrawTool);
      expect(result).toBe(undefined);
      expect(osdRegionDrawTool.parseRectangle).not.toHaveBeenCalled();
    });
    it('should do nothing for a dual-selector OA annotation', function() {
      result = subject.parseRegion(this.miradorDualOa, osdRegionDrawTool);
      expect(result).toBe(undefined);
      expect(osdRegionDrawTool.parseRectangle).not.toHaveBeenCalled();
    });
  });
});