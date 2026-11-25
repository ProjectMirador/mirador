import { buildManifestV2, buildManifestV3, buildManifestV4 } from './build-manifest';

describe('buildManifest', () => {
  it('builds a minimal Presentation 2 manifest', () => {
    expect(buildManifestV2()).toEqual({
      '@context': ['http:', '', 'iiif.io', 'api', 'presentation', '2', 'context.json'].join('/'),
      '@id': ['http:', '', 'example.com', 'manifest'].join('/'),
      '@type': 'sc:Manifest',
      label: 'Test Manifest',
      sequences: [
        {
          '@type': 'sc:Sequence',
          canvases: [{ '@id': 'canvas-1', '@type': 'sc:Canvas', label: 'Canvas 1' }],
        },
      ],
    });
  });

  it('builds a minimal Presentation 3 manifest', () => {
    expect(buildManifestV3()).toEqual({
      '@context': ['http:', '', 'iiif.io', 'api', 'presentation', '3', 'context.json'].join('/'),
      id: ['http:', '', 'example.com', 'manifest'].join('/'),
      items: [{ id: 'canvas-1', label: { en: ['Canvas 1'] }, type: 'Canvas' }],
      label: { en: ['Test Manifest'] },
      type: 'Manifest',
    });
  });

  it('builds a minimal Presentation 4 manifest', () => {
    expect(buildManifestV4()).toEqual({
      '@context': ['http:', '', 'iiif.io', 'api', 'presentation', '4', 'context.json'].join('/'),
      id: ['http:', '', 'example.com', 'manifest'].join('/'),
      items: [{ id: 'canvas-1', label: { en: ['Canvas 1'] }, type: 'Canvas' }],
      label: { en: ['Test Manifest'] },
      type: 'Manifest',
    });
  });

  it('supports custom IDs and overwrites arrays cleanly across versions', () => {
    const v2 = buildManifestV2({
      canvases: [{ '@id': 'c-2', '@type': 'sc:Canvas', label: 'Page 2' }],
      id: 'manifest-v2',
    });
    const v3 = buildManifestV3({
      id: 'manifest-v3',
      items: [{ id: 'c-3', label: { en: ['Page 3'] }, type: 'Canvas' }],
    });
    const v4 = buildManifestV4({
      id: 'manifest-v4',
      items: [{ id: 'c-4', label: { en: ['Page 4'] }, type: 'Canvas' }],
    });

    expect(v2['@id']).toBe('manifest-v2');
    expect(v2.sequences[0].canvases).toHaveLength(1);
    expect(v3.id).toBe('manifest-v3');
    expect(v3.items).toHaveLength(1);
    expect(v4.id).toBe('manifest-v4');
    expect(v4.items).toHaveLength(1);
  });
});
