import { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
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
      areaRef,
      classes,
      controlPanelVariant,
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
          {...(areaRef ? { ref: areaRef } : {})}
        >
          {
            isWorkspaceAddVisible
              ? <WorkspaceAdd />
              : <Workspace />
          }
          <ErrorDialog />
          <BackgroundPluginArea />
        </main>
      </>
    );
  }
}

WorkspaceArea.propTypes = {
  areaRef: PropTypes.shape({ current: PropTypes.instanceOf(Element) }),
  classes: PropTypes.objectOf(PropTypes.string).isRequired,
  controlPanelVariant: PropTypes.string,
  isWorkspaceAddVisible: PropTypes.bool,
  isWorkspaceControlPanelVisible: PropTypes.bool.isRequired,
  lang: PropTypes.string,
  t: PropTypes.func.isRequired,
};

WorkspaceArea.defaultProps = {
  areaRef: null,
  controlPanelVariant: undefined,
  isWorkspaceAddVisible: false,
  lang: undefined,
};
