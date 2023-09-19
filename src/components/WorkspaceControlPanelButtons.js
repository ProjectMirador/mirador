import { Component } from 'react';
import { styled } from '@mui/material/styles';
import FullScreenButton from '../containers/FullScreenButton';
import WorkspaceMenuButton from '../containers/WorkspaceMenuButton';
import WorkspaceOptionsButton from '../containers/WorkspaceOptionsButton';
import WindowListButton from '../containers/WindowListButton';
import { PluginHook } from './PluginHook';

const StyledFullScreenButton = styled(FullScreenButton)(({ theme }) => ({
  margin: theme.spacing(1),
}));

/**
 *
 */
export class WorkspaceControlPanelButtons extends Component {
  /**
   * render
   *
   * @return {type}  description
   */
  render() {
    return (
      <>
        <WindowListButton />
        <WorkspaceMenuButton />
        <WorkspaceOptionsButton />
        <StyledFullScreenButton />
        <PluginHook {...this.props} />
      </>
    );
  }
}

