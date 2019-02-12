import React from 'react';
import PropTypes from 'prop-types';
import List from '@material-ui/core/List';
import WorkspaceFullScreenButton from '../containers/WorkspaceFullScreenButton';
import WorkspaceAddButton from '../containers/WorkspaceAddButton';
import WorkspaceMenuButton from '../containers/WorkspaceMenuButton';

/**
 * WorkspaceControlPanelButtons
 * @param props
 * @returns {List}
 * @constructor
 */
function WorkspaceControlPanelButtons(props) {
  const { children } = props;
  return (
    <List>
      <WorkspaceAddButton />
      <WorkspaceMenuButton />
      <WorkspaceFullScreenButton />
      {children}
    </List>
  );
}


WorkspaceControlPanelButtons.propTypes = {
  children: PropTypes.node,
};

WorkspaceControlPanelButtons.defaultProps = {
  children: null,
};

export default WorkspaceControlPanelButtons;
