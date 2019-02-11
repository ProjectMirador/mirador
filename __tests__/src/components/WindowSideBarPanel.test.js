import React from 'react';
import { shallow } from 'enzyme';
import createStore from '../../../src/state/createStore';
import * as actions from '../../../src/state/actions';
import WindowSideBarPanel from '../../../src/components/WindowSideBarPanel';
import WindowSideBarInfoPanel from '../../../src/containers/WindowSideBarInfoPanel';
import fixture from '../../fixtures/version-2/001.json';

describe('WindowSideBarPanel', () => {
  let wrapper;
  let manifest;
  const store = createStore();

  beforeEach(() => {
    store.dispatch(actions.receiveManifest('foo', fixture));
    manifest = store.getState().manifests.foo;
  });

  describe('when the sideBarPanel is set to "info"', () => {
    beforeEach(() => {
      wrapper = shallow(<WindowSideBarPanel sideBarPanel="info" manifest={manifest} />);
    });

    it('renders the WindowSideBarInfoPanel', () => {
      expect(wrapper.find(WindowSideBarInfoPanel).length).toBe(1);
    });
  });

  describe('when the sideBarPanel is set to "closed" (or any other unknown value)', () => {
    beforeEach(() => {
      wrapper = shallow(<WindowSideBarPanel sideBarPanel="closed" manifest={manifest} />);
    });

    it('does not render any panel component', () => {
      expect(wrapper.find(WindowSideBarInfoPanel).length).toBe(0);
    });
  });
});
