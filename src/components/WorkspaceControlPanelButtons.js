import React, { Component } from 'react';
import PropTypes from 'prop-types';
import List from '@material-ui/core/List';
import WorkspaceFullScreenButton from '../containers/WorkspaceFullScreenButton';
import WorkspaceAddButton from '../containers/WorkspaceAddButton';
import ConnectedWorkspaceMenuButton from './WorkspaceMenuButton';
/**
 *
 */
class WorkspaceControlPanelButtons extends Component {
  /**
   * render
   *
   * @return {type}  description
   */
  render() {
    const { children } = this.props;
    return (
      <List>
        <WorkspaceAddButton />
        <ConnectedWorkspaceMenuButton />
        <WorkspaceFullScreenButton />
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

export default WorkspaceControlPanelButtons;
