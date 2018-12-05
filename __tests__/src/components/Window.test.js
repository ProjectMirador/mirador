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
      // We need to attach this to something created by our JSDOM instance.
      // Also need to provide context of the store so that connected sub components
      // can render effectively.
      { attachTo: document.getElementById('main'), context: { store } },
    );
  });

  it('returns the width and height style attribute', () => {
    wrapper = shallow(<Window store={store} id={window.id} />, { context: { store } });
    expect(wrapper.dive().instance().styleAttributes())
      .toEqual({ width: '400px', height: '400px' });
  });

  it('renders without an error', () => {
    expect(wrapper.find('.mirador-window').prop('style')).toHaveProperty('width', '400px');
    expect(wrapper.find('.mirador-window').prop('style')).toHaveProperty('height', '400px');
    expect(wrapper.find('div.mirador-window').length).toBe(1);
    expect(wrapper.find('div.mirador-window img').prop('src')).toBe('http://placekitten.com/200/300');
  });

  it('OpenSeaDragon instantiates', () => {
    // Hacky as heck thing we have to do, as `#find` (and other methods on ReactWrapper)
    // do not effectively find elements (even though they are there)
    expect(wrapper.render().find('.openseadragon-canvas').length).toBe(1);
  });
});
