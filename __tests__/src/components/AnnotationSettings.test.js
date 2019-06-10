import React from 'react';
import { shallow } from 'enzyme';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import { AnnotationSettings } from '../../../src/components/AnnotationSettings';

/** */
function createWrapper(props) {
  return shallow(
    <AnnotationSettings
      displayAll={false}
      displayAllDisabled={false}
      t={k => k}
      toggleAnnotationDisplay={() => {}}
      windowId="abc123"
      {...props}
    />,
  );
}

describe('AnnotationSettings', () => {
  let control;
  let wrapper;
  const toggleAnnotationDisplayMock = jest.fn();


  it('renders a FormControlLabel and a Switch', () => {
    wrapper = createWrapper();
    control = shallow(
      wrapper.find(FormControlLabel).props().control,
    );
    expect(wrapper.find(FormControlLabel).length).toBe(1);
    expect(control.find('ForwardRef(Switch)').length).toBe(1);
  });

  describe('control', () => {
    it('is not checked when the displayAll prop is false', () => {
      wrapper = createWrapper();
      control = shallow(
        wrapper.find(FormControlLabel).props().control,
      );

      expect(control.find('ForwardRef(Switch)').props().checked).toBe(false);
    });

    it('is checked when the displayAll prop is true', () => {
      wrapper = createWrapper({ displayAll: true });
      control = shallow(
        wrapper.find(FormControlLabel).props().control,
      );

      expect(control.find('ForwardRef(Switch)').props().checked).toBe(true);
    });

    it('is disabled based on the displayAllDisabled prop', () => {
      wrapper = createWrapper();
      control = shallow(
        wrapper.find(FormControlLabel).props().control,
      );
      expect(control.find('ForwardRef(Switch)').props().disabled).toBe(false);

      wrapper = createWrapper({ displayAllDisabled: true });
      control = shallow(
        wrapper.find(FormControlLabel).props().control,
      );
      expect(control.find('ForwardRef(Switch)').props().disabled).toBe(true);
    });

    it('calls the toggleAnnotationDisplay prop function on change', () => {
      wrapper = createWrapper({ toggleAnnotationDisplay: toggleAnnotationDisplayMock });
      control = shallow(
        wrapper.find(FormControlLabel).props().control,
      );

      control.find('ForwardRef(Switch)').props().onChange(); // trigger the onChange prop

      expect(toggleAnnotationDisplayMock).toHaveBeenCalledTimes(1);
    });
  });
});
