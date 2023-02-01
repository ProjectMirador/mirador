import { shallow } from 'enzyme';
import { Utils } from 'manifesto.js';
import { VideoViewer } from '../../../src/components/VideoViewer';
import videoSimple from '../../fixtures/version-3/video.json';

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
    const canvasSimple = Utils.parseManifest(videoSimple).getSequences()[0].getCanvases()[0];
    it('videoResources', () => {
      wrapper = createWrapper({
        canvas: canvasSimple,
      }, true);
      expect(wrapper.contains(<source src="https://fixtures.iiif.io/video/indiana/30-minute-clock/medium/30-minute-clock.mp4" type="video/mp4" />)).toBe(true);
    });
    it('passes through configurable options', () => {
      wrapper = createWrapper({
        canvas: canvasSimple,
      }, true);
      expect(wrapper.exists('video[crossOrigin="anonymous"]')).toBe(true); // eslint-disable-line jsx-a11y/media-has-caption
    });
  });
});
