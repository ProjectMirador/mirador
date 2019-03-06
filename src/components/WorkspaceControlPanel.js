import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import WorkspaceControlPanelButtons
  from '../containers/WorkspaceControlPanelButtons';
import ns from '../config/css-ns';

/**
 * Provides the panel responsible for controlling the entire workspace
 */
export class WorkspaceControlPanel extends Component {
  /**
   * render
   * @return {String} - HTML markup for the component
   */
  render() {
    const { classes, t } = this.props;
    return (
      <AppBar
        className={classNames(classes.root, ns('workspace-control-panel'))}
        color="default"
        position="absolute"
        component="nav"
        aria-label={t('workspace')}
      >
        <Toolbar className={classes.toolbar}>
          <WorkspaceControlPanelButtons />
        </Toolbar>
      </AppBar>
    );
  }
}

WorkspaceControlPanel.propTypes = {
  classes: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
  t: PropTypes.func.isRequired,
};
