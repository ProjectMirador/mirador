import React from 'react';
import { shallow } from 'enzyme';
import Typography from '@material-ui/core/Typography';
import MiradorMenuButton from '../../../src/containers/MiradorMenuButton';
import { CollapsibleSection } from '../../../src/components/CollapsibleSection';

/**
 * Helper function to create a shallow wrapper around CollapsibleSection
 */
function createWrapper(props) {
  return shallow(
    <CollapsibleSection
      classes={{}}
      id="abc123"
      label="The Section Label"
      t={k => k}

      {...props}
    >
      <span>Child content</span>
    </CollapsibleSection>,
  );
}

describe('CollapsibleSection', () => {
  let wrapper;
  beforeEach(() => {
    wrapper = createWrapper();
  });

  it('renders the passed in label is a Typography', () => {
    expect(wrapper.find(Typography).props().children).toEqual('The Section Label');
  });

  it('renders a mirador button with an icon dependent on the open state', () => {
    expect(wrapper.state().open).toBe(true);
    expect(wrapper.find('pure(KeyboardArrowUpSharpIcon)'));
    wrapper.setState({ open: false });
    expect(wrapper.find('pure(KeyboardArrowDownSharpIcon)'));
  });

  it('renders the appropriate i18n label based on open state', () => {
    expect(wrapper.state().open).toBe(true);
    expect(wrapper.find(MiradorMenuButton).props()['aria-label']).toEqual('collapseSection');
    wrapper.setState({ open: false });
    expect(wrapper.find(MiradorMenuButton).props()['aria-label']).toEqual('expandSection');
  });

  it('renders children based on the open state', () => {
    expect(wrapper.state().open).toBe(true);
    expect(wrapper.find('Fragment').props().children[1]).toEqual(<span>Child content</span>);
    wrapper.setState({ open: false });
    expect(wrapper.find('Fragment').props().children[1]).toBe(false);
  });

  it('toggles the children based on MiradorMenuButton/Typography click', () => {
    expect(wrapper.find('Fragment').props().children[1]).toEqual(<span>Child content</span>);
    wrapper.find(Typography).simulate('click');
    expect(wrapper.find('Fragment').props().children[1]).toBe(false);
    wrapper.find(MiradorMenuButton).simulate('click');
    expect(wrapper.find('Fragment').props().children[1]).toEqual(<span>Child content</span>);
  });
});
