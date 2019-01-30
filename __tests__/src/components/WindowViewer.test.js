import React from 'react';
import { mount } from 'enzyme';
import createStore from '../../../src/state/createStore';
import * as actions from '../../../src/state/actions';
import WindowViewer from '../../../src/components/WindowViewer';
import fixture from '../../fixtures/version-2/024.json';

describe('WindowViewer', () => {
  let wrapper;
  const store = createStore();
  beforeEach(() => {
    store.dispatch(actions.receiveManifest('foo', fixture));
    store.dispatch(actions.addWindow({ manifestId: 'foo' }));
    store.dispatch(actions.setConfig({ thumbnailNavigation: { height: 150 } }));
    const manifest = store.getState().manifests.foo;
    const { windows } = store.getState();
    const window = Object.values(windows)[0];
    wrapper = mount(
      <WindowViewer manifest={manifest} window={window} />,
      // We need to attach this to something created by our JSDOM instance.
      // Also need to provide context of the store so that connected sub components
      // can render effectively.
      { attachTo: document.getElementById('main'), context: { store } },
    );
  });

  it('OpenSeaDragon instantiates', () => {
    // Hacky as heck thing we have to do, as `#find` (and other methods on ReactWrapper)
    // do not effectively find elements (even though they are there)
    expect(wrapper.render().find('.openseadragon-canvas').length).toBe(1);
  });
  it('has navigation controls', () => {
    expect(wrapper.find('.mirador-osd-navigation').length).toBe(1);
  });
});
