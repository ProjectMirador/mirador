import React from 'react';
import { shallow } from 'enzyme';
import { AudioViewer } from '../../../src/components/AudioViewer';

/** create wrapper */
function createWrapper(props, suspenseFallback) {
  return shallow(
    <AudioViewer
      classes={{}}
      audioOptions={{ crossOrigin: 'anonymous' }}
      {...props}
    />,
  );
}

describe('AudioViewer', () => {
  let wrapper;
  describe('render', () => {
    it('audioResources', () => {
      wrapper = createWrapper({
        audioResources: [
          { getFormat: () => 'video/mp4', id: 1 },
          { getFormat: () => 'video/mp4', id: 2 },
        ],
      }, true);
      expect(wrapper.contains(<source src={1} type="video/mp4" />)).toBe(true);
      expect(wrapper.contains(<source src={2} type="video/mp4" />)).toBe(true);
    });
    it('passes through configurable options', () => {
      wrapper = createWrapper({
        audioResources: [
          { getFormat: () => 'audio/mp3', id: 1 },
        ],
      }, true);
      expect(wrapper.exists('audio[crossOrigin="anonymous"]')).toBe(true); // eslint-disable-line jsx-a11y/media-has-caption
    });
    it('captions', () => {
      wrapper = createWrapper({
        audioResources: [
          { getFormat: () => 'video/mp4', id: 1 },
        ],
        captions: [
          { getDefaultLabel: () => 'English', getProperty: () => 'en', id: 1 },
          { getDefaultLabel: () => 'French', getProperty: () => 'fr', id: 2 },
        ],
      }, true);
      expect(wrapper.contains(<track src={1} label="English" srcLang="en" />)).toBe(true);
      expect(wrapper.contains(<track src={2} label="French" srcLang="fr" />)).toBe(true);
    });
  });
});
