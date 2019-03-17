import React, { Component } from 'react';
import FullscreenIcon from '@material-ui/icons/FullscreenSharp';
import FullscreenExitIcon from '@material-ui/icons/FullscreenExitSharp';
import PropTypes from 'prop-types';
import { MiradorMenuButton } from './MiradorMenuButton';
/**
 */
export class WorkspaceFullScreenButton extends Component {
  /**
   * render
   * @return
   */
  render() {
    const {
      isFullscreenEnabled, setWorkspaceFullscreen, t,
    } = this.props;
    return (
      <MiradorMenuButton
        aria-label={isFullscreenEnabled ? t('exitFullScreen') : t('workspaceFullScreen')}
        onClick={() => setWorkspaceFullscreen(!isFullscreenEnabled)}
      >
        {isFullscreenEnabled ? <FullscreenExitIcon /> : <FullscreenIcon />}
      </MiradorMenuButton>
    );
  }
}

WorkspaceFullScreenButton.propTypes = {
  isFullscreenEnabled: PropTypes.bool,
  setWorkspaceFullscreen: PropTypes.func.isRequired,
  t: PropTypes.func,
};

WorkspaceFullScreenButton.defaultProps = {
  isFullscreenEnabled: false,
  t: key => key,
};
