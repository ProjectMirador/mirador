import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import CollectionDialog from '../containers/CollectionDialog';
import ErrorDialog from '../containers/ErrorDialog';
import WorkspaceControlPanel from '../containers/WorkspaceControlPanel';
import Workspace from '../containers/Workspace';
import WorkspaceAdd from '../containers/WorkspaceAdd';
import BackgroundPluginArea from '../containers/BackgroundPluginArea';
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
      classes,
      controlPanelVariant,
      isCollectionDialogVisible,
      isWorkspaceAddVisible,
      isWorkspaceControlPanelVisible,
      lang,
      t,
    } = this.props;

    return (
      <>
        {
          isWorkspaceControlPanelVisible
            && <WorkspaceControlPanel variant={controlPanelVariant} />
        }
        <main
          className={classNames(classes.viewer, ns('viewer'))}
          lang={lang}
          aria-label={t('workspace')}
        >
          {
            isWorkspaceAddVisible
              ? <WorkspaceAdd />
              : <Workspace />
          }
          <ErrorDialog />
          <BackgroundPluginArea />
          { isCollectionDialogVisible && <CollectionDialog /> }
        </main>
      </>
    );
  }
}

WorkspaceArea.propTypes = {
  classes: PropTypes.objectOf(PropTypes.string).isRequired,
  controlPanelVariant: PropTypes.string,
  isCollectionDialogVisible: PropTypes.bool,
  isWorkspaceAddVisible: PropTypes.bool,
  isWorkspaceControlPanelVisible: PropTypes.bool.isRequired,
  lang: PropTypes.string,
  t: PropTypes.func.isRequired,
};

WorkspaceArea.defaultProps = {
  controlPanelVariant: undefined,
  isCollectionDialogVisible: false,
  isWorkspaceAddVisible: false,
  lang: undefined,
};
