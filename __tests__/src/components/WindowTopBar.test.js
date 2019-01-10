import React from 'react';
import { mount } from 'enzyme';
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
    wrapper = mount(
      <WindowTopBar store={store} manifest={manifest} windowId={window.id} />,
      // We need to attach this to something created by our JSDOM instance.
      // Also need to provide context of the store so that connected sub components
      // can render effectively.
      { attachTo: document.getElementById('main'), context: { store } },
    );
  });

  it('renders without an error', () => {
    expect(wrapper.find('div.mirador-window-top-bar h3').text()).toBe('Test 24 Manifest: Image with IIIF Service - adapted with real image');
    expect(wrapper.find('button.mirador-window-close'));
  });
});
