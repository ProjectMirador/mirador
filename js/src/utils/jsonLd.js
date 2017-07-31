(function($) {
  /** Get the language to use for displaying the given propertyValue.
   *
   * Uses the algorithm described in
   * http://iiif.io/api/presentation/2.1/#language-of-property-values
   */
  function getDisplayLanguage(languages, items) {
    var itemLanguages = items.map(function(itm) {
      if (typeof itm === 'string') {
        return null;
      } else {
        return itm['@language'];
      }
    });

    var bestLanguageMatch = null;
    jQuery.each(languages, function(idx, lang) {
      if (bestLanguageMatch !== null) {
        return false;
      } else {
        if (itemLanguages.indexOf(lang) !== -1) {
          bestLanguageMatch = lang;
        }
      }
    });

    // Only pick the first available language if **all** property values
    // have an associated language
    if (bestLanguageMatch === null && itemLanguages.indexOf(null) === -1) {
      bestLanguageMatch = itemLanguages[0];
    }
    return bestLanguageMatch;
  }

  $.JsonLd = {
    getTextValue: function(propertyValue, language) {
      var languages = i18next.languages || ['en'];
      if (typeof language === 'string') {
        languages = [language].concat(languages);
      } else if (Array.isArray(language)) {
        languages = language.concat(languages);
      }

      if (typeof propertyValue === 'undefined' || propertyValue === null) {
        return '';
      }
      else if (typeof propertyValue === 'string') {
        return $.sanitizeHtml(propertyValue);
      }
      else if (Array.isArray(propertyValue)) {
        var displayLanguage = getDisplayLanguage(languages, propertyValue);
        var text = '';
        jQuery.each(propertyValue, function(idx, item) {
          var textToAdd = '';
          if (typeof item === 'string' && displayLanguage === null) {
            textToAdd = item;
          } else if (item['@language'] === displayLanguage) {
            textToAdd = item['@value'];
          }
          if (textToAdd !== '' && text !== '') {
            text += '<br/>';
          }
          text += textToAdd;
        });
        return $.sanitizeHtml(text);
      } else {
        return $.sanitizeHtml(propertyValue['@value']);
      }
    }
  };
  
}(Mirador));
