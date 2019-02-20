export default {
  theme: { // Sets up a MaterialUI theme. See https://material-ui.com/customization/default-theme/
    palette: {
      type: 'light', // dark also available
    },
    typography: {
      useNextVariants: true // set so that console deprecation warning is removed
    }
  },
  translations: {
  },
  window: {
    defaultView: 'single',
  },
  windows: [],
  thumbnailNavigation: {
    defaultPosition: 'bottom',
    height: 150,
  },
  workspace: {
    type: 'elastic',
  },
  workspaceControlPanel: {
    enabled: true,
  },
};
