import React from 'react';
import { shallow } from 'enzyme';
import { actions, store } from '../../../src/store';
import WindowBackground from '../../../src/components/WindowBackground';
import fixture from '../../fixtures/version-2/024.json';

describe('WindowBackground', () => {
  let wrapper;
  beforeEach(() => {
    store.dispatch(actions.receiveManifest('foo', fixture));
    store.dispatch(actions.addWindow({ manifestId: 'foo' }));
    const manifest = store.getState().manifests.foo;
    wrapper = shallow(<WindowBackground manifest={manifest} />);
  });

  it('renders without an error', () => {
    expect(wrapper.find('img').prop('src')).toBe('http://placekitten.com/200/300');
  });

  it('without a manifest, renders an empty', () => {
    expect(shallow(<WindowBackground manifest={null} />).html()).toBe('<div></div>');
  });
});
