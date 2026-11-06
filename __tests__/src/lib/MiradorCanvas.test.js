import { Utils } from 'manifesto.js';
import MiradorCanvas from '../../../src/lib/MiradorCanvas';
import fixture from '../../fixtures/version-2/019.json';
import serviceFixture from '../../fixtures/version-2/canvasService.json';
import otherContentFixture from '../../fixtures/version-2/299843.json';
import otherContentStringsFixture from '../../fixtures/version-2/BibliographicResource_3000126341277.json';
import fragmentFixture from '../../fixtures/version-2/hamilton.json';
import fragmentFixtureV3 from '../../fixtures/version-3/hamilton.json';
import audioFixture from '../../fixtures/version-3/0002-mvm-audio.json';
import textFixture from '../../fixtures/version-3/text-pdf.json';
import videoFixture from '../../fixtures/version-3/0015-start.json';
import videoWithAnnoCaptions from '../../fixtures/version-3/video_with_annotation_captions.json';

describe('MiradorCanvas', () => {
  let instance;
  beforeEach(() => {
    instance = new MiradorCanvas(Utils.parseManifest(fixture).getSequences()[0].getCanvases()[0]);
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
          const otherContentInstance = new MiradorCanvas(
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
          const otherContentInstance = new MiradorCanvas(
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

  describe('aspectRatio', () => {
    it('calculates a width / height aspectRatio', () => {
      expect(instance.aspectRatio).toBeCloseTo(0.667);
    });
  });
  describe('service', () => {
    it('correctly returns the service information for the given canvas', () => {
      const serviceInstance = new MiradorCanvas(Utils.parseManifest(serviceFixture).getSequences()[0].getCanvases()[0]);

      expect(serviceInstance.service).toBeDefined();
    });

    it('returns undefined if there is no service', () => {
      expect(instance.service).toBeUndefined();
    });
  });
  describe('resourceAnnotation', () => {
    it('returns the containing Annotation for a given contentResource id', () => {
      instance = new MiradorCanvas(Utils.parseManifest(fragmentFixture).getSequences()[0].getCanvases()[0]);
      expect(
        instance.resourceAnnotation('https://prtd.app/image/iiif/2/hamilton%2fHL_524_1r_00_PC17/full/739,521/0/default.jpg').id,
      ).toEqual('https://prtd.app/hamilton/canvas/p1/anno-02.json');
    });
    it('returns the containing Annotation for a given contentResource id v3', () => {
      instance = new MiradorCanvas(Utils.parseManifest(fragmentFixtureV3).getSequences()[0].getCanvases()[0]);
      expect(
        instance.resourceAnnotation('https://images.prtd.app/iiif/2/hamilton%2fHL_524_1r_00_PC17/full/739,521/0/default.jpg').id,
      ).toEqual('https://dvp.prtd.app/hamilton/canvas/p1/anno-02.json');
    });
  });
  describe('onFragment', () => {
    it('when a fragment selector exists for a given contentResources id, returns that fragment', () => {
      instance = new MiradorCanvas(Utils.parseManifest(fragmentFixture).getSequences()[0].getCanvases()[0]);
      expect(
        instance.onFragment('https://prtd.app/image/iiif/2/hamilton%2fHL_524_1r_00_PC17/full/739,521/0/default.jpg'),
      ).toEqual([552, 1584, 3360, 2368]);
    });
    it('when a fragment selector exists for a given contentResources id, returns that fragment v3', () => {
      instance = new MiradorCanvas(Utils.parseManifest(fragmentFixtureV3).getSequences()[0].getCanvases()[0]);
      expect(
        instance.onFragment('https://images.prtd.app/iiif/2/hamilton%2fHL_524_1r_00_PC17/full/739,521/0/default.jpg'),
      ).toEqual([552, 1584, 3360, 2368]);
    });

    // Object targets are valid in v3 and are the norm in Presentation 4
    // (https://preview.iiif.io/cookbook/v4-0005-image-svc-single-image/recipe/0005-image-service/)
    const canvasPage = 'https://dvp.prtd.app/hamilton/canvas/p1.json';
    const pc17 = 'https://images.prtd.app/iiif/2/hamilton%2fHL_524_1r_00_PC17/full/739,521/0/default.jpg';
    /** the v3 Hamilton canvas, with the annotation painting `bodyId` given a new target */
    const hamiltonWithTarget = (bodyId, target) => {
      const manifest = structuredClone(fragmentFixtureV3);
      manifest.items[0].items[0].items.find((anno) => anno.body.id === bodyId).target = target;
      return new MiradorCanvas(Utils.parseManifest(manifest).getSequences()[0].getCanvases()[0]);
    };

    it('fills the canvas for an object target with no fragment (as in Presentation 4)', () => {
      instance = hamiltonWithTarget(pc17, { id: canvasPage, type: 'Canvas' });
      expect(instance.onFragment(pc17)).toBeUndefined();
    });
    it('places the image using a SpecificResource fragment selector', () => {
      instance = hamiltonWithTarget(pc17, {
        selector: { type: 'FragmentSelector', value: 'xywh=552,1584,3360,2368' },
        source: { id: canvasPage, type: 'Canvas' },
        type: 'SpecificResource',
      });
      expect(instance.onFragment(pc17)).toEqual([552, 1584, 3360, 2368]);
    });
  });
  describe('xywhFragment', () => {
    const c = 'https://example.org/c1';
    it.each([
      ['a string with a fragment', `${c}#xywh=1,2,3,4`, '1,2,3,4'],
      ['an { id } with a fragment', { id: `${c}#xywh=1,2,3,4` }, '1,2,3,4'],
      ['a SpecificResource selector', { selector: { value: 'xywh=1,2,3,4' }, source: c }, '1,2,3,4'],
      ['a v2 { full, selector }', { full: c, selector: { value: 'xywh=1,2,3,4' } }, '1,2,3,4'],
      ['an array of targets', [{ id: `${c}#xywh=1,2,3,4` }], '1,2,3,4'],
      ['a plain canvas URI', c, undefined],
      ['an { id } without a fragment', { id: c, type: 'Canvas' }, undefined],
      ['a non-fragment selector', { selector: { type: 'SvgSelector', value: '<svg/>' }, source: c }, undefined],
      ['no target', undefined, undefined],
    ])('%s', (_name, target, expected) => {
      expect(MiradorCanvas.xywhFragment(target)).toEqual(expected);
    });
  });
  describe('videoResources', () => {
    it('returns video', () => {
      instance = new MiradorCanvas(Utils.parseManifest(videoFixture).getSequences()[0].getCanvases()[0]);
      expect(instance.videoResources.length).toEqual(1);
    });
  });
  describe('audioResources', () => {
    it('returns audio', () => {
      instance = new MiradorCanvas(Utils.parseManifest(audioFixture).getSequences()[0].getCanvases()[0]);
      expect(instance.audioResources.length).toEqual(1);
    });
  });
  describe('vttContent', () => {
    it('returns v2 vttContent', () => {
      instance = new MiradorCanvas(Utils.parseManifest(videoFixture).getSequences()[0].getCanvases()[0]);
      expect(instance.v2VttContent.length).toEqual(1);
    });
    it('returns v3 vttContent', () => {
      instance = new MiradorCanvas(Utils.parseManifest(videoWithAnnoCaptions).getSequences()[0].getCanvases()[0]);
      expect(instance.v3VttContent.length).toEqual(1);
    });
  });
  describe('IIIF image annotations', () => {
    it('sets preferred=true for prezi v2 image annotations without Choices', () => {
      instance = new MiradorCanvas(Utils.parseManifest(fixture).getSequences()[0].getCanvases()[0]);
      expect(instance.imageResources[0].preferred).toBe(true);
    });

    it('sets preferred=true for prezi v3 image annotations without Choices', () => {
      instance = new MiradorCanvas(Utils.parseManifest(fragmentFixtureV3).getSequences()[0].getCanvases()[0]);
      const firstImgWithoutChoice = instance.imageResources.find(
        (resource) => resource.id === 'https://images.prtd.app/iiif/2/hamilton%2fHL_524_1r_00_PC17/full/739,521/0/default.jpg',
      );
      expect(firstImgWithoutChoice.preferred).toBe(true);
      const lastImgWithoutChoice = instance.imageResources.find(
        (resource) =>
          resource.id === 'https://images.prtd.app/iiif/2/hamilton%2fHL_524_1r_00_PCA_RGB-1-3-5_gradi/full/739,521/0/default.jpg',
      );
      expect(lastImgWithoutChoice.preferred).toBe(true);
    });

    it('sets preferred=true for default prezi v2 Choice option', () => {
      instance = new MiradorCanvas(Utils.parseManifest(fragmentFixture).getSequences()[0].getCanvases()[0]);
      const preferredOption = instance.imageResources.find(
        (resource) => resource.id === 'https://prtd.app/image/iiif/2/hamilton%2fHL_524_1r_00_PSC/full/862,1024/0/default.jpg',
      );
      expect(preferredOption.preferred).toBe(true);
    });

    it('sets preferred=true for first prezi v3 image Choice option', () => {
      instance = new MiradorCanvas(Utils.parseManifest(fragmentFixtureV3).getSequences()[0].getCanvases()[0]);
      const preferredOption = instance.imageResources.find(
        (resource) => resource.id === 'https://images.prtd.app/iiif/2/hamilton%2fHL_524_1r_00_PSC/full/,800/0/default.jpg',
      );
      expect(preferredOption.preferred).toBe(true);
    });

    it('sets preferred=false for alternative prezi v2 Choice options', () => {
      instance = new MiradorCanvas(Utils.parseManifest(fragmentFixture).getSequences()[0].getCanvases()[0]);
      const firstAlternative = instance.imageResources.find(
        (img) => img.id === 'https://prtd.app/image/iiif/2/hamilton%2fHL_524_1r_00_TS_Blue/full/862,1024/0/default.png',
      );
      expect(firstAlternative.preferred).toBe(false);
      const lastAlternative = instance.imageResources.find(
        (img) => img.id === 'https://prtd.app/image/iiif/2/hamilton%2fHL_524_1r_00_017_F/full/862,1024/0/default.jpg',
      );
      expect(lastAlternative.preferred).toBe(false);
    });

    it('sets preferred=false for alternative prezi v3 Choice options', () => {
      instance = new MiradorCanvas(Utils.parseManifest(fragmentFixtureV3).getSequences()[0].getCanvases()[0]);
      const firstAlternative = instance.imageResources.find(
        (img) => img.id === 'https://images.prtd.app/iiif/2/hamilton%2fHL_524_1r_00_TS_Blue/full/862,1024/0/default.png',
      );
      expect(firstAlternative.preferred).toBe(false);
      const lastAlternative = instance.imageResources.find(
        (img) => img.id === 'https://images.prtd.app/iiif/2/hamilton%2fHL_524_1r_00_017_F/full/,800/0/default.jpg',
      );
      expect(lastAlternative.preferred).toBe(false);
    });
  });

  describe('textResources', () => {
    it('returns text', () => {
      instance = new MiradorCanvas(Utils.parseManifest(textFixture).getSequences()[0].getCanvases()[0]);
      expect(instance.textResources.length).toEqual(1);
    });
  });
});
