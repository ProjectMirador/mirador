export default {
  canvasNavigation: {
    height: 50,
    width: 50,
  },
  theme: { // Sets up a MaterialUI theme. See https://material-ui.com/customization/default-theme/
    palette: {
      type: 'light', // dark also available
      primary: {
        main: '#f5f5f5',
        light: '#ffffff',
        dark: '#eeeeee',
      },
      secondary: {
        main: '#1967d2',
        light: '#64b5f6',
        dark: '#0d47a1',
      },
      error: {
        main: '#b00020',
      },
    },
    typography: {
      useNextVariants: true // set so that console deprecation warning is removed
    }
  },
  language: 'en',
  availableLanguages: { // All the languages available in the language switcher
    de: 'Deutsch',
    en: 'English',
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
    type: 'mosaic',
  },
  workspaceControlPanel: {
    enabled: true,
  }
};
