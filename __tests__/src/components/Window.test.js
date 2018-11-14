import React from 'react';
import { mount } from 'enzyme';
import { actions, store } from '../../../src/store';
import Window from '../../../src/components/Window';
import fixture from '../../fixtures/2.json';

describe('Window', () => {
  let wrapper;
  let window;
  beforeEach(() => {
    store.dispatch(actions.receiveManifest('foo', fixture));
    store.dispatch(actions.addWindow({ manifestId: 'foo' }));
    [window] = store.getState().windows;
    wrapper = mount(<Window store={store} id={window.id} />);
  });

  it('returns the width and height style attribute', () => {
    console.log("IT's HEEEEEEEEEEEEEEEEEERE!");
    console.log(wrapper.debug());
    expect(wrapper.ref('div').styleAttributes()).toEqual({ width: '400px', height: '400px' });
  });

  it('renders without an error', () => {
    expect(wrapper.find('.mirador-window').prop('style')).toHaveProperty('width', '400px');
    expect(wrapper.find('.mirador-window').prop('style')).toHaveProperty('height', '400px');
    expect(wrapper.find('div.mirador-window').length).toBe(1);
    expect(wrapper.find('div.mirador-window h3').text()).toBe('Test 2 Manifest: Metadata Pairs');
    expect(wrapper.find('div.mirador-window img').prop('src')).toBe('http://placekitten.com/200/300');
  });
});
