import React, { Component } from 'react';
import WorkspaceFullScreenButton from '../containers/WorkspaceFullScreenButton';
import WorkspaceAddButton from '../containers/WorkspaceAddButton';
import WorkspaceMenuButton from '../containers/WorkspaceMenuButton';
import WindowListButton from '../containers/WindowListButton';

/** Renders plugins */
const PluginHook = (props) => {
  const { PluginComponents } = props; // eslint-disable-line react/prop-types
  return PluginComponents ? (
    PluginComponents.map((PluginComponent, index) => (
      <PluginComponent {...props} key={index} /> // eslint-disable-line react/no-array-index-key
    ))
  ) : null;
};

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
        <WorkspaceAddButton />
        <WindowListButton />
        <WorkspaceMenuButton />
        <WorkspaceFullScreenButton />
        <PluginHook {...this.props} />
      </>
    );
  }
}
