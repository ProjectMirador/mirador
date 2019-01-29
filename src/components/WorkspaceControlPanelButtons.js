import React, { Component } from 'react';
import PropTypes from 'prop-types';
import List from '@material-ui/core/List';
import miradorWithPlugins from '../lib/miradorWithPlugins';
import ConnectedWorkspaceFullScreenButton from './WorkspaceFullScreenButton';
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
