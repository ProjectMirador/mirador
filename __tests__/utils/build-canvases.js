export function buildCanvasesV2({ count = 1, canvasOverrides = {} } = {}) {
  return Array.from({ length: count }, (_, i) => {
    const canvasNumber = i + 1;
    const canvasOverride = canvasOverrides[canvasNumber] ?? {};
    return {
      '@id': canvasOverride.id ?? `canvas-${canvasNumber}`,
      '@type': 'sc:Canvas',
      label: canvasOverride.label ?? `Canvas ${canvasNumber}`,
    };
  });
}

export function buildCanvasesV3({ count = 1, canvasOverrides = {} } = {}) {
  return Array.from({ length: count }, (_, i) => {
    const canvasNumber = i + 1;
    const canvasOverride = canvasOverrides[canvasNumber] ?? {};
    return {
      id: canvasOverride.id ?? `canvas-${canvasNumber}`,
      type: 'Canvas',
      label: {
        en: [canvasOverride.label ?? `Canvas ${canvasNumber}`],
      },
    };
  });
}

export function buildCanvasesV4({ ...overrides } = {}) {
  return buildCanvasesV3(overrides);
}
