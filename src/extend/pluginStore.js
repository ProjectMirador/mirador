export const pluginStore = {
  /** */
  getPlugins() {
    return this.plugins || [];
  },
  /** */
  storePlugins(plugins) {
    this.plugins = plugins || [];
  },
};
