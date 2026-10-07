import Openseadragon from 'openseadragon';

/** Stub Image so that probes for the given mime types load, and all others error */
function stubImage(decodable) {
  vi.stubGlobal(
    'Image',
    class {
      set src(value) {
        this.width = 1;
        this.height = 1;
        const mime = value.match(/^data:([^;]+);/)[1];
        setTimeout(() => (decodable.includes(mime) ? this.onload() : this.onerror()));
      }
    },
  );
}

describe('imageFormatSupport', () => {
  let subject;

  beforeEach(async () => {
    vi.resetModules();
    subject = await import('../../../src/lib/imageFormatSupport');
  });

  afterEach(() => {
    vi.unstubAllGlobals();
    Openseadragon.setImageFormatsSupported({ avif: true, jxl: false, webp: true });
  });

  describe('isImageFormatSupported', () => {
    it('assumes OpenSeadragon defaults before detection', () => {
      expect(subject.isImageFormatSupported('webp')).toBe(true);
      expect(subject.isImageFormatSupported('avif')).toBe(true);
      expect(subject.isImageFormatSupported('jxl')).toBe(false);
    });

    it('assumes formats that are not probed are supported', () => {
      expect(subject.isImageFormatSupported('jpg')).toBe(true);
      expect(subject.isImageFormatSupported('PNG')).toBe(true);
    });
  });

  describe('detectImageFormats', () => {
    it('records which formats the browser can decode', async () => {
      stubImage(['image/webp', 'image/jxl']);

      expect(await subject.detectImageFormats()).toEqual({ avif: false, jxl: true, webp: true });
      expect(subject.isImageFormatSupported('avif')).toBe(false);
      expect(subject.isImageFormatSupported('jxl')).toBe(true);
    });

    it('tells OpenSeadragon about the result', async () => {
      stubImage(['image/webp', 'image/jxl']);

      await subject.detectImageFormats();

      expect(Openseadragon.imageFormatSupported('avif')).toBe(false);
      expect(Openseadragon.imageFormatSupported('jxl')).toBe(true);
      expect(Openseadragon.imageFormatSupported('webp')).toBe(true);
    });

    it('only runs detection once', () => {
      stubImage([]);

      expect(subject.detectImageFormats()).toBe(subject.detectImageFormats());
    });

    it('keeps the defaults when probes never settle', async () => {
      vi.useFakeTimers();
      vi.stubGlobal('Image', class {});

      const result = subject.detectImageFormats();
      await vi.runAllTimersAsync();

      expect(await result).toEqual({ avif: true, jxl: false, webp: true });
      vi.useRealTimers();
    });
  });
});
