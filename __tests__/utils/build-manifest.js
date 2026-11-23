import deepmerge from 'deepmerge';

const presentation2Context = ['http:', '', 'iiif.io', 'api', 'presentation', '2', 'context.json'].join('/');
const presentation3Context = ['http:', '', 'iiif.io', 'api', 'presentation', '3', 'context.json'].join('/');
const presentation4Context = ['http:', '', 'iiif.io', 'api', 'presentation', '4', 'context.json'].join('/');

const overwriteArrayMerge = (_destinationArray, sourceArray) => sourceArray;

/**
 * Builds a minimal IIIF Presentation 2 manifest.
 */
export function buildManifestV2({
  canvases = [{ '@id': 'canvas-1', '@type': 'sc:Canvas', label: 'Canvas 1' }],
  id = ['http:', '', 'example.com', 'manifest'].join('/'),
  ...overrides
} = {}) {
  return deepmerge(
    {
      '@context': presentation2Context,
      '@id': id,
      '@type': 'sc:Manifest',
      label: 'Test Manifest',
      sequences: [{ '@type': 'sc:Sequence', canvases }],
    },
    overrides,
    { arrayMerge: overwriteArrayMerge },
  );
}

/**
 * Builds a minimal IIIF Presentation 3 manifest.
 */
export function buildManifestV3({
  id = ['http:', '', 'example.com', 'manifest'].join('/'),
  items = [{ id: 'canvas-1', label: { en: ['Canvas 1'] }, type: 'Canvas' }],
  ...overrides
} = {}) {
  return deepmerge(
    {
      '@context': presentation3Context,
      id,
      items,
      label: { en: ['Test Manifest'] },
      type: 'Manifest',
    },
    overrides,
    { arrayMerge: overwriteArrayMerge },
  );
}

/**
 * Builds a minimal IIIF Presentation 4 manifest.
 */
export function buildManifestV4({
  id = ['http:', '', 'example.com', 'manifest'].join('/'),
  items = [{ id: 'canvas-1', label: { en: ['Canvas 1'] }, type: 'Canvas' }],
  ...overrides
} = {}) {
  return deepmerge(
    {
      '@context': presentation4Context,
      id,
      items,
      label: { en: ['Test Manifest'] },
      type: 'Manifest',
    },
    overrides,
    { arrayMerge: overwriteArrayMerge },
  );
}
