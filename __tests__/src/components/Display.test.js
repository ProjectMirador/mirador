import React from 'react';
import { shallow } from 'enzyme';
import Display from '../../../src/components/Display';

describe('Display', () => {
  it('renders without an error', () => {
    const wrapper = shallow(<Display manifest={{}} />);
    expect(wrapper.contains(<div className="Display"><pre id="exampleManifest" className="" /></div>)).toBe(true);
  });
  it('sets class based on manifest state', () => {
    let wrapper = shallow(<Display manifest={{ isFetching: true }} />);
    expect(wrapper.find('.fetching').length).toBe(1);

    wrapper = shallow(<Display manifest={{ error: true }} />);
    expect(wrapper.find('.error').length).toBe(1);
  });
  it('displays content', () => {
    let wrapper = shallow(<Display manifest={{ isFetching: true }} />);
    expect(wrapper.text()).toBe('☕');

    wrapper = shallow(<Display manifest={{ error: { message: 'bad things' } }} />);
    expect(wrapper.text()).toBe('bad things');

    wrapper = shallow(<Display manifest={{ json: { iiif: 'manifest' } }} />);
    expect(JSON.parse(wrapper.text())).toEqual({ iiif: 'manifest' });
  });
});
