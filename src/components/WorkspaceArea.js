import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import ErrorDialog from '../containers/ErrorDialog';
import WorkspaceControlPanel from '../containers/WorkspaceControlPanel';
import Workspace from '../containers/Workspace';
import WorkspaceAdd from '../containers/WorkspaceAdd';
import ns from '../config/css-ns';

/**
 * This is the top level Mirador component.
 * @prop {Object} manifests
 */
export class WorkspaceArea extends Component {
  /**
   * render
   * @return {String} - HTML markup for the component
   */
  render() {
    const {
      classes, isWorkspaceAddVisible, isWorkspaceControlPanelVisible, t,
    } = this.props;

    return (
      <main className={classNames(classes.background, ns('viewer'))} aria-label={t('workspace')}>
        {
          isWorkspaceControlPanelVisible
            && <WorkspaceControlPanel />
        }
        {
          isWorkspaceAddVisible
            ? <WorkspaceAdd />
            : <Workspace />
        }
        <ErrorDialog />
      </main>
    );
  }
}


WorkspaceArea.propTypes = {
  classes: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types,
  isWorkspaceAddVisible: PropTypes.bool,
  isWorkspaceControlPanelVisible: PropTypes.bool.isRequired,
  t: PropTypes.func.isRequired,
};

WorkspaceArea.defaultProps = {
  isWorkspaceAddVisible: false,
};
