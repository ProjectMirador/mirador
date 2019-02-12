import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { withStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import WorkspaceControlPanelButtons
  from '../containers/WorkspaceControlPanelButtons';
import ns from '../config/css-ns';

/**
 * WorkspaceControlPanel
 * @param props
 * @returns {Drawer}
 * @constructor
 */
function WorkspaceControlPanel(props) {
  const { classes } = props;
  return (
    <Drawer
      className={classNames(classes.drawer, ns('workspace-control-panel'))}
      variant="permanent"
      anchor="left"
      classes={{ paper: classNames(classes.drawer) }}
      PaperProps={{ style: { position: 'absolute' } }}
      open
    >
      <WorkspaceControlPanelButtons />
    </Drawer>
  );
}


WorkspaceControlPanel.propTypes = {
  classes: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
};

/**
 * @private
 */
const styles = theme => ({
  ctrlBtn: {
    margin: theme.spacing.unit,
  },
  drawer: {
    overflowX: 'hidden',
    height: '100%',
  },
});

export default withStyles(styles)(WorkspaceControlPanel);
