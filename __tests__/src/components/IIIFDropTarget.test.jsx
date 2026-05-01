import { handleDrop } from '../../../src/components/IIIFDropTarget';

const monitor = vi.fn();

// jsdom doesn't load images, so we mock an implementation
vi.mock('../../../src/lib/readImageMetadata', () => ({
  readImageMetadata: file => Promise.resolve({
    height: 105, name: file.name, type: file.type, url: 'data:blah', width: 100,
  }),
}));

describe('handleDrop', () => {
  let onDrop;

  beforeEach(() => {
    onDrop = vi.fn();
  });

  it('handles url lists', () => {
    const item = {
      urls: [
        'http://example.com/?manifest=http://example.com/iiif/1.json',
        'http://example.com/?manifest=http://example.com/iiif/2.json&canvas=url',
      ],
    };
    const props = { onDrop };

    handleDrop(item, monitor, props);
    expect(onDrop).toHaveBeenCalledWith({ canvasId: null, manifestId: 'http://example.com/iiif/1.json' }, props, monitor);
    expect(onDrop).toHaveBeenCalledWith({ canvasId: 'url', manifestId: 'http://example.com/iiif/2.json' }, props, monitor);
  });

  it('handles manifests', () => {
    const file = new File(['{ "data": 123 }'], 'manifest.json', { type: 'application/json' });
    const item = {
      files: [
        file,
      ],
    };

    const props = { onDrop };

    const promise = handleDrop(item, monitor, props);

    return promise.then(() => {
      expect(onDrop).toHaveBeenCalledWith(
        expect.objectContaining({ manifestJson: '{ "data": 123 }' }),
        props,
        monitor,
      );
    });
  });

  it('handles images by fabricating a temporary manifest', () => {
    const file = new File(['image data'], 'image.gif', { type: 'image/gif' });
    const item = {
      files: [
        file,
      ],
    };

    const props = { onDrop };

    const promise = handleDrop(item, monitor, props);

    return promise.then(() => {
      expect(onDrop).toHaveBeenCalledWith(
        expect.objectContaining({
          manifestJson: expect.objectContaining({
            items: [
              expect.objectContaining({
                items: [
                  expect.objectContaining({
                    items: [
                      expect.objectContaining({
                        body: {
                          format: 'image/gif', id: 'data:blah', type: 'Image',
                        },
                        height: 105,
                        width: 100,
                      }),
                    ],
                    type: 'AnnotationPage',
                  }),
                ],
                type: 'Canvas',
              }),
            ],
            type: 'Manifest',
          }),
        }),
        props,
        monitor,
      );
    });
  });

  it('handles HTML drops by extracting a manifest URL from a link', () => {
    // This is an example taken from the wild because it contains nested
    // links to various sources.
    const htmlString = `
      <html>
        <body>
          <a href="https://iiifviewer.universiteitleiden.nl/?manifest=https://digitalcollections.universiteitleiden.nl/iiif_manifest/item%253A1607191/manifest&canvas=https%3A//digitalcollections.universiteitleiden.nl/iiif_manifest/item%3A1607203/canvas/default" target="_blank" title="Drag and drop to a IIIF-compliant viewer."><div class="iiifbutton" data-manifest="https://digitalcollections.universiteitleiden.nl/iiif_manifest/item%3A1607191/manifest"><img src="https://digitalcollections.universiteitleiden.nl/sites/all/modules/custom/islandora_iiif_manifests/images/iiif-logo.svg" alt=""><div class="iiiftext">Advanced Viewer</div></div></a>
        </body>
      </html>
    `;

    const item = {
      html: htmlString,
    };

    const props = { onDrop };

    handleDrop(item, monitor, props);

    expect(onDrop).toHaveBeenCalledWith(
      { canvasId: 'https://digitalcollections.universiteitleiden.nl/iiif_manifest/item:1607203/canvas/default', manifestId: 'https://digitalcollections.universiteitleiden.nl/iiif_manifest/item%3A1607191/manifest' },
      props,
      monitor,
    );
  });

  it('warns when dropped URL is invalid', () => {
    const item = {
      urls: ['not a valid url'],
    };
    const props = { onDrop };

    const consoleSpy = vi.spyOn(console, 'warn').mockImplementation(() => {});

    handleDrop(item, monitor, props);

    expect(consoleSpy).toHaveBeenCalledWith('Invalid URL:', 'not a valid url');
    expect(onDrop).not.toHaveBeenCalled();

    consoleSpy.mockRestore();
  });
});
