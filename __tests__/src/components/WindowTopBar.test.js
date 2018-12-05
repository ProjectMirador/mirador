import React from 'react';
import { shallow } from 'enzyme';
import { actions, store } from '../../../src/store';
import WindowTopBar from '../../../src/components/WindowTopBar';
import fixture from '../../fixtures/24.json';

describe('Window', () => {
  let wrapper;
  let window;
  beforeEach(() => {
    store.dispatch(actions.receiveManifest('foo', fixture));
    store.dispatch(actions.addWindow({ manifestId: 'foo' }));
    const manifest = store.getState().manifests.foo;
    [window] = store.getState().windows;
    wrapper = shallow(<WindowTopBar store={store} manifest={manifest} windowId={window.id} />)
      .dive();
  });

  it('renders without an error', () => {
    expect(wrapper.find('div.mirador-window-top-bar h3').text()).toBe('Test 24 Manifest: Image with IIIF Service - adapted with real image');
    expect(wrapper.find('button.mirador-window-close'));
  });
});
