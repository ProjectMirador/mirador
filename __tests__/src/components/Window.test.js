import React from 'react';
import { mount, shallow } from 'enzyme';
import { actions, store } from '../../../src/store';
import Window from '../../../src/components/Window';
import fixture from '../../fixtures/24.json';

describe('Window', () => {
  let wrapper;
  let window;
  beforeEach(() => {
    store.dispatch(actions.receiveManifest('foo', fixture));
    store.dispatch(actions.addWindow({ manifestId: 'foo' }));
    [window] = store.getState().windows;
    wrapper = mount(
      <Window store={store} id={window.id} />,
      // We need to attach this to something created by our JSDOM instance
      { attachTo: document.getElementById('main') },
    );
  });

  it('returns the width and height style attribute', () => {
    expect(shallow(<Window store={store} id={window.id} />).dive().instance().styleAttributes())
      .toEqual({ width: '400px', height: '400px' });
  });

  it('renders without an error', () => {
    expect(wrapper.find('.mirador-window').prop('style')).toHaveProperty('width', '400px');
    expect(wrapper.find('.mirador-window').prop('style')).toHaveProperty('height', '400px');
    expect(wrapper.find('div.mirador-window').length).toBe(1);
    expect(wrapper.find('div.mirador-window h3').text()).toBe('Test 24 Manifest: Image with IIIF Service - adapted with real image');
    expect(wrapper.find('div.mirador-window img').prop('src')).toBe('http://placekitten.com/200/300');
  });

  it('OpenSeaDragon instantiates', () => {
    // Hacky as heck thing we have to do, as `#find` (and other methods on ReactWrapper)
    // do not effectively find elements (even though they are there)
    expect(wrapper.render().find('.openseadragon-canvas').length).toBe(1);
  });
});
