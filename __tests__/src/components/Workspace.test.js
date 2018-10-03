import React from 'react';
import { shallow } from 'enzyme';
import { actions, store } from '../../../src/store';
import Workspace from '../../../src/components/Workspace';

describe('Workspace', () => {
  let wrapper;
  beforeEach(() => {
    store.dispatch(actions.receiveManifest({ manifestId: 'foo', manifestJson: '{}' }));
    store.dispatch(actions.addWindow({ manifestId: 'foo' }));
    wrapper = shallow(<Workspace store={store} />).dive();
  });

  it('renders without an error', () => {
    console.log(wrapper.debug());
    expect(wrapper.find('div.mirador-workspace').length).toBe(1);
    expect(wrapper.find('div.window').length).toBe(1);
    expect(wrapper.find('div.window').text()).toBe('foo');
  });
});
