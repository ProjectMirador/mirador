import React from 'react';
import { shallow } from 'enzyme';
import createStore from '../../../src/state/createStore';
import * as actions from '../../../src/state/actions';
import ManifestMetadata from '../../../src/components/ManifestMetadata';
import fixture from '../../fixtures/version-2/002.json';

describe('ManifestMetadata', () => {
  let wrapper;
  let manifest;
  const store = createStore();
  beforeEach(() => {
    store.dispatch(actions.receiveManifest('foo', fixture));
    manifest = store.getState().manifests.foo;
    wrapper = shallow(<ManifestMetadata manifest={manifest} />);
  });

  it('renders without an error', () => {
    expect(wrapper.find('h3').text()).toBe('Test 2 Manifest: Metadata Pairs');
    expect(wrapper.find('.mirador-description').length).toBe(1);
  });
});
