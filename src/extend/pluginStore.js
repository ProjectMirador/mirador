
export const pluginStore = {
  /** */
  storePlugins(plugins) {
    this.plugins = plugins || [];
  },
  /** */
  getPlugins() {
    return this.plugins || [];
  },
};
