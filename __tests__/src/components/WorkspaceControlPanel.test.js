import React from 'react';
import { shallow } from 'enzyme';
import { actions, store } from '../../../src/store';

import WorkspaceControlPanel from '../../../src/components/WorkspaceControlPanel';
import fixture from '../../fixtures/version-2/002.json';

describe('WorkspaceControlPanel', () => {
  let wrapper;
  beforeEach(() => {
    store.dispatch(actions.receiveManifest('foo', fixture));
    store.dispatch(actions.receiveManifest('bar', fixture));
    wrapper = shallow(<WorkspaceControlPanel store={store} />).dive();
  });

  it('renders without an error', () => {
    expect(wrapper.find('div.mirador-workspace-control-panel').length).toBe(1);
  });

  it('renders a list item for each manifest in the state', () => {
    expect(wrapper.find('ul Connect(ManifestListItem)').length).toBe(2);
  });

  it('renders a Display component', () => {
    expect(wrapper.find('Display').length).toBe(1);
  });

  it('contains svg images', () => {
    expect((wrapper).find('SvgAdd').length).toBe(1);
    expect((wrapper).find('SvgDots').length).toBe(1);
  });
});
