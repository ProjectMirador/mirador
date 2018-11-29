import React from 'react';
import { shallow } from 'enzyme';
import { actions, store } from '../../../src/store';
import ManifestMetadata from '../../../src/components/ManifestMetadata';
import fixture from '../../fixtures/2.json';

describe('ManifestMetadata', () => {
  let wrapper;
  let manifest;
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
