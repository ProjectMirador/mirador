import React, { Component } from 'react';
import FullScreenButton from '../containers/FullScreenButton';
import WorkspaceMenuButton from '../containers/WorkspaceMenuButton';
import WorkspaceOptionsButton from '../containers/WorkspaceOptionsButton';
import WindowListButton from '../containers/WindowListButton';
import { PluginHook } from './PluginHook';

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
        <FullScreenButton />
        <PluginHook {...this.props} />
      </>
    );
  }
}
