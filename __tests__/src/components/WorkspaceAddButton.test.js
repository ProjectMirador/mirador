import React from 'react';
import { shallow } from 'enzyme';
import Fab from '@material-ui/core/Fab';
import Typography from '@material-ui/core/Typography';
import AddIcon from '@material-ui/icons/AddSharp';
import CloseIcon from '@material-ui/icons/CloseSharp';
import { WorkspaceAddButton } from '../../../src/components/WorkspaceAddButton';

/** create wrapper */
function createWrapper(props) {
  return shallow(
    <WorkspaceAddButton
      classes={{}}
      setWorkspaceAddVisibility={() => {}}
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

  it('renders additional text for an empty workspace', () => {
    const wrapper = createWrapper({ emptyWorkspace: true, isWorkspaceAddVisible: false });
    expect(wrapper.find(Fab).matchesElement(
      <Fab>
        <AddIcon />
        <Typography>startHere</Typography>
      </Fab>,
    )).toBe(true);
  });

  it('renders a button to close the load window area', () => {
    const setWorkspaceAddVisibility = jest.fn();
    const wrapper = createWrapper({ isWorkspaceAddVisible: true, setWorkspaceAddVisibility });

    expect(wrapper.find(CloseIcon).length).toBe(1);

    wrapper.find(Fab).simulate('click');
    expect(setWorkspaceAddVisibility).toHaveBeenCalledWith(false);
  });
});
