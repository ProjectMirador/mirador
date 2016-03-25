(function($) {
  
  $.JsonLd = {
    getTextValue: function(propertyValue, language) {
      if (typeof language === 'undefined') { language = "en"; }
      if (typeof propertyValue === 'string') { return propertyValue; }
      else if (Array.isArray(propertyValue)) {
        var text;
        jQuery.each(propertyValue, function(i3, what) {
          // {@value: ..., @language: ...}
          if (!text || what['@language'] === language) {
            text = what['@value'];
          }
        });
        return text;
      } else {
        return propertyValue['@value'];
      }
    }
  };
  
}(Mirador));
