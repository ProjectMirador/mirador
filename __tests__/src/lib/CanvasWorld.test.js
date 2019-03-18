import manifesto from 'manifesto.js';
import fixture from '../../fixtures/version-2/019.json';
import CanvasWorld from '../../../src/lib/CanvasWorld';

const canvases = manifesto.create(fixture).getSequences()[0].getCanvases();
const canvasSubset = [canvases[1], canvases[2]];

describe('CanvasWorld', () => {
  describe('constructor', () => {
    it('sets canvases', () => {
      expect(new CanvasWorld([1]).canvases).toEqual([1]);
    });
  });
  describe('worldBounds', () => {
    it('calculates a world bounds for the given canvases', () => {
      expect(new CanvasWorld([canvases[1]]).worldBounds()).toEqual([0, 0, 6501, 4421]);
      expect(new CanvasWorld(canvasSubset).worldBounds()).toEqual([0, 0, 9153, 4288]);
    });
  });
  describe('canvasToWorldCoordinates', () => {
    it('converts canvas coordinates to world offset by location', () => {
      expect(new CanvasWorld([canvases[1]]).canvasToWorldCoordinates(0))
        .toEqual([0, 0, 6501, 4421]);
      expect(new CanvasWorld(canvasSubset).canvasToWorldCoordinates(1))
        .toEqual([6305, 0, 2848, 4288]);
    });
  });
  describe('offsetByCanvas', () => {
    it('calculates an offset that can be used to translate annotations', () => {
      expect(
        new CanvasWorld(canvasSubset).offsetByCanvas('https://purl.stanford.edu/fr426cg9537/iiif/canvas/fr426cg9537_1'),
      ).toEqual({ x: 0, y: 0 });
      expect(
        new CanvasWorld(canvasSubset).offsetByCanvas('https://purl.stanford.edu/rz176rt6531/iiif/canvas/rz176rt6531_1'),
      ).toEqual({ x: 6501, y: 0 });
    });
  });
  describe('indexOfTarget', () => {
    it('returns the index of a target in canvases', () => {
      expect(
        new CanvasWorld(canvasSubset).indexOfTarget('https://purl.stanford.edu/rz176rt6531/iiif/canvas/rz176rt6531_1'),
      ).toEqual(1);
    });
  });
});
