import { Component } from 'react';
import PropTypes from 'prop-types';
import { styled, lighten, darken } from '@mui/material/styles';
import ErrorDialog from '../containers/ErrorDialog';
import WorkspaceControlPanel from '../containers/WorkspaceControlPanel';
import Workspace from '../containers/Workspace';
import WorkspaceAdd from '../containers/WorkspaceAdd';
import BackgroundPluginArea from '../containers/BackgroundPluginArea';
import ns from '../config/css-ns';

const StyledMain = styled('main')(({ theme }) => {
  const getBackgroundColor = theme.palette.mode === 'light' ? darken : lighten;

  return {
    background: getBackgroundColor(theme.palette.shades.light, 0.1),
    bottom: 0,
    left: 0,
    overflow: 'hidden',
    position: 'absolute',
    right: 0,
    top: 0,
  };
});

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
        <StyledMain
          className={ns('viewer')}
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
        </StyledMain>
      </>
    );
  }
}

WorkspaceArea.propTypes = {
  areaRef: PropTypes.shape({ current: PropTypes.instanceOf(Element) }),
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
