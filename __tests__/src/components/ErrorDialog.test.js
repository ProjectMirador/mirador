import React from 'react';
import { shallow } from 'enzyme';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogContentText from '@material-ui/core/DialogContentText';
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
    const error = { id: 'testid123', message: '' };

    wrapper = createWrapper({ error });
    expect(wrapper.find(Dialog).length).toBe(1);
  });

  it('shows up error message correctly', () => {
    const errorMessage = 'error testMessage 123';
    const error = { id: 'testid123', message: errorMessage };

    wrapper = createWrapper({ error });
    expect(wrapper.find(DialogContentText).find('[variant="body2"]').render().text()).toBe(errorMessage);
  });

  it('triggers the handleClick prop when clicking the ok button', () => {
    const error = { id: 'testid123', message: '' };
    const mockHandleClick = jest.fn();

    wrapper = createWrapper({ error, removeError: mockHandleClick });
    wrapper.find(Button).simulate('click');
    expect(mockHandleClick).toHaveBeenCalledTimes(1);
  });
});
