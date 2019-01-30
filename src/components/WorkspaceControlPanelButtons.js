import React, { Component } from 'react';
import PropTypes from 'prop-types';
import List from '@material-ui/core/List';
import miradorWithPlugins from '../lib/miradorWithPlugins';
import ConnectedWorkspaceFullScreenButton from './WorkspaceFullScreenButton';
import ConnectedWorkspaceAddButton from './WorkspaceAddButton';
import ConnectedWorkspaceMenuButton from './WorkspaceMenuButton';
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
    const { children } = this.props;
    return (
      <List>
        <ConnectedWorkspaceAddButton />
        <ConnectedWorkspaceMenuButton />
        <ConnectedWorkspaceFullScreenButton />
        {children}
      </List>
    );
  }
}

WorkspaceControlPanelButtons.propTypes = {
  children: PropTypes.node,
};

WorkspaceControlPanelButtons.defaultProps = {
  children: null,
};

export default miradorWithPlugins(WorkspaceControlPanelButtons);
