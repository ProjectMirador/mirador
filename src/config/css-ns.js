import { createCssNs } from 'css-ns';

/**
 * export ns - sets up css namespacing for everything to be `mirador-`
 */
const ns = className => createCssNs({
  namespace: 'mirador',
})(className);

export default ns;
