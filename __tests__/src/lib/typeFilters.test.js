import { JSONLDResource } from 'manifesto.js';
import { v4 as uuid } from 'uuid';
import {
  filterByTypes, audioResourcesFrom, anyImageServices, hasImageService,
  iiifImageResourcesFrom, textResourcesFrom, videoResourcesFrom,
} from '../../../src/lib/typeFilters';

/**
 */
function resourceFixtureForProps(props) {
  return new JSONLDResource({
    id: uuid(),
    ...props,
  });
}

describe('filterByTypes', () => {
  it('returns a resource of one type', () => {
    const typeFixture = 'someType';
    const resourceFixture = resourceFixtureForProps({ '@type': typeFixture });
    expect(filterByTypes([resourceFixture], typeFixture)).toEqual([resourceFixture]);
  });
  it('returns a resource of any given types', () => {
    const typeFixture = 'someType';
    const resourceFixture = resourceFixtureForProps({ '@type': typeFixture });
    expect(filterByTypes([resourceFixture], ['anotherType', typeFixture])).toEqual([resourceFixture]);
  });
});

describe('audioResourcesFrom', () => {
  it('returns a resource of audio type', () => {
    const typeFixture = 'Audio';
    const resourceFixture = resourceFixtureForProps({ '@type': typeFixture });
    expect(audioResourcesFrom([resourceFixture])).toEqual([resourceFixture]);
  });
});

describe('videoResourcesFrom', () => {
  it('returns a resource of audio type', () => {
    const typeFixture = 'Video';
    const resourceFixture = resourceFixtureForProps({ '@type': typeFixture });
    expect(videoResourcesFrom([resourceFixture])).toEqual([resourceFixture]);
  });
});

describe('textResourcesFrom', () => {
  it('returns a resource of audio type', () => {
    const typeFixture = 'Document';
    const resourceFixture = resourceFixtureForProps({ '@type': typeFixture });
    expect(textResourcesFrom([resourceFixture])).toEqual([resourceFixture]);
  });
});
