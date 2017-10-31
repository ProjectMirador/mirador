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

    it('should return all values when no value has a langue associated', function() {
      var sample = ['First value',
                    'Second value'];
      expect(Mirador.JsonLd.getTextValue(sample)).toEqual('First value<br />Second value');
    });

    it('should return all values that best match the language preference', function() {
      var sample = [
        'This is a value without a language.',
        {'@value': "This is an American value.",
         '@language': "en-US"},
        {'@value': "This ia a British value.",
         '@language': "en-UK"},
        'This is another value without a language.',
        {'@value': "C'est une valeur française.",
         '@language': "fr"}];
      i18next.languages = ['en-US', 'en']
      expect(Mirador.JsonLd.getTextValue(sample)).toEqual("This is an American value.");
    });

    it('should pick a language if all values have a language but none match the preference', function() {
      var sample = [
        {'@value': "This is an American value.",
         '@language': "en-US"},
        {'@value': "This is another American value.",
         '@language': "en-US"},
        {'@value': "C'est une valeur française.",
         '@language': "fr"}];
      window.navigator.languages = ['de-DE', 'de'];
      expect(Mirador.JsonLd.getTextValue(sample))
        .toEqual('This is an American value.<br />' +
                 'This is another American value.');
    });

    it('should return all values without an associated language if some have one, but none match the preference', function() {
      var sample = [
        {'@value': "C'est une valeur française.",
         '@language': "fr"},
        'This is a value without a language.',
        'This is another value without a language.'];
      window.navigator.languages = ['en-US', 'en'];
      expect(Mirador.JsonLd.getTextValue(sample))
        .toEqual('This is a value without a language.<br />' +
                 'This is another value without a language.');
    });

    it('should only allow HTML elements permitted by the specification', function() {
      var withScript = '<span>This <strong>looks</strong> <em>harmless</em>.<script>window.alert("boom!")</script></span>';
      expect(Mirador.JsonLd.getTextValue(withScript)).toEqual(
        "<span>This <strong>looks</strong> <em>harmless</em>.</span>");
    });
  });
});
