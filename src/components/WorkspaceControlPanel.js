import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import WorkspaceAddButton from '../containers/WorkspaceAddButton';
import WorkspaceControlPanelButtons
  from '../containers/WorkspaceControlPanelButtons';
import Branding from '../containers/Branding';
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
    const { classes, t, variant } = this.props;
    return (
      <AppBar
        className={classNames(classes.root, ns('workspace-control-panel'), variant === 'wide' ? classes.wide : null)}
        color="default"
        position="absolute"
        component="nav"
        aria-label={t('workspace')}
      >
        <Toolbar disableGutters className={classes.toolbar}>
          <WorkspaceAddButton />
          <div className={classes.workspaceButtons}>
            <WorkspaceControlPanelButtons />
          </div>
        </Toolbar>
        <Branding className={classes.branding} t={t} variant={variant} />
      </AppBar>
    );
  }
}

WorkspaceControlPanel.propTypes = {
  classes: PropTypes.objectOf(PropTypes.string).isRequired,
  t: PropTypes.func.isRequired,
  variant: PropTypes.oneOf(['default', 'wide']),
};

WorkspaceControlPanel.defaultProps = {
  variant: 'default',
};
