import React from 'react';
import { shallow } from 'enzyme';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import RadioGroup from '@material-ui/core/RadioGroup';
import Typography from '@material-ui/core/Typography';
import { WindowViewSettings } from '../../../src/components/WindowViewSettings';

/** create wrapper */
function createWrapper(props) {
  return shallow(
    <WindowViewSettings
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
    expect(wrapper.find(Typography).length).toBe(1);
    expect(wrapper.find(RadioGroup).length).toBe(1);
    const labels = wrapper.find(FormControlLabel);
    expect(labels.length).toBe(2);
    expect(labels.at(0).props().value).toBe('single');
    expect(labels.at(1).props().value).toBe('book');
  });

  it('should set the correct label active', () => {
    let wrapper = createWrapper({ windowViewType: 'single' });
    expect(wrapper.find(RadioGroup).props().value).toBe('single');
    wrapper = createWrapper({ windowViewType: 'book' });
    expect(wrapper.find(RadioGroup).props().value).toBe('book');
  });

  it('updates state when the view config selection changes', () => {
    const setWindowViewType = jest.fn();
    const wrapper = createWrapper({ setWindowViewType });
    wrapper.find(RadioGroup).first().simulate('change', { target: { value: 'book' } });
    expect(setWindowViewType).toHaveBeenCalledWith('xyz', 'book');
    wrapper.find(RadioGroup).first().simulate('change', { target: { value: 'single' } });
    expect(setWindowViewType).toHaveBeenCalledWith('xyz', 'single');
  });
});
