import settings from './settings';
/**
 * export ns - sets up css namespacing for everything to be `mirador-`
 */
const ns = (classNames) =>
    [classNames].flat()
    .map((className) => [settings.createGenerateClassNameOptions.productionPrefix, className].join('-'))
    .join(' ');

export default ns;
