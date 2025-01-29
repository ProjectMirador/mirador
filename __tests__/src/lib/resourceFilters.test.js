import { Utils } from 'manifesto.js';
import flattenDeep from 'lodash/flattenDeep';
import manifestFixture019 from '../../fixtures/version-2/019.json';
import {
  filterByProfiles, filterByTypes,
} from '../../../src/lib/resourceFilters';

describe('resourceFilters', () => {
  let canvas;
  beforeEach(() => {
    [canvas] = Utils.parseManifest(manifestFixture019).getSequences()[0].getCanvases();
  });
  describe('filterByProfiles', () => {
    it('filters resources', () => {
      const services = flattenDeep(canvas.resourceAnnotations.map((a) => a.getResource().getServices()));
      expect(filterByProfiles(services, 'http://iiif.io/api/image/2/level2.json').map((s) => s.id)).toEqual([
        'https://stacks.stanford.edu/image/iiif/hg676jb4964%2F0380_796-44',
      ]);
      expect(filterByProfiles(services, 'http://nonexistent.io/api/service.json').map((s) => s.id)).toEqual([]);
    });
  });
  describe('filterByTypes', () => {
    it('filters resources', () => {
      const resources = flattenDeep(canvas.resourceAnnotations.map((a) => a.getResource()));
      expect(filterByTypes(resources, 'dctypes:Image').map((r) => r.id)).toEqual([
        'https://stacks.stanford.edu/image/iiif/hg676jb4964%2F0380_796-44/full/full/0/default.jpg',
      ]);
      expect(filterByTypes(resources, 'Nonexistent').map((r) => r.id)).toEqual([]);
    });
  });
});
