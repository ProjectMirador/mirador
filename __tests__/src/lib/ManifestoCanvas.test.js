import manifesto from 'manifesto.js';
import ManifestoCanvas from '../../../src/lib/ManifestoCanvas';
import fixture from '../../fixtures/version-2/019.json';

describe('ManifestoCanvas', () => {
  let instance;
  beforeAll(() => {
    instance = new ManifestoCanvas(
      manifesto.create(fixture).getSequences()[0].getCanvases()[0],
    );
  });
  describe('canonicalImageUri', () => {
    it('calls manifestos method to return a canonical imageUri', () => {
      expect(instance.canonicalImageUri).toEqual(
        'https://stacks.stanford.edu/image/iiif/hg676jb4964%2F0380_796-44/full/5426,/0/default.jpg',
      );
    });
  });
  describe('aspectRatio', () => {
    it('calculates a width / height aspectRatio', () => {
      expect(instance.aspectRatio).toBeCloseTo(0.667);
    });
  });
  describe('thumbnail', () => {
    it('calculates a thumbnail image API request based off of height', () => {
      expect(instance.thumbnail(100)).toEqual(
        'https://stacks.stanford.edu/image/iiif/hg676jb4964%2F0380_796-44/full/66,/0/default.jpg',
      );
    });
    it('defaults to using 150 as a height', () => {
      expect(instance.thumbnail()).toEqual(
        'https://stacks.stanford.edu/image/iiif/hg676jb4964%2F0380_796-44/full/100,/0/default.jpg',
      );
    });
  });
});
