import { companionWindowButtonPlugin, companionWindowPlugin } from '../plugins/index';

export default {
  config: {
    id: 'mirador',
    windows: [{}],
  },
  plugins: [companionWindowButtonPlugin, companionWindowPlugin],
};
