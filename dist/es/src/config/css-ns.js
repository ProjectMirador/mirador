import settings from './settings';
import flatten from 'lodash/flatten';
/**
 * export ns - sets up css namespacing for everything to be `mirador-`
 */

var ns = function ns(classNames) {
  return flatten([classNames]).map(function (className) {
    return [settings.createGenerateClassNameOptions.productionPrefix, className].join('-');
  }).join(' ');
};

export default ns;