import React, { Component } from 'react';
import PropTypes from 'prop-types';
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
    const { classes } = this.props;
    return (
      <>
        <WindowListButton />
        <WorkspaceMenuButton />
        <WorkspaceOptionsButton />
        <FullScreenButton className={classes.ctrlBtn} />
        <PluginHook {...this.props} />
      </>
    );
  }
}

WorkspaceControlPanelButtons.propTypes = {
  classes: PropTypes.objectOf(PropTypes.string),
};

WorkspaceControlPanelButtons.defaultProps = {
  classes: {},
};
