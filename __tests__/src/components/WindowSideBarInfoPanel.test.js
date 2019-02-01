import React from 'react';
import { shallow } from 'enzyme';
import createStore from '../../../src/state/createStore';
import * as actions from '../../../src/state/actions';
import WindowSideBarInfoPanel from '../../../src/components/WindowSideBarInfoPanel';
import fixture from '../../fixtures/version-2/001.json';

describe('WindowSideBarInfoPanel', () => {
  let wrapper;
  let manifest;
  const store = createStore();

  beforeEach(() => {
    store.dispatch(actions.receiveManifest('foo', fixture));
    manifest = store.getState().manifests.foo;
    wrapper = shallow(<WindowSideBarInfoPanel manifest={manifest} />);
  });

  it('renders without an error', () => {
    expect(wrapper.find('h2').text()).toBe('About this item');
    expect(wrapper.find('h3').text()).toBe('Bodleian Library Human Freaks 2 (33)');
    expect(wrapper.find('.mirador-window-sidebar-info-panel div').text()).toBe('[Handbill of Mr. Becket, [1787] ]');
  });
});
