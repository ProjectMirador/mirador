import React from 'react';
import { mount, shallow } from 'enzyme';
import { actions, store } from '../../../src/store';
import Window from '../../../src/components/Window';
import fixture from '../../fixtures/24.json';

describe('Window', () => {
  let wrapper;
  let window;
  describe('with a manifest present', () => {
    beforeEach(() => {
      store.dispatch(actions.receiveManifest('foo', fixture));
      store.dispatch(actions.addWindow({ manifestId: 'foo' }));
      [window] = store.getState().windows;
      wrapper = mount(
        <Window store={store} id={window.id} />,
        // We need to attach this to something created by our JSDOM instance.
        // Also need to provide context of the store so that connected sub components
        // can render effectively.
        { attachTo: document.getElementById('main'), context: { store } }
      );
    });

    afterEach(() => {
      store.dispatch(actions.removeManifest('foo'));
    });

    it('returns the width and height style attribute', () => {
      wrapper = shallow(<Window store={store} id={window.id} />, { context: { store } });
      expect(
        wrapper
          .dive()
          .instance()
          .styleAttributes()
      ).toEqual({ width: '400px', height: '400px' });
    });

    it('renders without an error', () => {
      expect(wrapper.find('.mirador-window').prop('style')).toHaveProperty('width', '400px');
      expect(wrapper.find('.mirador-window').prop('style')).toHaveProperty('height', '400px');
      expect(wrapper.find('div.mirador-window').length).toBe(1);
      expect(wrapper.find('div.mirador-window img').prop('src')).toBe(
        'http://placekitten.com/200/300'
      );
    });

    it('renders the viewer', () => {
      expect(wrapper.find('WindowViewer').length).toBe(1);
    });
  });
  describe('without a manifest present', () => {
    beforeEach(() => {
      store.dispatch(actions.addWindow({ manifestId: 'foo' }));
      [window] = store.getState().windows;
      wrapper = shallow(<Window store={store} id={window.id} />, { context: { store } }).dive();
    });

    it('returns the width and height style attribute', () => {
      expect(wrapper.instance().styleAttributes()).toEqual({ width: '400px', height: '400px' });
    });

    it('renders without an error', () => {
      expect(wrapper.find('.mirador-window').prop('style')).toHaveProperty('width', '400px');
      expect(wrapper.find('.mirador-window').prop('style')).toHaveProperty('height', '400px');
      expect(wrapper.find('div.mirador-window img').length).toBe(0);
    });

    it('does not render the viewer', () => {
      expect(wrapper.find('WindowViewer').length).toBe(0);
    });
  });
});
