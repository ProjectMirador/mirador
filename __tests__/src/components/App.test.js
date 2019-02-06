import React from 'react';
import { shallow } from 'enzyme';
import App from '../../../src/components/App';

describe('App', () => {
  it('renders without an error', () => {
    const wrapper = shallow(
      <App
        manifests={[]}
        workspace={{}}
        config={{ theme: 'light' }}
      />,
    );
    expect(wrapper.dive().find('div.mirador-app').length).toBe(1);
  });

  describe('FullScreen', () => {
    it('is enabled by the workspace.fullscreen state', () => {
      const wrapper = shallow(
        <App
          manifests={[]}
          workspace={{ isFullscreenEnabled: true }}
          config={{ theme: 'light' }}
        />,
      );
      expect(wrapper.dive().find('FullScreen').first().prop('enabled')).toEqual(true);
    });
  });
});
