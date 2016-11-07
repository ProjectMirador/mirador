(function($) {
  
  $.JsonLd = {
    getTextValue: function(propertyValue, language) {
      if (typeof language === 'undefined') { language = "en"; }
      if (typeof propertyValue === 'undefined' || propertyValue === null) {return ''; }
      else if (typeof propertyValue === 'string') { return propertyValue; }
      else if (Array.isArray(propertyValue)) {
        var text = '';
        jQuery.each(propertyValue, function(index, item) {
          if (typeof item === "string") {
            text += item;
            text += "<br/>";
          } else if (!text || item['@language'] === language) {
            // {@value: ..., @language: ...}
              text = item['@value'];
          }
        });
        return text;
      } else {
        return propertyValue['@value'];
      }
    }
  };
  
}(Mirador));
