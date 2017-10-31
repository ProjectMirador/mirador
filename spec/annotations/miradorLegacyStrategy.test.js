describe('Mirador 2.0.x Legacy Annotation Strategy', function() {
  var subject;
  
  beforeEach(function() {
    jasmine.getJSONFixtures().fixturesPath = 'spec/fixtures';
    subject = new Mirador.MiradorLegacyStrategy();
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
    it('should recognize a Mirador 2.0.x OA annotation', function() {
      expect(subject.isThisType(this.miradorLegacyOa)).toBe(true);
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
        "@context" : "http://iiif.io/api/presentation/2/context.json",
        "@type" : "oa:Annotation",
        "motivation" : [ "oa:commenting" ],
        "resource" : [ {
          "@type" : "dctypes:Text",
          "format" : "text/html",
          "chars" : "<p>1852-1921</p>"
        } ]
      };
      window = { canvasID: "http://dams.llgc.org.uk/iiif/2.0/4574752/canvas/4574755.json" };
      overlay = { draftPaths: [{bounds: { x: 2218, y: 3217, width: 371, height: 78 }}] };
    });
    
    it('should build the on attribute in the annotation', function() {
      expect(subject.buildAnnotation({
        "annotation": annotation,
        "window": window,
        "overlay": overlay
      })).toEqual(this.miradorLegacyOa);
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
    it ('should do nothing for a legacy OA annotation', function() {
      result = subject.parseRegion(this.legacyOa, osdRegionDrawTool);
      expect(result).toBe(undefined);
      expect(osdRegionDrawTool.parseRectangle).not.toHaveBeenCalled();
    });
    it('should parse the rectangle for a Mirador 2.0.x OA annotation', function() {
      result = subject.parseRegion(this.miradorLegacyOa, osdRegionDrawTool);
      expect(result).not.toBe(undefined);
      expect(osdRegionDrawTool.parseRectangle).toHaveBeenCalled();
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