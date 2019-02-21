import manifesto from 'manifesto.js';
import ManifestoCanvas from '../../../src/lib/ManifestoCanvas';
import fixture from '../../fixtures/version-2/019.json';
import imagev1Fixture from '../../fixtures/version-2/Osbornfa1.json';

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
  describe('imageInformationUri', () => {
    it('correctly returns an image information url for a v2 Image API', () => {
      expect(instance.imageInformationUri).toEqual('https://stacks.stanford.edu/image/iiif/hg676jb4964%2F0380_796-44/info.json');
    });
    it('correctly returns an image information url for a v1 Image API', () => {
      const imagev1Instance = new ManifestoCanvas(
        manifesto.create(imagev1Fixture).getSequences()[0].getCanvases()[0],
      );
      expect(imagev1Instance.imageInformationUri).toEqual('https://images.britishart.yale.edu/iiif/b38081da-8991-4464-a71e-d9891226a35f/info.json');
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
