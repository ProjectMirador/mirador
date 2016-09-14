describe('JsonLd', function () {
  describe('getTextValue', function() {
    it('should return empty string for undefined', function() {
      expect(Mirador.JsonLd.getTextValue(null, 'en')).toEqual('');
      expect(Mirador.JsonLd.getTextValue(null, 'txg')).toEqual('');
      expect(Mirador.JsonLd.getTextValue(null)).toEqual('');
    });
    
    it('should return the same string when given a string', function() {
      expect(Mirador.JsonLd.getTextValue('waahoo', 'en')).toEqual('waahoo');
      expect(Mirador.JsonLd.getTextValue('waahoo', 'xto')).toEqual('waahoo');
      expect(Mirador.JsonLd.getTextValue('waahoo')).toEqual('waahoo');
    });
    
    it('should return the localized name when given an array of translations', function() {
      // Short sample
      var sample = [
        {
          "@value": "Alternate Title",
          "@language": "en"
        },
        {
          "@value": "Teitl Arall",
          "@language": "cy-GB"
        }
      ];
      //Should grab specified language
      expect(Mirador.JsonLd.getTextValue(sample, 'en')).toEqual("Alternate Title");
      expect(Mirador.JsonLd.getTextValue(sample, 'cy-GB')).toEqual("Teitl Arall");
      //Should default to the first entry for non-found language
      expect(Mirador.JsonLd.getTextValue(sample, 'txg')).toEqual("Alternate Title");
      //Should default to en
      expect(Mirador.JsonLd.getTextValue(sample)).toEqual("Alternate Title");
    });
    
    it('should return "@value" key when given an object', function() {
      var sample = {
        "@value": "Super waahoo",
        "@language": "en"
      };
      expect(Mirador.JsonLd.getTextValue(sample, 'en')).toEqual("Super waahoo");
      expect(Mirador.JsonLd.getTextValue(sample)).toEqual("Super waahoo");
    });
    
    it('should return a <br/> delimited string when given an array of strings', function() {
      var sample = ["waahoo", "woohah", "foobar"];
      expect(Mirador.JsonLd.getTextValue(sample)).toEqual("waahoo<br/>woohah<br/>foobar<br/>");
    })
  });
});
