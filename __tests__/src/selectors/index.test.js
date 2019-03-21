import {
  getAllOrSelectedAnnotations,
  getAnnotationResourcesByMotivation,
  getIdAndContentOfResources,
  getLanguagesFromConfigWithCurrent,
  getSelectedAnnotationIds,
  getSelectedTargetAnnotations,
  getSelectedTargetsAnnotations,
  getSelectedTargetAnnotationResources,
} from '../../../src/state/selectors';
import Annotation from '../../../src/lib/Annotation';
import AnnotationResource from '../../../src/lib/AnnotationResource';

describe('getSelectedTargetAnnotations', () => {
  it('returns annotations for the given canvasId that have resources', () => {
    const state = {
      annotations: {
        abc123: {
          annoId1: { '@id': 'annoId1', json: { resources: ['aResource'] } },
          annoId2: { '@id': 'annoId2' },
          annoId3: { '@id': 'annoId3', json: { resources: [] } },
        },
      },
    };

    expect(getSelectedTargetAnnotations(state, 'abc123').length).toEqual(1);
  });

  it('returns an empty array if there are no annotations', () => {
    const state = { annotations: { xyz321: {} } };
    const expected = [];

    expect(getSelectedTargetAnnotations({}, 'abc123')).toEqual(expected);
    expect(getSelectedTargetAnnotations(state, 'abc123')).toEqual(expected);
  });
});

describe('getSelectedTargetsAnnotations', () => {
  it('returns annotations for multiple canvasIds', () => {
    const state = {
      annotations: {
        abc123: {
          annoId1: { '@id': 'annoId1', json: { resources: ['aResource'] } },
          annoId2: { '@id': 'annoId2' },
          annoId3: { '@id': 'annoId3', json: { resources: [] } },
        },
        def456: {
          annoId4: { '@id': 'annoId4', json: { resources: ['helloWorld'] } },
        },
      },
    };

    expect(getSelectedTargetsAnnotations(state, ['abc123', 'def456']).length).toEqual(2);
  });

  it('returns an empty array if there are no annotations', () => {
    const state = { annotations: { xyz321: {} } };
    const expected = [];

    expect(getSelectedTargetsAnnotations({}, ['abc123'])).toEqual(expected);
    expect(getSelectedTargetsAnnotations(state, ['abc123'])).toEqual(expected);
  });
});

describe('getAnnotationResourcesByMotivation', () => {
  const annotations = [
    new Annotation({ resources: [{ motivation: 'oa:commenting' }] }),
    new Annotation({ resources: [{ motivation: 'oa:not-commenting' }] }),
    new Annotation({ resources: [{ motivation: ['sc:something-else', 'oa:commenting'] }] }),
  ];

  it('returns an array of annotation resources (filtered by the passed in array of motiviations)', () => {
    const expected = [
      ['oa:commenting'],
      ['sc:something-else', 'oa:commenting'],
    ];

    expect(
      getAnnotationResourcesByMotivation(annotations, ['something', 'oa:commenting']).map(r => r.motivations),
    ).toEqual(expected);
  });
});

describe('getIdAndContentOfResources', () => {
  it('returns an array if id/content objects from the annotation resources', () => {
    const annotations = [
      new AnnotationResource({ '@id': 'theId', on: 'example.com', resource: { chars: 'The Content' } }),
    ];
    const expected = [
      {
        content: 'The Content',
        id: 'theId',
        targetId: 'example.com',
      },
    ];

    expect(getIdAndContentOfResources(annotations)).toEqual(expected);
  });

  it('provides an ID as a UUID if the annotation does not have one', () => {
    const annotations = [
      new AnnotationResource({ resource: { chars: 'The Content' } }),
    ];

    expect(getIdAndContentOfResources(annotations)[0].id).toEqual(
      expect.stringMatching(/[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}/),
    );
  });

  it('handles resource arrays', () => {
    const annotations = [
      new AnnotationResource({ '@id': 'theId', on: 'example.com', resource: [{ chars: 'The' }, { chars: 'Content' }] }),
    ];
    const expected = [
      {
        content: 'The Content',
        id: 'theId',
        targetId: 'example.com',
      },
    ];

    expect(getIdAndContentOfResources(annotations)).toEqual(expected);
  });
});

describe('getLanguagesFromConfigWithCurrent', () => {
  it('returns an array of objects with locale, label, and current properties', () => {
    const state = {
      config: {
        availableLanguages: {
          epo: 'Esparanto',
          tlh: 'Klingon',
        },
        language: 'epo',
      },
    };

    const expected = [
      {
        current: true,
        label: 'Esparanto',
        locale: 'epo',
      },
      {
        current: false,
        label: 'Klingon',
        locale: 'tlh',
      },
    ];

    expect(getLanguagesFromConfigWithCurrent(state)).toEqual(expected);
  });
});

it('getSelectedAnnotationIds returns an array of selected annotation IDs from state', () => {
  const state = {
    windows: {
      wid: {
        selectedAnnotations: {
          tid1: ['aid1', 'aid2'],
          tid2: ['aid3'],
        },
      },
    },
  };

  expect(getSelectedAnnotationIds(state, 'wid', ['tid2'])).toEqual(
    ['aid3'],
  );
  expect(getSelectedAnnotationIds(state, 'wid', ['tid1', 'tid2'])).toEqual(
    ['aid1', 'aid2', 'aid3'],
  );
});

it('getSelectedTargetAnnotationResources filters the annotation resources by the annotationIds passed in', () => {
  const state = {
    annotations: {
      cid1: {
        annoId1: { id: 'annoId1', json: { resources: [{ '@id': 'annoId1' }, { '@id': 'annoId2' }] } },
      },
    },
  };

  expect(
    getSelectedTargetAnnotationResources(state, ['cid1'], ['annoId1'])[0].resources.length,
  ).toBe(1);

  expect(
    getSelectedTargetAnnotationResources(state, ['cid1'], ['annoId1', 'annoId2'])[0].resources.length,
  ).toBe(2);
});

describe('getAllOrSelectedAnnotations', () => {
  it('returns all annotations if the given window is set to display all', () => {
    const state = {
      annotations: {
        cid1: {
          annoId1: { id: 'annoId1', json: { resources: [{ '@id': 'annoId1' }, { '@id': 'annoId2' }] } },
        },
      },
      windows: {
        abc123: { displayAllAnnotations: true },
      },
    };

    expect(
      getAllOrSelectedAnnotations(state, 'abc123', ['cid1'], ['annoId1'])[0].resources.length,
    ).toBe(2);
  });

  it('returns only selected annotations if the window is not set to display all', () => {
    const state = {
      annotations: {
        cid1: {
          annoId1: { id: 'annoId1', json: { resources: [{ '@id': 'annoId1' }, { '@id': 'annoId2' }] } },
        },
      },
      windows: {
        abc123: { displayAllAnnotations: false },
      },
    };

    expect(
      getAllOrSelectedAnnotations(state, 'abc123', ['cid1'], ['annoId1'])[0].resources.length,
    ).toBe(1);
  });
});
