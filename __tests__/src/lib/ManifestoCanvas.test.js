import { Utils } from 'manifesto.js/dist-esmodule/Utils';
import ManifestoCanvas from '../../../src/lib/ManifestoCanvas';
import fixture from '../../fixtures/version-2/019.json';
import v3fixture from '../../fixtures/version-3/001.json';
import imagev1Fixture from '../../fixtures/version-2/Osbornfa1.json';
import emptyCanvasFixture from '../../fixtures/version-2/emptyCanvas.json';
import serviceFixture from '../../fixtures/version-2/canvasService.json';
import otherContentFixture from '../../fixtures/version-2/299843.json';
import otherContentStringsFixture from '../../fixtures/version-2/BibliographicResource_3000126341277.json';

describe('ManifestoCanvas', () => {
  let instance;
  let v3Instance;
  beforeAll(() => {
    instance = new ManifestoCanvas(
      Utils.parseManifest(fixture).getSequences()[0].getCanvases()[0],
    );
    v3Instance = new ManifestoCanvas(
      Utils.parseManifest(v3fixture).getSequences()[0].getCanvases()[0],
    );
  });
  describe('annotationListUris', () => {
    describe('when no annotationLists are present', () => {
      it('returns an empty array', () => {
        expect(instance.annotationListUris).toEqual([]);
      });
    });
    describe('when annotationLists are present', () => {
      describe('with items as objects', () => {
        it('returns an array of uris', () => {
          const otherContentInstance = new ManifestoCanvas(
            Utils.parseManifest(otherContentFixture).getSequences()[0].getCanvases()[0],
          );
          expect(otherContentInstance.annotationListUris.length).toEqual(1);
          expect(otherContentInstance.annotationListUris).toEqual([
            'https://iiif.harvardartmuseums.org/manifests/object/299843/list/47174896',
          ]);
        });
      });
      describe('with items as strings', () => {
        it('returns an array of uris', () => {
          const otherContentInstance = new ManifestoCanvas(
            Utils.parseManifest(otherContentStringsFixture).getSequences()[0].getCanvases()[0],
          );
          expect(otherContentInstance.annotationListUris.length).toEqual(1);
          expect(otherContentInstance.annotationListUris).toEqual([
            'https://iiif.europeana.eu/presentation/9200301/BibliographicResource_3000126341277/annopage/1',
          ]);
        });
      });
    });
  });
  describe('canonicalImageUri', () => {
    it('calculates a canonical imageUri', () => {
      expect(instance.canonicalImageUri()).toEqual(
        'https://stacks.stanford.edu/image/iiif/hg676jb4964%2F0380_796-44/full/full/0/default.jpg',
      );
    });
    it('calculates a canonical imageUri for prezi v3', () => {
      expect(v3Instance.canonicalImageUri()).toEqual(
        'https://iiif.bodleian.ox.ac.uk/iiif/image/9cca8fdd-4a61-4429-8ac1-f648764b4d6d/full/full/0/default.jpg',
      );
    });
  });
  describe('processAnnotations', () => {
    describe('v2', () => {
      it('fetches annotations for each annotationList', () => {
        const otherContentInstance = new ManifestoCanvas(
          Utils.parseManifest(otherContentFixture).getSequences()[0].getCanvases()[0],
        );
        const fetchMock = jest.fn();
        otherContentInstance.processAnnotations(fetchMock);
        expect(fetchMock).toHaveBeenCalledTimes(1);
      });
    });
    describe('v3', () => {
      it('fetches annotations for external items and receives annotations for items that are embedded', () => {
        const receiveMock = jest.fn();
        const fetchMock = jest.fn();
        v3Instance.processAnnotations(fetchMock, receiveMock);
        expect(receiveMock).toHaveBeenCalledTimes(1);
        expect(fetchMock).toHaveBeenCalledTimes(2);
      });
    });
  });
  describe('imageInformationUri', () => {
    it('correctly returns an image information url for a v2 Image API', () => {
      expect(instance.imageInformationUri).toEqual('https://stacks.stanford.edu/image/iiif/hg676jb4964%2F0380_796-44/info.json');
    });
    it('correctly returns an image information url for a v1 Image API', () => {
      const imagev1Instance = new ManifestoCanvas(
        Utils.parseManifest(imagev1Fixture).getSequences()[0].getCanvases()[0],
      );
      expect(imagev1Instance.imageInformationUri).toEqual('https://images.britishart.yale.edu/iiif/b38081da-8991-4464-a71e-d9891226a35f/info.json');
    });

    it('is undefined if a canvas is empty (e.g. has no images)', () => {
      const emptyCanvasInstance = new ManifestoCanvas(
        Utils.parseManifest(emptyCanvasFixture).getSequences()[0].getCanvases()[3],
      );

      expect(emptyCanvasInstance.imageInformationUri).toBeUndefined();
    });
  });
  describe('aspectRatio', () => {
    it('calculates a width / height aspectRatio', () => {
      expect(instance.aspectRatio).toBeCloseTo(0.667);
    });
  });
  describe('thumbnail', () => {
    it('calculates a thumbnail image API request based off of width, height and aspect ratio', () => {
      expect(instance.thumbnail(100, 100)).toEqual(
        'https://stacks.stanford.edu/image/iiif/hg676jb4964%2F0380_796-44/full/,100/0/default.jpg',
      );

      expect(instance.thumbnail(100, 1000)).toEqual(
        'https://stacks.stanford.edu/image/iiif/hg676jb4964%2F0380_796-44/full/100,/0/default.jpg',
      );
    });
    it('calculates a thumbnail image API request based off of width', () => {
      expect(instance.thumbnail(100)).toEqual(
        'https://stacks.stanford.edu/image/iiif/hg676jb4964%2F0380_796-44/full/100,/0/default.jpg',
      );
    });
    it('calculates a thumbnail image API request based off of height', () => {
      expect(instance.thumbnail(null, 100)).toEqual(
        'https://stacks.stanford.edu/image/iiif/hg676jb4964%2F0380_796-44/full/,100/0/default.jpg',
      );
    });
    it('defaults to using 150 as a height', () => {
      expect(instance.thumbnail()).toEqual(
        'https://stacks.stanford.edu/image/iiif/hg676jb4964%2F0380_796-44/full/,150/0/default.jpg',
      );
    });

    it('returns undefined if there are no images to generate a thumbnail from', () => {
      const emptyCanvasInstance = new ManifestoCanvas(
        Utils.parseManifest(emptyCanvasFixture).getSequences()[0].getCanvases()[3],
      );

      expect(emptyCanvasInstance.thumbnail()).toBeUndefined();
    });
  });
  describe('service', () => {
    it('correctly returns the service information for the given canvas', () => {
      const serviceInstance = new ManifestoCanvas(
        Utils.parseManifest(serviceFixture).getSequences()[0].getCanvases()[0],
      );

      expect(serviceInstance.service).toBeDefined();
    });

    it('returns undefined if there is no service', () => {
      expect(instance.service).toBeUndefined();
    });
  });
});
