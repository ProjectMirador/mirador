export default {
  id: 'mirador',
  theme: {
    transitions: window.location.port === '4488' ? { create: () => 'none' } : {},
  },
  windows: [{
    canvasId: 'https://iiif.harvardartmuseums.org/manifests/object/299843/canvas/canvas-47174892',
    initialViewerConfig: {
      thumbnailNavigationPosition: 'far-bottom',
      x: 934,
      y: 782,
      // you need to specify zoom for this to look good
      zoom: 0.0007,
    },
    manifestId: 'https://iiif.harvardartmuseums.org/manifests/object/299843',
  }],
};
