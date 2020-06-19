import React from 'react';
import { shallow } from 'enzyme';
import Dialog from '@material-ui/core/Dialog';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import Snackbar from '@material-ui/core/Snackbar';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { WorkspaceExport } from '../../../src/components/WorkspaceExport';

describe('WorkspaceExport', () => {
  let wrapper;
  let handleClose = jest.fn();
  let mockState;

  beforeEach(() => {
    handleClose = jest.fn();
    mockState = {
      companionWindows: {},
      config: {},
      elasticLayout: {},
      viewers: {},
      windows: {},
      workspace: {},
    };

    wrapper = shallow(
      <WorkspaceExport
        open
        handleClose={handleClose}
        exportableState={mockState}
      />,
    );
  });

  it('renders without an error', () => {
    expect(wrapper.find(Dialog).length).toBe(1);
  });

  it('renders sizing props', () => {
    expect(wrapper.find(Dialog).props()).toEqual(expect.objectContaining({
      fullWidth: true,
      maxWidth: 'sm',
    }));
  });

  it('is closable by clicking the cancel button', () => {
    expect(wrapper.find(Dialog).find(Button).at(0).text()).toMatch('cancel');
    wrapper.find(Dialog).find(Button).at(0).simulate('click');
    expect(handleClose).toHaveBeenCalled();
  });

  it('reveals a snackbar on copy', () => {
    expect(wrapper.find(Dialog).find(Button).at(1).text()).toMatch('copy');
    wrapper.find(Dialog).find(CopyToClipboard).simulate('copy');
    expect(wrapper.find(Snackbar).length).toBe(1);
    shallow(wrapper.find(Snackbar).props().action).simulate('click');
    expect(handleClose).toHaveBeenCalled();
  });

  it('renders an exportable version of state', () => {
    expect(wrapper.find('pre').length).toBe(1);
    expect(wrapper.find('pre').text()).toMatch('"companionWindows":');
    expect(wrapper.find('pre').text()).toMatch('"config":');
    expect(wrapper.find('pre').text()).toMatch('"elasticLayout":');
    expect(wrapper.find('pre').text()).toMatch('"viewers":');
    expect(wrapper.find('pre').text()).toMatch('"windows":');
    expect(wrapper.find('pre').text()).toMatch('"workspace":');
    expect(wrapper.find('pre').text()).not.toMatch('"manifests":');
  });
});
