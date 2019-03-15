import React from 'react';
import { mount, shallow } from 'enzyme';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import ListSubheader from '@material-ui/core/ListSubheader';
import MenuItem from '@material-ui/core/MenuItem';
import { WindowViewSettings } from '../../../src/components/WindowViewSettings';

/** create wrapper */
function createWrapper(props) {
  return shallow(
    <WindowViewSettings
      classes={{}}
      windowId="xyz"
      setWindowViewType={() => {}}
      windowViewType="single"
      {...props}
    />,
  );
}

describe('WindowViewSettings', () => {
  it('renders all elements correctly', () => {
    const wrapper = createWrapper();
    expect(wrapper.find(ListSubheader).length).toBe(1);
    const labels = wrapper.find(FormControlLabel);
    expect(labels.length).toBe(2);
    expect(labels.at(0).props().value).toBe('single');
    expect(labels.at(1).props().value).toBe('book');
  });

  it('should set the correct label active (by setting the secondary color)', () => {
    let wrapper = createWrapper({ windowViewType: 'single' });
    expect(wrapper.find(FormControlLabel).at(0).props().control.props.color).toEqual('secondary');
    expect(wrapper.find(FormControlLabel).at(1).props().control.props.color).not.toEqual('secondary');

    wrapper = createWrapper({ windowViewType: 'book' });
    expect(wrapper.find(FormControlLabel).at(1).props().control.props.color).toEqual('secondary');
  });

  it('updates state when the view config selection changes', () => {
    const setWindowViewType = jest.fn();
    const wrapper = createWrapper({ setWindowViewType });
    wrapper.find(MenuItem).at(0).simulate('click');
    expect(setWindowViewType).toHaveBeenCalledWith('xyz', 'single');
    wrapper.find(MenuItem).at(1).simulate('click');
    expect(setWindowViewType).toHaveBeenCalledWith('xyz', 'book');
  });

  it('sets the selected ref to a MenuItem in the component (when mounting)', () => {
    const wrapper = mount(
      <WindowViewSettings
        classes={{}}
        windowId="xyz"
        setWindowViewType={() => {}}
        windowViewType="single"
      />,
    );

    expect(
      wrapper // eslint-disable-line no-underscore-dangle
        .instance()
        .selectedRef
        ._reactInternalFiber
        .type
        .displayName,
    ).toEqual('WithStyles(MenuItem)');

    // The document's ActiveElement is an li
    expect(
      document
        .activeElement[Object.keys(document.activeElement)[0]]
        .elementType,
    ).toEqual('li');
  });
});
