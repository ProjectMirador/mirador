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
      fontSize: 16,
      body1: {
        fontSize: "1rem",
        letterSpacing: "0em",
        lineHeight: "1.6em",
      },
      body2: {
        fontSize: "0.878rem",
        letterSpacing: "0.015em",
        lineHeight: "1.6em",
      },
      button: {
        fontSize: "0.878rem",
        letterSpacing: "0.09em",
        lineHeight: "2.25rem",
        textTransform: "uppercase",
      },
      caption: {
        fontSize: "0.772rem",
        letterSpacing: "0.13em",
        lineHeight: "1.1rem",
      },
      body1Next: {
        fontSize: "1rem",
        letterSpacing: "0em",
        lineHeight: "1.6em",
      },
      body2Next: {
        fontSize: "0.878rem",
        letterSpacing: "0.015em",
        lineHeight: "1.6em",
      },
      buttonNext: {
        fontSize: "0.878rem",
        letterSpacing: "0.09em",
        lineHeight: "2.25rem",
      },
      captionNext: {
        fontSize: "0.772rem",
        letterSpacing: "0.33em",
        lineHeight: "1.6rem",
      },
      overline: {
        fontSize: "0.678rem",
        fontWeight: 500,
        letterSpacing: "0.166em",
        lineHeight: "2em",
        textTransform: "uppercase",
      },
      h1: {
        fontSize: "2.822rem",
        letterSpacing: "-0.015em",
        lineHeight: "1.2em",
      },
      h2: {
        fontSize: "1.575rem",
        letterSpacing: "0em",
        lineHeight: "1.33em",
      },
      h3: {
        fontSize: "1.383rem",
        fontWeight: 300,
        letterSpacing: "0em",
        lineHeight: "1.33em",
      },
      h4: {
        fontSize: "1.215rem",
        letterSpacing: "0.007em",
        lineHeight: "1.45em",
      },
      h5: {
        fontSize: "1.138rem",
        letterSpacing: "0.005em",
        lineHeight: "1.55em",
      },
      h6: {
        fontSize: "1.067rem",
        fontWeight: 400,
        letterSpacing: "0.01em",
        lineHeight: "1.6em",
      },
      subtitle1: {
        fontSize: "0.937rem",
        letterSpacing: "0.015em",
        lineHeight: "1.6em",
        fontWeight: 300,
      },
      subtitle2: {
        fontSize: "0.878rem",
        fontWeight: 500,
        letterSpacing: "0.02em",
        lineHeight: "1.75em",
      },
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
    allowClose: true,
    allowMaximize: true,
    defaultView: 'single',
  },
  windows: [],
  thumbnailNavigation: {
    defaultPosition: 'far-bottom',
    height: 150,
    width: 100,
  },
  workspace: {
    type: 'mosaic',
  },
  workspaceControlPanel: {
    enabled: true,
  },
};
