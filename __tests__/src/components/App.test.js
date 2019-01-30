import React from 'react';
import { shallow } from 'enzyme';
import App from '../../../src/components/App';

describe('App', () => {
  it('renders without an error', () => {
    const wrapper = shallow(<App manifests={[]} workspace={{}} />);
    expect(wrapper.find('div.mirador-app').length).toBe(1);
  });

  describe('FullScreen', () => {
    it('is enabled by the workspace.fullscreen state', () => {
      const wrapper = shallow(<App manifests={[]} workspace={{ fullscreen: true }} />);
      expect(wrapper.find('FullScreen').first().prop('enabled')).toEqual(true);
    });
  });
});
