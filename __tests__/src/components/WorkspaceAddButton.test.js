import React from 'react';
import { shallow } from 'enzyme';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import ClearIcon from '@material-ui/icons/Clear';
import WorkspaceAddButton from '../../../src/components/WorkspaceAddButton';

/** create wrapper */
function createWrapper(props) {
  return shallow(
    <WorkspaceAddButton
      classes={{}}
      t={str => str}
      {...props}
    />,
  );
}

describe('WorkspaceAddButton', () => {
  it('renders a button to open the load window area', () => {
    const setWorkspaceAddVisibility = jest.fn();
    const wrapper = createWrapper({ isWorkspaceAddVisible: false, setWorkspaceAddVisibility });

    expect(wrapper.find(AddIcon).length).toBe(1);

    wrapper.find(Fab).simulate('click');
    expect(setWorkspaceAddVisibility).toHaveBeenCalledWith(true);
  });

  it('renders a button to close the load window area', () => {
    const setWorkspaceAddVisibility = jest.fn();
    const wrapper = createWrapper({ isWorkspaceAddVisible: true, setWorkspaceAddVisibility });

    expect(wrapper.find(ClearIcon).length).toBe(1);

    wrapper.find(Fab).simulate('click');
    expect(setWorkspaceAddVisibility).toHaveBeenCalledWith(false);
  });
});
