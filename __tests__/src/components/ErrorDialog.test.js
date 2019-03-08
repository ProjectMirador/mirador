import React from 'react';
import { shallow } from 'enzyme';
import { ErrorDialog } from '../../../src/components/ErrorDialog';

/**
 * Helper function to create a shallow wrapper around ErrorDialog
 */
function createWrapper(props) {
  return shallow(
    <ErrorDialog
      t={key => key}
      {...props}
    />,
  );
}

describe('ErrorDialog', () => {
  let wrapper;

  it('renders properly', () => {
    const errors = { testid123: { id: 'testid123', message: '' } };

    wrapper = createWrapper({ errors });
    expect(wrapper.find('WithStyles(Dialog)').length).toBe(1);
  });

  it('shows up error message correctly', () => {
    const errorMessage = 'error testMessage 123';
    const errors = { testid123: { id: 'testid123', message: errorMessage } };

    wrapper = createWrapper({ errors });
    expect(wrapper.find('WithStyles(Typography)[variant="body2"]').render().text()).toBe(errorMessage);
  });

  it('triggers the handleClick prop when clicking the ok button', () => {
    const errors = { testid123: { id: 'testid123', message: '' } };
    const mockHandleClick = jest.fn();

    wrapper = createWrapper({ errors, removeError: mockHandleClick });
    wrapper.find('WithStyles(Button)').simulate('click');
    expect(mockHandleClick).toHaveBeenCalledTimes(1);
  });
});
