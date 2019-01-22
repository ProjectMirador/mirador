import React from 'react';
import { shallow } from 'enzyme';
import Display from '../../../src/components/Display';
import ManifestMetadata from '../../../src/components/ManifestMetadata';
import fixture from '../../fixtures/version-2/002.json';

describe('Display', () => {
  it('renders without an error', () => {
    const wrapper = shallow(<Display manifest={{}} />);
    expect(wrapper.contains(<div className="Display"><div id="exampleManifest" className=""><ManifestMetadata manifest={{}} /></div></div>)).toBe(true);
  });
  it('sets class based on manifest state', () => {
    let wrapper = shallow(<Display manifest={{ isFetching: true }} />);
    expect(wrapper.find('.mirador-fetching').length).toBe(1);

    wrapper = shallow(<Display manifest={{ error: true }} />);
    expect(wrapper.find('.mirador-error').length).toBe(1);
  });
  it('displays content', () => {
    let wrapper = shallow(<Display manifest={{ isFetching: true }} />);
    expect(wrapper.text()).toBe('☕');

    wrapper = shallow(<Display manifest={{ error: { message: 'bad things' } }} />);
    expect(wrapper.text()).toBe('bad things');

    wrapper = shallow(<Display manifest={{ json: fixture }} />);
    expect(wrapper.find(ManifestMetadata).length).toBe(1);
  });
});
