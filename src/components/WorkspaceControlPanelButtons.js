import React, { Component } from 'react';
import PropTypes from 'prop-types';
import WorkspaceFullScreenButton from '../containers/WorkspaceFullScreenButton';
import WorkspaceAddButton from '../containers/WorkspaceAddButton';
import WorkspaceMenuButton from '../containers/WorkspaceMenuButton';

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
      <>
        <WorkspaceAddButton />
        <WorkspaceMenuButton />
        <WorkspaceFullScreenButton />
        {children}
      </>
    );
  }
}

WorkspaceControlPanelButtons.propTypes = {
  children: PropTypes.node,
};

WorkspaceControlPanelButtons.defaultProps = {
  children: null,
};
