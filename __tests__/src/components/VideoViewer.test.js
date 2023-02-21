import { shallow } from 'enzyme';
import { Utils } from 'manifesto.js';
import AnnotationFactory from '../../../src/lib/AnnotationFactory';
import { VideoViewer } from '../../../src/components/VideoViewer';
import videoSimple from '../../fixtures/version-3/video.json';
import videoCaptions from '../../fixtures/version-3/video_captions.json';
import videoMultiCaptions from '../../fixtures/version-3/video_multiples_captions.json';
import videoMultiCaptionsMultiAnno from '../../fixtures/version-3/video_captions_other.json';

/** create wrapper */
function createWrapper(props, suspenseFallback) {
  return shallow(
    <VideoViewer
      classes={{}}
      videoOptions={{ crossOrigin: 'anonymous' }}
      {...props}
    />,
  );
}

describe('VideoViewer', () => {
  let wrapper;
  describe('render', () => {
    it('video', () => {
      wrapper = createWrapper({
        canvas: Utils.parseManifest(videoSimple).getSequences()[0].getCanvases()[0],
      }, true);
      expect(wrapper.exists('video[crossOrigin="anonymous"]')).toBe(true); // eslint-disable-line jsx-a11y/media-has-caption
      expect(wrapper.contains(<source src="https://fixtures.iiif.io/video/indiana/30-minute-clock/medium/30-minute-clock.mp4" type="video/mp4" />)).toBe(true);
    });
    it('one caption', () => {
      const canvas = Utils.parseManifest(videoCaptions).getSequences()[0].getCanvases()[0];
      /* cf selectors/annotations/getPresentAnnotationsCanvas */
      const annotations = canvas.__jsonld.annotations.flatMap((a) => AnnotationFactory.determineAnnotation(a));
      wrapper = createWrapper({
        annotations,
        canvas,
      }, true);
      expect(wrapper.contains(<track src="https://fixtures.iiif.io/video/indiana/lunchroom_manners/lunchroom_manners.vtt" srcLang="en" />)).toBe(true);
      expect(wrapper.exists('video[crossOrigin="anonymous"]')).toBe(true); // eslint-disable-line jsx-a11y/media-has-caption
    });
    it('multiples captions', () => {
      const canvas = Utils.parseManifest(videoMultiCaptions).getSequences()[0].getCanvases()[0];
      /* cf selectors/annotations/getPresentAnnotationsCanvas */
      const annotations = canvas.__jsonld.annotations.flatMap((a) => AnnotationFactory.determineAnnotation(a));
      wrapper = createWrapper({
        annotations,
        canvas,
      }, true);
      expect(wrapper.contains(<track src="https://fixtures.iiif.io/video/indiana/lunchroom_manners/lunchroom_manners.vtt#en" srcLang="en" />)).toBe(true);
      expect(wrapper.contains(<track src="https://fixtures.iiif.io/video/indiana/lunchroom_manners/lunchroom_manners.vtt#fr" srcLang="fr" />)).toBe(true);
      expect(wrapper.exists('video[crossOrigin="anonymous"]')).toBe(true); // eslint-disable-line jsx-a11y/media-has-caption
    });
    it('multiples captions in multiples annotations', () => {
      const canvas = Utils.parseManifest(videoMultiCaptionsMultiAnno).getSequences()[0].getCanvases()[0];
      /* cf selectors/annotations/getPresentAnnotationsCanvas */
      const annotations = canvas.__jsonld.annotations.flatMap((a) => AnnotationFactory.determineAnnotation(a));
      wrapper = createWrapper({
        annotations,
        canvas,
      }, true);
      expect(wrapper.contains(<track src="https://fixtures.iiif.io/video/indiana/lunchroom_manners/lunchroom_manners.vtt#en" srcLang="en" />)).toBe(true);
      expect(wrapper.contains(<track src="https://fixtures.iiif.io/video/indiana/lunchroom_manners/lunchroom_manners.vtt#fr" srcLang="fr" />)).toBe(true);
      expect(wrapper.contains(<track src="https://fixtures.iiif.io/video/indiana/lunchroom_manners/lunchroom_manners.vtt#ru" srcLang="ru" />)).toBe(true);
      expect(wrapper.exists('video[crossOrigin="anonymous"]')).toBe(true); // eslint-disable-line jsx-a11y/media-has-caption
    });
  });
});
